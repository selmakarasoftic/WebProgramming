// Funkcija za učitavanje stranica
function loadPage(page) {
    fetch(`pages/${page}.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById("content").innerHTML = data;
    })
    .catch(error => console.error("Error loading page:", error));
}

// Automatski učitava Home stranicu pri pokretanju
document.addEventListener("DOMContentLoaded", () => {
    loadPage("home");
});
