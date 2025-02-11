import express from "express";
import {
    getAllShippers,
    getShipperById,
    updateShipperStatus,
} from "../controllers/shipper.controller.js";

const shipperRouter = express.Router();

shipperRouter.patch("/:id", updateShipperStatus);
shipperRouter.get("/:id", getShipperById);
shipperRouter.get("/", getAllShippers);

export default shipperRouter;
