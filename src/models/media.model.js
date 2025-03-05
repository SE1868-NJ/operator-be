import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Media = sequelize.define(
    "Media",
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
    {
        tableName: "Media",
        timestamps: false,
    },
);

Media.associate = (models) => {
    Media.hasMany(models.MediaItem, {
        foreignKey: "mediaID",
        as: "MediaItems",
    });
};

export default (sequelize, DataTypes) => {
    return Media;
};
