const defaultCars = [
    {
        model: "Audi RS7",
        year: "2021",
        engine: "Twin-Turbo 4.0L V8",
        horsepower: "730HP",
        images: [
            "assets/images/audi.jpg",
            "assets/images/audi2.jpg",
            "assets/images/audi3.jpg",
            "assets/images/audi4.jpg"
        ]
    }
];

let cars = JSON.parse(localStorage.getItem("cars")) || defaultCars;

function initCars() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const form = document.querySelector(".add-car");
    
    if (user && user.role !== "admin") {
        if (form) form.style.display = "none";
    }
    
    renderCars();
}

function renderCars() {
    const container = document.getElementById("carsContainer");
    if (!container) return;
    
    container.innerHTML = "";

    cars.forEach((car, index) => {
        const card = document.createElement("div");
        card.classList.add("car-card");

        // Create Image Gallery
        const galleryDiv = document.createElement("div");
        galleryDiv.classList.add("image-gallery");

        car.images.forEach((imgSrc, idx) => {
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
            <h3>${car.model}</h3>
            <p>Year: ${car.year}</p>
            <p>Engine: ${car.engine}</p>
            <p>Horsepower: ${car.horsepower}</p>
        `;

        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (user && user.role === "admin") {
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn-cars");
            deleteBtn.textContent = "🗑️ Delete";
            deleteBtn.onclick = () => {
                cars.splice(index, 1);
                localStorage.setItem("cars", JSON.stringify(cars));
                renderCars();
            };
            card.appendChild(deleteBtn);
        }

        card.insertBefore(galleryDiv, card.firstChild);
        container.appendChild(card);
    });
}

async function addNewCar() {
    const model = document.getElementById("carModel").value;
    const year = document.getElementById("carYear").value;
    const engine = document.getElementById("engine").value;
    const horsepower = document.getElementById("horsepower").value;
    const imageInput = document.getElementById("carImages");

    if (!model || !year || !engine || !horsepower || imageInput.files.length === 0) {
        alert("Please fill all fields and add at least one image!");
        return;
    }

    const images = await Promise.all(
        Array.from(imageInput.files).map(file => toBase64(file))
    );

    const newCar = { model, year, engine, horsepower, images };

    cars.push(newCar);
    localStorage.setItem("cars", JSON.stringify(cars));

    renderCars();

    document.getElementById("carModel").value = "";
    document.getElementById("carYear").value = "";
    document.getElementById("engine").value = "";
    document.getElementById("horsepower").value = "";
    document.getElementById("carImages").value = "";
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

$(document).on("spapp:ready", function () {
    if (window.location.hash === "#cars") {
        initCars();
    }
});
