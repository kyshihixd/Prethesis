const User = require('../Server/Models/User');
const Book = require('../Server/Models/Book');
const Author = require('../Server/Models/Author');
const connectDB = require('./Server');
const Review = require('../Server/Models/Review');

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

async function updateUser(){
    try {
        const user = await User.findOneAndUpdate(
            {username: "logintest"},
            {admin: true},
            {new: true},
        );
        
        if (!user){
            console.log("User not found")
            return ;
        }

    }
    catch (error) {
        console.error("Error: "+ error);

    }
}

async function addReview() {
    try {
        const book = await Book.findOne({title: "Test book 2"}).exec();

        const user = await User.findOne({username: "logintest"}).exec();
        const review = new Review({
            rating: 5,
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            user: user._id,
            book: book._id
        });

        const updateBook = await Book.findOneAndUpdate(
            {_id: book._id},
            {review: review._id},
            {new: true}
        )
        const updateUser = await User.findOneAndUpdate(
            {_id: user._id},
            {review: review._id},
            {new: true}
        )

        await review.save();
        console.log("Author added successfully:", review);
    } catch (error) {
        console.error("Error adding book:", error);
    }
}

async function adminAll(){
    try {   
        await User.updateMany({ admin: { $exists: false } }, { $set: { admin: false } });

    } catch (error){
        console.error("There is an error:" + error)
    }
}

updateUser()

