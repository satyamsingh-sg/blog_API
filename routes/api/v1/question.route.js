const express = require("express");

const router = express.Router();

const authMiddleware = require("../../../middlewares/auth.middleware");

const questionController = require("../../../controllers/v1/question.controller");
const upload = require("../../../middlewares/multer.middleware");
const {
    uploadToCloudinary,
} = require("../../../middlewares/question.middeware");

router.get("/get_all_questions", questionController.getQuestions);

router.get(
    "/get_questions",
    authMiddleware,
    questionController.getQuestionsByUserId
);

router.get(
    "/get_questions_by_userId/:userId",
    questionController.getQuestionsByOtherUserId
);

router.get(
    "/get_question/:questionId",
    questionController.getQuestionByQuestionId
);

router.post(
    "/create_question",
    [authMiddleware, upload.single("screenshot"), uploadToCloudinary],
    questionController.createQuestion
);

router.post(
    "/update_question",
    authMiddleware,
    questionController.updateQuestion
);

router.delete(
    "/delete_question",
    authMiddleware,
    questionController.deleteQuestion
);

router.post(
    "/up_vote_question",
    authMiddleware,
    questionController.upVoteAQuestion
);

router.post(
    "/down_vote_question",
    authMiddleware,
    questionController.downVoteAQuestion
);

module.exports = router;
