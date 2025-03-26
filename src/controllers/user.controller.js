import userService from "../services/user.service.js";
export const getAllUsers = async (req, res) => {
    try {
        const { page, limit, name, phone, status } = req.query;
        const response = await userService.getAllUsers(page, limit, name, phone, status);
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

export const getOrdersList = async (req, res) => {
    try {
        const { id, page, limit } = req.query;
        const response = await userService.getOrderList(page, limit, id);
        res.status(200).json({
            success: true,
            messsage: `Get order list of user ${id} successfully`,
            data: response,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error eccured during get order list? ${error}`,
        });
    }
};

export const getOrderRecent4Months = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await userService.getOrderRecent4Months(id);
        res.status(200).json({
            success: true,
            message: `Get order recent 4 months of user ${id} successfully`,
            data: response,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error eccured during get 4 months recent orders? ${error}`,
        });
    }
};

export const getTop3Customer = async (req, res) => {
    try {
        const response = await userService.getTop3Customer();
        res.status(200).json({
            success: true,
            message: "Get top 3 customer successfully",
            data: response,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error eccured during get top 3 customer ${error}`,
        });
    }
};

export const getTopCustomerByWeek = async (req, res) => {
    try {
        const response = await userService.getTopCustomerByWeek();
        res.status(200).json({
            success: true,
            message: "Get top customer in week successfully",
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error occured during get top customer in week ${error}`
        })
    }
}

export const getNewCustomerGroupedController = async (req, res) => {
    try {
        const {timeGroup} = req.params
        const response = await userService.getNewUsersGrouped(timeGroup);
        res.status(200).json({
            success: true,
            message: `Get new customer by ${timeGroup} successfully`,
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `An error occured during get new Customer chart ${error}`
        })
    }
}