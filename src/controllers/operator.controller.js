import OperatorService from "../services/account.service.js";
import BanService from "../services/ban.service.js";

/**
 * API: Ban user
 */
export const getOperatorinfo = async (req, res) => {
    try {
        const { email } = req.query;
        console.log("Email nhận được từ query:", email);

        // Kiểm tra dữ liệu hợp lệ
        if (!email) {
            return res.status(400).json({ message: "Missing information or invalid email" });
        }

        const user = await OperatorService.getAccountProfile(email);
        return res.status(200).json({
            message: "Get account profile successfully",
            data: user,
        });
    } catch (error) {
        console.error("Error in account controller:", error);
        return res.status(500).json({
            message: "Failed to get account profile",
            error: error.message,
        });
    }
};

export const updateAccountProfile = async (req, res) => {
    try {
        const {
            operatorID,
            firstName,
            lastName,
            gender,
            email,
            phoneNumber,
            dateOfBirth,
            status,
            avatar,
        } = req.body.dataUpdate;

        if (!req.body.dataUpdate) {
            return res.status(400).json({ message: "Missing information or invalid data update" });
        }
        const userUpdate = await OperatorService.updateAccountProfile({
            operatorID,
            firstName,
            lastName,
            gender,
            email,
            phoneNumber,
            dateOfBirth,
            status,
            avatar,
        });
        console.log(123);
        return res.status(200).json({
            message: "update profile successfully",
            data: userUpdate,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update account profile",
            error: error.message,
        });
    }
};
