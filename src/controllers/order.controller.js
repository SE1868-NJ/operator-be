import { NUMBER } from "sequelize";
import { Order } from "../models/order.model.js";
//order.controller.js
import orderService from "../services/order.service.js";

export const getAllOrders = async (req, res) => {
    const { offset, limit, Status, PaymentStatus, ShippingStatus } = req.query;
    const filterData = { Status, PaymentStatus, ShippingStatus };
    const o = Number.parseInt(offset);
    const l = Number.parseInt(limit);
    try {
        const Orders = await orderService.getAllOrders(o, l, filterData);
        res.status(200).json({
            success: true,
            message: "Lấy danh sách tất cả đơn hàng thành công",
            data: Orders,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllOrdersByTime = async (req, res) => {
    try {
        const {
            distanceTime,
            offset,
            limit,
            shopName,
            shopEmail,
            shopPhone,
            ownerName,
            shipperName,
            customerName,
        } = req.body;
        const filter = {
            shopName,
            shopEmail,
            shopPhone,
            ownerName,
            shipperName,
            customerName,
        };
        const Orders = await orderService.getAllOrderByTime(distanceTime, offset, limit, filter);
        res.status(200).json({
            success: true,
            message: "Lấy danh sách tất cả đơn hàng thành công",
            data: Orders,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderService.getOrderById(id);
        res.status(200).json({
            data: order,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching order details", error: error.message });
    }
};

export const getOrderStatistic = async (req, res) => {
    const { timeRange, interval } = req.query;
    try {
        const data = await orderService.getNewReportCount(timeRange, interval);
        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

export const cancelOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await orderService.cancelOrder(id);
        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

export const reopenOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await orderService.reopenOrder(id);
        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

export const completedOrderComparsion = async (req, res) => {
    try {
        const data = await orderService.completedOrdersComparison();
        res.status(200).json({
            success: true,
            message: "get completed orders and comparsion last month successfully",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
