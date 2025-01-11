import express from "express";
import { User } from "../models/user.model.js";

const authRouter = express.Router();

authRouter.get("/select", (req, res) => {
    User.findAll().then((users) => {
        res.status(500).json({
            message: users,
        });
    });
});

authRouter.get("/", (req, res) => {
    res.status(500).json({
        message: "root auth",
    });
});

authRouter.get("/", (req, res) => {
    res.status(500).json({
        message: "root auth",
    });
});

export default authRouter;
