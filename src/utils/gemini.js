import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBkNyl8SgwvXKrmO1RecmLw6rH4XWx0x8w");
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const get = async () => {
    const result =
        await model.generateContent(`You are an AI assistant that analyzes user reports in an eCommerce system and determines their priority level.

Priority levels:
- **Low**: Minor issues that do not impact user experience significantly.
- **Medium**: Issues that may cause inconvenience but do not disrupt essential functions.
- **High**: Significant problems affecting core functionality for multiple users.
- **Critical**: Urgent issues causing system failure, security breaches, or major disruptions.

Analyze the following report and assign a priority level (low, medium, high, or critical):

**Category:** Thanh toán 
**Title:** Lỗi thanh toán thành công nhưng đơn hàng không được đẩy lên  
**Type:** Người dùng
**Description:** Khi tôi tiến hành đặt hàng và sau đó thanh toán, hệ thống báo thanh toán thành công nhưng đơn hàng chưa báo thành công. 

Return only one word as the priority level: low, medium, high, or critical.`);

    console.log(result.response.text().toLowerCase());
};

get();
