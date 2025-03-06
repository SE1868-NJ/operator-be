import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { ReportCategory } from "./report_categories.model.js";

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
    category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "ReportCategories",
            key: "id",
        },
        comment: "Category of the report",
    },
    priority: {
        type: DataTypes.ENUM("low", "medium", "high", "critical"),
        defaultValue: "medium",
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
        type: DataTypes.ENUM("pending", "in_progress", "resolved", "closed", "rejected"),
        defaultValue: "pending",
    },
    response: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    attachments: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Array of file URLs (e.g., images, PDFs) attached to the report",
    },
    problem_time: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Timestamp when the problem happened",
    },
});

Report.belongsTo(ReportCategory, { foreignKey: "category_id", as: "category" });

export default (sequelize, DataTypes) => {
    return Report;
};
