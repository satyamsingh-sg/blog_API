const userRepo = require("../../repositories/user.repository");
const User = require("../../models/users.model");
const adminRepo = require("../../repositories/admin.repository");

const getAllUsers = async (limit, startIndex) => {
    try {
        const users = await User.find()
            .populate("posts")
            .populate("questions")
            .limit(limit)
            .skip(startIndex);
        const numOfPages = Math.ceil((await User.find()).length / limit);
        return {
            status: true,
            message: "Fetched all users successfully",
            data: { users, numOfPages },
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        const user = await adminRepo.deleteUser(userId);
        return {
            status: true,
            message: "User Disabled Successfully",
            data: user,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllUsers,
    deleteUser,
};
