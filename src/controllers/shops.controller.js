// shops.controller.js
import ShopService from "../services/shop.service.js";

// shops.controller.js: Xử lý các yêu cầu HTTP và sử dụng các dịch vụ
// từ shop.service.js để lấy dữ liệu hoặc thực hiện các thao tác cần thiết.
export const getAllShops = async (req, res) => {
    try {
        const shops = await ShopService.getAllShops();
        res.status(200).json({
            success: true,
            message: "Get all shops successfully",
            shops: shops,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getShopById = async (req, res) => {
    try {
        const shop = await ShopService.getShopById(req.params.id);
        res.status(200).json({
            success: true,
            message: "Get shop by id successfully",
            shop: shop,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
