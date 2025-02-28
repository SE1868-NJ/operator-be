// product.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Product = sequelize.define(
    "Product",
    {
        product_id: {
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
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true, // Cho phép null, mô tả có thể không bắt buộc
        },
        status: {
            type: DataTypes.ENUM("active", "inactive", "out_of_stock"),
            allowNull: false,
            defaultValue: "active",
        },
        price: {
            type: DataTypes.DECIMAL(10, 2), // Kiểu tiền tệ
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0, // Số lượng không thể âm
            },
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "Products",
        timestamps: true, // Sử dụng timestamps (createdAt, updatedAt)
        underscored: true, // Sử dụng snake_case cho tên cột (product_id, shop_id, ...)
    },
);

// Định nghĩa mối quan hệ
Product.associate = (models) => {
    Product.belongsTo(models.Shop, {
        foreignKey: "shop_id",
        as: "Shop",
    });
    Product.hasMany(models.OrderItem, {
        foreignKey: "product_id",
        as: "OrderItems",
    });
};

export default (sequelize, DataTypes) => {
    return Product;
};
