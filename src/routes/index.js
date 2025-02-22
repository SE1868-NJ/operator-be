import authRouter from "./auth.route.js";
import notifRouter from "./notifications.route.js";
import reportsRouter from "./reports.route.js";
import shipperRouter from "./shipper.route.js";
import shopRouter from "./shop.route.js";

const route = (app) => {
    app.use("/auth", authRouter);
    app.use("/admin", authRouter);
    app.use("/shippers", shipperRouter);
    app.use("/shops", shopRouter);
    app.use("/reports", reportsRouter);
    app.use("/notification", notifRouter);
};

export default route;
