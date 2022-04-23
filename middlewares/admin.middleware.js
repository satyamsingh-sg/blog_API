const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    let token = req.header("authorization");

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "No token, authentication denied",
            data: {},
            errors: {},
        });
    }

    try {
        if (token.includes("Bearer")) {
            token = token.split(" ").pop();
        }
        const decodedToken = jwt.verify(token, process.env.jwtSecret);
        req.admin = decodedToken.admin;
        next();
    } catch (err) {
        res.status(401).json({
            status: false,
            message: "Token in invalid",
            data: token,
            errors: err.message,
        });
    }
};
