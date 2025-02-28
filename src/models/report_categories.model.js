import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const ReportCategory = sequelize.define(
    "ReportCategory",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: "Name of the report category",
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "Detailed description of the category",
        },
    },
    {
        timestamps: true,
    },
);

ReportCategory.associate = (models) => {
    ReportCategory.hasMany(models.Report, {
        foreignKey: "category_id",
        as: "reports",
    });
};

export default (sequelize, DataTypes) => {
    return ReportCategory;
};
