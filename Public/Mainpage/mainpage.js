document.addEventListener("DOMContentLoaded", async () => {
    const bookList = document.getElementById("book-list");

    try {
        const response = await fetch("/books");  
        if (!response.ok) throw new Error("Failed to fetch books");

        const books = await response.json();
        console.log("Fetched Books:", books); 

        if (books.length === 0) {
            bookList.innerHTML = "<p>No books found.</p>";
            return;
        }

        books.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");

            bookCard.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author ? book.author.name : "Unknown"}</p>
                <p><strong>Review:</strong> ${book.review.length > 0 ? book.review[0].content : "No reviews yet"}</p>
                <a href="/book/${book._id}">Read More</a>
            `;

            bookList.appendChild(bookCard);
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        bookList.innerHTML = "<p>Error loading books. Check console for details.</p>";
    }
});
