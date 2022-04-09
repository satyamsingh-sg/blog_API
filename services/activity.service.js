const activityRepo = require("../repositories/activity.repository");
const userRepo = require("../repositories/user.repository");
const postRepo = require("../repositories/post.repository");
const questionRepo = require("../repositories/question.repository");

const getSavedContent = async (userId, page, limit) => {
    try {
        const startIndex = (page - 1) * limit;
        const savedActivity = await activityRepo.getSavedContent(
            userId,
            startIndex,
            limit
        );
        const saved = [];
        const numberOfPages = await activityRepo.findNumberOfSavedPages(limit);

        for (const i in savedActivity) {
            const activity = savedActivity[i];
            if (await postRepo.isPostId(activity.contentId)) {
                const post = await postRepo.findPostByPostId(
                    activity.contentId
                );
                saved.push(post);
            }
            if (await questionRepo.isQuestionId(activity.contentId)) {
                const question = await questionRepo.findQuestionByQuestionId(
                    activity.contentId
                );
            }
        }

        return {
            status: true,
            message: "Saved content fetched successfully",
            data: {
                saved,
                numberOfPages,
            },
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const getSavedContentByContentId = async (userId, contentId) => {
    try {
        const savedData = await activityRepo.getSavedContentByContentId(
            userId,
            contentId
        );
        return {
            status: true,
            message: "Got the saved content successfully",
            data: savedData,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const getRecentActivity = async (userId) => {
    try {
        let content = await activityRepo.getRecentActivity(userId);

        console.log(content);
        for (let i in content) {
            if (await postRepo.isPostId(content[i].contentId)) {
                const post = await postRepo.findPostByPostId(
                    content[i].contentId
                );
                content[i].content = {
                    ...content[i]._doc,
                    content: post,
                    content: question,
                    type: "post",
                };
            }
            console.log(await questionRepo.isQuestionId(content[i].contentId));
            if (await questionRepo.isQuestionId(content[i].contentId)) {
                const question = await questionRepo.findQuestionByQuestionId(
                    content[i].contentId
                );
                content[i] = {
                    ...content[i]._doc,
                    content: question,
                    type: "question",
                };
            }
        }

        return {
            status: true,
            message: "Recent activity fetched successfully",
            data: content,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const addToSavedContent = async (contentType, contentId, userId) => {
    try {
        const timestamp = new Date();
        if ((contentType !== "post") & (contentType !== "question")) {
            return {
                status: false,
                message: "Invalid content type provided",
                data: {},
                errors: {},
            };
        }
        const activity = await activityRepo.addToSavedContent(
            contentType,
            contentId,
            userId,
            timestamp
        );
        await userRepo.addToSaved(activity._id, userId);
        contentType === "post"
            ? await postRepo.addToSaved(contentId, userId)
            : await questionRepo.addToSaved(contentId, userId);
        return {
            status: true,
            message: "Added to saved content successfully",
            data: activity,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const removeFromSavedContent = async (contentType, contentId, userId) => {
    try {
        if ((contentType !== "post") & (contentType !== "question")) {
            return {
                status: false,
                message: "Invalid content type provided",
                data: {},
                errors: {},
            };
        }
        const activityId = await activityRepo.getActivityIdByContentId(
            userId,
            contentId
        );
        const content = await activityRepo.removeFromSavedContent(
            contentType,
            contentId,
            userId
        );
        await userRepo.removeFromSaved(activityId, userId);
        contentType === "post"
            ? await postRepo.removeFromSaved(contentId, userId)
            : await questionRepo.removeFromSaved(contentId, userId);
        return {
            status: true,
            message: "Removed from saved content successfully",
            data: content,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const addToRecentActivity = async (contentType, contentId, userId) => {
    try {
        const timestamp = new Date();
        if ((contentType !== "post") & (contentType !== "question")) {
            return {
                status: false,
                message: "Invalid content type provided",
                data: {},
                errors: {},
            };
        }
        const isRecent = await activityRepo.getActivityIdByContentId(
            userId,
            contentId
        );
        console.log(isRecent);
        if (isRecent) {
            return {
                status: true,
                message: "Already present in activity",
                data: isRecent,
                errors: {},
            };
        }
        const content = await activityRepo.addToRecentActivity(
            contentType,
            contentId,
            userId,
            timestamp
        );
        await userRepo.addToRecents(content._id, userId);
        return {
            status: true,
            message: "Added to recent activity successfully",
            data: content,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getSavedContent,
    getRecentActivity,
    addToSavedContent,
    removeFromSavedContent,
    addToRecentActivity,
    getSavedContentByContentId,
};
