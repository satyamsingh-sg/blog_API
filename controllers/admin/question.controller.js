const Question = require("../../models/question.model");

const getAllQuestions = async (req, res) => {
    try {
        const page = req.query.page
        const limit = req.query.limit
        if (!page || !limit) {
            return res.status(422).json({
                status: false,
                message: "Missing query parameters",
                data: {},
                errors: { page, limit },
            })
        }
        const startIndex = (page - 1) * limit
        const questions = await Question.find().limit(limit).skip(startIndex);
        return res.status(200).json({
            status: true,
            message: "Questions fetched successfully",
            data: questions,
            errors: {},
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            errors: error.message,
        });
    }
};
const deleteQuestionById = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        if (!questionId) {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
        const response = await Question.updateOne(
            { _id: questionId },
            {
                $set: {
                    is_active: false,
                },
            }
        );
        return res.status(200).json({
            status: true,
            message: "Disabled question successfully",
            data: response,
            errors: {},
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            errors: error.message,
        });
    }
};

module.exports = {
    getAllQuestions,
    deleteQuestionById,
};
