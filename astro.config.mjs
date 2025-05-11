import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config.js";
import mdx from '@astrojs/mdx';


// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [react(), sitemap({
    filter: page => SITE.showArchives || !page.endsWith("/archives"),
  }), mdx()],
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
