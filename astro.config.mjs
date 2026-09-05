import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { unified } from '@astrojs/markdown-remark';
import remarkHeadingId from 'remark-heading-id';
import { locations } from './src/data/locations.ts';

const site = 'https://avpdev.com';

const coreServices = new Set([
  '/en/services/',
  '/en/services/ai-integration/',
  '/en/services/website-development/',
  '/en/services/bot-and-scraper-development/',
  '/en/services/saas-mvp/',
  '/en/services/telegram-mini-apps/',
  '/en/services/ecommerce-development/',
  '/ru/uslugi/',
  '/ru/uslugi/razrabotka-saitov/',
  '/ru/uslugi/ai-integracii/',
  '/ru/uslugi/razrabotka-botov-i-parserov/',
  '/ru/uslugi/saas-mvp/',
  '/ru/uslugi/telegram-mini-apps/',
  '/ru/uslugi/internet-magaziny/',
]);

export default defineConfig({
  site: site,

  // 1. Поддержка кастомных ID в заголовках Markdown
  markdown: {
    processor: unified({
      remarkPlugins: [remarkHeadingId],
    }),
  },

  // 2. Настройка серверного рендеринга (Node.js)
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),

  integrations: [
    // 3. Интеграция Sitemap: i18n hreflang + lastmod + priority по типу страниц
    sitemap({
      // Фильтрация: убираем корень, 404, редиректы, локации и авто-сетку городов (thin content)
      filter: (page) => {
        // Exclude root (307 redirect in index.astro)
        if (page === `${site}/` || page === `${site}`) return false;

        // Exclude any 404 pages
        if (page.includes('/404/') || page.endsWith('/404')) return false;

        // Exclude known redirect-only pages (handled in middleware)
        const redirectOnlyPaths = [
          '/ru/privacy-policy/',
          '/en/privacy-policy/',
          '/ru/terms-of-service/',
          '/en/terms-of-service/',
        ];
        if (redirectOnlyPaths.some(r => page.endsWith(r))) return false;

        // Exclude locations catalog (thin content / doorway protection)
        if (page.includes('/locations/')) return false;

        // Exclude city pages: keep ONLY core service landing pages
        if (page.includes('/services/') || page.includes('/uslugi/')) {
          try {
            const pathname = new URL(page).pathname;
            if (!coreServices.has(pathname)) return false;
          } catch (e) {
            return false;
          }
        }

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
        } else if (coreServices.has(new URL(url).pathname)) {
          // Основные услуги
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (url.includes('/brief/')) {
          // Бриф
          item.priority = 0.8;
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

  vite: {
    ssr: {
      external: ['bun:sqlite'],
    },
  },

  compressHTML: true,

  // 8. 301 редиректы: старые Russian-transliterated EN-slugs → правильные EN-slugs
  // (только со слешем — при trailingSlash:'always' Astro сам обрабатывает вариант без слеша)
  redirects: {
    '/en/blog/uroki-amsterdama/':  '/en/blog/lessons-from-amsterdam/',
  },

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