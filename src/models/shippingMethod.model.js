import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const ShippingMethod = sequelize.define(
    "ShippingMethod",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        autoCalculate: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        shippingFee: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        options: {
            type: DataTypes.JSON,
            defaultValue: {},
        },
        externalFactors: {
            type: DataTypes.JSON,
            defaultValue: {},
        },
        preparationTime: {
            type: DataTypes.INTEGER, // Đơn vị: phút
            allowNull: false,
            defaultValue: 30,
        },
        estimatedDeliveryTime: {
            type: DataTypes.INTEGER, // Đơn vị: phút
            allowNull: false,
            defaultValue: 120,
        },
        status: {
            type: DataTypes.ENUM("enabled", "disabled"),
            allowNull: false,
            defaultValue: "enabled",
        },
    },
    {
        timestamps: true,
        tableName: "shipping_methods",
    },
);

export default (sequelize, DataTypes) => {
    return ShippingMethod;
};
