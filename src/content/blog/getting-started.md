---
title: Getting started
description: How to run Elderpickle locally, customize content, and prepare a Docker deploy.
pubDate: 2026-09-15
---

## Local development

```bash
npm install
npm run dev
```

Open the URL printed in the terminal. Pages live under `src/pages`; blog posts are Markdown in `src/content/blog`.

## Hero video

Encode before commit:

- H.264, `yuv420p`, no audio
- `-movflags +faststart`
- max 1920px wide, CRF around 28

Place the file at `public/video/hero.mp4`. If it is missing, the poster still shows.

## Deploy

Build the Docker image with your public origin:

```bash
docker build --build-arg SITE=https://your-domain.com -t elderpickle .
gcloud run deploy elderpickle --source . --region us-central1 --allow-unauthenticated
```
