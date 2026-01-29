import { defineMiddleware } from 'astro:middleware';

// 1. Exact Match Map (301 Redirects)
const redirectMap: Record<string, string> = {
  '/index.html': '/ru/',
  '/index': '/ru/',
  '/index/': '/ru/',
  '/privacy-policy': '/ru/privacy-policy/',
  '/terms-of-service': '/ru/terms-of-service/',
  '/terms-of-service/': '/ru/terms-of-service/',
  '/project-furniture.html': '/ru/project/project-furniture/',
  '/project/project-mekohaus/': '/ru/project/project-mekohaus/',
  '/project/project-furniture/': '/ru/project/project-furniture/',
};

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // 1. Exact Match Redirects
  if (redirectMap[path]) {
    return context.redirect(redirectMap[path], 301);
  }

  // 2. Folder Mapping: /en/uslugi/ -> /en/services/
  // Example: /en/uslugi/rogachev/ -> /en/services/rogachev/
  if (path.startsWith('/en/uslugi/')) {
    const remainder = path.replace('/en/uslugi/', '');
    // Ensure trailing slash for the new path
    const newPath = `/en/services/${remainder.endsWith('/') ? remainder : remainder + '/'}`;
    return context.redirect(newPath, 301);
  }

  // 3. Root Redirect
  if (path === '/') {
    return context.redirect('/ru/', 301);
  }

  // 4. Remove .html extension
  if (path.endsWith('.html')) {
    const cleanPath = path.slice(0, -5);
    return context.redirect(`${cleanPath}/`, 301);
  }

  // 5. Process Request
  const response = await next();

  // 6. 404 Handling - Return AS IS
  if (response.status === 404) {
    return response;
  }

  // 7. Security Headers (Only for existing pages)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
});