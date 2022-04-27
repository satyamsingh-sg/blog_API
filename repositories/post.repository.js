const Post = require("../models/post.model");
const User = require("../models/users.model");

const client = require("../config/redis.connection")

const addPost = async (
    userId,
    author,
    published_date,
    title,
    summary,
    genre,
    banner,
    cells
) => {
    const postObject = new Post({
        userId,
        author,
        published_date,
        title,
        summary,
        genre,
        banner,
        cells,
    });
    return await postObject.save();
};

const updatePost = async (postId, title, summary, genre, banner, cells) => {
    return await Post.updateOne(
        { _id: postId },
        {
            $set: {
                title,
                summary,
                genre,
                banner,
                cells,
            },
        }
    );
};

const deletePost = async (postId, userId) => {
    await Post.updateOne(
        { _id: postId },
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
                posts: postId,
            },
        }
    );
};

const findAllPosts = async (startIndex, limit, filter, order) => {
    const sort = {}
    sort[filter] = parseInt(order)
    const cacheString = `posts_page@${startIndex}_limit@${limit}`
    const cachedPosts = await client.get(cacheString, (err, data) => {
        if (err) {
            console.log(err)
            throw err
        }
        return data
    })
    if (cachedPosts !== null) {
        return JSON.parse(cachedPosts)
    } else {
        const response = await Post.find().sort(sort).limit(limit).skip(startIndex).exec();
        await client.setEx(cacheString, 20, JSON.stringify(response))
        return response
    }
};

const findPostByPostId = async (postId) => {
    return await Post.findOne({ _id: postId });
};

const findPostsByUserId = async (userId) => {
    return await Post.find({ userId });
};

const addCommentToPost = async (postId, commentId) => {
    return await Post.updateOne(
        { _id: postId },
        {
            $addToSet: {
                comments: commentId,
            },
            $inc: {
                num_comments: 1
            }
        }
    );
};

const deleteCommentInPost = async (postId, commentId) => {
    return await Post.updateOne(
        { _id: postId },
        {
            $pull: {
                comments: commentId,
            },
            $inc: {
                num_comments: -1
            }
        }
    );
};

const addLikeToPost = async (userId, postId) => {
    return await Post.updateOne(
        { _id: postId },
        {
            $addToSet: {
                likes: userId,
            },
            $inc: {
                num_likes: 1
            }
        }
    );
};

const removeLikeFromPost = async (userId, postId) => {
    return await Post.updateOne(
        { _id: postId },
        {
            $pull: {
                likes: userId,
            },
            $inc: {
                num_likes: -1
            }
        }
    );
};

const postIsLiked = async (userId, postId) => {
    return (await Post.find({ _id: postId, likes: userId }).count()) > 0;
};

const findNumberOfPages = async (limit) => {
    return Math.ceil((await Post.find()).length / limit);
};

const isPostId = async (postId) => {
    return (await Post.find({ _id: postId }).count()) > 0;
};

const addToSaved = async (contentId, userId) => {
    return Post.updateOne(
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
    return Post.updateOne(
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
    addPost,
    updatePost,
    deletePost,
    findAllPosts,
    findPostByPostId,
    findPostsByUserId,
    addCommentToPost,
    deleteCommentInPost,
    addLikeToPost,
    removeLikeFromPost,
    postIsLiked,
    findNumberOfPages,
    isPostId,
    addToSaved,
    removeFromSaved,
};
