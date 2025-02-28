import express from "express";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
} from "../controllers/report_categories.controller.js";

const reportCategoriesRouter = express.Router();

// Get a single report category by ID
reportCategoriesRouter.get("/:id", getCategoryById);

// Update a report category
reportCategoriesRouter.put("/:id", updateCategory);

// Delete a report category
reportCategoriesRouter.delete("/:id", deleteCategory);

// Get all report categories (supports pagination & filtering)
reportCategoriesRouter.get("/", getAllCategories);

// Create a new report category
reportCategoriesRouter.post("/", createCategory);

export default reportCategoriesRouter;
