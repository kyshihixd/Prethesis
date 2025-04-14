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
            let voteCount = 0;
            if (book.review.length > 0){
                for (let i = 0; i < book.review.length; i++){
                    reviewContent += book.review[i].content + "";
                    voteCount += book.review[i].upvote.length - book.review[i].downvote.length;
                    
                }
            }
            else {reviewContent = "No content"};

            bookCard.innerHTML = `
                <div class= "card mb-3 w-75 mx-auto book-card" onclick="gotobook('${book._id}')">
                    <div class = "card-body">
                        <h3>${book.title}</h3>
                        <p><strong>Author:</strong> ${book.author[0] ? book.author[0].penname : "Unknown"}</p>
                        <p><strong>Review:</strong> ${reviewContent}</p> 
                        <p class = "mb-0 h5 text-white"><i class="bi bi-arrow-up-circle"></i>   ${voteCount}   <i class="bi bi-arrow-down-circle"></i></p>
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

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("user");

    if (username) {
        const logoLink = document.getElementById("logoMain");
        const createReview = document.getElementById("createReview");

        if (logoLink && createReview) {
            createReview.href = `/main/post?user=${encodeURIComponent(username)}`;
            logoLink.href = `/main?user=${encodeURIComponent(username)}`;
        }
    }
});

function gotobook(bookId) {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("user");
    window.location.href = `/main/books?user=${username}&id=${bookId}`;
}