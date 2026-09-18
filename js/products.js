/* =========================================================
   BEAUTY PLUZ — PRODUCTS.JS
   Product catalogue data plus the interaction layer for any
   product card rendered on the site (homepage Best Sellers /
   New Arrivals, and eventually shop.html).

   Product cards are authored directly in HTML (see index.html)
   rather than templated from JS, but every card carries a
   [data-product-id] attribute that maps back to this catalogue,
   so "Add to Cart" always adds the correct name/price without
   duplicating that data in the markup.
   ========================================================= */

(function () {
  "use strict";

  /**
   * Product shape:
   * { id, name, category, price, image, description, badge, icon, rating, reviewCount }
   * icon: keyword used to pick a matching line-art glyph on cards
   *       that don't yet have real photography (see the inline
   *       SVGs in index.html for balm / serum / cream / mist / oil / mask).
   */
  const sampleProducts = [
    {
      id: "sp-001",
      name: "Renewing Cleansing Balm",
      category: "cleanser",
      price: 32,
      image: "images/products/skincare-product-9.jpeg",
      description: "A botanical balm that melts away impurities without stripping the skin barrier.",
      badge: "bestseller",
      icon: "balm",
      rating: 4.8,
      reviewCount: 1240,
    },
    {
      id: "sp-002",
      name: "Sage & Peptide Serum",
      category: "serum",
      price: 58,
      image: "images/products/skincare-product-15.jpeg",
      description: "Concentrated peptides and sage extract to firm and brighten over time.",
      badge: "new",
      icon: "serum",
      rating: 4.9,
      reviewCount: 860,
    },
    {
      id: "sp-003",
      name: "Barrier Repair Cream",
      category: "moisturizer",
      price: 46,
      image: "images/products/skincare-product-11.jpeg",
      description: "A rich, ceramide-forward cream that locks in moisture for 24 hours.",
      badge: "bestseller",
      icon: "cream",
      rating: 4.7,
      reviewCount: 1580,
    },
    {
      id: "sp-004",
      name: "Rosewater Balancing Mist",
      category: "toner",
      price: 24,
      image: "images/products/skincare-product-11.jpeg",
      description: "A weightless mist that resets and hydrates skin any time of day.",
      badge: "new",
      icon: "mist",
      rating: 4.6,
      reviewCount: 410,
    },
    {
      id: "sp-005",
      name: "Overnight Renewal Oil",
      category: "oil",
      price: 64,
      image: "images/products/skincare-product-13.jpeg",
      description: "A silky facial oil that works while you sleep to restore radiance by morning.",
      badge: "bestseller",
      icon: "oil",
      rating: 4.9,
      reviewCount: 970,
    },
    {
      id: "sp-006",
      name: "Clarifying Clay Mask",
      category: "mask",
      price: 38,
      image: "images/products/skincare-product-13.jpeg",
      description: "Mineral-rich clay that draws out impurities without over-drying skin.",
      badge: "new",
      icon: "mask",
      rating: 4.5,
      reviewCount: 260,
    },
    {
      id: "sp-007",
      name: "Vitamin C Brightening Drops",
      category: "serum",
      price: 52,
      image: "images/products/skincare-product-14.jpeg",
      description: "A stable, gentle vitamin C concentrate that evens tone without irritation.",
      badge: "bestseller",
      icon: "serum",
      rating: 4.8,
      reviewCount: 1120,
    },
    {
      id: "sp-008",
      name: "Gentle Enzyme Polish",
      category: "exfoliant",
      price: 36,
      image: "images/products/skincare-product-15.jpeg",
      description: "Fruit enzymes and fine rice powder buff away dullness without micro-tears.",
      badge: "new",
      icon: "balm",
      rating: 4.7,
      reviewCount: 340,
    },
    {
      id: "sp-009",
      name: "Mineral Sheer Sunscreen SPF 40",
      category: "spf",
      price: 34,
      image: "images/products/skincare-product-15.jpeg",
      description: "A weightless, no-white-cast mineral filter for everyday protection.",
      badge: "new",
      icon: "spf",
      rating: 4.8,
      reviewCount: 512,
    },
    {
      id: "sp-010",
      name: "Creamy Milk Cleanser",
      category: "cleanser",
      price: 28,
      image: "",
      description: "A soft, low-foam cleanser that leaves skin comfortable, never tight.",
      badge: "",
      icon: "cream",
      rating: 4.6,
      reviewCount: 298,
    },
    {
      id: "sp-011",
      name: "Overnight Repair Gel Cream",
      category: "moisturizer",
      price: 48,
      image: "images/products/skincare-product-15.jpeg",
      description: "A lightweight gel-cream that supports skin's natural repair cycle while you sleep.",
      badge: "bestseller",
      icon: "cream",
      rating: 4.8,
      reviewCount: 734,
    },
    {
      id: "sp-012",
      name: "Hydrating Essence Toner",
      category: "toner",
      price: 30,
      image: "images/products/skincare-product-15.jpeg",
      description: "A hydrating first step that preps skin to absorb everything layered after it.",
      badge: "",
      icon: "mist",
      rating: 4.7,
      reviewCount: 189,
    },
  ];

  /**
   * Shared line-art icon paths, keyed by the same `icon` values used in
   * the product catalogue above. Any part of the site that needs to
   * render a product glyph (homepage cards, cart rows, eventually the
   * shop grid) pulls from this single source instead of duplicating
   * SVG markup per page.
   */
  const ICON_PATHS = {
    balm: '<path d="M6 9h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9Z"></path><path d="M6 9V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"></path><path d="M9 5V3h6v2"></path>',
    serum: '<path d="M10 2h4v3.5l1.5 2V21a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V7.5L10 5.5V2Z"></path><path d="M9 12h6"></path>',
    cream: '<path d="M5 10a7 7 0 0 1 14 0v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8Z"></path><path d="M5 10h14"></path>',
    oil: '<path d="M12 3s6 7.5 6 12a6 6 0 0 1-12 0c0-4.5 6-12 6-12Z"></path>',
    mist: '<path d="M9 3h4v3h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1V3Z"></path><path d="M16 7l3-1M17 9h3M16 11l3 1"></path>',
    mask: '<path d="M4 11a8 8 0 0 1 16 0c0 4-3 9-8 9s-8-5-8-9Z"></path><path d="M8 11h8"></path>',
    spf: '<circle cx="12" cy="12" r="4.5"></circle><path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path>',
  };

  const IMAGE_STORAGE_KEY = "beautyPluzProductImages";

  function readImageOverrides() {
    try {
      const saved = JSON.parse(localStorage.getItem(IMAGE_STORAGE_KEY) || "{}");
      return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
    } catch (err) {
      console.warn("Beauty Pluz: could not read product images from storage", err);
      return {};
    }
  }

  function saveImageOverrides(overrides) {
    try {
      localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(overrides));
      return true;
    } catch (err) {
      console.error("Beauty Pluz: could not save product image", err);
      return false;
    }
  }

  function productWithImage(product) {
    if (!product) return null;
    const overrides = readImageOverrides();
    const image = Object.prototype.hasOwnProperty.call(overrides, product.id)
      ? overrides[product.id]
      : product.image;
    return { ...product, image: typeof image === "string" ? image : "" };
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
    })[character]);
  }

  const Products = {
    getAll() {
      return sampleProducts.map(productWithImage);
    },

    getById(id) {
      return productWithImage(sampleProducts.find((product) => product.id === id));
    },

    getByCategory(category) {
      const products = !category || category === "all"
        ? sampleProducts
        : sampleProducts.filter((product) => product.category === category);
      return products.map(productWithImage);
    },

    getByBadge(badge) {
      return sampleProducts.filter((product) => product.badge === badge).map(productWithImage);
    },

    search(query) {
      const term = (query || "").trim().toLowerCase();
      const products = !term ? sampleProducts : sampleProducts.filter((product) =>
        product.name.toLowerCase().includes(term)
      );
      return products.map(productWithImage);
    },

    getImageMarkup(product, className) {
      if (product.image) {
        return `<img class="${className}" src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}">`;
      }
      return `<div class="${className} product-image-placeholder product-image-placeholder--${escapeHTML(product.icon)}" role="img" aria-label="${escapeHTML(product.name)} image unavailable">${Products.getIconMarkup(product.icon)}</div>`;
    },

    setImage(id, image) {
      if (!sampleProducts.some((product) => product.id === id) || typeof image !== "string") return null;
      const overrides = readImageOverrides();
      overrides[id] = image;
      if (!saveImageOverrides(overrides)) return null;
      const product = Products.getById(id);
      window.dispatchEvent(new CustomEvent("beautypluz:product-image-change", { detail: { id, image: product.image } }));
      return product;
    },

    removeImage(id) {
      return Products.setImage(id, "");
    },

    /** Returns an inline <svg>…</svg> string for a given icon keyword. */
    getIconMarkup(iconKey) {
      const paths = ICON_PATHS[iconKey] || ICON_PATHS.balm;
      return (
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        paths +
        "</svg>"
      );
    },
  };

  window.BeautyPluzProducts = Products;

  /** Friendly display names for category values used in cards/filters. */
  const CATEGORY_LABELS = {
    cleanser: "Cleanser",
    serum: "Serum",
    moisturizer: "Moisturizer",
    toner: "Toner",
    oil: "Facial Oil",
    mask: "Mask",
    exfoliant: "Exfoliant",
    spf: "Sun Care",
  };

  /** Builds the markup for a single product card. `staggerIndex`
      (when provided) adds a fade-up entrance animation with a
      delay proportional to its position — used when re-rendering
      a filtered/sorted grid so cards cascade in rather than
      popping in all at once. */
  function renderProductCard(product, staggerIndex) {
    const badgeLabel =
      product.badge === "bestseller" ? "Bestseller" : product.badge === "new" ? "New" : "";
    const badgeMarkup = badgeLabel
      ? `<span class="product-card__badge product-card__badge--${product.badge}">${badgeLabel}</span>`
      : "";
    const categoryLabel = CATEGORY_LABELS[product.category] || product.category;
    const reviewCount = product.reviewCount.toLocaleString("en-US");
    const cardClass =
      typeof staggerIndex === "number" ? "product-card card animate-fade-up" : "product-card card";
    const cardStyle =
      typeof staggerIndex === "number"
        ? ` style="animation-delay:${Math.min(staggerIndex * 40, 320)}ms"`
        : "";

    return `
      <article class="${cardClass}"${cardStyle} data-product-id="${product.id}">
        <div class="product-card__media">
          <a class="product-card__detail-link" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="View ${escapeHTML(product.name)} details">
            ${Products.getImageMarkup(product, "product-card__image zoom-layer")}
          </a>
          ${badgeMarkup}
          <button type="button" class="product-card__wishlist" data-wishlist-toggle aria-label="Add ${product.name} to wishlist" aria-pressed="false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 20s-7-4.3-9.5-8.8C1 8 2.5 4.5 6 4.5c2 0 3.3 1.1 4.5 2.6C11.7 5.6 13 4.5 15 4.5c3.5 0 5 3.5 3.5 6.7C19 15.7 12 20 12 20Z"></path>
            </svg>
          </button>
        </div>
        <div class="product-card__body">
          <p class="product-card__category">${categoryLabel}</p>
          <h3 class="product-card__name">${product.name}</h3>
          <p class="product-card__description">${product.description}</p>
          <div class="product-card__rating" aria-label="Rated ${product.rating} out of 5 from ${reviewCount} reviews">
            <span aria-hidden="true">★★★★★</span>
            <span class="product-card__reviews">(${reviewCount})</span>
          </div>
          <div class="product-card__footer">
            <span class="product-card__price">$${product.price}</span>
            <button type="button" class="btn btn--primary btn--sm" data-add-to-cart>Add to Cart</button>
          </div>
        </div>
      </article>
    `;
  }

  /** Renders the full catalogue into [data-product-grid], replacing
      the skeleton placeholders. No-op on pages without that element
      (homepage's curated sections are hand-authored in HTML instead). */
  /* =========================================================
     SHOP CATALOG — search, category/price filtering, sorting.
     Pure functions (filterProducts/sortProducts) take a product
     list + state in and return a new array, so they're reusable
     and testable independent of the DOM. ShopState is the single
     source of truth; every control (search, checkboxes, radios,
     sort select) just updates it and calls render().
  ========================================================= */
  const ShopState = {
    search: "",
    categories: new Set(),
    priceRange: "",
    sort: "featured",
  };

  /** Pure: returns a new array containing only products matching
      the given search/category/price criteria. Does not mutate
      or depend on ShopState directly, so it's reusable/testable
      on its own. */
  function filterProducts(products, { search, categories, priceRange }) {
    const term = (search || "").trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);

      const matchesCategory =
        !categories || categories.size === 0 || categories.has(product.category);

      const matchesPrice =
        !priceRange ||
        (priceRange === "under-30" && product.price < 30) ||
        (priceRange === "30-50" && product.price >= 30 && product.price <= 50) ||
        (priceRange === "50-plus" && product.price > 50);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }

  /** Pure: returns a new, sorted array — never mutates the input. */
  function sortProducts(products, sortKey) {
    const sorted = products.slice();

    switch (sortKey) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "newest":
        // No explicit date field in the catalogue — id order is
        // insertion order, so the highest id is the most recent.
        return sorted.sort((a, b) => idNumber(b.id) - idNumber(a.id));
      case "best-selling":
        // No real sales data yet — review count is the standard
        // stand-in signal for popularity.
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      case "featured":
      default:
        return sorted;
    }
  }

  function idNumber(id) {
    const match = /\d+/.exec(id || "");
    return match ? parseInt(match[0], 10) : 0;
  }

  /** Combines filter + sort against the live catalogue and ShopState. */
  function getVisibleProducts() {
    const filtered = filterProducts(Products.getAll(), ShopState);
    return sortProducts(filtered, ShopState.sort);
  }

  /** Renders the empty-state markup shown when nothing matches. */
  function renderEmptyState() {
    return `
      <div class="shop-empty-state">
        <h3>No products found</h3>
        <p>Try a different search term or clear your filters to see the full collection.</p>
        <button type="button" class="btn btn--secondary" data-clear-all-filters>Clear Filters</button>
      </div>
    `;
  }

  /** Updates the "Showing X of Y products" toolbar text. */
  function updateProductCount(visibleCount, totalCount) {
    const countEl = document.querySelector("[data-product-count]");
    if (!countEl) return;
    countEl.textContent =
      visibleCount === totalCount
        ? `Showing all ${totalCount} products`
        : `Showing ${visibleCount} of ${totalCount} products`;
  }

  /** Renders the current ShopState's results into the grid with a
      brief fade transition, then re-wires the fresh cards' buttons
      (previous listeners are gone once innerHTML is replaced). */
  function renderShopGrid() {
    const grid = document.querySelector("[data-product-grid]");
    if (!grid) return;

    const total = Products.getAll().length;
    const visible = getVisibleProducts();

    grid.classList.add("is-filtering");

    window.setTimeout(() => {
      grid.innerHTML = visible.length
        ? visible.map((product, index) => renderProductCard(product, index)).join("")
        : renderEmptyState();

      grid.removeAttribute("aria-busy");
      grid.setAttribute("aria-label", "Products");
      grid.classList.remove("is-filtering");

      updateProductCount(visible.length, total);
      initProductCardActions();
      initWishlistToggles();
      initClearAllFilters();
    }, 180);
  }

  /** Wires the wishlist heart button on every card — visual toggle only. */
  function initWishlistToggles() {
    document.querySelectorAll("[data-wishlist-toggle]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const isActive = !button.classList.contains("is-active");
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
    });
  }

  /** The empty state's "Clear Filters" button — only exists once
      the grid has actually rendered that state, so it's wired
      fresh each render alongside the card actions. */
  function initClearAllFilters() {
    document.querySelector("[data-clear-all-filters]")?.addEventListener("click", () => {
      resetShopFilters();
    });
  }

  /** Resets every filter control back to its default and re-renders. */
  function resetShopFilters() {
    ShopState.search = "";
    ShopState.categories = new Set();
    ShopState.priceRange = "";
    ShopState.sort = "featured";

    const searchInput = document.querySelector("#search-input");
    if (searchInput) searchInput.value = "";

    document
      .querySelectorAll('.filter-drawer input[name="category"]')
      .forEach((input) => (input.checked = false));
    document
      .querySelectorAll('.filter-drawer input[name="price"]')
      .forEach((input) => (input.checked = false));

    const sortSelect = document.querySelector("#sort-select");
    if (sortSelect) sortSelect.value = "featured";

    renderShopGrid();
  }

  /* -----------------------------
     Search — live-filters as you type on shop.html; on any other
     page the same header search form still navigates to
     shop.html?q=... normally (see the form's default action).
  ------------------------------ */
  function initShopSearch() {
    const grid = document.querySelector("[data-product-grid]");
    if (!grid) return; // only shop.html has live search; elsewhere the form just navigates

    const form = document.querySelector(".search-panel__form");
    const input = document.querySelector("#search-input");
    if (!form || !input) return;

    // Pre-populate from ?q= if this page was reached via a search
    // submitted from another page.
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q");
    if (initialQuery) {
      input.value = initialQuery;
      ShopState.search = initialQuery;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      ShopState.search = input.value;
      renderShopGrid();
    });

    input.addEventListener(
      "input",
      BeautyPluz.debounce(() => {
        ShopState.search = input.value;
        renderShopGrid();
      }, 250)
    );
  }

  /* -----------------------------
     Category + price filters (filter drawer checkboxes/radios)
  ------------------------------ */
  function initCategoryAndPriceFilters() {
    const categoryInputs = document.querySelectorAll('.filter-drawer input[name="category"]');
    const priceInputs = document.querySelectorAll('.filter-drawer input[name="price"]');
    if (!categoryInputs.length && !priceInputs.length) return;

    categoryInputs.forEach((input) => {
      input.addEventListener("change", () => {
        ShopState.categories = new Set(
          Array.from(categoryInputs)
            .filter((el) => el.checked)
            .map((el) => el.value)
        );
        renderShopGrid();
      });
    });

    priceInputs.forEach((input) => {
      input.addEventListener("change", () => {
        ShopState.priceRange = input.checked ? input.value : "";
        renderShopGrid();
      });
    });

    document.querySelector("[data-filter-clear]")?.addEventListener("click", resetShopFilters);
  }

  /* -----------------------------
     Sort select
  ------------------------------ */
  function initSortSelect() {
    const select = document.querySelector("#sort-select");
    if (!select) return;

    select.addEventListener("change", () => {
      ShopState.sort = select.value;
      renderShopGrid();
    });
  }

  /* -----------------------------
     Shop toolbar — grid/list view toggle
  ------------------------------ */
  function initShopToolbar() {
    const buttons = document.querySelectorAll("[data-view-toggle]");
    const grid = document.querySelector("[data-product-grid]");
    if (!buttons.length || !grid) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.getAttribute("data-view-toggle");
        buttons.forEach((b) => {
          const isActive = b === btn;
          b.classList.toggle("is-active", isActive);
          b.setAttribute("aria-pressed", String(isActive));
        });
        grid.classList.toggle("product-grid--list", view === "list");
      });
    });
  }

  /* -----------------------------
     Filter drawer — off-canvas panel, mirrors the nav drawer's
     hardened open/close pattern (visibility + pointer-events +
     transform) but kept independent since it's a separate panel.
  ------------------------------ */
  function initFilterDrawer() {
    const toggle = document.querySelector("[data-filter-toggle]");
    const drawer = document.querySelector("[data-filter-drawer]");
    const overlay = document.querySelector("[data-filter-overlay]");
    const closeBtn = document.querySelector("[data-filter-close]");
    if (!toggle || !drawer) return;

    const isOpen = () => drawer.classList.contains("is-open");

    const lockBodyScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      document.body.dataset.scrollLockY = String(scrollY);
      document.body.style.top = `-${scrollY}px`;
      document.body.classList.add("no-scroll");
    };

    const unlockBodyScroll = () => {
      const scrollY = parseInt(document.body.dataset.scrollLockY || "0", 10);
      document.body.classList.remove("no-scroll");
      document.body.style.top = "";
      delete document.body.dataset.scrollLockY;
      window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
    };

    const openDrawer = () => {
      drawer.classList.add("is-open");
      overlay?.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      lockBodyScroll();
    };

    const closeDrawer = () => {
      drawer.classList.remove("is-open");
      overlay?.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      unlockBodyScroll();
    };

    toggle.addEventListener("click", () => {
      isOpen() ? closeDrawer() : openDrawer();
    });

    closeBtn?.addEventListener("click", closeDrawer);
    overlay?.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isOpen()) {
        closeDrawer();
        toggle.focus();
      }
    });
  }

  function hydrateStaticProductImages() {
    document.querySelectorAll("[data-product-id]").forEach((card) => {
      const product = Products.getById(card.getAttribute("data-product-id"));
      const media = card.querySelector(".product-card__media");
      if (!product || !media) return;
      media.querySelectorAll("img, .product-card__image").forEach((element) => element.remove());
      media.insertAdjacentHTML("beforeend", Products.getImageMarkup(product, "product-card__image zoom-layer"));
    });
  }

  function renderProductDetail() {
    const container = document.querySelector("[data-product-detail]");
    if (!container) return;
    const id = new URLSearchParams(window.location.search).get("id");
    const product = Products.getById(id);
    if (!product) {
      container.innerHTML = '<p class="product-detail__not-found">This product could not be found. <a href="shop.html">Browse the collection</a>.</p>';
      return;
    }
    const category = CATEGORY_LABELS[product.category] || product.category;
    container.innerHTML = `
      <div class="product-detail__media">${Products.getImageMarkup(product, "product-detail__image")}</div>
      <div class="product-detail__content" data-product-id="${product.id}">
        <p class="product-card__category">${escapeHTML(category)}</p>
        <h1>${escapeHTML(product.name)}</h1>
        <p class="product-detail__price">$${product.price.toFixed(2)}</p>
        <p class="product-detail__description">${escapeHTML(product.description)}</p>
        <button type="button" class="btn btn--primary" data-add-to-cart>Add to Cart</button>
        <section class="product-image-manager" aria-labelledby="image-manager-heading">
          <h2 id="image-manager-heading">Product image</h2>
          <p>Upload a JPG, PNG, WebP, or GIF (up to 2 MB). The selected image is stored on this device.</p>
          <label class="btn btn--secondary" for="product-image-upload">Upload or replace image</label>
          <input id="product-image-upload" type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden>
          <button type="button" class="product-image-manager__remove" data-remove-product-image ${product.image ? "" : "disabled"}>Remove image</button>
          <p class="product-image-manager__status" data-image-status aria-live="polite"></p>
        </section>
      </div>`;
    initProductCardActions();
    const input = container.querySelector("#product-image-upload");
    const status = container.querySelector("[data-image-status]");
    input.addEventListener("change", () => {
      const file = input.files && input.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/") || file.size > 2 * 1024 * 1024) {
        status.textContent = "Choose an image file smaller than 2 MB.";
        input.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onerror = () => { status.textContent = "The image could not be read. Please try another file."; };
      reader.onload = () => {
        if (!Products.setImage(product.id, reader.result)) {
          status.textContent = "The image could not be saved. Please use a smaller file.";
          return;
        }
        renderProductDetail();
      };
      reader.readAsDataURL(file);
    });
    container.querySelector("[data-remove-product-image]").addEventListener("click", () => {
      Products.removeImage(product.id);
      renderProductDetail();
    });
  }

  function refreshProductImages() {
    hydrateStaticProductImages();
    if (document.querySelector("[data-product-grid]")) renderShopGrid();
  }

  window.addEventListener("beautypluz:product-image-change", refreshProductImages);

  /* -----------------------------
     Card interactions — wires up any [data-add-to-cart] button
     found on the page (homepage grids, shop grids, etc.) to the
     cart API, using the product catalogue above as the source
     of truth for name/price.
  ------------------------------ */
  function initProductCardActions() {
    const buttons = document.querySelectorAll("[data-add-to-cart]");
    if (!buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const card = button.closest("[data-product-id]");
        const id = card?.getAttribute("data-product-id");
        const product = id ? Products.getById(id) : null;

        if (!product || !window.BeautyPluzCart) return;

        window.BeautyPluzCart.addItem(product, 1);
        window.BeautyPluz?.showToast("Added to Cart");

        const originalLabel = button.textContent;
        button.textContent = "Added ✓";
        button.classList.add("is-added");
        window.setTimeout(() => {
          button.textContent = originalLabel;
          button.classList.remove("is-added");
        }, 1600);
      });
    });
  }

  // Render order matters here: the shop grid must exist in the DOM
  // (renderShopGrid) before initProductCardActions/initWishlistToggles
  // query it for buttons to wire up. Running these in one listener,
  // in this order, also avoids double-binding click handlers that
  // would happen if the grid were rendered by a separate listener
  // after actions were already wired to the (now-replaced) skeleton.
  // (renderShopGrid itself re-wires its own freshly-rendered cards
  // after every filter/sort change — these top-level calls only
  // matter for the homepage's hand-authored static cards, and are
  // harmless no-ops against shop.html's still-loading skeleton.)
  document.addEventListener("DOMContentLoaded", () => {
    hydrateStaticProductImages();
    renderProductDetail();
    initShopToolbar();
    initFilterDrawer();
    initShopSearch();
    initCategoryAndPriceFilters();
    initSortSelect();
    renderShopGrid();
    initProductCardActions();
    initWishlistToggles();
  });
})();
