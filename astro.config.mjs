// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { priceListUpdated } from './src/data/prices';
import { hoaSenReference } from './src/data/hoa-sen-reference';
import { purlinPricesUpdated } from './src/data/purlin';

/** '10/07/2026' → '2026-07-10' */
const toIso = (/** @type {string} */ vn) => vn.split('/').reverse().join('-');

// lastmod chỉ đặt cho các trang có ngày dữ liệu thật — trang giá theo
// priceListUpdated, /ton-hoa-sen/ theo watcher Hoa Sen chạy hằng ngày.
const lastmodByPath = {
  '/bang-gia/': toIso(priceListUpdated),
  '/bang-gia/ton-lop/': toIso(priceListUpdated),
  '/bang-gia/xa-go/': toIso(priceListUpdated),
  '/ton-hoa-sen/': toIso(hoaSenReference.updated),
};

/** cụm /ton-dong-a/* theo bảng giá; cụm /xa-go/* chỉ khi đã có giá xà gồ */
const lastmodOf = (/** @type {string} */ path) => {
  if (lastmodByPath[path]) return lastmodByPath[path];
  if (path.startsWith('/ton-dong-a/')) return toIso(priceListUpdated);
  if (path.startsWith('/xa-go/') && purlinPricesUpdated) return toIso(purlinPricesUpdated);
  return undefined;
};

export default defineConfig({
  site: 'https://halanvn.com',
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
  integrations: [
    sitemap({
      serialize(item) {
        const lastmod = lastmodOf(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
