const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
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
});

module.exports = mongoose.model("admin", adminSchema);
