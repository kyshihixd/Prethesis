document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("/api/session");
        if (!res.ok) throw new Error("Session fetch failed");
        
        const sessionData = await res.json();
        const { username, admin } = sessionData;

        if (!username) {
            alert("Session expired or not logged in. Please log in again.");
            return window.location.href = "/login";
        }

        const params = new URLSearchParams(window.location.search);
        const urlUsername = params.get("user");

        if (urlUsername !== username) {
            window.location.href = `${window.location.pathname}?user=${username}`;
            return;
        }

    } catch (error) {
        console.error("Error fetching session:", error);
        alert("Login required. Redirecting...");
        window.location.href = "/login";
    }
});
