const express = require('express');
const Book = require('../Server/Models/Book'); 
const Review = require('../Server/Models/Review');
const router = express.Router();

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        const populatedBooks = await Promise.all(
            books.map(async (book) => {
                return await Book.findById(book._id).populate('review').exec();
            })
        );
        console.log(JSON.stringify(populatedBooks, null, 2));
        res.json(populatedBooks);
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

router.get('/books/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id).populate('review').exec();
        
        console.log(JSON.stringify(book, null, 2));
        res.json(book);
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});


module.exports = router;
