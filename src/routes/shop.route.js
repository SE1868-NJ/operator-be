import express from "express";
import { getAllShops } from "../controllers/shops.controller.js";
import { getShopById } from "../controllers/shops.controller.js";
import { updateStatusShop } from "../controllers/shops.controller.js";
import {
    getPendingShopById,
    getPendingShops,
    updateShopStatus,
} from "../controllers/shops.controller.js";
import { Shop } from "../models/shop.model.js";

const shopRouter = express.Router();

shopRouter.get("/pendingshops", getPendingShops);
shopRouter.get("/pendingshop/:id", getPendingShopById);
shopRouter.patch("/pendingshop/:id", updateShopStatus);
shopRouter.get("/", getAllShops);
shopRouter.get("/:id", getShopById);

export default shopRouter;
