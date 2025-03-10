import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Operator = sequelize.define("Operator", {
    operatorID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
        validate: {
            notEmpty: true,
        },
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [10, 15],
        },
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
    },
    roleCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Operator.associate = (models) => {
    Operator.hasMany(models.Ban, {
        foreignKey: "operatorId",
        as: "bans",
    });
};

export default (sequelize, DataTypes) => {
    return Operator;
};
