const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
    }],
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    head:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    upvote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    downvote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }]
});


module.exports = mongoose.model("Review", reviewSchema);