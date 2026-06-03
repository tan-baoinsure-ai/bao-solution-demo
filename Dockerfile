FROM nginx:stable-alpine

# Landing page
COPY index.html /usr/share/nginx/html/index.html

# ── Project dist folders ───────────────────────────────────────────────────
# Static HTML projects: copy folder directly.
# Vite apps: uncomment dist variant after building.

COPY em-tho/      /usr/share/nginx/html/em-tho
COPY banh-barber/ /usr/share/nginx/html/banh-barber

# COPY em-tho/dist      /usr/share/nginx/html/em-tho
# COPY banh-barber/dist /usr/share/nginx/html/banh-barber

# New project: COPY <name>/dist /usr/share/nginx/html/<name>

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
