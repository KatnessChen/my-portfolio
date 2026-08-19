import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://portfolio.vizino.ai',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
