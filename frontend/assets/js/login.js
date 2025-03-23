function loginUser() {
    const loginInput = document.getElementById("loginInput").value.trim(); // Can be username or email
    const password = document.getElementById("loginPassword").value.trim();
    const message = document.getElementById("loginMessage");

    if (!loginInput || !password) {
        message.textContent = "Please enter your email/username and password!";
        message.style.color = "darkred";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => 
        (u.username === loginInput || u.email === loginInput) && u.password === password
    );

    if (!user) {
        message.textContent = "Invalid username/email or password!";
        message.style.color = "darkred";
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    message.textContent = "Login successful! Redirecting...";
    message.style.color = "green";

    setTimeout(() => window.location.href = "../index.html#home", 1000);
}

function initializeUsers() {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    
    if (existingUsers.length === 0) {
        const defaultUsers = [
            { username: "selma", email: "admin@example.com", password: "admin123", role: "admin", registered: "2024-01-01" },
            { username: "guest4", email: "guest4@example.com", password: "guest123", role: "guest", registered: "2024-02-01" }
        ];
        localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
}

document.addEventListener("DOMContentLoaded", initializeUsers);
