import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://avpdev.com',
  // ИСПРАВЛЕНИЕ: Устанавливаем 'server', чтобы 'astro sync' прошел успешно.
  // Статические страницы будут сгенерированы с помощью 'prerender = true'.
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [sitemap()],
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});

