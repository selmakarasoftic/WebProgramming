function initHome() {
    const userDataString = localStorage.getItem("user_data");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const adminInfo = document.getElementById("adminInfo");
    const highlightsContainer = document.getElementById("latestHighlights");

    if (!welcomeMessage || !adminInfo || !highlightsContainer) return;

    let user = null;
    if (userDataString) {
        try {
            user = JSON.parse(userDataString);
        } catch (e) {
            console.error("Error parsing user data from localStorage:", e);
            localStorage.removeItem("user_data");
        }
    }

    if (user && user.role === "admin") {
        welcomeMessage.innerHTML = `👋 Welcome back, <strong>Admin ${user.username}</strong>!`;
        adminInfo.style.display = "block";
    } else {
        // ako nije admin
        welcomeMessage.innerHTML = `👋 Welcome, <strong>${user && user.username ? user.username : "Guest"}</strong>!`;
        adminInfo.style.display = "none";
    }

    renderHighlights();
    setupAdminButtons();
}

function renderHighlights() {
    const highlightsContainer = document.getElementById("latestHighlights");
    if (!highlightsContainer) return;

    highlightsContainer.innerHTML = "";

    const cars = JSON.parse(localStorage.getItem("cars")) || [];
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const meetups = JSON.parse(localStorage.getItem("meetups")) || [];

    let highlights = [];

    if (cars.length > 0) {
        const latestCar = cars[cars.length - 1];
        highlights.push({
            type: "car",
            title: `🚗 ${latestCar.model}`,
            description: `Latest car added: <strong>${latestCar.model}</strong> (${latestCar.year})`
        });
    }

    if (reviews.length > 0) {
        const latestReview = reviews[reviews.length - 1];
        highlights.push({
            type: "review",
            title: `⭐ ${latestReview.title}`,
            description: `<strong>${latestReview.name}</strong> says: "${latestReview.content}"`
        });
    }

    if (meetups.length > 0) {
        const latestMeetup = meetups[meetups.length - 1];
        highlights.push({
            type: "meetup",
            title: `📅 ${latestMeetup.title}`,
            description: `Next Meetup: <strong>${latestMeetup.title}</strong> at ${latestMeetup.location} on ${latestMeetup.date}`
        });
    }

    if (highlights.length === 0) {
        highlightsContainer.innerHTML = "<p>No highlights available yet!</p>";
        return;
    }

    highlights.forEach((highlight) => {
        const highlightCard = document.createElement("div");
        highlightCard.classList.add("highlight-card");
        highlightCard.innerHTML = `
            <h4>${highlight.title}</h4>
            <p>${highlight.description}</p>
        `;
        highlightsContainer.appendChild(highlightCard);
    });
}

function setupAdminButtons() {
    document.querySelectorAll(".admin-actions button").forEach(button => {
        button.addEventListener("click", function () {
            const targetPage = button.getAttribute("data-page");
            if (targetPage) {
                window.location.hash = `#${targetPage}`;
            }
        });
    });
}
$(document).on("spapp:ready", function () {
    if (window.location.hash === "#home") {
        initHome();
    }
});
