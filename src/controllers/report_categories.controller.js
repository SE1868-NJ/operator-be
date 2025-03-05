import { Op } from "sequelize"; // Required for filtering
import ReportCategoriesServices from "../services/report_categories.service.js";

/**
 * Create a new report category
 */
export const createCategory = async (req, res) => {
    try {
        const category = await ReportCategoriesServices.createCategory(req.body);
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Get all report categories with pagination & filtering
 */
export const getAllCategories = async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;

        // Build filter dynamically
        const filter = {};
        if (search) {
            filter.name = { [Op.like]: `%${search}%` }; // Case-insensitive search
        }

        const result = await ReportCategoriesServices.getAllCategories({ page, limit, filter });

        res.status(200).json({ success: true, ...result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Get a single report category by ID
 */
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await ReportCategoriesServices.getCategoryById(id);

        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Update a report category
 */
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await ReportCategoriesServices.updateCategory(id, req.body);

        if (updated[0] === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Category not found or not updated" });
        }

        res.status(200).json({ success: true, message: "Category updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Delete a report category
 */
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ReportCategoriesServices.deleteCategory(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
