# THE MONOLITH — Personal Blog

A markdown-powered personal blog and job-search portfolio for **Syed Amir Kafi**:
data analytics, business analysis, operations, and design. Built as part of his
German job search — includes an ATS-friendly PDF CV, SEO metadata, and a themed
blog archive.

Live: **https://syedamirkafi.github.io/the-monolith/**

## Stack

- Vite + React + React Router (v8, `react-router` package)
- Tailwind CSS v4 (design system in `src/index.css`)
- Markdown posts (`content/posts/*.md`) parsed with gray-matter + react-markdown
- `rehype-highlight` for syntax highlighting, `puppeteer-core` (dev) for
  generating `public/cv/*.pdf` and `public/og.png` against the installed Edge
- No database, no build-time server

## Run

```bash
npm install
npm run dev      # local dev
npm run build    # production build (outputs to dist/ + dist/404.html)
npm run preview  # preview the production build
```

> Note: `npm run preview` (vite preview) has a quirk — it returns 404 for asset
> requests carrying a `Sec-Fetch-Dest: script` header, so the SPA never renders
> there. Verify the built site with a real static server instead (e.g.
> `npx serve -s dist`).

## Scripts

| Script | What it does |
| --- | --- |
| `npm run build` | `vite build` then `scripts/postbuild.mjs` (copies `dist/index.html` → `dist/404.html` for SPA deep-link fallback) |
| `npm run build:cv` | `scripts/build-cv.mjs` — renders `scripts/cv.html` via Edge (puppeteer-core) to `public/cv/SyedAmirKafi_CV.pdf` (A4, ATS-friendly) |
| `npm run build:og` | `scripts/build-og.mjs` — renders `scripts/og.html` to `public/og.png` (1200×630 social card) |

## Content

### Posts

Add a post by dropping a markdown file into `content/posts/`. Frontmatter:

```yaml
---
title: "..."
date: "2026-07-20"
category: ANALYTICS          # legacy filter group
section: career              # tab: all | career | academia | tech | photo | stories
style: terminal              # tech posts only: browser | terminal | console | device
tags: [sql, tableau, kpi]
excerpt: "..."
cover: "#0077B6"             # tile color for the card
coverImage: "/photos/....svg" # optional lead image on the post page
featured: true
status: shipped              # in-progress | shipped (projects page badge)
order: 1                     # sort order (lower = first)
stats:                       # optional, used by career cards / metrics
  - value: "+18%"
    label: "territory sales growth"
---
```

Posts sort by `order`, then date. Section groups feed the merged Projects page
(`src/pages/Projects.jsx`): career (result-first rows with `stats`), academia
(indexed rows), tech (frame components per `style`), photo (masonry from
`src/data/photos.js`), stories (timeline). The `style` field picks a
Browser/Terminal/Console/Device frame in `src/sections/TechSection.jsx`. Posts
with `status: in-progress` surface under "In Progress" on the Projects page.

### Photos

Photo gallery entries live in `src/data/photos.js` and the images in
`public/photos/`. Replace the `placeholder-*.svg` files with real images
(matching filenames or update the array).

### Site data

- `src/data/profile.js` — name, contact, bio, coordinates, CV link
- `src/data/skills.js` — skills grid groups
- `src/data/portfolio.js` — project cards with `status` (in-progress/shipped)
- `src/data/timeline.js` — experience, education, certifications
- `src/data/wins.js` — "The Wins" metric cards with stories and source posts

### CV

`public/cv/SyedAmirKafi_CV.pdf` is the ATS PDF (regenerate with
`npm run build:cv`). Update `cvUrl` in `src/data/profile.js` if it moves.

## Pages

- `/` Home — hero with animated role rotator, wins teaser, latest posts,
  toolbox, contact
- `/projects` — merged page: IN PROGRESS + SHIPPED groups, portfolio cards,
  then career/academia/tech/stories/photo sections, search + tag chips
- `/wins` — "The Wins" — measured outcomes as cards with story + source post
- `/blog/:slug` — post with cover image, MIN READ badge, share buttons, related
  reads, prev/next, contact CTA, syntax highlighting
- `/about` — full profile: bio, skills, experience, education, certs, contact
- anything else — styled 404 page

Every page sets a document title via `src/lib/useDocumentTitle.js`.

## Day / night mode

Theme is stored in `localStorage` under `monolith-theme`; the toggle lives in
the header (`src/components/ThemeToggle.jsx`) and defaults to the OS
`prefers-color-scheme`. The `dark` class on `<html>` flips the `--surface` /
`--text` variables in `src/index.css`; pastel accents (`--color-pastel-*`) and
glass utilities (`.glass-card`, `.glass-dark`, `.pastel-blob`) keep the look
consistent in both modes.

## Deploy (GitHub Pages)

The repo uses a two-branch setup: `main` = source, `gh-pages` = built site.

```bash
npm run build                                   # with default base "/"
# or for the project-page subpath:
# $env:BASE_PATH="/the-monolith"; npm run build
node scripts/postbuild.mjs                      # already run by build
# publish dist/ to the gh-pages branch (e.g. gh-pages CLI, git subtree, or copy)
```

SPA deep links (`/blog/:slug`) work because `404.html` serves the app shell —
GitHub Pages returns it with HTTP 404 while the router renders the correct view.
