import ReportsServices from "../services/reports.service.js";
import { sendEmail } from "../utils/mail.js";

export const createReport = async (req, res) => {
    const { reportPayload } = req.body;

    // Validate that reportPayload exists
    if (!reportPayload) {
        return res.status(400).json({ message: "reportPayload is required" });
    }

    try {
        // Call the service to create the report
        const newReport = await ReportsServices.createReport(reportPayload);

        // return
        return res.status(201).json({
            message: "Report created successfully",
            data: newReport,
        });
    } catch (error) {
        // Handle errors and return a 500 status code for server errors
        console.error("Error in createReport controller:", error);
        return res.status(500).json({
            message: "Failed to create report",
            error: error.message,
        });
    }
};

export const getReports = async (req, res) => {
    try {
        const reports = await ReportsServices.getReports(req.query);
        res.status(200).json(reports);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getReport = async (req, res) => {
    const { id } = req.params;
    try {
        const report = await ReportsServices.getReport(id);
        res.status(200).json(report);
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

export const responseReport = async (req, res) => {
    const { id } = req.params;
    const { response, reporter_email, report_title } = req.body;

    try {
        const report = await ReportsServices.updateReportStatus(id, response);

        await sendEmail({
            to: reporter_email,
            subject: `Trả lời khiếu nại - ${report_title}`,
            text: response,
        });

        if (report[0] === 1) {
            res.status(200).json({
                data: report,
            });
        } else {
            throw new Error("Error occur!");
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

export const getReportStatistic = async (req, res) => {
    const { timeRange, interval } = req.query;
    try {
        const data = await ReportsServices.getNewReportCount(timeRange, interval);
        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
