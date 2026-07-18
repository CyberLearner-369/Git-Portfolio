/* Applies the saved (or system) theme before first paint. Kept as a separate
   file — rather than an inline script — so the Content-Security-Policy can
   remain `script-src 'self'` with no 'unsafe-inline'. */
(function () {
  var theme = "light";
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") theme = stored;
    else if (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches) theme = "dark";
  } catch (e) { /* private mode etc. — default stands */ }
  document.documentElement.setAttribute("data-theme", theme);
})();
