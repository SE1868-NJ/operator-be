import { v2 as cloudinary } from "cloudinary";
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
    async updateAccountProfile(
        { operatorID, firstName, lastName, gender, email, phoneNumber, dateOfBirth, status },
        fileData,
    ) {
        try {
            const oldData = await Operator.findByPk(operatorID, { raw: true });
            console.log("oldData: ", oldData);
            console.log("fileData", fileData);

            const userUpdated = await Operator.update(
                {
                    firstName,
                    lastName,
                    gender,
                    email,
                    phoneNumber,
                    dateOfBirth,
                    status,
                    avatar: fileData?.path,
                    avatar_public_id: fileData?.filename,
                },
                { where: { operatorID } },
            );

            console.log(oldData?.avatar_public_id);

            if (oldData?.avatar_public_id !== "swp_storage_image/default_avatar_zqgyov") {
                const oldFileName = `${oldData?.avatar_public_id}`;
                //console.log("Old file name: ", oldFileName);
                await cloudinary.uploader.destroy(oldFileName);
            }

            return { success: true, data: `Kết quả cập nhật: " ${userUpdated}` };
        } catch (error) {
            await cloudinary.uploader.destroy(fileData.filename);
            console.log("An error occur during update account profile", error);
            throw new Error(`Failed to update account profile: ${error.message}`);
        }
    },
};

export default OperatorService;
