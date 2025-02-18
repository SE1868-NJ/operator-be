import express from "express";
import { createNotification, getAllNotifications } from "../controllers/notification.controller.js";

const notifRouter = express.Router();

notifRouter.post("/create", createNotification);
notifRouter.get("/", getAllNotifications);

export default notifRouter;
