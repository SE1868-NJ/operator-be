import { Op } from "sequelize"; // Import Op from Sequelize
import { Banner } from "../models/banner.model.js";
import { Shop } from "../models/shop.model.js";
import { User } from "../models/user.model.js";

export const BannerSevices = {
    // Lấy tất cả banner với phân trang, tìm kiếm và lọc theo trạng thái
    async getBanners({ page = 1, size = 10, status = 'all', search = '' }) {
        const where = {};

        if (status !== 'all') {
            where.status = status;  // Lọc theo trạng thái
        }

        if (search) {
            where.title = { [Op.like]: `%${search}%` };  // Tìm kiếm theo tiêu đề
        }

        const banners = await Banner.findAndCountAll({
            where,
            limit: size,  // Số lượng item trên mỗi trang
            offset: (page - 1) * size, 
            include: { 
                model: Shop, // Hiển thị thông tin Shop sở hữu banner
                as: "Shops",
                attributes: ['shopID', 'shopName'],
                include: [
                    {
                        model: User,
                        as: "Owner", // Lấy thông tin Owner từ User
                        attributes: ['fullName', 'userEmail', 'userPhone', 'avatar', 'status'], // Chọn các trường bạn muốn
                    }
                ]
            }
        });

        return {
            banners: banners.rows,  // Các banner trong trang hiện tại
            totalItems: banners.count,  // Tổng số banner
            totalPages: Math.ceil(banners.count / size),  // Tổng số trang
            currentPage: page  // Trang hiện tại
        };
    },

    async getBannerById(id) {
        const banner = await Banner.findOne({
            where: { id },
            include: [
                {
                    model: Shop,
                    as: "Shops",
                    include: [
                        {
                            model: User,
                            as: "Owner", // Lấy thông tin Owner từ User
                            attributes: ['fullName', 'userEmail', 'userPhone', 'avatar', 'status'], // Chọn các trường bạn muốn
                        }
                    ]
                }
            ]
        });
        return banner;
    },

    async createBanner(data) {
        const banner = await Banner.create(data);
        return banner;
    },

    async updateBanner(id, data) {
        const banner = await Banner.update(data, { where: { id: id } });
        return banner;
    },

    async deleteBanner(id) {
        const banner = await Banner.destroy({ where: { id: id } });
        return banner;
    },

    async changeStatus(id, status) {
        const banner = await Banner.update({ status: status }, { where: { id: id } });
        return banner;
    },
};

export default BannerSevices;
