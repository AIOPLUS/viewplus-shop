import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { producten, sectoren, prijsLabel } from '@/lib/catalog';

/**
 * Open Graph-afbeeldingen (1200×630) per product en branchepagina, zoals in de Review Plus-shop.
 * Er zijn nog geen productfoto's: de teller wordt als vector getekend.
 */
type Og = { title: string; sub: string; badge: string; beeld: 'teller' | 'teller-op-maat' };

export const getStaticPaths: GetStaticPaths = async () => {
  const [lijst, branches] = await Promise.all([producten(), sectoren()]);
  const paths: { params: { slug: string }; props: Og }[] = [];
  for (const p of lijst) {
    const prijs = prijsLabel(p);
    paths.push({
      params: { slug: p.data.slug },
      props: { title: p.data.naam, sub: prijs === 'Prijs volgt' ? 'View Plus Shop · NL & BE' : `${prijs} excl. btw · View Plus Shop`, badge: p.data.visual === 'teller-op-maat' ? 'Eigen getal' : '6 platformen', beeld: p.data.visual },
    });
  }
  for (const s of branches) {
    paths.push({ params: { slug: `voor-${s.data.slug}` }, props: { title: s.data.heroTitel, sub: 'Live volgerstellers · 6 platformen · NL & BE', badge: s.data.naam, beeld: 'teller' } });
  }
  return paths;
};

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

function wrap(text: string, max: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max && line) {
      lines.push(line);
      line = w;
    } else line = `${line} ${w}`.trim();
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

const LOGO = '<path d="M0 0H386V410A386 410 0 0 1 0 0Z"/><rect x="520" width="386" height="410"/><path d="M386 548V958H0A386 410 0 0 1 386 548Z"/><rect x="520" y="548" width="386" height="410"/>';
const FONT = 'Poppins, Arial, sans-serif';
const PANEEL = { x: 700, y: 60, w: 440, h: 510 };

/** Teller zoals de echte: Instagram-logo op het hout met roze klapcijfers, of "Jouw logo" met zwarte cijfers. */
function teller(opMaat: boolean): string {
  const fw = 52, fh = 70, gap = 8;
  const w = 2 * 22 + 6 * fw + 5 * gap, h = fh + 40;
  const x0 = PANEEL.x + (PANEEL.w - w) / 2, y0 = PANEEL.y + (PANEEL.h - h) / 2;
  const cijfers = opMaat ? ['', '', '4', '8', '6'] : ['', '1', '2', '4', '8'];
  const tegel = opMaat
    ? `<circle cx="${x0 + 22 + fw / 2}" cy="${y0 + 20 + fh / 2}" r="${fw / 2 - 2}" fill="none" stroke="#150E08" stroke-width="2" stroke-dasharray="5 4"/><text x="${x0 + 22 + fw / 2}" y="${y0 + 20 + fh / 2 - 2}" font-family="${FONT}" font-size="10" font-weight="700" fill="#150E08" text-anchor="middle">JOUW</text><text x="${x0 + 22 + fw / 2}" y="${y0 + 20 + fh / 2 + 10}" font-family="${FONT}" font-size="10" font-weight="700" fill="#150E08" text-anchor="middle">LOGO</text>`
    : `<rect x="${x0 + 22 + 4}" y="${y0 + 20 + 17}" width="44" height="44" rx="13" fill="none" stroke="url(#insta)" stroke-width="5"/><circle cx="${x0 + 22 + 26}" cy="${y0 + 20 + 39}" r="10.5" fill="none" stroke="url(#insta)" stroke-width="5"/><circle cx="${x0 + 22 + 38.5}" cy="${y0 + 20 + 26.5}" r="3" fill="#d62976"/>`;
  const flappen = cijfers.map((c, i) => {
    const x = x0 + 22 + (i + 1) * (fw + gap);
    return `<rect x="${x}" y="${y0 + 20}" width="${fw}" height="${fh}" rx="8" fill="url(#${opMaat ? 'flap-zwart' : 'flap-insta'})"/><rect x="${x}" y="${y0 + 20 + fh / 2 - 1}" width="${fw}" height="2" fill="#000" opacity=".35"/>` +
      (c ? `<text x="${x + fw / 2}" y="${y0 + 20 + fh / 2 + 13}" font-family="${FONT}" font-size="38" font-weight="600" fill="#fff" text-anchor="middle">${c}</text>` : '');
  }).join('');
  return `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="14" fill="url(#hout)"/>${tegel}${flappen}`;
}

export const GET: APIRoute = async ({ props }) => {
  const { title, sub, badge, beeld } = props as Og;
  const lines = wrap(title, 17);
  const titleY = 285;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="hout" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6ECDD"/><stop offset="1" stop-color="#EAD8BD"/></linearGradient>
    <linearGradient id="flap-insta" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F06FA8"/><stop offset=".49" stop-color="#EC4F95"/><stop offset=".51" stop-color="#C42F7C"/><stop offset="1" stop-color="#A12766"/></linearGradient>
    <linearGradient id="flap-zwart" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4A4A4A"/><stop offset=".49" stop-color="#2E2E2E"/><stop offset=".51" stop-color="#141414"/><stop offset="1" stop-color="#050505"/></linearGradient>
    <linearGradient id="insta" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#FEDA75"/><stop offset=".3" stop-color="#FA7E1E"/><stop offset=".55" stop-color="#D62976"/><stop offset=".8" stop-color="#962FBF"/><stop offset="1" stop-color="#4F5BD5"/></linearGradient>
    <radialGradient id="podium" cx="50%" cy="25%" r="90%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#F7E7FD"/><stop offset="1" stop-color="#ECCDFA"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#ffffff"/>
  <path d="M0 630V545A150 85 0 0 1 150 630Z" fill="#7A01B0"/>
  <g stroke="#ffffff" stroke-opacity=".25" stroke-width="2">${[40, 90].map((x) => `<path d="M${x} 560V630"/>`).join('')}<path d="M0 595H130"/></g>
  <g transform="translate(80 64) scale(0.0438)" fill="#7A01B0">${LOGO}</g>
  <text x="136" y="100" font-family="${FONT}" font-size="40" fill="#150E08"><tspan font-weight="700">View</tspan> Plus</text>
  <rect x="80" y="150" rx="22" ry="22" width="${Math.max(120, badge.length * 15 + 44)}" height="44" fill="#F7E7FD"/>
  <text x="102" y="180" font-family="${FONT}" font-size="22" font-weight="600" fill="#63008F">${esc(badge)}</text>
  ${lines.map((l, i) => `<text x="80" y="${titleY + i * 64}" font-family="${FONT}" font-size="54" font-weight="700" fill="#150E08">${esc(l)}</text>`).join('')}
  <text x="80" y="${titleY + lines.length * 64 + 8}" font-family="${FONT}" font-size="26" fill="#4b5563">${esc(sub)}</text>
  <rect x="${PANEEL.x}" y="${PANEEL.y}" width="${PANEEL.w}" height="${PANEEL.h}" rx="32" fill="url(#podium)"/>
  ${teller(beeld === 'teller-op-maat')}
</svg>`;
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
