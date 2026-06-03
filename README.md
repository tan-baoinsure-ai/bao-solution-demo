# bao-demo

A single-host nginx portal serving multiple independent demo apps under `bao.demo.vn`. Each app is routed by context path — `/em-tho`, `/banh-barber`, etc. The root `bao.demo.vn/` serves a landing page listing all live demos.

---

## Table of Contents

1. [Architecture](#architecture)
2. [Prerequisites](#prerequisites)
3. [Run locally](#run-locally)
4. [Add a new project](#add-a-new-project)
5. [Deploy to bao.demo.vn](#deploy-to-baodemoᵛn)
6. [Troubleshooting](#troubleshooting)

---

## Architecture

```
bao.demo.vn/
├── /                 → index.html (landing page — plain HTML)
├── /em-tho/          → em-tho/ (static HTML + CSS + image)
├── /banh-barber/     → banh-barber/ (static HTML + CSS + image)
├── /bhuda/           → bhuda/ (React 18 via CDN + Babel in-browser, no build)
└── /health           → 200 ok  (nginx health check)
```

All apps are served by a single **nginx:stable-alpine** container. There are two app types:

- **Static HTML** — folder is copied directly into the image; no build step needed.
- **Vite SPA** — must be built with `pnpm build` first; only the `dist/` folder goes into the image.

Key files:

| File | Purpose |
|------|---------|
| `nginx.conf` | Context-path routing — one `location` block per app |
| `Dockerfile` | Copies each app folder (or dist/) into the image |
| `index.html` | Landing page listing all demos |
| `Makefile` | `docker-build` / `docker-run` shortcuts |

### Live projects

| Path | Folder type | Tech |
|------|-------------|------|
| `/em-tho` | Static HTML | Plain HTML/CSS |
| `/banh-barber` | Static HTML | Plain HTML/CSS |
| `/bhuda` | Static HTML | React 18 CDN + Babel standalone |

---

## Prerequisites

- Docker Desktop (or Docker Engine on Linux)
- Node.js ≥ 24 + pnpm ≥ 9 *(only needed when developing individual apps)*
- `make` *(standard on macOS/Linux; use `winget install GnuWin32.Make` on Windows)*

---

## Run locally

```bash
# 1. Build individual apps first (if any exist)
# cd em-tho && pnpm build && cd ..

# 2. Build the Docker image
make docker-build

# 3. Run at http://localhost:8080
make docker-run
```

The landing page opens at `http://localhost:8080/`. The health check is at `http://localhost:8080/health`.

---

## Add a new project

Follow **all five steps** — skipping any one will cause broken routes or missing assets.

### Step 1 — Create the app

Scaffold a new Vite + React + TanStack Router project inside the repo root:

```bash
mkdir <project-name>
cd <project-name>
pnpm create vite . --template react-ts
pnpm install
pnpm add @tanstack/react-router @tanstack/react-query
```

### Step 2 — Set the Vite base path

In `<project-name>/vite.config.ts`, add `base`:

```ts
export default defineConfig({
  base: '/<project-name>/',   // trailing slash required
  // ... rest of config
})
```

> **Why:** Without this, Vite generates asset URLs like `/assets/main.js`. With it, they become `/<project-name>/assets/main.js`, which nginx can route correctly.

### Step 3 — Set the TanStack Router basepath

In `<project-name>/src/router.tsx` (or wherever you call `createRouter`):

```ts
export const router = createRouter({
  routeTree,
  basepath: '/<project-name>',   // no trailing slash
})
```

> **Why:** The router strips this prefix before matching routes. Without it, all routes 404 because the router sees `/<project-name>/about` instead of `/about`.

### Step 4 — Update the Dockerfile

Uncomment/add the COPY line for your app's dist folder:

```dockerfile
COPY <project-name>/dist /usr/share/nginx/html/<project-name>
```

> **Why:** The dist folder must be present inside the Docker image. If the COPY line is missing, nginx returns 404 for every request to that path.

### Step 5 — Update nginx.conf

Copy the template block at the bottom of `nginx.conf` and fill in the slug:

```nginx
location ^~ /<project-name> {
    alias /usr/share/nginx/html/<project-name>;

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    try_files $uri $uri/ /<project-name>/index.html;
}
```

> **Why `alias` and not `root`:** `root` appends the full URI to the base path. For a location matching `/em-tho`, a request for `/em-tho/assets/main.js` with `root /usr/share/nginx/html` would look for `/usr/share/nginx/html/em-tho/assets/main.js` — but nginx constructs the path as `root + URI`, which becomes `/usr/share/nginx/html/em-tho/assets/main.js` only when root is `/usr/share/nginx/html`. However, if you try to use `root /usr/share/nginx/html/em-tho` you get `/usr/share/nginx/html/em-tho/em-tho/assets/main.js` (doubled segment). `alias` replaces the matched prefix, so it always resolves correctly.
>
> **Why `^~`:** Prevents nginx regex location blocks (the asset cache headers block) from winning over the SPA fallback `try_files`.

### Step 6 — Add a card to index.html

Open `index.html` and add an `<a class="card">` entry inside `.grid`:

```html
<a class="card" href="/<project-name>/">
  <span class="card-name">Project Display Name</span>
  <span class="card-path">/<project-name></span>
  <span class="card-desc">Short description</span>
</a>
```

### Verify

```bash
cd <project-name> && pnpm build && cd ..
make docker-build
make docker-run
# Open http://localhost:8080/<project-name>/
# Refresh on a sub-route to confirm SPA fallback works
```

---

## Deploy to bao.demo.vn

The server runs a single Docker container. Deploy manually via SSH:

```bash
# 1. Build and tag the image locally
make docker-build
docker tag bao-demo:latest <your-registry>/bao-demo:latest
docker push <your-registry>/bao-demo:latest

# 2. SSH into the VPS
ssh user@bao.demo.vn

# 3. Pull and restart
docker pull <your-registry>/bao-demo:latest
docker stop bao-demo || true
docker rm bao-demo || true
docker run -d \
  --name bao-demo \
  --restart always \
  -p 80:80 \
  <your-registry>/bao-demo:latest
```

Alternatively, if you build directly on the VPS:

```bash
# On the VPS — after syncing files (git pull / rsync)
make docker-build
docker stop bao-demo || true
docker rm bao-demo || true
docker run -d --name bao-demo --restart always -p 80:80 bao-demo:latest
```

Verify the deploy: `curl https://bao.demo.vn/health` should return `ok`.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Assets return 404 for an app | `alias` → `root` mistake in nginx.conf, or wrong Vite `base` | Verify `alias` in the location block; verify `base: '/<slug>/'` in vite.config.ts |
| App refreshing on sub-route gives 404 | Missing or wrong `try_files` fallback | Ensure `try_files $uri $uri/ /<slug>/index.html;` is present |
| Router shows blank / all routes 404 | Missing `basepath` in TanStack Router | Add `basepath: '/<slug>'` to `createRouter()` |
| App not visible after deploy | Forgot to add COPY line in Dockerfile | Uncomment/add `COPY <slug>/dist /usr/share/nginx/html/<slug>` |
| nginx won't start | Config syntax error | Run `docker run --rm nginx:stable-alpine nginx -t -c /path/to/nginx.conf` to validate |
| Landing page missing a card | index.html not updated | Add `<a class="card">` entry to the `.grid` div |
