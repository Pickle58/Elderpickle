# syntax=docker/dockerfile:1

# Multi-stage static site for Cloud Run.
# The final image must listen on 0.0.0.0:$PORT (Cloud Run injects PORT).

FROM node:22-alpine AS build
WORKDIR /app

# Public site origin baked into sitemap + canonical URLs at build time.
# Example: docker build --build-arg SITE=https://your-domain.com -t elderpickle .
ARG SITE=https://example.com
ENV SITE=$SITE

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime

# Cloud Run sets PORT; default locally to 8080.
ENV PORT=8080

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

# nginx image runs envsubst on /etc/nginx/templates/*.template using $PORT.
EXPOSE 8080

# Example deploy:
#   gcloud run deploy elderpickle --source . --region us-central1 --allow-unauthenticated
