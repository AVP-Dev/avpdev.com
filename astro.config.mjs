import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import remarkHeadingId from 'remark-heading-id';
import { locations } from './src/data/locations.ts';

const site = 'https://avpdev.com';

// Генерируем массив полных URL для sitemap
const geoPages = locations.flatMap(loc => {
  const urls = [];
  if (loc.name_ru) {
    urls.push(`${site}/ru/uslugi/${loc.slug}/`);
  }
  urls.push(`${site}/en/services/${loc.slug}/`);
  return urls;
});

export default defineConfig({
  site: site,

  // 1. Поддержка кастомных ID в заголовках Markdown
  markdown: {
    remarkPlugins: [remarkHeadingId],
  },

  // 2. Настройка серверного рендеринга (Node.js)
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),

  integrations: [
    // 3. Интеграция Sitemap с добавлением динамических страниц
    sitemap({
      customPages: geoPages, // Теперь переменная используется!
      changefreq: 'weekly',
      priority: 0.7,
    }),

    // 4. Оптимизация скриптов (Google Tag Manager и др.)
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),

    // 5. Поддержка React компонентов
    react()
  ],

  // 6. Настройки путей и сервера
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },

  // 7. Интернационализация (i18n)
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});