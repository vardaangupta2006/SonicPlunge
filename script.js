/**
 * Sonic Plunge — client-side behavior
 * Image paths: filenames are encoded with encodeURIComponent so spaces and long names work locally.
 * Edit captions in GALLERY_MAIN and GALLERY_DOCS below.
 */

(function () {
  "use strict";

  var IMAGE_BASE = "SonicPlungeImages/";

  function imageUrl(filename) {
    return IMAGE_BASE + encodeURIComponent(filename);
  }

  /** @type {{ file: string, caption: string }[]} */
  var GALLERY_MAIN = [
    { file: "01B2508E-369B-4F37-A7E3-F2B2082F247F_1_105_c.jpeg", caption: "Bowl lit from within — a quiet moment of color and circuitry." },
    { file: "28129B68-1599-4D47-B1F0-C62D5D88400D_1_105_c.jpeg", caption: "Studio floor: bowls, mallets, and the cart of gear that follows us everywhere." },
    { file: "4C02B986-DC3F-4FE9-81E1-632F753BDD3E_1_105_c.jpeg", caption: "Listening together: three bowls, one shared question — how does this one sing?" },
    { file: "42280396-BB43-4D85-B807-4296FBFA5E47_1_105_c.jpeg", caption: "Breadboard, laptop, and a first pass at automated striking." },
    { file: "DE7A8712-F5CC-4226-87BB-374C4D9D1360_1_105_c.jpeg", caption: "On the floor with components, bowls, and screens open side by side." },
    { file: "E644A49B-2FE8-43AB-9972-EC4FE242BB3B_1_105_c.jpeg", caption: "Software and acoustics in the same frame — testing and musical typing." },
    { file: "8F4B1984-7B11-4C22-BFFE-46967C545A40_1_105_c.jpeg", caption: "Hands inside the bowl — learning the instrument before automating it." },
    { file: "135DF88D-C86C-44D9-894F-D4D03E729603_1_105_c.jpeg", caption: "Studio walk-through: cables, work surfaces, and room to iterate." },
    { file: "1A3BF260-B750-4CB7-AA56-DCD96D57C457_1_105_c.jpeg", caption: "Build documentation — another angle on the workspace and setup." },
    { file: "1E56BCF1-E285-48D9-8E44-590CF57A20FD_1_105_c.jpeg", caption: "Process photo from the project archive." },
    { file: "23996A49-FBC9-4837-8A64-20E8B4A9ECE6_1_105_c.jpeg", caption: "Related listening session — bowls, gong, and microphones in the room." },
    { file: "3560927E-467C-492C-9B62-BA64A480FBD8_1_105_c.jpeg", caption: "Iteration snapshot — small changes, careful listening." },
    { file: "39396C6C-E04C-4589-8558-F513BEA8E07A_1_105_c.jpeg", caption: "Studio notes — another frame from the build." },
    { file: "4B0B59A6-16C4-49E9-83FF-FCBD67F28BC9_1_105_c.jpeg", caption: "Work-in-progress: equipment, floor, and experiments." },
    { file: "659ECFF2-574B-45E9-B6CB-4E03B7CEA5EE_1_105_c.jpeg", caption: "Behind-the-scenes documentation from the project folder." },
    { file: "EFF61FD5-0C96-4596-88E7-DAAA42AF6313_1_105_c.jpeg", caption: "Archive photo — context from our sessions." },
    { file: "WhatsApp Image 2026-02-10 at 3.14.50 PM (1).jpeg", caption: "Candid build moment: bowls, wires, and laptops in the classroom." },
    { file: "WhatsApp Image 2026-02-10 at 3.14.51 PM.jpeg", caption: "Wide shot: bowls laid out while we test and talk through next steps." }
  ];

  /** @type {{ file: string, caption: string }[]} */
  var GALLERY_DOCS = [
    { file: "Zoom Class.png", caption: "Remote class session — shared screen with an early Sonic Plunge signal diagram." },
    { file: "WhatsApp Image 2026-02-09 at 3.38.50 PM (1).jpeg", caption: "Lecture slide on transforms — course context alongside the build." }
  ];

  function applyEncodedSources() {
    document.querySelectorAll(".js-encoded-src[data-filename]").forEach(function (el) {
      var name = el.getAttribute("data-filename");
      if (name) {
        el.setAttribute("src", imageUrl(name));
      }
    });
  }

  function buildGallery(containerId, items) {
    var root = document.getElementById(containerId);
    if (!root) return;

    items.forEach(function (item) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gallery__item";
      btn.setAttribute("aria-label", "Open image: " + item.caption);

      var img = document.createElement("img");
      img.className = "gallery__thumb";
      img.src = imageUrl(item.file);
      img.alt = item.caption;
      img.loading = "lazy";
      img.decoding = "async";
      img.sizes = "(max-width: 600px) 100vw, 33vw";

      var overlay = document.createElement("div");
      overlay.className = "gallery__overlay";
      var cap = document.createElement("p");
      cap.className = "gallery__caption-short";
      cap.textContent = item.caption;
      overlay.appendChild(cap);

      btn.appendChild(img);
      btn.appendChild(overlay);

      btn.addEventListener("click", function () {
        openLightbox(item.file, item.caption);
      });

      root.appendChild(btn);
    });
  }

  var lightboxEl = document.getElementById("lightbox");
  var lightboxImg = lightboxEl ? lightboxEl.querySelector(".lightbox__img") : null;
  var lightboxCap = lightboxEl ? lightboxEl.querySelector(".lightbox__caption") : null;
  var lastFocus = null;

  function openLightbox(filename, caption) {
    if (!lightboxEl || !lightboxImg || !lightboxCap) return;
    lastFocus = document.activeElement;
    lightboxImg.src = imageUrl(filename);
    lightboxImg.alt = caption;
    lightboxCap.textContent = caption;
    lightboxEl.hidden = false;
    document.body.style.overflow = "hidden";
    var closeBtn = lightboxEl.querySelector(".lightbox__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightboxEl || !lightboxImg) return;
    lightboxEl.hidden = true;
    lightboxImg.src = "";
    lightboxImg.alt = "";
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  function initLightbox() {
    if (!lightboxEl) return;
    lightboxEl.querySelectorAll("[data-lightbox-close]").forEach(function (node) {
      node.addEventListener("click", closeLightbox);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lightboxEl.hidden) {
        e.preventDefault();
        closeLightbox();
      }
    });
  }

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var panel = document.getElementById("mobile-nav");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        panel.hidden = true;
      });
    });
  }

  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyEncodedSources();
    buildGallery("gallery-main", GALLERY_MAIN);
    buildGallery("gallery-docs", GALLERY_DOCS);
    initLightbox();
    initNav();
    initReveal();
  });
})();
