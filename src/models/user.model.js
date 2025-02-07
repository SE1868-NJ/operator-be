import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const User = sequelize.define(
    "User",
    {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fullName: {
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
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        userPhone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [10, 11],
            },
        },
        userCitizenID: {
            // số thẻ chung cư
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        identificationNumber: {
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
    },
    {
        tableName: "Users",
        timestamps: false, // Tắt tự động thêm createdAt và updatedAt nếu không cần
    },
);

export default (sequelize, DataTypes) => {
    return User;
};
