import { Notification } from "../models/notification.model.js";

const NotificationsServices = {
    async createNotification(payload) {
        const { type, message, status = "unread" } = payload;
        
        // Validate required fields
        if (!type || !message) {
            throw new Error("Missing required fields: type, message, or recipient_id");
        }

        try {
            // Create the notification
            const newNotification = await Notification.create({
                type,
                message,
                status,
            });

            // Return the created notification
            return newNotification;
        } catch (error) {
            // Log the error for debugging
            console.error("Error creating notification:", error);

            // Throw a more descriptive error
            throw new Error(`Failed to create notification: ${error.message}`);
        }
    },
    // Function to get all notifications
    async getAllNotifications({ status, type }) {
        try {
            // Define the query options
            const queryOptions = {
                where: {},
            };

            // Add filters if provided
            if (status) {
                queryOptions.where.status = status;
            }
            if (type) {
                queryOptions.where.type = type;
            }

            // Fetch notifications based on the query options
            const notifications = await Notification.findAll(queryOptions);
            const unReadMessage = await Notification.count({
                where: {
                    status: "unread",
                },
            });

            // Return the notifications
            return {
                notifications,
                unReadMessage,
            };
        } catch (error) {
            // Log the error for debugging
            console.error("Error fetching notifications:", error);

            // Throw a more descriptive error
            throw new Error(`Failed to fetch notifications: ${error.message}`);
        }
    },
};

export default NotificationsServices;
