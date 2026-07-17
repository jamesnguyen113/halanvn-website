// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { priceListUpdated } from './src/data/prices';
import { hoaSenReference } from './src/data/hoa-sen-reference';

/** '10/07/2026' → '2026-07-10' */
const toIso = (/** @type {string} */ vn) => vn.split('/').reverse().join('-');

// lastmod chỉ đặt cho các trang có ngày dữ liệu thật — trang giá theo
// priceListUpdated, /ton-hoa-sen/ theo watcher Hoa Sen chạy hằng ngày.
const lastmodByPath = {
  '/bang-gia/': toIso(priceListUpdated),
  '/bang-gia/ton-lop/': toIso(priceListUpdated),
  '/bang-gia/xa-go/': toIso(priceListUpdated),
  '/ton-dong-a/': toIso(priceListUpdated),
  '/ton-hoa-sen/': toIso(hoaSenReference.updated),
};

export default defineConfig({
  site: 'https://halanvn.com',
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
  integrations: [
    sitemap({
      serialize(item) {
        const lastmod = lastmodByPath[new URL(item.url).pathname];
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
