const postService = require("../../services/post.service");

const createPost = async (req, res) => {
    try {
        const body = req.body;
        if (
            body.title !== undefined &&
            body.summary !== undefined &&
            body.genre !== undefined
        ) {
            const response = await postService.createPost(
                req.user.id,
                body.title,
                body.summary,
                body.genre,
                body.banner,
                body.cells
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

const updatePost = async (req, res) => {
    try {
        const body = req.body;
        if (
            body.postId !== undefined &&
            body.title !== undefined &&
            body.summary !== undefined &&
            body.genre !== undefined
        ) {
            const response = await postService.updatePost(
                body.postId,
                body.title,
                body.summary,
                body.genre,
                body.banner,
                body.cells
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

const deletePost = async (req, res) => {
    try {
        const body = req.body;
        if (body.postId !== undefined && req.user.id) {
            const response = await postService.deletePost(
                body.postId,
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

const getPosts = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = req.query.limit;
        if (
            page !== undefined &&
            page !== null &&
            limit !== undefined &&
            limit !== null
        ) {
            const response = await postService.getPosts(page, limit);
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing query parameters for this route",
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

const getPostsByUserId = async (req, res) => {
    try {
        const body = req.body;
        if (req.user.id !== undefined) {
            const response = await postService.getPostsByUserId(req.user.id);
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

const getPostsByOtherUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (userId !== undefined) {
            const response = await postService.getPostsByUserId(userId);
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

const getPostByPostId = async (req, res) => {
    try {
        const postId = req.params.postId;
        if (postId !== undefined) {
            const response = await postService.getPostByPostId(postId);
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

const likeOrDislikeThePost = async (req, res) => {
    try {
        const body = req.body;
        const userId = req.user.id;
        if (
            body.postId !== undefined &&
            userId !== undefined &&
            userId !== null
        ) {
            const response = await postService.likeOrDislikeThePost(
                userId,
                body.postId
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
            errors: error.message,
        });
    }
};

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPosts,
    getPostsByUserId,
    getPostByPostId,
    getPostsByOtherUserId,
    likeOrDislikeThePost,
};
