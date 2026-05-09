# Personal website (archived static showcase)

Historical **HTML/CSS/JS** portfolio. The repository is sanitized for public hosting: **no email, resume PDF, location, or social links are embedded by default** (they can be reintroduced locally via `.env` + `npm run build`).

**Live domain note:** `index.html` at the repository root is a **maintenance landing page**. The full multi-page showcase lives under [`showcase/`](showcase/).

---

## Screenshots for this README

Capture screenshots **after** the PII cleanup (i.e. now): use either the maintenance page (`/`) or open [`showcase/index.html`](showcase/index.html) locally (`npm run build` first if you edited templates). That avoids leaking old contact details into images.

---

## Fork / theme credit

Based on [codewithsadee/vcard-personal-portfolio](https://github.com/codewithsadee/vcard-personal-portfolio).

---

## Environment variables (`.env.example`)

Copy [`.env.example`](.env.example) to `.env` and run `npm run build`. Empty optional fields remove the matching sidebar blocks.

| Variable | Used for |
|----------|-----------|
| `SITE_TITLE` | `<title>` on showcase pages |
| `DISPLAY_NAME` | Sidebar name / `title` attribute |
| `PROFILE_TITLE` | Sidebar subtitle |
| `PROFILE_IMAGE_ALT` | Avatar `alt` text |
| `PUBLIC_EMAIL` | Enables email row + `mailto:` |
| `PUBLIC_EMAIL_VISIBLE` | Link text (defaults to `PUBLIC_EMAIL` if unset) |
| `PUBLIC_EMAIL_LABEL` | “Email” column label |
| `LOCATION_LABEL` | Location row |
| `LINKEDIN_URL` | LinkedIn icon link |
| `GITHUB_PROFILE_URL` | GitHub icon link |
| `MAINT_SITE_TITLE` | Maintenance page `<title>` |
| `MAINT_DISPLAY_NAME` | Maintenance sidebar heading |
| `MAINT_PROFILE_TITLE` | Maintenance sidebar subtitle |
| `MAINT_AVATAR_ALT` | Maintenance avatar alt |
| `MAINT_STATUS_TEXT` | Maintenance status blurb |
| `MAINT_ARTICLE_TITLE` | Maintenance main heading |
| `MAINT_BODY_1` | Maintenance paragraph (plain text) |
| `MAINT_BODY_2` | Maintenance paragraph (may include HTML, e.g. `<code>`) |

Reserved for documentation / future templating (not substituted by [`scripts/build.mjs`](scripts/build.mjs) today): `HOMELAB_REPO_URL`, `TRYHACKME_PROFILE_URL`, `SITE_CANONICAL_ORIGIN`, `ABOUT_HTML`.

---

## Removed identifiers (do not re-commit)

These appeared in earlier revisions of the HTML and are **removed** from [`templates/`](templates/). Restore **only** in a private `.env` / local build if you need them again.

| Removed | If restoring locally |
|---------|----------------------|
| Legal name in titles / headings / avatar alt | `DISPLAY_NAME`, `PROFILE_IMAGE_ALT`, `SITE_TITLE` |
| Personal email + `mailto:` | `PUBLIC_EMAIL`, `PUBLIC_EMAIL_VISIBLE`, `PUBLIC_EMAIL_LABEL` |
| City / country | `LOCATION_LABEL` |
| LinkedIn profile URL | `LINKEDIN_URL` |
| GitHub profile URL | `GITHUB_PROFILE_URL` |
| Resume PDF + sidebar button | **Removed permanently** (no env) |
| Homelab repo URL in timeline | **Removed** — use `HOMELAB_REPO_URL` only after wiring templates |
| TryHackMe profile URL | **Removed** — use `TRYHACKME_PROFILE_URL` only after wiring templates |
| Legacy third-party preview hostname (expired / unsafe) | **Never restore** |
| Long first-person bio with school + location | Replaced with neutral copy in templates |

---

## Build

```bash
npm install
npm run build
```

- Reads [`templates/showcase/`](templates/showcase/) and writes [`showcase/`](showcase/).
- Writes root [`index.html`](index.html) and [`maintenance.html`](maintenance.html) from [`templates/root/`](templates/root/).

Maintenance bundle (single-site folder with `assets/` + `CNAME`):

```bash
npm run build:dist-maintenance
```

Output: [`dist/maintenance/`](dist/maintenance/) — suitable as the **only** published root if you want zero `/showcase/` URL exposure (e.g. upload that folder to GitHub Pages or an artifact branch).

---

## GitHub Pages

- [`CNAME`](CNAME) declares the custom hostname for GitHub Pages ([docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)).
- **Whole-repo publishing:** GitHub serves `/` from root `index.html` (maintenance) and still exposes `/showcase/…` if someone guesses the path.
- **Strict maintenance-only:** publish **`dist/maintenance/`** contents as the site root (manual upload, Actions, or `gh-pages` branch), so the showcase files are not online.

---

## Portrait image

[`assets/images/portrait.png`](assets/images/portrait.png) is an illustrative avatar (sourced from another repo **once** and vendored here so Pages does not depend on an external raw URL).

---

## Maintenance files when moving to Next.js

Delete [`maintenance.html`](maintenance.html), replace root [`index.html`](index.html), and remove maintenance-related npm scripts when the new site replaces this deployment.

---

## 2026 cleanup summary

- Removed embedded PII and unsafe expired preview links from templates.
- Added `.env`-driven optional sidebar blocks + maintenance copy via [`scripts/build.mjs`](scripts/build.mjs).
- Moved the multi-page portfolio under [`showcase/`](showcase/); root serves maintenance.
- Fixed navbar tab logic (loop shadowing) and hardened [`assets/js/script.js`](assets/js/script.js) for pages without portfolio widgets.
- Normalized “Back” navigation to `../index.html` inside [`showcase/pages/`](showcase/pages/).

---

## License / visuals

Audit [`showcase/`](showcase/) lab screenshots before publishing if any frame might contain credentials or hostnames from old environments.
