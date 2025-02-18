import { Op } from "sequelize";
import { Report } from "../models/report.model.js";

const ReportsServices = {
    async createReport(payload) {
        const {
            report_type,
            reporter_id,
            reporter_email,
            report_title,
            content,
            status = "pending",
        } = payload;

        // Validate required fields
        if (!report_type || !reporter_id || !content || !reporter_email) {
            throw new Error(
                "Missing required fields: report_type, reporter_id, reporter_email, report_title, or content",
            );
        }

        try {
            const newReport = await Report.create({
                report_type,
                reporter_id,
                reporter_email,
                report_title,
                content,
                status,
            });
            return newReport;
        } catch (error) {
            console.error("Error creating report:", error);

            // Throw a more descriptive error
            throw new Error(`Failed to create report: ${error.message}`);
        }
    },
    async getReports(query) {
        const { page = 1, limit = 10, search, report_type, status } = query;

        const where = {};
        if (search) {
            where.content = { [Op.like]: `%${search}%` };
        }
        if (report_type) {
            where.report_type = report_type;
        }
        if (status) {
            where.status = status;
        }

        const offset = (page - 1) * limit;
        const reports = await Report.findAndCountAll({
            where,
            limit: Number(limit),
            offset: Number(offset),
            order: [["createdAt", "DESC"]],
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
        const report = await Report.findByPk(id);
        return report;
    },
    async updateReportStatus(id, response) {
        const status = response ? "resolved" : "pending";
        const report = await Report.update(
            {
                status,
                response,
            },
            {
                where: {
                    id,
                },
            },
        );
        return report;
    },
};

export default ReportsServices;
