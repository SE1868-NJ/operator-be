import { join } from "path";
import { Op, Sequelize, where } from "sequelize";
// import { generateCSVReport } from '../utils/csvUtils';
import sequelize from "../config/sequelize.config.js";
import {
    getShipperById,
    getShipperDraftById,
    updateShipperPending,
    updateShipperStatus,
} from "../controllers/shipper.controller.js";
// import { updateShipperPending } from "../controllers/shipper.controller.js";
import { Order } from "../models/order.model.js";
import { OrderItem } from "../models/orderItem.model.js"; // { OrderItem }
import { ReasonChangeStatus } from "../models/reasonChangeStatus.model.js";
import { Shipper } from "../models/shipper.model.js";

const ShipperServices = {
    async getAllShippers(offset, limit) {
        const shippers = await Shipper.findAll({
            offset,
            limit,
        })
            .then((res) => res)
            .catch((err) => {
                console.log(err);
            });
        return shippers;
    },
    async getAllShippersPending(offset = 0, limit = 10) {
        const shippers = await Shipper.findAll({
            where: {
                status: "pending",
            },
            offset,
            limit,
        })
            .then((res) => res)
            .catch((err) => {
                console.log(err);
            });

        const total = await Shipper.count({
            where: {
                status: "pending",
            },
        });
        return { shippers, total };
    },

    async getOneShipperPending(id) {
        const shipper = await Shipper.findByPk(id)
            .then((res) => res)
            .catch((err) => {
                console.log(err);
            });
        return shipper;
    },

    async updateShipperPending(id, updatedStatus) {
        const transaction = await sequelize.transaction();
        try {
            const { status, reason } = updatedStatus;
            const newStatus = status === "rejected" ? "inactive" : "active";
            try {
                const updatedShipper = await Shipper.update(
                    {
                        status: newStatus,
                        joinedDate: new Date(),
                    },
                    {
                        where: {
                            id: id,
                        },
                        transaction: transaction,
                    },
                );

                // Kiểm tra xem shipper có tồn tại hay không
                if (updatedShipper[0] === null) {
                    await transaction.rollback();
                    throw new Error("Shipper not found");
                }

                await ReasonChangeStatus.create(
                    {
                        operatorID: 1,
                        pendingID: id,
                        role: "Shipper",
                        changedStatus: status,
                        reason: reason,
                    },
                    {
                        transaction: transaction,
                    },
                );

                await transaction.commit();
                return updatedShipper;
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

    async updateShipperStatus(id, status) {
        try {
            const shipper = await Shipper.findByPk(id);
            if (!shipper) {
                throw new Error("Shipper not found");
            }
            shipper.status = status;
            await shipper.save();
            return shipper;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getShipperById(id) {
        const shipper = await Shipper.findByPk(id);
        return shipper;
    },

    async getSumShippingFeeAllShippers(
        offset = 0,
        limit = 10,
        nameOrPhone = "",
        status = "",
        date = "",
    ) {
        const whereCondition = {
            ...(nameOrPhone && {
                [Op.or]: [
                    { name: { [Op.like]: `%${nameOrPhone}%` } },
                    { phone: { [Op.like]: `%${nameOrPhone}%` } },
                ],
            }),
            ...(status && { status }),
            ...(date && { joinedDate: { [Op.gte]: new Date(date) } }),
        };
        const sumShippingFee = await Order.findAll({
            attributes: [
                "shipper_id",
                [sequelize.fn("SUM", sequelize.col("shippingFee")), "sum_shipping_fee"],
                [sequelize.literal("SUM(shippingFee) * 0.9"), "sum_shipping_fee_adjusted"],
                [sequelize.fn("COUNT", sequelize.col("*")), "count_order"],
            ],
            offset,
            limit,
            include: [
                {
                    model: Shipper,
                    as: "Shipper",
                    where: whereCondition,
                },
            ],
            where: {
                payment_status: "paid",
            },
            group: "shipper_id",
        });

        const totalRevenue = sumShippingFee.reduce(
            (acc, row) => acc + Number.parseFloat(row.get("sum_shipping_fee")),
            0,
        );
        const totalOrders = sumShippingFee.reduce((acc, row) => acc + row.get("count_order"), 0);
        return { sumShippingFee, totalRevenue, totalOrders };
    },

    // async getOrdersOfShipper(id, statusFilter, shippingStatusFilter) {
    //     console.log("=================statusFilter: ", statusFilter);
    //     console.log("===================shippingStatusFilter: ", shippingStatusFilter);
    //     try {
    //         const whereCondition = {};

    //         if (statusFilter) {
    //             whereCondition.status = statusFilter;
    //         }
    //         if (shippingStatusFilter) {
    //             whereCondition.shipping_status = shippingStatusFilter;
    //         }

    //         const shipper = await Shipper.findOne({
    //             where: { id },
    //             attributes: ["id", "name"],
    //             include: [
    //                 {
    //                     model: Order,
    //                     as: "Orders",
    //                     attributes: ["id", "shippingFee", "status", "shipping_status", "note"],
    //                     where: whereCondition, // Áp dụng bộ lọc
    //                     order: [["createdAt", "DESC"]], // Sắp xếp theo ngày tạo mới nhất
    //                 },
    //             ],
    //         });
    //         console.log("whereCondition: ", whereCondition);

    //         return shipper;
    //     } catch (error) {
    //         throw new Error("Error fetching shipper orders: ",  error.message);
    //     }
    // },

    async getOrdersOfShipper(id, status, shipping_status) {
        try {
            const whereCondition = { shipper_id: id };

            if (status) {
                whereCondition.status = status;
            }

            if (shipping_status) {
                whereCondition.shipping_status = shipping_status;
            }

            const shipper = await Shipper.findOne({
                where: { id },
                attributes: ["id", "name"],
                include: [
                    {
                        model: Order,
                        as: "Orders",
                        attributes: ["id", "shippingFee", "status", "shipping_status", "note"],
                        where: whereCondition, // Lọc theo status và shipping_status
                        order: [["createdAt", "DESC"]], // Sắp xếp theo ngày tạo mới nhất
                    },
                ],
            });

            return shipper;
        } catch (error) {
            console.error("Error fetching shipper orders:", error);
            throw new Error("Error fetching shipper orders");
        }
    },

    async getTopShippers() {
        try {
            const shippers = await Shipper.findAll({
                attributes: [
                    "id",
                    "name",
                    [
                        Sequelize.fn(
                            "COALESCE",
                            Sequelize.fn("SUM", Sequelize.col("Orders.shippingFee")),
                            0,
                        ),
                        "total_revenue",
                    ],
                    [
                        Sequelize.fn(
                            "COALESCE",
                            Sequelize.fn(
                                "SUM",
                                Sequelize.literal(
                                    `CASE WHEN Orders.status = 'completed' THEN 1 ELSE 0 END`,
                                ),
                            ),
                            0,
                        ),
                        "completed_orders",
                    ],
                ],
                include: [
                    {
                        model: Order,
                        as: "Orders", // Kiểm tra alias này có đúng trong model Order không!
                        attributes: [],
                    },
                ],
                group: ["Shipper.id", "Shipper.name"],
                order: [
                    [Sequelize.literal("total_revenue"), "DESC"],
                    [Sequelize.literal("completed_orders"), "DESC"],
                ],
                limit: 5,
                subQuery: false,
            });

            return shippers;
        } catch (error) {
            throw new Error(`Error fetching top shippers: ${error.message}`);
        }
    },

    async getShippingStatusSummary() {
        try {
            const result = await Shipper.findAll({
                attributes: [
                    "id",
                    "name",
                    [
                        Sequelize.literal(
                            `COUNT(CASE WHEN orders.shipping_status = 'not_yet_shipped' THEN 1 ELSE NULL END)`,
                        ),
                        "not_yet_shipped",
                    ],
                    [
                        Sequelize.literal(
                            `COUNT(CASE WHEN orders.shipping_status = 'shipping' THEN 1 ELSE NULL END)`,
                        ),
                        "shipping",
                    ],
                    [
                        Sequelize.literal(
                            `COUNT(CASE WHEN orders.shipping_status = 'shipped' THEN 1 ELSE NULL END)`,
                        ),
                        "shipped",
                    ],
                ],
                include: [
                    {
                        model: Order,
                        as: "Orders",
                        attributes: [],
                    },
                ],
                group: ["Shipper.id", "Shipper.name"],
                order: [["id", "ASC"]],
                raw: true,
            });

            return result;
        } catch (error) {
            console.error("Error fetching shipping status summary:", error);
            throw new Error("Failed to fetch shipping status summary");
        }
    },

    async getTop10Shippers() {
        try {
            const topShippers = await Order.findAll({
                attributes: [
                    "shipper_id",
                    [Sequelize.col("Shipper.name"), "shipper_name"],
                    [
                        Sequelize.fn("DATE_FORMAT", Sequelize.col("Order.createdAt"), "%Y-%m"),
                        "order_month",
                    ],
                    [Sequelize.fn("SUM", Sequelize.col("Order.shippingFee")), "total_shipping_fee"],
                ],
                include: [
                    {
                        model: Shipper,
                        as: "Shipper",
                        attributes: [],
                    },
                ],
                where: {
                    shipper_id: {
                        [Sequelize.Op.ne]: null, // shipper_id IS NOT NULL
                    },
                },
                group: ["shipper_id", "Shipper.name", "order_month"],
                order: [
                    [Sequelize.literal("order_month"), "DESC"],
                    [Sequelize.literal("total_shipping_fee"), "DESC"],
                ],
                limit: 10,
                raw: true, // Trả về dữ liệu dưới dạng đối tượng JSON thuần túy
            });

            return topShippers;
        } catch (error) {
            console.error("Error fetching top 10 shippers:", error);
        }
    },

    async countActiveShippers() {
        try {
            const result = await Shipper.count({
                where: {
                    status: "active",
                    joinedDate: {
                        [Op.lte]: new Date(), // Lấy những shipper có joinedDate <= ngày hiện tại
                    },
                },
            });

            return result;
        } catch (error) {
            console.error("Error counting active shippers:", error);
        }
    },

    async countShippersJoinedToday() {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const count = await Shipper.count({
                where: {
                    joinedDate: {
                        [Op.gte]: today,
                        [Op.lt]: new Date(today.getTime() + 86400000),
                    },
                },
            });

            return count;
        } catch (error) {
            console.error("Error counting shippers joined today:", error);
            throw new Error("Database query failed");
        }
    },
    async getShipperDraftById(id) {
        try {
            const shipperDraft = await ReasonChangeStatus.findAll({
                attributes: ["reason"],
                where: {
                    pendingID: id,
                    role: "Shipper",
                    changedStatus: "savedraft",
                },
            });
            if (!shipperDraft) {
                throw new Error("Shipper draft not found");
            }
            return shipperDraft;
        } catch (error) {
            console.error("Error fetching shipping status summary:", error);
            throw new Error("Failed to fetch shipping status summary");
        }
    },

    async updateShipperDraftById(id, data) {
        const { status, reason } = data;
        try {
            if (status === "savedraft") {
                const oldDraft = await ReasonChangeStatus.findOne({
                    where: {
                        pendingID: id,
                        role: "Shipper",
                    },
                });
                if (!oldDraft) {
                    const newRecord = await ReasonChangeStatus.create({
                        operatorID: 1,
                        pendingID: id,
                        role: "Shipper",
                        changedStatus: "savedraft",
                        reason: reason,
                    });
                    return newRecord;
                }
                const shipperDraft = await ReasonChangeStatus.update(
                    {
                        reason: data.reason,
                    },
                    {
                        where: {
                            pendingID: id,
                            role: "Shipper",
                        },
                    },
                );
                return shipperDraft;
            }
            ShipperServices.updateShipperPending(id, data);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async countActiveShippers() {
        try {
            const result = await Shipper.count({
                where: {
                    status: "active",
                    joinedDate: {
                        [Op.lte]: new Date(), // Lấy những shipper có joinedDate <= ngày hiện tại
                    },
                },
            });

            return result;
        } catch (error) {
            console.error("Error counting active shippers:", error);
        }
    },

    async countShippersJoinedToday() {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const count = await Shipper.count({
                where: {
                    joinedDate: {
                        [Op.gte]: today,
                        [Op.lt]: new Date(today.getTime() + 86400000),
                    },
                },
            });

            return count;
        } catch (error) {
            console.error("Error counting shippers joined today:", error);
            throw new Error("Database query failed");
        }
    },
};

export default ShipperServices;
