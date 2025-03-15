import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const ReasonChangeStatus = sequelize.define(
    "ReasonChangeStatus",
    {
        reasonChangeStatusID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        operatorID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Operators", // Tên bảng
                key: "operatorID", // Tên của khóa chính trong bảng Operators
            },
        },
        pendingID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        changedStatus: {
            type: DataTypes.ENUM("accepted", "rejected", "savedraft"),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        reason: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        // createAt: {
        //     type: DataTypes.DATE,
        //     defaultValue: DataTypes.NOW,
        // },
    },
    {
        tableName: "ReasonChangeStatus",
        timestamps: true,
    },
);

// ReasonChangeStatus.associate = (models) => {
//     ReasonChangeStatus.hasMany(models.Shop, {
//         foreignKey: "shopID",
//     });
//     ReasonChangeStatus.hasMany(models.Operator, {
//         foreignKey: "operatorID",
//     });
// };

ReasonChangeStatus.associate = (models) => {
    ReasonChangeStatus.belongsTo(models.Shop, {
        foreignKey: "pendingID", // pendingID lưu trữ shopID
        as: "shop", // Bí danh cho liên kết Shop
        constraints: false, // Cho phép pendingID là NULL hoặc trỏ đến các bảng khác.
        foreignKeyConstraint: false, // Ngăn chặn các lỗi ràng buộc khóa ngoại.
    });

    ReasonChangeStatus.belongsTo(models.Shipper, {
        foreignKey: "pendingID", // pendingID lưu trữ shipperID
        as: "shipper", // Bí danh cho liên kết Shipper
        constraints: false, // Cho phép pendingID là NULL hoặc trỏ đến các bảng khác.
        foreignKeyConstraint: false, // Ngăn chặn các lỗi ràng buộc khóa ngoại.
    });

    ReasonChangeStatus.belongsTo(models.Operator, {
        foreignKey: "operatorID",
        as: "operator", // Bí danh cho liên kết Operator
    });
};

export default (sequelize, DataTypes) => {
    return ReasonChangeStatus;
};
