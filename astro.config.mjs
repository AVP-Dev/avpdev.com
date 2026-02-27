import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import remarkHeadingId from 'remark-heading-id';
import { locations } from './src/data/locations.ts';
import { geoContent } from './src/data/geo-content.ts';

const site = 'https://avpdev.com';

// Sitemap will automatically include pre-rendered [city] pages from dist/

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
      filter: (page) => page !== `${site}/`,
      changefreq: 'weekly',
      priority: 0.7,
    }),

    // 5. Поддержка React компонентов
    react()
  ],

  // 6. Настройки путей и сервера
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'always'
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },

  compressHTML: false,

  // 7. Интернационализация (i18n)
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});