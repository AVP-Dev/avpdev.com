import { defineMiddleware } from 'astro:middleware';

// AI bot User-Agent detection patterns
const AI_BOT_PATTERNS = [
  'GPTBot', 'ChatGPT-User', 'Claude-Web', 'ClaudeBot', 'Claude-SearchBot',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Googlebot',
  'Gemini', 'Gemini-User', 'CCBot', 'anthropic-ai', 'Bytespider',
  'cohere-ai', 'FacebookBot', 'Meta-ExternalAgent', 'Applebot',
  'Amazonbot', 'OAI-SearchBot', 'coze',
];

function isAIBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return AI_BOT_PATTERNS.some(pattern => ua.includes(pattern.toLowerCase()));
}

// 1. Exact Match Map (301 Redirects)
const redirectMap: Record<string, string> = {
  '/ru/project/project-sentralix/': '/ru/project/project-enterprise-ai-platform/',
  '/ru/project/project-flux-desk/': '/ru/project/project-support-automation-saas/',
  '/ru/project/project-aura-home/': '/ru/project/project-smart-home-dashboard/',
  '/ru/project/project-techmetal/': '/ru/project/project-industrial-b2b-portal/',
  '/ru/project/project-mekohaus/': '/ru/project/project-furniture-factory/',
  '/ru/project/project-leder-werk/': '/ru/project/project-leather-goods-store/',
  '/ru/project/project-ralf-ringer/': '/ru/project/project-footwear-brand/',
  '/ru/project/project-rozhkova/': '/ru/project/project-confectionery/',
  '/ru/project/project-pure-trust/': '/ru/project/project-dental-clinic/',
  '/ru/project/project-urban-spot/': '/ru/project/project-coworking-platform/',
  '/en/project/project-sentralix/': '/en/project/project-enterprise-ai-platform/',
  '/en/project/project-flux-desk/': '/en/project/project-support-automation-saas/',
  '/en/project/project-aura-home/': '/en/project/project-smart-home-dashboard/',
  '/en/project/project-techmetal/': '/en/project/project-industrial-b2b-portal/',
  '/en/project/project-mekohaus/': '/en/project/project-furniture-factory/',
  '/en/project/project-leder-werk/': '/en/project/project-leather-goods-store/',
  '/en/project/project-ralf-ringer/': '/en/project/project-footwear-brand/',
  '/en/project/project-rozhkova/': '/en/project/project-confectionery/',
  '/en/project/project-pure-trust/': '/en/project/project-dental-clinic/',
  '/en/project/project-urban-spot/': '/en/project/project-coworking-platform/',
  '/ru/projects/': '/ru/project/',
  '/en/projects/': '/en/project/',
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
    // HSTS отправляем только в продакшене на реальном домене (не на localhost/IP),
    // иначе браузер запомнит "всегда HTTPS" и сломает локальную разработку по HTTP.
    const isLocalHost = host.includes('localhost') || host.includes('127.0.0.1') || host.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/);
    if (!isDev && !isBuild && !isLocalHost) {
      newRes.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }
    newRes.headers.set('X-Content-Type-Options', 'nosniff');
    newRes.headers.set('X-Frame-Options', 'SAMEORIGIN');
    newRes.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    newRes.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), speaker=(), usb=(), interest-cohort=()');

    // CSP
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://mc.yandex.ru https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com",
      "img-src 'self' data: https://www.googletagmanager.com https://mc.yandex.ru https://www.google-analytics.com",
      "font-src 'self' data: https://cdnjs.cloudflare.com https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://mc.yandex.ru https://challenges.cloudflare.com",
      "frame-src 'self' https://challenges.cloudflare.com",
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

  // 1.5. Sitemap alias: /sitemap.xml -> /sitemap-index.xml
  if (path === '/sitemap.xml' || path === '/sitemap.xml/') {
    return applySecurityHeaders(context.redirect('/sitemap-index.xml', 301));
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

  // 5. AI bot detection — set flag for downstream components
  let userAgent = '';
  if (!isBuild && !isDev) {
    try {
      userAgent = context.request.headers.get('user-agent') || '';
    } catch (e) { /* ignore */ }
  }
  context.locals.isAIBot = userAgent ? isAIBot(userAgent) : false;

  // 6. Process Request
  const response = await next();

  // 6. Return response with security headers (including 404s)
  return applySecurityHeaders(response);
});