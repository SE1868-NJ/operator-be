import { ReportCategory } from "../models/report_categories.model.js";

const ReportCategoriesServices = {
    /**
     * Create a new report category
     * @param {Object} data - Category data
     * @returns {Promise<Object>} Created category
     */
    async createCategory(data) {
        return await ReportCategory.create(data);
    },

    /**
     * Get all report categories with pagination and filtering
     * @param {Object} params - Query parameters (page, limit, filter)
     * @returns {Promise<Object>} Paginated categories with metadata
     */
    async getAllCategories({ page = 1, limit = 10, filter = {} } = {}) {
        const offset = (page - 1) * limit;

        const { count, rows } = await ReportCategory.findAndCountAll({
            where: filter, // Apply filters dynamically
            limit: Number.parseInt(limit),
            offset: Number.parseInt(offset),
            order: [["createdAt", "DESC"]],
        });

        return {
            total: count,
            page: Number.parseInt(page),
            limit: Number.parseInt(limit),
            totalPages: Math.ceil(count / limit),
            data: rows,
        };
    },

    /**
     * Get a category by ID
     * @param {string} categoryId - Category UUID
     * @returns {Promise<Object|null>} Category or null if not found
     */
    async getCategoryById(categoryId) {
        return await ReportCategory.findByPk(categoryId);
    },

    /**
     * Update a category
     * @param {string} categoryId - Category UUID
     * @param {Object} data - Updated data
     * @returns {Promise<[number, Object[]]>} Update result
     */
    async updateCategory(categoryId, data) {
        return await ReportCategory.update(data, { where: { id: categoryId } });
    },

    /**
     * Delete a category
     * @param {string} categoryId - Category UUID
     * @returns {Promise<number>} Number of deleted rows
     */
    async deleteCategory(categoryId) {
        return await ReportCategory.destroy({ where: { id: categoryId } });
    },
};

export default ReportCategoriesServices;
