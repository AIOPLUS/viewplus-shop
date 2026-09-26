/**
 * Social-mediaplatformen voor de live volgersteller, met kleur en icoon (Simple Icons).
 * `koppeling: 'direct'` = kant-en-klaar via de fabrikant (Instagram, Facebook, TikTok);
 * `'maatwerk'` = via een koppeling op maat (Zapier of API), zoals bij de teller naar keuze. Zie docs/SMIIRL-ONDERZOEK.md.
 */
export const PLATFORMEN = ['Instagram', 'Facebook', 'TikTok', 'YouTube', 'LinkedIn', 'X'] as const;
export type Platform = (typeof PLATFORMEN)[number];

export const platformStijl: Record<Platform, { icoon: string; achtergrond: string; koppeling: 'direct' | 'maatwerk'; eenheid: string }> = {
  Instagram: { icoon: 'si:instagram', achtergrond: 'linear-gradient(45deg,#feda75 0%,#fa7e1e 25%,#d62976 50%,#962fbf 75%,#4f5bd5 100%)', koppeling: 'direct', eenheid: 'volgers' },
  Facebook: { icoon: 'si:facebook', achtergrond: '#0866ff', koppeling: 'direct', eenheid: 'volgers' },
  TikTok: { icoon: 'si:tiktok', achtergrond: '#111111', koppeling: 'direct', eenheid: 'volgers' },
  YouTube: { icoon: 'si:youtube', achtergrond: '#ff0000', koppeling: 'maatwerk', eenheid: 'abonnees' },
  LinkedIn: { icoon: 'si:linkedin', achtergrond: '#0a66c2', koppeling: 'maatwerk', eenheid: 'volgers' },
  X: { icoon: 'si:x', achtergrond: '#000000', koppeling: 'maatwerk', eenheid: 'volgers' },
};
