import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { Operator } from "./operator.model.js"; // Import bảng Operator

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
            references: {
                model: Operator, // Liên kết với bảng Operator
                key: "operatorId",
            },
            onDelete: "CASCADE", // Nếu operator bị xóa, các bản ghi trong Ban cũng bị xóa
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
            type: DataTypes.ENUM("active", "banned", "scheduled"),
            allowNull: false,
            defaultValue: "active",
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
    });
};

export default (sequelize, DataTypes) => {
    return Ban;
};
