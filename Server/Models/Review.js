const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
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
        max: 10,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model('Book', reviewSchema);