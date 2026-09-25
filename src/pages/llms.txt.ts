import type { APIRoute } from 'astro';
import { brand } from '@/config/brand';
import { faq } from '@/config/content';
import { producten, prijsLabel } from '@/lib/catalog';
import { absoluteUrl } from '@/lib/url';

/** Samenvatting van de shop voor AI-assistenten (llmstxt.org). */
export const GET: APIRoute = async () => {
  const lijst = await producten();
  const lines = [
    `# ${brand.shopName}`,
    '',
    '> De View Plus Shop verkoopt live volgerstellers met mechanische klapcijfers (Instagram, Facebook, TikTok of een getal naar keuze, zoals Google-reviews) en NFC-volgstandaards waarmee klanten met één tik een bedrijf volgen. Voor lokale ondernemers in Nederland en België.',
    '',
    '## Producten',
    ...lijst.map((p) => `- [${p.data.naam}](${absoluteUrl(`/${p.data.slug}`)}): ${p.data.kort} Prijs: ${prijsLabel(p)}${prijsLabel(p) === 'Prijs volgt' ? '' : ' excl. btw'}.`),
    '',
    '## Meer van View Plus',
    `- [Social media management en fotografie](${brand.hoofdsiteUrl})`,
    `- [Advies en contact](${absoluteUrl('/contact')})`,
    '',
    '## Veelgestelde vragen',
    ...faq.flatMap((f) => [`### ${f.vraag}`, f.antwoord, '']),
    `Contact: ${brand.email}`,
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
