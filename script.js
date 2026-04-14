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

  /** @type {{ file: string, caption: string, detail?: string }[]} */
  var GALLERY_MAIN = [
    {
      file: "01B2508E-369B-4F37-A7E3-F2B2082F247F_1_105_c.jpeg",
      caption: "Bowl lit from within — a quiet moment of color and circuitry.",
      detail: "We use light as a second rhythm: soft enough to feel supportive, never a disco."
    },
    {
      file: "28129B68-1599-4D47-B1F0-C62D5D88400D_1_105_c.jpeg",
      caption: "Studio floor: bowls, mallets, and the cart of gear that follows us everywhere.",
      detail: "The CMU cart is part of the ensemble — power, adapters, and spare mallets within arm’s reach."
    },
    {
      file: "4C02B986-DC3F-4FE9-81E1-632F753BDD3E_1_105_c.jpeg",
      caption: "Listening together: three bowls, one shared question — how does this one sing?",
      detail: "Group listening beats solo guessing: everyone names what they hear before we change a wire."
    },
    {
      file: "42280396-BB43-4D85-B807-4296FBFA5E47_1_105_c.jpeg",
      caption: "Breadboard, laptop, and a first pass at automated striking.",
      detail: "Early exciter tests: proving we could put repeatable energy into the bowl before worrying about WFS balance."
    },
    {
      file: "DE7A8712-F5CC-4226-87BB-374C4D9D1360_1_105_c.jpeg",
      caption: "On the floor with components, bowls, and screens open side by side.",
      detail: "Keeping software and hardware in the same sightline so cause and effect stay linked."
    },
    {
      file: "motormount.jpeg",
      caption: "Motor mount — brackets and alignment for repeatable strikes.",
      detail: "Hardware snapshot from the actuation experiments: small shifts in angle change the whole tone."
    },
    {
      file: "E644A49B-2FE8-43AB-9972-EC4FE242BB3B_1_105_c.jpeg",
      caption: "Software and acoustics in the same frame — testing and musical typing.",
      detail: "DAW and bowls in one sightline — checking composed material against what the exciters do in the room."
    },
    {
      file: "8F4B1984-7B11-4C22-BFFE-46967C545A40_1_105_c.jpeg",
      caption: "Hands inside the bowl — learning the instrument before automating it.",
      detail: "You can’t automate a gesture you haven’t felt; this step refused to be skipped."
    },
    {
      file: "135DF88D-C86C-44D9-894F-D4D03E729603_1_105_c.jpeg",
      caption: "Studio walk-through: cables, work surfaces, and room to iterate.",
      detail: "Cable discipline is vibe discipline — fewer ground loops, fewer mysteries."
    },
    {
      file: "1A3BF260-B750-4CB7-AA56-DCD96D57C457_1_105_c.jpeg",
      caption: "Build documentation — another angle on the workspace and setup.",
      detail: "Alternate angle for documentation: proof we actually lived in this room for weeks."
    },
    {
      file: "1E56BCF1-E285-48D9-8E44-590CF57A20FD_1_105_c.jpeg",
      caption: "Process photo from the project archive.",
      detail: "From the archive folder — not every frame is heroic, but it’s all evidence."
    },
    {
      file: "23996A49-FBC9-4837-8A64-20E8B4A9ECE6_1_105_c.jpeg",
      caption: "Related listening session — bowls, gong, and microphones in the room.",
      detail: "Sometimes we borrow the room’s other voices to tune our ears before returning to the build."
    },
    {
      file: "3560927E-467C-492C-9B62-BA64A480FBD8_1_105_c.jpeg",
      caption: "Iteration snapshot — small changes, careful listening.",
      detail: "A hair’s difference in strike height can be the line between bloom and clank."
    },
    {
      file: "39396C6C-E04C-4589-8558-F513BEA8E07A_1_105_c.jpeg",
      caption: "Studio notes — another frame from the build.",
      detail: "Messy middle: the kind of photo you only appreciate after the fact."
    },
    {
      file: "4B0B59A6-16C4-49E9-83FF-FCBD67F28BC9_1_105_c.jpeg",
      caption: "Work-in-progress: equipment, floor, and experiments.",
      detail: "Spare parts staged like a tiny city — every roll of tape has a story."
    },
    {
      file: "659ECFF2-574B-45E9-B6CB-4E03B7CEA5EE_1_105_c.jpeg",
      caption: "Behind-the-scenes documentation from the project folder.",
      detail: "Folder archaeology: when the timeline blurs, filenames and dates save us."
    },
    {
      file: "EFF61FD5-0C96-4596-88E7-DAAA42AF6313_1_105_c.jpeg",
      caption: "Archive photo — context from our sessions.",
      detail: "Context shot — helps us remember how the room was lit and where reflections lived."
    },
    {
      file: "WhatsApp Image 2026-02-10 at 3.14.50 PM (1).jpeg",
      caption: "Candid build moment: bowls, wires, and laptops in the classroom.",
      detail: "Mid-class tweak: the social energy is half the signal chain."
    },
    {
      file: "WhatsApp Image 2026-02-10 at 3.14.51 PM.jpeg",
      caption: "Wide shot: bowls laid out while we test and talk through next steps.",
      detail: "Stepping back to see the whole field — layout is part of the composition."
    }
  ];

  /** @type {{ file: string, caption: string, detail?: string }[]} */
  var GALLERY_DOCS = [
    {
      file: "Zoom Class.png",
      caption: "Remote class session — shared screen with an early Sonic Plunge signal diagram.",
      detail: "Remote week: screen share kept the class aligned on block diagrams before we touched metal."
    }
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
      var aria =
        "Open image: " + item.caption + (item.detail ? ". " + item.detail : "");
      btn.setAttribute("aria-label", aria);

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
      if (item.detail) {
        var det = document.createElement("p");
        det.className = "gallery__caption-detail";
        det.textContent = item.detail;
        overlay.appendChild(det);
      }

      btn.appendChild(img);
      btn.appendChild(overlay);

      btn.addEventListener("click", function () {
        openLightbox(item.file, item.caption, item.detail);
      });

      root.appendChild(btn);
    });
  }

  var lightboxEl = document.getElementById("lightbox");
  var lightboxImg = lightboxEl ? lightboxEl.querySelector(".lightbox__img") : null;
  var lightboxCap = lightboxEl ? lightboxEl.querySelector(".lightbox__caption") : null;
  var lastFocus = null;

  function openLightbox(filename, caption, detail) {
    if (!lightboxEl || !lightboxImg || !lightboxCap) return;
    lastFocus = document.activeElement;
    lightboxImg.src = imageUrl(filename);
    lightboxImg.alt = caption;
    lightboxCap.textContent = "";
    lightboxCap.appendChild(document.createTextNode(caption));
    if (detail) {
      lightboxCap.appendChild(document.createElement("br"));
      var sub = document.createElement("span");
      sub.className = "lightbox__detail";
      sub.textContent = detail;
      lightboxCap.appendChild(sub);
    }
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
    if (lightboxCap) lightboxCap.textContent = "";
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

  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      if (window.scrollY > 32) {
        header.classList.add("site-header--dense");
      } else {
        header.classList.remove("site-header--dense");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /** Stage follow-spot: warm key + cool fill, sweeps as scroll-depth advances */
  function applyStageSpotlight(root, depth, reduced) {
    if (reduced) {
      root.style.setProperty("--spot-x", "50%");
      root.style.setProperty("--spot-y", "36%");
      root.style.setProperty("--spot-x2", "46%");
      root.style.setProperty("--spot-y2", "52%");
      root.style.setProperty("--spot-rotate", "0deg");
      return;
    }
    var d = depth;
    var x1 = 50 + Math.sin(d * Math.PI) * 18;
    var y1 = 18 + d * 64;
    var x2 = 47 - Math.cos(d * Math.PI * 1.35) * 15;
    var y2 = 26 + d * 58;
    var rot = -10 + d * 18;
    root.style.setProperty("--spot-x", x1.toFixed(2) + "%");
    root.style.setProperty("--spot-y", y1.toFixed(2) + "%");
    root.style.setProperty("--spot-x2", x2.toFixed(2) + "%");
    root.style.setProperty("--spot-y2", y2.toFixed(2) + "%");
    root.style.setProperty("--spot-rotate", rot.toFixed(2) + "deg");
  }

  /**
   * One rAF-batched scroll loop: page depth, hero parallax, ambient layers, demo rail, stage spotlight.
   */
  /** Slow “breathing” pulse for EQ glow — tied to --beat-glow */
  function initMusicPulse() {
    var root = document.documentElement;
    var mq =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : { matches: false };

    function tick(now) {
      var t = typeof now === "number" ? now : performance.now();
      if (mq.matches) {
        root.style.setProperty("--beat-glow", "0.55");
      } else {
        var beat = Math.sin(t / 1000 * 2.05) * 0.5 + 0.5;
        root.style.setProperty("--beat-glow", beat.toFixed(3));
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initScrollEffects() {
    var root = document.documentElement;
    var heroBg = document.querySelector(".hero__bg");
    var wave = document.querySelector(".wave-bg");
    var scoreGlow = document.querySelector(".score-glow");
    var motionSec = document.getElementById("motion");
    var motionFill = document.querySelector(".motion-layout__rail-fill");
    var mq =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : { matches: false };

    var scheduled = false;
    function frame() {
      scheduled = false;
      var y = window.scrollY || 0;
      var sh = document.documentElement.scrollHeight - window.innerHeight;
      var depth = sh > 0 ? Math.min(1, Math.max(0, y / sh)) : 0;
      root.style.setProperty("--scroll-depth", depth.toFixed(4));

      if (mq.matches) {
        root.style.setProperty("--scroll-depth", "0");
        if (heroBg) {
          heroBg.style.removeProperty("--hero-y");
        }
        if (wave) wave.style.removeProperty("--wave-shift");
        if (scoreGlow) scoreGlow.style.removeProperty("--glow-shift");
        if (motionFill && motionSec) {
          motionFill.style.setProperty("--motion-progress", "1");
        }
        applyStageSpotlight(root, 0, true);
        return;
      }

      if (heroBg) {
        var py = Math.min(y * 0.3, 150);
        heroBg.style.setProperty("--hero-y", py + "px");
      }
      if (wave) {
        wave.style.setProperty("--wave-shift", (depth * 42).toFixed(2) + "px");
      }
      if (scoreGlow) {
        scoreGlow.style.setProperty("--glow-shift", (depth * 48).toFixed(2) + "px");
      }

      if (motionSec && motionFill) {
        var rect = motionSec.getBoundingClientRect();
        var vh = window.innerHeight || 1;
        var h = motionSec.offsetHeight || rect.height;
        var p = (vh - rect.top) / (vh + h);
        if (p < 0) p = 0;
        if (p > 1) p = 1;
        motionFill.style.setProperty("--motion-progress", String(p));
      }

      applyStageSpotlight(root, depth, false);
    }

    function onScroll() {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(frame);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", frame);
    }
    frame();
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
    initHeaderScroll();
    initScrollEffects();
    initMusicPulse();
    initReveal();
  });
})();
