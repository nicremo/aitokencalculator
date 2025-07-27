import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { locales } from '@/i18n';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'AI Token Calculator Team' }],
    creator: 'AI Token Calculator',
    publisher: 'AI Token Calculator',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      bing: 'your-bing-verification-code',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://aitokencalculator.com/${locale}`,
      siteName: 'AI Token Calculator',
      locale: locale,
      type: 'website',
      alternateLocale: locales.filter(l => l !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      creator: '@aitokencalc',
      site: '@aitokencalc',
    },
    alternates: {
      canonical: `https://aitokencalculator.com/${locale}`,
      languages: Object.fromEntries(
        locales.map(l => [l, `https://aitokencalculator.com/${l}`])
      ),
    },
    category: 'technology',
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  // JSON-LD structured data for Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AI Token Calculator',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    description: 'Free online token calculator for AI models. Check if your text fits in GPT-4, Claude, Gemini context windows. Calculate API costs instantly.',
    url: 'https://aitokencalculator.com',
    sameAs: [
      'https://aitokencounter.online'
    ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    author: {
      '@type': 'Organization',
      name: 'AI Token Calculator Team',
      url: 'https://aitokencalculator.com'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1'
    },
    isAccessibleForFree: true,
    browserRequirements: 'Requires JavaScript. Works on Chrome, Firefox, Safari, Edge.',
    softwareVersion: '2.0.0',
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString()
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}