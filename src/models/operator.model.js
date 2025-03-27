import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Operator = sequelize.define("Operator", {
    operatorID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
            "https://res.cloudinary.com/dafn4ktx0/image/upload/v1743042455/default_avatar_h9spud.jpg",
        validate: {
            notEmpty: true,
        },
    },
    avatar_public_id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "swp_storage_image/default_avatar_h9spud",
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    personalEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
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
});

Operator.associate = (models) => {
    Operator.hasMany(models.Ban, {
        foreignKey: "operatorId",
        as: "bans",
    });
};

export default (sequelize, DataTypes) => {
    return Operator;
};
