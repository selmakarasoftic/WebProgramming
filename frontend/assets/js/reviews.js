function prevImage(button) {
    let gallery = button.parentElement;
    let images = gallery.querySelectorAll("img");
    let index = Array.from(images).findIndex(img => img.classList.contains("active"));

    if (index === -1 || images.length === 0) return;

    images[index].classList.remove("active");
    index = (index - 1 + images.length) % images.length;
    images[index].classList.add("active");
}

function nextImage(button) {
    let gallery = button.parentElement;
    let images = gallery.querySelectorAll("img");
    let index = Array.from(images).findIndex(img => img.classList.contains("active"));

    if (index === -1 || images.length === 0) return;

    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
}

function addReview() {
    const name = document.getElementById('reviewerName').value;
    const title = document.getElementById('reviewTitle').value;
    const content = document.getElementById('reviewContent').value;
    const rating = document.getElementById('reviewRating').value;
    const imageInput = document.getElementById('reviewImages');

    if (!name || !title || !content || imageInput.files.length === 0) {
        alert("Please fill out all fields and upload at least one image!");
        return;
    }

    const reviewContainer = document.getElementById('reviewsContainer');
    const newReview = document.createElement('div');
    newReview.classList.add('review-card');

    const galleryDiv = document.createElement('div');
    galleryDiv.classList.add('image-gallery');

    const prevBtn = document.createElement('button');
    prevBtn.classList.add('prev');
    prevBtn.innerHTML = "&#10094;";
    prevBtn.onclick = function () { prevImage(prevBtn); };

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('next');
    nextBtn.innerHTML = "&#10095;";
    nextBtn.onclick = function () { nextImage(nextBtn); };

    galleryDiv.appendChild(prevBtn);

    let firstImageSet = false;
    for (let file of imageInput.files) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = document.createElement('img');
            img.src = event.target.result;

            if (!firstImageSet) {
                img.classList.add('active');
                firstImageSet = true;
            }

            galleryDiv.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    galleryDiv.appendChild(nextBtn);

    setTimeout(() => {
        newReview.innerHTML += `
            <h3>${title}</h3>
            <p><strong>Reviewer:</strong> ${name}</p>
            <p>${content}</p>
            <p><strong>Rating:</strong> ${'⭐'.repeat(rating)}${'☆'.repeat(5 - rating)}</p>
        `;
        newReview.insertBefore(galleryDiv, newReview.firstChild);
        reviewContainer.appendChild(newReview);
    }, 500);

    // Clear the inputs
    document.getElementById('reviewerName').value = '';
    document.getElementById('reviewTitle').value = '';
    document.getElementById('reviewContent').value = '';
    document.getElementById('reviewRating').value = '5';
    document.getElementById('reviewImages').value = '';
}
