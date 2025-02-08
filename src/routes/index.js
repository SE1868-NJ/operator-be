import authRouter from "./auth.route.js";
import shopRouter from "./shop.route.js";
const route = (app) => {
    app.use("/auth", authRouter);
    app.use("/admin", authRouter);
    app.use("/shops", shopRouter);
};

export default route;
