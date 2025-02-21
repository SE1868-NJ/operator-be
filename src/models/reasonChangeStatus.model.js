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
            type: DataTypes.ENUM("accepted", "rejected"),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: true,
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
