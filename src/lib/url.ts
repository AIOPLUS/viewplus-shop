import { SITE_URL, BASE_PATH } from '@/config/site';

/** Pad binnen de site, rekening houdend met BASE_PATH. url('/plans') → '/reviewplus-site/plans' op de testversie. */
export function url(path = '/'): string {
  if (/^[a-z]+:/i.test(path) || path.startsWith('#')) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (BASE_PATH === '/') return clean;
  return clean === '/' ? BASE_PATH : `${BASE_PATH}${clean}`;
}

/** Absolute URL (canonical, sitemap, schema, OG). */
export function absoluteUrl(path = '/'): string {
  if (/^[a-z]+:/i.test(path)) return path;
  return `${SITE_URL}${url(path)}`;
}

/** Een asset uit /public, met base path. */
export function asset(path: string): string {
  return url(path);
}

/** Is dit pad de huidige pagina (voor actieve menu-items)? */
export function isCurrent(current: string, href: string): boolean {
  const strip = (p: string) => p.replace(/\.html$/, '').replace(/\/+$/, '') || '/';
  const a = strip(current);
  const b = strip(url(href));
  return b === strip(url('/')) ? a === b : a === b || a.startsWith(`${b}/`);
}
