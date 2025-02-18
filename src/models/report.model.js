import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Report = sequelize.define("Report", {
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
    reporter_email: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Email of the user reporting the issue",
    },
    report_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "resolved"),
        defaultValue: "pending",
    },
    response: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

export default (sequelize, DataTypes) => {
    return Report;
};
