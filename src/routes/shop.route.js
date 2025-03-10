import express from "express";
import {
    getAllShops,
    getApprovedShops,
    getInforOneShop,
    getLastTimeRevenuesAllShops,
    getOneOrder,
    getOneShopRevenues,
    getOrderByShopId,
    getOrderStatistic,
    getPendingShopById,
    getPendingShops,
    getProductByShopId,
    getRevenueByDate,
    getShopById,
    getTotalRevenueAllShopsByLastTime,
    getTotalRevenueOneShopByLastTime,
    updateShopStatus,
} from "../controllers/shops.controller.js";

const shopRouter = express.Router();

shopRouter.get("/approvedshops", getApprovedShops);
shopRouter.get("/pendingshops", getPendingShops);
// shopRouter.get("/revenues", getAllShopsRevenues);
shopRouter.get("/revenues", getRevenueByDate); // danh sách các shop cùng với số orders, tổng doanh thu, ...
// - hiển thị ở trang thống kê doanh thu
shopRouter.get("/revenues/:id", getOneShopRevenues); // dùng trong trang detail để lấy danh sách các orders

shopRouter.get("/totalrevenues", getTotalRevenueAllShopsByLastTime); // để lấy tổng doanh thu toàn sàn trong 1 ngày, 1 tuần, 1 tháng, ... gần nhất
// - hiển thị ở trang thống kê doanh thu
shopRouter.get("/totalrevenues/:id", getTotalRevenueOneShopByLastTime); // lấy tổng doanh thu của 1 shop trong 1 ngày, 1 tuần, ... - trang detail
// shopRouter.get("/lasttimerevenues", getLastTimesRevenues);
shopRouter.get("/shopstatistic", getLastTimeRevenuesAllShops); // last time là để lấy 1 ngày, 1 tuần, 1 tháng, 1 năm gần nhất
// có chia ra các khung giờ trong ngày, thứ trong tuần, ngày trong tháng, ... để vẽ biểu đồ
shopRouter.get("/orders/:id", getOneOrder); // cái này lấy của Thành, tạm thời để đây để hiển thị

shopRouter.get("/pendingshop/:id", getPendingShopById);
shopRouter.get("/getinfor/:id", getInforOneShop);
shopRouter.patch("/pendingshop/:id", updateShopStatus);
shopRouter.get("/:id/chart", getOrderStatistic);
shopRouter.get("/:id", getShopById);
shopRouter.get("/:id/products", getProductByShopId);
shopRouter.get("/:id/orders", getOrderByShopId);
shopRouter.get("/", getAllShops);

export default shopRouter;
