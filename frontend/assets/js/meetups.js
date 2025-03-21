// Default meetup events
const defaultMeetups = [
    {
        title: "Movie Night na otvorenom",
        date: "2024-07-15",
        location: "Sarajevo",
        description: "Organizator: SFC. Pridružite se večernjem gledanju filmova pod zvezdanim nebom!",
        createdBy: "System" // Default event created by the system
    }
];

// Load meetups from localStorage or use default ones
const meetups = JSON.parse(localStorage.getItem("meetups")) || defaultMeetups;

// Initialize Meetups Section
window.initMeetups = function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user && user.role !== "admin") {
        const addForm = document.getElementById("addMeetupForm");
        if (addForm) addForm.style.display = "none";
    }

    renderMeetups();
};

// Add New Meetup
window.addMeetup = function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
        alert("You must be logged in to add a meetup!");
        return;
    }

    const title = document.getElementById("meetupTitle").value;
    const date = document.getElementById("meetupDate").value;
    const location = document.getElementById("meetupLocation").value;
    const description = document.getElementById("meetupDescription").value;

    if (!title || !date || !location || !description) {
        alert("Please fill out all fields!");
        return;
    }

    const newMeetup = { 
        title, 
        date, 
        location, 
        description, 
        createdBy: user.username // Store the username of the creator
    };
    
    meetups.push(newMeetup);
    localStorage.setItem("meetups", JSON.stringify(meetups));
    renderMeetups();

    // Reset input fields
    document.getElementById("meetupTitle").value = "";
    document.getElementById("meetupDate").value = "";
    document.getElementById("meetupLocation").value = "";
    document.getElementById("meetupDescription").value = "";
};

// Render Meetups
function renderMeetups() {
    const container = document.getElementById("meetupsContainer");
    if (!container) return;

    container.innerHTML = "";

    meetups.forEach((meetup, index) => {
        const card = document.createElement("div");
        card.classList.add("meetup-card");

        card.innerHTML = `
            <h3>${meetup.title}</h3>
            <p><strong>Date:</strong> ${meetup.date}</p>
            <p><strong>Location:</strong> ${meetup.location}</p>
            <p>${meetup.description}</p>
            <p><strong>Scheduled By:</strong> ${meetup.createdBy}</p>
        `;

        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (user && (user.role === "admin" || user.username === meetup.createdBy)) {
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.textContent = "🗑️ Delete";
            deleteBtn.onclick = () => {
                meetups.splice(index, 1);
                localStorage.setItem("meetups", JSON.stringify(meetups));
                renderMeetups();
            };

            const editBtn = document.createElement("button");
            editBtn.classList.add("edit-btn");
            editBtn.textContent = "✏️ Edit";
            editBtn.onclick = () => editMeetup(index);

            card.appendChild(editBtn);
            card.appendChild(deleteBtn);
        }

        container.appendChild(card);
    });
}

// Edit Meetup
function editMeetup(index) {
    const meetup = meetups[index];
    const newTitle = prompt("Edit Title:", meetup.title);
    const newDate = prompt("Edit Date:", meetup.date);
    const newLocation = prompt("Edit Location:", meetup.location);
    const newDescription = prompt("Edit Description:", meetup.description);

    if (newTitle && newDate && newLocation && newDescription) {
        meetups[index] = {
            title: newTitle,
            date: newDate,
            location: newLocation,
            description: newDescription,
            createdBy: meetup.createdBy // Preserve the original creator
        };

        localStorage.setItem("meetups", JSON.stringify(meetups));
        renderMeetups();
    }
}

// Ensure render after SPApp has loaded the section
$(document).on("spapp:ready", function () {
    if (window.location.hash === "#meetups") {
        initMeetups();
    }
});
