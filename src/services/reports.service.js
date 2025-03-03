import { Op } from "sequelize";
import { Report } from "../models/report.model.js";
import { model } from "../utils/gemini.js";
import ReportCategoriesServices from "./report_categories.service.js";
import ShipperServices from "./shipper.service.js";
import ShopService from "./shop.service.js";
import userService from "./user.service.js";

const prompt = ({ category_name, report_title, report_type, content }) => `
You are an AI assistant that analyzes user reports in an eCommerce system and determines their priority level.

Priority levels:
- **Low**: Minor issues that do not impact user experience significantly.
- **Medium**: Issues that may cause inconvenience but do not disrupt essential functions.
- **High**: Significant problems affecting core functionality for multiple users.
- **Critical**: Urgent issues causing system failure, security breaches, or major disruptions.

Analyze the following report and assign a priority level (low, medium, high, or critical):

**Category:** ${category_name}  
**Title:** ${report_title}  
**Type:** ${report_type}  
**Description:** ${content}  

Return only one single word as the priority level: "low", "medium", "high", or "critical" 
`;

const ReportsServices = {
    async createReport(payload) {
        const {
            report_type,
            reporter_id,
            reporter_email,
            category_id,
            report_title,
            content,
            status = "pending",
            response = null,
            attachments = [],
            problem_time = new Date().toISOString(),
        } = payload;

        // Validate required fields
        if (
            !report_type ||
            !reporter_id ||
            !content ||
            !reporter_email ||
            !category_id ||
            !report_title ||
            !problem_time
        ) {
            throw new Error(
                "Missing required fields: report_type, reporter_id, reporter_email, category_id, report_title, problem_time or content",
            );
        }

        switch (report_type) {
            case "customer": {
                const user = await userService.getUserById(reporter_id);
                console.log(user);
                if (!user) throw new Error("Customer does not exist!");
                break;
            }
            case "shipper": {
                const user = await ShipperServices.getShipperById(reporter_id);
                console.log(user);
                if (!user) throw new Error("Shipper does not exist!");
                break;
            }
            case "shop": {
                const shop = await ShopService.getShopById(reporter_id);
                console.log(shop);
                if (!shop) throw new Error("Shop does not exist!");
                break;
            }
            default:
                throw new Error("Invalid report type!");
        }

        const category = await ReportCategoriesServices.getCategoryById(category_id);
        if (!category) throw new Error("Category not exist!");

        // using Gemini AI to generate report priority
        const p = await model
            .generateContent(
                prompt({
                    category_name: category.name,
                    report_title,
                    report_type,
                    content,
                }),
            )
            .then((res) => res.response.text().toLowerCase().slice(0, -1));

        try {
            const newReport = await Report.create({
                report_type,
                reporter_id,
                reporter_email,
                category_id,
                priority: p,
                report_title,
                content,
                status,
                response,
                attachments,
                problem_time,
            });
            return newReport;
        } catch (error) {
            console.error("Error creating report:", error);
            throw new Error(`Failed to create report: ${error.message}`);
        }
    },

    async getReports(query) {
        const { page = 1, limit = 10, search, report_type, status, priority, category_id } = query;

        const where = {};

        if (search) {
            where[Op.or] = [
                { report_title: { [Op.like]: `%${search}%` } },
                { content: { [Op.like]: `%${search}%` } },
            ];
        }

        if (report_type) where.report_type = report_type;
        if (status) where.status = status;
        if (priority) where.priority = priority;
        if (category_id) where.category_id = category_id; // Added category_id filter

        const offset = (page - 1) * limit;
        const reports = await Report.findAndCountAll({
            where,
            limit: Number(limit),
            offset: Number(offset),
            order: [["createdAt", "DESC"]],
            include: [{ association: "category" }], // Ensure Report model has association with category
        });

        return {
            reports: reports.rows,
            total: reports.count,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(reports.count / limit),
        };
    },

    async getReport(id) {
        const report = await Report.findByPk(id, {
            include: [{ association: "category" }],
        });
        return report;
    },
    async updateReportStatus(id, response = null) {
        const report = await Report.update({ status: "resolved", response }, { where: { id } });
        return report;
    },
};

export default ReportsServices;
