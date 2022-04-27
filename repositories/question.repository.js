const client = require("../config/redis.connection");
const Question = require("../models/question.model");
const User = require("../models/users.model");

const addQuestion = async (
    userId,
    author,
    published_date,
    title,
    summary,
    genre,
    screenshot
) => {
    const questionObject = new Question({
        userId,
        author,
        published_date,
        title,
        summary,
        genre,
        screenshot,
    });
    return await questionObject.save();
};

const updateQuestion = async (
    questionId,
    title,
    summary,
    genre,
    screenshot
) => {
    return await Question.updateOne(
        { _id: questionId },
        {
            $set: {
                title,
                summary,
                genre,
                screenshot,
            },
        }
    );
};

const deleteQuestion = async (questionId, userId) => {
    await Question.updateOne(
        { _id: questionId },
        {
            $set: {
                is_active: false,
            },
        }
    );
    return await User.updateOne(
        { _id: userId },
        {
            $pull: {
                questions: questionId,
            },
        }
    );
};

const upVoteAQuestion = async (questionId, userId) => {
    return await Question.updateOne(
        { _id: questionId },
        {
            $addToSet: {
                up_votes: userId,
            },
            $inc: {
                num_votes: 1
            }
        }
    );
};

const downVoteAQuestion = async (questionId, userId) => {
    return await Question.updateOne(
        { _id: questionId },
        {
            $pull: {
                up_votes: userId,
            },
            $inc: {
                num_votes: -1
            }
        }
    );
};

const findAllQuestions = async (startIndex, limit, filter, order) => {
    const sort = {}
    sort[filter] = parseInt(order)
    const cacheString = `questions_page@${startIndex}_limit@${limit}`
    const cachedQuestions = await client.get(cacheString, (err, data) => {
        if (err) {
            console.log(err)
            throw err
        }
        return data
    })
    if (cachedQuestions !== null) {
        return JSON.parse(cachedQuestions)
    } else {
        const response = await Question.find().sort(sort).limit(limit).skip(startIndex).exec();
        await client.setEx(cacheString, 20, JSON.stringify(response))
        return response
    }
};

const findQuestionByQuestionId = async (questionId) => {
    return await Question.findOne({ _id: questionId });
};

const findQuestionsByUserId = async (userId) => {
    return await Question.find({ userId });
};

const addAnswerToQuestion = async (questionId, answerId) => {
    return await Question.updateOne(
        { _id: questionId },
        {
            $addToSet: {
                answers: answerId,
            },
            $inc: {
                num_answers: 1
            }
        }
    );
};
const removeAnswerToQuestion = async (questionId, answerId) => {
    return await Question.updateOne(
        { _id: questionId },
        {
            $pull: {
                answers: answerId,
            },
            $inc: {
                num_answers: -1
            }
        }
    );
};

const findNumberOfPages = async (limit) => {
    return Math.ceil((await Question.find()).length / limit);
};

const isQuestionId = async (questionId) => {
    return (await Question.find({ _id: questionId }).count()) > 0;
};

const addToSaved = async (contentId, userId) => {
    return Question.updateOne(
        { _id: contentId },
        {
            $addToSet: {
                bookmarks: userId,
            },
            $inc: {
                num_bookmarks: 1
            }
        }
    );
};

const removeFromSaved = async (contentId, userId) => {
    return Question.updateOne(
        { _id: contentId },
        {
            $pull: {
                bookmarks: userId,
            },
            $inc: {
                num_bookmarks: -1
            }
        }
    );
};

module.exports = {
    addQuestion,
    updateQuestion,
    deleteQuestion,
    findAllQuestions,
    findQuestionByQuestionId,
    findQuestionsByUserId,
    upVoteAQuestion,
    downVoteAQuestion,
    addAnswerToQuestion,
    removeAnswerToQuestion,
    findNumberOfPages,
    isQuestionId,
    addToSaved,
    removeFromSaved,
};
