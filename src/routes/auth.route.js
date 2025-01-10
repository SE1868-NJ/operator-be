import express from "express";
const authRouter = express.Router();

authRouter.get("/session", (req, res) => {
    res.status(500).json({
        message: "session",
    });
});

export default authRouter;
