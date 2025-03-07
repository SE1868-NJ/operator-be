import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { Ban } from "./ban.model.js";

export const Operator = sequelize.define("Operator", {
    operatorID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    operatorName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [10, 15], // Số điện thoại từ 10-15 ký tự
        },
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY, // Chỉ lưu ngày (YYYY-MM-DD)
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM("male", "female", "other"), // Giới tính có thể là Nam, Nữ hoặc Khác
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
    },
    roleCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default (sequelize, DataTypes) => {
    return Operator;
};
