import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://nettoyage-canape-a-domicile.fr';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
