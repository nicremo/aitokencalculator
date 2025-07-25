import { getRequestConfig } from 'next-intl/server';

export const locales = [
  'en', 'de', 'es', 'fr', 'it', 'pl', 'nl', 'pt', 'cs', 'sv', 'da', 'no', 'fi',
  'bg', 'hr', 'et', 'el', 'hu', 'ga', 'lv', 'lt', 'mt', 'ro', 'sk', 'sl'
] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';
export const localeDetection = true;

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locales.includes(locale as any) ? locale : defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default,
  };
});