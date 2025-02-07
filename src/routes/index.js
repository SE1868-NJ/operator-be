import authRouter from "./auth.route.js";
import shipperRouter from "./shipper.route.js";

const route = (app) => {
    app.use("/auth", authRouter);
    app.use("/admin", authRouter);
    app.use("/shipper", shipperRouter);
};

export default route;
