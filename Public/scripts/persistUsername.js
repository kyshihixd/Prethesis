const params = new URLSearchParams(window.location.search);
let username = params.get("user");

if (username) {
    localStorage.setItem("username", username);
} else {
    username = localStorage.getItem("username");
    if (username) {
        window.location.href = `${window.location.pathname}?user=${username}`;
    } else {
        alert("Username not found. Please log in again.");
        window.location.href = "/login";
    }
}
