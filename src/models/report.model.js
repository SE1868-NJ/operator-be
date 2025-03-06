import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Report = sequelize.define(
    "Report",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        report_type: {
            type: DataTypes.ENUM("shop", "customer", "shipper"),
            allowNull: false,
        },
        reporter_id: {
            type: DataTypes.UUID,
            allowNull: false,
            comment: "ID of the user reporting the issue",
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "reviewed", "resolved"),
            defaultValue: "pending",
        },
    },
    {
        tableName: "Reports",
        timestamps: true,
    },
);

export default (sequelize, DataTypes) => {
    return Report;
};
