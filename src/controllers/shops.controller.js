import e from "express";
import { ReasonChangeStatus } from "../models/reasonChangeStatus.model.js";
import { Shop } from "../models/shop.model.js";
import ShopService from "../services/shop.service.js";

export const getPendingShops = async (req, res) => {
    const { offset, limit } = req.query;
    const o = Number.parseInt(offset);
    const l = Number.parseInt(limit);
    const { shopName, shopEmail, shopPhone, ownerName } = req.query;
    try {


        const filterData = {
            shopName,
            shopEmail,
            shopPhone,
            ownerName,
        };
        // Spread operator để ghi đè các giá trị mặc định bằng các giá trị từ req.body
        // const filterData = { ...defaultFilterData, ...req.query };
        // console.log(offset, limit, shopName, shopEmail, shopPhone, ownerName);
        const responseData = await ShopService.getPendingShops(o, l, filterData);
        return res.status(200).json({
            success: true,
            message: "Get pending shops successfully",
            data: responseData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error occured during find pending shops! ${error}.`,
        });
    }
};

export const getApprovedShops = async (req, res) => {
    try {
        const { shopName, shopEmail, shopPhone, ownerName, offset, limit } = req.query;
        const o = Number.parseInt(offset) || 0;
        const l = Number.parseInt(limit) || 10;
        const filter = {
            shopName,
            shopEmail,
            shopPhone,
            ownerName,
        };
        // Ép kiểu operatorID về số và đảm bảo nó là số dương

        const result = await ShopService.getApprovedShops(o, l, filter); // Gọi hàm ĐÚNG
        return res.status(200).json({
            success: true,
            message: "Get approved shops successfully",
            data: result, // Spread để trả về approvedShops và totalApprovedShops
        });
    } catch (error) {
        console.error("Lỗi getApprovedShops:", error); // Thêm log lỗi
        return res.status(500).json({
            success: false,
            error: `An error occurred during find approved shops! ${error}.`,
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

export const updateShopDetailStatus = async (req, res) => {
    try {
        const newStatus = await ShopService.updateShopDetailStatus(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Update shop detail status successfully",
            newStatus: newStatus,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error occured during update status shop detail! ${error}.`,
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

    const { offset, limit } = req.query;
    const o = Number.parseInt(offset) || 0;
    const l = Number.parseInt(limit) || 10;
    console.log(offset, limit);
    // const shops = await ShopService.getAllShops(offset, limit);
    const { shopName, shopEmail, shopPhone, ownerName } = req.query;

    try {
        const filterData = {
            shopName: shopName,
            shopEmail: shopEmail,
            shopPhone: shopPhone,
            ownerName: ownerName,
        };
        console.log(o, l, shopName, shopEmail, shopPhone, ownerName);
        const responseData = await ShopService.getAllShops(o, l, filterData);
        res.status(200).json({
            success: true,
            message: "Get all shops successfully",
            data: responseData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error occured during find all shops! ${error}.`,
        });
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
