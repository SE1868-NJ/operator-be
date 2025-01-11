import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Role = sequelize.define("Role", {
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

export default (sequelize, DataTypes) => {
    return Role;
};
