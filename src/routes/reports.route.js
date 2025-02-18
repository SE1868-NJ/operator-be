import express from "express";
import { createReport } from "../controllers/reports.controller.js";

const reportsRouter = express.Router();

reportsRouter.post("/create", createReport);

export default reportsRouter;
