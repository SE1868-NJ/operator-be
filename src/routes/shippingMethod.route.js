import express from "express";
import {
    createShippingMethod,
    getAllShippingMethod,
    getByIdShippingMethod,
    updateShippingMethod,
} from "../controllers/shippingMethod.controller.js";

const shippingMethodRouter = express.Router();

shippingMethodRouter.post("/create", createShippingMethod);
shippingMethodRouter.get("/:id", getByIdShippingMethod);
shippingMethodRouter.patch("/:id", updateShippingMethod);
shippingMethodRouter.get("/", getAllShippingMethod);

export default shippingMethodRouter;
