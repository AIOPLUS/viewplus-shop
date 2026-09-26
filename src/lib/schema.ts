import { brand } from '@/config/brand';
import { VERZENDING } from '@/config/site';
import type { Product } from './catalog';
import { absoluteUrl } from './url';

type Json = Record<string, unknown>;

const orgId = `${brand.siteUrl}/#organization`;

export function organizationSchema(): Json {
  const sameAs = Object.values(brand.social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId,
    name: brand.name,
    url: brand.siteUrl,
    logo: absoluteUrl(brand.logo),
    email: brand.email,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${brand.siteUrl}/#website`,
    name: brand.name,
    url: brand.siteUrl,
    inLanguage: 'nl-NL',
    publisher: { '@id': orgId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqSchema(faq: readonly { vraag: string; antwoord: string }[]): Json | null {
  if (!faq.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.vraag,
      acceptedAnswer: { '@type': 'Answer', text: f.antwoord },
    })),
  };
}

/** Gratis verzending naar Nederland en België (zie VERZENDING en de verkoopvoorwaarden). */
const verzending = (): Json[] =>
  (['NL', 'BE'] as const).map((land) => ({
    '@type': 'OfferShippingDetails',
    shippingRate: { '@type': 'MonetaryAmount', value: VERZENDING.kosten ?? 0, currency: 'EUR' },
    shippingDestination: { '@type': 'DefinedRegion', addressCountry: land },
  }));

/**
 * Retourbeleid volgens de verkoopvoorwaarden: 14 dagen retour per post, verzendkosten voor de koper.
 * De teller naar keuze heeft altijd een eigen logo (maatwerk) en kan niet retour.
 */
const retour = (maatwerk: boolean): Json =>
  maatwerk
    ? { '@type': 'MerchantReturnPolicy', applicableCountry: ['NL', 'BE'], returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted' }
    : {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: ['NL', 'BE'],
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/ReturnShippingFees',
      };

/** Eén product met een aanbieding per variant. Varianten zonder prijs krijgen geen Offer (Google eist een prijs). */
export function productSchema(p: Product): Json {
  const d = p.data;
  const maatwerk = d.visual === 'teller-op-maat';
  const offers = d.varianten
    .filter((v) => v.prijs !== null)
    .map((v) => ({
      '@type': 'Offer',
      name: `${d.naam} (${v.label})`,
      price: v.prijs,
      priceCurrency: 'EUR',
      availability: d.status === 'beschikbaar' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      url: absoluteUrl(`/${d.slug}`),
      priceSpecification: { '@type': 'UnitPriceSpecification', price: v.prijs, priceCurrency: 'EUR', valueAddedTaxIncluded: false },
      ...(VERZENDING.kosten !== null ? { shippingDetails: verzending() } : {}),
      hasMerchantReturnPolicy: retour(maatwerk),
    }));
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: d.naam,
    description: d.samenvatting,
    url: absoluteUrl(`/${d.slug}`),
    image: absoluteUrl(`/og/${d.slug}.png`),
    brand: { '@id': orgId },
    ...(offers.length ? { offers } : {}),
  };
}

/** Lijst van producten (homepage). */
export function productenSchema(lijst: Product[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: lijst.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(`/${p.data.slug}`), name: p.data.naam })),
  };
}
