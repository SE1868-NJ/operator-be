import { Shop } from "../models/shop.model";
import { ShopOwner } from "../models/shopOwner.model";

export const getAllShops = async (req, res) => {
    try {
        const shops = await Shop.findAll({
            include: [
                {
                    model: ShopOwner,
                    as: "Owner",
                },
            ],
        });
        res.status(200).json({
            success: true,
            message: "Get all shops successfully",
            data: shops,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getShopById = async (req, res) => {
    try {
        const shop = await Shop.findByPk(req.params.id, {
            include: [
                {
                    model: ShopOwner,
                    as: "Owner",
                },
            ],
        });
        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Shop not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Get shop by id successfully",
            data: shop,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateStatusShop = async (req, res) => {
    try {
        // Tìm shop theo ID từ request params
        const shop = await Shop.findByPk(req.params.id);

        // Kiểm tra nếu không tìm thấy shop
        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Shop not found",
            });
        }

        // Chuyển đổi trạng thái: Active -> Suspend, Suspend -> Active
        shop.status = shop.status === "Active" ? "Suspend" : "Active";

        // Lưu thay đổi vào database
        await shop.save();

        // Trả về phản hồi thành công
        res.status(200).json({
            success: true,
            message: `Shop status changed to ${shop.status}`,
            data: shop,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
