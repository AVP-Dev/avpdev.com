import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  // Вся автоматическая логика определения языка удалена.
  // Теперь пользователь попадает на /ru/ по умолчанию (через конфиг Astro)
  // или выбирает язык вручную.
  return next();
});