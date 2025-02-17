import { Op, where } from "sequelize";
import emergencyContact from "../models/emergencyContact.model.js";
import { Role } from "../models/role.model.js";
import { Shipper } from "../models/shipper.model.js";
import ShipperService from "../services/shipper.service.js";

export const getAllShippers = async (req, res) => {
    try {
        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const whereCondition = search
            ? {
                  [Op.or]: [
                      { name: { [Op.like]: `%${search}%` } },
                      { phone: { [Op.like]: `%${search}%` } },
                  ],
              }
            : {};

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
        const { status } = req.body;
        const newStatus = status === "rejected" ? "rejected" : "Active";
        const shipper = await ShipperServices.updateShipperPending(id, newStatus);
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
        const shipper = await ShipperService.updateShipperStatus(id, req.body.status);

        res.status(200).json(shipper);
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
};
