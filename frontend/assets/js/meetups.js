function initMeetups() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user && user.role !== "admin") {
        document.getElementById("addMeetupForm").style.display = "none";
    }

    renderMeetups();
}

const meetups = [
    {
        title: "Movie Night na otvorenom",
        date: "2024-07-15",
        location: "Sarajevo",
        description: "Organizator: SFC. Pridružite se večernjem gledanju filmova pod zvezdanim nebom!"
    }
];

// Add New Meetup
function addMeetup() {
    const title = document.getElementById("meetupTitle").value;
    const date = document.getElementById("meetupDate").value;
    const location = document.getElementById("meetupLocation").value;
    const description = document.getElementById("meetupDescription").value;

    if (!title || !date || !location || !description) {
        alert("Please fill out all fields!");
        return;
    }

    const newMeetup = { title, date, location, description };
    meetups.push(newMeetup);
    renderMeetups();

    document.getElementById("meetupTitle").value = "";
    document.getElementById("meetupDate").value = "";
    document.getElementById("meetupLocation").value = "";
    document.getElementById("meetupDescription").value = "";
}

// Render Meetups
function renderMeetups() {
    const container = document.getElementById("meetupsContainer");
    container.innerHTML = "";

    meetups.forEach((meetup, index) => {
        const card = document.createElement("div");
        card.classList.add("meetup-card");

        card.innerHTML = `
            <h3>${meetup.title}</h3>
            <p><strong>Date:</strong> ${meetup.date}</p>
            <p><strong>Location:</strong> ${meetup.location}</p>
            <p>${meetup.description}</p>
        `;

        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (user && user.role === "admin") {
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.textContent = "🗑️ Delete";
            deleteBtn.onclick = () => {
                meetups.splice(index, 1);
                renderMeetups();
            };
            card.appendChild(deleteBtn);
        }

        container.appendChild(card);
    });
}
