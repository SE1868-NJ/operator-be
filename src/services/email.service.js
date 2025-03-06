import cron from "node-cron";
import { Shop } from "../models/shop.model.js";
import { User } from "../models/user.model.js";
import ShopService from "./shop.service.js";

import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
import { EMAIL_NAME, EMAIL_PASSWORD } from "../config/config.js";

// Cấu hình SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_NAME,
        pass: EMAIL_PASSWORD,
    },
});

const EmailService = {
    async sendTaxReminderEmailToOneShop(id) {
        try {
            const shop = await Shop.findByPk(id);
            if (!shop) {
                throw new Error("Shop not found");
            }
            const owner = await User.findByPk(shop.OwnerID);
            if (!owner) {
                throw new Error("Owner not found");
            }
            const email = shop.shopEmail || owner.userEmail;
            const subject = "Thông Báo Nhắc Nhở Nộp Thuế ";
            const content =
                "Đã đến hạn nộp thuế tháng này. Vui lòng đóng thuế trước ngày ... tháng này để tiếp tục kinh doanh trên hệ thống.";
            await sendEmail(email, subject, content);
        } catch (error) {
            console.error("Error sending tax reminder email:", error);
            throw error;
        }
    },

    async sendTaxReminderEmailToAllShops() {
        const revenues = await ShopService.getRevenueLastMonthAllShops();
        const emailPromises = revenues
            .filter((revenue) => revenue.Shop)
            .map((revenue) => {
                return transporter.sendMail({
                    from: process.env.EMAIL_NAME,
                    to: revenue.Shop.shopEmail,
                    subject: "Thông báo nộp thuế tháng này",
                    html: `
            <p>Xin chào <strong>Nguyễn Xuân Thành</strong>,</p>
            <p>Đây là thông báo nhắc nhở nộp thuế tháng này.</p>
            <p><strong>Thuế áp dụng cho  bạn: 50.000 VNĐ</strong></p>
            <p>Tài khoản nhận tiền: <strong>1018580214 - NGUYEN THANH VIET</strong>. Ngân hàng VIETCOMBANK.</p>
            <p>Nội dung chuyển khoản: <strong>Tặng anh Việt bồi bổ cơ thể.</strong></p>
            <p>Vui lòng kiểm tra và hoàn thành nghĩa vụ thuế trước 10h cùng ngày.</p>
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
                    subject: "Nhắc lại: Thông báo nộp thuế tháng này",
                    html: `
            <p>Xin chào <strong>${revenue.Shop.shopName}</strong>,</p>
            <p>Đây là thông báo nhắc nhở lần 2 về việc nộp thuế tháng này.</p>
            <p><strong>Thuế áp dụng cho  bạn: ${revenue.totalRevenue} VNĐ</strong></p>
            <p>Tài khoản nhận tiền: <strong>(Số tài khoản của sàn)</strong>. Ngân hàng nhận tiền: (Bank).</p>
            <p>Nội dung chuyển khoản: <strong>Đóng thuế tháng ${date}.</strong></p>
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

export default EmailService;
