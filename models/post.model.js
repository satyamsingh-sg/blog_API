const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    is_active: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    published_date: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: false,
        default: "banner image",
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    num_likes: {
        type: Number,
        default: 0
    },
    num_bookmarks: {
        type: Number,
        default: 0
    },
    num_comments: {
        type: Number,
        default: 0
    },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    cells: {
        type: Array,
        required: false,
        default: [],
    },
});

module.exports = mongoose.model("post", postSchema);
