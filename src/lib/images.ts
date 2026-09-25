import type { ImageMetadata } from 'astro';

const all = import.meta.glob<{ default: ImageMetadata }>('/src/assets/img/foto-*.{png,jpg,jpeg,webp}', { eager: true });

/** Foto uit src/assets/img (foto-*.jpg) op bestandsnaam, voor content-bestanden die een foto noemen. */
export function img(name: string): ImageMetadata {
  const hit = all[`/src/assets/img/${name}`];
  if (!hit) throw new Error(`Afbeelding niet gevonden: src/assets/img/${name}`);
  return hit.default;
}
