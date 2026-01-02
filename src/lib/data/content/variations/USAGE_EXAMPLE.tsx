/**
 * EXEMPLE D'UTILISATION DES VARIATIONS DE CONTENU
 *
 * Ce fichier montre comment intégrer le contenu unique
 * dans vos pages service+ville
 */

import { getCityServiceContent } from './city-service-content';
import { getServiceBySlug } from '@/lib/data/services';
import { getLocationBySlug } from '@/lib/data/locations';

// ============================================
// EXEMPLE 1: Page Service + Ville
// ============================================

interface ServiceCityPageProps {
  params: {
    serviceSlug: string;
    citySlug: string;
  };
}

export default function ServiceCityPage({ params }: ServiceCityPageProps) {
  const { serviceSlug, citySlug } = params;

  // Récupérer les données de base
  const service = getServiceBySlug(serviceSlug);
  const location = getLocationBySlug(citySlug);
  const variation = getCityServiceContent(citySlug, serviceSlug);

  if (!service || !location || !variation) {
    return <div>Page non trouvée</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {service.name} à {location.name}
        </h1>

        {/* Introduction Locale Unique */}
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed">
            {variation.localIntro}
          </p>
        </div>
      </section>

      {/* Section Défis & Expertise */}
      <section className="mb-12 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Nos Solutions à {location.name}
        </h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {variation.challenges}
          </p>
        </div>
      </section>

      {/* Témoignage Client Local */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Témoignage Client - {location.name}
        </h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-700">
                  {variation.testimonial.name.charAt(0)}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <p className="italic text-gray-700 mb-3">
                &quot;{variation.testimonial.quote}&quot;
              </p>
              <p className="font-semibold text-gray-900">
                {variation.testimonial.name}
              </p>
              <p className="text-sm text-gray-600">
                {variation.testimonial.neighborhood}, {location.name}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conseils Locaux */}
      <section className="mb-12 bg-green-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Nos Conseils pour {location.name}
        </h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {variation.localTips}
          </p>
        </div>
      </section>

      {/* Statistiques Locales */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Nos Interventions à {location.name}
        </h2>
        <div className="bg-gray-100 p-6 rounded-lg">
          <p className="text-gray-700 leading-relaxed">
            {variation.stats}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">
          Besoin de {service.name} à {location.name} ?
        </h2>
        <p className="text-xl mb-6">
          Intervention rapide • Devis gratuit • Satisfaction garantie
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
          Demander un Devis Gratuit
        </button>
      </section>
    </div>
  );
}

// ============================================
// EXEMPLE 2: Composant Réutilisable
// ============================================

interface LocalContentSectionProps {
  citySlug: string;
  serviceSlug: string;
  section: 'intro' | 'challenges' | 'testimonial' | 'tips' | 'stats';
}

export function LocalContentSection({
  citySlug,
  serviceSlug,
  section
}: LocalContentSectionProps) {
  const variation = getCityServiceContent(citySlug, serviceSlug);

  if (!variation) return null;

  switch (section) {
    case 'intro':
      return <p className="text-lg">{variation.localIntro}</p>;

    case 'challenges':
      return <p>{variation.challenges}</p>;

    case 'testimonial':
      return (
        <blockquote className="border-l-4 border-blue-500 pl-4 italic">
          <p>&quot;{variation.testimonial.quote}&quot;</p>
          <footer className="mt-2 font-semibold">
            — {variation.testimonial.name}, {variation.testimonial.neighborhood}
          </footer>
        </blockquote>
      );

    case 'tips':
      return <p>{variation.localTips}</p>;

    case 'stats':
      return <p className="font-semibold">{variation.stats}</p>;

    default:
      return null;
  }
}

// ============================================
// EXEMPLE 3: Métadonnées SEO Uniques
// ============================================

export function generateMetadata({ params }: ServiceCityPageProps) {
  const { serviceSlug, citySlug } = params;
  const service = getServiceBySlug(serviceSlug);
  const location = getLocationBySlug(citySlug);
  const variation = getCityServiceContent(citySlug, serviceSlug);

  if (!service || !location || !variation) {
    return {};
  }

  // Extraire les 160 premiers caractères de l'intro pour la meta description
  const metaDescription = variation.localIntro.slice(0, 157) + '...';

  return {
    title: `${service.name} ${location.name} | Devis Gratuit 24h`,
    description: metaDescription,

    openGraph: {
      title: `${service.name} à ${location.name}`,
      description: metaDescription,
      type: 'website',
    },

    alternates: {
      canonical: `/services/${serviceSlug}/${citySlug}`,
    },

    // Schema.org LocalBusiness
    other: {
      'schema:LocalBusiness': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: `Nettoyage Canapé - ${location.name}`,
        description: variation.localIntro,
        address: {
          '@type': 'PostalAddress',
          addressLocality: location.name,
          postalCode: location.postalCode,
        },
        review: {
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: variation.testimonial.name,
          },
          reviewBody: variation.testimonial.quote,
        },
      }),
    },
  };
}

// ============================================
// EXEMPLE 4: Vérification de Disponibilité
// ============================================

import { hasCityServiceContent, getAvailableCities } from './city-service-content';

export function isServiceAvailableInCity(serviceSlug: string, citySlug: string): boolean {
  return hasCityServiceContent(citySlug, serviceSlug);
}

export function getServiceCitiesMenu() {
  const cities = getAvailableCities();

  return cities.map(citySlug => {
    const location = getLocationBySlug(citySlug);
    return {
      slug: citySlug,
      name: location?.name || citySlug,
      hasContent: true,
    };
  });
}

// ============================================
// EXEMPLE 5: Sitemap Dynamique
// ============================================

import { getAllServiceSlugs } from '@/lib/data/services';

export function generateServiceCitySitemapUrls() {
  const services = getAllServiceSlugs();
  const cities = getAvailableCities();

  const urls: Array<{ url: string; lastModified: Date }> = [];

  services.forEach(serviceSlug => {
    cities.forEach(citySlug => {
      if (hasCityServiceContent(citySlug, serviceSlug)) {
        urls.push({
          url: `https://votresite.fr/services/${serviceSlug}/${citySlug}`,
          lastModified: new Date(),
        });
      }
    });
  });

  return urls;
}

// ============================================
// EXEMPLE 6: Tests de Qualité
// ============================================

export function testContentQuality(citySlug: string, serviceSlug: string) {
  const variation = getCityServiceContent(citySlug, serviceSlug);

  if (!variation) {
    return { valid: false, errors: ['Contenu non trouvé'] };
  }

  const errors: string[] = [];

  // Vérifier longueur minimale
  if (variation.localIntro.length < 200) {
    errors.push('Introduction trop courte (min 200 caractères)');
  }

  if (variation.challenges.length < 200) {
    errors.push('Section défis trop courte (min 200 caractères)');
  }

  if (variation.testimonial.quote.length < 150) {
    errors.push('Témoignage trop court (min 150 caractères)');
  }

  if (variation.localTips.length < 150) {
    errors.push('Conseils trop courts (min 150 caractères)');
  }

  // Vérifier présence du nom de ville
  const location = getLocationBySlug(citySlug);
  if (location && !variation.localIntro.includes(location.name)) {
    errors.push('Le nom de la ville doit apparaître dans l\'introduction');
  }

  // Vérifier que le témoignage a un quartier réel
  if (variation.testimonial.neighborhood.length < 3) {
    errors.push('Le témoignage doit mentionner un quartier spécifique');
  }

  return {
    valid: errors.length === 0,
    errors,
    stats: {
      totalLength:
        variation.localIntro.length +
        variation.challenges.length +
        variation.testimonial.quote.length +
        variation.localTips.length +
        variation.stats.length,
      sections: 5,
    },
  };
}

// ============================================
// EXEMPLE 7: Debug / Administration
// ============================================

export function debugContentVariation(citySlug: string, serviceSlug: string) {
  const variation = getCityServiceContent(citySlug, serviceSlug);
  const service = getServiceBySlug(serviceSlug);
  const location = getLocationBySlug(citySlug);

  console.group(`Content Variation: ${citySlug} / ${serviceSlug}`);
  console.log('Service:', service?.name);
  console.log('Location:', location?.name);
  console.log('Has Content:', !!variation);

  if (variation) {
    console.log('Intro Length:', variation.localIntro.length);
    console.log('Challenges Length:', variation.challenges.length);
    console.log('Testimonial:', variation.testimonial.name);
    console.log('Total Characters:',
      variation.localIntro.length +
      variation.challenges.length +
      variation.testimonial.quote.length +
      variation.localTips.length +
      variation.stats.length
    );
  }

  console.groupEnd();
}
