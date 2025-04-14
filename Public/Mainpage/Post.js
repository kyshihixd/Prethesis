document.getElementById("createReviewForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const username = params.get("user");
    localStorage.setItem("username", username);
    const formData = {
        
        bookname: document.getElementById("bookname").value,
        author: document.getElementById("author").value,
        title: document.getElementById("reviewTitle").value,
        rating: document.getElementById("rating").value,
        review: document.getElementById("userReview").value,
        username: username,
    };

    try {
        const response = await fetch("/main/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            window.location.href = `/main?user=${username}`;
        } else {
            const errText = await response.text();
            console.error("Server responded with:", errText);
            document.getElementById("errorMessage").style.display = "block";
        }
    } catch (err) {
        console.error("Error:", err);
        document.getElementById("errorMessage").style.display = "block";
        alert("An error occurred.");
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