const express = require("express");
const router = express.Router();

const questionController = require("../../../controllers/admin/question.controller");
const adminMiddleware = require("../../../middlewares/admin.middleware");

router.get(
    "/get_questions",
    adminMiddleware,
    questionController.getAllQuestions
);

router.delete(
    "delete_question",
    adminMiddleware,
    questionController.deleteQuestionById
);

module.exports = router;
