/* ==========================================================================
   RESUME.JS — renders resume.html from js/content.js. The page doubles as a
   PDF: the "Save as PDF" button opens the browser's print dialog, and a
   print stylesheet in styles.css produces a clean A4/Letter document.
   ========================================================================== */
(function () {
  "use strict";

  window.__pageReady = function () {
    const A = window.APP;
    const S = window.SITE || {};
    const esc = A.esc, icon = A.icon;
    const ID = S.identity || {}, R = S.resume || {}, E = S.experience || {};
    const slot = document.getElementById("resume-slot");
    if (!slot) return;

    const contactBits = [
      '<a href="mailto:' + esc(ID.email) + '">' + esc(ID.email) + "</a>",
      esc(ID.location),
      '<a href="' + esc((S.config || {}).siteUrl || "index.html") + '">' + esc(ID.wordmark || "website") + "</a>"
    ].concat(((S.contact || {}).socials || [])
      .filter((x) => /linkedin|github/i.test(x.name))
      .map((x) => '<a href="' + esc(x.url) + '">' + esc(x.name) + "</a>"));

    const work = (E.work || []).map((w) =>
      '<article class="rz__entry">' +
        '<div class="rz__row"><h3>' + esc(w.role) + " · " + esc(w.org) + '</h3><p class="mono">' + esc(w.period) + "</p></div>" +
        '<p class="rz__loc mono">' + esc(w.location) + "</p>" +
        "<ul>" + (w.points || []).map((p) => "<li>" + esc(p) + "</li>").join("") + "</ul>" +
      "</article>").join("");

    const projects = (S.projects || []).filter((p) => p.featured).concat(S.projects || [])
      .filter((p, i, arr) => arr.indexOf(p) === i).slice(0, 3).map((p) =>
      '<article class="rz__entry">' +
        '<div class="rz__row"><h3>' + esc(p.name) + '</h3><p class="mono">' + esc(p.year) + "</p></div>" +
        "<p>" + esc(p.tagline) + " " + esc((p.metrics || []).map((m) => m.value + " " + m.label).join("; ")) + ".</p>" +
      "</article>").join("");

    const skills = ((S.skills || {}).categories || []).map((c) =>
      '<p class="rz__skill"><strong>' + esc(c.name) + ":</strong> " +
      esc((c.items || []).map((i) => i.name).join(", ")) + "</p>").join("");

    const edu = (E.education || []).map((d) =>
      '<article class="rz__entry"><div class="rz__row"><h3>' + esc(d.degree) + " · " + esc(d.org) +
      '</h3><p class="mono">' + esc(d.period) + "</p></div></article>").join("");

    const certs = (E.certifications || []).map((c) =>
      "<li>" + esc(c.name) + ' <span class="mono">— ' + esc(c.issuer) + ", " + esc(c.year) + "</span></li>").join("");

    slot.innerHTML =
      '<div class="resume-actions no-print">' +
        '<a class="btn btn--secondary" href="index.html">' + icon("arrow-right", "flip") + " Back to site</a>" +
        '<button type="button" class="btn btn--primary" id="print-btn">' + icon("download") + " Save as PDF / Print</button>" +
      "</div>" +
      '<article class="rz" aria-label="Résumé">' +
        '<header class="rz__head">' +
          "<h1>" + esc(ID.name) + "</h1>" +
          '<p class="rz__title">' + esc(ID.title) + "</p>" +
          '<p class="rz__contact mono">' + contactBits.join(' <span aria-hidden="true">·</span> ') + "</p>" +
        "</header>" +
        '<section class="rz__section"><h2 class="mono">Summary</h2><p>' + esc(R.summary || "") + "</p>" +
          (R.highlight ? '<p class="rz__highlight mono">' + esc(R.highlight) + "</p>" : "") + "</section>" +
        '<section class="rz__section"><h2 class="mono">Experience</h2>' + work + "</section>" +
        '<section class="rz__section"><h2 class="mono">Selected projects</h2>' + projects + "</section>" +
        '<section class="rz__section"><h2 class="mono">Skills</h2>' + skills + "</section>" +
        '<section class="rz__section rz__section--split"><div><h2 class="mono">Education</h2>' + edu + "</div>" +
          '<div><h2 class="mono">Certifications</h2><ul class="rz__certs">' + certs + "</ul></div></section>" +
      "</article>";

    document.getElementById("print-btn").addEventListener("click", () => window.print());
    A.observeReveals(slot);
  };
})();
