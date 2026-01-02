import { MetadataRoute } from 'next';
import { company } from '@/lib/data/company';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: company.shortName,
    description: company.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fcfaf7',
    theme_color: '#b8860b',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'fr',
    categories: ['business', 'services'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
