import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // 1. Redirect .html to clean URL (with trailing slash)
  if (path.endsWith('.html')) {
    const cleanPath = path.slice(0, -5);
    return context.redirect(`${cleanPath}/`, 301);
  }

  // 2. Enforce Trailing Slash (except for files with extensions)
  // If path doesn't end with slash and doesn't have an extension (like .css, .js, .png)
  if (!path.endsWith('/') && !path.split('/').pop()?.includes('.')) {
    return context.redirect(`${path}/`, 301);
  }

  // 3. Root Redirect Optimization
  if (path === '/') {
    return context.redirect('/ru/', 301);
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