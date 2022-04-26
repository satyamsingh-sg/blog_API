const Post = require("../../models/post.model");

const getAllPosts = async (req, res) => {
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
        const posts = await Post.find().limit(limit).skip(startIndex);
        return res.status(200).json({
            status: true,
            message: "Posts fetched successfully",
            data: posts,
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
const deletePostById = async (req, res) => {
    try {
        const postId = req.params.postId;
        if (!postId) {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
        const response = await Post.updateOne(
            { _id: postId },
            {
                $set: {
                    is_active: false,
                },
            }
        );
        return res.status(200).json({
            status: true,
            message: "Disabled post successfully",
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
    getAllPosts,
    deletePostById,
};
