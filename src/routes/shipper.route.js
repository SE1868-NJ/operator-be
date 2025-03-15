import express from "express";
import {
    getAllPendingShippers,
    getAllShippers,
    getOrdersOfShipper,
    getPendingShipperById,
    getShipperById,
    getShipperDraftById,
    getShippingStatus,
    getSumShippingFeeAllShippers,
    getTopShippers,
    updateShipperDraftById,
    updateShipperPending,
    updateShipperStatus,
} from "../controllers/shipper.controller.js";

const shipperRouter = express.Router();

shipperRouter.get("/shipperdraft/:id", getShipperDraftById);
shipperRouter.patch("/shipperdraft/:id", updateShipperDraftById);
shipperRouter.get("/shippingStatus", getShippingStatus);
shipperRouter.get("/topShippers", getTopShippers);
shipperRouter.get("/ordersOfShipper/:id", getOrdersOfShipper);
shipperRouter.get("/sumShippingFee", getSumShippingFeeAllShippers);
shipperRouter.get("/pendingShippers", getAllPendingShippers);
shipperRouter.patch("/pendingShipper/:id", updateShipperPending);
shipperRouter.get("/pendingShipper/:id", getPendingShipperById);
shipperRouter.patch("/:id", updateShipperStatus);
shipperRouter.get("/:id", getShipperById);
shipperRouter.get("/", getAllShippers);

export default shipperRouter;
