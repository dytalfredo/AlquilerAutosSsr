import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({

  integrations: [tailwind(), icon()],
  output: 'server',
  adapter: vercel()

});