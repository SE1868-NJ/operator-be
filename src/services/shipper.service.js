import { Shipper } from "../models/shipper.model.js";

const ShipperServices = {
    async getAllShippersPending(offset, limit) {
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
        return shippers;
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
