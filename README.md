# THE MONOLITH — Personal Blog

A markdown-powered personal blog and job-search portfolio for **Syed Amir Kafi**:
data analytics, business analysis, operations, and design.

## Stack

- Vite + React + React Router
- Tailwind CSS v4 (design system in `src/index.css`)
- Markdown posts (`content/posts/*.md`) parsed with gray-matter + react-markdown
- No database, no build-time server

## Run

```bash
npm install
npm run dev      # local dev
npm run build    # production build (outputs to dist/)
npm run preview  # preview the production build
```

## Content

### Posts

Add a post by dropping a markdown file into `content/posts/`. Frontmatter:

```yaml
---
title: "..."
date: "2026-07-20"
category: ANALYTICS          # one of the categories shown in the blog filter
tags: [sql, tableau, kpi]
excerpt: "..."
cover: "#0077B6"             # tile color for the card
featured: true
order: 1                     # sort order (lower = first)
---
```

Categories are auto-derived from posts. Posts sort by `order`, then date.

### Site data

- `src/data/profile.js` — name, contact, bio, coordinates, CV link
- `src/data/skills.js` — skills grid groups
- `src/data/portfolio.js` — "The Work" cards
- `src/data/timeline.js` — experience, education, certifications

### CV

`public/cv/SyedAmirKafi_CV.md` is the live markdown CV served by the CV button.
To serve an ATS PDF instead: put `SyedAmirKafi_CV.pdf` in `public/cv/` and update
`cvUrl` in `src/data/profile.js`.

## Pages

- `/` Home — hero, latest posts, toolbox, work gallery, bio, contact
- `/blog` — archive with category filters
- `/blog/:slug` — post with reading progress bar, tags, prev/next, contact CTA
- `/work` — portfolio cards
- `/about` — full profile: bio, skills, experience, education, certs, contact
- `/now` — current work / study / learning / language status

## Deploy

Pure static output — drop `dist/` on any static host (Vercel, Netlify, GitHub
Pages). Remember the SPA fallback (`/blog/:slug` → `index.html`).
