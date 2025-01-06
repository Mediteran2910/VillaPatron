const carouselTrack = document.querySelector(".carousel-track");
const carouselItems = Array.from(document.querySelectorAll(".carousel-item"));
const prevButton = document.querySelector("#prev-btn");
const nextButton = document.querySelector("#next-btn");

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeButton = document.querySelector(".close-btn");

const modalPrevButton = document.querySelector("#modal-prev-btn");
const modalNextButton = document.querySelector("#modal-next-btn");

let currentIndex = 0;
let startX = 0; // For swipe functionality

// Update the carousel display
function updateCarousel() {
  carouselItems.forEach((item, index) => {
    item.classList.remove(
      "center",
      "left",
      "right",
      "far-left",
      "far-right",
      "hidden"
    );

    if (index === currentIndex) {
      item.classList.add("center");
    } else if (
      index ===
      (currentIndex - 1 + carouselItems.length) % carouselItems.length
    ) {
      item.classList.add("left");
    } else if (index === (currentIndex + 1) % carouselItems.length) {
      item.classList.add("right");
    } else if (
      index ===
      (currentIndex - 2 + carouselItems.length) % carouselItems.length
    ) {
      item.classList.add("far-left");
    } else if (index === (currentIndex + 2) % carouselItems.length) {
      item.classList.add("far-right");
    } else {
      item.classList.add("hidden");
    }
  });
}

// Move to the previous image
prevButton.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel();
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
});

// Initialize the carousel
updateCarousel();

// Handle clicking on carousel item to enlarge the image
carouselItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    modal.style.display = "flex"; // Show the modal
    modalImage.src = item.src; // Set the clicked image to the modal
    currentIndex = index; // Update current index
    updateModalImage();
  });
});

// Update the modal image based on the current index
function updateModalImage() {
  modalImage.src = carouselItems[currentIndex].src;
}

// Modal navigation
modalPrevButton.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateModalImage();
});

modalNextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateModalImage();
});

// Swipe for modal
modalImage.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

modalImage.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    modalNextButton.click();
  } else if (endX - startX > 50) {
    modalPrevButton.click();
  }
});

// Swipe for carousel
carouselTrack.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carouselTrack.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    nextButton.click();
  } else if (endX - startX > 50) {
    prevButton.click();
  }
});

// Close the modal
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Intersection Observer options
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

// Offerings Animation
const offeringsTitle = document.querySelector("#offerings-title");
const firstBlockParagraph = document.querySelector("#first-block p");
const firstBlockHr = document.querySelector("#first-block hr");
const firstBlockItems = [
  document.querySelector("#pool-offerings"),
  document.querySelector("#view-offerings"),
];
const secondBlockItems = [
  document.querySelector("#playgrond-offerings"),
  document.querySelector("#accomoditation-offerings"),
];

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (
        entry.target === offeringsTitle ||
        entry.target === firstBlockParagraph ||
        entry.target === firstBlockHr
      ) {
        entry.target.classList.add("slide-in-left");
      }

      if (firstBlockItems.includes(entry.target)) {
        entry.target.classList.add("slide-in-left");
      }

      if (secondBlockItems.includes(entry.target)) {
        entry.target.classList.add("slide-in-right");
      }
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, options);
observer.observe(offeringsTitle);
observer.observe(firstBlockParagraph);
observer.observe(firstBlockHr);
firstBlockItems.forEach((item) => observer.observe(item));
secondBlockItems.forEach((item) => observer.observe(item));

// Gallery Animation
const gallerySection =
  document.querySelector(".carousel-wrapper").parentElement;

const galleryHr = gallerySection.querySelector("hr");
const galleryTitle = gallerySection.querySelector("h3");
const galleryParagraph = gallerySection.querySelector("p");
const carouselWrapper = gallerySection.querySelector(".carousel-wrapper");

const galleryObserverCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (
        entry.target === galleryHr ||
        entry.target === galleryTitle ||
        entry.target === galleryParagraph
      ) {
        entry.target.classList.add("tracking-in-expand");
      }

      if (entry.target === galleryParagraph) {
        carouselWrapper.classList.add("scale-in-hor-center");
      }

      observer.unobserve(entry.target);
    }
  });
};

const galleryObserver = new IntersectionObserver(
  galleryObserverCallback,
  options
);

galleryObserver.observe(galleryHr);
galleryObserver.observe(galleryTitle);
galleryObserver.observe(galleryParagraph);
galleryObserver.observe(carouselWrapper);

// Dynamic text adjustment
function changeH1size() {
  const h1 = document.querySelector("#main-title");
  const titleParagraph = document.getElementById("paragraph-title");
  const journeyTitle = document.getElementById("start-journey-title");

  const screenWidth = window.innerWidth;

  if (screenWidth < 500) {
    h1.textContent = "Villa Jure";
    titleParagraph.textContent = "Tranquility made timeless";
    journeyTitle.textContent = "Start your dream.";
    galleryParagraph.textContent = "Explore beautiful spaces.";
    galleryTitle.textContent = "Villa's Gallery";
  } else if (screenWidth < 730) {
    h1.textContent = "Welcome to Villa Jure";
    titleParagraph.textContent = "Villa between sea and hills.";
    journeyTitle.textContent = "Your journey starts here.";
    galleryParagraph.textContent =
      "Explore our gallery for beautiful spaces and serenity.";
  } else {
    h1.textContent = "Experience Luxury at Villa Jure";
    titleParagraph.textContent =
      "Your dream getaway awaits in beautiful Kastela";
    journeyTitle.textContent = "Start your unforgettable journey.";
    galleryParagraph.textContent =
      "Browse through our gallery to see the villa's beautiful spaces and serene surroundings.";
    galleryTitle.textContent = "Check out our gallery!";
  }
}
window.addEventListener("resize", changeH1size);
changeH1size();

const menuIcon = document.getElementById("menu-icon");
const closeMenuIcon = document.querySelector(".close-icon-menu");
const mobileMenu = document.getElementsByClassName("nav-links")[0];

menuIcon.addEventListener("click", () => {
  mobileMenu.style.display = "flex";
});

closeMenuIcon.addEventListener("click", () => {
  mobileMenu.style.display = "none";
});
