const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        default: [],
    }],
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        default: [],
    }],
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        
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
        default: "English",
    },
    illustrator: [{
        type: String,
        default: "none",
    }],
    usersTradingThisBook: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
    }],
    
    coverImagePath: {
        type: String,
        default: "/images/bookcover/default.jpg",
    },
});

module.exports = mongoose.model('Book', bookSchema);