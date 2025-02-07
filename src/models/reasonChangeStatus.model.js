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
        shopID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Shops", // Tên bảng
                key: "shopID", // Tên của khóa chính trong bảng Shops
            },
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        createAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "ReasonChangeStatus",
        timestamps: false,
    },
);

ReasonChangeStatus.associate = (models) => {
    ReasonChangeStatus.hasMany(models.Shop, {
        foreignKey: "shopID",
    });
    ReasonChangeStatus.hasMany(models.Operator, {
        foreignKey: "operatorID",
    });
};

export default (sequelize, DataTypes) => {
    return ReasonChangeStatus;
};
