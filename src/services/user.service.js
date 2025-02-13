import { User } from "../models/user.model.js";
const userService = {
    async getAllUsers(page, limit) {
        try {
            const offset = (page - 1) * limit;
            const response = await User.findAll({
                limit: Number(limit),
                offset: Number(offset),
            });

            // tinh total page
            const totalRecords = await User.count();
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
