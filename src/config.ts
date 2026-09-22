export const siteConfig = {
  name: "Elderpickle",
  description:
    "Elderpickle is a dark, blue-and-orange Astro site with a video hero, about page, and blog.",
  // Override at image build time: docker build --build-arg SITE=https://your-domain.com
  // Or locally: SITE=https://your-domain.com npm run build
  url: "https://example.com",
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
  ],
  /**
   * Hero video path under public/. For very large files, host on Cloud Storage
   * and set this to the full HTTPS URL instead of baking the MP4 into the image.
   */
  heroVideo: "/video/hero.mp4",
  heroPoster: "/video/hero-poster.svg",
} as const;
