import {
    getAllShippers,
    getShipperById,
    updateShipperPending,
    updateShipperStatus,
} from "../controllers/shipper.controller.js";

const shipperRouter = express.Router();
import express from "express";

shipperRouter.patch("/:id", updateShipperStatus);
shipperRouter.get("/:id", getShipperById);
shipperRouter.get("/", getAllShippers);
shipperRouter.patch("/:id", updateShipperPending);

export default shipperRouter;
