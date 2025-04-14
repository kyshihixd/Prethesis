const express = require('express');
const Book = require('../Server/Models/Book'); 
const Review = require('../Server/Models/Review');
const User = require('../Server/Models/User');
const Author = require('../Server/Models/Author');
const router = express.Router();
const path = require('path');
const session = require('express-session');

function isAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    }
    return res.redirect('/Login');
}


router.get('/main', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Mainpage/mainpage.html'));
});


router.get('/books', isAuthenticated, async (req, res) => {
    try {
        const books = await Book.find();
        var populatedBooks = await Promise.all(
            books.map(async (book) => {
                return await Book.findById(book._id).populate('review').populate('author').exec();
            })
        );
        

        console.log(JSON.stringify(populatedBooks, null, 2));
        res.json(populatedBooks);
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

router.get('/main/books',isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Mainpage/book-details.html'));
});

router.get('/main/post',isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Mainpage/post.html'));
});

router.post('/main/post', isAuthenticated, async (req, res) => {
    try {
        const { bookname, author, title, rating, review, username } = req.body;

        const normalizedBookname = bookname.trim().toLowerCase();
        const normalizedAuthor = author.trim().toLowerCase();

        const book = await Book.findOne({
            title: { $regex: new RegExp(`^${normalizedBookname}$`, 'i') },
        })
        .populate({
            path: 'author',
            match: { penname: { $regex: new RegExp(`^${normalizedAuthor}$`, 'i') } }
        })
        .exec();

        const user = await User.findOne({ username }).exec();

        if (!book || !book.author || !user) {
            return res.status(500).send("Failed to find matching book, author, or user.");
        }

        console.log("at routes")
        const newReview = new Review({
            book: book._id,
            user: user._id,
            rating: rating,
            head: title,
            content: review
        });
        
        await newReview.save();
        res.status(201).send('Review created successfully!');

        await Book.findByIdAndUpdate(
            book._id,
            { $push: { review: newReview._id } },
            { new: true }
        );

        await User.findByIdAndUpdate(
            user._id,
            { $push: { review: newReview._id } },
            { new: true }
        );
    } catch (err) {
        console.error('Error saving user data:', err);
        res.status(500).send(`failed`);
        }
    });

router.get('/api/book-details/:id', isAuthenticated, async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id).populate('review').populate("author").exec();
        
        
        res.json(book);
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});



module.exports = router;
