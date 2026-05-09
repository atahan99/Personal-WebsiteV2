#!/usr/bin/env node
/**
 * Static HTML token build: reads templates/, applies optional IF_* blocks and {{TOKENS}}.
 * Writes showcase/, root index.html, maintenance.html; optionally emits dist/maintenance/.
 */
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const defaults = {
  SITE_TITLE: "Portfolio showcase",
  DISPLAY_NAME: "Portfolio",
  PROFILE_TITLE: "Network & Security Engineer",
  PROFILE_IMAGE_ALT: "Portfolio avatar",
  PUBLIC_EMAIL: "",
  PUBLIC_EMAIL_VISIBLE: "",
  PUBLIC_EMAIL_LABEL: "Email",
  LOCATION_LABEL: "",
  LINKEDIN_URL: "",
  GITHUB_PROFILE_URL: "",
  MAINT_SITE_TITLE: "Site maintenance",
  MAINT_DISPLAY_NAME: "Maintenance",
  MAINT_PROFILE_TITLE: "Updates in progress",
  MAINT_AVATAR_ALT: "",
  MAINT_STATUS_TEXT:
    "Public portfolio code lives in this repository; the live domain is temporarily parked here.",
  MAINT_ARTICLE_TITLE: "We will be back soon",
  MAINT_BODY_1:
    "This domain is in maintenance mode while a newer site is prepared. Thank you for your patience.",
  MAINT_BODY_2:
    "The archived static showcase for lab-style projects is kept in the repository under the <code>showcase/</code> folder and is not linked from this landing page by default.",
};

/** @returns {Record<string, string>} */
function mergedEnv() {
  const out = { ...defaults };
  for (const key of Object.keys(defaults)) {
    const v = process.env[key];
    if (v !== undefined) out[key] = v;
  }
  if (!String(out.PUBLIC_EMAIL_VISIBLE || "").trim() && out.PUBLIC_EMAIL) {
    out.PUBLIC_EMAIL_VISIBLE = out.PUBLIC_EMAIL;
  }
  return out;
}

const SIDEBAR_SNIPPET = `
        <ul class="contacts-list">
<!-- IF_PUBLIC_EMAIL -->
          <li class="contact-item">

            <div class="icon-box">
              <ion-icon name="mail-outline"></ion-icon>
            </div>

            <div class="contact-info">
              <p class="contact-title">{{PUBLIC_EMAIL_LABEL}}</p>

              <a href="mailto:{{PUBLIC_EMAIL}}" class="contact-link">{{PUBLIC_EMAIL_VISIBLE}}</a>
            </div>

          </li>

<!-- ENDIF_PUBLIC_EMAIL -->
<!-- IF_LOCATION_LABEL -->
          <li class="contact-item">

            <div class="icon-box">
              <ion-icon name="location-outline"></ion-icon>
            </div>

            <div class="contact-info">
              <p class="contact-title">Location</p>

              <address>{{LOCATION_LABEL}}</address>
            </div>

          </li>

<!-- ENDIF_LOCATION_LABEL -->
        </ul>

        <div class="separator"></div>

        <ul class="social-list">
<!-- IF_LINKEDIN_URL -->
          <li class="social-item">
            <a href="{{LINKEDIN_URL}}" class="social-link" rel="me noopener noreferrer">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>

<!-- ENDIF_LINKEDIN_URL -->
<!-- IF_GITHUB_PROFILE_URL -->
          <li class="social-item">
            <a href="{{GITHUB_PROFILE_URL}}" class="social-link" rel="noopener noreferrer">
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </li>

<!-- ENDIF_GITHUB_PROFILE_URL -->
        </ul>
`.trim();

const SIDEBAR_EMPTY_REGEX =
  /<ul class="contacts-list">\s*<\/ul>\s*<div class="separator"><\/div>\s*<ul class="social-list">\s*<\/ul>/s;

/** @param {string} html */
/** @param {Record<string, string>} env */
function applyConditionals(html, env) {
  const flags = {
    PUBLIC_EMAIL: Boolean(env.PUBLIC_EMAIL?.trim()),
    LOCATION_LABEL: Boolean(env.LOCATION_LABEL?.trim()),
    LINKEDIN_URL: Boolean(env.LINKEDIN_URL?.trim()),
    GITHUB_PROFILE_URL: Boolean(env.GITHUB_PROFILE_URL?.trim()),
  };

  for (const [name, ok] of Object.entries(flags)) {
    const re = new RegExp(
      `<!-- IF_${name} -->([\\s\\S]*?)<!-- ENDIF_${name} -->`,
      "g",
    );
    html = html.replace(re, ok ? "$1" : "");
  }
  return html;
}

/** @param {string} html */
/** @param {Record<string, string>} env */
function replaceTokens(html, env) {
  return html.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in env)) {
      throw new Error(`Unknown template token: {{${key}}}`);
    }
    return env[key] ?? "";
  });
}

/** @param {string} relFromRoot */
async function writeProcessedHtml(relFromRoot, raw, env, opts) {
  let html = raw;
  if (opts.injectSidebar) {
    html = html.replace(SIDEBAR_EMPTY_REGEX, SIDEBAR_SNIPPET);
  }
  html = applyConditionals(html, env);
  html = replaceTokens(html, env);
  const outPath = path.join(ROOT, relFromRoot);
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, html, "utf8");
}

async function walk(dir) {
  /** @type {string[]} */
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

async function copyMaintenanceDist(maintenanceHtml) {
  const distRoot = path.join(ROOT, "dist", "maintenance");
  await fs.mkdir(distRoot, { recursive: true });
  await fs.writeFile(path.join(distRoot, "index.html"), maintenanceHtml, "utf8");
  await fs.cp(path.join(ROOT, "assets"), path.join(distRoot, "assets"), {
    recursive: true,
  });
  try {
    await fs.copyFile(
      path.join(ROOT, "CNAME"),
      path.join(distRoot, "CNAME"),
    );
  } catch {
    // optional
  }
}

async function main() {
  const distMaintenance = process.argv.includes("--dist-maintenance");

  const showcaseEnv = mergedEnv();
  const maintEnv = mergedEnv();

  const tmplShowcase = path.join(ROOT, "templates", "showcase");
  const files = (await walk(tmplShowcase)).filter((f) => f.endsWith(".html"));

  for (const abs of files) {
    const rel = path.relative(tmplShowcase, abs);
    const raw = await fs.readFile(abs, "utf8");
    await writeProcessedHtml(path.join("showcase", rel), raw, showcaseEnv, {
      injectSidebar: true,
    });
  }

  const rootIndexTpl = path.join(
    ROOT,
    "templates",
    "root",
    "index.html.template",
  );
  const maintTpl = path.join(
    ROOT,
    "templates",
    "root",
    "maintenance.html.template",
  );

  let rawRoot = await fs.readFile(rootIndexTpl, "utf8");
  rawRoot = replaceTokens(applyConditionals(rawRoot, maintEnv), maintEnv);
  await fs.writeFile(path.join(ROOT, "index.html"), rawRoot, "utf8");

  let rawMaint = await fs.readFile(maintTpl, "utf8");
  rawMaint = replaceTokens(applyConditionals(rawMaint, maintEnv), maintEnv);
  await fs.writeFile(path.join(ROOT, "maintenance.html"), rawMaint, "utf8");

  if (distMaintenance) {
    await copyMaintenanceDist(rawRoot);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
