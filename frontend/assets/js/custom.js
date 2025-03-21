$(document).ready(function () {
    const user = localStorage.getItem("loggedInUser");

    // ❌ If not logged in, redirect to login page immediately
    if (!user) {
        window.location.href = "pages/login.html";
    } else {
        // ✅ If logged in, show the app
        $("#app").show();

        // If no hash, go to home by default
        if (!window.location.hash || window.location.hash === "#") {
            window.location.hash = "#home";
        }
    }
});

// ✅ Logout Function
function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "pages/login.html";
}
