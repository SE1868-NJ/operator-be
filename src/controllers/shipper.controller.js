import { Op, where } from "sequelize";
import emergencyContact from "../models/emergencyContact.model.js";
import { Role } from "../models/role.model.js";
import { Shipper } from "../models/shipper.model.js";
import ShipperServices from "../services/shipper.service.js";

export const getAllShippers = async (req, res) => {
    try {
        const { offset = 0, limit = 10 } = req.body;
        const shippers = await ShipperServices.getAllShippers(offset, limit);
        res.json(shippers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getShipperById = async (req, res) => {
    try {
        const { id } = req.params;
        const shipper = await Shipper.findByPk(id);

        if (!shipper) {
            return res.status(404).json({ message: "Shipper không tồn tại" });
        }

        res.status(200).json(shipper);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy chi tiết shipper", error: error.message });
    }
};

export const updateShipperPending = async (req, res) => {
    try {
        const { id } = req.params;
        const shipper = await ShipperServices.updateShipperPending(id, req.body);
        return res.status(200).json({
            success: true,
            message: "Update pending shipper successfully",
            data: shipper,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error occured during find pending shipper! ${error}.`,
        });
    }
};
export const updateShipperStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const shipper = await ShipperService.updateShipperStatus(id, req.body.status);

        res.status(200).json(shipper);
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
};

export const getPendingShipperById = async (req, res) => {
    try {
        const { id } = req.params;
        const shipper = await Shipper.findByPk(id, {
            where: {
                status: "pending",
            },
        });

        if (!shipper) {
            return res.status(404).json({ message: "Shipper không tồn tại" });
        }

        res.status(200).json({ success: true, data: shipper });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy chi tiết shipper", error: error.message });
    }
};

export const getAllPendingShippers = async (req, res) => {
    try {
        const { offset, limit } = req.query;
        const o = Number.parseInt(offset);
        const l = Number.parseInt(limit);
        const shippers = await ShipperServices.getAllShippersPending(o, l);
        return res.json({
            success: true,
            message: "get all shippers successfully",
            data: shippers,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error: " });
    }
};

export const getSumShippingFeeAllShippers = async (req, res) => {
    try {
        const { offset = 0, limit = 10 } = req.query;
        const { sumShippingFee, totalRevenue, totalOrders } =
            await ShipperServices.getSumShippingFeeAllShippers();
        return res.json({
            success: true,
            message: "get sum shipping fee successfully",
            data: {
                sumShippingFee,
                totalRevenue,
                totalOrders,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error: " });
    }
};

export const getOrdersOfShipper = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Shipper ID is required",
            });
        }

        const shipper = await ShipperServices.getOrdersOfShipper(id);

        if (!shipper) {
            return res.status(404).json({
                success: false,
                message: "Shipper not found or no orders available",
            });
        }

        return res.json({
            success: true,
            message: "Get all orders successfully",
            data: shipper,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error: " });
    }
};
