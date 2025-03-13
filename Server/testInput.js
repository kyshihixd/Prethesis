const User = require('../Server/Models/User');
const Book = require('../Server/Models/Book');
const Author = require('../Server/Models/Author');
const connectDB = require('./Server');

connectDB();

async function bookTest() {
    try {
        const newBook = new Book({
            title: "Test book 1",
            description: "TESTING description",
            pages: 250,
            isbn: "978-3-13216-148410-0",
            publication_date: new Date("2023-08-15"),
            publication_place: "New York",
            genre: ["Programming", "Database"],
            publisher: "Tech Publishers",
            series: "MongoDB Essentials",
            Language: "English",
            illustrator: ["Mark"]
        });
        await newBook.save();

        console.log("Book added successfully:", newBook);
    } catch (error) {
        console.error("Error adding book:", error);
    }
}

async function authorTest() {
    try {
        const author = new Author({
            penname: "Marky",
            bio: "Im marky",
            birthdate: new Date("1965-07-31")
        });
        await author.save();

        console.log("Author added successfully:", author);
    } catch (error) {
        console.error("Error adding book:", error);
    }
}

async function updateBook() {
    try {
        const author = await Author.findOne({penname: "Marky"}).exec();
        const updatedBook = await Book.findOneAndUpdate(
            {title: "Test book 2"},
            { author: [author._id] },  
            { new: true }
        );

        if (!updatedBook) {
            console.log("Book not found.");
            return;
        }

        console.log("Updated book:", updatedBook);
    } catch (error) {
        console.error("Error updating book:", error);
    }
}
updateBook();
