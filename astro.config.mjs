import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: 換成正式網域（Vercel 給的網址或自訂網域）
export default defineConfig({
  site: 'https://yuwen-chen.vercel.app',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
