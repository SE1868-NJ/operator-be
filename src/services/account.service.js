import { Operator } from "../models/operator.model.js";

const OperatorService = {
    async getAccountProfile(email) {
        try {
            const user = await Operator.findOne({ where: { email } });
            if (!user) {
                throw new Error("No user found: ", email);
            }
            return { success: true, data: user };
        } catch (error) {
            console.error("An error occur during get ban user:", error);
            throw new Error(`Failed to get  account profile: ${error.message}`);
        }
    },
    async updateAccountProfile({
        operatorID,
        firstName,
        lastName,
        gender,
        email,
        phoneNumber,
        dateOfBirth,
        status,
        avatar,
    }) {
        try {
            const userUpdated = await Operator.update(
                { firstName, lastName, gender, email, phoneNumber, dateOfBirth, status, avatar },
                { where: { operatorID } },
            );

            return { success: true, data: `Kết quả cập nhật: " ${userUpdated}` };
        } catch (error) {
            console.log("An error occur during update account profile", error);
            throw new Error(`Failed to update account profile: ${error.message}`);
        }
    },
};

export default OperatorService;
