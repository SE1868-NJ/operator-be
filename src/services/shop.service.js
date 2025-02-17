import { Op, Sequelize } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { getApprovedShops } from "../controllers/shops.controller.js";
import reasonChangeStatusModel, { ReasonChangeStatus } from "../models/reasonChangeStatus.model.js";
import { Shop } from "../models/shop.model.js";
import { User } from "../models/user.model.js";

const ShopService = {
    async getAllShops() {
        try {
            const shops = await Shop.findAll({
                include: [
                    {
                        model: User,
                        as: "Owner",
                    },
                ],
            });

            return shops;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getPendingShops(offset, limit, filterData = {}) {
        try {
            const whereClause = {}; // Không khởi tạo shopStatus ở đây, sẽ thêm sau nếu cần

            // Lọc Shop
            if (filterData?.shopName) {
                whereClause.shopName = { [Op.like]: `%${filterData.shopName}%` };
            }
            if (filterData?.shopEmail) {
                whereClause.shopEmail = { [Op.like]: `%${filterData.shopEmail}%` };
            }
            if (filterData?.shopPhone) {
                whereClause.shopPhone = { [Op.like]: `%${filterData.shopPhone}%` };
            }
            if (filterData?.shopStatus) {
                // Thêm filter shopStatus
                whereClause.shopStatus = filterData.shopStatus;
            } else {
                whereClause.shopStatus = "pending"; // Giá trị mặc định là pending nếu không có filter nào
            }

            const includeClause = [
                {
                    model: User,
                    as: "Owner",
                    where: {},
                    required: true,
                },
            ];

            // Lọc User (Owner)
            if (filterData?.ownerName) {
                includeClause[0].where.fullName = {
                    [Op.like]: `%${filterData.ownerName}%`,
                };
            }

            const pendingShops = await Shop.findAll({
                where: whereClause,
                offset,
                limit,
                include: includeClause,
            });

            const totalPendingShops = await Shop.count({
                where: whereClause,
                include: includeClause,
            });

            return { pendingShops, totalPendingShops };
        } catch (error) {
            console.error("Error fetching pending shops:", error);
            throw new Error(error.message);
        }
    },

    async getApprovedShops(offset = 0, limit = 10, filterData = {}) {
        try {
            const operatorID = 1;
            const role = "Shop";
            const { shopName, ownerName, shopEmail, shopPhone } = filterData; // Destructure

            // Association tạm thời trong hàm
            Shop.hasOne(ReasonChangeStatus, {
                foreignKey: "pendingID",
                as: "reasonTemp", // Alias khác để tránh xung đột
            });

            const whereClause = {};

            // Lọc dựa trên thông tin Shop (shopName, shopEmail, shopPhone)
            if (shopName) {
                whereClause.shopName = { [Op.like]: `%${shopName}%` };
            }
            if (shopEmail) {
                whereClause.shopEmail = { [Op.like]: `%${shopEmail}%` };
            }
            if (shopPhone) {
                whereClause.shopPhone = { [Op.like]: `%${shopPhone}%` };
            }

            const includeOptions = [
                {
                    model: ReasonChangeStatus,
                    as: "reasonTemp",
                    required: true,
                    where: {
                        operatorID: operatorID,
                        role: role,
                    },
                },
                {
                    model: User,
                    as: "Owner", //Đảm bảo khớp với alias trong Shop.belongsTo
                    required: true,
                },
            ];

            // Lọc dựa trên Owner name
            if (ownerName) {
                includeOptions[1].where = {
                    fullName: { [Op.like]: `%${ownerName}%` },
                };
            }

            const shops = await Shop.findAll({
                where: whereClause, // Sử dụng whereClause
                include: includeOptions,
                order: [[sequelize.literal("`reasonTemp`.`createAt`"), "DESC"]],
                offset: offset,
                limit: limit,
            });

            const totalApprovedShops = await Shop.count({
                where: whereClause,
                include: includeOptions,
            });

            return {
                approvedShops: shops,
                totalApprovedShops: totalApprovedShops,
            };
        } catch (error) {
            console.error("Error fetching approved shops:", error);
            throw new Error(error.message);
        } finally {
            //Remove association tạm thời
            Shop.removeAttribute("reasonTemp");
            Shop.associations.reasonTemp = undefined;
        }
    },

    async getPendingShopById(id) {
        try {
            const shop = await Shop.findByPk(id, {
                include: [
                    {
                        model: User,
                        as: "Owner",
                        status: "pending",
                    },
                ],
            });
            if (!shop) {
                throw new Error("Shop not found");
            }
            return shop;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getShopById(id) {
        try {
            const shop = await Shop.findByPk(id, {
                include: [
                    {
                        model: User,
                        as: "Owner",
                    },
                ],
            });
            if (!shop) {
                throw new Error("Shop not found");
            }
            return shop;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async updateShopDetailStatus(id, updatedStatus) {
        const transaction = await sequelize.transaction();
        try {
            const { status } = updatedStatus;
            const newStatus = status === "active" ? "suspended" : "active";

            try {
                const updatedShop = await Shop.update(
                    {
                        shopStatus: newStatus,
                    },
                    {
                        where: {
                            shopID: id,
                        },
                        transaction: transaction,
                    },
                );

                // Kiểm tra xem shop có tồn tại hay không
                if (updatedShop === null) {
                    await transaction.rollback();
                    throw new Error("Shop not found");
                }

                await transaction.commit();
                return newStatus;
            } catch (error) {
                await transaction.rollback();
                console.error(
                    "Error during updateShopStatus (inner try) - Shop ID:",
                    id,
                    "Error:",
                    error,
                    "Request Body:",
                    req.body,
                );
                throw new Error(error.message);
            }
        } catch (error) {
            await transaction.rollback();
            console.error(
                "Error during updateShopStatus (outer try) - Shop ID:",
                id,
                "Error:",
                error,
                "Request Body:",
                req.body,
            );
            throw new Error(error.message);
        }
    },
    async updateShopStatus(shopID, updatedStatus) {
        const transaction = await sequelize.transaction();
        try {
            const { status, description } = updatedStatus;
            const newStatus = status === "accepted" ? "active" : "rejected";
            const reason = description;

            try {
                const updatedShop = await Shop.update(
                    {
                        shopStatus: newStatus,
                    },
                    {
                        where: {
                            shopID: shopID,
                        },
                        transaction: transaction,
                    },
                );

                // Kiểm tra xem shop có tồn tại hay không
                if (updatedShop === null) {
                    await transaction.rollback();
                    throw new Error("Shop not found");
                }

                await ReasonChangeStatus.create(
                    {
                        operatorID: 1,
                        pendingID: shopID,
                        role: "Shop",
                        changedStatus: status,
                        reason: reason,
                    },
                    {
                        transaction: transaction,
                    },
                );

                await transaction.commit();
                return newStatus;
            } catch (error) {
                await transaction.rollback();
                console.error(
                    "Error during updateShopStatus (inner try) - Shop ID:",
                    id,
                    "Error:",
                    error,
                    "Request Body:",
                    req.body,
                );
                throw new Error(error.message);
            }
        } catch (error) {
            await transaction.rollback();
            console.error(
                "Error during updateShopStatus (outer try) - Shop ID:",
                id,
                "Error:",
                error,
                "Request Body:",
                req.body,
            );
            throw new Error(error.message);
        }
    },
};

export default ShopService;
