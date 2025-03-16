//order.route.js
import express from "express";
import { cancelOrder, getAllOrders, getOrderStatistic } from "../controllers/order.controller.js";
import { getAllOrdersByTime } from "../controllers/order.controller.js";
import { getOrderById } from "../controllers/order.controller.js";

const orderRouter = express.Router();
orderRouter.get("/statistic", getOrderStatistic);
orderRouter.get("/:id", getOrderById);
orderRouter.patch("/:id", cancelOrder);
// orderRouter.get("/orders", getAllOrdersByTime);

orderRouter.get("/", getAllOrders);
export default orderRouter;
