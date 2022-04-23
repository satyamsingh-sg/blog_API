const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createJWT = (user) => {
    try {
        const payload = {
            user: {
                id: user._id,
            },
        };

        return jwt.sign(payload, process.env.jwtSecret, {
            expiresIn: 36000000,
        });
    } catch (error) {
        throw error;
    }
};

const createAdminJWT = (admin) => {
    try {
        const payload = {
            admin: {
                id: admin._id,
            },
        };

        return jwt.sign(payload, process.env.jwtSecret, {
            expiresIn: 36000000,
        });
    } catch (error) {
        throw error;
    }
};

const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const encPwd = await bcrypt.hash(password, salt);
        return encPwd;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createJWT,
    createAdminJWT,
    encryptPassword,
};
