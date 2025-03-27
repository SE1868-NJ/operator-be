import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const ReasonItem = sequelize.define(
    "ReasonItem",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        operator_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        pending_id: {
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
        index: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        tableName: "ReasonItems",
        timestamps: true,
        underscored: true,
    },
);

ReasonItem.associate = (models) => {
    ReasonItem.belongsTo(models.Shop, {
        foreignKey: "pending_id",
        as: "shop",
    });
    ReasonItem.belongsTo(models.Shipper, {
        foreignKey: "pending_id",
        as: "shipper",
    });
    ReasonItem.belongsTo(models.Operator, {
        foreignKey: "operator_id",
        as: "operator",
    });
};

export default (sequelize, DataTypes) => {
    return ReasonItem;
};
