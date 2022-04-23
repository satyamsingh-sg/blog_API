const adminRepo = require("../../repositories/admin.repository");
const bcrypt = require("bcrypt");
const { encryptPassword, createAdminJWT } = require("../../utils/common");

const login = async (email, password) => {
    try {
        const admin = await adminRepo.findAdminByEmail(email);
        if (!admin) {
            return {
                status: false,
                message: "Admin does not exists!",
                data: {},
                errors: admin,
            };
        }
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return {
                status: false,
                message: "Invalid credentials!",
                data: {},
                errors: passwordMatch,
            };
        }

        const token = createAdminJWT(admin);
        return {
            status: true,
            message: "Logged In successfully",
            data: token,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const register = async (firstname, lastname, email, password) => {
    try {
        const admin = await adminRepo.findAdminByEmail(email);

        if (admin) {
            return {
                status: false,
                message: "Admin already exists",
                data: {},
                errors: {},
            };
        }

        const encryptedPassword = await encryptPassword(password);
        const newAdmin = await adminRepo.addAdmin(
            firstname,
            lastname,
            email,
            encryptedPassword
        );
        const token = createAdminJWT(newAdmin);
        return {
            status: true,
            message: "Registered admin successfully",
            data: token,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    login,
    register,
};
