function toggleFavorite(button) {
    if (button.classList.contains("favorited")) {
        button.innerHTML = "❤️ Favorite";
        button.style.backgroundColor = "#ff4d4d";
    } else {
        button.innerHTML = "💖 Favorited!";
        button.style.backgroundColor = "#00C851";
    }
    button.classList.toggle("favorited");
}

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

function addNewCar() {
    let model = document.getElementById("carModel").value;
    let year = document.getElementById("carYear").value;
    let engine = document.getElementById("engine").value;
    let horsepower = document.getElementById("horsepower").value;
    let imageInput = document.getElementById("carImages");

    if (!model || !year || !engine || !horsepower || imageInput.files.length === 0) {
        alert("Please fill out all fields and upload at least one image!");
        return;
    }

    let carContainer = document.getElementById("carsContainer");
    let newCar = document.createElement("div");
    newCar.classList.add("car-card");

    let galleryDiv = document.createElement("div");
    galleryDiv.classList.add("image-gallery");

    let prevBtn = document.createElement("button");
    prevBtn.classList.add("prev");
    prevBtn.innerHTML = "&#10094;";
    prevBtn.onclick = function () { prevImage(prevBtn); };

    let nextBtn = document.createElement("button");
    nextBtn.classList.add("next");
    nextBtn.innerHTML = "&#10095;";
    nextBtn.onclick = function () { nextImage(nextBtn); };

    galleryDiv.appendChild(prevBtn);

    let firstImageSet = false;
    for (let file of imageInput.files) {
        let reader = new FileReader();
        reader.onload = function (event) {
            let img = document.createElement("img");
            img.src = event.target.result;

            if (!firstImageSet) {
                img.classList.add("active"); // First image is visible
                firstImageSet = true;
            }

            galleryDiv.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    galleryDiv.appendChild(nextBtn);

    setTimeout(() => {
        newCar.innerHTML += `<h3>${model}</h3>
                             <p>Year: ${year}</p>
                             <p>Engine: ${engine}</p>
                             <p>Horsepower: ${horsepower}</p>
                             <button onclick="toggleFavorite(this)">❤️ Favorite</button>`;
        newCar.insertBefore(galleryDiv, newCar.firstChild); 
        carContainer.appendChild(newCar);
    }, 500);

    // Clear input fields
    document.getElementById("carModel").value = "";
    document.getElementById("carYear").value = "";
    document.getElementById("engine").value = "";
    document.getElementById("horsepower").value = "";
    document.getElementById("carImages").value = "";
}
