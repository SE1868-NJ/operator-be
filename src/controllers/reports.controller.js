import ReportsServices from "../services/reports.service.js";

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
