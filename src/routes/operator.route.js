import express from "express";
import uploadCloud from "../config/clouddinary.config.js";
import { getOperatorinfo, updateAccountProfile } from "../controllers/operator.controller.js";
const operatorRoute = express.Router();

operatorRoute.get("/profile", getOperatorinfo);
operatorRoute.post("/profile/update", uploadCloud.single("image"), updateAccountProfile);

export default operatorRoute;

// merge
