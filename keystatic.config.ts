import { collection, config, fields } from "@keystatic/core";

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
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        pubDate: fields.date({
          label: "Publish date",
        }),
        cover: fields.image({
          label: "Cover",
          directory: "src/content/blog",
          publicPath: "./",
        }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "src/content/blog",
              publicPath: "./",
            },
          },
        }),
      },
    }),
  },
});
