# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

`bao-demo` is a single-host nginx portal serving multiple independent React/Vite demo apps under `bao.demo.vn`. Each app is accessible at its own context path (e.g. `/em-tho`, `/banh-barber`). The root path serves a plain-HTML landing page.

## Architecture

```
bao-demo/
├── index.html        # Landing page (plain HTML, no framework)
├── nginx.conf        # Context-path routing — one location block per app
├── Dockerfile        # nginx:stable-alpine; each app's dist is COPY'd in
└── Makefile          # docker-build / docker-run shortcuts
```

Each app lives in its own folder at the root (e.g. `em-tho/`) and is built independently before being included in the Docker image.

## Commands

```bash
make docker-build     # Build the production Docker image (bao-demo:latest)
make docker-run       # Run locally at http://localhost:8080
```

## Adding a New App — Required Steps (do all four or it breaks)

1. **Vite config** — set `base: '/project-name/'` (trailing slash required)
2. **TanStack Router** — set `basepath: '/project-name'` in `createRouter()` (no trailing slash)
3. **Dockerfile** — uncomment/add the COPY line for the app's dist folder
4. **nginx.conf** — add a `location ^~ /project-name` block (copy the template comment)
5. **index.html** — add a card link for the landing page

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
