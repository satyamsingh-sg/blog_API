const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    res.status(200).send({ message: "API is doing great 🐢." });
});

const userRoute = require("./user.route");
router.use("/user", userRoute);

const questionRoute = require("./question.route");
router.use("/question", questionRoute);

module.exports = router;