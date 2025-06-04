document.addEventListener("DOMContentLoaded", () => {
    const navCol = document.getElementById("navBarCol");

    if (navCol){
        navCol.innerHTML = `<ul class="list-unstyled w-100">
        <li class="m-3 " style="border-radius: 15px;" id ="mainPageBar">
            <a id = "mainPage" href="" class="text-white text-decoration-none d-block  rounded text-nowrap">
                <i class="fas fa-home me-2"></i> Home
            </a>
        </li>
        <li class=" m-3 " style="border-radius: 15px; display: none " id = "discoveryPageBar">
            <a href="#" id = "discoverypage" class="text-white text-decoration-none d-block  rounded hover-bg text-nowrap">
                <i class="bi bi-radar me-2"></i> Discovery
            </a>
        </li>
        <li class=" m-3 " style="border-radius: 15px; display: none" id = "trendingPageBar">
            <a href="#" id = "trendingpage" class="text-white text-decoration-none d-block rounded hover-bg text-nowrap">
                <i class="bi bi-graph-up me-2"></i> Trending
            </a>
        </li>
        <li class="m-3 " style="border-radius: 15px;" id = "bookPageBar">
            <a href="#" id = "bookpage" class="text-white text-decoration-none d-block  rounded hover-bg text-nowrap">
                <i class="bi bi-book me-2"></i> Books
            </a>
        </li>
        <li class="m-3 " style="border-radius: 15px;" id="authorPageBar">
            <a href="#" id="authorpage" class="text-white text-decoration-none d-block  rounded hover-bg text-nowrap">
                <i class="bi bi-people me-2"></i> Authors
            </a>
        </li>
        <li class="m-3 " style="border-radius: 15px;" id = "followingPageBar">
            <a href="#" id = "followingpage" class="text-white text-decoration-none d-block  rounded hover-bg text-nowrap">
                <i class="bi bi-wechat me-2"></i> Following
            </a>
        </li>
    </ul>`;
    }
})