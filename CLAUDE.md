# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

`bao-demo` is a single-host nginx portal serving multiple independent demo apps under `bao.demo.vn`. Each app is accessible at its own context path. The root path serves a plain-HTML landing page listing all live demos.

## Architecture

```
bao-demo/
├── index.html        # Landing page (plain HTML, no framework)
├── nginx.conf        # Context-path routing — one location block per app
├── Dockerfile        # nginx:stable-alpine; each app folder is COPY'd in
├── Makefile          # docker-build / docker-run shortcuts
├── em-tho/           # Static HTML — plain HTML + CSS + image
├── banh-barber/      # Static HTML — plain HTML + CSS + image
└── bhuda/            # Static HTML — React via CDN + Babel in-browser (no build step)
```

## Live Projects

| Path | Type | Notes |
|------|------|-------|
| `/em-tho` | Static HTML | Plain HTML/CSS, image: `MER-87.jpg` |
| `/banh-barber` | Static HTML | Plain HTML/CSS, image: `MER-187.jpg` |
| `/bhuda` | React via CDN | React 18 + Babel standalone, no build needed. Budha&Co vegan restaurant (Sydney). Files: `data.js`, `ui.jsx`, `sections1.jsx`, `sections2.jsx`, `shop.jsx`, `styles.css`, `layout.css` |

## Two App Types

**Static HTML** (em-tho, banh-barber, bhuda): copy folder directly — no build step.

**Vite SPA** (future): must run `pnpm build` first; Dockerfile copies `dist/` not the source folder.

## Commands

```bash
make docker-build     # Build the production Docker image (bao-demo:latest)
make docker-run       # Run locally at http://localhost:8080
```

## Adding a New App — Required Steps

### Static HTML app (no build step)
1. **Dockerfile** — add `COPY <name>/ /usr/share/nginx/html/<name>`
2. **nginx.conf** — add a `location ^~ /<name>` block (copy existing block)
3. **index.html** — add a card link in `.grid`

### Vite SPA
1. **Vite config** — set `base: '/project-name/'` (trailing slash required)
2. **TanStack Router** — set `basepath: '/project-name'` in `createRouter()` (no trailing slash)
3. **Dockerfile** — add `COPY <name>/dist /usr/share/nginx/html/<name>`
4. **nginx.conf** — add a `location ^~ /<name>` block
5. **index.html** — add a card link in `.grid`

## Critical nginx Gotchas

- Always use `alias` (not `root`) for app location blocks. Using `root` doubles the path segment, causing asset 404s (`/html/em-tho/em-tho/...`).
- Always use `^~` prefix modifier on location blocks so nginx doesn't let regex locations override the SPA `try_files` fallback.
- The `try_files` SPA fallback must reference the app-specific `index.html` (e.g. `/em-tho/index.html`), not the root one.

## Deployment

Manual deploy to VPS running Docker:

```bash
# On the VPS
docker pull <registry>/bao-demo:latest   # or scp/build directly on VPS
docker stop bao-demo || true
docker run -d --name bao-demo --restart always -p 80:80 bao-demo:latest
```

See `README.md` for the full onboarding runbook.
