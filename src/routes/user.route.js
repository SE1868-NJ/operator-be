import express from "express";
import { getAllUsers, getUserById, updateUserStatus } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.put("/:id/status", updateUserStatus);
userRouter.get("/:id", getUserById);
userRouter.get("/", getAllUsers);

export default userRouter;
