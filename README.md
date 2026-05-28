# qianjin825.github.io

Personal academic portfolio for Jin Qian.

Live at: https://qianjin825.github.io

## Stack

- React 19 + Vite + TypeScript + Tailwind CSS v4
- React Router (BrowserRouter + 404.html SPA fallback)
- `react-markdown` + `remark-gfm` + `gray-matter` for project detail pages
- ORCID public API → `src/data/publications.json` (build-time, refreshed daily by GitHub Actions)

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build + preview

```bash
npm run build      # runs prebuild (ORCID fetch) → vite build → dist/
npm run preview    # serves dist/ locally
```

## Content

- Hand-edited JSON: `src/data/profile.json`, `src/data/projects.json`, `src/data/cv.json`
- Hand-written markdown: `src/content/projects/<slug>.md` (frontmatter: title, date, tags, summary)
- Generated: `src/data/publications.json` (do not hand-edit; rebuilt by `npm run prebuild`)
- CV PDF: `public/cv.pdf`
- Favicon: `public/favicon.svg`

## Environment

Copy `.env.example` to `.env.local` and set `ORCID_ID` if you want to override the value baked into `profile.json`.

## Deploy

Push to `main`. GitHub Actions builds and deploys to GitHub Pages. A daily cron at 04:00 UTC rebuilds to pick up new ORCID publications.
