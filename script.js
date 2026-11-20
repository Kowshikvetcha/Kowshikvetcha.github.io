(function () {
  const d = window.PORTFOLIO;
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---- Render content ----
  document.title = `${d.name} — ${d.role}`;
  $("hero-name").textContent = d.shortName || d.name;
  $("hero-role").textContent = d.role;
  $("hero-tagline").textContent = d.tagline;
  if (!d.available) $("badge").remove();
  if (d.resumeUrl) $("resume-link").href = d.resumeUrl;
  else $("resume-link").remove();

  $("stats").innerHTML = d.stats
    .map((s) => `<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`)
    .join("");

  $("about-text").innerHTML = d.about.map((p) => `<p>${esc(p)}</p>`).join("");

  $("skills-grid").innerHTML = d.skills
    .map(
      (g) => `<div class="card skill-card">
        <h4>${esc(g.group)}</h4>
        <ul class="chips">${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
      </div>`
    )
    .join("");

  $("timeline").innerHTML = d.experience
    .map(
      (e) => `<li class="timeline-item">
        <div class="timeline-head">
          <h4>${esc(e.title)} <span class="accent">@ ${esc(e.company)}</span></h4>
          <span class="period">${esc(e.period)}</span>
        </div>
        <ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      </li>`
    )
    .join("");

  const ghIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>`;
  const extIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3h7v7M10 14 21 3M21 14v7H3V3h7"/></svg>`;

  $("projects-grid").innerHTML = d.projects
    .map(
      (p) => `<article class="card project-card">
        <div class="project-top">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" class="folder"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          <div class="project-links">
            ${p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener" aria-label="GitHub">${ghIcon}</a>` : ""}
            ${p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener" aria-label="Live site">${extIcon}</a>` : ""}
          </div>
        </div>
        ${p.org ? `<span class="project-org">${esc(p.org)}</span>` : ""}
        <h4>${p.id ? `<a class="card-link" href="project.html?id=${encodeURIComponent(p.id)}">${esc(p.title)}</a>` : esc(p.title)}</h4>
        <p>${esc(p.description)}</p>
        <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        ${p.id ? `<p class="read-more">Read case study <span>→</span></p>` : ""}
      </article>`
    )
    .join("");

  const badgeIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/></svg>`;
  const capIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>`;
  $("creds-grid").innerHTML = [
    ...(d.certifications || []).map(
      (c) => `<div class="card cred-card"><span class="cred-icon">${badgeIcon}</span>
        <div><h4>${esc(c.title)}</h4><p>${esc(c.issuer)}</p></div></div>`
    ),
    ...(d.education || []).map(
      (e) => `<div class="card cred-card"><span class="cred-icon">${capIcon}</span>
        <div><h4>${esc(e.degree)}</h4><p>${esc(e.school)} · ${esc(e.year)}</p></div></div>`
    )
  ].join("");

  if (d.githubUrl) $("github-all").href = d.githubUrl;
  else $("github-all").parentElement.remove();

  $("contact-blurb").textContent = d.contact.blurb;
  $("contact-email").href = `mailto:${d.contact.email}`;
  $("contact-email").textContent = d.contact.email;
  $("contact-location").textContent = d.location;

  // ---- Copy email ----
  $("copy-email").addEventListener("click", async () => {
    const btn = $("copy-email");
    try {
      await navigator.clipboard.writeText(d.contact.email);
      btn.classList.add("copied");
      btn.setAttribute("aria-label", "Copied!");
      setTimeout(() => { btn.classList.remove("copied"); btn.setAttribute("aria-label", "Copy email address"); }, 1800);
    } catch (e) {
      window.prompt("Copy my email:", d.contact.email);
    }
  });

  // ---- Contact form ----
  const form = $("contact-form");
  const status = $("form-status");
  const submit = $("contact-submit");
  const setStatus = (msg, type) => { status.textContent = msg; status.className = `form-status ${type || ""}`; };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // honeypot: bots fill hidden fields

    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const message = (data.message || "").trim();
    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Please add your name, a valid email and a message.", "error");
      return;
    }
    const subject = (data.subject || "").trim() || `Portfolio message from ${name}`;

    // No form service configured: fall back to the visitor's email app
    if (!d.contact.web3formsKey) {
      const body = `${message}\n\n— ${name} (${email})`;
      location.href = `mailto:${d.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("Opening your email app… If nothing happens, email me directly at the address on the right.", "");
      return;
    }

    submit.disabled = true;
    submit.textContent = "Sending…";
    setStatus("", "");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: d.contact.web3formsKey,
          subject,
          from_name: `${d.shortName || d.name}'s portfolio`,
          name,
          email,
          replyto: email,
          message
        })
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.message || res.statusText);
      form.reset();
      setStatus("Thanks! Your message is on its way — I'll get back to you soon.", "success");
    } catch (err) {
      setStatus("Sorry, that didn't send. Please email me directly at the address on the right.", "error");
    } finally {
      submit.disabled = false;
      submit.textContent = "Send message";
    }
  });
  $("social").innerHTML = d.contact.links
    .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`)
    .join("");

  $("footer-text").textContent = `© ${new Date().getFullYear()} ${d.name}. Built with care.`;

  // ---- Theme toggle ----
  $("theme-toggle").addEventListener("click", () => {
    const root = document.documentElement;
    const current =
      root.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // ---- Mobile menu ----
  const links = $("nav-links");
  $("menu-toggle").addEventListener("click", () => links.classList.toggle("open"));
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") links.classList.remove("open");
  });

  // ---- Reveal on scroll ----
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // ---- Active nav link ----
  const sections = [...document.querySelectorAll("main section[id]")];
  const navAs = [...links.querySelectorAll("a")];
  const onScroll = () => {
    const y = scrollY + 120;
    let active = "";
    sections.forEach((s) => { if (s.offsetTop <= y) active = s.id; });
    navAs.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${active}`));
    document.querySelector(".nav").classList.toggle("scrolled", scrollY > 10);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
