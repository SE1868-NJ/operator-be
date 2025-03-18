import express from "express";
import {
    getActiveShipperCount,
    getActiveShipperCount,
    getAllPendingShippers,
    getAllShippers,
    getOrdersOfShipper,
    getPendingShipperById,
    getShipperById,
    getShipperDraftById,
    getShippersJoinedToday,
    getShippersJoinedToday,
    getShippingStatus,
    getSumShippingFeeAllShippers,
    getTop10Shippers,
    getTopShippers,
    updateShipperDraftById,
    updateShipperPending,
    updateShipperStatus,
} from "../controllers/shipper.controller.js";

const shipperRouter = express.Router();

shipperRouter.get("/countJoinedToday", getShippersJoinedToday);
shipperRouter.get("/countActive", getActiveShipperCount);
shipperRouter.get("/countJoinedToday", getShippersJoinedToday);
shipperRouter.get("/countActive", getActiveShipperCount);
shipperRouter.get("/top10Shippers", getTop10Shippers);
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
