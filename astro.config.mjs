import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import remarkHeadingId from 'remark-heading-id';
import { locations } from './src/data/locations.ts';
import { geoContent } from './src/data/geo-content.ts';

const site = 'https://avpdev.com';

// Список slug городов, у которых НЕТ русского контента (name_ru: null)
// Эти RU-страницы делают redirect → не должны быть в sitemap
const enOnlyCitySlugs = locations
  .filter(loc => loc.name_ru === null)
  .map(loc => loc.slug);

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
    // 3. Интеграция Sitemap: i18n hreflang + lastmod + priority по типу страниц
    sitemap({
      // Фильтрация: убираем корень и RU-города без русского контента (redirect-only)
      filter: (page) => {
        // Исключить корневой URL (делает 301 redirect в index.astro)
        if (page === `${site}/` || page === `${site}`) return false;

        // Исключить любые страницы, которых нет в контенте для конкретного языка
        const isRuGeo = page.includes('/ru/uslugi/');
        const isEnGeo = page.includes('/en/services/');

        if (isRuGeo) {
          const slug = page.split('/ru/uslugi/')[1].replace(/\//g, '');
          if (enOnlyCitySlugs.includes(slug)) return false;
        }

        // Исключить страницы, которые мы знаем как редиректы из middleware
        const redirects = [
          '/ru/privacy-policy/', '/en/privacy-policy/',
          '/ru/terms-of-service/', '/en/terms-of-service/',
          '/ru/brief/', '/index.html'
        ];
        if (redirects.some(r => page.endsWith(r))) return false;

        return true;
      },

      // i18n: автоматический hreflang для RU↔EN (xhtml:link alternate)
      i18n: {
        defaultLocale: 'ru',
        locales: {
          ru: 'ru',
          en: 'en',
        },
      },

      // Кастомизация каждого URL: lastmod + дифференцированный priority
      serialize(item) {
        const url = item.url;

        // lastmod — текущая дата билда
        item.lastmod = new Date().toISOString();

        // Дифференцированный priority по типу страницы
        if (url.match(/\/(ru|en)\/$/)) {
          // Главные страницы
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (url.includes('/blog/') && url.match(/\/(ru|en)\/blog\/$/)) {
          // Блог-листинг
          item.priority = 0.8;
          item.changefreq = 'daily';
        } else if (url.includes('/blog/')) {
          // Отдельные статьи блога
          item.priority = 0.7;
          item.changefreq = 'weekly';
        } else if (url.includes('/project/')) {
          // Проекты
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (
          url.includes('/services/ai-integration/') ||
          url.includes('/services/website-development/') ||
          url.includes('/services/bot-and-scraper-development/') ||
          url.includes('/services/saas-mvp/') ||
          url.includes('/services/telegram-mini-apps/') ||
          url.includes('/uslugi/razrabotka-saitov/') ||
          url.includes('/uslugi/ai-integracii/') ||
          url.includes('/uslugi/razrabotka-botov-i-parserov/') ||
          url.includes('/uslugi/saas-mvp/') ||
          url.includes('/uslugi/telegram-mini-apps/')
        ) {
          // Основные услуги (не города)
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (url.includes('/services/') || url.includes('/uslugi/')) {
          // Гео-страницы (города)
          item.priority = 0.5;
          item.changefreq = 'monthly';
        } else if (url.includes('/brief/')) {
          // Бриф
          item.priority = 0.6;
          item.changefreq = 'monthly';
        } else if (url.includes('/locations/')) {
          // Карта локаций
          item.priority = 0.6;
          item.changefreq = 'monthly';
        } else if (url.includes('/legal/')) {
          // Юридические страницы
          item.priority = 0.3;
          item.changefreq = 'yearly';
        } else {
          // Все остальные
          item.priority = 0.5;
          item.changefreq = 'monthly';
        }

        return item;
      },
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

  compressHTML: true,

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