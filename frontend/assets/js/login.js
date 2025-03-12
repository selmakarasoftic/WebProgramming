function initializeUsers() {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (existingUsers.length === 0) {
        const defaultUsers = [
            { username: "selma", password: "password", role: "admin", registered: "2024-01-01" },
            { username: "guest4", password: "password", role: "guest", registered: "2024-02-01" }
        ];
        localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
}

document.addEventListener("DOMContentLoaded", initializeUsers);

function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        message.textContent = "Invalid username or password!";
        message.style.color = "darkred";
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    message.textContent = "Login successful! Redirecting...";
    message.style.color = "green";

    setTimeout(() => window.location.href = "../index.html#home", 1000);
}

function redirectToRegister() {
    window.location.href = "register.html";
}
