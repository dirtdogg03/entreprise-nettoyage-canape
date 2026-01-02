import { MetadataRoute } from 'next';
import { services } from '@/lib/data/services';
import { locations } from '@/lib/data/locations';
import { articles } from '@/lib/data/articles';

export const dynamic = 'force-static';

const BASE_URL = 'https://nettoyage-canape-a-domicile.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Pages statiques principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/zone-intervention`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Pages services individuels
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Pages service + ville (seulement pour nettoyage-canape et nettoyage-fauteuil)
  const servicesWithCityPages = ['nettoyage-canape', 'nettoyage-fauteuil'];
  const serviceCityPages: MetadataRoute.Sitemap = [];

  servicesWithCityPages.forEach((serviceSlug) => {
    locations.forEach((location) => {
      serviceCityPages.push({
        url: `${BASE_URL}/services/${serviceSlug}/${location.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    });
  });

  // Pages blog
  const blogPages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: article.isPillar ? 0.8 : 0.6,
  }));

  return [...staticPages, ...servicePages, ...serviceCityPages, ...blogPages];
}
