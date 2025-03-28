import cron from "node-cron";
import { Op } from "sequelize";
import { Ban } from "../models/ban.model.js";
import { Shipper } from "../models/shipper.model.js";
import { Shop } from "../models/shop.model.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import NotificationsServices from "./notifications.service.js";

const BanService = {
    async getBanAccount({ userId, userType }) {
        try {
            console.log(userId, userType);
            const banAccount = await Ban.findOne({
                where: {
                    userId,
                    userType,
                    status: {
                        [Op.in]: ["banned", "scheduled"], // Tìm kiếm status là "banned" hoặc "scheduled"
                    },
                },
                raw: true,
            });
            return { success: true, data: banAccount };
        } catch (error) {
            console.error("An error occur during get ban user:", error);
            throw new Error(`Failed to get ban Account: ${error.message}`);
        }
    },

    async banAccount({ userId, userType, operatorId, reason, banStart, banEnd }) {
        try {
            const status = banStart && new Date(banStart) > new Date() ? "scheduled" : "banned";

            const ban = await Ban.create({
                userId,
                userType,
                operatorId,
                reason,
                banStart: banStart || null,
                banEnd: banEnd || null,
                status,
            });

            if (status === "banned") {
                await BanService.updateUserStatus(userId, userType, "suspended");
            }

            return { success: true, data: ban };
        } catch (error) {
            console.error("An error occurred during ban user:", error);
            throw new Error(`Failed to create ban Account: ${error.message}`);
        }
    },

    async banAccountAuto() {
        try {
            const accountsToBan = await Ban.findAll({
                where: {
                    banStart: { [Op.lte]: new Date() },
                    status: "scheduled",
                },
            });

            if (accountsToBan.length > 0) {
                const accountIDs = accountsToBan.map((ban) => ban.id);

                await Ban.update({ status: "banned" }, { where: { id: { [Op.in]: accountIDs } } });

                for (const ban of accountsToBan) {
                    await BanService.updateUserStatus(ban.userId, ban.userType, "suspended");
                    console.log(
                        `🔵User ID: ${ban.userId}, Type: ${ban.userType}, Ban Start: ${ban.banStart}, Ban End: ${ban.banEnd}`,
                    );
                    const notifPayload = {
                        type: "Gỡ đình chỉ người dùng",
                        message: `Tài khoản ${ban.userType} có Id ${ban.userId} đã bị đình chỉ từ ${ban.banStart} đến ${ban.banEnd}`,
                      };
                  
                    NotificationsServices.createNotification(notifPayload);
                }
                
            } else {
                console.log("Không có user nào cần ban.");
            }
        } catch (error) {
            console.error("Error during auto ban:", error);
            throw new Error(`Failed to auto ban: ${error.message}`);
        }
    },

    async unbanAccountAuto() {
        try {
            const expireBans = await Ban.findAll({
                where: {
                    banEnd: { [Op.lte]: new Date() },
                    status: "banned",
                },
            });

            if (expireBans.length > 0) {
                const accountIDs = expireBans.map((ban) => ban.userId);

                await Ban.update(
                    { status: "active" },
                    { where: { userId: { [Op.in]: accountIDs } } },
                );
                const date = new Date();

                for (const ban of expireBans) {
                    await BanService.updateUserStatus(ban.userId, ban.userType, "active");
                    console.log(
                        `🔵User ID: ${ban.userId}, Type: ${ban.userType}, Ban Start: ${ban.banStart}, Ban End: ${ban.banEnd}`,
                    );
                    const notifPayload = {
                        type: "Gỡ đình chỉ người dùng",
                        message: `Tài khoản ${ban.userType} có Id ${ban.userId} đã được gỡ đình chỉ lúc ${date}`,
                      };
                  
                    NotificationsServices.createNotification(notifPayload);
                }
            } else {
                console.log("Không có user nào đến hạn gỡ ban.");
            }
        } catch (error) {
            console.error("Error during auto unban:", error);
            throw new Error(`Failed to auto unban: ${error.message}`);
        }
    },

    async unbanAccountManual(userId, userType, reason) {
        try {
            const banRecord = await Ban.findOne({
                where: { userId, userType, status: "banned" },
            });

            if (!banRecord) {
                throw new Error(
                    `Không tìm thấy lệnh ban của user ID: ${userId}, loại: ${userType}`,
                );
            }

            // Cập nhật trạng thái ban về "active"
            await Ban.update(
                { status: "active" },
                { where: { userId, userType, status: "banned" } },
            );

            // Cập nhật trạng thái tài khoản người dùng
            await BanService.updateUserStatus(userId, userType, "active");

            console.log(`User ID ${userId} (${userType}) đã được gỡ ban.`);
            return {
                success: true,
                message: `User ID ${userId} (${userType}) đã được gỡ ban.`,
            };
        } catch (error) {
            console.error("Lỗi khi gỡ ban thủ công:", error);
            throw new Error(`Lỗi khi gỡ ban thủ công: ${error.message}`);
        }
    },

    async cancelBanScheduled(userId, userType, reason) {
        try {
            // Tìm bản ghi ban có trạng thái "scheduled" và đúng userType
            const banRecord = await Ban.findOne({
                where: { userId, userType, status: "scheduled" },
            });

            if (!banRecord) {
                throw new Error(
                    `Không tìm thấy lệnh ban đang chờ của user ID: ${userId}, loại: ${userType}`,
                );
            }

            // Cập nhật trạng thái về "active"
            await Ban.update(
                { status: "active" },
                { where: { userId, userType, status: "scheduled" } },
            );

            console.log(`Lệnh ban của user ID ${userId} (loại: ${userType}) đã được hủy.`);
            return {
                success: true,
                message: `Lệnh ban của user ID ${userId} (loại: ${userType}) đã được hủy.`,
            };
        } catch (error) {
            console.error("Lỗi khi hủy lệnh ban:", error);
            throw new Error(`Lỗi khi hủy lệnh ban: ${error.message}`);
        }
    },

    async updateUserStatus(userId, userType, status) {
        try {
            if (userType === "customer") {
                await User.update({ status }, { where: { userID: userId } });
            } else if (userType === "shipper") {
                await Shipper.update({ status }, { where: { id: userId } });
            } else if (userType === "shop") {
                await Shop.update({ shopStatus: status }, { where: { shopID: userId } });
            } else if(userType == "product") {
                await Product.update({status: status}, {where : {product_id: userId}})
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái tài khoản:", error);
        }
    },
};

// Tạo cron job chạy mỗi phút
cron.schedule("* * * * *", async () => {
    console.log("Kiểm tra người dùng cần gỡ ban...");
    await BanService.unbanAccountAuto(); // // Gỡ ban tự động

    console.log("Kiểm tra người dùng cần bị ban...");
    await BanService.banAccountAuto(); // Ban tài khoản tự động
});

export default BanService;
