import express from "express";
import {
    getAllUsers,
    getOrderRecent4Months,
    getOrdersList,
    getTop3Customer,
    getUserById,
    updateUserStatus,
    getTopCustomerByWeek,
    getNewCustomerGroupedController
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.put("/:id/status", updateUserStatus);
userRouter.get("/orders/recent4months/:id", getOrderRecent4Months);
userRouter.get("/orders", getOrdersList);
userRouter.get("/top3", getTop3Customer);
userRouter.get("/topCustomerInWeek", getTopCustomerByWeek);
userRouter.get("/newCustomer/:timeGroup", getNewCustomerGroupedController);
userRouter.get("/:id", getUserById);
userRouter.get("/", getAllUsers);

export default userRouter;
