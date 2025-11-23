// src/middleware.ts
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // 1. Если это не корень сайта, ничего не делаем (Astro сам разберется с /en/..., /api/ и т.д.)
  if (pathname !== '/' && pathname !== '') {
    return next();
  }

  // 2. Проверяем куки (если пользователь уже выбирал язык ранее)
  const savedLang = context.cookies.get('preferred_lang')?.value;

  if (savedLang === 'en') {
    return context.redirect('/en/');
  }
  if (savedLang === 'ru') {
    return next(); // Остаемся на главной (она теперь русская)
  }

  // 3. Если куки нет, проверяем заголовок браузера Accept-Language
  const langHeader = context.request.headers.get('accept-language');
  const preferredLang = langHeader?.split(',')[0].split('-')[0].toLowerCase();

  // Если браузер явно просит английский — делаем редирект
  if (preferredLang === 'en') {
    return context.redirect('/en/');
  }

  // Во всех остальных случаях отдаем русскую версию (по умолчанию)
  return next();
});