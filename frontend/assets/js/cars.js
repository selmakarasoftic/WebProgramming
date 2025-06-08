import CarService from '../../services/car-service.js';

function initCars() {
    const userData = localStorage.getItem("user_data");
    const user = userData ? JSON.parse(userData) : null;
    const form = document.querySelector(".add-car");
    if (user && user.role !== "admin") {
        if (form) form.style.display = "none";
    }
    fetchAndRenderCars();
}

function fetchAndRenderCars() {
    CarService.getAllCars(
        function(result) {
            // Accept both array and object with data property
            if (Array.isArray(result)) {
                renderCars(result);
            } else if (result && result.data && Array.isArray(result.data)) {
                renderCars(result.data);
            } else {
                console.error("Invalid response format:", result);
                alert("Failed to fetch cars: Invalid response format");
            }
        },
        function(xhr) {
            console.error("Failed to fetch cars:", xhr.responseText);
            alert("Failed to fetch cars: " + xhr.responseText);
        }
    );
}

function renderCars(cars) {
    const container = document.getElementById("carsContainer");
    if (!container) return;
    container.innerHTML = "";
    
    cars.forEach((car) => {
        const card = document.createElement("div");
        card.classList.add("car-card");
        
        // Create Image Gallery
        const galleryDiv = document.createElement("div");
        galleryDiv.classList.add("image-gallery");
        
        // Handle single image or multiple images
        const images = car.image_url ? [car.image_url] : [];
        images.forEach((imgSrc, idx) => {
            const img = document.createElement("img");
            img.src = imgSrc;
            if (idx === 0) img.classList.add("active");
            galleryDiv.appendChild(img);
        });
        
        // Add navigation buttons if there are images
        if (images.length > 1) {
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
        }
        
        // Create car details
        card.innerHTML = `
            <h3>${car.model}</h3>
            <p>Year: ${car.year}</p>
            <p>Engine: ${car.engine}</p>
            <p>Horsepower: ${car.horsepower}</p>
            <p>Added by: ${car.uploader || 'Unknown'}</p>
        `;
        
        // Add buttons for admin users
        const userData = localStorage.getItem("user_data");
        const user = userData ? JSON.parse(userData) : null;
        if (user && user.role === "admin") {
            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("admin-buttons");
            
            const editBtn = document.createElement("button");
            editBtn.classList.add("edit-btn-cars");
            editBtn.textContent = "✏️ Edit";
            editBtn.onclick = () => showEditForm(car);
            
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn-cars");
            deleteBtn.textContent = "🗑️ Delete";
            deleteBtn.onclick = () => deleteCar(car.id);
            
            buttonContainer.appendChild(editBtn);
            buttonContainer.appendChild(deleteBtn);
            card.appendChild(buttonContainer);
        }
        
        // Add gallery to card
        if (images.length > 0) {
            card.insertBefore(galleryDiv, card.firstChild);
        }
        
        container.appendChild(card);
    });
}

function addNewCar() {
    const model = document.getElementById("carModel").value;
    const year = document.getElementById("carYear").value;
    const engine = document.getElementById("engine").value;
    const horsepower = document.getElementById("horsepower").value;
    const imageInput = document.getElementById("carImages");
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const userId = userData.id;

    if (!model || !year || !engine || !horsepower || imageInput.files.length === 0) {
        alert("Please fill all fields and add at least one image!");
        return;
    }

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("model", model);
    formData.append("year", year);
    formData.append("engine", engine);
    formData.append("horsepower", horsepower);
    formData.append("image", imageInput.files[0]);

    fetch("/SelmaKarasoftic/WebProgramming/backend/cars", {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": localStorage.getItem("user_token")
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Car added successfully!");
            fetchAndRenderCars();
        } else {
            alert("Failed to add car: " + (data.message || "Unknown error"));
        }
    })
    .catch(error => {
        alert("Failed to add car: " + error);
    });
}

function deleteCar(id) {
    if (!confirm("Are you sure you want to delete this car?")) return;
    
    CarService.deleteCar(id,
        function(result) {
            if (result && result.success) {
                fetchAndRenderCars();
                alert("Car deleted successfully!");
            } else {
                alert("Failed to delete car: " + (result.message || "Unknown error"));
            }
        },
        function(xhr) {
            alert("Failed to delete car: " + xhr.responseText);
        }
    );
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
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

function showEditForm(car) {
    // Create modal overlay
    const modal = document.createElement("div");
    modal.classList.add("modal-overlay");
    
    // Create modal content
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Edit Car</h3>
            <form id="editCarForm">
                <input type="text" id="editCarModel" placeholder="Car Model" value="${car.model}" required>
                <input type="number" id="editCarYear" placeholder="Year" min="1886" max="2024" value="${car.year}" required>
                <input type="text" id="editEngine" placeholder="Engine" value="${car.engine}" required>
                <input type="number" id="editHorsepower" placeholder="Horsepower" min="1" value="${car.horsepower}" required>
                <input type="file" id="editCarImages" accept="image/*">
                <div class="modal-buttons">
                    <button type="submit">Save Changes</button>
                    <button type="button" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    document.getElementById("editCarForm").addEventListener("submit", function(e) {
        e.preventDefault();
        updateCar(car.id);
    });
}

function closeModal() {
    const modal = document.querySelector(".modal-overlay");
    if (modal) {
        modal.remove();
    }
}

function updateCar(carId) {
    const model = document.getElementById("editCarModel").value;
    const year = document.getElementById("editCarYear").value;
    const engine = document.getElementById("editEngine").value;
    const horsepower = document.getElementById("editHorsepower").value;
    const imageInput = document.getElementById("editCarImages");

    if (!model || !year || !engine || !horsepower) {
        alert("Please fill all required fields!");
        return;
    }

    const formData = new FormData();
    formData.append("model", model);
    formData.append("year", year);
    formData.append("engine", engine);
    formData.append("horsepower", horsepower);
    
    if (imageInput.files.length > 0) {
        formData.append("image", imageInput.files[0]);
    }

    CarService.updateCar(carId, formData,
        function(result) {
            if (result && result.success) {
                alert("Car updated successfully!");
                closeModal();
                fetchAndRenderCars();
            } else {
                alert("Failed to update car: " + (result.message || "Unknown error"));
            }
        },
        function(xhr) {
            alert("Failed to update car: " + xhr.responseText);
        }
    );
}

// Initialize cars page when hash changes
$(document).ready(function() {
    if (window.location.hash === "#cars") {
        initCars();
    }
});

window.addNewCar = addNewCar;
window.initCars = initCars;
