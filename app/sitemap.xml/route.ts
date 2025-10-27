import { supabase } from '@/lib/supabase';

export async function GET() {
  const baseUrl = 'https://www.realestateassets.com';

  const { data: properties } = await supabase
    .from('properties')
    .select('slug, updated_at')
    .eq('published', true);

  const staticPages = [
    { url: '', lastmod: new Date().toISOString() },
    { url: '/portfolio', lastmod: new Date().toISOString() },
    { url: '/services', lastmod: new Date().toISOString() },
    { url: '/investors', lastmod: new Date().toISOString() },
    { url: '/about', lastmod: new Date().toISOString() },
    { url: '/contact', lastmod: new Date().toISOString() },
  ];

  const propertyPages = (properties || []).map((property) => ({
    url: `/portfolio/${property.slug}`,
    lastmod: property.updated_at,
  }));

  const allPages = [...staticPages, ...propertyPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.url === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
