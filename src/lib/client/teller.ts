/**
 * Laat een live teller (components/shop/Teller.astro) naar een nieuw getal klappen, cijfer voor cijfer.
 * Zonder animatie als de bezoeker minder beweging wil.
 */
export async function setTeller(kast: HTMLElement, waarde: number): Promise<void> {
  const cijfers = Number(kast.dataset.cijfers ?? 5);
  const tekst = String(Math.max(0, Math.min(waarde, 10 ** cijfers - 1))).padStart(cijfers, ' ');
  kast.dataset.waarde = String(waarde);
  const flappen = [...kast.querySelectorAll<HTMLElement>('.teller-flap > span')];
  const rustig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  await Promise.all(
    flappen.map(async (el, i) => {
      const nieuw = tekst[i]!.trim();
      if (el.textContent === nieuw) return;
      if (rustig || !el.animate) {
        el.textContent = nieuw;
        return;
      }
      await el.animate([{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(90deg)' }], { duration: 110, easing: 'ease-in' }).finished;
      el.textContent = nieuw;
      await el.animate([{ transform: 'rotateX(-90deg)' }, { transform: 'rotateX(0deg)' }], { duration: 160, easing: 'ease-out' }).finished;
    }),
  );
}
