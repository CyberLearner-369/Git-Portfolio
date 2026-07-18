/* ==========================================================================
   MAIN.JS — rendering + behaviour. You should not need to edit this file
   to change content; everything editable lives in js/content.js.
   Zero dependencies. Runs on every page (index, blog, resume, legal, 404).
   ========================================================================== */
(function () {
  "use strict";

  const SITE = window.SITE || {};
  const CFG = SITE.config || {};
  const ID = SITE.identity || {};
  const PAGE = document.body.dataset.page || "home";
  const HOME = PAGE === "home";
  const ROOT = HOME ? "" : "index.html"; // prefix for #anchors on sub-pages

  /* ---------- tiny helpers ------------------------------------------------ */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const reducedMQ = window.matchMedia ? matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  const reduced = () => reducedMQ.matches;

  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  const fmtDate = (iso) => {
    const d = new Date(iso + "T00:00:00Z");
    return isNaN(d) ? iso : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  };

  const words = (md) => String(md || "").replace(/```[\s\S]*?```/g, " code ").split(/\s+/).filter(Boolean).length;
  const readingTime = (md) => Math.max(1, Math.round(words(md) / 210)) + " min read";

  /* ---------- icon set (feather-style, inline, aria-hidden) --------------- */
  const P = {
    sun: '<circle cx="12" cy="12" r="4.4"/><path d="M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    "arrow-up": '<path d="M12 19V5M5 12l7-7 7 7"/>',
    "arrow-right": '<path d="M4.5 12h15M13 5.5l6.5 6.5L13 18.5"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6A4.6 4.6 0 0 0 18.7 6 4.2 4.2 0 0 0 18.6 2.8S17.5 2.5 15 4.2a12.3 12.3 0 0 0-6 0C6.5 2.5 5.4 2.8 5.4 2.8A4.2 4.2 0 0 0 5.3 6a4.6 4.6 0 0 0-1.3 3.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v1.6A6 6 0 0 1 16 8z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    x: '<path d="M4 4l6.7 8.7L4.3 20h2.5l5.1-5.9 4.5 5.9H20l-7-9.2L19.4 4h-2.5l-4.6 5.3L8.3 4H4z" fill="currentColor" stroke="none"/>',
    rss: '<path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5.2" cy="18.8" r="1.4" fill="currentColor" stroke="none"/>',
    mail: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    search: '<circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.8-4.8"/>',
    command: '<path d="M9 9V6.5A2.5 2.5 0 1 0 6.5 9H9zm0 0v6m0-6h6m-6 6H6.5A2.5 2.5 0 1 0 9 17.5V15zm6-6V6.5A2.5 2.5 0 1 1 17.5 9H15zm0 0v6m0 0h2.5a2.5 2.5 0 1 1-2.5 2.5V15z"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    hash: '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>',
    zap: '<path d="M13 2 3 14h8l-1 8 10-12h-8l1-8z"/>'
  };
  const icon = (name, cls) =>
    '<svg class="icon' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (P[name] || "") + "</svg>";

  /* ---------- toast ------------------------------------------------------- */
  const toast = (msg) => {
    const region = $("#toast-region");
    if (!region) return;
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    region.appendChild(t);
    requestAnimationFrame(() => t.classList.add("toast--show"));
    setTimeout(() => { t.classList.remove("toast--show"); setTimeout(() => t.remove(), 350); }, 2400);
  };

  /* ---------- theme ------------------------------------------------------- */
  function initTheme() {
    const btn = $("#theme-toggle");
    const set = (theme, persist) => {
      if (!reduced()) {
        document.documentElement.classList.add("theme-anim");
        setTimeout(() => document.documentElement.classList.remove("theme-anim"), 420);
      }
      document.documentElement.setAttribute("data-theme", theme);
      if (persist) { try { localStorage.setItem("theme", theme); } catch (e) {} }
      if (btn) {
        const dark = theme === "dark";
        btn.innerHTML = icon(dark ? "sun" : "moon");
        btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
        btn.setAttribute("aria-pressed", String(dark));
      }
    };
    set(document.documentElement.getAttribute("data-theme") || "light", false);
    if (btn) btn.addEventListener("click", () => {
      set(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
    // follow OS changes unless the visitor chose explicitly
    if (window.matchMedia) matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      let stored = null; try { stored = localStorage.getItem("theme"); } catch (err) {}
      if (!stored) set(e.matches ? "dark" : "light", false);
    });
    return { toggle: () => btn && btn.click() };
  }

  /* ---------- navigation --------------------------------------------------- */
  function initNav() {
    const brand = $(".nav__brand");
    if (brand) {
      const mark = ID.wordmark || ID.name || "home";
      const dot = mark.indexOf(".");
      brand.innerHTML = dot > 0
        ? esc(mark.slice(0, dot)) + '<span class="brand__accent">' + esc(mark.slice(dot)) + "</span>"
        : esc(mark);
      brand.href = HOME ? "#top" : "index.html";
    }
    const links = (SITE.nav || []).map((n) =>
      '<a class="nav__link" href="' + esc(ROOT + n.href) + '">' + esc(n.label) + "</a>").join("");
    const primary = $("#primary-nav");
    if (primary) primary.innerHTML = links;
    const mobileNav = $("#mobile-nav");
    if (mobileNav) mobileNav.innerHTML = links;

    // mobile menu
    const toggle = $("#menu-toggle");
    const menu = $("#mobile-menu");
    if (toggle && menu) {
      toggle.innerHTML = icon("menu");
      const close = () => {
        menu.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        toggle.innerHTML = icon("menu");
        document.body.classList.remove("menu-open");
      };
      const open = () => {
        menu.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
        toggle.innerHTML = icon("close");
        document.body.classList.add("menu-open");
      };
      toggle.addEventListener("click", () => (menu.hidden ? open() : close()));
      menu.addEventListener("click", (e) => { if (e.target.closest("a")) close(); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { close(); toggle.focus(); } });
      matchMedia("(min-width: 861px)").addEventListener("change", (e) => { if (e.matches) close(); });
    }

    // scroll-spy (home only)
    if (HOME && "IntersectionObserver" in window) {
      const map = new Map();
      $$(".nav__link", primary).forEach((a) => {
        const id = (a.getAttribute("href") || "").split("#")[1];
        const sec = id && document.getElementById(id);
        if (sec) map.set(sec, a);
      });
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          const link = map.get(en.target);
          if (!link) return;
          if (en.isIntersecting) {
            $$(".nav__link", primary).forEach((l) => { l.classList.remove("is-active"); l.removeAttribute("aria-current"); });
            link.classList.add("is-active");
            link.setAttribute("aria-current", "true");
          }
        });
      }, { rootMargin: "-35% 0px -55% 0px" });
      map.forEach((_, sec) => spy.observe(sec));
    }
  }

  /* ---------- hero ---------------------------------------------------------- */
  function renderHero() {
    const slot = $("#hero-slot");
    if (!slot || !SITE.hero) return;
    const H = SITE.hero;

    const headline = String(H.headline || "").split("|").map((part, i) =>
      i % 2 ? '<em class="accent-serif">' + esc(part) + "</em>" : esc(part)).join("");

    const status = ID.availability
      ? '<span class="dot" aria-hidden="true"></span><span>' + esc(ID.availability) + "</span>" +
        '<span class="hero__sep" aria-hidden="true">·</span><span>' + esc(ID.location) + "</span>" +
        '<span class="hero__sep" aria-hidden="true">·</span><time id="local-time"></time> <span class="tz">' + esc(ID.timezoneLabel || "") + "</span>"
      : "<span>" + esc(ID.location || "") + "</span>";

    const ctas = (H.ctas || []).map((c) =>
      '<a class="btn btn--' + esc(c.kind || "secondary") + '" href="' + esc(c.href) + '">' + esc(c.label) +
      (c.kind === "primary" ? icon("arrow-right") : icon("download")) + "</a>").join("");

    slot.innerHTML =
      '<div class="hero__content">' +
        '<p class="hero__status mono reveal">' + status + "</p>" +
        '<h1 class="hero__title reveal">' + headline + "</h1>" +
        '<p class="hero__typed mono reveal"><span class="type__prefix">' + esc(H.typedPrefix || "") + " </span>" +
          '<span class="type__word" aria-hidden="true"></span><span class="type__caret" aria-hidden="true"></span>' +
          '<span class="sr-only">' + esc((H.typedRoles || []).join(", ")) + ".</span></p>" +
        '<p class="hero__intro reveal">' + esc(H.intro || "") + "</p>" +
        '<div class="hero__cta reveal">' + ctas +
          '<button type="button" class="btn btn--ghost" data-palette-open>' + icon("command") + "<span>Command menu</span><kbd>Ctrl K</kbd></button>" +
        "</div>" +
      "</div>";

    // live local clock
    const timeEl = $("#local-time");
    if (timeEl) {
      const tick = () => {
        try {
          timeEl.textContent = new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit", minute: "2-digit", hour12: false, timeZone: ID.timezone || undefined
          }).format(new Date());
        } catch (e) { timeEl.textContent = new Date().toTimeString().slice(0, 5); }
        timeEl.dateTime = new Date().toISOString();
      };
      tick();
      setInterval(tick, 15000);
    }

    // typing rotator
    const wordEl = $(".type__word", slot);
    const roles = H.typedRoles || [];
    if (wordEl && roles.length) {
      if (reduced() || roles.length === 1) { wordEl.textContent = roles[0]; }
      else {
        let ri = 0, ci = 0, deleting = false;
        const step = () => {
          const role = roles[ri];
          if (!deleting) {
            ci++;
            wordEl.textContent = role.slice(0, ci);
            if (ci === role.length) { deleting = true; return setTimeout(step, 2100); }
            return setTimeout(step, 46 + Math.random() * 40);
          }
          ci--;
          wordEl.textContent = role.slice(0, ci);
          if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; return setTimeout(step, 360); }
          setTimeout(step, 26);
        };
        setTimeout(step, 700);
      }
    }

    // gentle pointer parallax on the background blobs (fine pointers only)
    const hero = $(".hero");
    if (hero && !reduced() && matchMedia("(pointer: fine)").matches) {
      const a = $(".blob--a", hero), b = $(".blob--b", hero);
      let raf = null;
      hero.addEventListener("pointermove", (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = null;
          const r = hero.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          if (a) a.style.transform = "translate3d(" + x * 34 + "px," + y * 26 + "px,0)";
          if (b) b.style.transform = "translate3d(" + x * -26 + "px," + y * -20 + "px,0)";
        });
      });
    }
  }

  /* ---------- shared section header ---------------------------------------- */
  function sectionHead(secId, meta, extra) {
    const section = document.getElementById(secId);
    if (section) section.setAttribute("aria-labelledby", secId + "-title");
    return '<div class="section__head">' +
      '<p class="kicker mono reveal">' + esc(meta.kicker || "") + "</p>" +
      '<h2 class="section__title reveal" id="' + secId + '-title">' + esc(meta.title || "") + "</h2>" +
      (meta.lede ? '<p class="section__lede reveal">' + esc(meta.lede) + "</p>" : "") +
      (extra || "") +
    "</div>";
  }

  /* ---------- generated project cover art ----------------------------------- */
  function seeded(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return () => {
      h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
      return ((h >>> 0) % 1000) / 1000;
    };
  }
  function coverSVG(project) {
    const rnd = seeded(project.slug || project.name || "x");
    const u = "cv-" + (project.slug || Math.round(rnd() * 1e6));
    const cx = 120 + rnd() * 400, cy = 80 + rnd() * 220, r = 90 + rnd() * 120;
    const lx = 60 + rnd() * 300, sx = 420 + rnd() * 160, sy = 60 + rnd() * 260;
    const rot = Math.round(rnd() * 3) * 90;
    const letter = (project.name || "?").trim().charAt(0).toUpperCase();
    return '<svg class="cover" viewBox="0 0 640 400" role="img" aria-label="Abstract cover art for ' + esc(project.name) + '" preserveAspectRatio="xMidYMid slice">' +
      '<rect width="640" height="400" fill="var(--cover-bg)"/>' +
      '<defs><pattern id="' + u + '" width="22" height="22" patternUnits="userSpaceOnUse">' +
        '<circle cx="2" cy="2" r="1.4" fill="var(--cover-dot)"/></pattern></defs>' +
      '<rect x="' + Math.round(lx) + '" y="216" width="300" height="184" fill="url(#' + u + ')" transform="rotate(' + rot + " 320 200)\"/>" +
      '<circle cx="' + Math.round(cx) + '" cy="' + Math.round(cy) + '" r="' + Math.round(r) + '" fill="none" stroke="var(--cover-line)" stroke-width="1.4"/>' +
      '<circle cx="' + Math.round(sx) + '" cy="' + Math.round(sy) + '" r="' + Math.round(16 + rnd() * 14) + '" fill="var(--cover-accent)"/>' +
      '<path d="M0 ' + Math.round(300 + rnd() * 80) + " L640 " + Math.round(40 + rnd() * 160) + '" stroke="var(--cover-line)" stroke-width="1.2"/>' +
      '<text x="588" y="372" text-anchor="end" class="cover__letter">' + esc(letter) + "</text>" +
    "</svg>";
  }

  /* ---------- projects -------------------------------------------------------- */
  const projectBySlug = (slug) => (SITE.projects || []).find((p) => p.slug === slug);

  function renderProjects() {
    const section = $('[data-render="projects"]');
    if (!section || !SITE.projects || !SITE.projects.length) { if (section) section.hidden = true; return; }
    const slot = $("[data-slot]", section);
    const cats = Array.from(new Set(SITE.projects.map((p) => p.category)));
    const state = { cat: "All", q: "", sort: "featured", limit: 6 };

    slot.innerHTML =
      sectionHead("work", SITE.projectsMeta || {}) +
      '<div class="toolbar reveal">' +
        '<div class="filters" role="group" aria-label="Filter projects by category">' +
          ["All"].concat(cats).map((c, i) =>
            '<button type="button" class="chip" data-cat="' + esc(c) + '" aria-pressed="' + (i === 0) + '">' + esc(c) + "</button>").join("") +
        "</div>" +
        '<div class="toolbar__tools">' +
          '<label class="searchwrap"><span class="sr-only">Search projects</span>' + icon("search") +
            '<input type="search" id="project-search" placeholder="Search projects…" autocomplete="off"></label>' +
          '<label class="sortwrap"><span class="sr-only">Sort projects</span>' +
            '<select id="project-sort"><option value="featured">Featured first</option>' +
            '<option value="new">Newest</option><option value="az">A – Z</option></select>' + icon("chevron") + "</label>" +
        "</div>" +
      "</div>" +
      '<p class="toolbar__count mono" id="project-count" role="status"></p>' +
      '<div class="projects__grid" id="projects-grid"></div>' +
      '<div class="projects__more"><button type="button" class="btn btn--secondary" id="projects-more" hidden></button></div>';

    const grid = $("#projects-grid", slot);
    const count = $("#project-count", slot);
    const more = $("#projects-more", slot);

    const firstYear = (p) => parseInt(String(p.year).slice(0, 4), 10) || 0;
    const apply = () => {
      let list = SITE.projects.filter((p) => state.cat === "All" || p.category === state.cat);
      if (state.q) {
        const q = state.q.toLowerCase();
        list = list.filter((p) =>
          (p.name + " " + p.tagline + " " + (p.tags || []).join(" ") + " " + p.category).toLowerCase().includes(q));
      }
      if (state.sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
      else if (state.sort === "new") list.sort((a, b) => firstYear(b) - firstYear(a));
      else list.sort((a, b) => (b.featured === true) - (a.featured === true) || firstYear(b) - firstYear(a));
      return list;
    };

    const card = (p) =>
      '<article class="project-card' + (p.featured && state.sort === "featured" && state.cat === "All" && !state.q ? " project-card--featured" : "") + ' reveal">' +
        '<div class="project-card__media" aria-hidden="true">' + coverSVG(p) + "</div>" +
        '<div class="project-card__body">' +
          '<p class="project-card__meta mono">' + esc(p.category) + ' <span aria-hidden="true">·</span> ' + esc(p.year) + "</p>" +
          '<h3 class="project-card__title"><button type="button" class="project-card__link" data-project="' + esc(p.slug) + '">' +
            esc(p.name) + "</button></h3>" +
          '<p class="project-card__tagline">' + esc(p.tagline) + "</p>" +
          '<ul class="tags" aria-label="Technologies">' + (p.tags || []).slice(0, 4).map((t) => "<li class='tag mono'>" + esc(t) + "</li>").join("") + "</ul>" +
          '<span class="project-card__cta mono" aria-hidden="true">Case study ' + icon("arrow-right") + "</span>" +
        "</div>" +
      "</article>";

    const paint = () => {
      const list = apply();
      const visible = list.slice(0, state.limit);
      grid.innerHTML = visible.length
        ? visible.map(card).join("")
        : '<p class="projects__empty">Nothing matches that filter — try clearing the search.</p>';
      count.textContent = list.length + (list.length === 1 ? " project" : " projects") +
        (state.cat !== "All" ? " · " + state.cat : "") + (state.q ? " · “" + state.q + "”" : "");
      more.hidden = list.length <= state.limit;
      if (!more.hidden) more.textContent = "Show all " + list.length + " projects";
      observeReveals(grid);
    };

    $(".filters", slot).addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cat]");
      if (!btn) return;
      state.cat = btn.dataset.cat; state.limit = 6;
      $$("[data-cat]", slot).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      paint();
    });
    $("#project-search", slot).addEventListener("input", (e) => { state.q = e.target.value.trim(); state.limit = 6; paint(); });
    $("#project-sort", slot).addEventListener("change", (e) => { state.sort = e.target.value; state.limit = 6; paint(); });
    more.addEventListener("click", () => { state.limit = Infinity; paint(); });
    grid.addEventListener("click", (e) => {
      const b = e.target.closest("[data-project]");
      if (b) openProject(b.dataset.project, b);
    });

    paint();
  }

  /* ---------- case-study modal -------------------------------------------------- */
  let modalReturnFocus = null;
  function openProject(slug, opener) {
    const p = projectBySlug(slug);
    const dlg = $("#project-modal");
    if (!p || !dlg) return;
    modalReturnFocus = opener || document.activeElement;

    const list = (title, items, cls) => (items && items.length)
      ? '<section class="modal__section"><h4 class="modal__h mono">' + esc(title) + '</h4><ul class="' + (cls || "dashlist") + '">' +
        items.map((i) => "<li>" + esc(i) + "</li>").join("") + "</ul></section>"
      : "";
    const para = (title, text) => text
      ? '<section class="modal__section"><h4 class="modal__h mono">' + esc(title) + "</h4><p>" + esc(text) + "</p></section>" : "";

    $("#project-modal-body").innerHTML =
      '<button type="button" class="icon-btn modal__close" data-close aria-label="Close case study">' + icon("close") + "</button>" +
      '<header class="modal__head">' +
        '<p class="project-card__meta mono">' + esc(p.category) + " · " + esc(p.year) + " · " + esc(p.role) + "</p>" +
        '<h3 class="modal__title" id="project-modal-title">' + esc(p.name) + "</h3>" +
        '<p class="modal__tagline">' + esc(p.tagline) + "</p>" +
        '<div class="modal__links">' +
          (p.links && p.links.demo ? '<a class="btn btn--primary" href="' + esc(p.links.demo) + '" target="_blank" rel="noopener noreferrer">Live demo ' + icon("external") + "</a>" : "") +
          (p.links && p.links.repo ? '<a class="btn btn--secondary" href="' + esc(p.links.repo) + '" target="_blank" rel="noopener noreferrer">' + icon("github") + " Source</a>" : "") +
        "</div>" +
      "</header>" +
      '<div class="modal__cover" aria-hidden="true">' + coverSVG(p) + "</div>" +
      ((p.metrics && p.metrics.length) ? '<dl class="metrics">' + p.metrics.map((m) =>
        '<div class="metric"><dt class="metric__label">' + esc(m.label) + '</dt><dd class="metric__value">' + esc(m.value) + "</dd></div>").join("") + "</dl>" : "") +
      para("The problem", p.problem) +
      para("The solution", p.solution) +
      list("Key features", p.features, "check-list") +
      para("Architecture", p.architecture) +
      list("Hard parts", p.challenges) +
      list("What I learned", p.lessons) +
      list("On the roadmap", p.improvements) +
      ((p.tags && p.tags.length) ? '<ul class="tags modal__tags" aria-label="Technologies">' + p.tags.map((t) => "<li class='tag mono'>" + esc(t) + "</li>").join("") + "</ul>" : "");

    dlg.showModal();
    document.body.classList.add("modal-open");
    dlg.scrollTop = 0;
  }
  function initModal() {
    const dlg = $("#project-modal");
    if (!dlg) return;
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg || e.target.closest("[data-close]")) dlg.close();
    });
    dlg.addEventListener("close", () => {
      document.body.classList.remove("modal-open");
      if (modalReturnFocus && modalReturnFocus.isConnected) modalReturnFocus.focus();
    });
  }

  /* ---------- about ---------------------------------------------------------------- */
  function renderAbout() {
    const section = $('[data-render="about"]');
    if (!section || !SITE.about) return;
    const A = SITE.about;
    const initials = (ID.name || "?").split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
    const portrait = ID.photo
      ? '<img class="portrait__img" src="' + esc(ID.photo) + '" alt="' + esc(ID.photoAlt || ID.name) + '" loading="lazy" width="640" height="720">'
      : '<div class="portrait__mono" role="img" aria-label="Monogram of ' + esc(ID.name) + '"><span>' + esc(initials) + "</span></div>";

    $("[data-slot]", section).innerHTML =
      sectionHead("about", A) +
      '<div class="about__grid">' +
        '<div class="about__col reveal">' +
          (A.paragraphs || []).map((p) => "<p>" + esc(p) + "</p>").join("") +
          '<dl class="about__values" data-stagger>' + (A.values || []).map((v) =>
            '<div class="value reveal"><dt class="value__name">' + esc(v.name) + '</dt><dd class="value__detail">' + esc(v.detail) + "</dd></div>").join("") + "</dl>" +
        "</div>" +
        '<aside class="about__aside reveal">' +
          '<figure class="portrait">' + portrait + "</figure>" +
          '<dl class="facts">' + (A.facts || []).map((f) =>
            '<div class="fact"><dt class="fact__label mono">' + esc(f.label) + '</dt><dd class="fact__value">' + esc(f.value) + "</dd></div>").join("") + "</dl>" +
        "</aside>" +
      "</div>";
  }

  /* ---------- skills ------------------------------------------------------------------ */
  function renderSkills() {
    const section = $('[data-render="skills"]');
    if (!section || !SITE.skills) return;
    const S = SITE.skills;
    const dots = (level) => {
      const names = ["", "Working knowledge", "Advanced", "Expert"];
      let out = "";
      for (let i = 1; i <= 3; i++) out += '<span class="level__dot' + (i <= level ? " level__dot--on" : "") + '"></span>';
      return '<span class="level" role="img" aria-label="' + names[level] + " (" + level + ' of 3)">' + out + "</span>";
    };
    const chips = (S.stack || []).map((t) => '<span class="chip chip--static mono">' + esc(t) + "</span>").join("");

    $("[data-slot]", section).innerHTML =
      sectionHead("skills", S) +
      '<div class="skills__grid" data-stagger>' + (S.categories || []).map((c) =>
        '<div class="skill-card reveal"><h3 class="skill-card__name">' + esc(c.name) + "</h3>" +
          '<ul class="skill-list">' + (c.items || []).map((i) =>
            '<li class="skill-item"><span>' + esc(i.name) + "</span>" + dots(i.level) + "</li>").join("") + "</ul></div>").join("") +
      "</div>" +
      '<p class="skills__legend mono reveal"><span class="level"><span class="level__dot level__dot--on"></span><span class="level__dot level__dot--on"></span><span class="level__dot level__dot--on"></span></span> expert · daily driver&ensp;' +
      '<span class="level"><span class="level__dot level__dot--on"></span><span class="level__dot level__dot--on"></span><span class="level__dot"></span></span> advanced&ensp;' +
      '<span class="level"><span class="level__dot level__dot--on"></span><span class="level__dot"></span><span class="level__dot"></span></span> working knowledge</p>' +
      (chips ? '<div class="marquee reveal" data-marquee aria-label="Technology stack">' +
        '<div class="marquee__track"><div class="marquee__row">' + chips + '</div><div class="marquee__row" aria-hidden="true">' + chips + "</div></div></div>" : "");
  }

  /* ---------- services ------------------------------------------------------------------- */
  function renderServices() {
    const section = $('[data-render="services"]');
    if (!section || !SITE.services || !(SITE.services.items || []).length) { if (section) section.hidden = true; return; }
    const S = SITE.services;
    $("[data-slot]", section).innerHTML =
      sectionHead("services", S) +
      '<div class="services__grid" data-stagger>' + S.items.map((s) =>
        '<div class="service-card reveal">' +
          '<h3 class="service-card__name">' + esc(s.name) + "</h3>" +
          '<p class="service-card__detail">' + esc(s.detail) + "</p>" +
          '<ul class="check-list">' + (s.includes || []).map((i) => "<li>" + esc(i) + "</li>").join("") + "</ul>" +
          '<p class="service-card__engagement mono">' + esc(s.engagement || "") + "</p>" +
        "</div>").join("") + "</div>";
  }

  /* ---------- experience tabs --------------------------------------------------------------- */
  function renderExperience() {
    const section = $('[data-render="experience"]');
    if (!section || !SITE.experience) return;
    const E = SITE.experience;

    const work = (E.work || []).map((w) =>
      '<li class="tl__item reveal"><span class="tl__marker" aria-hidden="true"></span>' +
        '<p class="tl__period mono">' + esc(w.period) + " · " + esc(w.location) + "</p>" +
        '<h3 class="tl__role">' + esc(w.role) + ' <span class="tl__org">— ' +
          (w.org_url ? '<a href="' + esc(w.org_url) + '" target="_blank" rel="noopener noreferrer">' + esc(w.org) + "</a>" : esc(w.org)) + "</span></h3>" +
        '<p class="tl__summary">' + esc(w.summary) + "</p>" +
        '<ul class="dashlist">' + (w.points || []).map((p) => "<li>" + esc(p) + "</li>").join("") + "</ul>" +
        '<ul class="tags" aria-label="Stack">' + (w.stack || []).map((t) => "<li class='tag mono'>" + esc(t) + "</li>").join("") + "</ul>" +
      "</li>").join("");

    const edu = (E.education || []).map((d) =>
      '<li class="tl__item reveal"><span class="tl__marker" aria-hidden="true"></span>' +
        '<p class="tl__period mono">' + esc(d.period) + " · " + esc(d.location) + "</p>" +
        '<h3 class="tl__role">' + esc(d.degree) + ' <span class="tl__org">— ' + esc(d.org) + "</span></h3>" +
        '<ul class="dashlist">' + (d.points || []).map((p) => "<li>" + esc(p) + "</li>").join("") + "</ul>" +
      "</li>").join("");

    const certs = (E.certifications || []).map((c) =>
      '<li class="cert reveal"><span class="cert__name">' +
        (c.url ? '<a href="' + esc(c.url) + '" target="_blank" rel="noopener noreferrer">' + esc(c.name) + " " + icon("external") + "</a>" : esc(c.name)) +
      '</span><span class="cert__meta mono">' + esc(c.issuer) + " · " + esc(c.year) + "</span></li>").join("");

    const tabs = [
      { id: "work", label: "Work", body: '<ol class="timeline">' + work + "</ol>" },
      { id: "education", label: "Education", body: '<ol class="timeline">' + edu + "</ol>" },
      { id: "certs", label: "Certifications", body: '<ul class="certs">' + certs + "</ul>" }
    ].filter((t) => /<(li|div)/.test(t.body));

    $("[data-slot]", section).innerHTML =
      sectionHead("experience", E) +
      '<div class="tabs reveal" role="tablist" aria-label="Experience categories">' + tabs.map((t, i) =>
        '<button class="tab" id="tab-' + t.id + '" type="button" role="tab" aria-selected="' + (i === 0) +
        '" aria-controls="panel-' + t.id + '" tabindex="' + (i === 0 ? "0" : "-1") + '">' + esc(t.label) + "</button>").join("") + "</div>" +
      tabs.map((t, i) =>
        '<div class="tabpanel" id="panel-' + t.id + '" role="tabpanel" aria-labelledby="tab-' + t.id + '" tabindex="0"' + (i ? " hidden" : "") + ">" + t.body + "</div>").join("");

    const tabEls = $$('[role="tab"]', section);
    const select = (tab) => {
      tabEls.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) { panel.hidden = !on; if (on) observeReveals(panel); }
      });
      tab.focus();
    };
    tabEls.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        let j = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") j = (i + 1) % tabEls.length;
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") j = (i - 1 + tabEls.length) % tabEls.length;
        if (e.key === "Home") j = 0;
        if (e.key === "End") j = tabEls.length - 1;
        if (j !== null) { e.preventDefault(); select(tabEls[j]); }
      });
    });
  }

  /* ---------- achievements: counters + awards --------------------------------------------------- */
  function renderAchievements() {
    const section = $('[data-render="achievements"]');
    if (!section || !SITE.achievements) return;
    const A = SITE.achievements;
    $("[data-slot]", section).innerHTML =
      sectionHead("numbers", A) +
      '<dl class="stats" data-stagger>' + (A.stats || []).map((s) =>
        '<div class="stat reveal"><dd class="stat__value mono" data-count="' + s.value + '" data-decimals="' + (s.decimals || 0) +
        '" data-suffix="' + esc(s.suffix || "") + '">0</dd><dt class="stat__label">' + esc(s.label) + "</dt></div>").join("") + "</dl>" +
      ((A.awards || []).length ? '<ul class="awards" data-stagger>' + A.awards.map((a) =>
        '<li class="award reveal">' + icon("zap") + '<div><p class="award__name">' + esc(a.name) + '</p><p class="award__by mono">' +
        esc(a.by) + " · " + esc(a.year) + "</p></div></li>").join("") + "</ul>" : "");

    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.decimals, 10) || 0;
      const suffix = el.dataset.suffix || "";
      const fmt = (v) => v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
      if (reduced()) { el.textContent = fmt(target); return; }
      const t0 = performance.now(), dur = 1400;
      const frame = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { animate(en.target); io.unobserve(en.target); }
      }), { threshold: 0.5 });
      $$("[data-count]", section).forEach((el) => io.observe(el));
    } else $$("[data-count]", section).forEach(animate);
  }

  /* ---------- testimonials carousel ------------------------------------------------------------- */
  function renderTestimonials() {
    const section = $('[data-render="testimonials"]');
    if (!section || !SITE.testimonials || !(SITE.testimonials.items || []).length) { if (section) section.hidden = true; return; }
    const T = SITE.testimonials;
    $("[data-slot]", section).innerHTML =
      sectionHead("testimonials", T,
        '<div class="carousel__nav"><button type="button" class="icon-btn carousel__btn" data-dir="-1" aria-label="Previous testimonials">' +
        icon("arrow-right", "flip") + '</button><button type="button" class="icon-btn carousel__btn" data-dir="1" aria-label="Next testimonials">' +
        icon("arrow-right") + "</button></div>") +
      '<div class="quotes" tabindex="0" role="group" aria-label="Testimonials — scrollable">' + T.items.map((q) =>
        '<figure class="quote-card reveal"><blockquote class="quote-card__text"><p>' + esc(q.quote) + "</p></blockquote>" +
        '<figcaption><span class="quote-card__name">' + esc(q.name) + '</span><span class="quote-card__role mono">' + esc(q.role) + "</span></figcaption></figure>").join("") +
      "</div>";

    const track = $(".quotes", section);
    const btns = $$(".carousel__btn", section);
    const step = () => {
      const cardEl = $(".quote-card", track);
      return cardEl ? cardEl.getBoundingClientRect().width + 20 : 320;
    };
    btns.forEach((b) => b.addEventListener("click", () =>
      track.scrollBy({ left: step() * Number(b.dataset.dir), behavior: reduced() ? "auto" : "smooth" })));
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth - 4;
      btns[0].disabled = track.scrollLeft <= 4;
      btns[1].disabled = track.scrollLeft >= max;
    };
    track.addEventListener("scroll", () => requestAnimationFrame(sync), { passive: true });
    window.addEventListener("resize", sync);
    sync();
  }

  /* ---------- writing preview ---------------------------------------------------------------------- */
  function postCard(p) {
    return '<article class="post-card reveal">' +
      '<p class="post-card__date mono"><time datetime="' + esc(p.date) + '">' + fmtDate(p.date) + "</time> · " + readingTime(p.body) + "</p>" +
      '<h3 class="post-card__title"><a href="blog.html?post=' + encodeURIComponent(p.slug) + '">' + esc(p.title) + "</a></h3>" +
      '<p class="post-card__summary">' + esc(p.summary) + "</p>" +
      '<ul class="tags" aria-label="Topics">' + (p.tags || []).map((t) => "<li class='tag mono'>" + esc(t) + "</li>").join("") + "</ul>" +
    "</article>";
  }
  function renderWriting() {
    const section = $('[data-render="writing"]');
    if (!section || !(SITE.posts || []).length) { if (section) section.hidden = true; return; }
    const posts = SITE.posts.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
    $("[data-slot]", section).innerHTML =
      sectionHead("writing", SITE.writingMeta || {}) +
      '<div class="posts-grid" data-stagger>' + posts.map(postCard).join("") + "</div>" +
      '<p class="writing__all reveal"><a class="btn btn--secondary" href="blog.html">All writing ' + icon("arrow-right") + "</a></p>";
  }

  /* ---------- gallery + lightbox ---------------------------------------------------------------------- */
  function renderGallery() {
    const section = $('[data-render="gallery"]');
    if (!section) return;
    const G = SITE.gallery || {};
    if (!(G.items || []).length) { section.hidden = true; return; }
    section.hidden = false;
    $("[data-slot]", section).innerHTML =
      sectionHead("gallery", G) +
      '<div class="gallery__grid" data-stagger>' + G.items.map((g, i) =>
        '<figure class="shot reveal"><button type="button" class="shot__btn" data-lightbox="' + i + '" aria-label="View larger: ' + esc(g.alt) + '">' +
        '<img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" loading="lazy"></button>' +
        (g.caption ? '<figcaption class="shot__cap mono">' + esc(g.caption) + "</figcaption>" : "") + "</figure>").join("") + "</div>";
  }
  function initLightbox() {
    const dlg = $("#lightbox");
    if (!dlg) return;
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lightbox]");
      if (!btn) return;
      const item = (SITE.gallery.items || [])[Number(btn.dataset.lightbox)];
      if (!item) return;
      $("#lightbox-img").src = item.src;
      $("#lightbox-img").alt = item.alt || "";
      $("#lightbox-cap").textContent = item.caption || "";
      dlg.showModal();
    });
    dlg.addEventListener("click", () => dlg.close());
  }

  /* ---------- FAQ ------------------------------------------------------------------------------------- */
  function renderFAQ() {
    const section = $('[data-render="faq"]');
    if (!section || !SITE.faq || !(SITE.faq.items || []).length) { if (section) section.hidden = true; return; }
    $("[data-slot]", section).innerHTML =
      sectionHead("faq", SITE.faq) +
      '<div class="faq__list" data-stagger>' + SITE.faq.items.map((f) =>
        '<details class="faq-item reveal" name="faq"><summary class="faq__q">' + esc(f.q) + icon("chevron") + "</summary>" +
        '<p class="faq__a">' + esc(f.a) + "</p></details>").join("") + "</div>";
  }

  /* ---------- contact --------------------------------------------------------------------------------- */
  function renderContact() {
    const section = $('[data-render="contact"]');
    if (!section || !SITE.contact) return;
    const C = SITE.contact;
    const socials = (C.socials || []).map((s) =>
      '<a class="social-link" href="' + esc(s.url) + '"' + (/^https?:/.test(s.url) ? ' target="_blank" rel="noopener noreferrer me"' : "") + ">" +
      icon(s.icon || "external") + "<span>" + esc(s.name) + "</span></a>").join("");

    $("[data-slot]", section).innerHTML =
      sectionHead("contact", C) +
      '<div class="contact__grid">' +
        '<div class="contact__info reveal">' +
          '<p class="contact__note">' + esc(C.note || "Email:") + "</p>" +
          '<p class="contact__email"><a href="mailto:' + esc(ID.email) + '">' + esc(ID.email) + "</a>" +
            '<button type="button" class="icon-btn" id="copy-email" aria-label="Copy email address">' + icon("copy") + "</button></p>" +
          '<div class="socials">' + socials + "</div>" +
        "</div>" +
        '<form class="form reveal" id="contact-form" novalidate>' +
          '<div class="field"><label class="field__label" for="cf-name">Name</label>' +
            '<input class="field__input" id="cf-name" name="name" type="text" autocomplete="name" required aria-describedby="cf-name-err">' +
            '<p class="field__error" id="cf-name-err"></p></div>' +
          '<div class="field"><label class="field__label" for="cf-email">Email</label>' +
            '<input class="field__input" id="cf-email" name="email" type="email" autocomplete="email" required aria-describedby="cf-email-err">' +
            '<p class="field__error" id="cf-email-err"></p></div>' +
          '<div class="field"><label class="field__label" for="cf-msg">About the project</label>' +
            '<textarea class="field__input" id="cf-msg" name="message" rows="5" required minlength="20" aria-describedby="cf-msg-err" placeholder="What are you building, and what does success look like?"></textarea>' +
            '<p class="field__error" id="cf-msg-err"></p></div>' +
          '<div class="field field--hp" aria-hidden="true"><label for="cf-web">Leave this field empty</label>' +
            '<input id="cf-web" name="website" type="text" tabindex="-1" autocomplete="off"></div>' +
          '<input type="hidden" name="_started" id="cf-started">' +
          '<button class="btn btn--primary form__submit" type="submit"><span>Send message</span>' + icon("arrow-right") + "</button>" +
          '<p class="status-msg" id="form-status" role="status"></p>' +
        "</form>" +
      "</div>";

    $("#cf-started").value = String(Date.now());

    $("#copy-email").addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(ID.email); toast("Email address copied"); }
      catch (e) { toast("Copy failed — email is " + ID.email); }
    });

    const form = $("#contact-form");
    const status = $("#form-status");
    const fields = [
      { el: $("#cf-name"), err: $("#cf-name-err"), check: (v) => v.trim().length >= 2 || "Please add your name." },
      { el: $("#cf-email"), err: $("#cf-email-err"), check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || "That email doesn't look right — check for typos." },
      { el: $("#cf-msg"), err: $("#cf-msg-err"), check: (v) => v.trim().length >= 20 || "A sentence or two helps me reply usefully (20+ characters)." }
    ];
    const validate = () => {
      let firstBad = null;
      fields.forEach((f) => {
        const res = f.check(f.el.value);
        const bad = res !== true;
        f.el.setAttribute("aria-invalid", String(bad));
        f.err.textContent = bad ? res : "";
        if (bad && !firstBad) firstBad = f.el;
      });
      if (firstBad) firstBad.focus();
      return !firstBad;
    };
    fields.forEach((f) => f.el.addEventListener("input", () => {
      if (f.el.getAttribute("aria-invalid") === "true") {
        const res = f.check(f.el.value);
        if (res === true) { f.el.setAttribute("aria-invalid", "false"); f.err.textContent = ""; }
      }
    }));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "";
      if (!validate()) return;

      // spam checks: honeypot filled or submitted inhumanly fast → pretend success
      const tooFast = Date.now() - Number($("#cf-started").value) < 2500;
      if (form.website.value || tooFast) { status.textContent = "Thanks — your message is on its way."; form.reset(); return; }

      const payload = { name: form.name.value.trim(), email: form.email.value.trim(), message: form.message.value.trim() };
      const btn = $(".form__submit", form);

      if (CFG.formEndpoint) {
        btn.disabled = true;
        btn.firstElementChild.textContent = "Sending…";
        try {
          const res = await fetch(CFG.formEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload)
          });
          if (!res.ok) throw new Error("HTTP " + res.status);
          status.textContent = "Thanks, " + payload.name.split(" ")[0] + " — your message is on its way. I reply within two working days.";
          form.reset();
          $("#cf-started").value = String(Date.now());
        } catch (err) {
          status.textContent = "Sending failed — the form service didn't respond. Please email " + ID.email + " directly.";
        } finally {
          btn.disabled = false;
          btn.firstElementChild.textContent = "Send message";
        }
      } else {
        // no endpoint configured → hand off to the visitor's email app
        const subject = encodeURIComponent("Project enquiry from " + payload.name);
        const body = encodeURIComponent(payload.message + "\n\n— " + payload.name + " (" + payload.email + ")");
        status.textContent = "Opening your email app with the message pre-filled…";
        window.location.href = "mailto:" + ID.email + "?subject=" + subject + "&body=" + body;
      }
    });
  }

  /* ---------- footer ------------------------------------------------------------------------------------ */
  function renderFooter() {
    const slot = $("#site-footer [data-slot]");
    if (!slot) return;
    const F = SITE.footer || {};
    const socials = ((SITE.contact || {}).socials || []).map((s) =>
      '<a class="icon-btn" href="' + esc(s.url) + '" aria-label="' + esc(s.name) + '"' +
      (/^https?:/.test(s.url) ? ' target="_blank" rel="noopener noreferrer me"' : "") + ">" + icon(s.icon || "external") + "</a>").join("");
    const navLinks = (F.nav || []).map((n) => '<a href="' + esc(n.href) + '">' + esc(n.label) + "</a>").join("");
    const newsletter = CFG.newsletterEndpoint
      ? '<form class="newsletter" action="' + esc(CFG.newsletterEndpoint) + '" method="post" target="_blank">' +
        '<label class="mono" for="nl-email">Occasional notes on building reliable software</label>' +
        '<div class="newsletter__row"><input id="nl-email" name="email" type="email" required placeholder="you@example.com" autocomplete="email">' +
        '<button class="btn btn--primary" type="submit">Subscribe</button></div></form>'
      : "";

    slot.innerHTML =
      '<div class="footer__grid">' +
        '<div><p class="footer__name">' + esc(ID.name) + '</p><p class="footer__tagline">' + esc(F.tagline || "") + "</p>" + newsletter + "</div>" +
        '<div class="footer__cols"><nav class="footer__nav" aria-label="Footer">' + navLinks + '</nav><div class="footer__socials">' + socials + "</div></div>" +
      "</div>" +
      '<div class="footer__bottom"><p>© <span id="year"></span> ' + esc(ID.name) + ". All rights reserved.</p>" +
      '<p class="footer__meta mono">' + esc(F.version || "") + ' · <a href="' + (HOME ? "#top" : "index.html") + '">' + (HOME ? "Back to top ↑" : "Home") + "</a></p></div>";
    const y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* ---------- command palette ------------------------------------------------------------------------------ */
  function initPalette(themeCtl) {
    const dlg = $("#palette");
    const input = $("#palette-input");
    const listEl = $("#palette-list");
    const emptyEl = $("#palette-empty");
    if (!dlg || !input || !listEl) return;

    let opener = null;
    const go = (href) => { dlg.close(); window.location.href = href; };
    const items = [];
    (SITE.nav || []).forEach((n) => items.push({ group: "Sections", label: n.label, hint: "Go to section", icon: "hash", run: () => go(ROOT + n.href) }));
    (SITE.projects || []).forEach((p) => items.push({
      group: "Projects", label: p.name, hint: p.tagline, keywords: (p.tags || []).join(" "),
      icon: "zap", run: () => { dlg.close(); HOME ? openProject(p.slug) : go("index.html#work"); }
    }));
    (SITE.posts || []).forEach((p) => items.push({ group: "Writing", label: p.title, hint: fmtDate(p.date), icon: "file", run: () => go("blog.html?post=" + encodeURIComponent(p.slug)) }));
    items.push(
      { group: "Actions", label: "Toggle light / dark theme", hint: "Appearance", icon: "moon", run: () => { dlg.close(); themeCtl.toggle(); } },
      { group: "Actions", label: "Copy email address", hint: ID.email, icon: "copy", run: async () => { dlg.close(); try { await navigator.clipboard.writeText(ID.email); toast("Email address copied"); } catch (e) { toast(ID.email); } } },
      { group: "Actions", label: "Download résumé", hint: "Print-ready", icon: "download", run: () => go(CFG.resumeFile || "resume.html") },
      { group: "Actions", label: "All writing", hint: "Blog index", icon: "file", run: () => go("blog.html") },
      { group: "Actions", label: "Back to top", hint: "Scroll", icon: "arrow-up", run: () => { dlg.close(); window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" }); } }
    );

    const score = (item, q) => {
      const hay = (item.label + " " + (item.keywords || "") + " " + item.group).toLowerCase();
      if (!q) return 1;
      if (hay.startsWith(q)) return 4;
      if (hay.includes(q)) return 3;
      let i = 0;
      for (const ch of hay) if (ch === q[i]) i++;
      return i === q.length ? 1 : 0;
    };

    let results = [];
    let active = 0;
    const paint = () => {
      const q = input.value.trim().toLowerCase();
      results = items.map((it) => ({ it, s: score(it, q) })).filter((r) => r.s > 0)
        .sort((a, b) => b.s - a.s).map((r) => r.it);
      active = 0;
      let lastGroup = null;
      listEl.innerHTML = results.map((it, i) => {
        const head = it.group !== lastGroup ? '<li class="palette__group mono" role="presentation">' + esc(it.group) + "</li>" : "";
        lastGroup = it.group;
        return head + '<li class="palette__item" id="pi-' + i + '" role="option" aria-selected="' + (i === 0) + '" data-i="' + i + '">' +
          icon(it.icon || "hash") + '<span class="palette__label">' + esc(it.label) + '</span><span class="palette__hint">' + esc(it.hint || "") + "</span></li>";
      }).join("");
      emptyEl.hidden = results.length > 0;
      input.setAttribute("aria-activedescendant", results.length ? "pi-0" : "");
    };
    const setActive = (i) => {
      active = (i + results.length) % results.length;
      $$(".palette__item", listEl).forEach((el) => el.setAttribute("aria-selected", String(Number(el.dataset.i) === active)));
      const el = $("#pi-" + active);
      if (el) { el.scrollIntoView({ block: "nearest" }); input.setAttribute("aria-activedescendant", el.id); }
    };

    const open = (from) => { opener = from || document.activeElement; input.value = ""; paint(); dlg.showModal(); input.focus(); };
    window.__openPalette = open;

    document.addEventListener("click", (e) => {
      const t = e.target.closest("#palette-open, [data-palette-open]");
      if (t) open(t);
    });
    document.addEventListener("keydown", (e) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === "k") { e.preventDefault(); dlg.open ? dlg.close() : open(); }
    });
    input.addEventListener("input", paint);
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
      else if (e.key === "Enter") { e.preventDefault(); if (results[active]) results[active].run(); }
    });
    listEl.addEventListener("click", (e) => {
      const li = e.target.closest(".palette__item");
      if (li) results[Number(li.dataset.i)].run();
    });
    listEl.addEventListener("pointermove", (e) => {
      const li = e.target.closest(".palette__item");
      if (li) setActive(Number(li.dataset.i));
    });
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", () => { if (opener && opener.isConnected) opener.focus(); });
  }

  /* ---------- reveal-on-scroll ------------------------------------------------------------------------------- */
  let revealIO = null;
  function observeReveals(scope) {
    const els = $$(".reveal:not(.is-visible)", scope || document);
    if (reduced() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    if (!revealIO) {
      revealIO = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); revealIO.unobserve(en.target); }
      }), { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    }
    els.forEach((el) => revealIO.observe(el));
    // stagger children inside data-stagger groups
    $$("[data-stagger]", scope || document).forEach((group) => {
      $$(".reveal", group).forEach((el, i) => el.style.setProperty("--d", Math.min(i * 70, 420) + "ms"));
    });
  }

  /* ---------- scroll systems: progress bar, nav shadow, back-to-top -------------------------------------------- */
  function initScrollUX() {
    const bar = $("#progress-bar");
    const nav = $("#site-nav");
    const toTop = $("#to-top");
    if (toTop) {
      toTop.innerHTML = icon("arrow-up");
      toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" }));
    }
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const max = document.documentElement.scrollHeight - innerHeight;
        if (bar) bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, scrollY / max) : 0) + ")";
        if (nav) nav.classList.toggle("nav--scrolled", scrollY > 8);
        if (toTop) toTop.hidden = scrollY < 640;
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- misc: shortcuts, service worker, analytics -------------------------------------------------------- */
  function initShortcuts() {
    document.addEventListener("keydown", (e) => {
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select" || e.target.isContentEditable) return;
      if (e.key === "/" && HOME) {
        const search = $("#project-search");
        if (search) { e.preventDefault(); search.focus(); }
      }
    });
  }
  function initPWA() {
    if (!("serviceWorker" in navigator)) return;
    if (location.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(location.hostname)) return;
    addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
  function initAnalytics() {
    if (!CFG.plausibleDomain) return;
    const s = document.createElement("script");
    s.defer = true;
    s.dataset.domain = CFG.plausibleDomain;
    s.src = "https://plausible.io/js/script.js";
    document.head.appendChild(s);
  }

  /* ---------- boot ------------------------------------------------------------------------------------------------ */
  window.APP = { esc, icon, fmtDate, readingTime, toast, observeReveals, postCard };

  document.addEventListener("DOMContentLoaded", () => {
    const themeCtl = initTheme();
    initNav();
    renderHero();
    renderProjects();
    renderAbout();
    renderSkills();
    renderServices();
    renderExperience();
    renderAchievements();
    renderTestimonials();
    renderWriting();
    renderGallery();
    renderFAQ();
    renderContact();
    renderFooter();
    initModal();
    initLightbox();
    initPalette(themeCtl);
    initScrollUX();
    initShortcuts();
    initPWA();
    initAnalytics();
    if (window.__pageReady) window.__pageReady(); // hook for blog.js / resume inline renderers
    observeReveals();
  });
})();
