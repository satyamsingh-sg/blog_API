const activityRepo = require("../repositories/activity.repository");
const userRepo = require("../repositories/user.repository");
const postRepo = require("../repositories/post.repository");
const questionRepo = require("../repositories/question.repository");

const getLikedContent = async (userId) => {
    try {
        const content = await activityRepo.getLikedContent(userId);
        return {
            status: true,
            message: "Liked content fetched successfully",
            data: content,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const getSavedContent = async (userId, page, limit) => {
    try {
        const startIndex = (page - 1) * limit;
        const savedActivity = await activityRepo.getSavedContent(
            userId,
            startIndex,
            limit
        );
        const saved = [];

        savedActivity.forEach(async (activity) => {
            if (await postRepo.isPostId(activity.contentId)) {
                const post = postRepo.findPostByPostId(activity.contentId);
                saved.push(post);
            }
            if (await questionRepo.isQuestionId(activity.contentId)) {
                const question = questionRepo.findQuestionByQuestionId(
                    activity.contentId
                );
                saved.push(question);
            }
        });

        return {
            status: true,
            message: "Saved content fetched successfully",
            data: saved,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const getRecentActivity = async (userId) => {
    try {
        const content = await activityRepo.getRecentActivity(userId);
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

const addToLikedContent = async (contentType, contentId, userId) => {
    try {
        const timestamp = new Date();
        if (contentType !== "post" && contentType !== "question") {
            return {
                status: false,
                message: "Invalid content type provided",
                data: contentType,
                errors: {},
            };
        }
        
        const activity = await activityRepo.addToLikedContent(
            contentType,
            contentId,
            userId,
            timestamp
        );
        await userRepo.addToLiked(activity._id, userId);
        contentType === "post"
            ? await postRepo.addLikeToPost(userId, contentId)
            : await questionRepo.upVoteAQuestion(contentId, userId);
        return {
            status: true,
            message: "Added to liked content successfully",
            data: activity,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const removeFromLikedContent = async (contentType, contentId, userId) => {
    try {
        if (contentType !== "post" || contentType !== "question") {
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
        const content = await activityRepo.removeFromLikedContent(
            contentType,
            contentId,
            userId
        );
        await userRepo.removeFromLiked(activityId);
        return {
            status: true,
            message: "Removed from liked content successfully",
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
        if (contentType !== "post" || contentType !== "question") {
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
        await userRepo.addToSaved(activity._id);
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
        if (contentType !== "post" || contentType !== "question") {
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
        await userRepo.removeFromSaved(activityId);
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
        if (contentType !== "post" || contentType !== "question") {
            return {
                status: false,
                message: "Invalid content type provided",
                data: {},
                errors: {},
            };
        }
        const content = await activityRepo.addToRecentActivity(
            contentType,
            contentId,
            userId,
            timestamp
        );
        await userRepo.addToRecents(content._id);
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
    getLikedContent,
    getSavedContent,
    getRecentActivity,
    addToLikedContent,
    removeFromLikedContent,
    addToSavedContent,
    removeFromSavedContent,
    addToRecentActivity,
};
