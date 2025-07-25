import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localeDetection } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection,
  localePrefix: 'always'
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|screenshots|main-web-app.png|model-selection.png).*)'
  ]
};