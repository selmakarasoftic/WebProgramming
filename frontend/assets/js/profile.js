function initProfile() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const usernameElement = document.getElementById("profileUsername");
    const roleElement = document.getElementById("profileRole");
    const registeredElement = document.getElementById("profileRegistered");
    const message = document.getElementById("profileMessage");

    if (!user) {
        document.getElementById("profileInfo").innerHTML = "<p>No user logged in!</p>";
        return;
    }

    usernameElement.textContent = user.username;
    roleElement.textContent = user.role;
    registeredElement.textContent = user.registered || "Unknown";

    if (user.role === "admin") {
        document.getElementById("adminStats").style.display = "block";
        document.getElementById("totalCars").textContent = (JSON.parse(localStorage.getItem("cars")) || []).length;
        document.getElementById("totalReviews").textContent = (JSON.parse(localStorage.getItem("reviews")) || []).length;
        document.getElementById("totalMeetups").textContent = (JSON.parse(localStorage.getItem("meetups")) || []).length;
        document.getElementById("deleteAccountBtn").style.display = "none";
    }
}

function changePassword() {
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const message = document.getElementById("profileMessage");

    if (!oldPassword || !newPassword) {
        message.textContent = "Please fill out both fields.";
        message.style.color = "darkred";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(u => u.username === user.username);

    if (foundUser && foundUser.password === oldPassword) {
        foundUser.password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        message.textContent = "Password updated successfully!";
        message.style.color = "green";
    } else {
        message.textContent = "Old password is incorrect!";
        message.style.color = "darkred";
    }
}
function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "../index.html#login";
}

function deleteAccount() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.filter(u => u.username !== user.username);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("loggedInUser");

    alert("Account deleted successfully!");
    window.location.href = "index.html";
}
