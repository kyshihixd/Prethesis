function getCookie(name) {
    const cookies = document.cookie.split('; ');
    const item = cookies.find(row => row.startsWith(name + '='));
    return item ? decodeURIComponent(item.split('=')[1]) : null;
}

function setCookie(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function addToRecent(item) {
    let recent = JSON.parse(getCookie("recentItems") || "[]");

    // Avoid duplicates by ID + type
    recent = recent.filter(r => !(r.id === item.id && r.type === item.type));

    // Add to start
    recent.unshift(item);

    // Keep only last 5
    if (recent.length > 5) recent = recent.slice(0, 5);

    setCookie("recentItems", JSON.stringify(recent));
}

const recentItems = JSON.parse(getCookie("recentItems") || "[]");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("/api/session");
        if (!res.ok) throw new Error("Session fetch failed");
        const sessionData = await res.json();
        const { userId, username, admin } = sessionData;
        const recentHTML = recentItems.map(item => {
            if (item.type === "book") {
                return `<div class = "recent-card mt-2">
                    <a href="/main/book-details?user=${username}&id=${item.id}">📚 ${item.title} <br><small>${item.author}</small></a>
                </div>`;
            } else if (item.type === "review") {
                return `<div class ="recent-card mt-2"><a href="/main/review-details?user=${username}&id=${item.id}">📝 ${item.head} by <small>${item.user} (${item.rating}/100)</small></a></div>`;
            } else if (item.type === "author") {
                return `<div class = "recent-card mt-2"><a href="/main/author-details?user=${username}&id=${item.id}">👤 ${item.penname}</a></div>`;
            }
            return '';
        }).join("");

        document.getElementById("recent").innerHTML = `
            <div class="p-2 mx-auto position-fixed col-2">
                <h5>Recently Viewed</h5>
                <div class = "">
                    ${recentHTML}
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error rendering recent items:", error);
        
    }});