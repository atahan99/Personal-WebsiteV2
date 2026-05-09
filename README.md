# vCard — Personal portfolio (showcase fork)

![GitHub repo size](https://img.shields.io/github/repo-size/atahan99/Personal-WebsiteV2)
[![Pages](https://img.shields.io/badge/GitHub-Pages-222?style=flat&logo=github)](https://pages.github.com/)

**vCard** is a responsive personal portfolio template ([original theme](https://github.com/codewithsadee/vcard-personal-portfolio)). This repository is a **sanitized showcase**: vanilla **HTML, CSS, and JavaScript**, wired for **GitHub Pages**, with lab/project detail pages and a filterable portfolio section.

Root **`/`** is a **maintenance landing** (`index.html`); the **full demo** is under **`/showcase/`**. Edit HTML directly in those paths—there is no template build step.

---

## Preview locally

```bash
npm run preview
```

Open **http://localhost:4173/** (maintenance) and **http://localhost:4173/showcase/** (portfolio). No install step required unless you want to pin tooling.

---

## Highlights

- **Responsive layout** with sidebar profile shell and main content tabs (**About**, **Experience**, **Portfolio**).
- **Portfolio filters** (Networking / Programming / Hacking) with desktop buttons + mobile select UI.
- **Project pages** under [`showcase/pages/`](showcase/pages/).

---

## Repository layout

| Path | Role |
|------|------|
| [`index.html`](index.html), [`maintenance.html`](maintenance.html) | Maintenance landing(s); [`assets/`](assets/) holds shared CSS/JS/icons |
| [`showcase/index.html`](showcase/index.html) | Portfolio home |
| [`showcase/pages/`](showcase/pages/) | Individual project write-ups |

**Customization:** edit the HTML files above (titles, sidebar copy, links, images paths).

[`.env.example`](.env.example) lists common labels you might use **for yourself** (names, titles, optional URLs). Nothing reads it automatically—keep real values in a local `.env` (gitignored) or paste only what you want into HTML.

---

## GitHub Pages

- [`CNAME`](CNAME) declares your **custom hostname** ([docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)).
- Publishing **this repo root** serves `/` as maintenance and **`/showcase/*`** for the portfolio.
- To publish **only** a landing page with no `/showcase/` URLs online, copy `index.html`, `assets/`, and optionally `CNAME` into a separate publish folder or branch yourself—nothing generates `dist/` in-repo anymore.

---

## README screenshots

Use **`/`** or **`/showcase/`** after your edits so images match what you ship.

---

## Credits

- Theme fork / inspiration: [codewithsadee/vcard-personal-portfolio](https://github.com/codewithsadee/vcard-personal-portfolio).
- Ionicons loaded from CDN where referenced.

---

## Cleanup notes (2026)

Defaults were scrubbed for a **public showcase** (embedded contacts resume PDF, etc.). Navbar/filter JS was hardened for pages without portfolio widgets.

---

## When replacing this site (e.g. Next.js)

Replace root [`index.html`](index.html), remove [`maintenance.html`](maintenance.html) if unused, and drop `preview` from [`package.json`](package.json) when you no longer need local static serving.
