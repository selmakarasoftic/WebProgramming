$(document).ready(function () {
    const userData = localStorage.getItem("user_data");
    const token = localStorage.getItem("user_token");

    if (!token || !userData) {
        window.location.href = "pages/login.html";
    } else {
        const appDiv = document.getElementById("app");
        if (appDiv) {
            appDiv.style.display = "block";
        }

        if (!window.location.hash || window.location.hash === "#") {
            window.location.hash = "#home";
        }
    }
});

function logoutUser() {
    localStorage.clear();
    window.location.href = "pages/login.html"; 
}
