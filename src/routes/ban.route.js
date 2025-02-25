import express from "express";
import {
    banAccountController,
    getBanAccount,
    unbanAccountManualController,
} from "../controllers/ban.controller.js";

const banRouter = express.Router();

banRouter.post("/", banAccountController);
banRouter.post("/unban", unbanAccountManualController);
banRouter.get("/", getBanAccount);

export default banRouter;
