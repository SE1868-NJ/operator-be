import { io } from "../app.js";
import NotificationsServices from "../services/notifications.service.js";

export const createNotification = async (req, res) => {
    const { notifPayload } = req.body;

    // Validate that notifPayload exists
    if (!notifPayload) {
        return res.status(400).json({ message: "notifPayload is required" });
    }

    try {
        // Call the service to create the notification
        const newNotification = await NotificationsServices.createNotification(notifPayload);

        // emit to client
        io.emit("new_notif", {
            data: newNotification,
        });

        // Return the created notification with a 201 status code
        return res.status(201).json({
            message: "Notification created successfully",
            data: newNotification,
        });
    } catch (error) {
        // Handle errors and return a 500 status code for server errors
        console.error("Error in createNotification controller:", error);
        return res.status(500).json({
            message: "Failed to create notification",
            error: error.message,
        });
    }
};

export const getAllNotifications = async (req, res) => {
    try {
        // Extract query parameters (optional filters)
        const { status, type } = req.query;

        // Define filters based on query parameters
        const filters = {};
        if (status) filters.status = status;
        if (type) filters.type = type;

        // Call the service to fetch notifications
        const notifications = await NotificationsServices.getAllNotifications(filters);

        // Return the notifications with a 200 status code
        return res.status(200).json({
            message: "Notifications fetched successfully",
            data: notifications,
        });
    } catch (error) {
        // Handle errors and return a 500 status code for server errors
        console.error("Error in getAllNotifications controller:", error);
        return res.status(500).json({
            message: "Failed to fetch notifications",
            error: error.message,
        });
    }
};
