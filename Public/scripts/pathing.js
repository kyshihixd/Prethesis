document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("user");

    if (username) {
        const logoLink = document.getElementById("logoMain");
        const createReview = document.getElementById("createReview");
        const mainPage = document.getElementById("mainPage");
        const bookpage = document.getElementById("bookpage");
        const authorpage = document.getElementById("authorpage");
        const trendingpage = document.getElementById("trendingpage");
        const discoverypage = document.getElementById("discoverypage");
        const postbookpage = document.getElementById('linkToPostReview');

        if (logoLink && createReview) {
            createReview.href = `/main/post-review?user=${encodeURIComponent(username)}`;
            logoLink.href = `/main?user=${encodeURIComponent(username)}`;
            mainPage.href = `/main?user=${encodeURIComponent(username)}`;
            bookpage.href = `/main/books?user=${encodeURIComponent(username)}`;
            authorpage.href = `/main/authors?user=${encodeURIComponent(username)}`;
            trendingpage.href = `/main/trending?user=${encodeURIComponent(username)}`;
            discoverypage.href = `/main/discovery?user=${encodeURIComponent(username)}`;
            postbookpage.href = `/main/post-book?user=${encodeURIComponent(username)}`;
        }
    }
});