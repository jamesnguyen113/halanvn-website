// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://halanvn.com',
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
