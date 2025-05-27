document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("/api/session");
        if (!res.ok) throw new Error("Session fetch failed");
        
        const sessionData = await res.json();
        const { username} = sessionData;

        if (!username) {
            alert("Session expired or not logged in. Please log in again.");
            return window.location.href = "/login";
        }

        const url = new URL(window.location.href);       
        const currentUser = url.searchParams.get("user");

        if (currentUser !== username) {
            url.searchParams.set("user", username);
            window.location.replace(url.toString());
            return;
        }

    } catch (error) {
        console.error("Error fetching session:", error);
        alert("Login required. Redirecting...");
        window.location.href = "/login";
    }
});
