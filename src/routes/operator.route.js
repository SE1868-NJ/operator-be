import express from "express";
import { getOperatorinfo, updateAccountProfile } from "../controllers/operator.controller.js";
const operatorRoute = express.Router();

operatorRoute.get("/profile", getOperatorinfo);
operatorRoute.post("/profile/update", updateAccountProfile);

export default operatorRoute;

// merge
