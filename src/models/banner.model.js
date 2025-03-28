import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Banner = sequelize.define(
    "Banner",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("visible", "hidden"),
            allowNull: false,
            defaultValue: "hidden", 
        },
        approvalStatus: {
            type: DataTypes.ENUM("pending", "approved", "rejected"),
            allowNull: false,
            defaultValue: "pending",
        },
        shopID: {
            type: DataTypes.INTEGER,
            references: {
                model: "Shops", 
                key: "shopID", 
            },
            onUpdate: "CASCADE", 
            onDelete: "CASCADE",
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: "Banners",
        timestamps: true,
    }
);

// Thiết lập quan hệ với Shop
Banner.associate = (models) => {
    Banner.belongsTo(models.Shop, {
        foreignKey: "shopID",
        as: "shop", 
    });
};

export default (sequelize, DataTypes) => {
    return Banner;
};

