/**
 * Live teller (components/shop/Teller.astro) aansturen in de browser:
 * - setTeller: naar een nieuw getal klappen, cijfer voor cijfer;
 * - zetPlatform: de tegel links wisselen (icoon en kleur, of "Jouw logo");
 * - zetCijfers: tussen 5 en 7 cijfers wisselen.
 * Zonder animatie als de bezoeker minder beweging wil.
 */
export interface PlatformIcoon {
  viewBox: string;
  body: string;
  achtergrond: string;
}

const rustig = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export async function setTeller(kast: HTMLElement, waarde: number): Promise<void> {
  const cijfers = Number(kast.dataset.cijfers ?? 5);
  const tekst = String(Math.max(0, Math.min(waarde, 10 ** cijfers - 1))).padStart(cijfers, ' ');
  kast.dataset.waarde = String(waarde);
  const flappen = [...kast.querySelectorAll<HTMLElement>('.teller-flap > span')];
  await Promise.all(
    flappen.map(async (el, i) => {
      const nieuw = tekst[i]!.trim();
      if (el.textContent === nieuw) return;
      if (rustig() || !el.animate) {
        el.textContent = nieuw;
        return;
      }
      await el.animate([{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(90deg)' }], { duration: 110, easing: 'ease-in' }).finished;
      el.textContent = nieuw;
      await el.animate([{ transform: 'rotateX(-90deg)' }, { transform: 'rotateX(0deg)' }], { duration: 160, easing: 'ease-out' }).finished;
    }),
  );
}

export function zetPlatform(kast: HTMLElement, platform: string, iconen: Record<string, PlatformIcoon>): void {
  const tegel = kast.querySelector<HTMLElement>('.teller-icoon');
  if (!tegel) return;
  kast.dataset.platform = platform;
  const icoon = iconen[platform];
  if (icoon) {
    tegel.removeAttribute('data-op-maat');
    tegel.style.background = icoon.achtergrond;
    tegel.innerHTML = `<svg viewBox="${icoon.viewBox}" fill="#fff" style="color:#fff">${icoon.body}</svg>`;
  } else {
    tegel.setAttribute('data-op-maat', '');
    tegel.style.background = '';
    tegel.innerHTML = '<span class="teller-logo">Jouw<br>logo</span>';
  }
  const wrap = kast.closest<HTMLElement>('[data-teller-wrap]');
  if (wrap) wrap.setAttribute('aria-label', `Illustratie van een live teller met ${kast.dataset.cijfers} cijfers${icoon ? ` voor ${platform}` : ' met je eigen logo'}`);
}

export function zetCijfers(kast: HTMLElement, cijfers: 5 | 7): void {
  if (Number(kast.dataset.cijfers) === cijfers) return;
  kast.dataset.cijfers = String(cijfers);
  kast.style.aspectRatio = `${cijfers === 5 ? 42 : 56.4}/10.5`;
  const tekst = String(Math.min(Number(kast.dataset.waarde ?? 0), 10 ** cijfers - 1)).padStart(cijfers, ' ');
  kast.querySelectorAll('.teller-flap').forEach((f) => f.remove());
  for (const c of tekst) {
    const flap = document.createElement('span');
    flap.className = 'teller-flap';
    flap.setAttribute('aria-hidden', 'true');
    const cijfer = document.createElement('span');
    cijfer.textContent = c.trim();
    flap.append(cijfer);
    kast.append(flap);
  }
}
