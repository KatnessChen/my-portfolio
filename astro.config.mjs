import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yuwen-chen.vercel.app',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
