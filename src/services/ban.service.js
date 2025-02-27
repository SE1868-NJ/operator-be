import cron from "node-cron";
import { Op } from "sequelize";
import { Ban } from "../models/ban.model.js";
import { Shipper } from "../models/shipper.model.js";
import { Shop } from "../models/shop.model.js";
import { User } from "../models/user.model.js";

const BanService = {
    async getBanAccount({ userId, userType }) {
        try {
            console.log(userId, userType);
            const banAccount = await Ban.findOne({
                where: { userId, userType, status: true },
                raw: true,
            });
            return { success: true, data: banAccount };
        } catch (error) {
            console.error("An error occur during get ban user:", error);
            throw new Error(`Failed to get ban Account: ${error.message}`);
        }
    },

    async banAccount({ userId, userType, operatorId, reason, banEnd }) {
        try {
            const ban = await Ban.create({
                userId,
                userType,
                operatorId,
                reason,
                banStart: new Date(),
                banEnd: banEnd || null,
                status: true,
            });

            if (userType === "customer") {
                await User.update(
                    { status: "Đình chỉ" },
                    {
                        where: {
                            userID: userId,
                        },
                    },
                );
            } else if (userType === "shop") {
                await Shop.update(
                    { shopStatus: "Đình chỉ" },
                    {
                        where: {
                            shopID: userId,
                        },
                    },
                );
            } else if (userType === "shipper") {
                await Shipper.update(
                    { status: "Đình chỉ" },
                    {
                        where: {
                            id: userId,
                        },
                    },
                );
            }

            return { success: true, data: ban };
        } catch (error) {
            console.error("An error occur during ban user:", error);
            throw new Error(`Failed to create ban Account: ${error.message}`);
        }
    },

    async unbanAccountAuto() {
        try {
            const expireBans = await Ban.findAll({
                where: {
                    banEnd: { [Op.lte]: new Date() }, // Những tài khoản đã hết hạn ban
                    status: true, // Chỉ lấy những tài khoản đang bị ban
                },
            });

            if (expireBans.length > 0) {
                const accountIDs = expireBans.map((ban) => ban.userId);
                const accountTypes = expireBans.map((ban) => ban.userType);

                // Cập nhật trạng thái của bảng Ban
                await Ban.update({ status: false }, { where: { userId: { [Op.in]: accountIDs } } });

                // Cập nhật trạng thái cho từng loại tài khoản
                const updateTasks = [];

                for (const ban of expireBans) {
                    if (ban.userType === "customer") {
                        updateTasks.push(
                            User.update({ status: "Hoạt động" }, { where: { userID: ban.userId } }),
                        );
                    } else if (ban.userType === "shipper") {
                        updateTasks.push(
                            Shipper.update({ status: "Hoạt động" }, { where: { id: ban.userId } }),
                        );
                    } else if (ban.userType === "shop") {
                        updateTasks.push(
                            Shop.update(
                                { shopStatus: "Hoạt động" },
                                { where: { shopID: ban.userId } },
                            ),
                        );
                    }
                }

                // Chạy tất cả các lệnh update đồng thời
                await Promise.all(updateTasks);

                console.log(`Đã gỡ ban và kích hoạt lại các tài khoản: ${accountIDs.join(", ")}`);
            } else {
                console.log("Không có user nào cần gỡ ban");
            }
        } catch (error) {
            console.error("Lỗi khi tự động gỡ ban:", error);
            throw new Error(`Không thể gỡ ban tài khoản: ${error.message}`);
        }
    },
    async unbanAccountManual(userId) {
        try {
            const banRecord = await Ban.findOne({
                where: { userId, status: true },
                raw: true,
            });

            if (!banRecord) {
                throw new Error(`Không tìm thấy user: ${userId}`);
            }

            if (banRecord?.userType === "customer") {
                await User.update(
                    { status: "Hoạt động" },
                    {
                        where: {
                            userID: userId,
                        },
                    },
                );
            } else if (banRecord?.userType === "shop") {
                await Shop.update(
                    { shopStatus: "Hoạt động" },
                    {
                        where: {
                            shopID: userId,
                        },
                    },
                );
            } else if (banRecord?.userType === "shipper") {
                await Shipper.update(
                    { status: "Hoạt động" },
                    {
                        where: {
                            id: userId,
                        },
                    },
                );
            }

            await Ban.update({ status: false }, { where: { userId } });

            console.log(`User ID ${userId} đã được gỡ ban thủ công.`);
            return { success: true, message: `User ID ${userId} đã được gỡ ban.` };
        } catch (error) {
            console.error(" Lỗi khi gỡ ban thủ công:", error);
            throw new Error(`Lỗi khi gỡ ban thủ công: ${error.message}`);
        }
    },
};

// Tạo cron job chạy mỗi phút
cron.schedule("* * * * *", async () => {
    console.log("Kiểm tra người dùng cần gỡ ban...");
    await BanService.unbanAccountAuto();
});

export default BanService;
