import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { Operator } from "./operator.model.js";

export const Ban = sequelize.define(
    "Ban",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userType: {
            type: DataTypes.ENUM("customer", "shop", "shipper"),
            allowNull: false,
        },
        operatorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        banStart: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        banEnd: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: "Bans",
        timestamps: true,
    },
);

Ban.associate = (models) => {
    Ban.belongsTo(models.Operator, {
        foreignKey: "operatorId",
        as: "operator",
        onDelete: "CASCADE",
    });
};

export default (sequelize, DataTypes) => {
    return Ban;
};
