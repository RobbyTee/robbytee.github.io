// Mobile menu toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open", !open);
});

// Close the menu with Escape and return focus to the button
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
    toggle.focus();
  }
});

// Close the menu after picking a section
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: sent through FormSubmit's AJAX endpoint so the visitor stays on
// the page and sees a confirmation (or the reason it failed) right above the form.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/contact@chamberlaincfo.com";
const form = document.getElementById("contact-form");
const submitButton = form.querySelector('button[type="submit"]');
const success = document.getElementById("form-success");
const failure = document.getElementById("form-error");

// Fallback for the no-JavaScript plain POST: come back to this page and say thanks
form.elements._next.value = location.origin + location.pathname + "?sent=1#contact";
if (new URLSearchParams(location.search).has("sent")) success.hidden = false;

function showFailure(reason) {
  failure.textContent = "Sorry, your message could not be sent" + (reason ? " (" + reason + ")" : "") +
    ". Please call (704) 666-5586 or email contact@chamberlaincfo.com.";
  failure.hidden = false;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  success.hidden = true;
  failure.hidden = true;
  submitButton.disabled = true;
  submitButton.textContent = "Sending…";

  const data = Object.fromEntries(new FormData(form));
  delete data._next;

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json().catch(() => ({}));
    if (response.ok && String(result.success) === "true") {
      form.reset();
      success.hidden = false;
      success.scrollIntoView({ block: "nearest", behavior: "smooth" });
    } else {
      showFailure(result.message || "error " + response.status);
    }
  } catch (err) {
    showFailure("network error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
  }
});
