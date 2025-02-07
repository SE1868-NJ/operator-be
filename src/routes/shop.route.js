import express from "express";
import {
    getPendingShopById,
    getPendingShops,
    updateShopStatus,
} from "../controllers/shops.controller.js";

const shopRouter = express.Router();

shopRouter.get("/", (req, res) => {
    res.status(500).json({
        message: "root auth",
    });
});

shopRouter.get("/pendingshops", getPendingShops);
shopRouter.get("/pendingshop/:id", getPendingShopById);
shopRouter.patch("/pendingshop/:id", updateShopStatus);

export default shopRouter;
