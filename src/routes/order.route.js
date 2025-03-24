//order.route.js
import express from "express";
import {
    cancelOrder,
    getAllOrders,
    getOrderStatistic,
    reopenOrder,
    completedOrderComparsion
} from "../controllers/order.controller.js";
import { getAllOrdersByTime } from "../controllers/order.controller.js";
import { getOrderById } from "../controllers/order.controller.js";

const orderRouter = express.Router();
orderRouter.get("/statistic", getOrderStatistic);
orderRouter.patch("/cancelorder/:id", cancelOrder);
orderRouter.patch("/reopenorder/:id", reopenOrder);
orderRouter.get("/completedOrders", completedOrderComparsion)
orderRouter.get("/:id", getOrderById);

//orderRouter.get("/orders", getAllOrdersByTime);

orderRouter.get("/", getAllOrders);
export default orderRouter;
