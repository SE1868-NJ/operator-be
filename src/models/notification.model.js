import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Notification = sequelize.define("Notification", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM("info", "warning", "alert", "message"),
        allowNull: false,
        comment: "Type of notification (e.g., info, warning, alert, message)",
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "Content of the notification",
    },
    status: {
        type: DataTypes.ENUM("unread", "read"),
        defaultValue: "unread",
        comment: "Status of the notification (unread or read)",
    },
});

export default (sequelize, DataTypes) => {
    return Notification;
};
