import ShippingMethodService from "../services/shippingMethod.service.js";

export async function createShippingMethod(req, res) {
    try {
        const shippingMethod = await ShippingMethodService.createShippingMethod(req.body);
        res.status(201).json({ success: true, data: shippingMethod });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get all shipping methods
export async function getAllShippingMethod(req, res) {
    try {
        const shippingMethods = await ShippingMethodService.getAllShippingMethods();
        res.status(200).json({ success: true, data: shippingMethods });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get a shipping method by ID
export async function getByIdShippingMethod(req, res) {
    try {
        const { id } = req.params;
        const shippingMethod = await ShippingMethodService.getShippingMethodById(id);
        res.status(200).json({ success: true, data: shippingMethod });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
}

// Update a shipping method
export async function updateShippingMethod(req, res) {
    try {
        const { id } = req.params;
        const updatedShippingMethod = await ShippingMethodService.updateShippingMethod(
            id,
            req.body,
        );
        res.status(200).json({ success: true, data: updatedShippingMethod });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Delete a shipping method
export async function deleteShippingMethod(req, res) {
    try {
        const { id } = req.params;
        await ShippingMethodService.deleteShippingMethod(id);
        res.status(200).json({ success: true, message: "Shipping method deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
