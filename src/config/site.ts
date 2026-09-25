import { brand } from './brand';

const env = import.meta.env;

function normBase(raw: string | undefined): string {
  if (!raw || raw === '/') return '/';
  return `/${raw.replace(/^\/+|\/+$/g, '')}`;
}

/** Absolute origin zonder trailing slash, bv. https://shop.viewplus.io */
export const SITE_URL = (env.SITE_URL || 'https://shop.viewplus.io').replace(/\/+$/, '');
/** "/" op shop.viewplus.io, "/viewplus-shop" op een testversie (GitHub Pages zonder eigen domein). */
export const BASE_PATH = normBase(env.BASE_PATH);
/** Concepten zijn alleen zichtbaar op de testversie. */
export const TOON_CONCEPTEN = BASE_PATH !== '/';

export const COUNTRIES = ['NL', 'BE'] as const;
export type Country = (typeof COUNTRIES)[number];
export const COUNTRY_LABELS: Record<Country, string> = { NL: 'Nederland', BE: 'België' };

/**
 * Bestellingen en formulieren gaan (later) naar het Make-scenario, met `merk: "viewplus"`.
 * Make rekent de bedragen opnieuw uit met /products.json en antwoordt met een Mollie-betaallink (`checkoutUrl`).
 * Zolang de webhook leeg is, verwijst de shop naar het e-mailadres.
 */
export const LEAD = {
  webhookUrl: env.PUBLIC_LEAD_WEBHOOK_URL || '',
  turnstileSiteKey: env.PUBLIC_TURNSTILE_SITE_KEY || '',
  fallbackEmail: brand.email,
};

export const ANALYTICS = {
  provider: (env.PUBLIC_ANALYTICS_PROVIDER || '') as '' | 'plausible' | 'umami',
  domain: env.PUBLIC_ANALYTICS_DOMAIN || new URL(SITE_URL).host,
  scriptUrl: env.PUBLIC_ANALYTICS_SCRIPT_URL || '',
  umamiWebsiteId: env.PUBLIC_UMAMI_WEBSITE_ID || '',
};

export const PIXELS = {
  metaPixelId: env.PUBLIC_META_PIXEL_ID || '',
  gadsId: env.PUBLIC_GADS_ID || '',
  gadsConversionLabel: env.PUBLIC_GADS_CONVERSION_LABEL || '',
};

/** Hoe prijzen getoond worden. */
export const PRICE_NOTE = 'excl. btw';

/**
 * Verzendkosten per bestelling, excl. btw. `null` = nog niet bekend (TODO Jordan).
 * Staat ook in /products.json, zodat Make hetzelfde bedrag rekent.
 */
export const VERZENDING = {
  kosten: null as number | null,
  /** Vanaf dit bedrag (excl. btw) gratis verzending; `null` = geen drempel. */
  gratisVanaf: null as number | null,
  /** TODO Jordan: levertijd bevestigen (hangt af van dropship of eigen voorraad). */
  levertijd: '',
};
