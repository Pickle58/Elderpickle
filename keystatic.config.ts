import { collection, config, fields } from "@keystatic/core";

// Paths are relative to each post in src/content/blog so Astro's image() helper can import them.
const imageDirectory = "src/assets/images/blog";
const imagePublicPath = "../../assets/images/blog/";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    blog: collection({
      label: "Blog",
      slugField: "title",
      path: "src/content/blog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        pubDate: fields.date({ label: "Publish date" }),
        cover: fields.image({
          label: "Cover",
          directory: imageDirectory,
          publicPath: imagePublicPath,
        }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: imageDirectory,
              publicPath: imagePublicPath,
            },
          },
        }),
      },
    }),
  },
});
