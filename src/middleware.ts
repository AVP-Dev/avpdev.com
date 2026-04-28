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
  '/ru/privacy-policy': '/ru/legal/privacy-policy/',
  '/ru/privacy-policy/': '/ru/legal/privacy-policy/',
  '/en/privacy-policy': '/en/legal/privacy-policy/',
  '/en/privacy-policy/': '/en/legal/privacy-policy/',
  '/terms-of-service': '/ru/legal/terms-of-service/',
  '/terms-of-service/': '/ru/legal/terms-of-service/',
  '/terms-of-service.html': '/ru/legal/terms-of-service/',
  '/ru/terms-of-service': '/ru/legal/terms-of-service/',
  '/ru/terms-of-service/': '/ru/legal/terms-of-service/',
  '/en/terms-of-service': '/en/legal/terms-of-service/',
  '/en/terms-of-service/': '/en/legal/terms-of-service/',
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
  let protocol = url.protocol.replace(':', '');
  let host = url.host;

  // By skipping headers access on localhost and during development, we avoid the Astro warning:
  // "Astro.request.headers is not available on prerendered pages".
  const isDev = import.meta.env.DEV;
  // Detect if we are currently running the build process (astro build)
  const isBuild = typeof process !== 'undefined' && (
    process.argv.some(arg => arg.includes('astro')) ||
    process.env.npm_lifecycle_event === 'build' ||
    process.argv.some(arg => arg.includes('build'))
  );

  // Helper to apply security headers to any response
  const applySecurityHeaders = (res: Response) => {
    // If the response is a redirect or has no body, we still need to clone it to modify headers
    // but we must be careful with the body.
    const newRes = new Response(res.body, res);

    // Security Headers
    newRes.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    newRes.headers.set('X-Content-Type-Options', 'nosniff');
    newRes.headers.set('X-Frame-Options', 'SAMEORIGIN');
    newRes.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    newRes.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), speaker=(), usb=(), interest-cohort=()');
    newRes.headers.set('X-AVP-Debug', 'Middleware-Applied');

    // CSP
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://mc.yandex.ru https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com",
      "img-src 'self' data: https://www.googletagmanager.com https://mc.yandex.ru https://www.google-analytics.com",
      "font-src 'self' data: https://cdnjs.cloudflare.com https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://mc.yandex.ru",
      "frame-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "upgrade-insecure-requests"
    ].join('; ');
    newRes.headers.set('Content-Security-Policy', csp);

    return newRes;
  };

  if (!isBuild && !isDev && !host.includes('localhost') && !host.includes('127.0.0.1')) {
    try {
      protocol = context.request.headers.get('x-forwarded-proto') || protocol;
      host = context.request.headers.get('host') || host;
    } catch (e) {
      // Ignore
    }

    if (
      !host.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/) &&
      (protocol === 'http' || host.startsWith('www.'))
    ) {
      const cleanHost = host.startsWith('www.') ? host.slice(4) : host;
      const newUrl = `https://${cleanHost}${path}${url.search}`;
      return applySecurityHeaders(context.redirect(newUrl, 301));
    }
  }

  // 1. Exact Match Redirects
  if (redirectMap[path]) {
    return applySecurityHeaders(context.redirect(redirectMap[path], 301));
  }

  // 2. Folder Mapping: /en/uslugi/ -> /en/services/
  if (path.startsWith('/en/uslugi/')) {
    const remainder = path.replace('/en/uslugi/', '');
    const newPath = `/en/services/${remainder.endsWith('/') ? remainder : remainder + '/'}`;
    return applySecurityHeaders(context.redirect(newPath, 301));
  }

  // 4. Remove .html extension
  if (path.endsWith('.html')) {
    const cleanPath = path.slice(0, -5);
    return applySecurityHeaders(context.redirect(`${cleanPath}/`, 301));
  }

  // 4.5. Enforce Trailing Slash
  if (!path.endsWith('/') && !path.split('/').pop()?.includes('.')) {
    return applySecurityHeaders(context.redirect(`${path}/${url.search}`, 301));
  }

  // 5. Process Request
  const response = await next();

  // 6. Return response with security headers (including 404s)
  return applySecurityHeaders(response);
});