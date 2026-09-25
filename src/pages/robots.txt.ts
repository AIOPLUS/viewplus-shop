import type { APIRoute } from 'astro';
import { SITE_URL, BASE_PATH } from '@/config/site';

// De testversie (github.io) mag niet in Google komen; alleen www.viewplus.io wordt geïndexeerd.
export const GET: APIRoute = () => {
  const isLive = BASE_PATH === '/' && !SITE_URL.includes('github.io');
  const body = isLive
    ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap-index.xml\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
