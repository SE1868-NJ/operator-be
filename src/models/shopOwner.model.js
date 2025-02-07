import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const ShopOwner = sequelize.define(
    "ShopOwner",
    {
        ownerID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ownerName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
            },
        },
        gender: {
            type: DataTypes.ENUM("Male", "Female", "Other"),
            allowNull: false,
        },
        ownerEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        ownerPhone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [10, 11],
            },
        },
        ownerCitizenID: {
            // số thẻ chung cư
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        citizenIdentificationNumber: {
            // CCCD
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        idCardFrontFile: {
            type: DataTypes.STRING, // URL hoặc đường dẫn file
            allowNull: false,
        },
        idCardBackFile: {
            type: DataTypes.STRING, // URL hoặc đường dẫn file
            allowNull: false,
        },
        taxCode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        shopID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // Bạn có thể thêm foreign key constraint ở đây nếu ShopOwner có quan hệ 1-1 hoặc 1-n với Shop
            references: {
                model: "Shops", // Tên bảng
                key: "id", // Tên cột khóa chính trong bảng Shops
            },
        },
    },
    {
        tableName: "ShopOwners", // Đặt tên bảng
        timestamps: false, // Tắt tự động thêm createdAt và updatedAt
    },
);

// Quan hệ (nếu cần, sau khi đã định nghĩa model Shop)
ShopOwner.associate = (models) => {
    ShopOwner.belongsTo(models.Shop, {
        foreignKey: "shopID",
        as: "Shop", // Tùy chọn, để dễ truy vấn sau này
    });
};

// Không cần export default hàm nếu bạn đã export ShopOwner ở trên
export default (sequelize, DataTypes) => {
    return ShopOwner;
};
