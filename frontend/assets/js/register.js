function registerUser() {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const role = document.getElementById("registerRole").value;
    const message = document.getElementById("registerMessage");

    if (!username || !password) {
        message.textContent = "Please fill out all fields!";
        message.style.color = "darkred";
        return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.find(user => user.username === username);

    if (userExists) {
        message.textContent = "Username already exists!";
        message.style.color = "darkred";
        return;
    }

    const newUser = { username, password, role, registered: new Date().toLocaleDateString() };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    message.textContent = "Registration successful! Redirecting...";
    message.style.color = "green";
    
    setTimeout(() => window.location.href = "../index.html#home", 1000);
}
