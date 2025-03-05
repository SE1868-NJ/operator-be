import { GoogleGenerativeAI } from "@google/generative-ai";
import { Op } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { Feedback } from "../models/feedback.model.js";
import { Media } from "../models/media.model.js";
import { MediaItem } from "../models/mediaItem.model.js";
import { Order } from "../models/order.model.js";
import { OrderItem } from "../models/orderItem.model.js";
import { Product } from "../models/product.model.js";
import { ReasonChangeStatus } from "../models/reasonChangeStatus.model.js";
import { ReplyFeedback } from "../models/replyFeedback.model.js";
import { Shop } from "../models/shop.model.js";
import { User } from "../models/user.model.js";
import { model } from "../utils/gemini.js";

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
                        include: [
                            {
                                model: Feedback,
                                as: "Feedbacks",
                                required: false,
                            },
                        ],
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
                order: [["createAt", "DESC"]],
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
                                as: "ProductIT",
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
                            fb.OrderItems?.ProductIT?.product_name || "Không xác định"
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

        const whereCondition = startTime
            ? { created_at: { [Op.gte]: startTime }, shop_id: id }
            : {};

        const orders = await Order.findAll({
            attributes: [
                [sequelize.fn("DATE_FORMAT", sequelize.col("created_at"), dateGroupFormat), "date"],
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
};

export default ShopService;
