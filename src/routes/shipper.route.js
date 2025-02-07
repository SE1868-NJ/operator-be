import express from "express";
// import { Shipper } from "../models/shipper.model.js";
// import { EmergencyContact } from "../models/emergencyContact.model.js";
import { getAllShippers, getShipperById } from "../controllers/shipper.controller.js";

const shipperRouter = express.Router();

shipperRouter.get("/:id", getShipperById);
shipperRouter.get("/", getAllShippers);

export default shipperRouter;
