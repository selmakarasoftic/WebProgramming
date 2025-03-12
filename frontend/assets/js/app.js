function loadPage(page) {
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;

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

// Funkcija za prebacivanje stranica preko hash-a
function handleHashChange() {
    const page = window.location.hash.substring(1) || "home";
    loadPage(page);
}

// Postavljanje događaja za promenu hash-a
window.addEventListener("hashchange", handleHashChange);

// Učitavanje početne stranice na load
document.addEventListener("DOMContentLoaded", handleHashChange);


function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "pages/login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
        window.location.href = "pages/login.html";
    } else {
        
        loadPage("home");
    }
});
