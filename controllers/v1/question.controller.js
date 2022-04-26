const questionService = require("../../services/question.service");

const createQuestion = async (req, res) => {
    try {
        const body = req.body;
        if (
            req.user.id !== undefined &&
            body.title !== undefined &&
            body.summary !== undefined &&
            body.genre !== undefined
        ) {
            const response = await questionService.createQuestion(
                req.user.id,
                body.title,
                body.summary,
                body.genre,
                body.screenshot
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            errors: error.message,
        });
    }
};

const updateQuestion = async (req, res) => {
    try {
        const body = req.body;
        if (
            body.questionId !== undefined &&
            body.title !== undefined &&
            body.summary !== undefined &&
            body.genre !== undefined
        ) {
            const response = await questionService.updateQuestion(
                body.questionId,
                body.title,
                body.summary,
                body.genre,
                body.screenshot
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            errors: error.message,
        });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const body = req.body;
        if (body.questionId !== undefined && req.user.id !== undefined) {
            const response = await questionService.deleteQuestion(
                body.questionId,
                req.user.id
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            errors: error.message,
        });
    }
};

const getQuestions = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = req.query.limit;
        let filter = req.query.filter;
        let order = req.query.order;
        if (!filter) {
            filter = "published_date"
        }
        if (!order) {
            order = -1
        }
        if (
            page !== undefined &&
            limit !== undefined &&
            page !== null &&
            limit !== null
        ) {
            const response = await questionService.getQuestions(page, limit, filter, order);
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Query parameters are required",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            errors: error.message,
        });
    }
};

const getQuestionsByUserId = async (req, res) => {
    try {
        const body = req.body;
        if (req.user.id !== undefined) {
            const response = await questionService.getQuestionsByUserId(
                req.user.id
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server error",
            data: {},
            errors: {},
        });
    }
};

const getQuestionsByOtherUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (userId !== undefined) {
            const response = await questionService.getQuestionsByUserId(userId);
            res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server error",
            data: {},
            errors: error.message,
        });
    }
};

const getQuestionByQuestionId = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        if (questionId !== undefined) {
            const response = await questionService.getQuestionByQuestionId(
                questionId
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server error",
            data: {},
            errors: {},
        });
    }
};

const upVoteAQuestion = async (req, res) => {
    try {
        const body = req.body;
        if (body.questionId !== undefined && req.user.id !== undefined) {
            const response = await questionService.upVoteAQuestion(
                body.questionId,
                req.user.id
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        throw error;
    }
};

const downVoteAQuestion = async (req, res) => {
    try {
        const body = req.body;
        if (body.questionId !== undefined && req.user.id !== undefined) {
            const response = await questionService.downVoteAQuestion(
                body.questionId,
                req.user.id
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestions,
    getQuestionsByUserId,
    getQuestionByQuestionId,
    upVoteAQuestion,
    downVoteAQuestion,
    getQuestionsByOtherUserId,
};
