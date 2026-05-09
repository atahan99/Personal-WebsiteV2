# vCard — Personal portfolio (showcase fork)

![GitHub repo size](https://img.shields.io/github/repo-size/atahan99/Personal-WebsiteV2)
[![Pages](https://img.shields.io/badge/GitHub-Pages-222?style=flat&logo=github)](https://pages.github.com/)

**vCard** is a responsive personal portfolio template ([original theme](https://github.com/codewithsadee/vcard-personal-portfolio)). This repository is a **sanitized showcase**: vanilla **HTML, CSS, and JavaScript**, wired for **GitHub Pages**, with lab/project detail pages and a filterable portfolio section.

Root **`/`** is intentionally a **maintenance landing** while a newer site ships elsewhere; the **full static demo** lives under **`/showcase/`**.

---

## Preview locally

From the repository root:

```bash
npm install
npm run build        # regenerate showcase/, index.html, and maintenance.html from templates/
npm run preview      # static server → http://localhost:4173/
```

Then open:

| URL | What you see |
|-----|----------------|
| [http://localhost:4173/](http://localhost:4173/) | Maintenance landing (`index.html`) |
| [http://localhost:4173/showcase/](http://localhost:4173/showcase/) | Full vCard-style portfolio |
| [http://localhost:4173/showcase/pages/](http://localhost:4173/showcase/pages/) | Individual project write-ups |

No bundler required—the preview serves files as-is.

---

## Highlights

- **Responsive layout** with sidebar profile shell and main content tabs (**About**, **Experience**, **Portfolio**).
- **Portfolio filters** (Networking / Programming / Hacking) with desktop buttons + mobile select UI.
- **Project gallery** linking to dedicated HTML pages under [`showcase/pages/`](showcase/pages/).
- **Small HTML token build**: edit [`templates/`](templates/), set optional values in `.env`, run **`npm run build`** ([`scripts/build.mjs`](scripts/build.mjs)).
- **Optional sidebar contacts**: email, location, LinkedIn, and GitHub appear only when set in `.env` (safe defaults ship empty).

---

## Repository layout

| Path | Role |
|------|------|
| [`templates/showcase/`](templates/showcase/) | Tokenized sources for the full portfolio |
| [`templates/root/`](templates/root/) | Maintenance templates (`index.html`, `maintenance.html`) |
| [`showcase/`](showcase/) | Generated portfolio tree (**run build after editing templates**) |
| [`assets/`](assets/) | Shared CSS, JS, icons, portrait (`css/style.css`, `js/script.js`) |
| [`scripts/build.mjs`](scripts/build.mjs) | Merge `.env` + emit HTML |

Strict maintenance-only bundle (publish folder root **without** exposing `/showcase/` URLs):

```bash
npm run build:dist-maintenance   # → dist/maintenance/
```

---

## Customization (`.env`)

Copy [`.env.example`](.env.example) → `.env`, adjust variables, then `npm run build`.

| Variable | Purpose |
|----------|---------|
| `SITE_TITLE`, `DISPLAY_NAME`, `PROFILE_TITLE`, `PROFILE_IMAGE_ALT` | Showcase branding |
| `PUBLIC_EMAIL`, `PUBLIC_EMAIL_VISIBLE`, `PUBLIC_EMAIL_LABEL`, `LOCATION_LABEL` | Optional contact rows |
| `LINKEDIN_URL`, `GITHUB_PROFILE_URL` | Optional social icons |
| `MAINT_*` | Maintenance page copy (`MAINT_BODY_1` is plain text) |

Reserved / documented-only until wired into templates: `HOMELAB_REPO_URL`, `TRYHACKME_PROFILE_URL`, `SITE_CANONICAL_ORIGIN`, `ABOUT_HTML`.

The downloadable resume PDF and similar attachments were **removed** by design; re-add only through your own assets if you fork.

---

## GitHub Pages

- [`CNAME`](CNAME) ties GitHub Pages to your **custom hostname** ([documentation](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)).
- Publishing **the whole repository** serves `/` (maintenance) and **still allows** `/showcase/…` if someone navigates there directly.
- To publish **only** the landing page, deploy **`dist/maintenance/`** as the site root.

---

## README screenshots

Capture images **after** the sanitized build so thumbnails match what visitors actually see—either `/` (maintenance) or `/showcase/` (portfolio demo).

---

## Credits

- Theme fork / inspiration: [codewithsadee/vcard-personal-portfolio](https://github.com/codewithsadee/vcard-personal-portfolio).
- Ionicons loaded from CDN on showcase pages.

---

## Cleanup notes (2026)

Portfolio defaults were scrubbed for a **public showcase**: identifying sidebar fields and risky outbound preview URLs were stripped from templates; navbar/filter JS got defensive guards and a tab-state bugfix. See `.env.example` if you want to layer personal links back in **locally** without committing secrets.

Audit lab screenshots under [`showcase/`](showcase/) for stray credentials or hostnames before you reuse them elsewhere.

---

## When replacing this site (e.g. Next.js)

Remove [`maintenance.html`](maintenance.html), replace root [`index.html`](index.html), and drop maintenance-specific npm scripts once the new deployment owns the domain.
