const reviews = [
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

function initReviews() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    
    if (user && user.role !== "admin") {
        document.getElementById("addReviewForm").style.display = "none";
    }
    
    renderReviews();
}

function renderReviews() {
    const container = document.getElementById("reviewsContainer");
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
        prevBtn.onclick = () => prevImage(prevBtn);

        const nextBtn = document.createElement("button");
        nextBtn.classList.add("next");
        nextBtn.innerHTML = "&#10095;";
        nextBtn.onclick = () => nextImage(nextBtn);

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
            deleteBtn.classList.add("delete-btn");
            deleteBtn.textContent = "🗑️ Delete";
            deleteBtn.onclick = () => {
                reviews.splice(index, 1);
                renderReviews();
            };
            card.appendChild(deleteBtn);
        }

        card.insertBefore(galleryDiv, card.firstChild);
        container.appendChild(card);
    });
}

function prevImage(button) {
    const gallery = button.parentElement;
    const images = gallery.querySelectorAll("img");
    let index = Array.from(images).findIndex(img => img.classList.contains("active"));

    if (index === -1 || images.length === 0) return;

    images[index].classList.remove("active");
    index = (index - 1 + images.length) % images.length;
    images[index].classList.add("active");
}

function nextImage(button) {
    const gallery = button.parentElement;
    const images = gallery.querySelectorAll("img");
    let index = Array.from(images).findIndex(img => img.classList.contains("active"));

    if (index === -1 || images.length === 0) return;

    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
}

function addReview() {
    const name = document.getElementById("reviewerName").value;
    const title = document.getElementById("reviewTitle").value;
    const content = document.getElementById("reviewContent").value;
    const rating = document.getElementById("reviewRating").value;
    const images = Array.from(document.getElementById("reviewImages").files).map(file => URL.createObjectURL(file));

    if (!name || !title || !content || images.length === 0) {
        alert("Please fill out all fields and upload at least one image!");
        return;
    }

    reviews.push({ name, title, content, rating, images });
    renderReviews();

    // Reset inputs
    document.getElementById('reviewerName').value = '';
    document.getElementById('reviewTitle').value = '';
    document.getElementById('reviewContent').value = '';
    document.getElementById('reviewRating').value = '5';
    document.getElementById('reviewImages').value = '';
}
