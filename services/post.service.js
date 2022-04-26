const postRepo = require("../repositories/post.repository");
const userRepo = require("../repositories/user.repository");

const createPost = async (userId, title, summary, genre, banner, cells) => {
    try {
        const user = await userRepo.findUserById(userId);
        const author = user.firstname + " " + user.lastname;
        const published_date = new Date();

        let errors = null;

        if (
            cells !== undefined &&
            cells !== null &&
            typeof cells !== "string"
        ) {
            cells.forEach((cell) => {
                if (!cell.type || !cell.value || !cell.seq_no) {
                    errors = {
                        status: false,
                        message: "Data is invalid",
                        data: {},
                        errors: {
                            message: "The data is not valid",
                        },
                    };
                }
            });
        }
        if (errors) {
            return errors;
        }

        const post = await postRepo.addPost(
            userId,
            author,
            published_date,
            title,
            summary,
            genre,
            banner,
            cells
        );
        await userRepo.addPostIdToUser(userId, post._id);
        return {
            status: true,
            message: "Post created successfully",
            data: post,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const updatePost = async (postId, title, summary, genre, banner, cells) => {
    try {
        let errors = null;

        cells.forEach((cell) => {
            if (!cell.type || !cell.value || !cell.seq_no) {
                errors = {
                    status: false,
                    message: "Data is invalid",
                    data: {},
                    errors: {
                        message: "The data is not valid",
                    },
                };
            }
        });
        if (errors) {
            return errors;
        }
        const response = await postRepo.updatePost(
            postId,
            title,
            summary,
            genre,
            banner,
            cells
        );
        if (response) {
            return {
                status: true,
                message: "Post updated successfully",
                data: response,
                errors: {},
            };
        }
    } catch (error) {
        throw error;
    }
};

const deletePost = async (postId, userId) => {
    try {
        const response = await postRepo.deletePost(postId, userId);
        await userRepo.deletePostIdFromUser(userId, postId);
        return {
            status: true,
            message: "Post deleted successfully",
            data: response,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const getPosts = async (page, limit, filter, order) => {
    try {
        const startIndex = (page - 1) * limit;
        const numberOfPages = await postRepo.findNumberOfPages(limit);
        const posts = await postRepo.findAllPosts(startIndex, limit, filter, order);
        return {
            status: true,
            message: "Fetched all posts successfully",
            data: {
                posts,
                numberOfPages,
            },
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const getPostsByUserId = async (userId) => {
    try {
        const posts = await postRepo.findPostsByUserId(userId);
        return {
            status: true,
            message: "Fetched all posts of this user successfully",
            data: posts,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const getPostByPostId = async (postId) => {
    try {
        const post = await postRepo.findPostByPostId(postId);
        return {
            status: true,
            message: "Fetched the post with its id successfully",
            data: post,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const likeOrDislikeThePost = async (userId, postId) => {
    try {
        const isLiked = await postRepo.postIsLiked(userId, postId);
        let post, message;
        if (isLiked) {
            post = await postRepo.removeLikeFromPost(userId, postId);
            user = await userRepo.removeFromLiked(postId, userId);
            message = "Disliked the post successfully";
        } else {
            post = await postRepo.addLikeToPost(userId, postId);
            user = await userRepo.addToLiked(postId, userId);
            message = "Liked the post successfully";
        }
        return {
            status: true,
            message: message,
            data: post,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPosts,
    getPostsByUserId,
    getPostByPostId,
    likeOrDislikeThePost,
};
