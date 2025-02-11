import { Shipper } from "../models/shipper.model.js";

const ShipperService = {
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

export default ShipperService;
