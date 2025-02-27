// order.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Order = sequelize.define(
    "Order",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        shop_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Shops", // Tên bảng Shop
                key: "shopID", // Khóa chính của bảng Shop
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users", // Tên bảng Customer (Giả sử Customer là User)
                key: "userID", // Khóa chính của bảng User
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        shipper_id: {
            type: DataTypes.INTEGER,
            allowNull: true, // Shipper có thể không có ngay lúc đầu
            references: {
                model: "Shippers", // Tên bảng Shipper (Giả sử Shipper là User)
                key: "id", // Khóa chính của bảng User
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL", // Nếu Shipper bị xóa, set shipper_id về NULL
        },
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            //  Giả sử có một bảng Address
            references: {
                model: "Addresses",
                key: "address_id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        productFee: {
            type: DataTypes.DECIMAL(10, 2), // Kiểu tiền tệ
            allowNull: false,
            defaultValue: 0.0,
        },
        shippingFee: {
            type: DataTypes.DECIMAL(10, 2), // Kiểu tiền tệ
            allowNull: false,
            defaultValue: 0.0,
        },
        status: {
            type: DataTypes.ENUM("pending", "processing", "completed", "cancelled"),
            allowNull: false,
            defaultValue: "pending",
        },
        total: {
            type: DataTypes.DECIMAL(10, 2), // Kiểu tiền tệ
            allowNull: false,
            defaultValue: 0.0,
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        payment_status: {
            type: DataTypes.ENUM("pending", "paid"),
            allowNull: false,
            defaultValue: "pending",
        },
        shipping_status: {
            type: DataTypes.ENUM("not_yet_shipped", "shipping", "shipped"),
            allowNull: false,
            defaultValue: "not_yet_shipped",
        },
        payment_method: {
            type: DataTypes.STRING, // Ví dụ: "COD", "Credit Card"
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "Orders",
        timestamps: false, // Tắt timestamps nếu bạn không muốn createdAt và updatedAt tự động
    },
);

// Định nghĩa mối quan hệ (nếu cần, sau khi định nghĩa model Shop và User)
Order.associate = (models) => {
    Order.belongsTo(models.Shop, {
        foreignKey: "shop_id",
        as: "Shop",
    });
    Order.belongsTo(models.User, {
        foreignKey: "customer_id",
        as: "Customer",
    });
    Order.belongsTo(models.User, {
        foreignKey: "shipper_id",
        as: "Shipper",
    });

    Order.hasMany(models.OrderItem, {
        foreignKey: "order_id",
        as: "OrderItems",
    });

    // Giả sử có model Address
    Order.belongsTo(models.Address, {
        foreignKey: "address_id",
        as: "Address",
    });
};

export default (sequelize, DataTypes) => {
    return Order;
};
