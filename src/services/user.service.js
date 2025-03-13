import { Op, where } from "sequelize";
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

            console.log(topCustomers.map((c) => c.toJSON())); // In kết quả dưới dạng JSON
            return topCustomers.map((c) => c.toJSON());
        } catch (error) {
            console.error("Lỗi khi lấy top khách hàng:", error);
        }
    },
};

export default userService;
