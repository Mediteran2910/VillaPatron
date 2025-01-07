(function () {
  emailjs.init("AN4_T3f-H85b7z8dK");
})();

function sendEmail() {
  const from_name = document.getElementById("name").value.trim();
  const from_surname = document.getElementById("surname").value.trim();
  const message = document.getElementById("message").value.trim();
  const email = document.getElementById("email").value.trim();
  const phoneNum = document.getElementById("phone").value.trim();

  if (!from_name || !from_surname || !message || !email || !phoneNum) {
    document.getElementById("status-message").innerText =
      "Please fill out all fields.";
    return;
  }

  emailjs
    .send("service_iwr0hfb", "template_f6428q8", {
      to_name: "Ana",
      from_name: from_name,
      from_surname: from_surname,
      message: message,
      from_email: email,
      from_phone: phoneNum,
    })
    .then(() => {
      document.getElementById("status-message").innerText =
        "Email sent successfully!";
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("status-message").innerText =
        "Error sending email, we are having the problems with server, you can contact us on email or phone number below ";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const priceWrappers = document.querySelectorAll(".price-wrapper");

  const observerOptions = {
    root: null, // Use the viewport as the root
    threshold: 0.3, // Trigger when 30% of the element is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("swing-in-top-fwd");
        observer.unobserve(entry.target); // Stop observing once animation starts
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  priceWrappers.forEach((wrapper) => observer.observe(wrapper));
});

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

  const screenWidth = window.innerWidth;

  if (screenWidth < 560) {
    h1.textContent = "Escape Awaits";
    titleParagraph.textContent = "Where luxury meets ease.";
  } else if (screenWidth < 730) {
    h1.textContent = "Your Paradise Awaits";
    // titleParagraph.textContent = "Villa between sea and hills.";
  } else {
    h1.textContent = "Reserve Your Slice of Paradise";
    titleParagraph.textContent = "Where luxury meets effortless relaxation.";
  }
}
window.addEventListener("resize", changeH1size);
changeH1size();
