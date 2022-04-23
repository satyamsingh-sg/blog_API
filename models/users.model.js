const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: false,
            default: "",
        },
        lastname: {
            type: String,
            required: false,
            default: "",
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            required: false,
            default: "",
        },
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
        genres: {
            type: Array,
            default: [],
        },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
        questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "question" }],
        recents: [{ type: mongoose.Schema.Types.ObjectId, ref: "activity" }],
        liked: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
        saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "activity" }],
        is_active: {
            type: Boolean,
            default: true,
        },
    },
    {
        toJSON: { virtuals: true },
    }
);

userSchema.virtual("forPosts", {
    ref: "post",
    localField: "liked",
    foreignField: "_id",
    justOne: true,
});

userSchema.virtual("forQuestions", {
    ref: "question",
    localField: "liked",
    foreignField: "_id",
    justOne: true,
});

module.exports = mongoose.model("user", userSchema);
