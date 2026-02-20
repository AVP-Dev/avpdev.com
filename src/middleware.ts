import { defineMiddleware } from 'astro:middleware';

// 1. Exact Match Map (301 Redirects)
const redirectMap: Record<string, string> = {
  '/index.html': '/ru/',
  '/index': '/ru/',
  '/index/': '/ru/',

  // Legal pages
  '/privacy-policy': '/ru/legal/privacy-policy/',
  '/privacy-policy/': '/ru/legal/privacy-policy/',
  '/privacy-policy.html': '/ru/legal/privacy-policy/',
  '/en/privacy-policy': '/en/legal/privacy-policy/',
  '/terms-of-service': '/ru/legal/terms-of-service/',
  '/terms-of-service/': '/ru/legal/terms-of-service/',
  '/terms-of-service.html': '/ru/legal/terms-of-service/',
  '/brief/': '/ru/brief/',

  // Projects
  '/project-furniture.html': '/ru/project/project-furniture/',
  '/project/project-furniture/': '/ru/project/project-furniture/',
  '/project-mekohaus.html': '/ru/project/project-mekohaus/',
  '/project/project-mekohaus/': '/ru/project/project-mekohaus/',
  '/project-travel.html': '/ru/project/project-travel/',
  '/project/project-travel/': '/ru/project/project-travel/',
  '/project-cars.html': '/ru/project/project-cars/',
  '/project/project-cars/': '/ru/project/project-cars/',
  '/project-tow-truck.html': '/ru/project/project-tow-truck/',
  '/project/project-tow-truck/': '/ru/project/project-tow-truck/',
  '/project-3d-modeling.html': '/ru/project/project-3d-modeling/',
  '/project/project-3d-modeling/': '/ru/project/project-3d-modeling/',
};

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // 0. Strict Canonical Redirection (Force HTTPS & Non-WWW)
  // ENABLED to fix non-WWW and HTTPS canonical errors in GSC
  const protocol = context.request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '');
  const host = context.request.headers.get('host') || url.host;

  if (
    !host.includes('localhost') &&
    !host.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/) &&
    (protocol === 'http' || host.startsWith('www.'))
  ) {
    const cleanHost = host.startsWith('www.') ? host.slice(4) : host;
    const newUrl = `https://${cleanHost}${path}${url.search}`;
    return context.redirect(newUrl, 301);
  }

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

  // 4.5. Enforce Trailing Slash (except for files)
  // Fixes "Duplicate without user-selected canonical" for URLs missing slashes
  if (!path.endsWith('/') && !path.split('/').pop()?.includes('.')) {
    return context.redirect(`${path}/${url.search}`, 301);
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