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
            

            let reviewContent = "";
            if (book.review.length > 0){
                for (let i = 0; i < book.review.length; i++){
                    reviewContent += book.review[i].content + "";
                }
            }
            else {reviewContent = "No content"};

            bookCard.innerHTML = `
                <div class= "card mb-3 w-75 mx-auto book-card" onclick="gotobook('${book._id}')">
                    <div class = "card-body">
                        <h3>${book.title}</h3>
                        <p><strong>Author:</strong> ${book.author ? book.author.name : "Unknown"}</p>
                        <p><strong>Review:</strong> ${reviewContent}</p>
                        
                    </div>
                </div>
            `;

            bookList.appendChild(bookCard);
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        bookList.innerHTML = "<p>Error loading books. Check console for details.</p>";
    }
});

function gotobook(bookId) {
    window.location.href = `/Mainpage/book-details.html?id=${bookId}`;
}