import ShopService from "../services/shop.service.js";

export const getPendingShops = async (req, res) => {
    const { offset, limit } = req.query;
    const o = Number.parseInt(offset);
    const l = Number.parseInt(limit);
    const { shopName, shopEmail, shopPhone, ownerName } = req.query;
    try {
        const filterData = {
            shopName,
            shopEmail,
            shopPhone,
            ownerName,
        };
        // Spread operator để ghi đè các giá trị mặc định bằng các giá trị từ req.body
        // const filterData = { ...defaultFilterData, ...req.query };
        // console.log(offset, limit, shopName, shopEmail, shopPhone, ownerName);
        const responseData = await ShopService.getPendingShops(o, l, filterData);
        return res.status(200).json({
            success: true,
            message: "Get pending shops successfully",
            data: responseData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error occured during find pending shops! ${error}.`,
        });
    }
};

export const getApprovedShops = async (req, res) => {
    try {
        const { operatorID, shopName, shopEmail, shopPhone, ownerName, offset, limit } = req.query;
        const o = Number.parseInt(offset) || 0;
        const l = Number.parseInt(limit) || 10;
        const ope = Number.parseInt(operatorID) || 1;
        const filter = {
            shopName,
            shopEmail,
            shopPhone,
            ownerName,
        };
        // Ép kiểu operatorID về số và đảm bảo nó là số dương

        const result = await ShopService.getApprovedShops(ope, o, l, filter); // Gọi hàm ĐÚNG
        return res.status(200).json({
            success: true,
            message: "Get approved shops successfully",
            data: result, // Spread để trả về approvedShops và totalApprovedShops
        });
    } catch (error) {
        console.error("Lỗi getApprovedShops:", error); // Thêm log lỗi
        return res.status(500).json({
            success: false,
            error: `An error occurred during find approved shops! ${error}.`,
        });
    }
};

export const getPendingShopById = async (req, res) => {
    try {
        const pendingShop = await ShopService.getPendingShopById(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Get pending shop successfully",
            data: pendingShop,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error occured during find pending shop by ID! ${error}.`,
        });
    }
};

export const updateShopStatus = async (req, res) => {
    try {
        const newStatus = await ShopService.updateShopStatus(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Update shop status and insert reason successfully",
            newStatus: newStatus,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error occured during update status shop! ${error}.`,
        });
    }
};

// shops.controller.js: Xử lý các yêu cầu HTTP và sử dụng các dịch vụ
// từ shop.service.js để lấy dữ liệu hoặc thực hiện các thao tác cần thiết.
export const getAllShops = async (req, res) => {
    const { offset, limit } = req.query;
    const o = Number.parseInt(offset) || 0;
    const l = Number.parseInt(limit) || 10;
    // console.log(offset, limit);
    // const shops = await ShopService.getAllShops(offset, limit);
    const { shopName, shopEmail, shopPhone, ownerName } = req.query;

    try {
        const filterData = {
            shopName: shopName,
            shopEmail: shopEmail,
            shopPhone: shopPhone,
            ownerName: ownerName,
        };
        // console.log(o, l, shopName, shopEmail, shopPhone, ownerName);
        const responseData = await ShopService.getAllShops(o, l, filterData);
        res.status(200).json({
            success: true,
            message: "Get all shops successfully",
            data: responseData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error occured during find all shops! ${error}.`,
        });
    }
};

export const getOrderByShopId = async (req, res) => {
    try {
        const { id } = req.params;
        const { offset, limit } = req.query;
        const o = Number.parseInt(offset) || 0;
        const l = Number.parseInt(limit) || 5;

        const { orders, totalOrders, totalPages, currentPage } = await ShopService.getOrderByShopId(
            id,
            o,
            l,
        );

        if (!orders) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({
            success: true,
            message: "Get order by shop id successfully",
            orders,
            totalOrders,
            totalPages,
            currentPage,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProductByShopId = async (req, res) => {
    try {
        const { id } = req.params;
        const { offset, limit, productName, minPrice, maxPrice } = req.query; // Nhận thêm filter từ query params

        // Chuẩn bị bộ lọc sản phẩm
        const filterData = {
            productName: productName || undefined, // Lọc theo tên sản phẩm nếu có
            minPrice: Number(minPrice) || undefined, // Chuyển đổi về số
            maxPrice: Number(maxPrice) || undefined, // Chuyển đổi về số
        };

        // Lấy danh sách sản phẩm với bộ lọc
        const { products, totalProducts, totalPages, currentPage } =
            await ShopService.getProductByShopId(id, offset, limit, filterData);

        if (!products) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({
            success: true,
            message: "Get shop by id successfully",
            products, // Danh sách sản phẩm đã lọc
            totalProducts, // Tổng số sản phẩm sau lọc
            totalPages, // Tổng số trang
            currentPage, // Trang hiện tại
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getShopById = async (req, res) => {
    try {
        const { id } = req.params;

        // Lấy thông tin shop
        const shop = await ShopService.getShopById(id);
        if (!shop) {
            return res.status(404).json({ success: false, message: "Shop not found" });
        }

        // Lấy danh sách feedbacks
        const feedbacks = await ShopService.getFeedbacksByShopId(id);

        res.status(200).json({
            success: true,
            message: "Get shop by id successfully",
            shop,
            feedbacks,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getOrderStatistic = async (req, res) => {
    const { id } = req.params;
    const { timeRange, interval } = req.query;
    try {
        const data = await ShopService.getNewOrderCount(id, timeRange, interval);
        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllShopsRevenues = async (req, res) => {
    const { distanceTime, offset, limit, shopName, ownerName, shopEmail, shopPhone } = req.body;

    const filter = {
        shopName,
        shopEmail,
        shopPhone,
        ownerName,
    };

    try {
        const revenues = await ShopService.getRevenueByTimeAllShops(
            distanceTime,
            offset,
            limit,
            filter,
        );
        res.status(200).json({
            success: true,
            message: "Get revenue successfully",
            data: revenues,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// danh sách các shop với tổng số orders, doanh thu, theo ngày - tháng - năm
// hiển thị bảng ở AllShopRevenuesPage
export const getRevenueByDate = async (req, res) => {
    const { year, month, day, offset, limit, shopName, ownerName, shopEmail, shopPhone } =
        req.query;

    const filter = {
        shopName,
        shopEmail,
        shopPhone,
        ownerName,
    };

    const y = Number.parseInt(year) || 2025;
    const m = Number.parseInt(month);
    const d = Number.parseInt(day);
    const o = Number.parseInt(offset) || 0;
    const l = Number.parseInt(limit) || 10;

    try {
        const revenues = await ShopService.getTotalRevenueShopsByTime(d, m, y, o, l, filter);
        res.status(200).json({
            success: true,
            message: "Get revenue successfully",
            data: revenues,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// dùng trong trang one shop revenue
// lấy danh sách các orders, có bộ lọc theo ngày - tháng - năm
export const getOneShopRevenues = async (req, res) => {
    const { id, day, month, year, offset, limit, shipperName, customerName } = req.query;

    const filter = {
        shipperName,
        customerName,
    };

    const i = Number.parseInt(id);
    const y = Number.parseInt(year) || 2025;
    const m = Number.parseInt(month);
    const d = Number.parseInt(day);
    const o = Number.parseInt(offset) || 0;
    const l = Number.parseInt(limit) || 10;

    try {
        const orders = await ShopService.getRevenueOneShopByTime(i, d, m, y, o, l, filter);
        res.status(200).json({
            success: true,
            message: "Get revenue successfully",
            revenue: orders,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLastTimesRevenues = async (req, res) => {
    const { distanceTime, id, limit, offset } = req.body;

    if (id) {
        try {
            const revenues = await ShopService.getRenenueByTimeOneShop(
                id,
                distanceTime,
                offset,
                limit,
            );
            res.status(200).json({
                success: true,
                message: "Get revenue one shop successfully",
                revenues: revenues,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `get revenue one shop fail: ${error.message}`,
            });
        }
    } else {
        try {
            const revenues = await ShopService.getLastTimesRevenues(id, distanceTime);
            res.status(200).json({
                success: true,
                message: "Get revenues all shops successfully",
                revenues: revenues,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `get revenues all shops fail: ${error.message}`,
            });
        }
    }
};

//dùng
export const getLastTimeRevenuesAllShops = async (req, res) => {
    const { distanceTime } = req.query;
    try {
        const revenues = await ShopService.getRevenueByTimeAllShops(distanceTime);
        res.status(200).json({
            success: true,
            message: "Get revenues all shops successfully",
            revenues: revenues,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `get revenues all shops fail: ${error.message}`,
        });
    }
};

//dùng
export const getOneOrder = async (req, res) => {
    try {
        const order = await ShopService.getOneOrder(req.params.id);
        res.status(200).json({
            success: true,
            message: "Get one order successfully",
            order: order,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTotalRevenueAllShopsByLastTime = async (req, res) => {
    const { distanceTime } = req.query;
    try {
        const totalRevenues = await ShopService.getTotalRevenueAllShopsByLastTime(distanceTime);
        res.status(200).json({
            success: true,
            message: "Get total revenue all shops by time successfully",
            totalRevenues: totalRevenues,
        });
    } catch (error) {
        res.status(500).json({
            message: `Get total revenue all shops by time fail: ${error.message}`,
        });
    }
};

export const getTotalRevenueOneShopByLastTime = async (req, res) => {
    const { distanceTime } = req.query;
    try {
        const totalRevenues = await ShopService.getTotalRevenueOneShopByLastTime(
            req.params.id,
            distanceTime,
        );
        res.status(200).json({
            success: true,
            message: "Get total revenue one shop by time successfully",
            totalRevenues: totalRevenues,
        });
    } catch (error) {
        res.status(500).json({
            message: `Get total revenue one shop by time fail: ${error.message}`,
        });
    }
};

export const getInforOneShop = async (req, res) => {
    const { id } = req.params;
    try {
        const shop = await ShopService.getInforOneShop(id);
        res.status(200).json({
            success: true,
            message: "Get infor one shop successfully",
            shop: shop,
        });
    } catch (error) {
        res.status(500).json({
            message: `Get infor one shop fail: ${error.message}`,
        });
    }
};

export const getShopDraftById = async (req, res) => {
    const { id } = req.params;
    try {
        const shopDraft = await ShopService.getShopDraftById(id);
        res.status(200).json({
            success: true,
            message: "Get infor draft one shop successfully",
            shopInfor: shopDraft,
        });
    } catch (error) {
        res.status(500).json({
            message: `Get infor draft one shop fail: ${error.message}`,
        });
    }
};

export const updateShopDraftById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const shopDraft = await ShopService.updateShopDraftById(id, data);
        res.status(200).json({
            success: true,
            message: "Update infor draft one shop successfully",
            shopInfor: shopDraft,
        });
    } catch (error) {
        res.status(500).json({
            message: `Update infor draft one shop fail: ${error.message}`,
        });
    }
};

export const updatePendingShopReasonItem = async (req, res) => {
    const { id } = req.params; // pending_id
    const { operator_id, index, reason, status } = req.body;
    try {
        const insertReasonItem = await ShopService.updatePendingShopReasonItem(
            operator_id,
            id,
            index,
            reason,
            status,
        );
        res.status(200).json({
            success: true,
            message: "Update reason item one shop successfully",
            shopInfor: insertReasonItem,
        });
    } catch (error) {
        res.status(500).json({
            message: `Update reason item one shop fail: ${error.message}`,
        });
    }
};

export const getPendingShopReasonItem = async (req, res) => {
    const { id } = req.params; // pending_id
    const { index } = req.query;
    try {
        const listItems = await ShopService.getPendingShopReasonItem(id, index);
        res.status(200).json({
            success: true,
            message: "Get reason item one shop successfully",
            listItems: listItems,
        });
    } catch (error) {
        res.status(500).json({
            message: `Get reason item one shop fail: ${error.message}`,
        });
    }
};
