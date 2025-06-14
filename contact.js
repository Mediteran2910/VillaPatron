// (function () {
//   emailjs.init("AN4_T3f-H85b7z8dK");
// })();

// function sendEmail() {
//   const from_name = document.getElementById("name").value.trim();
//   const from_surname = document.getElementById("surname").value.trim();
//   const message = document.getElementById("message").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const phoneNum = document.getElementById("phone").value.trim();

//   if (!from_name || !from_surname || !message || !email || !phoneNum) {
//     document.getElementById("status-message").innerText =
//       "Please fill out all fields.";
//     return;
//   }

//   emailjs
//     .send("service_iwr0hfb", "template_f6428q8", {
//       to_name: "Ana",
//       from_name: from_name,
//       from_surname: from_surname,
//       message: message,
//       from_email: email,
//       from_phone: phoneNum,
//     })
//     .then(() => {
//       document.getElementById("status-message").innerText =
//         "Email sent successfully!";
//     })
//     .catch((error) => {
//       console.log(error);
//       document.getElementById("status-message").innerText =
//         "Error sending email, we are having the problems with server, you can contact us on email or phone number below ";
//     });
// }

const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const message = document.getElementById("message");
const formButton = document.getElementsByClassName("send-email-btn");

const respondMessage = async (response, responseData) => {
  const messageElement = document.createElement("p");
  messageElement.textContent = "Sending message...";
  if (response.ok && responseData.success) {
    messageElement.textContent =
      responseData.message || "Message sent succesfully";
  } else if (responseData) {
    messageElement.textContent =
      responseData.message || "Failed to send message.";
  } else {
    messageElement.textContent = "An unexpected error occurred.";
  }
  contactForm.appendChild(messageElement);

  setTimeout(() => {
    contactForm.removeChild(messageElement);
  }, 3500);
};

contactForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  let infoObj = {
    name: nameInput.value,
    surname: surnameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    message: message.value,
  };

  try {
    const response = await fetch(
      "https://email-service-yarn.onrender.com/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ infoObj }),
      }
    );
    const responseData = await response.json();
    respondMessage(response, responseData);
  } catch (error) {
    console.log("Error:", error);
    respondMessage({
      success: false,
      message: "An error occurred while sending the message",
    });
  }
});

nameInput.addEventListener("focus", () => {
  console.log("Input is focused");
  fetch("https://email-service-yarn.onrender.com/wake-me-up").catch((err) =>
    console.error("Waking server failed", err)
  );
});

document.addEventListener("DOMContentLoaded", () => {
  const priceWrappers = document.querySelectorAll(".price-wrapper");

  const observerOptions = {
    root: null,
    threshold: 0.3,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("swing-in-top-fwd");
        observer.unobserve(entry.target);
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
