(() => {
  "use strict";

  // Scroll reveals are purely presentational; the page works without JavaScript too.
  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Native horizontal scrolling + scroll snapping powers the screenshot gallery.
  const gallery = document.querySelector("[data-gallery]");
  const galleryStatus = document.querySelector("[data-gallery-status]");
  if (gallery && galleryStatus) {
    const updateGalleryStatus = () => {
      const maxScroll = Math.max(1, gallery.scrollWidth - gallery.clientWidth);
      const percent = Math.round((gallery.scrollLeft / maxScroll) * 100);
      galleryStatus.textContent = percent >= 95 ? "END" : percent <= 5 ? "SCROLL TO EXPLORE" : "KEEP EXPLORING";
    };
    gallery.addEventListener("scroll", updateGalleryStatus, { passive: true });
    window.addEventListener("resize", updateGalleryStatus, { passive: true });
    updateGalleryStatus();
  }
})();