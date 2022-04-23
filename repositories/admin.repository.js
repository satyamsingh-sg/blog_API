const Admin = require("../models/admin.model");
const User = require("../models/users.model");

const findAdminByEmail = async (email) => {
    return await Admin.findOne({ email });
};

const findAdminById = async (id) => {
    return await Admin.findOne({ _id: id });
};

const addAdmin = async (firstname, lastname, email, password) => {
    try {
        const admin = new Admin({
            firstname,
            lastname,
            email,
            password,
        });
        return admin.save();
    } catch (error) {
        return error.message;
    }
};

const deleteUser = async (id) => {
    return await User.updateOne(
        { _id: id },
        {
            $set: {
                is_active: false,
            },
        }
    );
};

module.exports = {
    findAdminByEmail,
    findAdminById,
    addAdmin,
    deleteUser,
};
