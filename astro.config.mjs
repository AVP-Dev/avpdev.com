import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown'; // Импортируем Partytown
import { locations } from './src/data/locations.ts';

import react from '@astrojs/react';

const site = 'https://avpdev.com';

const geoPages = locations.flatMap(loc => {
  const urls = [];
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
    // Geo-страницы и legal-страницы являются статическими (prerender=true)
    // и будут автоматически добавлены в sitemap.
    // customPages здесь не нужен, если только нет чисто динамических SSR маршрутов,
    // которые нужно добавить вручную.
    // Оставляем пустым или убираем customPages, если он был только для geoPages.
  }), partytown({
    // Конфигурация Partytown для GTAG
    config: {
      forward: ["dataLayer.push"],
    },
  }), react()],
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});