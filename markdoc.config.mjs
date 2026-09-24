import { component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  nodes: {
    document: {
      ...nodes.document,
      render: null,
    },
    image: {
      ...nodes.image,
      render: component("./src/components/MarkdocImage.astro"),
    },
  },
});
