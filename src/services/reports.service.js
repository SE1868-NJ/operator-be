import { Report } from "../models/report.model.js";

const ReportsServices = {
    async createReport(payload) {
        const { report_type, reporter_id, content, status = "pending" } = payload;

        // Validate required fields
        if (!report_type || !reporter_id || !content) {
            throw new Error("Missing required fields: report_type, reporter_id, or content");
        }

        try {
            const newReport = await Report.create({
                report_type,
                reporter_id,
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
};

export default ReportsServices;
