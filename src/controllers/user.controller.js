import userService from "../services/user.service.js";
export const getAllUsers = async (req, res) => {
    try {
        const { page, limit } = req.query;
        console.log(page);
        console.log(limit);
        const response = await userService.getAllUsers(page, limit);
        res.status(200).json({
            sucess: true,
            message: "Get all users successfully",
            data: response,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error occured during getting all users! ${error}.`,
        });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const response = await userService.getUserById(id);
        res.status(200).json({
            success: true,
            message: response === false ? "Get user failed" : "Get user successfully",
            data: response === false ? "User not found" : response,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error occured during getting user! ${error}.`,
        });
    }
};

export const updateUserStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const response = await userService.updateUserStatus(id, status);
        res.status(200).json({
            success: true,
            message:
                response === false
                    ? "user's status update failed"
                    : "Update user'status sucessfully",
            data: response === false ? "User not found" : response,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error eccured during update user's status? ${error}`,
        });
    }
};
