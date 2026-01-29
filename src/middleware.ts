import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // 1. Приоритетные редиректы для главной и старых путей
  // Это предотвращает цепочки редиректов типа index.html -> /index/ -> /ru/
  if (path === '/index.html' || path === '/index/' || path === '/index' || path === '/') {
    return context.redirect('/ru/', 301);
  }

  // 2. Убираем .html для остальных страниц
  if (path.endsWith('.html')) {
    const cleanPath = path.slice(0, -5);
    return context.redirect(`${cleanPath}/`, 301);
  }

  // 3. Сначала получаем ответ от Astro, чтобы понять, существует ли страница
  const response = await next();

  // 4. ГЛАВНОЕ ИСПРАВЛЕНИЕ: Если страницы нет (404), отдаем её как есть
  // Не нужно добавлять слеши к 404 странице
  if (response.status === 404) {
    return response;
  }

  // 5. Заголовки безопасности
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
});