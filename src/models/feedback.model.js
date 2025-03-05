import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { Media } from "./media.model.js";
import { OrderItem } from "./orderItem.model.js";
import { ReplyFeedback } from "./replyFeedback.model.js";
import { User } from "./user.model.js";
export const Feedback = sequelize.define(
    "Feedback",
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        star: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        orderItemID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: OrderItem,
                key: "id",
            },
        },
        customerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "userID",
            },
        },
        replyID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: ReplyFeedback,
                key: "ID",
            },
        },
        mediaID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Media,
                key: "ID",
            },
        },
    },
    {
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAT",
    },
    {
        tableName: "Feedbacks",
        timestamps: false,
    },
);

// Thiết lập các mối quan hệ
Feedback.associate = (models) => {
    Feedback.belongsTo(models.OrderItem, {
        foreignKey: "orderItemID",
        as: "OrderItem",
    });

    Feedback.belongsTo(models.User, {
        foreignKey: "customerID",
        as: "Customer",
    });

    Feedback.hasOne(models.ReplyFeedback, {
        foreignKey: "ID",
        as: "Reply",
    });

    Feedback.belongsTo(models.Media, {
        foreignKey: "mediaID",
        as: "Media",
    });
};

export default (sequelize, DataTypes) => {
    return Feedback;
};
