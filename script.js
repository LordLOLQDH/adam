document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("footer-year").textContent = new Date().getFullYear();
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
} else {
  items.forEach((item) => item.classList.add("visible"));
}
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  const submitButton = contactForm.querySelector("button[type='submit']");
  const status = document.getElementById("form-status");
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    submitButton.disabled = true;
    status.textContent = "Sending your message…";
    try {
      const response = await fetch("https://formsubmit.co/ajax/adam_kraus@icloud.com", {
        method: "POST",
        body: new FormData(contactForm),
        headers: { "Accept": "application/json" }
      });
      const result = await response.json();
      if (!response.ok || result.success === "false" || result.success === false) {
        throw new Error(result.message || "Message could not be sent.");
      }
      contactForm.reset();
      status.textContent = "Message sent. Thanks for reaching out!";
    } catch (error) {
      status.textContent = "Sending failed. Please try again later.";
    } finally {
      submitButton.disabled = false;
    }
  });
}
