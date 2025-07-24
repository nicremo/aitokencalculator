# 🌍 AI Token Calculator - Internationalization (i18n) Implementation Guide

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Analysis](#project-analysis)
3. [Language Support Strategy](#language-support-strategy)
4. [Technical Architecture](#technical-architecture)
5. [SEO Optimization Strategy](#seo-optimization-strategy)
6. [Implementation Phases](#implementation-phases)
7. [Component-by-Component Translation Guide](#component-by-component-translation-guide)
8. [Dynamic Content Handling](#dynamic-content-handling)
9. [Testing and Quality Assurance](#testing-and-quality-assurance)
10. [Maintenance and Long-term Strategy](#maintenance-and-long-term-strategy)

---

## Executive Summary

This guide outlines a comprehensive strategy to transform the AI Token Calculator from a German-only application to a fully internationalized platform supporting all 24 EU official languages plus additional European languages. The implementation will ensure optimal SEO performance, making the tool discoverable when users search for "AI token calculator", "LLM token counter", or related terms in any supported language.

### Key Goals
- Support 24 EU official languages + additional European languages
- Achieve top search rankings for token calculator searches in all languages
- Maintain clean URL structure with language prefixes (e.g., `/en/`, `/fr/`, `/es/`)
- Implement proper hreflang tags for search engine optimization
- Preserve current performance and user experience
- Enable easy addition of new languages in the future

### Expected Outcomes
- 25x increase in potential user base
- Improved search visibility across European markets
- Enhanced user experience with native language support
- Competitive advantage as a truly pan-European tool

---

## Project Analysis

### Current State
The project already has a solid foundation for internationalization:

```
/app/[locale]/          # Dynamic routing for locales
/messages/              # Translation files for 13 languages
i18n.ts                 # Configuration file
middleware.ts           # Locale handling
```

However, the implementation is incomplete:
- Components use hardcoded German text
- Translation hooks are not imported or used
- SEO metadata is not generated dynamically
- No language switcher UI component
- Model descriptions are only in German

### Existing Translation Coverage
Current languages with translation files:
- Czech (cs)
- Danish (da) 
- German (de) - DEFAULT
- English (en)
- Spanish (es)
- Finnish (fi)
- French (fr)
- Italian (it)
- Dutch (nl)
- Norwegian (no)
- Polish (pl)
- Portuguese (pt)
- Swedish (sv)

### Missing EU Official Languages
Need to add translation files for:
- Bulgarian (bg)
- Croatian (hr)
- Estonian (et)
- Greek (el)
- Hungarian (hu)
- Irish (ga)
- Latvian (lv)
- Lithuanian (lt)
- Maltese (mt)
- Romanian (ro)
- Slovak (sk)
- Slovenian (sl)

---

## Language Support Strategy

### Primary Languages (Phase 1)
Focus on major European markets first:
1. **English (en)** - Universal language, highest search volume
2. **German (de)** - Current default, DACH region
3. **French (fr)** - France, Belgium, Switzerland
4. **Spanish (es)** - Spain, growing tech market
5. **Italian (it)** - Major EU economy

### Secondary Languages (Phase 2)
EU official languages with significant tech communities:
6. **Dutch (nl)** - Netherlands, Belgium
7. **Polish (pl)** - Large developer community
8. **Portuguese (pt)** - Portugal, tech hub
9. **Swedish (sv)** - Nordic tech leader
10. **Danish (da)** - Nordic market
11. **Finnish (fi)** - Tech-savvy population
12. **Czech (cs)** - Growing tech sector
13. **Romanian (ro)** - Large IT outsourcing market

### Tertiary Languages (Phase 3)
Remaining EU official languages:
14. **Greek (el)**
15. **Hungarian (hu)** 
16. **Croatian (hr)**
17. **Bulgarian (bg)**
18. **Slovak (sk)**
19. **Lithuanian (lt)**
20. **Slovenian (sl)**
21. **Latvian (lv)**
22. **Estonian (et)**
23. **Maltese (mt)**
24. **Irish (ga)**

### Additional Considerations
- **Norwegian (no)** - Already included, non-EU but important
- **Ukrainian (uk)** - Consider adding due to large developer community
- **Serbian (sr)** - Growing tech market

---

## Technical Architecture

### URL Structure Strategy

```
# Domain-based routing (Premium option)
https://aitokencalculator.com     # English (default)
https://aitokencalculator.de      # German
https://aitokencalculator.fr      # French
https://aitokencalculator.es      # Spanish

# Path-based routing (Recommended)
https://aitokencalculator.com/en/  # English
https://aitokencalculator.com/de/  # German
https://aitokencalculator.com/fr/  # French
https://aitokencalculator.com/es/  # Spanish
```

### File Structure Enhancement

```
/app/
  /[locale]/
    layout.tsx          # Enhanced with metadata generation
    page.tsx            # Uses useTranslations hook
    not-found.tsx       # Localized 404 page
    sitemap.ts          # Dynamic sitemap with all locales
    
/messages/
  en.json              # English translations
  de.json              # German translations
  fr.json              # French translations
  [...24 more language files]
  
/components/
  LanguageSwitcher.tsx  # NEW: Language selection component
  LocaleProvider.tsx    # NEW: Locale context provider
  
/lib/
  i18n/
    config.ts          # Centralized i18n configuration
    utils.ts           # Helper functions for translations
    metadata.ts        # SEO metadata generators
    
/public/
  /locales/            # Language-specific assets
    /en/
    /de/
    /fr/
```

### Middleware Enhancement

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale, localeDetection} from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  
  // Redirect root to detected locale
  localePrefix: 'always',
  
  // Alternative domains configuration
  domains: [
    {
      domain: 'aitokencalculator.com',
      defaultLocale: 'en',
    },
    {
      domain: 'aitokencalculator.de',
      defaultLocale: 'de',
    },
  ]
});

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/([\\w-]+)?/users/(.+)'
  ]
};
```

---

## SEO Optimization Strategy

### 1. Metadata Generation

Each page needs dynamic metadata based on locale:

```typescript
// app/[locale]/layout.tsx
export async function generateMetadata({params: {locale}}) {
  const t = await getTranslations({locale, namespace: 'metadata'});
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    
    openGraph: {
      title: t('og.title'),
      description: t('og.description'),
      locale: locale,
      alternateLocale: locales.filter(l => l !== locale),
    },
    
    alternates: {
      canonical: `https://aitokencalculator.com/${locale}`,
      languages: Object.fromEntries(
        locales.map(l => [l, `https://aitokencalculator.com/${l}`])
      )
    },
    
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
  };
}
```

### 2. Hreflang Implementation

Three implementation methods (use all for maximum effectiveness):

#### HTML Head Method
```html
<link rel="alternate" hreflang="en" href="https://aitokencalculator.com/en/" />
<link rel="alternate" hreflang="de" href="https://aitokencalculator.com/de/" />
<link rel="alternate" hreflang="fr" href="https://aitokencalculator.com/fr/" />
<link rel="alternate" hreflang="x-default" href="https://aitokencalculator.com/en/" />
```

#### XML Sitemap Method
```xml
<url>
  <loc>https://aitokencalculator.com/en/</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://aitokencalculator.com/en/"/>
  <xhtml:link rel="alternate" hreflang="de" href="https://aitokencalculator.com/de/"/>
  <xhtml:link rel="alternate" hreflang="fr" href="https://aitokencalculator.com/fr/"/>
</url>
```

#### HTTP Headers Method
```
Link: <https://aitokencalculator.com/en/>; rel="alternate"; hreflang="en"
Link: <https://aitokencalculator.com/de/>; rel="alternate"; hreflang="de"
```

### 3. Structured Data

Implement JSON-LD structured data for each locale:

```typescript
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": t('appName'),
  "description": t('appDescription'),
  "url": `https://aitokencalculator.com/${locale}`,
  "inLanguage": locale,
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "1250"
  }
};
```

### 4. Locale-Specific Keywords

Optimize for search terms in each language:

```json
// messages/en.json
{
  "metadata": {
    "keywords": "AI token calculator, LLM token counter, GPT tokens, Claude tokens, token limit checker, AI context window calculator"
  }
}

// messages/de.json
{
  "metadata": {
    "keywords": "KI Token Rechner, LLM Token Zähler, GPT Tokens, Claude Tokens, Token Limit Prüfer, KI Kontextfenster Rechner"
  }
}

// messages/fr.json
{
  "metadata": {
    "keywords": "calculateur de tokens IA, compteur de tokens LLM, tokens GPT, tokens Claude, vérificateur de limite de tokens"
  }
}
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
1. **Update middleware.ts** for proper locale detection
2. **Enhance i18n.ts** configuration
3. **Create LanguageSwitcher component**
4. **Update root layout** with metadata generation
5. **Implement useTranslations** in main page.tsx

### Phase 2: Component Internationalization (Week 2)
1. **TextInput Component**
   - Replace hardcoded placeholders
   - Translate character/word/token labels
   
2. **FileUpload Component**
   - Translate error messages
   - Localize supported file type labels
   
3. **ModelCard Component**
   - Translate status messages
   - Localize number formatting
   - Currency formatting for costs
   
4. **ModelSidebar Component**
   - Translate all UI elements
   - Search placeholder text
   - Filter options

### Phase 3: Dynamic Content (Week 3)
1. **Model Descriptions**
   - Create translation keys for each model
   - Implement dynamic description loading
   
2. **Error Messages**
   - Centralize all error messages
   - Create translation keys
   
3. **CSV Export**
   - Localize column headers
   - Format numbers per locale

### Phase 4: SEO Implementation (Week 4)
1. **Metadata Generation**
   - Dynamic titles and descriptions
   - Open Graph tags
   - Twitter cards
   
2. **Sitemap Generation**
   - Multi-language sitemap
   - Proper hreflang in sitemap
   
3. **Structured Data**
   - JSON-LD implementation
   - Language-specific data

### Phase 5: Testing & Launch (Week 5)
1. **Quality Assurance**
   - Test all languages
   - SEO validation
   - Performance testing
   
2. **Deployment**
   - Staged rollout
   - Monitor search console
   - A/B testing

---

## Component-by-Component Translation Guide

### TextInput Component

```typescript
// Before
<span>Zeichen: {formatNumber(charCount)}</span>

// After
const t = useTranslations('textInput');
<span>{t('characters')}: {formatNumber(charCount, locale)}</span>
```

### FileUpload Component

```typescript
// Before
onError('Fehler beim Verarbeiten der Datei');

// After
const t = useTranslations('fileUpload');
onError(t('errors.processingError'));
```

### ModelCard Component

```typescript
// Before
<span>API-Kosten</span>

// After
const t = useTranslations('modelCard');
const formatCurrency = useLocalizedCurrency(locale);
<span>{t('apiCost')}: {formatCurrency(cost)}</span>
```

### Model Descriptions

```typescript
// Create model-specific translations
// messages/en.json
{
  "models": {
    "gpt4o": {
      "description": "128K token context, Multimodal capabilities"
    },
    "claude4": {
      "description": "200K token context, Extended thinking"
    }
  }
}
```

---

## Dynamic Content Handling

### Number Formatting

```typescript
// lib/i18n/formatters.ts
export function formatNumber(num: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(num);
}

export function formatCurrency(amount: number, locale: string): string {
  const currency = getCurrencyForLocale(locale);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  }).format(amount);
}
```

### Date Formatting

```typescript
export function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}
```

### Percentage Formatting

```typescript
export function formatPercentage(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(value / 100);
}
```

---

## Testing and Quality Assurance

### Automated Testing

```typescript
// __tests__/i18n.test.ts
describe('Internationalization', () => {
  test('all locales have required keys', async () => {
    for (const locale of locales) {
      const messages = await import(`@/messages/${locale}.json`);
      expect(messages.metadata.title).toBeDefined();
      expect(messages.header.title).toBeDefined();
      // ... test all required keys
    }
  });
  
  test('language switcher renders all locales', () => {
    render(<LanguageSwitcher />);
    locales.forEach(locale => {
      expect(screen.getByText(getLanguageName(locale))).toBeInTheDocument();
    });
  });
});
```

### SEO Validation Checklist

- [ ] Validate hreflang tags implementation
- [ ] Check alternate links in HTML head
- [ ] Verify sitemap contains all language versions
- [ ] Test language detection and redirects
- [ ] Validate structured data for each locale
- [ ] Check Open Graph tags for all languages
- [ ] Verify canonical URLs are correct
- [ ] Test meta descriptions length (150-160 chars)
- [ ] Validate language switcher accessibility

### Performance Monitoring

```typescript
// Monitor bundle size per locale
// next.config.js
module.exports = {
  i18n: {
    locales,
    defaultLocale,
  },
  experimental: {
    optimizePackageImports: ['@/messages'],
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ContextReplacementPlugin(
        /messages/,
        path.resolve('./messages'),
        true,
        /^\.\/.*\.json$/
      )
    );
    return config;
  },
};
```

---

## Maintenance and Long-term Strategy

### Translation Management

1. **Use Translation Management System (TMS)**
   - Integrate with Locize, Crowdin, or Phrase
   - Automate translation updates
   - Enable translator collaboration

2. **Translation Key Naming Convention**
   ```
   component.section.element.state
   Examples:
   - modelCard.header.title
   - fileUpload.errors.sizeTooLarge
   - common.buttons.submit
   ```

3. **Version Control for Translations**
   ```json
   {
     "_meta": {
       "version": "1.0.0",
       "lastUpdated": "2025-01-01",
       "translator": "professional-service"
     }
   }
   ```

### Adding New Languages

1. **Create translation file** `/messages/[locale].json`
2. **Add locale to configuration** `i18n/config.ts`
3. **Update middleware** matcher configuration
4. **Generate sitemap entries**
5. **Add hreflang references**
6. **Test thoroughly**
7. **Update documentation**

### Monitoring and Analytics

```typescript
// Track language usage
export function trackLanguageUsage(locale: string) {
  if (typeof window !== 'undefined') {
    window.gtag('event', 'language_selected', {
      language: locale,
      timestamp: new Date().toISOString()
    });
  }
}

// Monitor translation coverage
export async function getTranslationCoverage() {
  const coverage = {};
  for (const locale of locales) {
    const messages = await import(`@/messages/${locale}.json`);
    coverage[locale] = calculateCoverage(messages);
  }
  return coverage;
}
```

### SEO Performance Tracking

1. **Google Search Console**
   - Add property for each language subdirectory
   - Monitor impressions and clicks per locale
   - Track ranking for locale-specific keywords

2. **Core Web Vitals per Locale**
   - Monitor LCP, FID, CLS for each language
   - Ensure translations don't impact performance
   - Optimize font loading for different scripts

3. **A/B Testing**
   - Test different translation variants
   - Optimize CTR with better meta descriptions
   - Test language detection accuracy

---

## Conclusion

This comprehensive internationalization strategy will transform the AI Token Calculator into a truly global tool. By supporting all major European languages with proper SEO optimization, the application will become discoverable and usable by millions of additional users across Europe.

The phased approach ensures manageable implementation while maintaining quality. The focus on SEO from the start guarantees that each language version will rank well in search results, maximizing the return on investment in internationalization.

Key success factors:
- Maintain performance across all languages
- Ensure translation quality and consistency
- Implement comprehensive SEO for each locale
- Monitor and optimize based on usage data
- Plan for long-term maintenance and updates

With this implementation, the AI Token Calculator will become the go-to tool for token calculation across Europe, regardless of the user's native language.