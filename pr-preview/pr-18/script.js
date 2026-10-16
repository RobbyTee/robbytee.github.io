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
