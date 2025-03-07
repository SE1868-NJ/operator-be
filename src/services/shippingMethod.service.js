import axios from "axios";
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

    async getShippingMethodById(id, city) {
        // Fetch shipping method from DB
        const shippingMethod = await ShippingMethod.findByPk(id);
        if (!shippingMethod) {
            throw new Error("Shipping method not found");
        }

        // Parse `externalFactors` if it's stored as a string
        let externalFactors;
        try {
            externalFactors =
                typeof shippingMethod.externalFactors === "string"
                    ? JSON.parse(shippingMethod.externalFactors)
                    : shippingMethod.externalFactors;
        } catch (error) {
            console.error("Error parsing externalFactors:", error);
            externalFactors = {}; // Default to empty object if parsing fails
        }

        // Default fee if not set
        let adjustedFee = shippingMethod.shippingFee;

        // Check if weather adjustments are enabled
        if (city && externalFactors?.weather?.enabled) {
            try {
                // Step 1: Get real-time weather data
                const weatherResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=545e9b4a434a53f40c19ffe791ae4e5a&units=metric`,
                );
                const weather = weatherResponse.data;
                const temperature = weather.main.temp;
                const weatherCondition = weather.weather[0].main;

                // Step 2: Determine weather level
                let weatherLevel = "LOW";
                if (weatherCondition === "Rain" || weatherCondition === "Snow" || temperature < 5) {
                    weatherLevel = "HIGH";
                } else if (weatherCondition === "Clouds" || temperature < 15) {
                    weatherLevel = "MEDIUM";
                }

                // Step 3: Apply the appropriate multiplier
                const multipliers = externalFactors.weather.multipliers || {};
                const multiplier = multipliers[weatherLevel] || 1.0;

                adjustedFee *= multiplier;

                return {
                    ...shippingMethod.toJSON(),
                    externalFactors, // Return parsed external factors
                    weather: {
                        temperature,
                        condition: weatherCondition,
                        level: weatherLevel,
                    },
                    adjustedFee: adjustedFee,
                };
            } catch (error) {
                console.error("Error fetching weather data:", error);
                throw new Error("Failed to fetch weather data");
            }
        }

        // If weather adjustments are disabled, return the base shipping method
        return {
            ...shippingMethod.toJSON(),
            externalFactors, // Return parsed external factors
            adjustedFee: adjustedFee,
        };
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
