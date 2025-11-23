import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;
  // Игнорируем все пути, которые уже содержат языковой префикс, являются ассетами или API
  if (pathname.startsWith('/ru') || pathname.startsWith('/en') || pathname.includes('.') || pathname.startsWith('/api/')) {
    return next();
  }

  // Проверяем язык браузера
  const langHeader = context.request.headers.get('accept-language');
  const preferredLang = langHeader?.split(',')[0].split('-')[0].toLowerCase();

  // Если основной язык не русский, редиректим на /en/
  if (preferredLang && preferredLang !== 'ru') {
    return context.redirect('/en/');
  }

  // Для всех остальных случаев оставляем поведение по умолчанию
  return next();
});