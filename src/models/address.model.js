// address.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Address = sequelize.define(
    "Address",
    {
        address_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users", // Tên bảng User
                key: "userID", // Khóa chính của bảng User
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[0-9]{10,11}$/, // Kiểm tra số điện thoại 10-11 số
            },
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ward: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        default: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: "Addresses",
        timestamps: false,
    },
);

// Định nghĩa mối quan hệ
Address.associate = (models) => {
    Address.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "User",
    });
};

export default (sequelize, DataTypes) => {
    return Address;
};
