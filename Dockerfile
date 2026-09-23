# syntax=docker/dockerfile:1

# Multi-stage static site for a GCE VM with Caddy (ports 80/443 + TLS).

FROM node:22-alpine AS build
WORKDIR /app

# Public site origin baked into sitemap + canonical URLs at build time.
# Example: docker build --build-arg SITE=https://your.domain -t elderpickle .
ARG SITE=https://example.com
ENV SITE=$SITE

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM caddy:2-alpine AS runtime

# Hostname Caddy uses for HTTPS (Let's Encrypt).
# Example: -e SITE_ADDRESS=your.domain
ENV SITE_ADDRESS=localhost

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv

EXPOSE 80 443

# GCE VM deploy:
#   docker build --build-arg SITE=https://your.domain -t elderpickle .
#   docker run -d --restart unless-stopped -p 80:80 -p 443:443 \
#     -e SITE_ADDRESS=your.domain \
#     -v caddy_data:/data \
#     --name elderpickle elderpickle
# Point the domain A/AAAA record at the VM; open VPC firewall for tcp/80 and tcp/443.
# Certs live in /data — mount a volume so renewals survive restarts.
