/* ==========================================================================
   CONTENT.JS — the only file you need to edit.
   Every word, project, link and setting on the site lives here.
   Replace the sample data with your own; empty lists hide their sections.
   Tips: keep quotes escaped (\") inside strings, and back-ticks as \`.
   ========================================================================== */

window.SITE = {

  /* ---- Site-wide settings -------------------------------------------- */
  config: {
    siteUrl: "https://example.com",          // your live domain, no trailing slash
    formEndpoint: "",                        // e.g. "https://formspree.io/f/xxxxxx" — empty = fall back to email app
    newsletterEndpoint: "",                  // e.g. Buttondown/Mailchimp form action — empty = newsletter hidden
    plausibleDomain: "",                     // e.g. "example.com" to enable privacy-friendly analytics
    resumeFile: "resume.html"                // swap for "assets/resume.pdf" once you add a PDF
  },

  /* ---- Identity ------------------------------------------------------- */
  identity: {
    name: "Cyber Learner",
    firstName: "Cyber",
    wordmark: "Cyble",
    title: "Full-Stack Engineer",
    location: "SP, Nepal",
    timezone: "Asia/Kathmandu",
    timezoneLabel: "UTC+5:45",
    availability: "Available for new projects", // set "" to hide the status dot
    email: "cyberlearner0369@gmail.com",
    photo: "",                                  // e.g. "assets/images/portrait.jpg" — empty = monogram avatar
    photoAlt: "Portrait of Cyber Learner"
  },

  /* ---- Hero ------------------------------------------------------------ */
  hero: {
    headline: "Software people can |rely| on.",   // text between |pipes| is set in the serif italic accent
    intro:
      "I'm Cyber — a full-stack engineer with seven years of experience turning ambiguous ideas into fast, accessible, production-grade web products for startups and NGOs across three continents.",
    typedPrefix: "I work across",
    typedRoles: [
      "AI powered Cybersecurity",
      "Enthusiast AI/ML",
      "Eagerly passionate about Data Science",
      "Informal Learner of Human Psycchology and Neuroscience",
      "Developer experience"
    ],
    ctas: [
      { label: "View projects", href: "#work", kind: "primary" },
      { label: "Download résumé", href: "resume.html", kind: "secondary" }
    ]
  },

  /* ---- About ------------------------------------------------------------ */
  about: {
    kicker: "About",
    title: "Product-minded, production-obsessed.",
    paragraphs: [
      "I started building websites in a Kathmandu at Nineteen and never really stopped. Since then I've shipped software for logistics companies, fintech startups, and humanitarian NGOs — often as the first or only engineer, which taught me to care about the whole system: the schema, the deploy pipeline, and the human on the other side of the screen.",
      "My default mode is boring technology, exciting outcomes. I reach for proven tools, write code the next person can read, and measure success in things users feel — faster pages, fewer support tickets, claims that get paid, forms that just work.",
      "Away from the keyboard I'm usually trail-running the Shivapuri ridge, mentoring first-generation CS students, or over-engineering my espresso setup."
    ],
    values: [
      { name: "Clarity over cleverness", detail: "Readable systems outlive smart ones. I optimise for the engineer who inherits my code." },
      { name: "Ship, measure, refine", detail: "Small releases and real usage data beat big-bang launches every time." },
      { name: "Accessible by default", detail: "If it doesn't work with a keyboard and a screen reader, it isn't done." },
      { name: "Honest estimates", detail: "I'd rather surface a risk in week one than a surprise in week six." }
    ],
    facts: [
      { label: "Based in", value: "Kathmandu (UTC+5:45)" },
      { label: "Experience", value: "2+ years" },
      { label: "Focus", value: "AI POWERED CYBERSECURITY" },
      { label: "Languages", value: "English · Nepali · Hindi" },
      { label: "Working with", value: "Startups & NGOs, remote-first" },
      { label: "Currently learning", value: "Rust & local-first sync" }
    ]
  },

  /* ---- Skills ------------------------------------------------------------ */
  /* level: 3 = expert (daily driver), 2 = advanced, 1 = working knowledge */
  skills: {
    kicker: "Skills",
    title: "A deep stack, deliberately chosen.",
    lede: "Levels reflect honest, current fluency — not aspiration. Three dots means I could be woken at 3 a.m. to debug it.",
    categories: [
      {
        name: "Frontend",
        items: [
          { name: "TypeScript", level: 3 },
          { name: "React", level: 3 },
          { name: "Next.js", level: 2 },
          { name: "CSS architecture", level: 3 },
          { name: "Accessibility (WCAG 2.2)", level: 3 },
          { name: "Web performance", level: 2 }
        ]
      },
      {
        name: "Backend",
        items: [
          { name: "Node.js", level: 3 },
          { name: "REST API design", level: 3 },
          { name: "Fastify / Express", level: 3 },
          { name: "GraphQL", level: 2 },
          { name: "WebSockets & realtime", level: 2 },
          { name: "Auth & security", level: 2 }
        ]
      },
      {
        name: "Data & Cloud",
        items: [
          { name: "PostgreSQL", level: 3 },
          { name: "Prisma", level: 2 },
          { name: "Redis", level: 2 },
          { name: "Docker", level: 2 },
          { name: "AWS (ECS, RDS, S3)", level: 2 },
          { name: "CI/CD (GitHub Actions)", level: 3 }
        ]
      },
      {
        name: "Practices",
        items: [
          { name: "Testing (Vitest, Playwright)", level: 2 },
          { name: "Observability", level: 2 },
          { name: "Technical writing", level: 3 },
          { name: "Product discovery", level: 2 },
          { name: "Mentoring", level: 3 },
          { name: "Estimation & scoping", level: 2 }
        ]
      }
    ],
    stack: [
      "TypeScript", "React", "Node.js", "PostgreSQL", "Next.js", "Fastify",
      "Prisma", "Redis", "Docker", "AWS", "GitHub Actions", "Vitest",
      "Playwright", "Tailwind CSS", "GraphQL", "Vite", "Linux", "Figma"
    ]
  },

  /* ---- Services ----------------------------------------------------------- */
  services: {
    kicker: "Services",
    title: "Three ways we can work together.",
    items: [
      {
        name: "Product engineering",
        detail: "End-to-end builds of web products — from data model to deploy. Ideal for founders who need an MVP that won't need rewriting at the first sign of traction.",
        includes: ["Architecture & schema design", "Full-stack implementation", "CI/CD and hosting setup", "Handover documentation"],
        engagement: "4–12 week engagements"
      },
      {
        name: "Frontend architecture",
        detail: "Design systems, performance budgets, and accessibility built into your React codebase — so your team ships faster with fewer regressions.",
        includes: ["Component & state architecture", "Core Web Vitals remediation", "WCAG 2.2 AA compliance", "Team enablement sessions"],
        engagement: "2–6 week engagements"
      },
      {
        name: "Technical audit & rescue",
        detail: "A senior second opinion on a codebase, an estimate, or a stalled project — with a prioritised, honest report on what to fix first and what to leave alone.",
        includes: ["Codebase & security review", "Performance profiling", "Prioritised action plan", "Optional hands-on fixes"],
        engagement: "1–2 week engagements"
      }
    ]
  },

  /* ---- Projects -------------------------------------------------------------
     The first `featured: true` items get large cards. Category powers filters.
     Every field below appears in the case-study view — leave any list empty
     to hide that block. -------------------------------------------------- */
  projectsMeta: {
    kicker: "Selected work",
    title: "Projects with problems worth solving.",
    lede: "A sample of shipped work. Each case study covers the problem, the architecture, and what I'd do differently — because honest retrospectives are half the craft."
  },
  projects: [
    {
      slug: "ledgerlens",
      name: "LedgerLens",
      year: "2025",
      role: "Lead engineer · contract",
      category: "Web App",
      featured: true,
      tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "WebSockets"],
      tagline: "Real-time financial analytics for small accounting firms.",
      problem:
        "Accounting firms served their SME clients with month-old spreadsheet exports. Partners wanted live answers — cash position, overdue invoices, runway — without hiring a data team or waiting for month-end.",
      solution:
        "A multi-tenant analytics dashboard that syncs with three accounting platforms, normalises the data into a single ledger model, and streams changes to the browser over WebSockets. Reports that took an afternoon now update themselves in under a second.",
      features: [
        "Live cash-flow, receivables and runway dashboards",
        "Three-way sync with Xero, QuickBooks and Tally exports",
        "Anomaly alerts for duplicate or unusual transactions",
        "Role-based access for partners, staff and clients",
        "One-click PDF board reports"
      ],
      architecture:
        "React + TypeScript SPA, Fastify API, PostgreSQL with row-level security for tenancy, Redis pub/sub fanning out ledger events to WebSocket subscribers. Sync workers run as isolated queue consumers so a slow provider can never block the UI.",
      metrics: [
        { value: "90%", label: "less time producing client reports" },
        { value: "14", label: "firms onboarded in the first quarter" },
        { value: "<1s", label: "ledger-to-dashboard latency" }
      ],
      challenges: [
        "Reconciling three providers' inconsistent chart-of-accounts formats into one queryable model without lossy flattening.",
        "Keeping WebSocket fan-out cheap: moved from per-user queries to shared, tenant-scoped materialised views invalidated by triggers.",
        "Financial data meant zero tolerance for drift — added a nightly double-entry checksum job that reconciles every tenant ledger."
      ],
      lessons: [
        "Row-level security in Postgres removed a whole class of tenancy bugs — the database became the last line of defence, not the first.",
        "Streaming everything was tempting; streaming only what a viewer can currently see cut server costs by two-thirds."
      ],
      improvements: [
        "Forecasting module using seasonal decomposition on historical cash-flow.",
        "Self-serve provider connections to remove the white-glove onboarding step."
      ],
      links: { demo: "https://example.com/ledgerlens", repo: "" }
    },
    {
      slug: "fieldnote",
      name: "Fieldnote",
      year: "2024",
      role: "Sole engineer · NGO consortium",
      category: "Web App",
      featured: true,
      tags: ["PWA", "Offline-first", "IndexedDB", "Node.js", "Sync"],
      tagline: "Offline-first field data collection for rural health workers.",
      problem:
        "Community health workers in remote districts collected survey data on paper because existing digital tools assumed connectivity. Data took weeks to reach analysts, arrived with transcription errors, and duplicated effort across three partner NGOs.",
      solution:
        "An installable PWA that works fully offline for weeks, stores encrypted records in IndexedDB, and syncs opportunistically when any connectivity appears — resolving conflicts with a field-level, last-writer-wins-plus-audit strategy that supervisors can review.",
      features: [
        "100% offline capture with photo and GPS attachments",
        "Background sync with resumable, chunked uploads",
        "Conflict review queue for supervisors",
        "Form builder with skip logic and validation in Nepali and English",
        "Device-level encryption of records at rest"
      ],
      architecture:
        "Vanilla-core PWA with a service-worker app shell, IndexedDB via a thin typed wrapper, and a Node sync API using per-record vector stamps. The server is deliberately dumb: an append-only event log per record, materialised into Postgres views for analysts.",
      metrics: [
        { value: "3 weeks → 1 day", label: "field-to-analyst data latency" },
        { value: "1,400+", label: "health workers using it daily" },
        { value: "0", label: "records lost since launch" }
      ],
      challenges: [
        "Sync conflicts are a people problem, not just a data problem — the review queue mattered more than the merge algorithm.",
        "iOS storage eviction: added a persistence request, quota telemetry, and aggressive photo compression to stay under the radar.",
        "Testing offline flows honestly required scripted network-chaos runs in Playwright, not just DevTools toggles."
      ],
      lessons: [
        "An append-only event log made every 'what happened here?' support question answerable.",
        "Designing the empty, syncing, and conflicted states first made the happy path almost trivial."
      ],
      improvements: [
        "Peer-to-peer sync over local Wi-Fi for fully disconnected clusters.",
        "CRDT-based merging for the handful of genuinely collaborative fields."
      ],
      links: { demo: "https://example.com/fieldnote", repo: "https://github.com/CybLe-example/fieldnote" }
    },
    {
      slug: "parcelly",
      name: "Parcelly API",
      year: "2024",
      role: "Backend lead · contract",
      category: "API / Backend",
      featured: false,
      tags: ["Node.js", "Fastify", "Redis", "PostgreSQL", "OpenAPI"],
      tagline: "A logistics tracking API processing 2M scan events a month.",
      problem:
        "A courier startup's monolith buckled at ~40 requests/second during festival season. Third-party merchants had no way to integrate tracking, so support staff answered 'where is my parcel?' by hand.",
      solution:
        "A versioned public API with webhooks, an OpenAPI-first contract, idempotent scan ingestion, and a Redis-backed hot path for the 95% of lookups that hit recent parcels — plus a merchant dashboard generated from the same spec.",
      features: [
        "Idempotent event ingestion tolerant of scanner retries",
        "Webhook subscriptions with signed payloads and replay",
        "Rate limiting and API keys with per-merchant quotas",
        "OpenAPI spec that generates docs, SDK types and mocks",
        "P99 lookup latency under 60ms at peak"
      ],
      architecture:
        "Fastify services behind a thin gateway; Postgres as the source of truth with Redis as a read-through cache keyed by tracking code; a delivery-status projection rebuilt from the event stream. Load-tested with k6 to 20× observed peak.",
      metrics: [
        { value: "60ms", label: "p99 tracking lookup at peak" },
        { value: "−72%", label: "'where is my parcel' support tickets" },
        { value: "38", label: "merchant integrations in six months" }
      ],
      challenges: [
        "Scanner devices retry aggressively on flaky links — idempotency keys plus a dedupe window kept the event log clean.",
        "Webhook consumers fail in creative ways; exponential backoff with a dead-letter queue and a self-serve replay button saved on-call sanity."
      ],
      lessons: [
        "Publishing the OpenAPI spec first forced better decisions than any internal design review.",
        "The cheapest scaling win was making 95% of traffic never touch Postgres."
      ],
      improvements: [
        "GraphQL read layer for the dashboard's nested queries.",
        "Multi-region read replicas ahead of international expansion."
      ],
      links: { demo: "", repo: "" }
    },
    {
      slug: "hexagrid",
      name: "hexagrid",
      year: "2023 — ongoing",
      role: "Author & maintainer",
      category: "Open Source",
      featured: false,
      tags: ["Library", "SVG", "TypeScript", "Data-viz", "npm"],
      tagline: "A 4KB dependency-free hex-map visualisation library.",
      problem:
        "Every geographic dashboard I built needed hex-binned maps, and every existing option dragged in a full charting framework or D3's entire dependency tree for what is, at heart, some trigonometry and SVG.",
      solution:
        "A focused, tree-shakeable TypeScript library that renders interactive hexagonal grids to SVG with zero dependencies — with framework adapters kept out of core so React and Svelte wrappers stay one file each.",
      features: [
        "4KB gzipped, zero dependencies",
        "Declarative colour scales and legends",
        "Keyboard-navigable cells with ARIA grid semantics",
        "SSR-safe rendering with hydration hooks",
        "First-class TypeScript generics for cell data"
      ],
      architecture:
        "A pure geometry core (axial coordinates in, path data out), a thin DOM layer, and adapters as separate entry points. Exhaustive unit tests on the geometry mean visual bugs are almost always integration bugs.",
      metrics: [
        { value: "1.2k", label: "GitHub stars" },
        { value: "40k+", label: "monthly npm downloads" },
        { value: "27", label: "community contributors" }
      ],
      challenges: [
        "API design for a library is UX design — three breaking changes taught me to hide geometry internals behind a stable, boring surface.",
        "Making an SVG grid genuinely screen-reader friendly took more research than the rendering itself."
      ],
      lessons: [
        "Saying no to feature requests is the maintainer's core skill; the issue template now asks 'could this be an adapter?'",
        "A good CONTRIBUTING.md converts drive-by complaints into pull requests."
      ],
      improvements: [
        "Canvas fallback renderer for 50k+ cell datasets.",
        "An interactive docs playground with shareable state URLs."
      ],
      links: { demo: "https://example.com/hexagrid", repo: "https://github.com/CybLe-example/hexagrid" }
    },
    {
      slug: "sajilo-docs",
      name: "Sajilo Pay Developer Portal",
      year: "2023",
      role: "DX engineer · contract",
      category: "Developer Tools",
      featured: false,
      tags: ["Docs", "DX", "API Explorer", "Markdown", "Search"],
      tagline: "Docs and an in-browser API explorer that halved integration time.",
      problem:
        "A payments provider's merchant integrations took 3–4 weeks, mostly spent in support threads clarifying a PDF. Developer trust — the product's real currency — was leaking with every ambiguous error code.",
      solution:
        "A documentation portal generated from the OpenAPI source of truth, with runnable request samples, a sandboxed API explorer using scoped test keys, copy-paste SDK snippets in four languages, and an error-code reference wired to actual gateway responses.",
      features: [
        "Docs-as-code pipeline: merged spec changes publish in minutes",
        "In-browser API explorer with sandbox credentials",
        "Instant client-side search across guides and reference",
        "Versioned docs matching API versions",
        "Feedback widget piping straight to the docs backlog"
      ],
      architecture:
        "Static-site generation from Markdown + OpenAPI, hydrated islands for the explorer and search, and a tiny proxy that injects sandbox keys server-side so secrets never reach the browser.",
      metrics: [
        { value: "3–4 wks → 9 days", label: "median merchant integration time" },
        { value: "−58%", label: "integration support tickets" },
        { value: "92", label: "docs CSAT from developer survey" }
      ],
      challenges: [
        "Keeping prose and spec in sync — solved with CI that fails when documented fields drift from the schema.",
        "Sandbox abuse prevention without adding sign-up friction: short-lived keys minted per session."
      ],
      lessons: [
        "Every support thread is a docs bug report in disguise.",
        "Developers trust docs that admit sharp edges more than docs that market."
      ],
      improvements: [
        "AI-assisted search grounded strictly in the docs corpus.",
        "Postman/Bruno collection export from the same spec."
      ],
      links: { demo: "", repo: "" }
    },
    {
      slug: "aria-health",
      name: "Aria Health Booking",
      year: "2022",
      role: "Frontend lead · agency team of 4",
      category: "Web App",
      featured: false,
      tags: ["Accessibility", "React", "Design system", "Forms", "i18n"],
      tagline: "WCAG 2.2 AA clinic booking used by 60+ clinics.",
      problem:
        "A clinic network's booking flow lost 40% of users at the calendar step, and screen-reader users couldn't complete it at all — a legal risk and, more importantly, a failure for the patients who needed it most.",
      solution:
        "A rebuilt booking flow on an accessible component system: a fully keyboard-operable calendar, plain-language form copy in two languages, resilient validation that preserves input, and appointment holds so slow connections don't lose slots mid-flow.",
      features: [
        "Keyboard- and screen-reader-complete booking, verified with real AT users",
        "Slot holds with graceful expiry and recovery",
        "Nepali/English i18n including dates and numerals",
        "Error summaries that link focus to each fix",
        "SMS fallback confirmations for low-data users"
      ],
      architecture:
        "React with a headless component layer (state and semantics) separated from styling, exhaustive axe + manual AT test matrix in CI, and a booking API using optimistic holds with server reconciliation.",
      metrics: [
        { value: "+31%", label: "booking completion rate" },
        { value: "0 → AA", label: "WCAG 2.2 conformance" },
        { value: "60+", label: "clinics on the platform" }
      ],
      challenges: [
        "Date pickers are an accessibility minefield — we ended up with a list-first 'next available' pattern that beat the grid for every user group.",
        "Translating validation messages exposed how much meaning we'd hidden in idioms; plain language won in both languages."
      ],
      lessons: [
        "Testing with actual assistive-technology users found issues no audit tool ever would.",
        "The accessible version converted better for everyone — constraints made the design stronger."
      ],
      improvements: [
        "Recurring-appointment flows for chronic care.",
        "Offline-tolerant rebooking for rural connectivity."
      ],
      links: { demo: "https://example.com/aria", repo: "" }
    }
  ],

  /* ---- Experience / Education / Certifications (tabs) --------------------- */
  experience: {
    kicker: "Track record",
    title: "Where the experience comes from.",
    work: [
      {
        role: "Senior Full-Stack Engineer",
        org: "Himal Labs",
        org_url: "https://example.com",
        period: "2022 — Present",
        location: "Kathmandu · remote-first",
        summary: "Product engineering studio building for fintech and logistics clients across Asia and Europe.",
        points: [
          "Lead engineer on LedgerLens and Parcelly; owned architecture, delivery and client communication end-to-end.",
          "Introduced a shared platform starter (auth, CI, observability) that cut new-project setup from two weeks to one day.",
          "Mentor two mid-level engineers; run fortnightly internal engineering clinics."
        ],
        stack: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS"]
      },
      {
        role: "Full-Stack Developer",
        org: "Kuma Studio",
        org_url: "",
        period: "2020 — 2022",
        location: "Remote · EU clients",
        summary: "Small distributed studio shipping web products for European startups.",
        points: [
          "Built and maintained six client products from MVP to production, including the Aria Health booking platform.",
          "Established the studio's accessibility practice; WCAG AA became a contractual deliverable on every project.",
          "Reduced average client Core Web Vitals LCP from 4.1s to 1.8s across the portfolio."
        ],
        stack: ["React", "Next.js", "Node.js", "Prisma", "GraphQL"]
      },
      {
        role: "Frontend Developer",
        org: "Yeti Commerce",
        org_url: "",
        period: "2018 — 2020",
        location: "Kathmandu",
        summary: "E-commerce enabler for Nepali retailers going online for the first time.",
        points: [
          "Shipped storefront features used by 200+ merchants; owned the checkout flow through two payment-gateway migrations.",
          "Cut bundle size 55% by replacing a legacy framework with focused vanilla modules — my conversion to boring technology.",
          "Wrote the internal frontend handbook still in use today."
        ],
        stack: ["JavaScript", "Vue", "Node.js", "MySQL"]
      }
    ],
    education: [
      {
        degree: "BSc (Hons) Computer Science",
        org: "Tribhuvan University — Institute of Science & Technology",
        period: "2014 — 2018",
        location: "Kathmandu",
        points: [
          "First-class honours; dissertation on offline-tolerant data synchronisation for rural connectivity.",
          "Founded the campus open-source society; grew it to 120 members and an annual student hackathon."
        ]
      },
      {
        degree: "Higher Secondary — Science",
        org: "St. Xavier's College",
        period: "2012 — 2014",
        location: "Kathmandu",
        points: ["Mathematics and computer science concentration."]
      }
    ],
    certifications: [
      { name: "AWS Certified Solutions Architect — Associate", issuer: "Amazon Web Services", year: "2024", url: "https://example.com/cert/aws" },
      { name: "Professional Scrum Master I", issuer: "Scrum.org", year: "2023", url: "" },
      { name: "Deque Web Accessibility Specialist (prep)", issuer: "Deque University coursework", year: "2022", url: "" }
    ]
  },

  /* ---- Numbers & recognition ---------------------------------------------- */
  achievements: {
    kicker: "By the numbers",
    title: "Proof, quantified.",
    stats: [
      { value: 7, suffix: "+", label: "years shipping production software" },
      { value: 30, suffix: "+", label: "products and features delivered" },
      { value: 1200, suffix: "+", label: "GitHub stars on open source" },
      { value: 99.95, suffix: "%", label: "uptime across services I run", decimals: 2 }
    ],
    awards: [
      { name: "Winner — Kathmandu FinTech Hackathon", by: "NIC Asia Innovation Lab", year: "2024" },
      { name: "Speaker — 'Offline-first for the next billion users'", by: "JSConf Asia (community track)", year: "2023" },
      { name: "Mentor of the Year", by: "Women in Tech Nepal", year: "2023" }
    ]
  },

  /* ---- Testimonials --------------------------------------------------------- */
  testimonials: {
    kicker: "Kind words",
    title: "What partners say afterwards.",
    items: [
      {
        quote: "CybLe scoped honestly, shipped early, and flagged the one risk that would have sunk our launch. Rarest engineer trait: he makes the complicated feel calm.",
        name: "Maya Gurung",
        role: "Founder, LedgerLens"
      },
      {
        quote: "Our field teams stopped noticing the software — which is the highest compliment field software can get. Data that took three weeks now lands overnight.",
        name: "Daniel Okoye",
        role: "Programme Director, health NGO consortium"
      },
      {
        quote: "He rebuilt our booking flow to WCAG AA and conversion went up for every user group. Accessibility as a growth lever — he'd been saying it all along.",
        name: "Lena Fischer",
        role: "Product Lead, Aria Health"
      },
      {
        quote: "The best API documentation I've integrated against in ten years of payments work, and I've integrated against most of them.",
        name: "Prakash Adhikari",
        role: "CTO, merchant integration partner"
      }
    ]
  },

  /* ---- Writing (blog) -------------------------------------------------------- */
  writingMeta: {
    kicker: "Writing",
    title: "Notes from the workshop.",
    lede: "Long-form thinking on building software that survives contact with reality."
  },

  posts: [
    {
      slug: "offline-first-without-tears",
      title: "Offline-first without tears: a sync architecture that survived 1,400 field workers",
      date: "2026-05-14",
      tags: ["Architecture", "Offline-first", "Case study"],
      summary: "The append-only event log, the conflict review queue, and the three decisions that made an offline-first health app boring to operate.",
      body: `
Offline-first has a reputation for being where good architectures go to die. Having now run one in production for two years — 1,400 daily users, some of whom sync once a fortnight from a hilltop — I think the reputation is earned by a specific set of avoidable decisions, not by the problem itself.

## The trap: treating sync as a database problem

Most teams start by asking *"how do we merge divergent state?"* and end up in CRDT literature at 2 a.m. The better first question is organisational: **who is allowed to be wrong, and who decides?**

In our case, a supervisor reviews conflicting field reports anyway — that's their job on paper forms too. So the architecture just had to surface conflicts, not resolve them heroically:

- Every record is an **append-only log of events**, never a mutable row.
- Each device stamps events with a \`(deviceId, counter)\` pair — a poor man's vector clock that's trivial to reason about.
- The server materialises a current view but keeps every event forever.
- Field-level conflicts go to a **review queue** with both values and full history.

## The three decisions that mattered

### 1. The server is deliberately dumb

Our sync endpoint does almost nothing clever:

\`\`\`js
// POST /sync — the entire contract, conceptually
async function sync(deviceId, clientEvents, sinceCursor) {
  await appendEvents(deviceId, dedupe(clientEvents)); // idempotent
  const serverEvents = await eventsSince(sinceCursor, { excludeDevice: deviceId });
  return { serverEvents, cursor: latestCursor() };
}
\`\`\`

Idempotent append plus "give me everything since my cursor". No merge logic on the hot path. Every clever behaviour lives in *projections* that can be rebuilt from the log when we get them wrong — and we did, twice, at zero cost to users.

### 2. Design the sad states first

We designed the **empty**, **syncing**, **partially-synced** and **conflicted** screens before the happy path. This inverted the usual dynamic: instead of bolting warnings onto a finished UI, the UI's core vocabulary was already about certainty. A record isn't "saved" — it's *on this device*, *received by server*, or *confirmed by supervisor*. Users trusted the app because it never claimed more than it knew.

### 3. Test with chaos, not checkboxes

DevTools' offline toggle tests the demo, not the reality. Our Playwright suite scripts genuinely hostile conditions:

\`\`\`js
test('survives connection death mid-upload', async ({ page, context }) => {
  await startLargeUpload(page);
  await context.setOffline(true);        // die mid-chunk
  await page.reload();                   // user gives up, reopens later
  await context.setOffline(false);
  await expect(syncBadge(page)).toHaveText('All records synced');
});
\`\`\`

Every incident we've had in production was reproduced as a chaos test within a day. The suite is now the real specification.

## What I'd change

Two fields turned out to be genuinely collaborative (shared visit notes), and last-writer-wins is the wrong shape for them — that's where a small CRDT belongs, surgically. And I'd add quota telemetry from day one: iOS storage eviction is silent, rude, and best detected before users do.

Offline-first isn't hard because merging is hard. It's hard because it forces you to admit, in the interface, how distributed systems actually behave. Do that admission early and the rest is bookkeeping.
`
    },
    {
      slug: "practical-wcag-2-2",
      title: "A practical WCAG 2.2 checklist for product teams (from someone who ships it)",
      date: "2026-03-02",
      tags: ["Accessibility", "Frontend", "Checklist"],
      summary: "The nine checks that catch 90% of real-world failures, why overlays don't work, and how to make AA stick without slowing the roadmap.",
      body: `
Every accessibility article says "it's not a checklist, it's a mindset". True — and unhelpful on a Tuesday with a sprint deadline. Mindsets are built by doing checklists until they become instinct. Here is the one my teams actually use, distilled from audits of a booking platform, a payments portal and a government-adjacent data tool.

## The nine checks that catch most failures

1. **Unplug your mouse for a day.** If you can't finish every core flow with Tab, Shift+Tab, Enter, Space and arrows, stop here. This one check finds more than any scanner.
2. **Focus must be visible, always.** \`:focus-visible\` with at least a 2px outline and 3:1 contrast against its background. Removing outlines is the industry's most popular WCAG violation.
3. **Every input needs a real label.** Placeholders are not labels; they vanish exactly when the user needs them.
4. **Error messages must say how to fix it,** be associated via \`aria-describedby\`, and receive focus (or an error summary should). "Invalid input" is a shrug, not a message.
5. **Contrast: 4.5:1 for text, 3:1 for large text and UI parts.** Check your muted greys and your disabled states — that's where the bodies are buried.
6. **Nothing depends on colour alone.** The red/green status dot needs a word or shape next to it.
7. **Respect \`prefers-reduced-motion\`.** Parallax and auto-playing movement aren't garnish for vestibular-disorder users; they're a reason to leave.
8. **Touch targets ≥ 24×24 CSS pixels** (new in 2.2, criterion 2.5.8) — audit icon buttons and table row actions first.
9. **Test with a screen reader for 15 minutes a sprint.** VoiceOver ships with the Mac your designer already owns. NVDA is free. Fifteen minutes finds what four automated tools can't.

## What automated tools are actually for

axe, Lighthouse and friends catch roughly a third of real issues — the mechanical third. Use them in CI as a *ratchet* (nothing merged may add violations), not as a certificate. The dangerous failure mode is a green dashboard over an unusable product.

And the overlay widgets that promise one-line compliance? Independent audits keep finding they fix little and break screen-reader behaviour that worked. There is no \`<script>\` tag for empathy.

## Making it stick organisationally

What worked was never the audit — it was moving the definition of done:

- Accessibility criteria live **in the ticket template**, not a wiki.
- The component library is where you win: fix the date picker once, fix it everywhere.
- Put AA in contracts and job ads. What gets hired for gets built.

The quiet secret, after three years of shipping this way: the accessible version has converted better for *every* user group, every time we measured. Constraints are a design tool. This one happens to be the law, too.
`
    },
    {
      slug: "boring-technology-is-a-feature",
      title: "Boring technology is a feature",
      date: "2026-01-18",
      tags: ["Opinion", "Engineering culture"],
      summary: "Innovation tokens, the true cost of novel infrastructure, and why my default stack fits on an index card.",
      body: `
My default stack fits on an index card: TypeScript, React where interactivity earns it, Node, Postgres, one cloud, one queue. Clients occasionally ask why the proposal doesn't mention anything newer. This essay is the long version of my answer.

## Every team gets a few innovation tokens

Dan McKinley's framing from a decade ago still governs my proposals: an organisation can afford to do a **small number of novel things well**. Each unfamiliar technology spends a token — not on the happy path you saw in the demo, but on the 3 a.m. failure modes nobody has documented yet.

The demo shows you the first 90%. The token pays for the second 90%.

## What "boring" actually buys

Postgres is my favourite example. Choosing it isn't a lack of imagination; it's buying, for free:

- Twenty-five years of documented failure modes
- A hiring pool that already knows it
- Migration tools, backup tools, monitoring tools that all exist and all work
- Answers on the first page of search results at 3 a.m.

A newer database may genuinely be better at one thing. Postgres is *known* at everything — and in production, **known beats better** far more often than the conference talk admits.

## Spend the tokens where they compound

Boring infrastructure is not the same as a boring product. The whole point of a predictable foundation is to spend your risk budget where users can feel it. On Fieldnote we spent our tokens on offline sync — the product's soul — precisely because the rest of the stack asked nothing of us. One hard problem at a time is a strategy. Five is a lottery ticket.

## The test I use in reviews

When a design proposes something novel, I ask three questions:

1. What specifically fails if we use the boring option? (Name the requirement, not the vibe.)
2. Who on the team has operated the novel option **in production**, and what broke?
3. If this technology is abandoned in three years, what is our exit path?

Good novel choices survive these questions easily — and about one in five does. The rest were résumé-driven development wearing a technical-requirement costume.

Boring is not the opposite of ambitious. Boring is how you can afford to be ambitious where it counts.
`
    }
  ],

  /* ---- FAQ --------------------------------------------------------------------- */
  faq: {
    kicker: "FAQ",
    title: "Questions people usually ask first.",
    items: [
      {
        q: "Are you available for freelance or contract work?",
        a: "Yes — I take on one or two engagements at a time so each gets real attention. The status line at the top of the page is kept current; if it says available, it is."
      },
      {
        q: "How do engagements usually work?",
        a: "We start with a short scoping call, I send a written proposal with milestones and honest risks, and we work in weekly shipped increments you can see and use. You'll never wait six weeks for a big reveal."
      },
      {
        q: "Do you work with remote teams and other time zones?",
        a: "Almost exclusively. I'm in Kathmandu (UTC+5:45) with a healthy overlap with both European mornings and US East Coast evenings, and I default to written, async-friendly communication."
      },
      {
        q: "What kind of projects are the best fit?",
        a: "Web products where reliability, performance or accessibility genuinely matter: dashboards, data-heavy tools, booking and payment flows, developer platforms, and offline-tolerant field software. If you need a native mobile game, I'll happily refer you to someone better."
      },
      {
        q: "Can you join an existing codebase rather than build from scratch?",
        a: "Yes — audits and rescues are a third of my work. I'm comfortable being dropped into legacy code, and I leave codebases more documented than I found them."
      }
    ]
  },

  /* ---- Contact -------------------------------------------------------------------- */
  contact: {
    kicker: "Contact",
    title: "Let's build something that lasts.",
    lede: "Tell me a little about the project — a rough shape is fine. I reply to everything within two working days.",
    note: "Prefer email? Write to",
    socials: [
      { name: "GitHub", url: "https://github.com/CybLe-example", icon: "github" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/CybLe-example", icon: "linkedin" },
      { name: "X / Twitter", url: "https://x.com/CybLe_example", icon: "x" },
      { name: "RSS", url: "feed.xml", icon: "rss" }
    ]
  },

  /* ---- Gallery (optional) — add {src, alt, caption} items to show the section --- */
  gallery: {
    kicker: "Gallery",
    title: "Moments from the field.",
    items: []
  },

  /* ---- Résumé page ------------------------------------------------------------------ */
  resume: {
    summary:
      "Full-stack engineer with 7+ years building reliable, accessible web products for startups and NGOs. Comfortable owning systems end-to-end — data model, API, frontend, infrastructure — and communicating clearly with non-technical stakeholders. Track record of measurable outcomes: 90% faster reporting, +31% conversion, 99.95% uptime.",
    highlight: "TypeScript · React · Node.js · PostgreSQL · AWS · Accessibility (WCAG 2.2)"
  },

  /* ---- Footer ------------------------------------------------------------------------ */
  footer: {
    tagline: "Designed and hand-coded in Kathmandu. No frameworks, no trackers, no nonsense.",
    version: "v1.0.0",
    nav: [
      { label: "Writing", href: "blog.html" },
      { label: "Résumé", href: "resume.html" },
      { label: "Privacy", href: "privacy.html" },
      { label: "Terms", href: "terms.html" }
    ]
  },

  /* ---- Navigation (order controls the header) --------------------------------------- */
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Services", href: "#services" },
    { label: "Experience", href: "#experience" },
    { label: "Writing", href: "#writing" },
    { label: "Contact", href: "#contact" }
  ]
};
