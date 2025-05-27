document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("user");

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
    }
});