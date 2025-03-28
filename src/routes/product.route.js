import express from "express";
import { getTop5BestSellingProducts } from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get("/top5BestSellingProduct", getTop5BestSellingProducts);

export default productRouter;
