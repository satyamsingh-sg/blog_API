const express = require("express");

const authMiddleware = require("../../../middlewares/auth.middleware");

const answerController = require("../../../controllers/v1/answer.controller");

const router = express.Router();

router.get("/get_answers/:questionId", answerController.getAnswersOfQuestion);
router.post("/add_answer", authMiddleware, answerController.addAnswer);
router.put("/edit_answer", authMiddleware, answerController.editAnswer);
router.delete("/delete_answer", authMiddleware, answerController.deleteAnswer);
router.put("/up_vote_answer", authMiddleware, answerController.addVoteToAnswer);
router.put(
    "/down_vote_answer",
    authMiddleware,
    answerController.removeVoteToAnswer
);
router.put(
    "/mark_as_correct",
    authMiddleware,
    answerController.markAnswerAsCorrect
);
router.put(
    "/mark_as_wrong",
    authMiddleware,
    answerController.markAnswerAsWrong
);

module.exports = router;
