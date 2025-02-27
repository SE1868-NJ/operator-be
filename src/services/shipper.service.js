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
                status: "Pending",
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
                status: "Pending",
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

    async updateShipperPending(id, status) {
        const shipper = await Shipper.update(
            { status: status },
            {
                where: {
                    id: id,
                },
            },
        )
            .then((res) => res)
            .catch((err) => {
                console.log(err);
            });
        return shipper;
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
