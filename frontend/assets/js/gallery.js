document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("galleryContainer")) {
        return; 
    }
    
    initGallery();
});

const galleryKey = "galleryPhotos"; 

function initGallery() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const uploadSection = document.getElementById("uploadSection");

    if (!uploadSection) return; 

    if (!user) {
        uploadSection.style.display = "none";
    }

    renderGallery();
}

function getGalleryPhotos() {
    return JSON.parse(localStorage.getItem(galleryKey)) || [];
}

function renderGallery() {
    const galleryContainer = document.getElementById("galleryContainer");
    if (!galleryContainer) return; 

    galleryContainer.innerHTML = "";

    const photos = getGalleryPhotos();

    if (photos.length === 0) {
        galleryContainer.innerHTML = "<p>No photos in the gallery yet.</p>";
        return;
    }

    photos.forEach((photo, index) => {
        const photoCard = document.createElement("div");
        photoCard.classList.add("photo-card");

        photoCard.innerHTML = `
            <img src="${photo.imageUrl}" alt="${photo.title}">
            <h4>${photo.title}</h4>
            <p>Uploaded by: ${photo.uploadedBy} | ${photo.timestamp}</p>
            ${isAdmin() ? `<button class="delete-btn-gallery" onclick="deletePhoto(${index})">🗑️ Delete</button>` : ""}
        `;

        galleryContainer.appendChild(photoCard);
    });
}

function uploadPhoto() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
        alert("You must be logged in to upload a photo!");
        return;
    }

    const title = document.getElementById("photoTitle").value;
    const file = document.getElementById("photoUpload").files[0];

    if (!title || !file) {
        alert("Please enter a title and select an image.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const newPhoto = {
            title,
            imageUrl: event.target.result,
            uploadedBy: user.username,
            timestamp: new Date().toLocaleString()
        };

        const photos = getGalleryPhotos();
        photos.push(newPhoto);
        localStorage.setItem(galleryKey, JSON.stringify(photos));

        renderGallery();
    };

    reader.readAsDataURL(file);

    document.getElementById("photoTitle").value = "";
    document.getElementById("photoUpload").value = "";
}

function deletePhoto(index) {
    if (!isAdmin()) return;

    const confirmDelete = confirm("Are you sure you want to delete this photo?");
    if (!confirmDelete) return;

    const photos = getGalleryPhotos();
    photos.splice(index, 1);
    localStorage.setItem(galleryKey, JSON.stringify(photos));

    renderGallery();
}

function isAdmin() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    return user && user.role === "admin";
}
