function initHome() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const welcomeMessage = document.getElementById("welcomeMessage");
    const adminInfo = document.getElementById("adminInfo");
    const highlightsContainer = document.getElementById("latestHighlights");

    if (user && user.role === "admin") {
        welcomeMessage.innerHTML = `Welcome back, Admin ${user.username}! `;
        adminInfo.style.display = "block";
    } else {
        welcomeMessage.innerHTML = `Welcome, ${user ? user.username : "Guest"}! `;
        adminInfo.style.display = "none";
    }

    renderHighlights();
}

function renderHighlights() {
    const highlightsContainer = document.getElementById("latestHighlights");
    if (!highlightsContainer) return;

    highlightsContainer.innerHTML = "";

    const cars = JSON.parse(localStorage.getItem("cars")) || [];
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const meetups = JSON.parse(localStorage.getItem("meetups")) || [];

    let highlights = [];

    // Fetch latest cars
    if (cars.length > 0) {
        highlights.push({
            type: "car",
            title: cars[cars.length - 1].model,
            description: `Latest car added: ${cars[cars.length - 1].model}, ${cars[cars.length - 1].year}`,
        });
    }

    // Fetch latest reviews
    if (reviews.length > 0) {
        highlights.push({
            type: "review",
            title: reviews[reviews.length - 1].title,
            description: `${reviews[reviews.length - 1].name} says: "${reviews[reviews.length - 1].content}"`,
        });
    }

    // Fetch latest meetups
    if (meetups.length > 0) {
        highlights.push({
            type: "meetup",
            title: meetups[meetups.length - 1].title,
            description: `Upcoming Meetup: ${meetups[meetups.length - 1].title} at ${meetups[meetups.length - 1].location}`,
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

// Ensure render after SPApp has loaded the section
$(document).on("spapp:ready", function () {
    if (window.location.hash === "#home") {
        initHome();
    }
});
