/**
 * Merkgegevens van de View Plus Shop. Eén bron voor header, footer, schema en formulieren.
 */
export const brand = {
  id: 'viewplus',
  name: 'View Plus',
  shopName: 'View Plus Shop',
  legalName: 'View Plus', // TODO Jordan: juridische naam (zoals in KvK) invullen.
  siteUrl: 'https://shop.viewplus.io',
  /** De hoofdsite van View Plus (social media management en fotografie). */
  hoofdsiteUrl: 'https://www.viewplus.io',
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
  tagline: 'Live tellers en NFC-volgstandaards voor lokale ondernemers.',
} as const;

/**
 * Labels van AIO PLUS, hier met de shops als bestemming. Zelfde component als op de sites (LabelSwitch.astro),
 * zodat de shops van Review Plus en View Plus ook als één omgeving voelen.
 * `url` leeg = label niet tonen in de schakelaar.
 */
export const labels = [
  { id: 'reviewplus', naam: ['Review', 'Plus'], url: 'https://shop.reviewplus.io', kleur: 'var(--color-label-reviewplus)', wat: 'Reviewproducten', slogan: 'Gratis NFC-reviewkaarten voor je bedrijf.' },
  { id: 'viewplus', naam: ['View', 'Plus'], url: 'https://shop.viewplus.io', kleur: 'var(--color-label-viewplus)', wat: 'Shop', slogan: 'Live tellers en NFC-volgstandaards.' },
] as const;

/** Pagina's die in beide shops bestaan: de schakelaar blijft dan op dezelfde pagina, anders naar home. */
export const gedeeldePaden: readonly string[] = ['/'];

/** Hoofdmenu van de shop. */
export const mainNav = [
  { label: 'Shop', href: '/' },
  { label: 'Live tellers', href: '/live-volgersteller' },
  { label: 'Volgstandaard', href: '/nfc-volgstandaard' },
  { label: 'Hoe het werkt', href: '/#hoe-het-werkt' },
  { label: 'Social media', href: brand.hoofdsiteUrl },
] as const;

type Link = { label: string; href: string };

export const footerNav: { title: string; links: Link[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'Alle producten', href: '/#producten' },
      { label: 'Live volgersteller', href: '/live-volgersteller' },
      { label: 'Live teller naar keuze', href: '/live-teller-op-maat' },
      { label: 'NFC-volgstandaard', href: '/nfc-volgstandaard' },
      { label: 'Winkelwagen', href: '/winkelwagen' },
    ],
  },
  {
    title: 'View Plus',
    links: [
      { label: 'Social media management', href: `${brand.hoofdsiteUrl}/features` },
      { label: 'Prijzen', href: `${brand.hoofdsiteUrl}/plans` },
      { label: 'Over ons', href: `${brand.hoofdsiteUrl}/about` },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Service',
    links: [
      { label: 'Veelgestelde vragen', href: '/#faq' },
      { label: 'Bezorging en retour', href: '/bezorging-en-retour' },
    ],
  },
  {
    title: 'Wettelijk',
    links: [
      { label: 'Verkoopvoorwaarden', href: '/term-and-conditions' },
      { label: 'Privacyverklaring', href: '/privacy-policy' },
    ],
  },
];
