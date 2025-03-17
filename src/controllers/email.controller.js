import EmailService from "../services/email.service.js";
import ShopService from "../services/shop.service.js";

export const sendEmail = async (req, res) => {
    try {
        const { id, subject, message } = req.body;

        if (!id || !subject || !message) {
            return res.status(400).json({ success: false, message: "Thiếu thông tin cần thiết" });
        }

        // Lấy thông tin shop
        const shop = await ShopService.getShopById(id);
        if (!shop || !shop.shopEmail) {
            return res
                .status(404)
                .json({ success: false, message: "Không tìm thấy email của shop" });
        }

        // Gửi email
        const result = await EmailService.sendEmailToShop(shop.shopEmail, subject, message);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const sendTaxReminderEmail = async (req, res) => {
    try {
        const { id } = req.params;
        await EmailService.sendTaxReminderEmail(id);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email", error: error.message });
    }
};

export const sendTaxReminderEmailToAllShops = async (req, res) => {
    try {
        await EmailService.sendTaxReminderEmailToAllShops();
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email", error: error.message });
    }
};
