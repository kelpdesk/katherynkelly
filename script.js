// Mobile Nav Toggle
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    mobileNav.style.display = mobileNav.style.display === "block" ? "none" : "block";
  });

  // Hide mobile nav when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      mobileNav.style.display = "none";
    }
  });
}

// Update footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Fade-in on scroll for sections with .fade-section
const fadeSections = document.querySelectorAll(".fade-section");

if ("IntersectionObserver" in window && fadeSections.length) {
  const fadeObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // only fade in once
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeSections.forEach(section => fadeObserver.observe(section));
} else {
  fadeSections.forEach(section => section.classList.add("visible"));
}

// Header shrink on scroll
const header = document.querySelector("header");
const shrinkOffset = 30;

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > shrinkOffset) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  });
}

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(
  'header .desktop-nav a[href^="#"], #mobile-nav a[href^="#"]'
);

if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(link => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  sections.forEach(section => navObserver.observe(section));
}
