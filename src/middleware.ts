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
  // e.g. /about.html -> /about/
  if (path.endsWith('.html')) {
    const cleanPath = path.slice(0, -5);
    return context.redirect(`${cleanPath}/`, 301);
  }

  // 3. Enforce Trailing Slash (Standardization)
  // Exclude files with extensions (images, css, js, etc.)
  // We check if the last segment contains a dot to identify files
  const isFile = path.split('/').pop()?.includes('.');
  if (!path.endsWith('/') && !isFile) {
    return context.redirect(`${path}/`, 301);
  }

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