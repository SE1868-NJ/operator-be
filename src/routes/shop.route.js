import express from "express";
import { getAllShops } from "../controllers/shops.controller.js";
import { getShopById } from "../controllers/shops.controller.js";
// import { updateShopStatus } from "../controllers/shops.controller.js";

const shopRouter = express.Router();

// shopRouter.put("/:id/status", updateShopStatus); // Route để cập nhật trạng thái
shopRouter.get("/:id", getShopById);
shopRouter.get("/", getAllShops);
//shopRouter.put('/:id', updateStatusShop);
export default shopRouter;
