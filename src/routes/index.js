import authRouter from "./auth.route.js";

const route = (app) => {
    app.use("/auth", authRouter);
    app.use("/admin", authRouter);
};

export default route;
