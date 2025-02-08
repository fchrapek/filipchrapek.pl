import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import mdx from '@astrojs/mdx';

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [react(), sitemap({
    filter: page => SITE.showArchives || !page.endsWith("/archives"),
  }), mdx(), db()],
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});