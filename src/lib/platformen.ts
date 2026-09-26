/**
 * Social-mediaplatformen voor de live volgersteller.
 * - `icoon`: eenkleurig icoon (Simple Icons) voor knoppen en keuzepillen;
 * - `logo`: het logo zoals het op de houten teller staat (in kleur, zonder tegel);
 * - `flap`: kleur van de klapcijfers (boven- en onderhelft), zoals bij de echte tellers. Die kleuren zijn niet aan te
 *   passen (afspraak van Smiirl met Meta en TikTok). YouTube, LinkedIn en X lopen via de Custom Counter: zwarte cijfers.
 * - `koppeling: 'direct'` = kant-en-klaar via de fabrikant (Instagram, Facebook, TikTok);
 *   `'maatwerk'` = via een koppeling op maat (Zapier of API), zoals bij de teller naar keuze. Zie docs/SMIIRL-ONDERZOEK.md.
 */
export const PLATFORMEN = ['Instagram', 'Facebook', 'TikTok', 'YouTube', 'LinkedIn', 'X'] as const;
export type Platform = (typeof PLATFORMEN)[number];

/** Zwarte klapcijfers: TikTok, de teller naar keuze en alles wat via de Custom Counter loopt. */
export const FLAP_ZWART: readonly [string, string] = ['#2e2e2e', '#141414'];

export const platformStijl: Record<
  Platform,
  { icoon: string; logo: string; flap: readonly [string, string]; koppeling: 'direct' | 'maatwerk'; eenheid: string }
> = {
  Instagram: { icoon: 'si:instagram', logo: 'instagram-verloop', flap: ['#ec4f95', '#c42f7c'], koppeling: 'direct', eenheid: 'volgers' },
  Facebook: { icoon: 'si:facebook', logo: 'logos:facebook', flap: ['#2f86ff', '#0a5ad8'], koppeling: 'direct', eenheid: 'volgers' },
  TikTok: { icoon: 'si:tiktok', logo: 'logos:tiktok-icon', flap: FLAP_ZWART, koppeling: 'direct', eenheid: 'volgers' },
  YouTube: { icoon: 'si:youtube', logo: 'logos:youtube-icon', flap: FLAP_ZWART, koppeling: 'maatwerk', eenheid: 'abonnees' },
  LinkedIn: { icoon: 'si:linkedin', logo: 'logos:linkedin-icon', flap: FLAP_ZWART, koppeling: 'maatwerk', eenheid: 'volgers' },
  X: { icoon: 'si:x', logo: 'logos:x', flap: FLAP_ZWART, koppeling: 'maatwerk', eenheid: 'volgers' },
};
