import { Op, Sequelize, literal } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { Address } from "../models/address.model.js";
import { Order } from "../models/order.model.js";
import { OrderItem } from "../models/orderItem.model.js";
import { ReasonChangeStatus } from "../models/reasonChangeStatus.model.js";
import { Shipper } from "../models/shipper.model.js";
import { Shop } from "../models/shop.model.js";
import { User } from "../models/user.model.js";

const ShopService = {
    async getAllShops(offset, limit, filterData = {}) {
        const o = Number.parseInt(offset) || 0;
        const l = Number.parseInt(limit) || 10;
        try {
            const whereClause = {};

            //Loc shop

            if (filterData?.shopName) {
                whereClause.shopName = {
                    [Op.like]: `%${filterData.shopName}%`,
                };
            }
            if (filterData?.shopEmail) {
                whereClause.shopEmail = {
                    [Op.like]: `%${filterData.shopEmail}%`,
                };
            }

            if (filterData?.shopPhone) {
                whereClause.shopPhone = {
                    [Op.like]: `%${filterData.shopPhone}%`,
                };
            }
            if (filterData?.shopStatus) {
                whereClause.shopStatus = filterData.shopStatus;
            } else {
                whereClause.shopStatus = {
                    [Op.or]: ["active", "suspended"],
                };
            }
            const includeClause = [
                {
                    model: User,
                    as: "Owner",
                    where: {},
                    required: true,
                },
            ];

            //Loc user
            if (filterData?.ownerName) {
                includeClause[0].where.fullName = {
                    [Op.like]: `%${filterData.ownerName}%`,
                };
            }

            const shops = await Shop.findAll({
                where: whereClause,
                include: includeClause,
                offset: o,
                limit: l,
                order: [["shopID", "ASC"]],
            });

            const totalShops = await Shop.count({
                where: whereClause,
                include: includeClause,
            });

            return { shops, totalShops };
        } catch (error) {
            console.log("Error fetching shops: ", error);
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
        const role = "Shop";
        try {
            // Lọc Shop
            const includeClause = [
                {
                    model: Shop,
                    as: "shop",
                    where: {},
                    include: [
                        {
                            model: User,
                            as: "Owner",
                            where: {},
                            required: true,
                        },
                    ],
                    required: true,
                },
            ];

            if (filterData?.shopName) {
                includeClause[0].where.shopName = {
                    [Op.like]: `%${filterData.shopName}%`,
                };
            }
            if (filterData?.shopEmail) {
                includeClause[0].where.shopEmail = {
                    [Op.like]: `%${filterData.shopEmail}%`,
                };
            }
            if (filterData?.shopPhone) {
                includeClause[0].where.shopPhone = {
                    [Op.like]: `%${filterData.shopPhone}%`,
                };
            }
            if (filterData?.ownerName) {
                includeClause[0].include[0].where.fullName = {
                    [Op.like]: `%${filterData.ownerName}%`,
                };
            }

            const approvedShops = await ReasonChangeStatus.findAll({
                where: {
                    operatorID: 1,
                    role: role,
                },
                include: includeClause,
                offset: offset,
                limit: limit,
                order: [["createdAt", "DESC"]],
            });

            const totalApprovedShops = await ReasonChangeStatus.count({
                where: {
                    operatorID: 1,
                    role: role,
                },
                include: includeClause,
            });

            return { approvedShops, totalApprovedShops };
        } catch (error) {
            console.error("Error fetching approved shops:", error);
            throw new Error(error.message);
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
            const { status, description } = updatedStatus;
            const newStatus = status === "active" ? "suspended" : "active";
            const reason = description;

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

                await ReasonChangeStatus.create(
                    {
                        operatorID: 1,
                        shopID: id,
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
    async updateShopStatus(shopID, updatedStatus) {
        const transaction = await sequelize.transaction();
        try {
            const { status, description } = updatedStatus;
            const newStatus = status === "accepted" ? "active" : "rejected";
            const joinedDate = new Date();
            const reason = description;

            try {
                const updatedShop = await Shop.update(
                    {
                        shopStatus: newStatus,
                        shopJoinedDate: joinedDate,
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

    // hàm này là để hiển thị ở bảng thống kê 7 ngày, 1 tháng, 1 năm, 5 năm
    async getLastTimesRevenues(id, distanceTime = "1 DAY", offset = 0, limit = 10) {
        let whereClause = {};
        const includeClause = [
            {
                model: Shop,
                as: "Shop",
                include: [
                    {
                        model: User,
                        as: "Owner",
                    },
                ],
            },
        ];
        let attributes = [];
        // nếu có id là lấy thống kê của shop đó
        if (id) {
            whereClause = {
                createdAt: {
                    [Op.gte]: literal(`NOW() + INTERVAL 7 HOUR - INTERVAL ${distanceTime}`),
                },
                shop_id: id,
            };
            attributes = [
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
                [Sequelize.literal("DATE_ADD(createdAt, INTERVAL 7 HOUR)"), "created_at"],
            ];
        } else {
            // nếu không có id thì là lấy của toàn sàn
            whereClause = {
                createdAt: {
                    [Op.gte]: literal(`NOW() + INTERVAL 7 HOUR - INTERVAL ${distanceTime}`),
                },
            };
            attributes = ["shop_id", "createdAt"];
        }

        if (id) {
            try {
                const lastTimesRevenueShop = await Order.findAll({
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
                        [Sequelize.literal("DATE_ADD(createdAt, INTERVAL 7 HOUR)"), "created_at"],
                        // [Sequelize.fn('SUM', Sequelize.col('total')), 'totalRevenue'],  // Đã sửa tham chiếu cót ở đây
                    ],
                    where: whereClause,
                    include: includeClause,
                    order: [["created_at", "DESC"]],
                    offset,
                    limit,
                });
                return lastTimesRevenueShop;
            } catch (error) {
                console.error("Lỗi khi lấy doanh thu theo thời gian:", error);
            }
        } else {
            try {
                const lastTimesRevenueShops = await Order.findAll({
                    attributes: [
                        "shop_id",
                        [Sequelize.fn("SUM", Sequelize.col("total")), "totalRevenue"],
                        "createdAt",
                    ],
                    where: whereClause,
                    include: includeClause,
                    order: [["createdAt", "DESC"]],
                    group: ["shop_id", "createdAt"],
                    offset,
                    limit,
                });
                return lastTimesRevenueShops;
            } catch (error) {
                console.error("Lỗi khi lấy doanh thu theo thời gian:", error);
            }
        }
    },

    // Danh sách các shop cùng với tổng doanh thu trong 1 ngày, 1 tuần, 1 tháng, ....
    // theo các khung giờ
    async getRevenueByTimeAllShops(distanceTime = "DAY") {
        let group = [];
        let attributes = [];
        if (distanceTime.toUpperCase().includes("DAY")) {
            attributes = [
                [Sequelize.fn("SUM", Sequelize.col("total")), "totalRevenue"],
                [
                    Sequelize.literal(
                        "ADDDATE(DATE_FORMAT(`createdAt`, '%Y-%m-%d %H:00:00'), INTERVAL 7 HOUR)",
                    ),
                    "time",
                ],
                [Sequelize.literal("HOUR(ADDDATE(`createdAt`, INTERVAL 7 HOUR))"), "atHour"],
            ];
            group = ["time"];
        } else if (distanceTime.toUpperCase().includes("WEEK")) {
            attributes = [
                [Sequelize.fn("SUM", Sequelize.col("total")), "totalRevenue"],
                [Sequelize.fn("DAYOFWEEK", Sequelize.col("createdAt")), "DayOfWeek"],
                [Sequelize.fn("DATE", Sequelize.col("createdAt")), "time"],
            ];
            group = ["DayOfWeek", "time"];
        } else if (distanceTime.toUpperCase().includes("MONTH")) {
            attributes = [
                [Sequelize.fn("SUM", Sequelize.col("total")), "totalRevenue"],
                [Sequelize.fn("DATE", Sequelize.col("createdAt")), "time"],
            ];
            group = ["time"];
        } else if (distanceTime.toUpperCase().includes("YEAR")) {
            attributes = [
                [Sequelize.fn("SUM", Sequelize.col("total")), "totalRevenue"],
                [Sequelize.literal("DATE_FORMAT(`createdAt`, '%Y-%m')"), "time"],
            ];
            group = ["time"];
        }
        try {
            const revenues = await Order.findAll({
                attributes: attributes,
                where: {
                    createdAt: {
                        [Op.gte]: literal(`NOW() + INTERVAL 7 HOUR - INTERVAL 1 ${distanceTime}`),
                    },
                },
                group: group,
            });

            return { revenues };
        } catch (error) {
            console.error("Lỗi khi lấy doanh thu all shops theo thời gian:", error);
            throw error;
        }
    },

    async getRenenueByTimeOneShop(id, distanceTime = "1 DAY", offset = 0, limit = 10) {
        let attributes = [];
        let group = [];
        if (distanceTime.toUpperCase().includes("DAY")) {
            attributes = [
                [Sequelize.fn("SUM", Sequelize.col("total")), "totalRevenue"],
                [Sequelize.literal("DATE_FORMAT(createdAt, '%Y-%m-%d %H:00:00')"), "created_at"],
            ];
            group = ["created_at"];
        } else if (distanceTime.toUpperCase().includes("WEEK")) {
            attributes = [
                [Sequelize.fn("SUM", Sequelize.col("total")), "totalRevenue"],
                [Sequelize.fn("DAYOFWEEK", Sequelize.col("createdAt")), "DayOfWeek"],
                [Sequelize.fn("DATE", Sequelize.col("createdAt")), "created_at"],
            ];
            group = ["DayOfWeek", "created_at"];
        } else if (distanceTime.toUpperCase().includes("MONTH")) {
            attributes = [
                [Sequelize.fn("SUM", Sequelize.col("total")), "totalRevenue"],
                [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "created_month"],
                [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "created_year"],
            ];
            group = ["created_month", "created_year"];
        } else if (distanceTime.toUpperCase().includes("YEAR")) {
            attributes = [
                [Sequelize.fn("SUM", Sequelize.col("total")), "totalRevenue"],
                [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "created_at"],
            ];
            group = ["created_at"];
        }
        try {
            const lastTimesRevenues = await Order.findAll({
                attributes: attributes,
                where: {
                    createdAt: {
                        [Op.gte]: literal(`NOW() + INTERVAL 7 HOUR - INTERVAL ${distanceTime}`),
                    },
                    shop_id: id,
                },
                include: [
                    {
                        model: Shop,
                        as: "Shop",
                        include: [
                            {
                                model: User,
                                as: "Owner",
                            },
                        ],
                    },
                ],
                group: group,
                order: [["totalRevenue", "DESC"]],
                offset,
                limit,
            });
            return lastTimesRevenues;
        } catch (error) {
            console.error("Lỗi khi lấy doanh thu 1 shop theo thời gian:", error);
            throw error;
        }
    },

    // danh sách các shop với số orders và tổng doanh thu theo ngày - tháng - năm
    // hiển thị ở allShopsRevenue
    async getTotalRevenueShopsByTime(
        day,
        month,
        year = 2025,
        offset = 0,
        limit = 10,
        filterData = {},
    ) {
        let monthUp = 12;
        let monthDown = 1;
        let dayUp = 31;
        let dayDown = 1;
        if (month) {
            monthUp = month;
            monthDown = month;
            if (day) {
                dayUp = day;
                dayDown = day;
            }
        }

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

        const startDate = `${year}-${monthDown}-${dayDown} 00:00:00`;
        const endDate = `${year}-${monthUp}-${dayUp} 23:59:59`;

        const startDateWith7Hours = new Date(startDate);
        startDateWith7Hours.setHours(startDateWith7Hours.getHours() + 7);
        const endDateWith7Hours = new Date(endDate);
        endDateWith7Hours.setHours(endDateWith7Hours.getHours() + 7);

        try {
            const totalRevenue = await Order.findAll({
                attributes: [
                    "shop_id",
                    [Sequelize.fn("SUM", Sequelize.col("total")), "totalRevenue"],
                    [Sequelize.fn("COUNT", Sequelize.col("total")), "totalOrder"],
                ],
                where: {
                    createdAt: {
                        [Op.and]: [
                            { [Op.gte]: startDateWith7Hours },
                            { [Op.lt]: endDateWith7Hours },
                        ],
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
                group: ["shop_id"],
                offset,
                limit,
            });

            const total = await Shop.count({
                include: [
                    {
                        model: Order,
                        as: "Orders",
                        attributes: [],
                        where: {
                            createdAt: {
                                [Op.and]: [
                                    { [Op.gte]: startDateWith7Hours },
                                    { [Op.lt]: endDateWith7Hours },
                                ],
                            },
                        },
                    },
                    {
                        model: User,
                        as: "Owner",
                        where: ownerClause,
                    },
                ],
                where: whereClause,
                distinct: true,
            });
            return { totalRevenue, total };
        } catch (error) {
            console.error("Lỗi khi lấy doanh thu all shops theo thời gian:", error);
            throw error;
        }
    },

    // lấy danh sách các orders của 1 shop theo ngày - tháng - năm
    // hiển thị bảng ở trang shopRevenueDetail
    async getRevenueOneShopByTime(
        id,
        day,
        month,
        year = 2025,
        offset = 0,
        limit = 10,
        filterData = {},
    ) {
        let monthUp = 12;
        let monthDown = 1;
        let dayUp = 31;
        let dayDown = 1;
        if (month) {
            monthUp = month;
            monthDown = month;
            if (day) {
                dayUp = day;
                dayDown = day;
            }
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

        const startDate = `${year}-${monthDown}-${dayDown} 00:00:00`;
        const endDate = `${year}-${monthUp}-${dayUp} 23:59:59`;

        const startDateWith7Hours = new Date(startDate);
        startDateWith7Hours.setHours(startDateWith7Hours.getHours() + 7);
        const endDateWith7Hours = new Date(endDate);
        endDateWith7Hours.setHours(endDateWith7Hours.getHours() + 7);

        try {
            const orders = await Order.findAll({
                where: {
                    createdAt: {
                        [Op.and]: [
                            { [Op.gte]: startDateWith7Hours },
                            { [Op.lt]: endDateWith7Hours },
                        ],
                    },
                    shop_id: id,
                },
                include: [
                    {
                        model: Shop,
                        as: "Shop",
                        include: [
                            {
                                model: User,
                                as: "Owner",
                            },
                        ],
                    },
                    {
                        model: Shipper,
                        as: "Shipper",
                        where: shipperClause,
                    },
                    {
                        model: User,
                        as: "Customer",
                        where: customerClause,
                    },
                    {
                        model: Address,
                        as: "Address",
                    },
                ],
                offset,
                limit,
            });

            const total = await Order.count({
                where: {
                    createdAt: {
                        [Op.and]: [
                            { [Op.gte]: startDateWith7Hours },
                            { [Op.lt]: endDateWith7Hours },
                        ],
                    },
                    shop_id: id,
                },
                include: [
                    {
                        model: Shop,
                        as: "Shop",
                        include: [
                            {
                                model: User,
                                as: "Owner",
                            },
                        ],
                    },
                    {
                        model: Shipper,
                        as: "Shipper",
                        where: shipperClause,
                    },
                    {
                        model: User,
                        as: "Customer",
                        where: customerClause,
                    },
                ],
            });
            return { orders, total };
        } catch (error) {
            console.error("Lỗi khi lấy danh sách đơn hàng của 1 shop theo thời gian:", error);
            throw error;
        }
    },

    // lấy ra tổng doanh thu và số đơn hàng của toàn sàn theo khoảng thời gian gần nhất
    // hiển thị thống kê trên cùng của trang thống kê hệ thống
    async getTotalRevenueAllShopsByLastTime(distanceTime = "DAY") {
        try {
            const totalRevenues = await Order.sum("total", {
                where: {
                    createdAt: {
                        [Op.gte]: literal(`NOW() + INTERVAL 7 HOUR - INTERVAL 1 ${distanceTime}`),
                    },
                },
            });

            const totalOrders = await Order.count({
                where: {
                    createdAt: {
                        [Op.gte]: literal(`NOW() + INTERVAL 7 HOUR - INTERVAL 1 ${distanceTime}`),
                    },
                },
            });

            if (totalRevenues === null) {
                return { totalRevenues: 0, totalOrders: 0 };
            }
            return { totalRevenues, totalOrders };
        } catch (error) {
            console.error("Lỗi khi lấy tổng doanh thu tất cả các shops theo thời gian:", error);
            throw error;
        }
    },

    // lấy ra tổng doanh thu và số đơn hàng của 1 shop theo khoảng thời gian gần nhất
    // hiển thị thống kê trên cùng ở trang detail shop revenue
    async getTotalRevenueOneShopByLastTime(id, distanceTime = "DAY") {
        try {
            const totalRevenues = await Order.sum("total", {
                where: {
                    createdAt: {
                        [Op.gte]: literal(`NOW() + INTERVAL 7 HOUR - INTERVAL 1 ${distanceTime}`),
                    },
                    shop_id: id,
                },
            });

            const totalOrders = await Order.count({
                where: {
                    createdAt: {
                        [Op.gte]: literal(`NOW() + INTERVAL 7 HOUR - INTERVAL 1 ${distanceTime}`),
                    },
                    shop_id: id,
                },
            });

            if (totalRevenues === null) {
                return { totalRevenues: 0, totalOrders: 0 };
            }

            return { totalRevenues, totalOrders };
        } catch (error) {
            console.error("Lỗi khi lấy tổng doanh thu 1 shop theo thời gian:", error);
            throw error;
        }
    },

    async getRevenueLastMonthAllShops() {
        try {
            const revenues = await Order.findAll({
                attributes: [
                    "shop_id",
                    [Sequelize.fn("SUM", Sequelize.col("total")), "totalRevenue"],
                ],
                include: [
                    {
                        model: Shop,
                        as: "Shop",
                    },
                ],
                where: {
                    createdAt: {
                        [Op.gte]: literal("NOW() + INTERVAL 7 HOUR - INTERVAL 1 MONTH"),
                    },
                },
                group: ["shop_id"],
            });

            return revenues;
        } catch (error) {
            console.error("Lỗi khi lấy tổng doanh thu tất cả các shops theo tháng:", error);
            throw error;
        }
    },

    async getResendEmailShops() {
        try {
            const revenues = await Order.findAll({
                attributes: [
                    "shop_id",
                    [Sequelize.fn("SUM", Sequelize.col("total")), "totalRevenue"],
                ],
                include: [
                    {
                        model: Shop,
                        as: "Shop",
                    },
                ],
                where: {
                    createdAt: {
                        [Op.gte]: literal(
                            "NOW() + INTERVAL 7 HOUR - INTERVAL 5 DAY - INTERVAL 1 MONTH",
                        ),
                        [Op.lte]: literal("NOW() + INTERVAL 7 HOUR - INTERVAL 5 DAY"),
                    },
                    status: {
                        [Op.or]: [OrderStatus.DONE, OrderStatus.WAITING, OrderStatus.DELIVERING],
                    },
                },
                group: ["shop_id"],
            });

            return revenues;
        } catch (error) {
            console.error("Lỗi khi lấy tổng doanh thu tất cả các shops theo tháng:", error);
            throw error;
        }
    },
};

export default ShopService;
