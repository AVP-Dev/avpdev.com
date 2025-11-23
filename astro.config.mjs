// astro.config.mjs
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import { locations } from './src/data/locations.ts';

const site = 'https://avpdev.com';

// Генерируем URL для гео-страниц
const geoPages = locations.flatMap(loc => {
  const urls = [];
  // Для русского языка оставляем явные пути для гео-страниц, если нужно
  if (loc.name_ru) {
    urls.push(`/ru/uslugi/${loc.slug}/`);
  }
  urls.push(`/en/services/${loc.slug}/`);
  return urls;
});

export default defineConfig({
  site: site,
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [sitemap({
    customPages: [
      ...geoPages.map(page => new URL(page, site).href)
    ]
  })],
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: {
      // ВАЖНО: Отключаем префикс для дефолтного языка.
      // Теперь русский язык будет открываться на корневом домене /.
      prefixDefaultLocale: false,
    },
  },
});