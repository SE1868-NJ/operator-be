import { Op, Sequelize, where } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
const userService = {
    async getAllUsers(page, limit, name, phone, status) {
        try {
            const offset = (page - 1) * limit;
            const whereCondition = {};
            if (name) {
                whereCondition.fullName = { [Op.like]: `%${name}%` }; // Tìm kiếm theo tên
            }

            if (phone) {
                whereCondition.userPhone = { [Op.like]: `%${phone}%` }; // Tìm kiếm theo SĐT
            }

            if (status) {
                whereCondition.status = status; // Lọc theo trạng thái
            }

            console.log(whereCondition);
            const response = await User.findAll({
                where: whereCondition,
                limit: Number(limit),
                offset: Number(offset),
            });

            // tinh total page
            const totalRecords = await User.count({ where: whereCondition });
            const totalPages = Math.ceil(totalRecords / limit);

            return {
                users: response,
                totalPages: totalPages,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getUserById(id) {
        const user = await User.findOne({ where: { userID: id } });
        return user;
    },
    async updateUserStatus(id, newStatus) {
        try {
            const user = await User.findOne({ where: { userID: id } });

            if (!user) {
                return false;
            }

            if (user.status !== newStatus) {
                await User.update(
                    { status: newStatus },
                    {
                        where: { userID: id },
                    },
                );
            }

            const updatedUser = await userService.getUserById(id);
            return updatedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getOrderList(page, limit, id) {
        const offset = (page - 1) * limit;
        const response = await Order.findAll({
            where: { customer_id: id },
            limit: Number(limit),
            offset: Number(offset),
        });

        // tinh total page
        const totalRecords = await Order.count({ where: { customer_id: id } });
        const totalPages = Math.ceil(totalRecords / limit);
        return {
            orders: response,
            totalPages: totalPages,
        };
    },
    async getOrderRecent4Months(id) {
        try {
            // Lấy thời gian hiện tại
            const now = new Date();
            const fourMonthsAgo = new Date();
            fourMonthsAgo.setMonth(now.getMonth() - 3); // Lùi lại 3 tháng (gồm cả tháng hiện tại)

            // Lấy danh sách đơn hàng trong 4 tháng gần nhất
            const orders = await Order.findAll({
                where: {
                    customer_id: id,
                    createdAt: {
                        [Op.between]: [fourMonthsAgo, now],
                    },
                },
                order: [["createdAt", "ASC"]], // Sắp xếp theo thời gian tăng dần
            });

            // Nhóm đơn hàng theo tháng
            const orderStats = {};
            for (const order of orders) {
                const month = order.createdAt.getMonth() + 1; // Lấy tháng (1-12)

                const key = `${order.createdAt.getFullYear()}-${month}`;

                if (!orderStats[key]) {
                    orderStats[key] = 0;
                }

                orderStats[key] += 1; // Đếm số đơn hàng
            }

            // Chuyển đổi thành mảng dữ liệu
            const result = Object.keys(orderStats).map((month) => ({
                name: month,
                orders: orderStats[month],
            }));

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getTop3Customer() {
        try {
            const topCustomers = await Order.findAll({
                attributes: [
                    "customer_id",
                    [sequelize.fn("COUNT", sequelize.col("Order.id")), "totalOrders"],
                ],
                include: [
                    {
                        model: User,
                        as: "Customer",
                        attributes: ["fullName", "userEmail", "userPhone"],
                    },
                ],
                group: ["customer_id", "Customer.userID"],
                order: [[sequelize.literal("totalOrders"), "DESC"]],
                limit: 3,
            });

            //console.log(topCustomers.map((c) => c.toJSON())); // In kết quả dưới dạng JSON
            return topCustomers.map((c) => c.toJSON());
        } catch (error) {
            throw new Error(error.message)
        }
    },

    async getTopCustomerByWeek(){
        
        try {
            const now = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(now.getDate() - 6); // vì lấy cả ngày hiện tại, tổng cộng 7
    
            // Query lấy top khách hàng theo số đơn hàng
            const getTopCustomerInWeekByOrder = await Order.findAll({
                where: {
                    status: "completed",
                    actual_delivery_time: {
                        [Op.between]: [sevenDaysAgo, now],
                    }
                },
                attributes: [
                    "customer_id",
                    [sequelize.fn("COUNT", sequelize.col("Order.id")), "totalOrders"],
                ],
                include: [
                    {
                        model: User,
                        as: "Customer",
                        attributes: ["avatar", "fullName"],
                    },
                ],
                group: ["customer_id", "Customer.userID"],
                order: [[sequelize.literal("totalOrders"), "DESC"]],
                limit: 5,
            });
    
            // Query lấy top khách hàng theo tổng tiền đơn hàng
            const getTopCustomerInWeekByTotal = await Order.findAll({
                where: {
                    status: "completed",
                    actual_delivery_time: {
                        [Op.between]: [sevenDaysAgo, now],
                    }
                },
                attributes: [
                    "customer_id",
                    [sequelize.fn("SUM", sequelize.col("Order.total")), "totalMoney"],
                ],
                include: [
                    {
                        model: User,
                        as: "Customer", // Sửa alias thành "Customer" cho đúng
                        attributes: ["avatar", "fullName"],
                    },
                ],
                group: ["customer_id", "Customer.userID"],
                order: [[sequelize.literal("totalMoney"), "DESC"]],
                limit: 5,
            });
            const topCustomerInWeekByOrder = getTopCustomerInWeekByOrder.map((c) => c.toJSON());
            const topCustomerInWeekByTotal = getTopCustomerInWeekByTotal.map((c) => c.toJSON());
            
    
            return {
                topCustomerInWeekByOrder,
                topCustomerInWeekByTotal
            };
    
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getNewUsersGrouped(interval) {
        const now = new Date();
        let startDate, groupByFormat, unit;
    
        switch (interval) {
            case "day": 
                startDate = new Date(now.setDate(now.getDate() - 7)); // 7 ngày gần nhất
                groupByFormat = "%Y-%m-%d"; // Nhóm theo ngày
                unit = "DAY";
                break;
            case "week":
                startDate = new Date(now.setDate(now.getDate() - 7 * 6)); // 7 tuần gần nhất
                groupByFormat = "%Y-%m-%d"; // Nhóm theo tuần (lấy ngày đầu tuần)
                unit = "WEEK";
                break;
            case "month":
                startDate = new Date(now.setMonth(now.getMonth() - 6)); // 7 tháng gần nhất
                groupByFormat = "%Y-%m"; // Nhóm theo tháng
                unit = "MONTH";
                break;
            case "year":
                startDate = new Date(now.setFullYear(now.getFullYear() - 6)); // 7 năm gần nhất
                groupByFormat = "%Y"; // Nhóm theo năm
                unit = "YEAR";
                break;
            default:
                throw new Error("Invalid interval");
        }

        let users = null;
        if(interval !== "week"){
            users = await User.findAll({
                attributes: [
                    [Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), groupByFormat), "date"],
                    [Sequelize.fn("COUNT", Sequelize.col("userID")), "count"]
                ],
                where: {
                    createdAt: {
                        [Op.gte]: startDate
                    }
                },
                group: ["date"],
                order: [[Sequelize.literal("date"), "ASC"]],
                raw: true
            });
        }else{
            users = await User.findAll({
                attributes: [
                    [
                        Sequelize.fn(
                            "DATE_ADD",
                            Sequelize.fn("MAKEDATE", Sequelize.fn("YEAR", Sequelize.col("createdAt")), 1), // Lấy ngày đầu năm
                            Sequelize.literal("INTERVAL (WEEK(createdAt, 3) - 1) WEEK") // Tính tuần ISO-8601
                        ),
                        "date"
                    ],
                    [Sequelize.fn("COUNT", Sequelize.col("userID")), "count"]
                ],
                where: {
                    createdAt: {
                        [Op.gte]: Sequelize.literal("DATE_SUB(CURDATE(), INTERVAL 7 WEEK)") // Lọc từ 7 tuần trước đến nay
                    }
                },
                group: [Sequelize.literal("date")],
                order: [[Sequelize.literal("date"), "ASC"]],
                raw: true
            });
        }
        
    
        return users;
    }
    
};

export default userService;
