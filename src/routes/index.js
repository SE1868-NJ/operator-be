import authRouter from "./auth.route.js";
import shipperRouter from "./shipper.route.js";
import shopRouter from "./shop.route.js";

const route = (app) => {
    app.use("/auth", authRouter);
    app.use("/admin", authRouter);
    app.use("/shipper", shipperRouter);
    app.use("/shop", shopRouter);
};

export default route;
