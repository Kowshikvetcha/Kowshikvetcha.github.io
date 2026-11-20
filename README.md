# Kowshik Vetcha — Portfolio

My personal portfolio website, live at **https://kowshikvetcha.github.io**.

It is a plain HTML / CSS / JavaScript site: **no frameworks, no build step, no `npm install`**. Almost everything you see on the page comes from one file, [`content.js`](content.js), so day-to-day updates mean editing that file and pushing.

---

## Contents

1. [Quick start: update the site in 3 steps](#quick-start-update-the-site-in-3-steps)
2. [Project files](#project-files)
3. [Run it locally](#run-it-locally)
4. [Editing content (`content.js`)](#editing-content-contentjs)
5. [Updating the resume](#updating-the-resume)
6. [Contact form (Web3Forms)](#contact-form-web3forms)
7. [Changing the look](#changing-the-look)
8. [Page title, link previews and favicon](#page-title-link-previews-and-favicon)
9. [Deployment (GitHub Pages)](#deployment-github-pages)
10. [Custom domain (optional)](#custom-domain-optional)
11. [Troubleshooting](#troubleshooting)

---

## Quick start: update the site in 3 steps

1. **Edit** [`content.js`](content.js) (or replace a file in `assets/`).
2. **Preview** locally (optional): `python -m http.server 5173`, then open http://localhost:5173.
3. **Publish**:

   ```powershell
   git add -A
   git commit -m "Describe what you changed"
   git push
   ```

GitHub Pages rebuilds automatically. The live site updates in **about 30–60 seconds**. If you don't see the change, hard-refresh with `Ctrl + F5`.

---

## Project files

```
portfolio/
├── index.html          Page skeleton: sections, nav, contact form markup, <head> meta tags
├── content.js          ★ ALL editable content: name, about, skills, jobs, projects, links…
├── script.js           Renders content.js into the page + theme toggle, menu, form logic
├── styles.css          All styling: colours, layout, dark/light themes, mobile layout
├── assets/
│   └── Vetcha_Kowshik_Resume.pdf   The file the "Download Resume" button serves
├── .nojekyll           Tells GitHub Pages to serve files as-is (don't delete)
├── .gitignore          Keeps local-only files (.claude/) out of the repo
└── README.md           This guide
```

| You want to change… | Edit this |
|---|---|
| Any text, numbers, skills, jobs, projects, links | `content.js` |
| The resume file | `assets/Vetcha_Kowshik_Resume.pdf` |
| Colours, fonts, spacing | `styles.css` |
| Browser-tab title, link-preview text, favicon | `<head>` of `index.html` |
| Add/remove/reorder whole sections, nav links | `index.html` (+ `script.js` for new data) |

---

## Run it locally

Opening `index.html` by double-clicking mostly works, but a local server behaves exactly like the live site:

```powershell
python -m http.server 5173
```

Then open **http://localhost:5173**. Stop it with `Ctrl + C`. Refresh the browser after each edit.

> The contact form really sends messages even from localhost, so be careful when testing it.

---

## Editing content (`content.js`)

`content.js` defines one object, `window.PORTFOLIO`. Each key fills one part of the page. Keep the JavaScript syntax intact:

- Text goes inside **double quotes** `"..."`. If your text needs a `"`, write `\"`.
- Items in a list are separated by **commas**. A missing comma breaks the page (see [Troubleshooting](#troubleshooting)).
- Lines starting with `//` are comments and are ignored.

### Hero (top of the page)

| Field | What it does |
|---|---|
| `name` | Full name. Used in the page title, logo letter and footer. |
| `shortName` | Name shown big in "Hi, I'm ___." |
| `role` | Line under the name, e.g. `"Machine Learning Engineer"`. |
| `tagline` | One- or two-sentence pitch under the role. |
| `location` | Shown in the Contact section ("Based in"). |
| `available` | `true` shows the green **Open to opportunities** badge; `false` hides it. |
| `resumeUrl` | Path to the resume PDF. Set to `""` to hide the **Download Resume** button. |

### Stats (the big numbers under the hero)

```js
stats: [
  { value: "5", label: "Years in ML & data" },
  { value: "70%", label: "Fewer job cancellations" }
],
```

Add, remove or reorder `{ value, label }` entries. Three or four look best.

### About

```js
about: [
  "First paragraph…",
  "Second paragraph…"
],
```

Each string is one paragraph.

### Skills

```js
skills: [
  { group: "Programming", items: ["Python", "SQL", "C"] },
  { group: "GenAI & LLMs", items: ["RAG", "LangChain"] }
],
```

Each `group` becomes a card and each entry in `items` becomes a chip.

### Experience (timeline)

```js
experience: [
  {
    title: "ML Engineer",
    company: "DataNimbus",
    period: "Aug 2025 — Present",
    points: [
      "What you did / achieved…",
      "Another bullet…"
    ]
  },
  // older jobs below
],
```

The **newest job goes first**. To add a job, copy one `{ … }` block, paste it at the top of the list, and keep the comma between blocks.

### Projects

```js
projects: [
  {
    title: "Insurance Policy Analyser",
    description: "Two or three sentences about the problem and the result.",
    tags: ["RAG", "FastAPI", "React"],
    github: "https://github.com/Kowshikvetcha/Insurance_RAG",
    live: ""                       // demo URL, or "" for none
  }
],
githubUrl: "https://github.com/Kowshikvetcha",   // "See all on GitHub" button
```

| Field | Notes |
|---|---|
| `title`, `description`, `tags` | Card heading, text and the small tech labels. |
| `github` | Repo link (GitHub icon). Use `""` to hide the icon. |
| `live` | Live demo link (external-link icon). Use `""` to hide it. |
| `org` *(optional)* | Small label above the title, e.g. `"DataNimbus"`, for work projects. |

Cards appear **in the order listed**. To add a project, copy a block and edit it. To remove one, delete its whole `{ … }` block and its trailing comma. Set `githubUrl` to `""` to hide the "See all on GitHub" button.

### Certifications & education

```js
certifications: [
  { title: "Databricks Certified Generative AI Engineer", issuer: "Databricks" }
],
education: [
  { degree: "B.Tech, Electronics & Communication Engineering",
    school: "Gudlavalleru Engineering College", year: "2020" }
],
```

Both lists render as cards in the **Certifications & Education** section.

### Contact

```js
contact: {
  blurb: "Short invitation text above the form.",
  email: "you@example.com",           // shown with a copy button + used as fallback
  web3formsKey: "xxxxxxxx-xxxx-…",    // see "Contact form" below
  links: [
    { label: "GitHub", url: "https://github.com/…" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/…" }
  ]
}
```

Add any other profile (Kaggle, Medium, X, …) as another `{ label, url }` entry in `links`.

---

## Updating the resume

The **Download Resume** button serves `assets/Vetcha_Kowshik_Resume.pdf`.

**Replace it with a newer version (simplest):**

1. Export the new resume as PDF.
2. Save it over `assets/Vetcha_Kowshik_Resume.pdf`, keeping **exactly the same file name**.
3. Commit and push:

   ```powershell
   git add assets/Vetcha_Kowshik_Resume.pdf
   git commit -m "Update resume"
   git push
   ```

**Use a different file name:** put the file in `assets/` and update `resumeUrl` in `content.js`. Also update `download="…"` on the `resume-link` button in `index.html`, which sets the name the file downloads as.

**Hide the button:** set `resumeUrl: ""` in `content.js`.

> ⚠️ **Privacy:** the resume is public, and anyone can download it. Leave out anything you don't want shared, such as your phone number or home address. Because the repo is public, **old versions stay in the git history** even after you replace the file. Removing them completely needs a history rewrite (e.g. `git filter-repo`).

---

## Contact form (Web3Forms)

The **Get in touch** form delivers messages to my inbox using [Web3Forms](https://web3forms.com), a free service with about 250 messages/month. No backend or server is needed.

**How it works**

- `script.js` sends the form to `https://api.web3forms.com/submit` with the `web3formsKey` from `content.js`.
- Messages arrive from "Kowshik's portfolio", with the visitor's address as **reply-to**, so you can simply hit Reply.
- A hidden "honeypot" field quietly drops most spam bots.
- If `web3formsKey` is empty, the form instead opens the visitor's own email app with the message pre-filled.

**Managing it**

| Task | How |
|---|---|
| Change where messages are delivered | Log in at web3forms.com and change the form's email, or create a new form and paste its key into `content.js`. |
| Website URL setting on Web3Forms | Must be `kowshikvetcha.github.io` (or your custom domain if you add one). |
| Rotate the key | Create a new key on Web3Forms → replace `web3formsKey` → push. |
| Turn the form off | Set `web3formsKey: ""`. The form then falls back to opening the email app. |

> The access key is **meant to be public**, since it only allows sending messages *to you*, so it's fine in `content.js`.

**After any change, test it:** open the live site, send yourself a message, and check your inbox and spam folder.

---

## Changing the look

All styling is in [`styles.css`](styles.css).

**Colours** are defined once at the top as CSS variables:

```css
:root {                      /* dark theme (default) */
  --bg: #0b0f17;             /* page background */
  --bg-elev: #121826;        /* cards */
  --text: #e5e7eb;           /* main text */
  --muted: #94a3b8;          /* secondary text */
  --accent: #5eead4;         /* highlight colour (teal) */
}
:root[data-theme="light"] { /* light theme */ … --accent: #0d9488; }
```

To change the highlight colour, edit `--accent` in **both** the dark and light blocks, and in the `@media (prefers-color-scheme: light)` block too, which mirrors the light theme.

**Fonts** are Inter (text) and JetBrains Mono (labels), loaded from Google Fonts in `index.html`. To swap them, change the `<link href="https://fonts.googleapis.com/...">` in `index.html` and the `font-family` lines in `styles.css`.

**Theme behaviour:** the site follows the visitor's system light/dark setting until they click the sun/moon button. Their choice is then remembered in their browser.

### Adding a new section

1. In `index.html`, copy an existing `<section …>` block (e.g. Credentials) and give it a new `id`, heading number and an empty container, e.g. `<div id="awards-grid"></div>`.
2. Add a nav link: `<a href="#awards">Awards</a>` inside `<nav id="nav-links">`.
3. Add the data to `content.js`, e.g. `awards: [ … ]`.
4. In `script.js`, render it the same way the other sections are, e.g. `$("awards-grid").innerHTML = d.awards.map(…).join("")`.

---

## Page title, link previews and favicon

These live in the `<head>` of [`index.html`](index.html). They are not read from `content.js`, because link-preview crawlers (LinkedIn, WhatsApp, Slack…) don't run JavaScript.

| Tag | Purpose |
|---|---|
| `<title>` | Browser-tab title and search-result title. |
| `<meta name="description">` | Search-result snippet. |
| `og:title`, `og:description`, `og:url` | Text shown when the link is shared on social apps. |
| `<link rel="icon">` | The "K" favicon, an inline SVG. Edit the letter or colours there. |

Update these if your role or headline changes. After changing them, LinkedIn may keep showing the old preview for a while; you can refresh it with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

---

## Deployment (GitHub Pages)

| | |
|---|---|
| Repository | https://github.com/Kowshikvetcha/Kowshikvetcha.github.io (public) |
| Branch / folder | `main` / root (`/`) |
| Live URL | https://kowshikvetcha.github.io |
| Settings | Repo → **Settings → Pages** |

Every push to `main` redeploys automatically. You can watch the build under the repo's **Actions** tab ("pages build and deployment").

**Working from a new computer:**

```powershell
git clone https://github.com/Kowshikvetcha/Kowshikvetcha.github.io.git
cd Kowshikvetcha.github.io
```

Then edit, commit and push as usual. You need to be signed in to GitHub, e.g. with `gh auth login`.

**Undo a bad change:**

```powershell
git log --oneline          # find the commit
git revert <commit-id>     # creates a new commit that undoes it
git push
```

---

## Custom domain (optional)

If you buy a domain (e.g. `kowshikvetcha.com`):

1. In the repo: **Settings → Pages → Custom domain**, enter the domain and save. This adds a `CNAME` file to the repo.
2. At your domain registrar, add DNS records:
   - Apex domain (`kowshikvetcha.com`): four `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` subdomain: `CNAME` → `kowshikvetcha.github.io`
3. When the DNS check passes, tick **Enforce HTTPS**.
4. Update the **Website URL** in Web3Forms and the `og:url` tag in `index.html` to the new domain.

---

## Troubleshooting

| Problem | Likely cause / fix |
|---|---|
| Page is blank or sections are empty | A syntax error in `content.js`, usually a missing comma or quote. Open the browser console (`F12` → Console) for the line number. |
| Change doesn't show on the live site | Wait about 1 minute, then hard-refresh with `Ctrl + F5`. Check the repo's **Actions** tab for a failed build. Confirm you ran `git push`. |
| Contact form says "Sorry, that didn't send" | Check the key in `content.js`, check the Website URL setting on Web3Forms, and check you're not over the monthly limit. |
| Form messages not arriving | Look in spam and mark the message "Not spam". Check the delivery email on Web3Forms. |
| Resume downloads an old version | The browser cached it. Hard-refresh, or rename the file and update `resumeUrl`. |
| Old link preview on LinkedIn | Use the LinkedIn Post Inspector to re-scrape the URL. |
