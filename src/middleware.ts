import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // 1. Critical Fix: Index redirection to Main Locale
  // Handles requests to root, /index, /index.html and /index/
  // Redirects immediately to /ru/ to avoid 404/loops
  if (path === '/' || path === '/index' || path === '/index.html' || path === '/index/') {
    return context.redirect('/ru/', 301);
  }

  // 2. Remove .html extension for other pages
  // Only for legacy support, specific pages
  if (path.endsWith('.html')) {
    const cleanPath = path.slice(0, -5);
    return context.redirect(`${cleanPath}/`, 301);
  }

  // 3. Removed manual Trailing Slash enforcement to prevent 301 on 404 pages.
  // Astro 'trailingSlash: always' config handles valid pages automatically.

  const response = await next();

  // If 404, return immediately without further processing to ensure 404 code is sent
  if (response.status === 404) {
    return response;
  }

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