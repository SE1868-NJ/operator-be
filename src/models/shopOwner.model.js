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
    },
    {
        tableName: "ShopOwners", // Đặt tên bảng
        timestamps: false, // Tắt tự động thêm createdAt và updatedAt
    },
);

// Không cần export default hàm nếu bạn đã export ShopOwner ở trên
export default (sequelize, DataTypes) => {
    return ShopOwner;
};
