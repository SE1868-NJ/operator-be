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
                args: [["Male", "Female", "Other"]],
                msg: "Giới tính phải là Nam, Nữ, hoặc Khác.",
            },
        },
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: {
                msg: "Ngày sinh sai format.",
            },
            isBefore: {
                args: new Date().toISOString().split("T")[0],
                msg: "Ngày sinh phải là ngày trước thời gian hiện tại.",
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
                msg: "Email không hợp lệ.",
            },
            len: {
                args: [5, 255],
                msg: "Email phải chứa 5 đến 255 ký tự",
            },
        },
    },
    status: {
        type: DataTypes.ENUM("Pending", "Active", "Deactive"),

        allowNull: false,

        defaultValue: "Pending",
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
