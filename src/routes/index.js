import authRouter from "./auth.route.js";
import shipperRouter from "./shipper.route.js";
import shopRouter from "./shop.route.js";
import userRouter from "./user.route.js";

const route = (app) => {
    app.use("/auth", authRouter);
    app.use("/admin", authRouter);
    app.use("/shops", shopRouter);
    app.use("/shipper", shipperRouter);
    app.use("/user", userRouter);
};

export default route;
