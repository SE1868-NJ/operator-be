import BanService from "../services/ban.service.js";

/**
 * API: Ban user
 */
export const banAccountController = async (req, res) => {
    try {
        const { userId, operatorId, userType, reason, banEnd } = req.body;
        console.log(userId, operatorId, userType, reason, banEnd);
        // Kiểm tra dữ liệu hợp lệ
        if (
            !userId ||
            !userType ||
            !operatorId ||
            !["customer", "shop", "shipper"].includes(userType)
        ) {
            return res.status(400).json({ message: "Missing information or invalid userType" });
        }

        const ban = await BanService.banAccount({
            userId,
            userType,
            operatorId,
            reason,
            banEnd,
        });
        return res.status(200).json({
            message: "Ban account created successfully",
            data: ban,
        });
    } catch (error) {
        console.error("Error in ban controller:", error);
        return res.status(500).json({
            message: "Failed to create ban",
            error: error.message,
        });
    }
};

export const unbanAccountManualController = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "Missing userID" });
        }

        const result = await BanService.unbanAccountManual(userId);

        return res.status(200).json({
            message: "Unban account created successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error in unban manual controller:", error);
        return res.status(500).json({
            message: "Failed to  unban a account",
            error: error.message,
        });
    }
};

export const getBanAccount = async (req, res) => {
    try {
        const { userId, userType } = req.query;
        console.log(userId, userType);
        if (!userId) {
            return res.status(400).json({ message: "Missing userID" });
        }
        if (!userType) {
            return res.status(400).json({ message: "Missing userID" });
        }
        const banAccount = await BanService.getBanAccount({ userId, userType });
        return res.status(200).json({
            message: "Get ban account successfully",
            data: banAccount,
        });
    } catch (error) {
        console.error("Error in get ban account controller:", error);
        return res.status(500).json({
            message: "Failed to  get ban a account",
            error: error.message,
        });
    }
};
