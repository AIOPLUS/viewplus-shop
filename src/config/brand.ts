/**
 * Merkgegevens van de View Plus Shop. Eén bron voor header, footer, schema en formulieren.
 */
export const brand = {
  id: 'viewplus',
  name: 'View Plus',
  shopName: 'View Plus Shop',
  legalName: 'View Plus', // TODO Jordan: juridische naam (zoals in KvK) invullen.
  siteUrl: 'https://shop.viewplus.io',
  /**
   * De hoofdsite van View Plus. Uit de GitHub-variabele PUBLIC_HOOFDSITE_URL:
   * testversie https://aioplus.github.io/viewplus-site, live https://www.viewplus.io (standaard).
   */
  hoofdsiteUrl: (import.meta.env.PUBLIC_HOOFDSITE_URL || 'https://www.viewplus.io').replace(/\/+$/, ''),
  /**
   * Inloggen op View Plus Online (komt later op app.viewplus.io). Uit PUBLIC_APP_LOGIN_URL; leeg = de tijdelijke
   * inlogpagina op de hoofdsite.
   */
  appLoginUrl: (import.meta.env.PUBLIC_APP_LOGIN_URL || `${(import.meta.env.PUBLIC_HOOFDSITE_URL || 'https://www.viewplus.io').replace(/\/+$/, '')}/login`).replace(/\/+$/, ''),
  // LET OP: deze mailbox is nog niet actief (25-09-2026). Activeer hem vóór de livegang.
  email: 'support@viewplus.io',
  /** Rasterlogo voor schema.org/Google (min. 112px). Icoon zelf: components/layout/Logo.astro */
  logo: '/assets/brand/logo-512.png',
  /** Kleur van de adresbalk op telefoons (= brand-600). */
  themeColor: '#7A01B0',
  // TODO Jordan: echte profielen invullen; lege profielen worden niet getoond.
  social: {
    instagram: '',
    facebook: '',
    tiktok: '',
    linkedin: '',
  },
  slogan: 'Maak je volgers zichtbaar.',
  tagline: 'Live volgerstellers voor lokale ondernemers.',
} as const;

/**
 * Labels van AIO PLUS, hier met de shops als bestemming. Zelfde component als op de sites (LabelSwitch.astro),
 * zodat de shops van Review Plus en View Plus ook als één omgeving voelen.
 * `url` leeg = label niet tonen in de schakelaar.
 */
export const labels = [
  { id: 'reviewplus', naam: ['Review', 'Plus'], url: 'https://shop.reviewplus.io', kleur: 'var(--color-label-reviewplus)', wat: 'Reviewproducten', slogan: 'Gratis NFC-reviewkaarten voor je bedrijf.' },
  { id: 'viewplus', naam: ['View', 'Plus'], url: 'https://shop.viewplus.io', kleur: 'var(--color-label-viewplus)', wat: 'Shop', slogan: 'Live volgerstellers voor je zaak.' },
] as const;

/** Pagina's die in beide shops bestaan: de schakelaar blijft dan op dezelfde pagina, anders naar home. */
export const gedeeldePaden: readonly string[] = ['/'];

/** Navigatie gelijk aan www.viewplus.io (zoals de Review Plus-shop de navigatie van www.reviewplus.io volgt). */
export const mainNav = [
  { label: 'Home', href: `${brand.hoofdsiteUrl}/` },
  { label: 'Diensten', href: `${brand.hoofdsiteUrl}/features` },
  { label: 'Prijzen', href: `${brand.hoofdsiteUrl}/plans` },
  { label: 'Over ons', href: `${brand.hoofdsiteUrl}/about` },
  { label: 'Kennisbank', href: `${brand.hoofdsiteUrl}/articles` },
] as const;

export const footerNav = [
  {
    title: 'Bedrijf',
    links: [
      { label: 'Home', href: `${brand.hoofdsiteUrl}/` },
      { label: 'Over ons', href: `${brand.hoofdsiteUrl}/about` },
      { label: 'Contact', href: `${brand.hoofdsiteUrl}/contact` },
      { label: 'Kennisbank', href: `${brand.hoofdsiteUrl}/articles` },
    ],
  },
  {
    title: 'Shop',
    links: [
      { label: 'Alle producten', href: '/', internal: true },
      { label: 'Live volgersteller', href: '/live-volgersteller', internal: true },
      { label: 'Live teller naar keuze', href: '/live-teller-op-maat', internal: true },
      { label: 'Winkelwagen', href: '/winkelwagen', internal: true },
      { label: 'Advies of offerte', href: '/contact', internal: true },
    ],
  },
  {
    title: 'Per platform',
    links: [
      { label: 'Instagram', href: '/volgersteller/instagram', internal: true },
      { label: 'Facebook', href: '/volgersteller/facebook', internal: true },
      { label: 'TikTok', href: '/volgersteller/tiktok', internal: true },
      { label: 'YouTube', href: '/volgersteller/youtube', internal: true },
      { label: 'LinkedIn', href: '/volgersteller/linkedin', internal: true },
      { label: 'X', href: '/volgersteller/x', internal: true },
    ],
  },
  {
    title: 'Wettelijk',
    links: [
      { label: 'Verkoopvoorwaarden', href: '/term-and-conditions', internal: true },
      { label: 'Bezorging en retour', href: '/bezorging-en-retour', internal: true },
      { label: 'Privacyverklaring', href: '/privacy-policy', internal: true },
    ],
  },
] as const;
