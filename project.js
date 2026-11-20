(function () {
  const d = window.PORTFOLIO;
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Escape, then allow **bold** in text from content.js
  const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  const ghIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>`;
  const extIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3h7v7M10 14 21 3M21 14v7H3V3h7"/></svg>`;

  const root = $("project-root");
  const projects = d.projects || [];
  const id = new URLSearchParams(location.search).get("id");
  const index = projects.findIndex((p) => p.id === id);
  const p = projects[index];

  $("footer-text").textContent = `© ${new Date().getFullYear()} ${d.name}. Built with care.`;

  if (!p) {
    document.title = `Project not found — ${d.name}`;
    root.insertAdjacentHTML(
      "beforeend",
      `<section class="project-hero">
        <h1>Project not found</h1>
        <p class="project-summary">This project doesn't exist or has moved.</p>
        <div class="hero-cta"><a class="btn btn-primary" href="index.html#projects">See all projects</a></div>
      </section>`
    );
  } else {
    const x = p.details || {};
    document.title = `${p.title} — ${d.name}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", x.summary || p.description);

    const actions = [
      p.github ? `<a class="btn btn-primary" href="${esc(p.github)}" target="_blank" rel="noopener">${ghIcon}<span>View code on GitHub</span></a>` : "",
      p.live ? `<a class="btn btn-ghost" href="${esc(p.live)}" target="_blank" rel="noopener">${extIcon}<span>Live demo</span></a>` : ""
    ].join("");

    const metrics = (x.metrics || [])
      .map((m) => `<div class="card metric"><strong>${esc(m.value)}</strong><span>${esc(m.label)}</span></div>`)
      .join("");

    const overview =
      x.problem || x.solution
        ? `<section class="overview-grid" aria-label="Overview">
            ${x.problem ? `<div class="card overview-card"><span class="overview-label">The problem</span><p>${rich(x.problem)}</p></div>` : ""}
            ${x.solution ? `<div class="card overview-card solution"><span class="overview-label">The solution</span><p>${rich(x.solution)}</p></div>` : ""}
          </section>`
        : "";

    const sections = (x.sections || [])
      .map(
        (s) => `<section class="case-section">
          <h3>${esc(s.title)}</h3>
          ${(s.text || []).map((t) => `<p>${rich(t)}</p>`).join("")}
          ${s.list ? `<ul class="case-list">${s.list.map((li) => `<li>${rich(li)}</li>`).join("")}</ul>` : ""}
        </section>`
      )
      .join("");

    const stackGroups = x.stack && x.stack.length ? x.stack : [{ group: "Tags", items: p.tags || [] }];
    const stack = stackGroups
      .map(
        (g) => `<div class="stack-group"><h4>${esc(g.group)}</h4>
          <ul class="chips">${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`
      )
      .join("");

    const linkRows = [
      p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener">${ghIcon}<span>Source code</span></a>` : "",
      p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener">${extIcon}<span>Live demo</span></a>` : ""
    ].join("");

    const prev = projects[(index - 1 + projects.length) % projects.length];
    const next = projects[(index + 1) % projects.length];
    const pager =
      projects.length > 1
        ? `<nav class="project-pager" aria-label="More projects">
            <a class="card pager-link" href="project.html?id=${encodeURIComponent(prev.id)}"><span>← Previous</span><strong>${esc(prev.title)}</strong></a>
            <a class="card pager-link next" href="project.html?id=${encodeURIComponent(next.id)}"><span>Next →</span><strong>${esc(next.title)}</strong></a>
          </nav>`
        : "";

    root.insertAdjacentHTML(
      "beforeend",
      `<section class="project-hero">
        ${x.category ? `<p class="eyebrow">${esc(x.category)}</p>` : ""}
        <h1>${esc(p.title)}</h1>
        <p class="project-summary">${rich(x.summary || p.description)}</p>
        ${actions ? `<div class="hero-cta">${actions}</div>` : ""}
      </section>
      ${overview}
      ${metrics ? `<section class="metric-grid" aria-label="Key numbers">${metrics}</section>` : ""}
      <div class="project-layout">
        <article class="project-body">
          ${sections ? `<h2 class="tech-heading">Technical implementation</h2>${sections}` : `<section class="case-section"><p>${rich(p.description)}</p></section>`}
        </article>
        <aside class="project-aside">
          <div class="card aside-card"><h3>Tech stack</h3>${stack}</div>
          ${linkRows ? `<div class="card aside-card"><h3>Links</h3><div class="aside-links">${linkRows}</div></div>` : ""}
        </aside>
      </div>
      ${pager}`
    );
  }

  // ---- Theme toggle ----
  $("theme-toggle").addEventListener("click", () => {
    const r = document.documentElement;
    const current = r.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const nextTheme = current === "dark" ? "light" : "dark";
    r.dataset.theme = nextTheme;
    try { localStorage.setItem("theme", nextTheme); } catch (e) {}
  });

  // ---- Mobile menu ----
  const links = $("nav-links");
  $("menu-toggle").addEventListener("click", () => links.classList.toggle("open"));
})();
