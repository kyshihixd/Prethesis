const express = require('express');
const Book = require('../Server/Models/Book');
const Review = require('../Server/Models/Review');
const User = require('../Server/Models/User');
const Author = require('../Server/Models/Author');
const Comment = require('../Server/Models/Comment');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const multer = require("multer");
const fs = require('fs');

const storageBook = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../Public/images/bookcover'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const uploadBook = multer({ storage: storageBook });

const storageAuthor = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../Public/images/authorcover'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const uploadAuthor= multer({ storage: storageAuthor });

function isAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    }
    return res.redirect('/Login');
}


router.get('/main',  (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Mainpage/mainpage.html'));
});

router.get('/currentUser', async (req, res) => {
    try {
        if (!req.session || !req.session.userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const user = await User.findById(req.session.userId).populate("review").exec();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            userId: user._id,
            username: user.username,
            name: user.name,
            createAt: user.createdAt,
            gmail: user.gmail,
            review: user.review
        });
    }
    catch (err) {
        console.error("Error fetching current user:", err);
        res.status(500).json({ error: "Failed to fetch current user" });
    }
});

router.get('/books',  async (req, res) => {
    try {
        const books = await Book.find();
        const populatedBooks = await Promise.all(
            books.map(async (book) => {
                return await Book.findById(book._id).limit(30)
                    .populate('author')
                    .populate('review')
                    .exec();
            })
        );


        res.json(populatedBooks);
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
        var populatedReviews = await Promise.all(
            reviews.map(async (review) => {
                return await Review.findById(review._id).limit(20).populate({path:'book', populate: {path: "title"}}).populate({path: 'user', populate: {path: "username"}}).exec();
            })
        );


        res.json(populatedReviews);
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

router.get('/authors',  async (req, res) => {
    try {
        const authors = await Author.find();
        var populatedAuthors = await Promise.all(
            authors.map(async (author) => {
                return await Author.findById(author._id).populate('book').exec();
            })
        );


        res.json(populatedAuthors);
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});


router.get('/main/book-details', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Mainpage/book-details.html'));
});

router.get('/main/post-review', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Mainpage/postreview.html'));
});

router.get('/main/post-book', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Mainpage/postbook.html'));
});

router.get('/main/review-details', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Mainpage/review-details.html'));
});

router.get('/main/author-details',  (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Mainpage/author-details.html'));
});

router.get('/main/books', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Mainpage/bookpage.html'));
});

router.get('/main/authors',  (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Mainpage/authorpage.html'));
});

router.get('/main/discovery',  (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Mainpage/discoverypage.html'));
});

router.get('/main/trending',  (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Mainpage/trendingpage.html'));
});

router.get('/main/user-profile', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Mainpage/userProfile.html'));
});

router.get('/main/author-edit', isAuthenticated, (req, res) => {
    if (!req.session.admin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    res.sendFile(path.join(__dirname, '../Public/Mainpage/author-edit.html'));
});


router.post('/main/post-book', isAuthenticated, uploadBook.single("formFile"), async (req, res) => {
    try {
        const body = req.body || {};
        console.log("book title: " + body.booktitle);
        const booktitle = (body.booktitle || "").trim();
        const author = (body.author || "").trim();
        const pages = body.pages ? parseInt(body.pages) : undefined;
        const isbn = (body.isbn || "").trim();
        const publicationdate = (body.publicationdate || "").trim();
        const publicationplace = (body.publicationplace || "").trim();
        const genre = (body.genre || "").trim();
        const publisher = (body.publisher || "").trim();
        const series = (body.series || "").trim();
        const language = (body.language || "").trim();
        const illustrator = (body.illustrator || "").trim();
        const description = (body.description || "").trim();
        const username = (body.username || "");

        const imagePath = req.file ? "/images/bookcover/" + req.file.filename: "/images/bookcover/default.jpg";
        const genres = genre ? genre.split(",").map(g => g.trim()) : [];
        const illustrators = illustrator ? illustrator.split(",").map(g => g.trim()) : [];
        const authors = author ? author.split(",").map(g => g.trim()) : [];
        const authorIds = await Promise.all(
            authors.map(async name => {
              let existing = await Author.findOne({ penname: name }).exec();
              if (existing) return existing._id;
      
              const newAuthor = new Author({ penname: name });
              await newAuthor.save();
              return newAuthor._id;
            })
          );
        

        const newBook = new Book ({

            title: booktitle,
            author: authorIds,
            pages: pages,
            isbn: isbn,
            publicationdate: publicationdate,
            publicationplace: publicationplace,
            genre: genres,
            publisher: publisher,
            series: series,
            language: language,
            illustrator: illustrators,
            description: description,
            coverImagePath: imagePath,
        });

        await newBook.save();
        console.log("Book created:", newBook);

        await Promise.all(
            authorIds.map(async authorId => {
                await Author.findByIdAndUpdate(authorId, { $push: { book: newBook._id } }, {new: true});
            })
        );

        res.status(200).send("Book posted successfully.");
    } catch (err) {
        console.error('Error saving user data:', err);
        res.status(500).send(`failed`);
    }
});

router.post('/main/post-review', isAuthenticated, async (req, res) => {
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

router.post('/main/post-review-2', isAuthenticated, async (req, res) => {
    try {
        const { bookId, title, rating, review} = req.body;


        const newReview = new Review({
            book: bookId,
            user: req.session.userId,
            rating: rating,
            head: title,
            content: review
        });

        await newReview.save();
        res.status(201).send('Review created successfully!');

        await Book.findByIdAndUpdate(
            bookId,
            { $push: { review: newReview._id } },
            { new: true }
        );

        await User.findByIdAndUpdate(
            req.session.userId,
            { $push: { review: newReview._id } },
            { new: true }
        );
    } catch (err) {
        console.error('Error saving user data:', err);
        res.status(500).send(`failed`);
    }
});

router.post('/user/bookToTrade', isAuthenticated, async (req, res) => {
    try {
        const { bookname, author, username } = req.body;

        const user = await User.findOne({ username }).exec();
        if (!user) return res.status(404).send("User not found.");

        if (!Array.isArray(bookname) || !Array.isArray(author) || bookname.length !== author.length) {
            return res.status(400).send("Bookname and author must be arrays of the same length.");
        }

        for (let i = 0; i < bookname.length; i++) {
            const normalizedBookname = bookname[i].trim().toLowerCase();
            const normalizedAuthor = author[i].trim().toLowerCase();

            const book = await Book.findOne({
                title: { $regex: new RegExp(`^${normalizedBookname}$`, 'i') },
            })
                .populate({
                    path: 'author',
                    match: { penname: { $regex: new RegExp(`^${normalizedAuthor}$`, 'i') } }
                })
                .exec();

            if (!book || !book.author) continue;

            if (!user.bookToTrade.includes(book._id)) {
                user.bookToTrade.push(book._id);
            }

            if (!book.usersTradingThisBook.includes(user._id)) {
                book.usersTradingThisBook.push(user._id);
                await book.save();
            }
        }

        await user.save();
        return res.status(200).send("Books added to trade list.");

    } catch (err) {
        console.error("Error updating trade list:", err);
        return res.status(500).send("Internal server error.");
    }
});

router.get('/api/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.json([]);

    try {
        const reviews = await Review.find({ head: new RegExp(query, 'i') }).limit(5).populate('book').populate('user');
        const books = await Book.find({ title: new RegExp(query, 'i') }).limit(5).populate('author');
        const authors = await Author.find({ penname: new RegExp(query, 'i') }).limit(5);

        const results = [
            ...reviews.map(r => ({ ...r.toObject(), type: 'review' })),
            ...books.map(b => ({ ...b.toObject(), type: 'book' })),
            ...authors.map(a => ({ ...a.toObject(), type: 'author' }))
        ];

        res.json(results);
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json([]);
    }
});


router.get('/api/session', isAuthenticated, async ( req, res ) => {
    try {
        const {userId, username, admin } = req.session;
        res.json({userId, username, admin})
    }
    catch (error){
        console.error("Error: " + error);
        return res.status(500).send("Internal server error.");
    }
})

router.get('/api/book-details/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id).populate({
            path: 'review',
            populate: {
              path: 'user',
              model: 'User',        
            },
          }).populate("author").exec();


        res.json(book);
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

router.get('/api/review-details/:id',  async (req, res) => {
    try {
        const id = req.params.id;
        const review = await Review.findById(id).populate('comment').populate("book").populate("user").exec();


        res.json(review);
    } catch (err) {
        console.error("Error fetching review:", err);
        res.status(500).json({ error: "Failed to fetch review" });
    }
});

router.get('/api/author-details/:id',  async (req, res) => {
    try {
        const id = req.params.id;
        const author = await Author.findById(id).populate("book").exec();
        

        res.json(author);
    } catch (err) {
        console.error("Error fetching review:", err);
        res.status(500).json({ error: "Failed to fetch review" });
    }
});


router.put('/api/author-edit/:id', isAuthenticated, uploadAuthor.single("authorCoverImagePath"), async (req, res) => {
    if (!req.session.admin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    
    try {
        const authorId = req.params.id;
        const author = await Author.findById(authorId);

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        if (req.file) {
            if (author.coverImagePath) {
                const oldImagePath = path.join(__dirname, '..', 'public', author.coverImagePath);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            author.coverImagePath = `/images/authorcover/${req.file.filename}`;
        }

        author.penname = req.body.penname || author.penname;
        author.realname = req.body.realname || author.realname;
        author.bio = req.body.bio || author.bio;
        author.data_of_birth = req.body.data_of_birth || author.data_of_birth;
        author.place_of_birth = req.body.place_of_birth || author.place_of_birth;
        author.occupation = req.body.occupation || author.occupation;
        author.education = req.body.education || author.education;
        author.genre = req.body.genre ? req.body.genre.split(',').map(g => g.trim()) : author.genre;

        await author.save();

        res.status(200).json({ message: "Author updated successfully", author });
    } catch (error) {
        console.error("Error updating author:", error);
        res.status(500).json({ message: "Server error" });
    }
})

router.patch('/updateUser', async (req, res) => {
    try {
        if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

        const { username, name, gmail } = req.body;
        const user = await User.findByIdAndUpdate(
            req.session.userId,
            { username, name, gmail },
            { new: true }
        );

        res.json(user);
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ error: "Update failed" });
    }
});

router.delete('/reviews/:id', async (req, res) => {
    try {
        const reviewId = req.params.id;
        await Review.findByIdAndDelete(reviewId);
        res.sendStatus(204);
    } catch (err) {
        console.error("Review deletion error:", err);
        res.status(500).json({ error: "Failed to delete review" });
    }
});
module.exports = router;
