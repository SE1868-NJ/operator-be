import authRouter from "./auth.route.js";
import banRouter from "./ban.route.js";
import bannerRouter from "./banner.route.js";
import emailRouter from "./email.route.js";
import notifRouter from "./notifications.route.js";
import operatorRoute from "./operator.route.js";
import orderRouter from "./order.route.js";
import reportCategoriesRouter from "./report_categories.route.js";
import reportsRouter from "./reports.route.js";
import shipperRouter from "./shipper.route.js";
import shippingMethodRouter from "./shippingMethod.route.js";
import shopRouter from "./shop.route.js";
import userRouter from "./user.route.js";

const route = (app) => {
    app.use("/auth", authRouter);
    app.use("/admin", authRouter);
    app.use("/shops", shopRouter);
    app.use("/shippers", shipperRouter);
    app.use("/shops", shopRouter);
    app.use("/user", userRouter);
    app.use("/reports", reportsRouter);
    app.use("/notification", notifRouter);
    app.use("/report_categories", reportCategoriesRouter);
    app.use("/ban", banRouter);
    app.use("/shipping-methods", shippingMethodRouter);
    app.use("/orders", orderRouter);
    app.use("/operator", operatorRoute);
    app.use("/email", emailRouter);
    app.use("/banners", bannerRouter);
};

export default route;
