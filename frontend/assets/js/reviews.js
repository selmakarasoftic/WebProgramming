const defaultReviews = [
    {
        title: "Audi RS7 Review",
        name: "Selma",
        content: "Amazing performance and sleek design. Handles like a dream!",
        rating: 5,
        images: [
            "assets/images/audi.jpg",
            "assets/images/audi2.jpg",
            "assets/images/audi3.jpg"
        ]
    }
];

// Load reviews from localStorage or use default ones
const reviews = JSON.parse(localStorage.getItem("reviews")) || defaultReviews;

window.initReviews = function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    const form = document.getElementById("addReviewForm");
    if (form && user && user.role !== "admin") {
        form.style.display = "none";
    }

    renderReviews();
}

function renderReviews() {
    const container = document.getElementById("reviewsContainer");
    if (!container) return;

    container.innerHTML = "";

    reviews.forEach((review, index) => {
        const card = document.createElement("div");
        card.classList.add("review-card");

        const galleryDiv = document.createElement("div");
        galleryDiv.classList.add("image-gallery");

        review.images.forEach((imgSrc, idx) => {
            const img = document.createElement("img");
            img.src = imgSrc;
            if (idx === 0) img.classList.add("active");
            galleryDiv.appendChild(img);
        });

        const prevBtn = document.createElement("button");
        prevBtn.classList.add("prev");
        prevBtn.innerHTML = "&#10094;";
        prevBtn.onclick = () => prevImage(galleryDiv);

        const nextBtn = document.createElement("button");
        nextBtn.classList.add("next");
        nextBtn.innerHTML = "&#10095;";
        nextBtn.onclick = () => nextImage(galleryDiv);

        galleryDiv.appendChild(prevBtn);
        galleryDiv.appendChild(nextBtn);

        card.innerHTML = `
            <h3>${review.title}</h3>
            <p><strong>Reviewer:</strong> ${review.name}</p>
            <p>${review.content}</p>
            <p><strong>Rating:</strong> ${'⭐'.repeat(review.rating)}</p>
        `;

        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (user && user.role === "admin") {
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn-review");
            deleteBtn.textContent = "🗑️ Delete";
            deleteBtn.onclick = () => {
                reviews.splice(index, 1);
                localStorage.setItem("reviews", JSON.stringify(reviews));
                renderReviews();
            };
            card.appendChild(deleteBtn);
        }

        card.insertBefore(galleryDiv, card.firstChild);
        container.appendChild(card);
    });
}

function prevImage(gallery) {
    const images = gallery.querySelectorAll("img");
    const activeImage = gallery.querySelector("img.active");
    let currentIndex = Array.from(images).indexOf(activeImage);

    activeImage.classList.remove("active");
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    images[currentIndex].classList.add("active");
}

function nextImage(gallery) {
    const images = gallery.querySelectorAll("img");
    const activeImage = gallery.querySelector("img.active");
    let currentIndex = Array.from(images).indexOf(activeImage);

    activeImage.classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("active");
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

window.addReview = async function () {
    const name = document.getElementById("reviewerName").value;
    const title = document.getElementById("reviewTitle").value;
    const content = document.getElementById("reviewContent").value;
    const rating = document.getElementById("reviewRating").value;
    const imageInput = document.getElementById("reviewImages");

    if (!name || !title || !content || imageInput.files.length === 0) {
        alert("Please fill out all fields and upload at least one image!");
        return;
    }

    const images = await Promise.all(
        Array.from(imageInput.files).map(file => toBase64(file))
    );

    reviews.push({ name, title, content, rating, images });
    localStorage.setItem("reviews", JSON.stringify(reviews));
    renderReviews();

    document.getElementById('reviewerName').value = '';
    document.getElementById('reviewTitle').value = '';
    document.getElementById('reviewContent').value = '';
    document.getElementById('reviewRating').value = '5';
    document.getElementById('reviewImages').value = '';
}

$(document).on("spapp:ready", function () {
    if (window.location.hash === "#reviews") {
        initReviews();
    }
});