import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aitokencalculator.com';
  
  // Generate URLs for all locales
  const urls = locales.flatMap(locale => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    }
  ]);

  return urls;
}