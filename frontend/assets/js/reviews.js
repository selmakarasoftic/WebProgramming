import ReviewService from '../../services/review-service.js';

window.initReviews = function () {
    fetchAndRenderReviews();
    showOrHideReviewForm();
}

function fetchAndRenderReviews() {
    ReviewService.getAllReviews(
        function(result) {
            if (Array.isArray(result)) {
                renderReviews(result);
            } else if (result && result.data && Array.isArray(result.data)) {
                renderReviews(result.data);
            } else {
                console.error("Invalid response format:", result);
                alert("Failed to fetch reviews: Invalid response format");
            }
        },
        function(xhr) {
            console.error("Failed to fetch reviews:", xhr.responseText);
            alert("Failed to fetch reviews: " + xhr.responseText);
        }
    );
}

function renderReviews(reviews) {
    const container = document.getElementById("reviewsContainer");
    if (!container) return;
    container.innerHTML = "";
    reviews.forEach((review) => {
        const card = document.createElement("div");
        card.classList.add("review-card");
        card.innerHTML = `
            <h3>${review.title}</h3>
            <p><strong>Reviewer:</strong> ${review.reviewer_name || 'Unknown'}</p>
            <p>${review.review_text}</p>
            <p><strong>Rating:</strong> ${'⭐'.repeat(review.rating)}</p>
        `;

        const userData = localStorage.getItem("user_data");
        const user = userData ? JSON.parse(userData) : null;

        if (user && (user.role === "admin" || user.id === review.user_id)) {
            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("review-buttons");

            if (user.id === review.user_id) { // Only show edit for the user's own reviews
                const editBtn = document.createElement("button");
                editBtn.classList.add("edit-btn-review");
                editBtn.textContent = "✏️ Edit";
                editBtn.onclick = () => showEditReviewForm(review);
                buttonContainer.appendChild(editBtn);
            }

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn-review");
            deleteBtn.textContent = "🗑️ Delete";
            deleteBtn.onclick = () => deleteReview(review.id);
            buttonContainer.appendChild(deleteBtn);

            card.appendChild(buttonContainer);
        }

        container.appendChild(card);
    });
}

function showOrHideReviewForm() {
    const form = document.querySelector(".add-review");
    const userData = localStorage.getItem("user_data");
    const user = userData ? JSON.parse(userData) : null;
    if (form && user && (user.role === "admin" || user.role === "guest")) {
        form.style.display = "block";
    } else if (form) {
        form.style.display = "none";
    }
}

window.addReview = function () {
    const title = document.getElementById("reviewTitle").value;
    const content = document.getElementById("reviewContent").value;
    const rating = document.getElementById("reviewRating").value;
    // Removed imageInput
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const userId = userData.id;
    const reviewerName = userData.username;

    if (!title || !content) { // Removed image validation
        alert("Please fill out all fields!");
        return;
    }

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("title", title);
    formData.append("review_text", content);
    formData.append("rating", rating);
    // Removed formData.append("image", ...)
    formData.append("reviewer_name", reviewerName);
    formData.append("car_id", null); // Ensure car_id is explicitly null

    fetch("/SelmaKarasoftic/WebProgramming/backend/reviews", {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": localStorage.getItem("user_token")
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Review added successfully!");
            fetchAndRenderReviews();
            document.getElementById('reviewTitle').value = '';
            document.getElementById('reviewContent').value = '';
            document.getElementById('reviewRating').value = '5';
            // Removed image input clear
        } else {
            alert("Failed to add review: " + (data.message || "Unknown error"));
        }
    })
    .catch(error => {
        alert("Failed to add review: " + error);
    });
}

function showEditReviewForm(review) {
    const modal = document.createElement("div");
    modal.classList.add("modal-overlay");
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Edit Review</h3>
            <form id="editReviewForm">
                <input type="text" id="editReviewTitle" placeholder="Review Title" value="${review.title}" required>
                <textarea id="editReviewContent" placeholder="Your Review" required>${review.review_text}</textarea>
                <select id="editReviewRating" required>
                    <option value="5" ${review.rating == 5 ? 'selected' : ''}>⭐⭐⭐⭐⭐</option>
                    <option value="4" ${review.rating == 4 ? 'selected' : ''}>⭐⭐⭐⭐☆</option>
                    <option value="3" ${review.rating == 3 ? 'selected' : ''}>⭐⭐⭐☆☆</option>
                    <option value="2" ${review.rating == 2 ? 'selected' : ''}>⭐⭐☆☆☆</option>
                    <option value="1" ${review.rating == 1 ? 'selected' : ''}>⭐☆☆☆☆</option>
                </select>
                <div class="modal-buttons">
                    <button type="submit">Save Changes</button>
                    <button type="button" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("editReviewForm").addEventListener("submit", function(e) {
        e.preventDefault();
        updateReview(review.id);
    });
}

function closeModal() {
    const modal = document.querySelector(".modal-overlay");
    if (modal) {
        modal.remove();
    }
}

function updateReview(reviewId) {
    const title = document.getElementById("editReviewTitle").value;
    const content = document.getElementById("editReviewContent").value;
    const rating = document.getElementById("editReviewRating").value;

    if (!title || !content) {
        alert("Please fill all required fields!");
        return;
    }

    const reviewData = {
        title: title,
        review_text: content,
        rating: parseInt(rating)
    };

    ReviewService.updateReview(reviewId, reviewData,
        function(result) {
            if (result && result.success) {
                alert("Review updated successfully!");
                closeModal();
                fetchAndRenderReviews();
            } else {
                alert("Failed to update review: " + (result.message || "Unknown error"));
            }
        },
        function(xhr) {
            alert("Failed to update review: " + xhr.responseText);
        }
    );
}

function deleteReview(id) {
    if (!confirm("Are you sure you want to delete this review?")) return;

    ReviewService.deleteReview(id,
        function(result) {
            if (result && result.success) {
                fetchAndRenderReviews();
                alert("Review deleted successfully!");
            } else {
                alert("Failed to delete review: " + (result.message || "Unknown error"));
            }
        },
        function(xhr) {
            alert("Failed to delete review: " + xhr.responseText);
        }
    );
}

$(document).ready(function() {
    // Initialize form validation
    $("#review-form").validate({
        rules: {
            reviewTitle: {
                required: true,
                minlength: 3
            },
            reviewContent: {
                required: true,
                minlength: 10
            },
            reviewRating: {
                required: true,
                number: true,
                min: 1,
                max: 5
            }
        },
        messages: {
            reviewTitle: {
                required: "Please enter a title for your review",
                minlength: "Title must be at least 3 characters long"
            },
            reviewContent: {
                required: "Please write your review",
                minlength: "Review must be at least 10 characters long"
            },
            reviewRating: {
                required: "Please select a rating",
                number: "Please enter a valid number",
                min: "Rating must be at least 1",
                max: "Rating cannot be more than 5"
            }
        },
        submitHandler: function(form) {
            event.preventDefault();
            addReview();
            return false;
        }
    });

    // Initialize reviews page
    if (window.location.hash === "#reviews") {
        initReviews();
    }
});