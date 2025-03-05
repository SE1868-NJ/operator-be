import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Shop = sequelize.define(
    "Shop",
    {
        shopID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        shopName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        ownerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // Thêm foreign key constraint nếu Shop có quan hệ với ShopOwner
            references: {
                model: "Users", // Tên bảng
                key: "userID", // Tên cột khóa chính trong bảng ShopOwners
            },
            onUpdate: "CASCADE", // Tùy chọn, cập nhật ownerID nếu ownerID của ShopOwner thay đổi
            onDelete: "CASCADE", // Tùy chọn, xóa Shop nếu ShopOwner bị xóa
        },
        taxCode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        shopEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        shopPhone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                length: 10,
            },
        },
        shopDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        shopPickUpAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        shopStatus: {
            type: DataTypes.ENUM("pending", "active", "rejected", "suspended"),
            allowNull: false,
            defaultValue: "pending",
        },
        shopAvatar: {
            type: DataTypes.STRING, // URL hoặc đường dẫn file
            allowNull: true,
            defaultValue:
                "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg",
        },
        shopOperationHours: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        shopJoinedDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        businessType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        shopRating: {
            type: DataTypes.FLOAT, // Sử dụng FLOAT hoặc DECIMAL cho rating
            allowNull: true,
            validate: {
                min: 0,
                max: 5, // Ví dụ rating từ 0 đến 5
            },
        },
        shopBankAccountNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        shopBankName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        tableName: "Shops",
        timestamps: false, // Tắt tự động thêm createdAt và updatedAt nếu không cần
    },
);

// Quan hệ (nếu cần, sau khi đã định nghĩa model ShopOwner)
Shop.associate = (models) => {
    Shop.belongsTo(models.User, {
        foreignKey: "ownerID",
        as: "Owner", // Tùy chọn, để dễ truy vấn sau này
    });

    Shop.hasMany(models.Order, {
        foreignKey: "shop_id",
        as: "Order",
    });
};

export default (sequelize, DataTypes) => {
    return Shop;
};
