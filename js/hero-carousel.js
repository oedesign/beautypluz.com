/* =========================================================
   BEAUTY PLUZ — HERO-CAROUSEL.JS
   Data-driven, auto-rotating homepage carousel. Edit the SLIDES
   array below to add, remove, reorder, or update slides. Each slide
   references a local asset in images/hero/; carousel behaviour lives
   separately below and does not need to change when the data changes.
   ========================================================= */

(function () {
  "use strict";

  /**
   * Homepage hero slide data.
   *
   * To add, remove, or reorder slides, edit only this array. Every image is a
   * local asset in images/hero/. `image.position` controls the focal point when
   * responsive object-fit cropping is needed (for example: "65% center").
   */
  const SLIDES = [
    {
      id: "slow-mornings",
      image: { src: "images/hero/hero-1.jpeg", position: "center" },
      theme: "",
      eyebrow: "",
      heading: "",
      description:
        "",
      primaryCta: { label: "Shop Now", href: "shop.html" },
      secondaryCta: { label: "Explore Collection", href: "shop.html" },
      align: "left",
    },
    {
      id: "your-ritual",
      image: { src: "images/hero/hero-2.jpeg", position: "center" },
      theme: "",
      eyebrow: "",
      heading: "",
      description:
        "",
      primaryCta: { label: "Shop Skincare", href: "shop.html" },
      secondaryCta: null,
      align: "left",
    },
    {
      id: "new-arrivals",
      image: { src: "images/hero/hero-3.jpeg", position: "center" },
      theme: "",
      eyebrow: "",
      heading: "",
      description:
        ".",
      primaryCta: { label: "Shop New Arrivals", href: "shop.html" },
      secondaryCta: null,
      align: "right",
    },
    {
      id: "new-arrivals",
      image: { src: "images/hero/hero-4.jpeg", position: "center" },
      theme: "",
      eyebrow: "",
      heading: "",
      description:
        ".",
      primaryCta: { label: "Shop New Arrivals", href: "shop.html" },
      secondaryCta: null,
      align: "right",
    },
    {
      id: "new-arrivals",
      image: { src: "images/hero/hero-5.jpeg", position: "center" },
      theme: "",
      eyebrow: "",
      heading: "",
      description:
        ".",
      primaryCta: { label: "Shop New Arrivals", href: "shop.html" },
      secondaryCta: null,
      align: "right",
    },
  ];

  const THEME_GRADIENTS = {
    sage: "linear-gradient(135deg, #4f5f49 0%, #262420 100%)",
    rose: "linear-gradient(135deg, #96525d 0%, #262420 100%)",
    blush: "linear-gradient(135deg, #c98f7d 0%, #262420 100%)",
  };

  const AUTOPLAY_INTERVAL_MS = 5500;

  function renderCta(cta, variant) {
    if (!cta) return "";
    return `<a href="${cta.href}" class="btn ${variant}">${cta.label}</a>`;
  }

  function renderSlide(slide, index, total) {
    const alignClass =
      slide.align === "right" ? " hero-carousel__slide--align-right" : "";

    return `
      <div
        class="hero-carousel__slide${alignClass}"
        data-slide-index="${index}"
        role="group"
        aria-roledescription="slide"
        aria-label="Slide ${index + 1} of ${total}"
        aria-hidden="${index === 0 ? "false" : "true"}"
      >
        <div
          class="hero-carousel__media"
          data-theme="${slide.theme}"
          style="background: ${THEME_GRADIENTS[slide.theme] || THEME_GRADIENTS.sage};"
          aria-hidden="true"
        >
          <img
            class="hero-carousel__image"
            src="${slide.image.src}"
            alt=""
            style="object-position: ${slide.image.position || "center"};"
            ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
          >
        </div>
        <div class="hero-carousel__scrim" aria-hidden="true"></div>
        <div class="hero-carousel__content">
          <div class="hero-carousel__inner">
            <span class="eyebrow eyebrow--on-dark">${slide.eyebrow}</span>
            <h1 class="hero-carousel__heading">${slide.heading}</h1>
            <p class="hero-carousel__text">${slide.description}</p>
            <div class="hero-carousel__actions">
              ${renderCta(slide.primaryCta, "btn--rose")}
              ${renderCta(slide.secondaryCta, "btn--light")}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderDot(index, isActive) {
    return `
      <button
        type="button"
        class="hero-carousel__dot"
        data-dot-index="${index}"
        aria-label="Go to slide ${index + 1}"
        aria-current="${isActive ? "true" : "false"}"
      ></button>
    `;
  }


  function initHeroCarousel() {
    const root = document.querySelector("[data-hero-carousel]");
    if (!root) return;

    const track = root.querySelector("[data-carousel-track]");
    const dotsContainer = root.querySelector("[data-carousel-dots]");
    const prevBtn = root.querySelector("[data-carousel-prev]");
    const nextBtn = root.querySelector("[data-carousel-next]");
    if (!track) return;

    const total = SLIDES.length;
    let currentIndex = 0;
    let autoplayId = null;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Initial render ---
    track.innerHTML = SLIDES.map((slide, i) => renderSlide(slide, i, total)).join("");

    if (dotsContainer) {
      dotsContainer.innerHTML = SLIDES.map((_, i) => renderDot(i, i === 0)).join("");
    }

    const slideEls = Array.from(track.querySelectorAll("[data-slide-index]"));
    const dotEls = dotsContainer
      ? Array.from(dotsContainer.querySelectorAll("[data-dot-index]"))
      : [];

    function goToSlide(index) {
      currentIndex = ((index % total) + total) % total; // wrap both directions
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      slideEls.forEach((el, i) => {
        el.setAttribute("aria-hidden", i === currentIndex ? "false" : "true");
      });

      dotEls.forEach((dot, i) => {
        dot.setAttribute("aria-current", i === currentIndex ? "true" : "false");
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
      if (prefersReducedMotion || autoplayId !== null) return;
      autoplayId = window.setInterval(nextSlide, AUTOPLAY_INTERVAL_MS);
    }

    function stopAutoplay() {
      if (autoplayId === null) return;
      window.clearInterval(autoplayId);
      autoplayId = null;
    }

    /** Called after any manual navigation so the autoplay clock
        restarts from a fresh interval rather than firing again
        moments after the person just navigated themselves. */
    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // --- Arrow controls ---
    prevBtn?.addEventListener("click", () => {
      prevSlide();
      resetAutoplay();
    });

    nextBtn?.addEventListener("click", () => {
      nextSlide();
      resetAutoplay();
    });

    // --- Dot controls ---
    dotsContainer?.addEventListener("click", (event) => {
      const dot = event.target.closest("[data-dot-index]");
      if (!dot) return;
      goToSlide(parseInt(dot.getAttribute("data-dot-index"), 10));
      resetAutoplay();
    });

    // --- Keyboard navigation (left/right arrows while focus is
    //     anywhere inside the carousel) ---
    root.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevSlide();
        resetAutoplay();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nextSlide();
        resetAutoplay();
      }
    });

    // --- Pause on hover (desktop) ---
    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", startAutoplay);

    // --- Pause while a keyboard user is focused inside the
    //     carousel, so controls don't shift under them mid-interaction ---
    root.addEventListener("focusin", stopAutoplay);
    root.addEventListener("focusout", (event) => {
      // Only resume if focus has left the carousel entirely, not
      // just moved from one control inside it to another.
      if (!root.contains(event.relatedTarget)) {
        startAutoplay();
      }
    });

    goToSlide(0);
    startAutoplay();
  }

  document.addEventListener("DOMContentLoaded", initHeroCarousel);
})();
