# Portfolio — zero-dependency static site

A production-grade personal portfolio built with **plain HTML, CSS and JavaScript**. No frameworks, no build step, no npm, no trackers. Every word on the site lives in **one editable file** (`js/content.js`), so you update projects, writing and links without touching source code.

**Design direction:** "engineered, not decorated" — cool near-white / deep ink-blue dark mode, a single cobalt accent, monospace system metadata (live local time, availability status), and a command palette (`Ctrl/⌘ K`) that makes the site feel like a well-built product.

---

## Quick start

There is nothing to install.

1. **Preview locally** — open `index.html` in a browser, or (better, so the PWA and blog URLs behave exactly like production) serve the folder:

   ```bash
   # any one of these, run inside the project folder
   python3 -m http.server 8080
   npx serve .
   php -S localhost:8080
   ```

   Then visit `http://localhost:8080`.

2. **Make it yours** — open `js/content.js` and replace the sample persona ("Aarav Shrestha") with your own details. That single file drives every section.

3. **Deploy** — drag the folder into Netlify/Vercel/Cloudflare Pages, or push to GitHub Pages. Details below.

---

## Project structure

```
portfolio/
├── index.html              Landing page (all main sections)
├── blog.html               Writing index + individual posts (?post=slug)
├── resume.html             Print-optimised résumé → "Save as PDF"
├── 404.html                Not-found page (auto-served by most hosts)
├── privacy.html            Privacy policy (template — adapt before publishing)
├── terms.html              Terms of use (template — adapt before publishing)
├── css/
│   └── styles.css          Entire design system (tokens, components, print)
├── js/
│   ├── content.js          ★ THE ONLY FILE YOU EDIT — all content & settings
│   ├── theme.js            Pre-paint theme init (prevents dark-mode flash)
│   ├── main.js             Rendering + interactions (all pages)
│   ├── blog.js             Markdown renderer, highlighting, TOC, share
│   └── resume.js           Résumé renderer
├── assets/
│   ├── favicon.svg
│   └── images/             Icons, OG image — put your photos here too
├── manifest.webmanifest    PWA manifest (installable app)
├── sw.js                   Service worker (offline support)
├── robots.txt · sitemap.xml
├── _headers                Security headers for Netlify / Cloudflare Pages
└── vercel.json             Same headers for Vercel
```

---

## Editing content (the "CMS")

Open `js/content.js`. It is one big, commented JavaScript object. Rules of thumb:

- Text goes inside quotes: `title: "My new title"`.
- Apostrophes are fine inside double quotes: `"I'm a builder"`.
- Lists are square brackets; copy an existing item, paste it, edit it.
- **Empty lists hide their section** — e.g. set `services.items: []` and the Services section (and its nav entry stays harmless) simply doesn't render. The Gallery ships empty and hidden for exactly this reason.
- After saving, refresh the browser. That's the whole pipeline.

### Common edits

| I want to… | Edit this |
|---|---|
| Change name / title / email / location | `identity` |
| Change the big headline | `hero.headline` — text between `\|pipes\|` renders in the serif-italic accent |
| Add or edit a project | copy an object inside `projects` (the `slug` must be unique) |
| Add a blog post | copy an object inside `posts` — the `body` is Markdown |
| Update jobs / education / certifications | `experience` |
| Change stats & awards | `achievements` |
| Update FAQ, testimonials, services | `faq`, `testimonials`, `services` |
| Reorder or rename nav items | `nav` |
| Use my photo instead of the monogram | set `identity.photo` to e.g. `"assets/images/portrait.jpg"` |
| Turn the green "available" dot off | set `identity.availability: ""` |

### Markdown supported in blog posts

Headings `##`/`###`/`####`, paragraphs, `**bold**`, `*italic*`, `` `inline code` ``, fenced code blocks with language (```` ```js ````), `- lists`, `1. lists`, `> quotes`, `---` rules, and `[links](https://…)`. Code blocks get syntax highlighting and a copy button automatically. **Escape backticks inside the JavaScript template string as `` \` ``** — see the sample posts for the pattern.

### One-time hard-coded bits

For SEO, a few things live in the HTML `<head>` rather than `content.js` (crawlers read them before JavaScript runs). When personalising, search-and-replace across the `.html` files:

1. `Aarav Shrestha` → your name (titles, meta, JSON-LD)
2. `https://example.com` → your live domain (canonical, OG, sitemap.xml, robots.txt)
3. `hello@aarav.dev.example` → your email (noscript fallbacks, JSON-LD)

---

## Settings (`config` block in content.js)

There are no environment variables — a static site has no server. The equivalent switches live at the top of `content.js`:

| Setting | What it does |
|---|---|
| `siteUrl` | Your live domain; used by the résumé contact line |
| `formEndpoint` | Paste a [Formspree](https://formspree.io) (or similar) endpoint and the contact form submits via `fetch` with success/error states. **Left empty**, the form gracefully opens the visitor's email app with the message pre-filled — zero setup, still functional. |
| `newsletterEndpoint` | Paste a Buttondown/Mailchimp form action URL to show a subscribe box in the footer. Empty = hidden. |
| `plausibleDomain` | Set to your domain (e.g. `"example.com"`) to enable cookie-free [Plausible](https://plausible.io) analytics. Empty = nothing loads. |
| `resumeFile` | Where the "Download résumé" actions point. Default is the print-ready `resume.html`; switch to a real PDF path once you export one. |

Spam protection on the form is built in: a honeypot field plus a minimum-time check silently drop bot submissions. Never put secrets (API keys, passwords) in `content.js` — everything in this folder is public by definition.

---

## Deployment

The site is host-agnostic static files. Pick one:

**Netlify** — drag the folder onto app.netlify.com, or connect the Git repo (no build command, publish directory = root). `_headers` and `404.html` are picked up automatically.

**Cloudflare Pages** — create a project, framework preset "None", build command empty, output directory `/`. `_headers` works here too.

**Vercel** — `vercel deploy` or import the repo (framework preset "Other"). `vercel.json` applies the security headers; `404.html` is served for unknown routes.

**GitHub Pages** — push to a repo, Settings → Pages → deploy from branch. `404.html` works; custom headers aren't supported on Pages (the site still functions, you just lose the CSP hardening).

After deploying: update `https://example.com` in `sitemap.xml`, `robots.txt` and the HTML heads, then submit the sitemap in Google Search Console.

---

## Customisation

**Colours & theming** — every colour is a CSS custom property at the top of `css/styles.css` (`:root` for light, `[data-theme="dark"]` for dark). Change `--accent` in both blocks and the whole site follows, including the generated project-cover art.

**Fonts** — the site deliberately uses system font stacks (zero network requests, zero layout shift). To use a custom font, download its `.woff2` into `assets/fonts/`, add an `@font-face` rule, and update `--font-sans` / `--font-serif` / `--font-mono`. Keep `font-display: swap`.

**Project cover art** — covers are generated SVG compositions seeded by each project's `slug` (consistent across reloads). To use real screenshots instead, you can place images in `assets/images/` and reference them — or keep the generated art, which never looks broken and stays on-brand.

**Sections order** — sections render in the order they appear in `index.html`; nav order comes from the `nav` array in `content.js`.

---

## Maintenance

- **Content changes** need nothing beyond editing `content.js` — but because the service worker caches aggressively for offline support, **bump `VERSION` in `sw.js`** (e.g. `v1.0.1`) whenever you deploy, so returning visitors get the update on next load.
- **Adding a page?** Copy an existing `.html` shell (nav/footer/palette markup included), give `<body data-page="…">` a new value, and add it to `sitemap.xml`.
- **Legal pages** are honest templates that match what the site actually does — review them (and the jurisdiction wording) before relying on them.

---

## Quality benchmarks & accessibility

Built to hit Lighthouse ≥95 across the board on a normal connection: no external requests by default, system fonts, deferred scripts (~30 KB of JS total, unminified), lazy images, `content-visibility`-friendly structure, and zero layout shift (the theme is applied before first paint).

Accessibility is WCAG 2.2 AA-oriented by construction: full keyboard operability (nav, tabs with arrow keys, dialogs with focus return, command palette), visible focus rings, semantic landmarks and headings, form errors linked via `aria-describedby`, `prefers-reduced-motion` honoured everywhere (typing effect, marquee, counters, reveals and parallax all degrade to static), and colour tokens chosen for ≥4.5:1 text contrast in both themes. Re-verify with Lighthouse + axe after you customise, especially if you change colours.

---

## Troubleshooting

**I edited content.js and nothing changed.** Hard-refresh (`Ctrl/⌘+Shift+R`). If deployed, also bump `VERSION` in `sw.js` — the old service worker may be serving cached files. As a last resort: DevTools → Application → Service Workers → Unregister.

**The site is blank.** Almost always a typo in `content.js` (a missing comma or quote). Open DevTools → Console; the error names the exact line. Validate quickly with `node --check js/content.js` if you have Node installed.

**The contact form "does nothing".** With `formEndpoint` empty it opens your email app — some browsers block that without a configured mail handler. Set up a free Formspree endpoint for a fully in-page experience.

**Blog post shows "No results" / blank.** The `?post=` value must exactly match a `slug` in `content.js`; slugs are case-sensitive and must be unique.

**PWA install prompt doesn't appear.** Installability requires HTTPS (or localhost) plus a visit or two. The site works fine without installing.

**Fonts look different on my machine vs. a friend's.** Expected — system font stacks render with each OS's native faces. That's the trade for instant loads; see Customisation to pin a webfont.

---

## Licence

The code is yours to use and adapt for your personal site. Sample persona content ("Aarav Shrestha", projects, testimonials, metrics) is **fictional placeholder material** — replace it with your real work before publishing; presenting the sample projects as your own would misrepresent you to exactly the people you're trying to impress.
