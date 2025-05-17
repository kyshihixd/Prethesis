const params = new URLSearchParams(window.location.search);
const urlUsername = params.get("user");
const storedUsername = localStorage.getItem("username");

if (!storedUsername && urlUsername) {
    localStorage.setItem("username", urlUsername);
    window.location.href = `${window.location.pathname}?user=${urlUsername}`;
}

else if (storedUsername && urlUsername !== storedUsername) {
    window.location.href = `${window.location.pathname}?user=${storedUsername}`;
}

else if (!storedUsername && !urlUsername) {
    alert("Username not found. Please log in again.");
    window.location.href = "/login";
}

else {
}
