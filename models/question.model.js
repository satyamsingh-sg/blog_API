const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
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
    screenshot: {
        type: String,
        required: false,
        default: "Screen shot image",
    },
    up_votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    num_votes: {
        type: Number,
        default: 0
    },
    num_bookmarks: {
        type: Number,
        default: 0
    },
    num_answers: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "answer" }],
});

module.exports = mongoose.model("question", questionSchema);
