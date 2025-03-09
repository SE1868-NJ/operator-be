//order.service.js
import { Op, Sequelize, literal } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { Order } from "../models/order.model.js";
import { OrderItem } from "../models/orderItem.model.js";
import { Product } from "../models/product.model.js";
import { Shop } from "../models/shop.model.js";
import { User } from "../models/user.model.js";

const orderService = {
    async getAllOrders(offset = 0, limit = 10) {
        try {
            const orders = await Order.findAll({
                attributes: [
                    "id",
                    "shop_id",
                    "customer_id",
                    "shipper_id",
                    "address_id",
                    "productFee",
                    "shippingFee",
                    "status",
                    "total",
                    "note",
                    "payment_status",
                    "shipping_status",
                    "payment_method",
                    "createdAt",
                ],
                include: [
                    {
                        model: OrderItem,
                        as: "OrderItems",
                        include: [
                            {
                                model: Product,
                                as: "Product",
                            },
                        ],
                    },
                ],
                offset,
                limit,
            });

            const total = await Order.count({});

            return { orders, total };
        } catch (error) {
            console.log("Lỗi khi lấy data", error);
            throw error;
        }
    },

    async getAllOrderByTime(
        // theo các khung giờ
        distanceTime = "DAY",
        offset = 0,
        limit = 10,
        filterData = {},
    ) {
        const whereClause = {};
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

        // Lọc Owner
        const ownerClause = {};
        if (filterData?.ownerName) {
            ownerClause.fullName = { [Op.like]: `%${filterData.ownerName}%` };
        }

        const shipperClause = {};
        const customerClause = {};
        // Lọc Shipper
        if (filterData?.shipperName) {
            shipperClause.name = { [Op.like]: `%${filterData.shipperName}%` };
        }
        // Lọc Customer
        if (filterData?.customerName) {
            customerClause.fullName = { [Op.like]: `%${filterData.customerName}%` };
        }

        try {
            const orders = await Order.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: literal(
                            `NOW() + INTERVAL 7 HOUR - INTERVAL 1  + ${distanceTime}`,
                        ),
                    },
                },
                include: [
                    {
                        model: Shop,
                        as: "Shop",
                        where: whereClause,
                        include: [
                            {
                                model: User,
                                as: "Owner",
                                where: ownerClause,
                            },
                        ],
                    },
                ],
                order: [["createdAt", "DESC"]],
                offset,
                limit,
            });

            const total = await Order.count({
                where: {
                    createdAt: {
                        [Op.gte]: literal(`NOW() + INTERVAL 7 HOUR - INTERVAL 1 + ${distanceTime}`),
                    },
                },
                include: [
                    {
                        model: Shop,
                        as: "Shop",
                        where: whereClause,
                        include: [
                            {
                                model: User,
                                as: "Owner",
                                where: ownerClause,
                            },
                        ],
                    },
                ],
            });

            return { orders, total };
        } catch (error) {
            console.error("Lỗi khi lấy doanh thu all shops theo thời gian:", error);
            throw error;
        }
    },

    async getOrderById(id) {
        try {
            const order = await Order.findByPk(id, {
                include: [
                    {
                        model: OrderItem,
                        as: "OrderItems",
                        include: [
                            {
                                model: Product,
                                as: "Product",
                            },
                        ],
                    },
                ],
            });

            if (!order) {
                throw new Error("Order not found");
            }

            return order;
        } catch (error) {
            console.error("Error fetching order by ID:", error);
            throw error;
        }
    },

    async getNewReportCount(timeRange) {
        const now = new Date();
        let startTime;
        let dateGroupFormat;

        switch (timeRange) {
            case "24h":
                startTime = new Date(now - 24 * 60 * 60 * 1000);
                dateGroupFormat = "%Y-%m-%d %H:00:00"; // Group by hour
                break;
            case "7d":
                startTime = new Date(now - 7 * 24 * 60 * 60 * 1000);
                dateGroupFormat = "%Y-%m-%d"; // Group by day
                break;
            case "1m":
                startTime = new Date(now.setMonth(now.getMonth() - 1));
                dateGroupFormat = "%Y-%m-%d"; // Group by day
                break;
            case "1y":
                startTime = new Date(now.setFullYear(now.getFullYear() - 1));
                dateGroupFormat = "%Y-%m"; // Group by month
                break;
            case "all":
                startTime = null;
                dateGroupFormat = "%Y-%m"; // Group by month
                break;
            default:
                throw new Error("Invalid time range");
        }

        const whereCondition = startTime ? { createdAt: { [Op.gte]: startTime } } : {};

        const reports = await Order.findAll({
            attributes: [
                [
                    sequelize.fn(
                        "DATE_FORMAT",
                        sequelize.fn("CONVERT_TZ", sequelize.col("createdAt"), "+00:00", "+07:00"),
                        dateGroupFormat,
                    ),
                    "time",
                ],
                [sequelize.fn("COUNT", sequelize.col("id")), "count"],
            ],
            where: whereCondition,
            group: ["time"],
            order: [["time", "ASC"]],
        });

        return reports.map((report) => ({
            time: report.dataValues.time,
            count: report.dataValues.count,
        }));
    },
};

export default orderService;
