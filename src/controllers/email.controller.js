import EmailService from "../services/email.service";

export const sendTaxReminderEmail = async (req, res) => {
    try {
        const { id } = req.params;
        await EmailService.sendTaxReminderEmail(id);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email", error: error.message });
    }
};

export const sendTaxReminderEmailToAllShops = async (req, res) => {
    try {
        await EmailService.sendTaxReminderEmailToAllShops();
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email", error: error.message });
    }
};
