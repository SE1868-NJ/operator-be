import express from "express";
import { sendEmail } from "../controllers/email.controller.js";

const emailRouter = express.Router();

emailRouter.post("/send-email", sendEmail);

export default emailRouter;
