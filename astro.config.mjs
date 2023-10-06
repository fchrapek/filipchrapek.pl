import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";
import { strings } from "./src/content/content.js";

// https://astro.build/config
export default defineConfig({
  site: "https://filipchrapek.pl/",
  // replace this with your deployed domain
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
    mdx({
      extendMarkdownConfig: true,
      optimize: true,
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkReadingTime,
      [remarkToc, { heading: `${strings.blogPost.tableOfContents}` }],
      [
        remarkCollapse,
        { test: `${strings.blogPost.tableOfContents}`, summary: `${strings.blogPost.openTableOfContents}` },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
