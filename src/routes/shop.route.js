import express from "express";
import {
    getAllShops,
    getApprovedShops,
    getOrderByShopId,
    getOrderStatistic,
    getPendingShopById,
    getPendingShops,
    getProductByShopId,
    getShopById,
    updateShopStatus,
} from "../controllers/shops.controller.js";

const shopRouter = express.Router();

shopRouter.get("/approvedshops", getApprovedShops);
shopRouter.get("/pendingshops", getPendingShops);
shopRouter.get("/pendingshop/:id", getPendingShopById);
shopRouter.patch("/pendingshop/:id", updateShopStatus);
shopRouter.get("/:id/chart", getOrderStatistic);
shopRouter.get("/:id", getShopById);
shopRouter.get("/:id/products", getProductByShopId);
shopRouter.get("/:id/orders", getOrderByShopId);
shopRouter.get("/", getAllShops);

export default shopRouter;
