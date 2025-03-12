// Funkcija za učitavanje stranica
function loadPage(page) {
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;

            //inicijalizujem stranice
            if (page === "home") {
                initHome();
            } else if (page === "cars") {
                initCars();
            } else if (page === "reviews") {
                initReviews();
            } else if (page === "meetups") {
                initMeetups();
            } else if (page === "profile") {
                initProfile();
            }
        })
        .catch(error => console.error("Error loading page:", error));
}

//ovo mi je za hash
function handleHashChange() {
    const user = localStorage.getItem("loggedInUser");

    if (!user) {
        window.location.href = "pages/login.html";
        return;
    }

    const page = window.location.hash.substring(1) || "home";
    loadPage(page);
}

function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "pages/login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("loggedInUser");

    if (!user) {
        window.location.href = "pages/login.html";
    } else {
        // ako ima hash-a ucitaj page ako nema - home
        const page = window.location.hash.substring(1) || "home";
        loadPage(page);
    }
});

window.addEventListener("hashchange", handleHashChange);
