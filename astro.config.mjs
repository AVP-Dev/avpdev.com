import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown'; // Импортируем Partytown
import { locations } from './src/data/locations.ts';

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
  integrations: [
    sitemap({
      customPages: [
        ...geoPages.map(page => new URL(page, site).href)
      ]
    }),
    partytown({
      // Конфигурация Partytown для GTAG
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
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