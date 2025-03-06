import { join } from "path";
import { updateShipperPending } from "../controllers/shipper.controller.js";
import { Shipper } from "../models/shipper.model.js";

const ShipperServices = {
    async getAllShippers(offset, limit) {
        const shippers = await Shipper.findAll({
            offset,
            limit,
        })
            .then((res) => res)
            .catch((err) => {
                console.log(err);
            });
        return shippers;
    },
    async getAllShippersPending(offset = 0, limit = 10) {
        const shippers = await Shipper.findAll({
            where: {
                status: "pending",
            },
            offset,
            limit,
        })
            .then((res) => res)
            .catch((err) => {
                console.log(err);
            });

        const total = await Shipper.count({
            where: {
                status: "pending",
            },
        });
        return { shippers, total };
    },

    async getOneShipperPending(id) {
        const shipper = await Shipper.findByPk(id)
            .then((res) => res)
            .catch((err) => {
                console.log(err);
            });
        return shipper;
    },

    async updateShipperPending(id, updatedStatus) {
        const transaction = await sequelize.transaction();
        try {
            const { status, description } = updatedStatus;
            const newStatus = status === "rejected" ? "inactive" : "active";
            const reason = description;

            try {
                const updatedShipper = await Shipper.update(
                    {
                        status: newStatus,
                        joinedDate: new Date(),
                    },
                    {
                        where: {
                            id: id,
                        },
                        transaction: transaction,
                    },
                );

                // Kiểm tra xem shop có tồn tại hay không
                if (updatedShipper === null) {
                    await transaction.rollback();
                    throw new Error("Shipper not found");
                }

                await ReasonChangeStatus.create(
                    {
                        operatorID: 1,
                        pendingID: id,
                        role: "Shipper",
                        changedStatus: status,
                        reason: reason,
                    },
                    {
                        transaction: transaction,
                    },
                );

                await transaction.commit();
                return updatedShipper;
            } catch (error) {
                await transaction.rollback();
                console.error(
                    "Error during updateShopStatus (inner try) - Shop ID:",
                    id,
                    "Error:",
                    error,
                    "Request Body:",
                    req.body,
                );
                throw new Error(error.message);
            }
        } catch (error) {
            await transaction.rollback();
            console.error(
                "Error during updateShopStatus (outer try) - Shop ID:",
                id,
                "Error:",
                error,
                "Request Body:",
                req.body,
            );
            throw new Error(error.message);
        }
    },

    async updateShipperStatus(id, status) {
        try {
            const shipper = await Shipper.findByPk(id);
            if (!shipper) {
                throw new Error("Shipper not found");
            }
            shipper.status = status;
            await shipper.save();
            return shipper;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default ShipperServices;
