// orderItem.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const OrderItem = sequelize.define(
    "OrderItem",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Orders", // Tên bảng Order
                key: "id", // Khóa chính của bảng Order
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // Giả sử bạn có một bảng Product
            references: {
                model: "Products",
                key: "product_id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        price: {
            type: DataTypes.DECIMAL(10, 2), // Kiểu tiền tệ
            allowNull: false,
            defaultValue: 0.0,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1,
            },
        },
        total: {
            type: DataTypes.DECIMAL(10, 2), // Kiểu tiền tệ
            allowNull: false,
            defaultValue: 0.0,
        },
    },
    {
        tableName: "OrderItems",
        timestamps: true,
    },
);

// Định nghĩa mối quan hệ
OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "Order",
    });
    OrderItem.hasOne(models.Feedback, {
        foreignKey: "orderItemID",
        as: "Feedbacks",
    });
    OrderItem.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "ProductIT",
    });
};

export default (sequelize, DataTypes) => {
    return OrderItem;
};
