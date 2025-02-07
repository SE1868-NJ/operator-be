import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Operator = sequelize.define("Operator", {
    operatorID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    operatorName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

export default (sequelize, DataTypes) => {
    return Operator;
};
