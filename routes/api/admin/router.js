const express = require("express");

const router = express.Router();

const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const postRoute = require("./post.route");
const questionRoute = require("./question.route");

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/post", postRoute);
router.use("/question", questionRoute);

module.exports = router;
