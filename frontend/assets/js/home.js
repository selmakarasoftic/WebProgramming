import CarService from '../../services/car-service.js';
import ReviewService from '../../services/review-service.js';
import MeetupService from '../../services/meetup-service.js';

window.initHome = function () {
    InitHome();
}
function InitHome() {
    const userDataString = localStorage.getItem("user_data");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const adminInfo = document.getElementById("adminInfo");
    const highlightsContainer = document.getElementById("latestHighlights");

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
        setupAdminButtons();
    } else {
        // ako nije admin
        welcomeMessage.innerHTML = `👋 Welcome, <strong>${user && user.username ? user.username : "Guest"}</strong>!`;
        adminInfo.style.display = "none";
    }

    renderHighlights();
}

function renderHighlights() {
    const highlightsContainer = document.getElementById("latestHighlights");
    if (!highlightsContainer) return;

    highlightsContainer.innerHTML = "<p>Loading highlights...</p>";

    let highlights = [];

    const fetchLatestCar = new Promise((resolve) => {
        CarService.getLatestCar(
            (car) => {
                if (car) {
                    highlights.push({
                        type: "car",
                        title: `🚗 ${car.model}`,
                        description: `Latest car added: <strong>${car.model}</strong> (${car.year})`
                    });
                }
                resolve();
            },
            (xhr) => {
                console.error("Error fetching latest car:", xhr.responseText);
                resolve(); // Resolve even on error to allow other fetches to complete
            }
        );
    });

    const fetchLatestReview = new Promise((resolve) => {
        ReviewService.getLatestReview(
            (review) => {
                if (review) {
                    highlights.push({
                        type: "review",
                        title: `⭐ ${review.title}`,
                        description: `<strong>${review.reviewer_name}</strong> says: "${review.review_text}"`
                    });
                }
                resolve();
            },
            (xhr) => {
                console.error("Error fetching latest review:", xhr.responseText);
                resolve();
            }
        );
    });

    const fetchLatestMeetup = new Promise((resolve) => {
        MeetupService.getLatestMeetup(
            (meetup) => {
                if (meetup) {
                    highlights.push({
                        type: "meetup",
                        title: `📅 ${meetup.title}`,
                        description: `Next Meetup: <strong>${meetup.title}</strong> at ${meetup.location} on ${meetup.date}`
                    });
                }
                resolve();
            },
            (xhr) => {
                console.error("Error fetching latest meetup:", xhr.responseText);
                resolve();
            }
        );
    });

    Promise.all([fetchLatestCar, fetchLatestReview, fetchLatestMeetup]).then(() => {
        highlightsContainer.innerHTML = ""; // Clear loading message

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
$(document).on("spapp:ready", function () {
    initHome(); // Always run on load
});

$(document).on("spapp:changed", function (e, page) {
    if (page === "home") {
        initHome(); // Run every time #home is navigated to
    }
});

