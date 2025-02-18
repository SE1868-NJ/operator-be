import sequelize from "./config/sequelize.config.js";
import { Operator } from "./models/operator.model.js";
import { Shipper } from "./models/shipper.model.js";
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

//insertShops();

// async function insertOperators() {
//     try {
//         await sequelize.sync(); // Ensure database schema is up to date

//         const operators = [{ operatorName: "John Doe" }, { operatorName: "Jane Smith" }];

//         await Operator.bulkCreate(operators);
//         console.log("Operators inserted successfully.");
//     } catch (error) {
//         console.error("Error inserting operators:", error);
//     } finally {
//         await sequelize.close(); // Close the connection
//     }
// }

// insertOperators();

async function insertShippers() {
    try {
        await sequelize.sync(); // Ensure database schema is up to date

        const shippers = [
            {
                avatar: "https://example.com/avatar1.jpg",
                name: "Nguyen Van A",
                gender: "male",
                dateOfBirth: "1990-05-20",
                hometown: "Hanoi",
                address: "123 Hoan Kiem, Hanoi",
                phone: "0987654321",
                cccd: "0123456789",
                email: "nguyenvana@example.com",
                status: "Active",
                activityArea: "Hanoi",
                shippingMethod: "Motorbike",
            },
            {
                avatar: "https://example.com/avatar2.jpg",
                name: "Tran Thi B",
                gender: "female",
                dateOfBirth: "1995-08-15",
                hometown: "Ho Chi Minh City",
                address: "456 District 1, HCMC",
                phone: "0976543210",
                cccd: "0987654321",
                email: "tranthib@example.com",
                status: "Active",
                activityArea: "HCMC",
                shippingMethod: "Bicycle",
            },
            {
                avatar: "https://example.com/avatar3.jpg",
                name: "Pham Van C",
                gender: "male",
                dateOfBirth: "1988-12-10",
                hometown: "Da Nang",
                address: "789 Hai Chau, Da Nang",
                phone: "0965432109",
                cccd: "0876543210",
                email: "phamvanc@example.com",
                status: "Inactive",
                activityArea: "Da Nang",
                shippingMethod: "Truck",
            },
            {
                avatar: "https://example.com/avatar4.jpg",
                name: "Le Thi D",
                gender: "female",
                dateOfBirth: "1993-07-25",
                hometown: "Can Tho",
                address: "101 Ninh Kieu, Can Tho",
                phone: "0954321098",
                cccd: "0765432109",
                email: "lethid@example.com",
                status: "Active",
                activityArea: "Can Tho",
                shippingMethod: "Motorbike",
            },
            {
                avatar: "https://example.com/avatar5.jpg",
                name: "Hoang Van E",
                gender: "male",
                dateOfBirth: "1985-03-30",
                hometown: "Hue",
                address: "202 Phu Cat, Hue",
                phone: "0943210987",
                cccd: "0654321098",
                email: "hoangvane@example.com",
                status: "Inactive",
                activityArea: "Hue",
                shippingMethod: "Van",
            },
        ];

        await Shipper.bulkCreate(shippers);
        console.log("5 Shippers inserted successfully.");
    } catch (error) {
        console.error("Error inserting shippers:", error);
    } finally {
        await sequelize.close(); // Close the connection
    }
}

insertShippers();
