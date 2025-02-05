import express from "express";
import { getAllShops } from "../controllers/shops.controller";
import { getShopById } from "../controllers/shops.controller";
import { updateStatusShop } from "../controllers/shops.controller";
import { Shop } from "../models/shop.model.js";
import { ShopOwner } from "../models/shopOwner.model.js";

const shopRouter = express.Router();

shopRouter.get("/", getAllShops);
shopRouter.get("/:id", getShopById);
//shopRouter.put('/:id', updateStatusShop);
export default shopRouter;
