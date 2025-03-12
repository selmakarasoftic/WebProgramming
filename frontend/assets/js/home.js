const highlights = [
    { type: "car", title: "Audi RS7", description: "A beast with 730HP, perfect for adrenaline lovers!" },
    { type: "review", title: "Audi RS7 Review", description: "Selma says: 'Amazing performance and sleek design!'" },
    { type: "meetup", title: "Movie Night Sarajevo", description: "Join us for an open-air movie night!" }
];

function initHome() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const welcomeMessage = document.getElementById("welcomeMessage");
    const adminInfo = document.getElementById("adminInfo");
    const highlightsContainer = document.getElementById("latestHighlights");

    if (user && user.role === "admin") {
        welcomeMessage.innerHTML = `Welcome back, Admin ${user.username}! `;
        adminInfo.style.display = "block";
    } else {
        welcomeMessage.innerHTML = `Welcome, Guest! `;
        adminInfo.style.display = "none";
    }

    // Render latest highlights
    highlightsContainer.innerHTML = "";
    if (highlights.length === 0) {
        highlightsContainer.innerHTML = "<p>No highlights to show yet!</p>";
    } else {
        highlights.forEach(highlight => {
            const highlightCard = document.createElement("div");
            highlightCard.classList.add("highlight-card");
            highlightCard.innerHTML = `
                <h4>${highlight.title}</h4>
                <p>${highlight.description}</p>
            `;
            highlightsContainer.appendChild(highlightCard);
        });
    }
}
