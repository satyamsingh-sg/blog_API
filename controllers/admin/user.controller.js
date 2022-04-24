const userService = require("../../services/admin/user.service");
const User = require("../../models/users.model");

const getAllUsers = async (req, res) => {
    try {
        const response = await userService.getAllUsers();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server error",
            data: {},
            errors: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const body = req.params;
        if (body.userId !== undefined) {
            const response = await userService.deleteUser(body.userId);
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(422).json({
            status: false,
            message: "Internal Server Error",
            data: {},
            errors: error.message,
        });
    }
};

module.exports = {
    getAllUsers,
    deleteUser,
};
