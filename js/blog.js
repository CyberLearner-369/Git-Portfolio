/* ==========================================================================
   BLOG.JS — renders the writing index and individual posts from js/content.js.
   Includes a small, safe Markdown renderer (input is escaped before any HTML
   is generated) and a lightweight syntax highlighter. Zero dependencies.
   ========================================================================== */
(function () {
  "use strict";

  window.__pageReady = function () {
    const A = window.APP;
    const SITE = window.SITE || {};
    const esc = A.esc, icon = A.icon, fmtDate = A.fmtDate, readingTime = A.readingTime;
    const posts = (SITE.posts || []).slice().sort((a, b) => b.date.localeCompare(a.date));
    const slot = document.getElementById("blog-slot");
    if (!slot) return;

    const params = new URLSearchParams(location.search);
    const slug = params.get("post");
    const post = slug ? posts.find((p) => p.slug === slug) : null;

    if (post) renderPost(post);
    else renderIndex();

    /* ---------- index ----------------------------------------------------- */
    function renderIndex() {
      const meta = SITE.writingMeta || {};
      const tags = Array.from(new Set(posts.flatMap((p) => p.tags || [])));
      const state = { tag: "All", q: "" };

      slot.innerHTML =
        '<header class="section__head">' +
          '<p class="kicker mono reveal">' + esc(meta.kicker || "Writing") + "</p>" +
          '<h1 class="section__title reveal">' + esc(meta.title || "Writing") + "</h1>" +
          (meta.lede ? '<p class="section__lede reveal">' + esc(meta.lede) + "</p>" : "") +
        "</header>" +
        '<div class="toolbar reveal">' +
          '<div class="filters" role="group" aria-label="Filter posts by topic">' +
            ["All"].concat(tags).map((t, i) =>
              '<button type="button" class="chip" data-tag="' + esc(t) + '" aria-pressed="' + (i === 0) + '">' + esc(t) + "</button>").join("") +
          "</div>" +
          '<label class="searchwrap"><span class="sr-only">Search posts</span>' + icon("search") +
            '<input type="search" id="post-search" placeholder="Search writing…" autocomplete="off"></label>' +
        "</div>" +
        '<p class="toolbar__count mono" id="post-count" role="status"></p>' +
        '<div class="posts-grid posts-grid--index" id="posts-grid"></div>';

      const grid = document.getElementById("posts-grid");
      const count = document.getElementById("post-count");
      const paint = () => {
        let list = posts.filter((p) => state.tag === "All" || (p.tags || []).includes(state.tag));
        if (state.q) {
          const q = state.q.toLowerCase();
          list = list.filter((p) => (p.title + " " + p.summary + " " + (p.tags || []).join(" ")).toLowerCase().includes(q));
        }
        grid.innerHTML = list.length ? list.map(A.postCard).join("")
          : '<p class="projects__empty">No posts match — try another topic or clear the search.</p>';
        count.textContent = list.length + (list.length === 1 ? " post" : " posts") +
          (state.tag !== "All" ? " · " + state.tag : "");
        A.observeReveals(grid);
      };
      slot.querySelector(".filters").addEventListener("click", (e) => {
        const b = e.target.closest("[data-tag]");
        if (!b) return;
        state.tag = b.dataset.tag;
        slot.querySelectorAll("[data-tag]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        paint();
      });
      document.getElementById("post-search").addEventListener("input", (e) => { state.q = e.target.value.trim(); paint(); });
      paint();
      A.observeReveals(slot);
    }

    /* ---------- post view --------------------------------------------------- */
    function renderPost(p) {
      document.title = p.title + " — " + ((SITE.identity || {}).name || "");
      const headings = [];
      const bodyHTML = mdToHtml(p.body || "", headings);
      const related = posts.filter((r) => r.slug !== p.slug && (r.tags || []).some((t) => (p.tags || []).includes(t))).slice(0, 2);
      const toc = headings.filter((h) => h.level === 2);

      slot.innerHTML =
        '<nav class="crumbs mono reveal" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span>' +
          '<a href="blog.html">Writing</a><span aria-hidden="true">/</span><span aria-current="page">' + esc(p.title.length > 34 ? p.title.slice(0, 34) + "…" : p.title) + "</span></nav>" +
        '<header class="post__head">' +
          '<p class="post-card__date mono reveal"><time datetime="' + esc(p.date) + '">' + fmtDate(p.date) + "</time> · " + readingTime(p.body) + "</p>" +
          '<h1 class="post__title reveal">' + esc(p.title) + "</h1>" +
          '<ul class="tags reveal" aria-label="Topics">' + (p.tags || []).map((t) => "<li class='tag mono'>" + esc(t) + "</li>").join("") + "</ul>" +
        "</header>" +
        '<div class="post__layout">' +
          (toc.length > 1
            ? '<aside class="toc reveal"><p class="toc__label mono">On this page</p><nav aria-label="Table of contents"><ol class="toc__list">' +
              toc.map((h) => '<li><a href="#' + h.id + '">' + esc(h.text) + "</a></li>").join("") + "</ol></nav></aside>"
            : "") +
          '<article class="prose reveal">' + bodyHTML +
            '<footer class="post__foot">' +
              '<div class="share" role="group" aria-label="Share this post">' +
                '<span class="mono">Share</span>' +
                '<a class="icon-btn" id="share-x" aria-label="Share on X" target="_blank" rel="noopener noreferrer">' + icon("x") + "</a>" +
                '<a class="icon-btn" id="share-li" aria-label="Share on LinkedIn" target="_blank" rel="noopener noreferrer">' + icon("linkedin") + "</a>" +
                '<button type="button" class="icon-btn" id="share-copy" aria-label="Copy link">' + icon("copy") + "</button>" +
              "</div>" +
              '<a class="btn btn--secondary" href="blog.html">' + icon("arrow-right", "flip") + " All writing</a>" +
            "</footer>" +
          "</article>" +
        "</div>" +
        (related.length
          ? '<section class="related" aria-label="Related writing"><h2 class="related__title mono">Related</h2>' +
            '<div class="posts-grid">' + related.map(A.postCard).join("") + "</div></section>"
          : "");

      // share links
      const url = location.href;
      document.getElementById("share-x").href =
        "https://twitter.com/intent/tweet?text=" + encodeURIComponent(p.title) + "&url=" + encodeURIComponent(url);
      document.getElementById("share-li").href =
        "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);
      document.getElementById("share-copy").addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(url); A.toast("Link copied"); }
        catch (e) { A.toast(url); }
      });

      // copy buttons on code blocks
      slot.addEventListener("click", async (e) => {
        const btn = e.target.closest("[data-copy]");
        if (!btn) return;
        const code = btn.closest(".codeblock").querySelector("code");
        try { await navigator.clipboard.writeText(code.textContent); btn.textContent = "Copied"; setTimeout(() => (btn.textContent = "Copy"), 1600); }
        catch (err) { A.toast("Copy failed"); }
      });

      // highlight current TOC entry while reading
      if (toc.length > 1 && "IntersectionObserver" in window) {
        const links = new Map();
        slot.querySelectorAll(".toc__list a").forEach((a) => links.set(a.getAttribute("href").slice(1), a));
        const io = new IntersectionObserver((entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            links.forEach((a) => a.removeAttribute("aria-current"));
            const a = links.get(en.target.id);
            if (a) a.setAttribute("aria-current", "true");
          });
        }, { rootMargin: "-15% 0px -70% 0px" });
        headings.forEach((h) => { const el = document.getElementById(h.id); if (el) io.observe(el); });
      }

      A.observeReveals(slot);
    }

    /* ---------- markdown → HTML (escape-first, line-based) --------------------- */
    function slugify(text) {
      return String(text).toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").slice(0, 64) || "section";
    }

    function inline(text) {
      let s = esc(text);
      s = s.replace(/`([^`\n]+)`/g, (_, c) => "<code>" + c + "</code>");
      s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      s = s.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
      s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
        const ok = /^(https?:\/\/|#|\/|\.\/|[\w-]+\.html)/.test(href);
        if (!ok) return label;
        const ext = /^https?:/.test(href) ? ' target="_blank" rel="noopener noreferrer"' : "";
        return '<a href="' + href + '"' + ext + ">" + label + "</a>";
      });
      return s;
    }

    function highlight(src, lang) {
      // strings first (protects // inside URLs), then comments, numbers, keywords
      const re = /("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\/\/[^\n]*|\/\*[\s\S]*?\*\/|(?:^|\n)\s*#[^\n]*)|\b(\d+(?:\.\d+)?)\b|\b(const|let|var|function|return|if|else|for|while|do|await|async|new|class|extends|import|export|from|default|try|catch|finally|throw|typeof|instanceof|of|in|null|undefined|true|false|this|switch|case|break|continue|yield|def|elif|lambda|pass|None|True|False|and|or|not|fn|pub|use|match|struct|impl|SELECT|FROM|WHERE|INSERT|UPDATE|DELETE)\b/g;
      let out = "", last = 0, m;
      while ((m = re.exec(src))) {
        out += esc(src.slice(last, m.index));
        const cls = m[1] ? "tok-str" : m[2] ? "tok-com" : m[3] ? "tok-num" : "tok-kw";
        out += '<span class="' + cls + '">' + esc(m[0]) + "</span>";
        last = m.index + m[0].length;
      }
      return out + esc(src.slice(last));
    }

    function mdToHtml(md, headings) {
      const lines = String(md).replace(/\r\n/g, "\n").split("\n");
      const out = [];
      let i = 0, para = [];
      const flush = () => { if (para.length) { out.push("<p>" + inline(para.join(" ")) + "</p>"); para = []; } };

      while (i < lines.length) {
        const line = lines[i];

        const fence = line.match(/^```(\w*)\s*$/);
        if (fence) {
          flush();
          const lang = fence[1] || "";
          const code = [];
          i++;
          while (i < lines.length && !/^```\s*$/.test(lines[i])) { code.push(lines[i]); i++; }
          i++;
          out.push('<div class="codeblock"><div class="codeblock__bar mono"><span>' + esc(lang || "code") +
            '</span><button type="button" class="codeblock__copy mono" data-copy>Copy</button></div>' +
            "<pre><code>" + highlight(code.join("\n"), lang) + "</code></pre></div>");
          continue;
        }

        const h = line.match(/^(#{2,4}) (.+)$/);
        if (h) {
          flush();
          const level = h[1].length;
          let id = slugify(h[2]);
          while (headings.some((x) => x.id === id)) id += "-x";
          headings.push({ level, text: h[2].replace(/[*`]/g, ""), id });
          out.push("<h" + level + ' id="' + id + '">' + inline(h[2]) + "</h" + level + ">");
          i++; continue;
        }

        if (/^(-{3,}|\*{3,})\s*$/.test(line)) { flush(); out.push("<hr>"); i++; continue; }

        if (/^> ?/.test(line)) {
          flush();
          const q = [];
          while (i < lines.length && /^> ?/.test(lines[i])) { q.push(lines[i].replace(/^> ?/, "")); i++; }
          out.push("<blockquote><p>" + inline(q.join(" ")) + "</p></blockquote>");
          continue;
        }

        if (/^[-*] /.test(line)) {
          flush();
          const items = [];
          while (i < lines.length && /^[-*] /.test(lines[i])) { items.push(lines[i].replace(/^[-*] /, "")); i++; }
          out.push("<ul>" + items.map((t) => "<li>" + inline(t) + "</li>").join("") + "</ul>");
          continue;
        }

        if (/^\d+\. /.test(line)) {
          flush();
          const items = [];
          while (i < lines.length && /^\d+\. /.test(lines[i])) { items.push(lines[i].replace(/^\d+\. /, "")); i++; }
          out.push("<ol>" + items.map((t) => "<li>" + inline(t) + "</li>").join("") + "</ol>");
          continue;
        }

        if (/^\s*$/.test(line)) { flush(); i++; continue; }
        para.push(line.trim());
        i++;
      }
      flush();
      return out.join("\n");
    }
  };
})();
