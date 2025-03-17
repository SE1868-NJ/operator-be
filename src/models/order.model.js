import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { ShippingMethod } from "./shippingMethod.model.js"; // Import ShippingMethod

export const Order = sequelize.define(
    "Order",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        shop_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Shops",
                key: "shopID",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "userID",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        shipper_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "Shippers",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Addresses",
                key: "address_id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        // shipping_method_id: {
        //   type: DataTypes.UUID,
        //   allowNull: false,
        //   references: {
        //     model: "shipping_methods",
        //     key: "id",
        //   },
        //   onUpdate: "CASCADE",
        //   onDelete: "RESTRICT",
        // },
        productFee: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        shippingFee: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        status: {
            type: DataTypes.ENUM("pending", "processing", "completed", "cancelled"),
            allowNull: false,
            defaultValue: "pending",
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        payment_status: {
            type: DataTypes.ENUM("pending", "paid"),
            allowNull: false,
            defaultValue: "pending",
        },
        shipping_status: {
            type: DataTypes.ENUM("not_yet_shipped", "shipping", "shipped"),
            allowNull: false,
            defaultValue: "not_yet_shipped",
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        estimated_delivery_time: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        actual_delivery_time: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "Orders",
        timestamps: true,
    },
);

// Thiết lập quan hệ
Order.associate = (models) => {
    Order.belongsTo(models.Shop, { foreignKey: "shop_id", as: "Shop" });
    Order.belongsTo(models.User, { foreignKey: "customer_id", as: "Customer" });
    Order.belongsTo(models.Shipper, { foreignKey: "shipper_id", as: "Shipper" });
    Order.belongsTo(models.Address, { foreignKey: "address_id", as: "Address" });
    //   Order.belongsTo(models.ShippingMethod, {
    //     foreignKey: "shipping_method_id",
    //     as: "ShippingMethod",
    //   });

    Order.hasMany(models.OrderItem, { foreignKey: "order_id", as: "OrderItems" });
};

export default (sequelize, DataTypes) => {
    return Order;
};
