import { ReasonChangeStatus } from "../models/reasonChangeStatus.model.js";
import { Shop } from "../models/shop.model.js";
import { ShopOwner } from "../models/shopOwner.model.js";
export const getPendingShops = async (req, res) => {
    try {
        const pendingShops = await Shop.findAll({
            where: {
                shopStatus: "pending",
            },
        });
        return res.status(200).json({
            success: true,
            message: "Get pending shops successfully",
            data: pendingShops,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error occured during find pending shops! ${error}.`,
        });
    }
};

export const getPendingShopById = async (req, res) => {
    try {
        const { id } = req.params;
        const pendingShop = await Shop.findOne({
            where: {
                shopID: id,
                shopStatus: "pending",
            },
        });
        if (!pendingShop) {
            return res.status(404).json({
                success: false,
                message: "Pending shop not found",
            });
        }
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
        const { id } = req.params;
        const updatedStatus = req.body;
        const { status, description } = updatedStatus;
        const newStatus = status === "accepted" ? "active" : "rejected";
        const reason = description;

        try {
            // update status of shop
            const updatedShop = await Shop.update(
                {
                    shopStatus: newStatus,
                },
                {
                    where: {
                        shopID: id,
                    },
                },
            );

            // lưu lý do cập nhật trên bảng ReasonChangeStatus
            const insertedReason = await ReasonChangeStatus.create({
                operatorID: 1,
                shopID: id,
                changedStatus: status,
                reason: reason,
            });

            res.status(200).json({
                message: "Update shop status and insert reason successfully",
                reasonChangeStatus: reason,
                newStatus: newStatus,
                data: updatedShop,
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
