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

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());
    payload._subject = "New message from adam.is-a-fullstack.dev";
    payload._replyto = payload.email;
    payload._captcha = "true";

    submitButton.disabled = true;
    status.textContent = "Sending your message…";

    try {
      const response = await fetch("https://formsubmit.co/ajax/adam_kraus@icloud.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok || String(result.success) !== "true") {
        throw new Error(result.message || "The form service rejected the message.");
      }

      contactForm.reset();
      status.textContent = "Message sent successfully. Thanks for reaching out!";
    } catch (error) {
      console.error("Contact form error:", error);
      status.textContent = error.message || "Sending failed. Please try again later.";
    } finally {
      submitButton.disabled = false;
    }
  });
}
