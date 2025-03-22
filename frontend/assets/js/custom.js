$(document).ready(function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser")); // Parse the user

    if (!user) {
        window.location.href = "pages/login.html";
    } else {
        const appDiv = document.getElementById("app");
        if (appDiv) {
            appDiv.style.display = "block";
        }

        if (!window.location.hash || window.location.hash === "#") {
            window.location.hash = "#home";
        }

        checkAdminMenu();
    }
});

function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "pages/login.html"; 
}
function checkAdminMenu() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const adminLink = document.getElementById("adminLink"); 

    if (adminLink) {
        if (!user || user.role !== "admin") {
            adminLink.style.display = "none"; 
        } else {
            adminLink.style.display = "inline-block"; 
        }
    }
}

document.addEventListener("DOMContentLoaded", checkAdminMenu);
