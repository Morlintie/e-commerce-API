document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll
  document.querySelectorAll('.sidebar a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Toggle functionality
  document.querySelectorAll(".toggle-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const target = document.getElementById(targetId);
      if (target) {
        target.style.display =
          target.style.display === "block" ? "none" : "block";
      }
    });
  });
});
