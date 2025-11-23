import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  
  // --- Security Headers (Пункт 1) ---
  // Защита от MIME-сниффинга, кликджекинга и XSS
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Дополнительно можно добавить Permissions-Policy (отключаем неиспользуемые API браузера)
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
});