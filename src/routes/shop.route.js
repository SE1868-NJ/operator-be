import express from "express";
import {
    getAllShops,
    getApprovedShops,
    getPendingShopById,
    getPendingShops,
    getShopById,
    updateShopDetailStatus,
    updateShopStatus,
} from "../controllers/shops.controller.js";

const shopRouter = express.Router();

shopRouter.get("/approvedshops", getApprovedShops);
shopRouter.get("/pendingshops", getPendingShops);
shopRouter.get("/pendingshop/:id", getPendingShopById);
shopRouter.patch("/pendingshop/:id", updateShopStatus);
shopRouter.patch("/:id", updateShopDetailStatus);
shopRouter.get("/:id", getShopById);
shopRouter.get("/", getAllShops);

export default shopRouter;
