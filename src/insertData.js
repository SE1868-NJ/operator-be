import sequelize from "./config/sequelize.config.js";
import { Address } from "./models/address.model.js";
import { Operator } from "./models/operator.model.js";
import { Order } from "./models/order.model.js";
import { OrderItem } from "./models/orderItem.model.js";
import { Product } from "./models/product.model.js";
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

// insertShippers();

async function insertAddresses() {
    try {
        await Address.bulkCreate([
            {
                user_id: 1,
                fullName: "Nguyễn Văn A",
                phone: "0901234567",
                province: "Hồ Chí Minh",
                city: "Hồ Chí Minh",
                district: "Quận 1",
                ward: "Phường Bến Nghé",
                street: "Đường Đồng Khởi",
                default: true,
            },
            {
                user_id: 1,
                fullName: "Nguyễn Văn A",
                phone: "0908765432",
                province: "Hà Nội",
                city: "Hà Nội",
                district: "Ba Đình",
                ward: "Điện Biên",
                street: "Phố Điện Biên Phủ",
                default: false,
            },
            {
                user_id: 2,
                fullName: "Trần Thị B",
                phone: "0911223344",
                province: "Đà Nẵng",
                city: "Đà Nẵng",
                district: "Hải Châu",
                ward: "Thạch Thang",
                street: "Đường Lê Duẩn",
                default: true,
            },
            {
                user_id: 3,
                fullName: "Lê Văn C",
                phone: "0922334455",
                province: "Cần Thơ",
                city: "Cần Thơ",
                district: "Ninh Kiều",
                ward: "An Hội",
                street: "Đường Hai Bà Trưng",
                default: false,
            },
            {
                user_id: 3,
                fullName: "Lê Văn C",
                phone: "0933445566",
                province: "Hải Phòng",
                city: "Hải Phòng",
                district: "Ngô Quyền",
                ward: "Lạch Tray",
                street: "Đường Lạch Tray",
                default: false,
            },
        ]);
        console.log("5 Addresses inserted successfully.");
    } catch (error) {
        console.error("Error inserting addresses:", error);
    } finally {
        await sequelize.close(); // Close the connection
    }
}

// insertAddresses();

async function insertOrders() {
    try {
        const order1 = await Order.create({
            shop_id: 1,
            customer_id: 2,
            address_id: 1,
            productFee: 250000,
            shippingFee: 30000,
            status: "pending",
            total: 280000, // 280,000 VND
            note: "Giao hàng giờ hành chính. Gọi trước khi đến.",
            payment_status: "pending",
            shipping_status: "not_yet_shipped",
            payment_method: "COD", // Thanh toán khi nhận hàng
        });

        const order2 = await Order.create({
            shop_id: 2,
            customer_id: 3,
            address_id: 2,
            productFee: 1500000,
            shippingFee: 0,
            status: "processing",
            total: 1500000, // 1,500,000 VND
            note: "Gói cẩn thận, tránh va đập.",
            payment_status: "paid",
            shipping_status: "shipping",
            payment_method: "Credit Card", // Thẻ tín dụng
        });

        console.log("Dữ liệu đã được thêm thành công!");
    } catch (error) {
        console.error("Lỗi khi thêm dữ liệu:", error);
    } finally {
        await sequelize.close();
    }
}

// insertOrders();

async function insertProducts() {
    try {
        await Product.bulkCreate([
            {
                shop_id: 1, // ID của shop "Cửa hàng Táo Đỏ"
                product_name: "iPhone 15 Pro Max 256GB",
                description:
                    "Điện thoại iPhone 15 Pro Max với chip A17 Bionic mạnh mẽ, màn hình Super Retina XDR, và camera chuyên nghiệp.",
                status: "active",
                price: 34990000, // 34,990,000 VND
                quantity: 10,
            },
            {
                shop_id: 2, // ID của shop "Siêu thị Điện máy Xanh"
                product_name: "Tivi Samsung 55 inch 4K",
                description:
                    "Tivi Samsung 55 inch độ phân giải 4K UHD, công nghệ HDR, và âm thanh sống động.",
                status: "active",
                price: 18490000, // 18,490,000 VND
                quantity: 5,
            },
            {
                shop_id: 1, // ID của shop "Cửa hàng Táo Đỏ"
                product_name: "AirPods Pro 2",
                description:
                    "Tai nghe AirPods Pro 2 với khả năng chống ồn chủ động, âm thanh chất lượng cao.",
                status: "active",
                price: 6990000, // 6,990,000 VND
                quantity: 20,
            },
        ]);

        console.log("Products inserted successfully.");
    } catch (error) {
        console.error("Error inserting products:", error);
    } finally {
        await sequelize.close(); // Close the connection
    }
}

//   insertProducts();
async function insertOrderItems() {
    try {
        const orderItem1_1 = await OrderItem.create({
            order_id: 1,
            product_id: 1, // ID của sản phẩm "Áo thun nam"
            price: 50000,
            quantity: 2,
            total: 100000, // 100,000 VND (mỗi áo 50,000 VND)
        });

        const orderItem1_2 = await OrderItem.create({
            order_id: 1,
            product_id: 2, // ID của sản phẩm "Quần jean nữ"
            price: 150000,
            quantity: 1,
            total: 150000, // 150,000 VND
        });

        // Tạo order items cho order 2
        const orderItem2_1 = await OrderItem.create({
            order_id: 2,
            product_id: 3, // ID của sản phẩm "Điện thoại Samsung Galaxy S23"
            price: 1500000,
            quantity: 1,
            total: 1500000, // 1,500,000 VND
        });

        console.log("Order items inserted successfully.");
    } catch (error) {
        console.error("Error inserting order items:", error);
    } finally {
        await sequelize.close(); // Close the connection
    }
}

insertOrderItems();

// async function doInsert() {
//   await insertShops();
//   await insertShippers();
//   await insertOrders();
//   await insertProducts();
//   await insertOrderItems();
// }

// doInsert();
