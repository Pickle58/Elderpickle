// @ts-check

import markdoc from "@astrojs/markdoc";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// Cloud Run / custom domain: pass SITE at image build time so canonicals and
// the sitemap use the real origin instead of the placeholder below.
// Example: docker build --build-arg SITE=https://your-domain.com -t elderpickle .
const site = process.env.SITE ?? "https://example.com";

// Keystatic injects server routes. Load it only for `astro dev` so `astro build`
// stays fully static and the Caddy image does not need a Node adapter.
const isDevServer = process.argv.includes("dev");

// https://astro.build/config
export default defineConfig({
  site,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    markdoc(),
    sitemap(),
    ...(isDevServer ? [keystatic()] : []),
  ],
});
