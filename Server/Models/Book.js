const mongoose = require('mongoose');
const genres = [];
const language = [];
const bookSchema = new mongoose.Schema({
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        default: [],
    }],
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
    }],
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    pages: {
        type: Number,
        required: true,
    },
    isbn: {
        type: String,
    },
    publication_date: {
        type: Date,
    },
    publication_place: {
        type: String,
    },
    genre :[{
        type: String,
        enum: genres,
    }],
    publisher: {
        type: String,
    },
    series: {
        type: String,
        default: "none",
    },
    Language: {
        type: String,
        enum: language,
        default: "English",
    },
    illustrator: [{
        type: String,
        default: "none",
    }]

});

module.exports = mongoose.model('Book', bookSchema);