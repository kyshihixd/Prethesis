const mongoose = require('mongoose');
const genres = [];

const commentSchema = new mongoose.Schema({
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
    },
    upvote: {
        type: Number,
        default: 0,
    },
    downvote: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
});

module.exports = mongoose.model('Comment', commentSchema);