import { ReasonChangeStatus } from "../models/reasonChangeStatus.model.js";
import { Shop } from "../models/shop.model.js";
import { ShopOwner } from "../models/shopOwner.model.js";
export const getPendingShops = async (req, res) => {
    try {
        const pendingShops = await Shop.findAll({
            where: {
                status: "pending",
            },
        });
        res.status(200).json({
            message: "Get pending shops successfully",
            pendingShops: pendingShops,
        });
    } catch (error) {
        return res.status(500).json({
            error: `An error occured during find pending shops! ${error}.`,
        });
    }
};

export const updateShopStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStatus = req.body;
        const { status, description } = updatedStatus;
        const newStatus = { status };
        const reason = { description };
        // Lưu lý do
        try {
            await ReasonChangeStatus.create({
                operatorID: 1,
                shopID: id,
                reason: description,
            });
        } catch (error) {
            return res.status(500).json({
                error: `An error occured during insert reason! ${error}.`,
            });
        }
        // Update status shop
        try {
            const updatedShop = await Shop.update(newStatus, {
                where: {
                    shop_id: id,
                },
            }).then((shop) => {
                res.status(200).json({
                    message: "Update status shop successfully",
                    shop: shop,
                });
            });
        } catch (error) {
            return res.status(500).json({
                error: `An error occured during update status shop! ${error}.`,
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: `Request not found! ${error}.`,
        });
    }
};
