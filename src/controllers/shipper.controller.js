//./src/controllers/shipper.controller.js
import { Op } from "sequelize";

import { Shipper } from "../models/shipper.model.js";
import ShipperServices from "../services/shipper.service.js";

export const getAllShippers = async (req, res) => {
    try {
        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const status = req.query.status || "";

        const whereCondition = {
            ...(search && {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { phone: { [Op.like]: `%${search}%` } },
                ],
            }),
            ...(status && { status }),
        };

        const data = await Shipper.findAll({
            where: whereCondition,
            offset,
            limit,
        });
        const count = await Shipper.count({ where: whereCondition });

        res.json({
            where: whereCondition,
            totalCount: count,
            shippers: data,
        });

        //         const { offset = 0, limit = 10 } = req.body;
        //         const shippers = await ShipperServices.getAllShippers(offset, limit);
        //         res.json(shippers);
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
        const shipper = await ShipperServices.updateShipperPending(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Update pending shipper successfully",
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
        const shipper = await ShipperServices.updateShipperStatus(id, req.body.status);

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
