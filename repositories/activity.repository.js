const Activity = require("../models/activity.model");

const getSavedContent = async (userId, startIndex, limit) => {
    return await Activity.find({ userId, type: "saved" })
        .populate("forPosts")
        .populate("forQuestions")
        .sort({ activity_time: -1 })
        .limit(limit)
        .skip(startIndex)
        .exec();
};

const getSavedContentByContentId = async (userId, contentId) => {
    return await Activity.find({ userId, type: "saved", contentId })
        .populate("forPosts")
        .populate("forQuestions")
        .sort({ activity_time: -1 })
        .exec();
};

const getRecentActivity = async (userId) => {
    return await Activity.find({ userId, type: "recents" })
        .sort({ activity_time: -1 })
        .limit(10);
};

const getActivityIdByContentId = async (userId, contentId) => {
    return (await Activity.findOne({ userId, contentId }))._id;
};

const addToSavedContent = async (contentType, contentId, userId, timestamp) => {
    const content = new Activity({
        type: "saved",
        contentId,
        userId,
        activity_time: timestamp,
    });
    return await content.save();
};
const removeFromSavedContent = async (contentType, contentId, userId) => {
    return await Activity.deleteOne({ userId, contentId, type: "saved" });
};
const addToRecentActivity = async (
    contentType,
    contentId,
    userId,
    timestamp
) => {
    const content = new Activity({
        type: "recents",
        contentId,
        userId,
        activity_time: timestamp,
    });
    return await content.save();
};

module.exports = {
    getSavedContent,
    getRecentActivity,
    getActivityIdByContentId,
    addToSavedContent,
    removeFromSavedContent,
    addToRecentActivity,
    getSavedContentByContentId,
};
