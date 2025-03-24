document.addEventListener("DOMContentLoaded", function () {
    // Ensure the function only runs on the admin page
    if (document.getElementById("adminPanel")) {
        initAdminPage();
    }
});

function initAdminPage() {
    const userListContainer = document.getElementById("userList");
    const adminPanel = document.getElementById("adminPanel"); // Ensure this exists
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!adminPanel) return; // 

    if (!loggedInUser || loggedInUser.role !== "admin") {
        adminPanel.innerHTML = "<p>Unauthorized access.</p>";
        return;
    }

    renderUsers();
}

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function renderUsers() {
    const userListContainer = document.getElementById("userList");
    if (!userListContainer) return;

    userListContainer.innerHTML = ""; // Clear previous content

    const users = getUsers();

    if (users.length === 0) {
        userListContainer.innerHTML = "<p>No users found.</p>";
        return;
    }

    users.forEach((user, index) => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");

        userCard.innerHTML = `
            <div class="user-info">
                <h3>${user.username} <span class="role-badge ${user.role}">${user.role.toUpperCase()}</span></h3>
                <p><strong>Registered:</strong> ${user.registered || "Unknown"}</p>
            </div>
            <div class="user-actions">
                <button class="edit-btn-user" onclick="editUser(${index})">✏️ Edit</button>
                ${user.role !== "admin" ? `<button class="delete-btn-user" onclick="deleteUser(${index})">🗑️ Delete</button>` : ""}
            </div>
        `;

        userListContainer.appendChild(userCard);
    });
}

function editUser(index) {
    const users = getUsers();
    const newRole = prompt(`Change role for ${users[index].username} (admin/guest):`, users[index].role);

    if (newRole && (newRole === "admin" || newRole === "guest")) {
        users[index].role = newRole;
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
    } else {
        alert("❌ Invalid role. Use 'admin' or 'guest'.");
    }
}

function deleteUser(index) {
    const users = getUsers();

    if (users[index].role === "admin") {
        alert("❌ Cannot delete an admin account!");
        return;
    }

    const confirmDelete = confirm(`Are you sure you want to delete ${users[index].username}?`);

    if (confirmDelete) {
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
    }
}

$(document).on("spapp:ready", function () {
    if (window.location.hash === "#users") {
        renderUsers();
    }
});
