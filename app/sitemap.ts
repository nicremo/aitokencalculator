import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aitokencalculator.com';
  const baseUrl2 = 'https://aitokencounter.online';
  
  // Generate URLs for all locales for both domains
  const urls = locales.flatMap(locale => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl2}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    }
  ]);

  // Add root URLs
  urls.push(
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: baseUrl2,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    }
  );

  return urls;
}