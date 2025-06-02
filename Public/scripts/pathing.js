document.addEventListener("DOMContentLoaded", async () => {


    let username = null;
    try {
        const res = await fetch("/api/session");
        if (res.ok) {
            const sessionData = await res.json();
            username = sessionData.username;
        }
    } catch (err) {
        console.warn("User not logged in.");
    }

    if (username) {
        const logoLink = document.getElementById("logoMain");
        
        const mainPage = document.getElementById("mainPage");
        const bookpage = document.getElementById("bookpage");
        const authorpage = document.getElementById("authorpage");
        const trendingpage = document.getElementById("trendingpage");
        const discoverypage = document.getElementById("discoverypage");

        const postBookPage = document.getElementById("createBook");
        const postReviewPage = document.getElementById("createReview");        

        

        logoLink.href = `/main?user=${encodeURIComponent(username)}`;
        mainPage.href = `/main?user=${encodeURIComponent(username)}`;
        bookpage.href = `/main/books?user=${encodeURIComponent(username)}`;
        authorpage.href = `/main/authors?user=${encodeURIComponent(username)}`;
        trendingpage.href = `/main/trending?user=${encodeURIComponent(username)}`;
        discoverypage.href = `/main/discovery?user=${encodeURIComponent(username)}`;
        postBookPage.href = `/main/post-book?user=${encodeURIComponent(username)}`;
        postReviewPage.href = `/main/post-review?user=${encodeURIComponent(username)}`;
    } else {
        const logoLink = document.getElementById("logoMain");
        const mainPage = document.getElementById("mainPage");
        const bookpage = document.getElementById("bookpage");
        const authorpage = document.getElementById("authorpage");
        const trendingpage = document.getElementById("trendingpage");
        const discoverypage = document.getElementById("discoverypage");
        const bell = document.getElementById("bell");
        const postBookPage = document.getElementById("createBook");
        const postReviewPage = document.getElementById("createReview");
        const userProfilePage = document.getElementById("userProf");

        logoLink.href = `/main`;
        mainPage.href = `/main`;
        bookpage.href = `/main/books`;
        authorpage.href = `/main/authors`;
        trendingpage.href = `/main/trending`;
        discoverypage.href = `/main/discovery`;
        bell.href = `/login`;
        postBookPage.href = `/login`;
        postReviewPage.href = `/login`;
        userProfilePage.href = `/login`;
    }
});