import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localeDetection } from './i18n';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection,
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  // Security headers
  const response = intlMiddleware(request);
  
  // Add security headers to signal trustworthiness
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel-scripts.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self'; " +
    "connect-src 'self' https://vitals.vercel-insights.com; " +
    "frame-ancestors 'none';"
  );
  
  // Additional trust signals
  response.headers.set('X-Robots-Tag', 'index, follow');
  response.headers.set('X-Powered-By', 'Next.js');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|screenshots|main-web-app.png|model-selection.png|robots.txt).*)'
  ]
};