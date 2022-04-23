const express = require("express");
const router = express.Router();

const userRoute = require("./api/v1/user.route");
const authRoute = require("./api/v1/auth.route");
const postRoute = require("./api/v1/post.route");
const questionRoute = require("./api/v1/question.route");
const commentRoute = require("./api/v1/comment.route");
const answerRoute = require("./api/v1/answer.route");
const activityRoute = require("./api/v1/activity.route");

const adminRouter = require("./api/admin/router");

router.get("/", function (req, res) {
    res.status(200).send({ message: "API is doing great 🐢." });
});

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/post", postRoute);
router.use("/question", questionRoute);
router.use("/comment", commentRoute);
router.use("/answer", answerRoute);
router.use("/activity", activityRoute);

router.use("/admin", adminRouter);

module.exports = router;
