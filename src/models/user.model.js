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
        status: {
            type: DataTypes.ENUM("Hoạt động", "Không hoạt động", "Đình chỉ"),
            allowNull: false,
            defaultValue: "Hoạt động",
        },
        avatar: {
            type: DataTypes.STRING, // URL hoặc đường dẫn file
            allowNull: true, // Có thể null nếu người dùng chưa đặt avatar
            defaultValue: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
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
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        userAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        identificationNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        idCardFrontFile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idCardBackFile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "Users",
        timestamps: false,
    },
);

export default (sequelize, DataTypes) => {
    return User;
};
