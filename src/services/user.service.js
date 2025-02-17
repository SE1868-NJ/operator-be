import { Op, where } from "sequelize";
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
        try {
            const user = await User.findOne({ where: { userID: id } });

            if (!user) {
                return false;
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
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
};

export default userService;
