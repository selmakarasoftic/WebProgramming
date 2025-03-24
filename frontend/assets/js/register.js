function registerUser() {
    const username = document.getElementById("registerUsername").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const confirmPassword = document.getElementById("registerConfirmPassword").value.trim();
    const role = "guest"; // Default role for new users
    const message = document.getElementById("registerMessage");

    if (!username || !email || !password || !confirmPassword) {
        message.textContent = "Please fill out all fields!";
        message.style.color = "darkred";
        return;
    }

    if (!validateEmail(email)) {
        message.textContent = "Please enter a valid email address!";
        message.style.color = "darkred";
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        message.style.color = "darkred";
        return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    
    const userExists = existingUsers.find(user => user.username === username || user.email === email);
    if (userExists) {
        message.textContent = "Username or email already exists!";
        message.style.color = "darkred";
        return;
    }

    const newUser = { username, email, password, role, registered: new Date().toLocaleDateString() };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    message.textContent = "Registration successful! Redirecting...";
    message.style.color = "green";

    setTimeout(() => window.location.href = "../index.html#home", 1000);
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
