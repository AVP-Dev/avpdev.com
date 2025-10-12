import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;
  // Игнорируем все пути, которые уже содержат языковой префикс или являются ассетами
  if (pathname.startsWith('/ru') || pathname.startsWith('/en') || pathname.includes('.')) {
    return next();
  }

  // Проверяем язык браузера
  const langHeader = context.request.headers.get('accept-language');
  const preferredLang = langHeader?.split(',')[0].split('-')[0].toLowerCase();

  // Если основной язык не русский, редиректим на /en/
  if (preferredLang && preferredLang !== 'ru') {
    return context.redirect('/en/');
  }

  // Для всех остальных случаев (включая русский язык или отсутствие заголовка)
  // оставляем поведение по умолчанию (редирект на /ru/ из `src/pages/index.astro`)
  return next();
});