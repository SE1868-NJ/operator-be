import { GoogleGenerativeAI } from "@google/generative-ai";
import { Op, Sequelize, literal } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { Address } from "../models/address.model.js";
import { Feedback } from "../models/feedback.model.js";
import { Media } from "../models/media.model.js";
import { MediaItem } from "../models/mediaItem.model.js";
import { Order } from "../models/order.model.js";
import { OrderItem } from "../models/orderItem.model.js";
import { Product } from "../models/product.model.js";
import { ReasonChangeStatus } from "../models/reasonChangeStatus.model.js";
import { ReplyFeedback } from "../models/replyFeedback.model.js";
import { Shipper } from "../models/shipper.model.js";
import { Shop } from "../models/shop.model.js";
import { User } from "../models/user.model.js";
import { model } from "../utils/gemini.js";

const ShopService = {
    async getProductById(id) {
        try {
            const product = await Product.findByPk(id, {
                include: [
                    {
                        model: OrderItem,
                        as: "OrderItems",
                        required: false,
                        include: [
                            {
                                model: Order,
                                as: "Order",
                                include: [
                                    {
                                        model: User,
                                        as: "Customer",
                                    },
                                ],
                            },
                            {
                                model: Feedback,
                                as: "Feedbacks",
                                required: false,
                                include: [
                                    {
                                        model: User,
                                        as: "Customer", // ✅ Người mua feedback
                                    },
                                    {
                                        model: ReplyFeedback,
                                        as: "Reply",
                                        include: [
                                            {
                                                model: User,
                                                as: "ReplyUser", // ✅ Người phản hồi
                                            },
                                        ],
                                    },
                                    {
                                        model: Media,
                                        as: "Media",
                                        include: [
                                            {
                                                model: MediaItem,
                                                as: "MediaItems",
                                            },
                                        ],
                                    },
                                ],
                                order: [["ID", "DESC"]],
                            },
                        ],
                    },
                ],
            });

            if (!product) {
                throw new Error("Product not found");
            }

            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    },
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
    async getOrderByShopId(id, offset, limit) {
        const o = Number.parseInt(offset) || 0;
        const l = Number.parseInt(limit) || 5;
        try {
            const { count, rows: orders } = await Order.findAndCountAll({
                where: {
                    shop_id: id,
                },
                include: [
                    {
                        model: User,
                        as: "Customer",
                    },
                ],
                offset: o,
                limit: l,
                order: [["id", "DESC"]],
            });

            if (!orders || orders.length === 0) {
                throw new Error("No orders found for this shop");
            }

            // Tính tổng số trang
            const totalPages = Math.ceil(count / l);

            return {
                orders,
                totalOrders: count,
                totalPages,
                currentPage: Math.floor(o / l) + 1,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getProductByShopId(id, offset, limit, filterData = {}) {
        const o = Number.parseInt(offset) || 0;
        const l = Number.parseInt(limit) || 5;
        const minPrice = Number(filterData.minPrice) || undefined;
        const maxPrice = Number(filterData.maxPrice) || undefined;
        try {
            const whereClause = { shop_id: id }; // Mặc định lọc theo shop_id

            // Lọc theo tên sản phẩm (tìm kiếm gần đúng)
            if (filterData?.productName) {
                whereClause.product_name = {
                    [Op.like]: `%${filterData.productName}%`,
                };
            }

            // Lọc theo khoảng giá (min - max)
            if (filterData?.minPrice && filterData?.maxPrice) {
                whereClause.price = {
                    [Op.between]: [minPrice, maxPrice],
                };
            } else if (filterData?.minPrice) {
                whereClause.price = {
                    [Op.gte]: minPrice, // Lọc sản phẩm có giá >= minPrice
                };
            } else if (filterData?.maxPrice) {
                whereClause.price = {
                    [Op.lte]: maxPrice, // Lọc sản phẩm có giá <= maxPrice
                };
            }

            // Dùng `findAndCountAll()` để lấy tổng số sản phẩm và danh sách sản phẩm cùng lúc
            const { count, rows: products } = await Product.findAndCountAll({
                where: whereClause, // Áp dụng bộ lọc vào truy vấn
                distinct: true,
                include: [
                    {
                        model: OrderItem,
                        as: "OrderItems",
                        required: false,
                    },
                ],
                offset: o,
                limit: l,
                order: [["product_id", "ASC"]],
            });

            if (!products || products.length === 0) {
                throw new Error("No products found for this shop");
            }

            // Tính tổng số trang
            const totalPages = Math.ceil(count / l);

            return {
                products,
                totalProducts: count,
                totalPages,
                currentPage: Math.floor(o / l) + 1, // Xác định trang hiện tại
            };
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
    async getFeedbacksByShopId(id) {
        try {
            // 1️⃣ Lấy danh sách feedbacks của cửa hàng
            const feedbacks = await Feedback.findAll({
                include: [
                    {
                        model: User,
                        as: "Customer", // ✅ Người mua feedback
                    },
                    {
                        model: ReplyFeedback,
                        as: "Reply",
                        include: [
                            {
                                model: User,
                                as: "ReplyUser", // ✅ Người phản hồi
                            },
                        ],
                    },
                    {
                        model: Media,
                        as: "Media",
                        include: [
                            {
                                model: MediaItem,
                                as: "MediaItems",
                            },
                        ],
                    },
                    {
                        model: OrderItem,
                        as: "OrderItem", // ✅ Alias đúng vì Feedback belongsTo OrderItem
                        required: true, // ✅ Chỉ lấy Feedback có OrderItem
                        include: [
                            {
                                model: Order,
                                as: "Order",
                                where: {
                                    shop_id: id, // ✅ Lọc theo shopID
                                },
                                required: true, // ✅ Chỉ lấy Order có shop_id phù hợp
                            },
                            {
                                model: Product,
                                as: "Product",
                            },
                        ],
                    },
                ],
                order: [["ID", "DESC"]],
            });
            if (!feedbacks) {
                throw new Error("Feedback not found");
            }

            // 2️⃣ Kiểm tra nếu không có feedback nào
            if (!feedbacks.length) {
                return "Chưa có đánh giá nào về cửa hàng này";
            }

            // 3️⃣ Chuyển feedbacks thành đoạn văn bản để gửi cho AI
            const feedbackText = feedbacks
                .map(
                    (fb, index) =>
                        `${index + 1}. **Khách hàng**: ${fb.Customer.fullName} | **Sản phẩm**: ${
                            fb.OrderItems?.Product?.product_name || "Không xác định"
                        } | **Số sao**: ${fb.star}/5\n**Nội dung**: ${fb.content}\n`,
                )
                .join("\n");

            // 4️⃣ Tạo prompt gửi đến AI
            const prompt = `
                Bạn là một trợ lý AI chuyên đánh giá mức độ hài lòng của khách hàng về các cửa hàng thương mại điện tử.
                Dưới đây là danh sách các phản hồi từ khách hàng về cửa hàng này:

                ${feedbackText}

                Dựa trên những phản hồi trên, hãy đưa ra nhận xét tổng quan về cửa hàng. Đánh giá chất lượng dịch vụ và sản phẩm. 
                Trả lời bằng một đoạn văn ngắn từ 3-5 câu.
            `;

            // 5️⃣ Gửi dữ liệu đến AI và nhận phản hồi
            const result = await model.generateContent(prompt);
            const aiReview = result.response.text();

            return { feedbacks, aiReview };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getShopById(id) {
        console.log("B1");
        try {
            const shop = await Shop.findByPk(id, {
                include: [
                    {
                        model: User,
                        as: "Owner", // Chủ shop
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
    async updateShopStatus(id, updatedStatus) {
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
    async getNewOrderCount(id, timeRange) {
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

        const whereCondition = startTime ? { createdAt: { [Op.gte]: startTime }, shop_id: id } : {};

        const orders = await Order.findAll({
            attributes: [
                [sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), dateGroupFormat), "date"],
                [sequelize.fn("COUNT", sequelize.col("id")), "count"],
            ],
            where: whereCondition,
            group: ["date"],
            order: [["date", "ASC"]],
        });

        return orders.map((order) => ({
            date: order.dataValues.date,
            count: order.dataValues.count,
        }));
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
                [
                    Sequelize.fn(
                        "DAYOFWEEK",
                        Sequelize.literal("(ADDDATE(`createdAt`, INTERVAL 7 HOUR))"),
                    ),
                    "DayOfWeek",
                ],
                [
                    Sequelize.fn(
                        "DATE",
                        Sequelize.literal("(ADDDATE(`createdAt`, INTERVAL 7 HOUR))"),
                    ),
                    "time",
                ],
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
                [
                    Sequelize.fn(
                        "DAYOFWEEK",
                        Sequelize.literal("(ADDDATE(`createdAt`, INTERVAL 7 HOUR))"),
                    ),
                    "DayOfWeek",
                ],
                [
                    Sequelize.fn(
                        "DATE",
                        Sequelize.literal("(ADDDATE(`createdAt`, INTERVAL 7 HOUR))"),
                    ),
                    "created_at",
                ],
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
                        where: {
                            shopStatus: {
                                [Op.like]: "tax_warning",
                            },
                        },
                    },
                ],
                where: {
                    createdAt: {
                        [Op.gte]: literal(
                            "NOW() + INTERVAL 7 HOUR - INTERVAL 5 DAY - INTERVAL 1 MONTH",
                        ),
                        [Op.lte]: literal("NOW() + INTERVAL 7 HOUR - INTERVAL 5 DAY"),
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
    async banShopLateTax(shopID) {
        const transaction = await sequelize.transaction();
        try {
            const newStatus = "suspended";

            try {
                const updatedShop = await Shop.update(
                    {
                        shopStatus: newStatus,
                    },
                    {
                        where: {
                            shopStatus: "tax_warning",
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
                        changedStatus: "rejected",
                        reason: "Late tax payment",
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
    async unBanShopDelayTax(shopID) {
        const transaction = await sequelize.transaction();
        try {
            const newStatus = "active";

            try {
                const updatedShop = await Shop.update(
                    {
                        shopStatus: newStatus,
                    },
                    {
                        where: {
                            shopStatus: "tax_warning",
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
                        changedStatus: "accepted",
                        reason: "This shop paid tax on time",
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
