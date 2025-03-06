import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";
// import User from "./user.model.js";

export const ReplyFeedback = sequelize.define(
    "ReplyFeedback",
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
        replyUserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users", // Giả sử replyUserID là người dùng, có thể đổi nếu cần
                key: "userID",
            },
        },
    },
    {
        timestamps: true,
        createdAt: "created_At",
        updatedAt: "updated_At",
    },
    {
        tableName: "ReplyFeedbacks",
        timestamps: false,
    },
);

// Quan hệ với Feedback (Mỗi Feedback có thể có một ReplyFeedback)
ReplyFeedback.associate = (models) => {
    ReplyFeedback.belongsTo(models.User, {
        foreignKey: "replyUserID",
        as: "ReplyUser",
    });
};

export default (sequelize, DataTypes) => {
    return ReplyFeedback;
};
