import dotenv from "dotenv";
dotenv.config();

import cron from "node-cron";
import { Shop } from "../models/shop.model.js";
import { User } from "../models/user.model.js";
import ShopService from "./shop.service.js";

import e from "express";
import nodemailer from "nodemailer";
// Cấu hình SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Hoặc 587 nếu không dùng SSL
    secure: true, // true cho port 465, false cho 587
    auth: {
        user: "khoandhe181946@fpt.edu.vn",
        pass: "irbyfzfqdwcflhly",
    },
});

const EmailService = {
    async sendEmailToShop(shopEmail, subject, message) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: shopEmail,
                subject: subject,
                text: message,
            };

            await transporter.sendMail(mailOptions);
            return { success: true, message: "Email đã được gửi thành công." };
        } catch (error) {
            console.error("Lỗi gửi email:", error);
            throw new Error("Không thể gửi email, vui lòng thử lại.");
        }
    },
    async sendTaxReminderEmailToOneShop(shop_id, email, subject, content) {
        try {
            const shop = await Shop.findByPk(shop_id);
            if (!shop) {
                throw new Error("Shop not found");
            }
            const owner = await User.findByPk(shop.OwnerID);
            if (!owner) {
                throw new Error("Owner not found");
            }
            const emailToSend = email || owner.email;
            await sendEmail(emailToSend, subject, content);
        } catch (error) {
            console.error("Error sending tax reminder email:", error);
            throw error;
        }
    },

    async sendTaxReminderEmailToAllShops() {
        const revenues = await ShopService.getRevenueLastMonthAllShops();
        const date = new Date().toLocaleDateString("vi-VN", {
            month: "2-digit",
            year: "numeric",
        });
        const emailPromises = revenues
            .filter((revenue) => revenue.Shop)
            .map((revenue) => {
                return transporter.sendMail({
                    from: process.env.EMAIL_NAME,
                    to: revenue.Shop.shopEmail,
                    subject: `Thông báo nộp thuế ${date} này`,
                    html: `
            <p>Xin chào <strong>${revenue.Shop.shopName}</strong>,</p>
            <p>Đây là thông báo nhắc nhở về việc nộp thuế ${date} này.</p>
            <p><strong>Thuế áp dụng cho  bạn: ${Number.parseInt(revenue.dataValues.totalRevenue).toLocaleString("vi") || 0} VNĐ</strong></p>
            <p>Tài khoản nhận tiền: <strong>(Số tài khoản của sàn)</strong>. Ngân hàng nhận tiền: (Bank).</p>
            <p>Nội dung chuyển khoản: <strong>Đóng thuế ${date}.</strong></p>
            <p>Vui lòng kiểm tra và hoàn thành nghĩa vụ thuế <strong>trước ngày 15</strong> của tháng.</p>
            <p>Nếu đến hạn mà không hoàn thành nghĩa vụ thuế, chúng tôi sẽ tạm ngưng việc kinh doanh của cửa hàng trên hệ thống.</p>
            <p>Trân trọng,</p>
            <p>Hệ thống quản lý thuế</p>
          `,
                });
            });

        try {
            await Promise.all(emailPromises);
            console.log("📩 Đã gửi email đến tất cả cửa hàng.");
            return { success: true, message: "Tất cả email đã được gửi" };
        } catch (error) {
            console.error(`❌ Gửi email thất bại: ${error}`);
            return { success: false, message: "Gửi email thất bại" };
        }
    },

    async resendTaxReminderEmailToAllShops() {
        const updateStatusAllShops = await ShopService.updateStatusByTax();
        const revenues = await ShopService.getResendEmailShops();
        const date = new Date().toLocaleDateString("vi-VN", {
            month: "2-digit",
            year: "numeric",
        });
        const emailPromises = revenues
            .filter((revenue) => revenue.Shop)
            .map((revenue) => {
                return transporter.sendMail({
                    from: process.env.EMAIL_NAME,
                    to: revenue.Shop.shopEmail,
                    subject: `Nhắc lại: Thông báo nộp thuế ${date} này`,
                    html: `
            <p>Xin chào <strong>${revenue.Shop.shopName}</strong>,</p>
            <p>Đây là thông báo nhắc nhở lần 2 về việc nộp thuế tháng này.</p>
            <p><strong>Thuế áp dụng cho  bạn: ${Number.parseInt(revenue.dataValues.totalRevenue).toLocaleString("vi") || 0} VNĐ</strong></p>
            <p>Tài khoản nhận tiền: <strong>(Số tài khoản của sàn)</strong>. Ngân hàng nhận tiền: (Bank).</p>
            <p>Nội dung chuyển khoản: <strong>Đóng thuế ${date}.</strong></p>
            <p>Vui lòng kiểm tra và hoàn thành nghĩa vụ thuế <strong>trước ngày 18</strong> của tháng.</p>
            <p>Nếu đến hạn mà không hoàn thành nghĩa vụ thuế, chúng tôi sẽ tạm ngưng việc kinh doanh của cửa hàng trên hệ thống.</p>
            <p>Trân trọng,</p>
            <p>Hệ thống quản lý thuế</p>
          `,
                });
            });

        try {
            await Promise.all(emailPromises);
            console.log("📩 Đã gửi email đến tất cả cửa hàng.");
            return { success: true, message: "Tất cả email đã được gửi" };
        } catch (error) {
            console.error(`❌ Gửi email thất bại: ${error}`);
            return { success: false, message: "Gửi email thất bại" };
        }
    },
};

// gửi vào ngày 10 hàng tháng, thu thuế đến ngày 15
cron.schedule("0 0 10 * *", async () => {
    console.log("📢 Đang gửi email nhắc nộp thuế đến toàn bộ shop...");
    await EmailService.sendTaxReminderEmailToAllShops();
});

cron.schedule("0 0 15 * *", async () => {
    console.log("📢 Đang gửi email nhắc nộp thuế đến các shop chưa đóng thuế...");
    await EmailService.resendTaxReminderEmailToAllShops();
});

cron.schedule("0 0 18 * *", async () => {
    console.log("📢 Bắt đầu cấm các shop chưa đóng thuế...");
    await ShopService.banShopLateTax();
});

export default EmailService;
