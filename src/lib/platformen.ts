/** Social-mediaplatformen met hun kleur en icoon (Simple Icons). Gelijk in viewplus-site en viewplus-shop. */
export type Platform = 'Instagram' | 'Facebook' | 'TikTok';

export const platformStijl: Record<Platform, { icoon: string; achtergrond: string }> = {
  Instagram: { icoon: 'si:instagram', achtergrond: 'linear-gradient(45deg,#feda75 0%,#fa7e1e 25%,#d62976 50%,#962fbf 75%,#4f5bd5 100%)' },
  Facebook: { icoon: 'si:facebook', achtergrond: '#0866ff' },
  TikTok: { icoon: 'si:tiktok', achtergrond: '#111111' },
};
