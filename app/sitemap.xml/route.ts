export async function GET() {
  const baseUrl = 'https://jbb-asset-management.vercel.app'; // Update this with your actual domain

  const staticPages = [
    { url: '', lastmod: new Date().toISOString() },
    { url: '/portfolio', lastmod: new Date().toISOString() },
    { url: '/services', lastmod: new Date().toISOString() },
    { url: '/investors', lastmod: new Date().toISOString() },
    { url: '/about', lastmod: new Date().toISOString() },
    { url: '/contact', lastmod: new Date().toISOString() },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
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