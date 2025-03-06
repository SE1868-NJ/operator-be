import { ShippingMethod } from "../models/shippingMethod.model.js";

const ShippingMethodService = {
    // Create a new shipping method
    async createShippingMethod(data) {
        try {
            const shippingMethod = await ShippingMethod.create(data);
            return shippingMethod;
        } catch (error) {
            console.error("Error creating shipping method:", error);
            throw new Error("Failed to create shipping method");
        }
    },

    // Get all shipping methods
    async getAllShippingMethods() {
        try {
            return await ShippingMethod.findAll();
        } catch (error) {
            console.error("Error fetching shipping methods:", error);
            throw new Error("Failed to fetch shipping methods");
        }
    },

    // Get a single shipping method by ID
    async getShippingMethodById(id) {
        try {
            const shippingMethod = await ShippingMethod.findByPk(id);
            if (!shippingMethod) {
                throw new Error("Shipping method not found");
            }
            return shippingMethod;
        } catch (error) {
            console.error("Error fetching shipping method:", error);
            throw new Error("Failed to fetch shipping method");
        }
    },

    // Update a shipping method
    async updateShippingMethod(id, data) {
        try {
            const shippingMethod = await ShippingMethod.findByPk(id);
            if (!shippingMethod) {
                throw new Error("Shipping method not found");
            }
            await shippingMethod.update(data);
            return shippingMethod;
        } catch (error) {
            console.error("Error updating shipping method:", error);
            throw new Error("Failed to update shipping method");
        }
    },

    // Delete a shipping method
    async deleteShippingMethod(id) {
        try {
            const shippingMethod = await ShippingMethod.findByPk(id);
            if (!shippingMethod) {
                throw new Error("Shipping method not found");
            }
            await shippingMethod.destroy();
            return { message: "Shipping method deleted successfully" };
        } catch (error) {
            console.error("Error deleting shipping method:", error);
            throw new Error("Failed to delete shipping method");
        }
    },
};

export default ShippingMethodService;
