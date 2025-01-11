import express from "express";
const adminRouter = express.Router();

adminRouter.get("/session", (req, res) => {
    res.status(500).json({
        message: "session",
    });
});

adminRouter.get("/", (req, res) => {
    res.status(500).json({
        message: "root admin",
    });
});

export default adminRouter;
