import express from "express";
import { getAllShops } from "../controllers/shops.controller.js";
import { getShopById } from "../controllers/shops.controller.js";

import {
    getPendingShopById,
    getPendingShops,
    updateShopStatus,
} from "../controllers/shops.controller.js";

const shopRouter = express.Router();

shopRouter.get("/pendingshops", getPendingShops);
shopRouter.get("/pendingshop/:id", getPendingShopById);
shopRouter.patch("/pendingshop/:id", updateShopStatus);
shopRouter.get("/:id", getShopById);
shopRouter.get("/", getAllShops);

export default shopRouter;
