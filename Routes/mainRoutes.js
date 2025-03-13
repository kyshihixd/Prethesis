const express = require('express');
const Book = require('../Server/Models/Book'); 
const router = express.Router();

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

module.exports = router;
