// Smooth scroll for internal links, mobile nav toggle, project card interactions
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", href);
        }
      }
    });
  });

  // Mobile nav toggle
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");
  navToggle &&
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

  // Project card expand/collapse
  document.querySelectorAll(".project-card").forEach((card) => {
    const btn = card.querySelector(".expand");
    const details = card.querySelector(".card-details");
    btn &&
      btn.addEventListener("click", () => {
        const open = details.classList.toggle("open");
        btn.textContent = open ? "Hide" : "Details";
      });
  });

  // Gentle reveal on scroll for sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document
    .querySelectorAll(".section, .project-card, .hero-copy")
    .forEach((el) => observer.observe(el));
});
