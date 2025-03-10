import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const MediaItem = sequelize.define(
    "MediaItem",
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        mediaID: {
            type: DataTypes.INTEGER,
            references: {
                model: "Media",
                key: "ID",
            },
            onDelete: "CASCADE", // Nếu operator bị xóa, các bản ghi trong Ban cũng bị xóa
        },
        mediaItemURL: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            defaultValue:
                "https://mirro.io/hs-fs/hubfs/Imported_Blog_Media/1-feedback-descriptive-2.jpg?width=600&height=400&name=1-feedback-descriptive-2.jpg",
        },
        type: {
            type: DataTypes.ENUM("image", "video"),
            allowNull: false,
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
    {
        tableName: "MediaItem",
        timestamps: false,
    },
);

// Quan hệ (nếu cần, sau khi đã định nghĩa model ShopOwner)
MediaItem.associate = (models) => {
    MediaItem.belongsTo(models.Media, {
        foreignKey: "mediaID",
        as: "Media", // Tùy chọn, để dễ truy vấn sau này
    });
};

export default (sequelize, DataTypes) => {
    return MediaItem;
};
