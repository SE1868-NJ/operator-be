import sequelize from "./config/sequelize.config.js";
import { Operator } from "./models/operator.model.js";
import { Shop } from "./models/shop.model.js";

async function insertShops() {
    try {
        const shops = [
            {
                shopName: "Tech World",
                ownerID: 1,
                taxCode: "123456789",
                shopEmail: "techworld@example.com",
                shopPhone: "0987654321",
                shopDescription: "Your go-to place for the latest tech gadgets.",
                shopPickUpAddress: "123 Tech Street, Hanoi",
                shopStatus: "active",
                shopAvatar: "https://example.com/tech-avatar.jpg",
                shopOperationHours: "9:00 AM - 9:00 PM",
                shopJoinedDate: new Date(),
                businessType: "Electronics",
                shopRating: 4.5,
                shopBankAccountNumber: "9876543210",
                shopBankName: "Vietcombank",
            },
            {
                shopName: "Fashion Hub",
                ownerID: 2,
                taxCode: "234567890",
                shopEmail: "fashionhub@example.com",
                shopPhone: "0976543210",
                shopDescription: "Trendy fashion for all ages.",
                shopPickUpAddress: "45 Fashion Street, Ho Chi Minh",
                shopStatus: "active",
                shopAvatar: "https://example.com/fashion-avatar.jpg",
                shopOperationHours: "10:00 AM - 8:00 PM",
                shopJoinedDate: new Date(),
                businessType: "Clothing",
                shopRating: 4.2,
                shopBankAccountNumber: "8765432109",
                shopBankName: "TPBank",
            },
            {
                shopName: "Home Essentials",
                ownerID: 3,
                taxCode: "345678901",
                shopEmail: "homeessentials@example.com",
                shopPhone: "0965432109",
                shopDescription: "All your home needs in one place.",
                shopPickUpAddress: "78 Home Street, Da Nang",
                shopStatus: "pending",
                shopAvatar: "https://example.com/home-avatar.jpg",
                shopOperationHours: "8:00 AM - 10:00 PM",
                shopJoinedDate: new Date(),
                businessType: "Home & Living",
                shopRating: 4.0,
                shopBankAccountNumber: "7654321098",
                shopBankName: "MB Bank",
            },
            {
                shopName: "Gourmet Delights",
                ownerID: 4,
                taxCode: "456789012",
                shopEmail: "gourmet@example.com",
                shopPhone: "0954321098",
                shopDescription: "Delicious gourmet food and drinks.",
                shopPickUpAddress: "12 Food Court, Hue",
                shopStatus: "active",
                shopAvatar: "https://example.com/food-avatar.jpg",
                shopOperationHours: "7:00 AM - 11:00 PM",
                shopJoinedDate: new Date(),
                businessType: "Food & Beverages",
                shopRating: 4.7,
                shopBankAccountNumber: "6543210987",
                shopBankName: "BIDV",
            },
            {
                shopName: "Fitness Pro",
                ownerID: 5,
                taxCode: "567890123",
                shopEmail: "fitnesspro@example.com",
                shopPhone: "0943210987",
                shopDescription: "The best place for fitness gear.",
                shopPickUpAddress: "33 Gym Street, Nha Trang",
                shopStatus: "active",
                shopAvatar: "https://example.com/fitness-avatar.jpg",
                shopOperationHours: "6:00 AM - 10:00 PM",
                shopJoinedDate: new Date(),
                businessType: "Fitness & Sports",
                shopRating: 4.8,
                shopBankAccountNumber: "5432109876",
                shopBankName: "Agribank",
            },
        ];

        await Shop.bulkCreate(shops);
        console.log("Shops inserted successfully.");
    } catch (error) {
        console.error("Error inserting shops:", error);
    } finally {
        await sequelize.close(); // Close the connection
    }
}

// insertShops();

async function insertOperators() {
    try {
        await sequelize.sync(); // Ensure database schema is up to date

        const operators = [{ operatorName: "John Doe" }, { operatorName: "Jane Smith" }];

        await Operator.bulkCreate(operators);
        console.log("Operators inserted successfully.");
    } catch (error) {
        console.error("Error inserting operators:", error);
    } finally {
        await sequelize.close(); // Close the connection
    }
}

insertOperators();
