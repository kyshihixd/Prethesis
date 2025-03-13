const mongoose = require('mongoose');
const genres = [];

const authorSchema = new mongoose.Schema({
    book: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
    }],
    bio: {
        type: String,
    },
    realname: {
        type: String,
    },
    penname: {
        type: String,
        required: true,
    },
    data_of_birth: {
        type: Date,
    },
    place_of_birth: {
        type: String,
    },
    occupation: {
        type: String,
    },
    education: {
        type: String,
    },
    genre :[{
        type: String,
        enum: genres,
    }],
    
});

module.exports = mongoose.model('Author', authorSchema);