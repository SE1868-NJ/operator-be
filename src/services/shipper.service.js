import { join } from "path";
import { Op, Sequelize, where } from "sequelize";
// import { generateCSVReport } from '../utils/csvUtils';
import sequelize from "../config/sequelize.config.js";
import { getShipperById, updateShipperPending } from "../controllers/shipper.controller.js";
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
            const { status, description } = updatedStatus;
            const newStatus = status === "rejected" ? "inactive" : "active";
            const reason = description || "Hệ thống đã lưu thông tin";

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

                // Kiểm tra xem shop có tồn tại hay không
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

    async getSumShippingFeeAllShippers(offset = 0, limit = 10) {
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

    async getOrdersOfShipper(id) {
        try {
            const shipper = await Shipper.findOne({
                where: { id },
                attributes: ["id", "name"],
                include: [
                    {
                        model: Order,
                        as: "Orders",
                        attributes: ["id", "shippingFee", "status", "shipping_status", "note"],
                        order: [["createdAt", "DESC"]], // Sắp xếp theo ngày tạo mới nhất
                    },
                ],
            });

            return shipper;
        } catch (error) {
            throw new Error("Error fetching shipper orders: ");
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
};

export default ShipperServices;
