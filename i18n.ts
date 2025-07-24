import { getRequestConfig } from 'next-intl/server';

// Supported locales
export const locales = ['en', 'de', 'es', 'fr', 'it', 'pl', 'nl', 'pt', 'cs', 'sv', 'da', 'no', 'fi'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'de';

export default getRequestConfig(async ({ locale }) => {
  // Fallback to default if locale is undefined
  const validLocale = locale || defaultLocale;
  
  console.log('i18n.ts - locale:', locale, 'validLocale:', validLocale);
  
  return {
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
});