// astro.config.mjs
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://avpdev.com',

  // Эта настройка остается для `astro dev`
  server: {
    host: true,
  },

  // ИЗМЕНЕНО: Возвращаемся к 'hybrid' для оптимальной производительности.
  // 'static' для большинства страниц и 'server' для API.
  output: 'hybrid',
  
  // Адаптер все еще нужен для обработки API-эндпоинтов в режиме hybrid
  adapter: node({
    mode: 'standalone'
  }),
  
  // ИЗМЕНЕНО: Эта опция необходима для корректной маршрутизации при build.format: 'directory'
  // Она гарантирует, что все URL будут иметь слеш в конце (например, /about/)
  trailingSlash: 'always',

  build: {
    format: 'directory'
  }
});
