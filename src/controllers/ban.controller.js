import BanService from "../services/ban.service.js";
import NotificationsServices from "../services/notifications.service.js";

/**
 * API: Ban user
 */
export const banAccountController = async (req, res) => {
  try {
    const { userId, userType, operatorId, reason, banStart, banEnd } = req.body;
    // console.log("Ban start: ",banStart)
    // console.log("Ban end: ", banEnd)

    // Kiểm tra dữ liệu hợp lệ
    if (
      !userId ||
      !userType ||
      !operatorId ||
      !["customer", "shop", "shipper"].includes(userType)
    ) {
      return res
        .status(400)
        .json({ message: "Missing information or invalid userType" });
    }

    const ban = await BanService.banAccount({
      userId,
      userType,
      operatorId,
      reason,
      banStart,
      banEnd,
    });

    const notifPayload = {
      type: "Đình chỉ người dùng",
      message: `Tài khoản ${userType} có Id ${userId} đã bị đình chỉ bởi tài khoản operator là có id ${operatorId} từ ngày ${banStart} đến ngày ${banEnd}`,
    };

    NotificationsServices.createNotification(notifPayload);
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
    const { userId, userType } = req.body;
    if (!userId || !userType) {
      return res.status(400).json({ message: "Missing userId or userType" });
    }

    const result = await BanService.unbanAccountManual(userId, userType);

    const date = new Date();
    const notifPayload = {
      type: "Gỡ đình chỉ người dùng",
      message: `Tài khoản ${userType} có Id ${userId} đã được gỡ đình lúc ${date}`,
    };

    NotificationsServices.createNotification(notifPayload);

    return res.status(200).json({
      message: "Unban account successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in unban manual controller:", error);
    return res.status(500).json({
      message: "Failed to unban account",
      error: error.message,
    });
  }
};

export const getBanAccount = async (req, res) => {
  try {
    const { userId, userType } = req.query;
    console.log("Received query params:", { userId, userType });
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

export const cancelBanScheduledController = async (req, res) => {
  try {
    const { userId, userType } = req.body;

    if (!userId || !userType) {
      return res.status(400).json({ message: "Missing userId or userType" });
    }

    const result = await BanService.cancelBanScheduled(userId, userType);

    const date = new Date();
    const notifPayload = {
      type: "Gỡ đình chỉ người dùng",
      message: `Tài khoản ${userType} có Id ${userId} đã được gỡ đình chỉ lúc ${date}`,
    };

    NotificationsServices.createNotification(notifPayload);

    return res.status(200).json({
      message: "Ban schedule canceled successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in cancelBanScheduledController:", error);
    return res.status(500).json({
      message: "Failed to cancel ban schedule",
      error: error.message,
    });
  }
};
