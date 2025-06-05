document.addEventListener("DOMContentLoaded", () => {
  const navRow = document.getElementById("navBarRow");

  if (navRow) {
    navRow.innerHTML = `<div class="container-fluid col-8">

        <div class="col-6">
            <a id = "logoMain" class="col-6 navbar-brand d-flex align-items-center ms-3" href="/main">
                <img src="/images/Untitled_design-removebg-preview1.png" alt="Logo"
                    class="img-fluid custom-logo me-3 object-fit-cover" />
                Book Reviews
            </a>
        </div>

        <div class="col-6 align-items-center justify-content-center d-flex position-relative">
            <form class="d-flex col-8" id="searchForm" autocomplete="off">
                <div class="dropdown w-100">
                <input class="form-control dropdown-toggle" type="search" id="searchInput" placeholder="Search..." data-bs-toggle="dropdown" aria-expanded="false">
                <div class="dropdown-menu w-100" id="searchSuggestions" aria-labelledby="searchInput"></div>
                </div>
            </form>
            </div>



    </div>
    <div class="mx-4 col-3 collapse navbar-collapse justify-content-end" id="navbarRow">
        <ul class="navbar-nav gap-4">
            <li class="nav-item d-flex align-items-center">
                <a class="nav-link d-flex align-items-center" id="bell" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                        class="bi bi-bell" viewBox="0 0 16 16">
                        <path
                            d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                    </svg>
                </a>
            </li>
            <li class="nav-item dropdown d-flex align-items-center">
                <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="createDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                        class="bi bi-plus-lg me-2" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                    </svg>
                    <div>Create</div>
                </a>
                <ul class="dropdown-menu" aria-labelledby="createDropdown">
                    <li><a class="dropdown-item" href="" id="createBook">Create Book</a></li>
                    <li><a class="dropdown-item" href="" id="createReview">Create Review</a></li>
                </ul>
            </li>
            <li class="nav-item dropdown d-flex align-items-center">
                <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item" href="#" id="toggleTheme">Toggle Dark/Light Mode</a></li>
                    <li><a class="dropdown-item" href="#" id="userProf">User Profile</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" id="logoutBtn">Logout</a></li>
                </ul>
            </li>

        </ul>
    </div>`;

    document.getElementById("logoutBtn").href = "/logout";
  }
});


document.addEventListener("DOMContentLoaded", () => {
    const toggleThemeBtn = document.getElementById("toggleTheme");

    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            
            const isLight = document.body.classList.contains("light-mode");
            localStorage.setItem("preferredTheme", isLight ? "light" : "dark");
        });

        const savedTheme = localStorage.getItem("preferredTheme");
        if (savedTheme === "light") {
            document.body.classList.add("light-mode");
        }
    }
});


document.addEventListener("DOMContentLoaded", async () => {
    const searchInput = document.getElementById("searchInput");
    const suggestionsBox = document.getElementById("searchSuggestions");

    let debounceTimer;

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


    searchInput.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        const query = searchInput.value.trim();

        if (!query) {
            suggestionsBox.classList.remove("show");
            suggestionsBox.innerHTML = "";
            return;
        }

        debounceTimer = setTimeout(async () => {
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const results = await res.json();

                suggestionsBox.innerHTML = "";
                suggestionsBox.classList.add("show");

                if (results.length === 0) {
                    suggestionsBox.innerHTML = '<span class="dropdown-item text-muted">No results found</span>';
                    return;
                }

                results.forEach(item => {
                    const a = document.createElement("a");
                    a.className = "dropdown-item";
                    if (item.type === 'book') {
                        a.href = `/main/book-details?username=${username}&id=${item._id}`;
                        a.textContent = `📚 ${item.title}`;
                    }
                    else if (item.type === 'author') {
                        a.href = `/main/author-details?username=${username}&id=${item._id}`;
                        a.textContent = `👤 ${item.penname}`;
                    }
                    else if (item.type === 'review') {
                        a.href = `/main/review-details?username=${username}&id=${item._id}`;
                        a.textContent = `📝 ${item.head}`;
                    }
                    
                    suggestionsBox.appendChild(a);
                });
            } catch (err) {
                console.error("Search error:", err);
            }
        }, 300);
    });
});