import express from "express";
import {
    getActiveShipperCount,
    getAllPendingShippers,
    getAllShippers,
    getOrdersOfShipper,
    getPendingShipperById,
    getShipperById,
    getShipperDraftById,
    getShippersJoinedToday,
    getShippingStatus,
    getSumShippingFeeAllShippers,
    getTop10Shippers,
    getTopShippers,
    updateShipperDraftById,
    updateShipperPending,
    updateShipperStatus,
    getTop5ShipperByMonth,
    getAvgDeliveryTime,
    cancellationRate
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
shipperRouter.get("/top5ShipperInMonth", getTop5ShipperByMonth)
shipperRouter.get("/ordersOfShipper/:id", getOrdersOfShipper);
shipperRouter.get("/sumShippingFee", getSumShippingFeeAllShippers);
shipperRouter.get("/pendingShippers", getAllPendingShippers);
shipperRouter.patch("/pendingShipper/:id", updateShipperPending);
shipperRouter.get("/pendingShipper/:id", getPendingShipperById);
shipperRouter.get("/avgDeliveryTime", getAvgDeliveryTime)
shipperRouter.get("/cancellationRate", cancellationRate)
shipperRouter.patch("/:id", updateShipperStatus);
shipperRouter.get("/:id", getShipperById);
shipperRouter.get("/", getAllShippers);

export default shipperRouter;
