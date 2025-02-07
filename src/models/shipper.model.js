import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Shipper = sequelize.define("Shipper", {
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
    cccd: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
    status: {
        type: DataTypes.ENUM("Active", "Inactive"),
        allowNull: false,
    },
    activityArea: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    shippingMethod: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// Thiết lập quan hệ giữa Shipper và EmergencyContact
// Shipper.associate = function (models) {
//     Shipper.hasOne(models.EmergencyContact, {
//         foreignKey: "shipperId",
//     });
// }

export default (sequelize, DataTypes) => {
    return Shipper;
};
