import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import { locations } from './src/data/locations.ts';

const site = 'https://avpdev.com';

// Генерируем URL для гео-страниц
const geoPages = locations.flatMap(loc => {
  const urls = [];
  // Добавляем русскую версию, если она существует
  if (loc.name_ru) {
    urls.push(`/ru/uslugi/${loc.slug}/`);
  }
  // Добавляем английскую версию
  urls.push(`/en/services/${loc.slug}/`);
  return urls;
});


// https://astro.build/config
export default defineConfig({
  site: site,
  // ИСПРАВЛЕНИЕ: Устанавливаем 'server', чтобы 'astro sync' прошел успешно.
  // Статические страницы будут сгенерированы с помощью 'prerender = true'.
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
      prefixDefaultLocale: true,
    },
  },
});

