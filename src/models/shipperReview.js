import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const ShipperReview = sequelize.define(
    "ShipperReview",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "userID",
            },
        },
        shipperId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Shippers",
                key: "id",
            },
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "ShipperReviews",
        timestamps: true,
    }
);

// Thiết lập quan hệ
ShipperReview.associate = (models) => {
    ShipperReview.belongsTo(models.User, {
        foreignKey: "userId",
        as: "customer",
    });

    ShipperReview.belongsTo(models.Shipper, {
        foreignKey: "shipperId",
        as: "shipper",
    });
};


export default (sequelize, DataTypes) => {
    return ShipperReview;
};
