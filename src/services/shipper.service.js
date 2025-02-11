import { Shipper } from "../models/shipper.model.js";

const ShipperServices = {
    async getAllShippersPending() {
        const shippers = await Shipper.findAll({
            where: {
                status: "pending",
            },
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
};

export default ShipperServices;
