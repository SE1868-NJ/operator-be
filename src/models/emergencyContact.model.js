import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import Shipper from "./shipper.model.js";

const EmergencyContact = sequelize.define("EmergencyContact", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    relation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shipperId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

EmergencyContact.associate = (models) => {
    EmergencyContact.belongsTo(models.Shipper, {
        foreignKey: "shipperId",
    });
};

export default (sequelize, DataTypes) => {
    return EmergencyContact;
};
