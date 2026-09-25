// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const site = (env.SITE_URL || 'https://shop.viewplus.io').replace(/\/+$/, '');
// Voor de testversie op https://aioplus.github.io/viewplus-shop: BASE_PATH=/viewplus-shop
const rawBase = env.BASE_PATH || '/';
const base = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}`;

export default defineConfig({
  site,
  base,
  // Zelfde URL-opbouw als reviewplus.io (/features, /plans, …), gelijk aan de View Plus-site.
  trailingSlash: 'never',
  build: { format: 'file' },
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !/\/(bedankt|winkelwagen|afrekenen|404)(\.html)?$/.test(page),
    }),
  ],
  image: { responsiveStyles: true },
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.SITE_URL': JSON.stringify(site),
      'import.meta.env.BASE_PATH': JSON.stringify(base),
    },
  },
});
