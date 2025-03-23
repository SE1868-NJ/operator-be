import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Shipper = sequelize.define(
    "Shipper",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [["male", "female", "other"]],
                    msg: "Gender must be male, female, or other.",
                },
            },
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: {
                    msg: "Date of birth must be a valid date format.",
                },
                isBefore: {
                    args: new Date().toISOString().split("T")[0],
                    msg: "Date of birth must be a date before the current date.",
                },
            },
        },
        hometown: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        idCardFrontFile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idCardBackFile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Invalid email.",
                },
                len: {
                    args: [5, 255],
                    msg: "Email must be between 5 and 255 characters in length.",
                },
            },
        },
        joinedDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "active", "inactive", "suspended"),

            allowNull: false,
            defaultValue: "pending",
        },
        activityArea: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        shippingMethod: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "Shippers",
        timestamps: true,
    },
);

// Thiết lập quan hệ giữa Shipper và EmergencyContact
Shipper.associate = (models) => {
    Shipper.hasOne(models.EmergencyContact, {
        foreignKey: "shipperId",
        as: "EmergencyContact",
    });
    Shipper.hasMany(models.Order, {
        foreignKey: "shipper_id",
        as: "Orders",
    });
}

export default (sequelize, DataTypes) => {
    return Shipper;
};
