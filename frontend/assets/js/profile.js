import ProfileService from '../../services/profile-service.js';
import Constants from '../../utils/constants.js';

window.initProfile = function () {
    const usernameElement = document.getElementById("profileUsername");
    const roleElement = document.getElementById("profileRole");
    const registeredElement = document.getElementById("profileRegistered");

    const userData = JSON.parse(localStorage.getItem("user_data"));
    if (!userData || !userData.id) {
        document.getElementById("profileInfo").innerHTML = "<p>No user logged in or user ID not found.</p>";
        return;
    }

    // Fetch user data from the backend using ProfileService
    ProfileService.getProfile(userData.id,
        function(user) {
            console.log("ProfileService: raw user data received:", user);
            if (user) { // Backend now returns user object directly
                usernameElement.textContent = user.username || 'N/A';
                roleElement.textContent = user.role || 'N/A';
                registeredElement.textContent = user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A';

            } else {
                document.getElementById("profileInfo").innerHTML = "<p>Failed to load user profile.</p>";
            }
        },
        function(xhr) {
            console.error("Error fetching profile:", xhr.responseText);
            document.getElementById("profileInfo").innerHTML = "<p>Error loading profile data.</p>";
        }
    );
}

$(document).on("spapp:ready", function () {
    if (window.location.hash === "#profile") {
        initProfile();
    }
});

window.changePassword = function () {
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const userId = userData ? userData.id : null;
    const message = document.getElementById("profileMessage");

    if (!oldPassword || !newPassword) {
        message.textContent = "Please fill out both fields.";
        message.style.color = "darkred";
        return;
    }

    if (!userId) {
        message.textContent = "User not logged in.";
        message.style.color = "darkred";
        return;
    }

    $.ajax({
        url: Constants.PROJECT_BASE_URL + 'users/' + userId + '/password',
        type: 'PUT',
        headers: { 'Authorization': localStorage.getItem('user_token') },
        data: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword
        }),
        contentType: 'application/json',
        success: function(result) {
            if (result && result.success) {
                message.textContent = "Password updated successfully!";
                message.style.color = "green";
                document.getElementById("oldPassword").value = '';
                document.getElementById("newPassword").value = '';
            } else {
                message.textContent = result.message || "Failed to change password!";
                message.style.color = "darkred";
            }
        },
        error: function(xhr) {
            // Safely access the error message
            const errorMessage = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : xhr.responseText;
            message.textContent = "Error: " + errorMessage;
            message.style.color = "darkred";
        }
    });
}

window.logoutUser = function () {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_data");
    window.location.href = "pages/login.html";
}

window.deleteAccount = function () {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const userId = userData ? userData.id : null;

    if (!userId) {
        alert("User not logged in.");
        return;
    }

    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        return;
    }

    $.ajax({
        url: Constants.PROJECT_BASE_URL + 'users/' + userId,
        type: 'DELETE',
        headers: { 'Authorization': localStorage.getItem('user_token') },
        success: function(result) {
            if (result && result.success) {
                alert("Account deleted successfully!");
                localStorage.removeItem("user_token");
                localStorage.removeItem("user_data");
                window.location.href = "index.html";
            } else {
                alert(result.message || "Failed to delete account!");
            }
        },
        error: function(xhr) {
            // Safely access the error message
            const errorMessage = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : xhr.responseText;
            alert("Error: " + errorMessage);
        }
    });
}
