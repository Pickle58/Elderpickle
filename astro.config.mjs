// @ts-check

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// Cloud Run / custom domain: pass SITE at image build time so canonicals and
// the sitemap use the real origin instead of the placeholder below.
// Example: docker build --build-arg SITE=https://your-domain.com -t elderpickle .
const site = process.env.SITE ?? "https://example.com";

// https://astro.build/config
export default defineConfig({
  site,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
});
