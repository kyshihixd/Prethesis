const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    gmail: {
        type: String,
    },
    name: {
        type: String,
    },
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    }],
});

const Usertest = mongoose.model("User", userSchema);
module.exports = Usertest;