const activityService = require("../../services/activity.service");

const getSavedContent = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = req.query.limit;
        if (
            req.user.id !== undefined &&
            page !== undefined &&
            page !== null &&
            limit !== undefined &&
            limit !== null
        ) {
            const response = await activityService.getSavedContent(
                req.user.id,
                page,
                limit
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing paramters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            message: error.message,
        });
    }
};

const getSavedContentByContentId = async (req, res) => {
    try {
        const contentId = req.params.contentId;
        if (req.user.id !== undefined && contentId !== undefined) {
            const response = await activityService.getSavedContentByContentId(
                req.user.id,
                contentId
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing paramters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            message: error.message,
        });
    }
};

const getRecentActivity = async (req, res) => {
    try {
        const body = req.body;
        if (req.user.id !== undefined) {
            const response = await activityService.getRecentActivity(
                req.user.id
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing paramters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            message: error.message,
        });
    }
};

const addToSavedContent = async (req, res) => {
    try {
        const body = req.body;
        if (
            req.user.id !== undefined &&
            body.contentType !== undefined &&
            body.contentId !== undefined
        ) {
            const response = await activityService.addToSavedContent(
                body.contentType,
                body.contentId,
                req.user.id
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing paramters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            message: error.message,
        });
    }
};

const removeFromSavedContent = async (req, res) => {
    try {
        const body = req.body;
        if (
            req.user.id !== undefined &&
            body.contentType !== undefined &&
            body.contentId !== undefined
        ) {
            const response = await activityService.removeFromSavedContent(
                body.contentType,
                body.contentId,
                req.user.id
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing paramters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            message: error.message,
        });
    }
};

const addToRecentActivity = async (req, res) => {
    try {
        const body = req.body;
        if (
            req.user.id !== undefined &&
            body.contentType !== undefined &&
            body.contentId !== undefined
        ) {
            const response = await activityService.addToRecentActivity(
                body.contentType,
                body.contentId,
                req.user.id
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing paramters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            message: error.message,
        });
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
