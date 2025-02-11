import { ReasonChangeStatus } from "../models/reasonChangeStatus.model.js";
import { Shop } from "../models/shop.model.js";
import ShopService from "../services/shop.service.js";
export const getPendingShops = async (req, res) => {
    try {
        const pendingShops = await ShopService.getPendingShops();
        return res.status(200).json({
            success: true,
            message: "Get pending shops successfully",
            data: pendingShops,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error occured during find pending shops! ${error}.`,
        });
    }
};

export const getPendingShopById = async (req, res) => {
    try {
        const pendingShop = await ShopService.getPendingShopById(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Get pending shop successfully",
            data: pendingShop,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error occured during find pending shop by ID! ${error}.`,
        });
    }
};

export const updateShopStatus = async (req, res) => {
    try {
        const newStatus = await ShopService.updateShopStatus(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Update shop status and insert reason successfully",
            newStatus: newStatus,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error occured during update status shop! ${error}.`,
        });
    }
};

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
