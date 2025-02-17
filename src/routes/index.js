import authRouter from "./auth.route.js";
import shipperRouter from "./shipper.route.js";
import shopRouter from "./shop.route.js";
import userRouter from "./user.route.js";

const route = (app) => {
    app.use("/auth", authRouter);
    app.use("/admin", authRouter);
    app.use("/shippers", shipperRouter);
    app.use("/shops", shopRouter);
};

export default route;
