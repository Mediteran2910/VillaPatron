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

// Define the intersection observer options
const options = {
  rootMargin: "0px 0px -50px 0px",
  threshold: 0.3, // 50% of the element must be visible to trigger the animation
};

// Function to add animation classes for various elements
const handleIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Handling for articles
      if (entry.target.classList.contains("offerings-description")) {
        const image = entry.target.querySelector("img");
        const text = entry.target.querySelector(".offerings-text");

        if (
          entry.target ===
          document.querySelector(".offerings-description:nth-of-type(1)")
        ) {
          image.classList.add("slide-in-right");
          text.classList.add("slide-in-left");
        } else if (
          entry.target ===
          document.querySelector(".offerings-description:nth-of-type(2)")
        ) {
          image.classList.add("slide-in-left");
          text.classList.add("slide-in-right");
        } else if (
          entry.target ===
          document.querySelector(".offerings-description:nth-of-type(3)")
        ) {
          image.classList.add("slide-in-right");
          text.classList.add("slide-in-left");
        }
      }

      // // Handling for icon-section
      // if (entry.target.classList.contains("icon-section")) {
      //   entry.target.classList.add("focus-in-expand-fwd");
      // }

      // Handling for gallery (hr, h3, p)
      if (
        entry.target.classList.contains("gallery-hr") ||
        entry.target.classList.contains("gallery-title") ||
        entry.target.classList.contains("gallery-description")
      ) {
        entry.target.classList.add("tracking-in-expand");
      }

      // Handling for carousel-wrapper
      if (entry.target.classList.contains("carousel-wrapper")) {
        entry.target.classList.add("scale-in-hor-center");
      }

      observer.unobserve(entry.target); // Stop observing once animation is triggered
    }
  });
};

// Create an intersection observer instance
const observer = new IntersectionObserver(handleIntersect, options);

// Target elements to observe
const offeringsDescription1 = document.querySelector(
  ".offerings-description:nth-of-type(1)"
);
const offeringsDescription2 = document.querySelector(
  ".offerings-description:nth-of-type(2)"
);
const offeringsDescription3 = document.querySelector(
  ".offerings-description:nth-of-type(3)"
);

const iconSection = document.querySelector(".icon-section");
const hrElement = document.querySelector(".gallery-hr");

// IntersectionObserver setup remains the same as beforer

// Start observing the elements
observer.observe(offeringsDescription1);
observer.observe(offeringsDescription2);
observer.observe(offeringsDescription3);
observer.observe(iconSection);

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

observer.observe(hrElement);
galleryObserver.observe(galleryHr);
galleryObserver.observe(galleryTitle);
galleryObserver.observe(galleryParagraph);
galleryObserver.observe(carouselWrapper);

const menuIcon = document.getElementById("menu-icon");
const closeMenuIcon = document.querySelector(".close-icon-menu");
const mobileMenu = document.getElementsByClassName("nav-links")[0];

menuIcon.addEventListener("click", () => {
  mobileMenu.style.display = "flex";
});

closeMenuIcon.addEventListener("click", () => {
  mobileMenu.style.display = "none";
});

function changeH1size() {
  const h1 = document.querySelector("#main-title");
  const titleParagraph = document.getElementById("paragraph-title");
  const journeyTitle = document.getElementById("start-journey-title");

  const screenWidth = window.innerWidth;

  if (screenWidth < 500) {
    h1.textContent = "Jure Charm";
    titleParagraph.textContent = "A peaceful oasis in Dalmatia.";

    galleryParagraph.textContent = "Explore beautiful spaces.";
    galleryTitle.textContent = "Villa's Gallery";
  } else if (screenWidth < 730) {
    h1.textContent = "Charm of Villa Jure";

    galleryParagraph.textContent =
      "Explore our gallery for beautiful spaces and serenity.";
  } else {
    h1.textContent = "Discover the charm of Villa Jure";
    titleParagraph.textContent = "An oasis of peace in the heart of Dalmatia.";

    galleryParagraph.textContent =
      "Browse through our gallery to see the villa's beautiful spaces and serene surroundings.";
    galleryTitle.textContent = "Check out our gallery!";
  }
}
window.addEventListener("resize", changeH1size);
changeH1size();
