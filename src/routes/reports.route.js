import express from "express";
import {
    createReport,
    getReport,
    getReports,
    responseReport,
} from "../controllers/reports.controller.js";

const reportsRouter = express.Router();

reportsRouter.post("/create", createReport);
reportsRouter.post("/response/:id", responseReport);
reportsRouter.get("/:id", getReport);
reportsRouter.get("/", getReports);

export default reportsRouter;
