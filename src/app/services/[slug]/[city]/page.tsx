import { notFound } from 'next/navigation';
import Link from 'next/link';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/lib/data/services';
import { locations, getLocationBySlug, getAllLocationSlugs } from '@/lib/data/locations';
import { company, seoDefaults, schemaLocalBusiness } from '@/lib/data/company';
import { getCityServiceContent } from '@/lib/data/content/variations';
import CTABanner from '@/components/sections/CTABanner';
import type { Metadata } from 'next';

interface ServiceCityPageProps {
  params: Promise<{ slug: string; city: string }>;
}

export async function generateStaticParams() {
  // Seulement 2 services ont des pages par ville
  const servicesWithCityPages = ['nettoyage-canape', 'nettoyage-fauteuil'];
  const params: { slug: string; city: string }[] = [];

  servicesWithCityPages.forEach((slug) => {
    getAllLocationSlugs().forEach((city) => {
      params.push({ slug, city });
    });
  });

  return params;
}

export async function generateMetadata({ params }: ServiceCityPageProps): Promise<Metadata> {
  const { slug, city } = await params;
  const service = getServiceBySlug(slug);
  const location = getLocationBySlug(city);

  if (!service || !location) {
    return { title: 'Page non trouvée' };
  }

  const title = `${service.name} à ${location.name} (${location.postalCode})${seoDefaults.titleSuffix}`;
  const description = `${service.name} à ${location.name}. Service professionnel à domicile en ${location.department}. ${service.priceRange}. Devis gratuit. Intervention rapide.`;

  return {
    title,
    description,
    keywords: [
      `${service.name.toLowerCase()} ${location.name.toLowerCase()}`,
      `nettoyage canapé ${location.name.toLowerCase()}`,
      `nettoyage canapé ${location.postalCode}`,
      ...service.keywords,
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'fr_FR',
    },
  };
}

export default async function ServiceCityPage({ params }: ServiceCityPageProps) {
  const { slug, city } = await params;
  const service = getServiceBySlug(slug);
  const location = getLocationBySlug(city);

  if (!service || !location) {
    notFound();
  }

  // Get nearby locations that have the same service
  const nearbyLocations = location.nearbyLocations
    .map((slug) => getLocationBySlug(slug))
    .filter((loc): loc is NonNullable<typeof loc> => loc !== undefined);

  // Get other services in same category
  const relatedServices = services
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  // Get city-specific content variations
  const cityContent = getCityServiceContent(city, slug);

  // Si pas de contenu pour cette combinaison, 404
  if (!cityContent) {
    notFound();
  }

  // Schema.org for this specific page
  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} à ${location.name}`,
    description: service.description,
    provider: schemaLocalBusiness,
    serviceType: service.name,
    areaServed: {
      "@type": "City",
      name: location.name,
      postalCode: location.postalCode,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: location.department,
      },
    },
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
      },
      availability: "https://schema.org/InStock",
    },
  };

  // Schema.org BreadcrumbList
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: `https://${company.domain}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `https://${company.domain}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `https://${company.domain}/services/${service.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: location.name,
      },
    ],
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />

      {/* Hero Section */}
      <section className="bg-slate-deep py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Link href="/services" className="font-mono text-xs text-gold uppercase tracking-[0.2em] hover:underline">
              Services
            </Link>
            <span className="text-white/50">/</span>
            <Link href={`/services/${service.slug}`} className="font-mono text-xs text-gold uppercase tracking-[0.2em] hover:underline">
              {service.name}
            </Link>
            <span className="text-white/50">/</span>
            <span className="font-mono text-xs text-white/70 uppercase tracking-[0.2em]">
              {location.name}
            </span>
          </div>
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-black leading-tight tracking-[-2px] text-white mb-6">
            {service.name} à <span className="text-gold">{location.name}</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed mb-4">
            Service professionnel de {service.name.toLowerCase()} à domicile à {location.name} ({location.postalCode}).
            Intervention rapide en {location.department}.
          </p>
          {location.localInfo.description && (
            <p className="text-lg text-white/60 max-w-2xl">
              {location.localInfo.description}
            </p>
          )}
          <div className="flex flex-wrap gap-6 mt-10">
            <div className="bg-white/10 px-6 py-4 rounded-lg">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-1">Tarif</span>
              <span className="text-white font-bold text-lg">{service.priceRange}</span>
            </div>
            <div className="bg-white/10 px-6 py-4 rounded-lg">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-1">Durée</span>
              <span className="text-white font-bold text-lg">{service.duration}</span>
            </div>
            <div className="bg-white/10 px-6 py-4 rounded-lg">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-1">Zone</span>
              <span className="text-white font-bold text-lg">{location.department} ({location.departmentCode})</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-black tracking-tight mb-6">
                Votre spécialiste du {service.name.toLowerCase()} à {location.name}
              </h2>
              <div className="prose prose-lg max-w-none text-slate-deep/80">
                {/* Introduction locale unique */}
                <p className="text-lg leading-relaxed">
                  {cityContent.localIntro}
                </p>

                <p>
                  {service.description}
                </p>

                {/* Défis spécifiques à la ville */}
                <h3 className="text-xl font-bold text-slate-deep mt-8 mb-4">
                  Les défis spécifiques à {location.name}
                </h3>
                <p>
                  {cityContent.challenges}
                </p>

                <h3 className="text-xl font-bold text-slate-deep mt-8 mb-4">
                  Pourquoi choisir notre service à {location.name} ?
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-gold font-bold">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3">
                    <span className="text-gold font-bold">✓</span>
                    <span>Intervention rapide à {location.name} et environs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold font-bold">✓</span>
                    <span>Devis gratuit et sans engagement</span>
                  </li>
                </ul>

                {/* Témoignage client local */}
                <div className="bg-pearlescent p-8 rounded-2xl my-10 not-prose">
                  <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">
                    Témoignage Client
                  </span>
                  <blockquote className="text-lg italic text-slate-deep/80 mb-4">
                    &ldquo;{cityContent.testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center text-gold font-bold">
                      {cityContent.testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-deep">{cityContent.testimonial.name}</p>
                      <p className="text-sm text-slate-deep/60">{cityContent.testimonial.neighborhood}, {location.name}</p>
                    </div>
                  </div>
                </div>

                {/* Conseils locaux */}
                <h3 className="text-xl font-bold text-slate-deep mt-8 mb-4">
                  Nos conseils pour {location.name}
                </h3>
                <p>
                  {cityContent.localTips}
                </p>

                {location.localInfo.landmarks && location.localInfo.landmarks.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold text-slate-deep mt-8 mb-4">
                      Nous intervenons dans tout {location.name}
                    </h3>
                    <p>
                      Notre équipe se déplace dans tous les quartiers de {location.name}, que vous habitiez
                      près de {location.localInfo.landmarks.join(', ')} ou dans tout autre secteur de la ville.
                    </p>
                  </>
                )}

                <h3 className="text-xl font-bold text-slate-deep mt-8 mb-4">
                  Comment se déroule l&apos;intervention ?
                </h3>
                <ol className="space-y-3">
                  <li><strong>1. Contact et devis</strong> : Appelez-nous ou remplissez notre formulaire pour obtenir un devis gratuit.</li>
                  <li><strong>2. Rendez-vous</strong> : Nous convenons d&apos;un créneau horaire qui vous convient à {location.name}.</li>
                  <li><strong>3. Intervention</strong> : Notre technicien se déplace avec tout le matériel nécessaire.</li>
                  <li><strong>4. Résultat</strong> : Votre canapé retrouve sa propreté, prêt à l&apos;usage en quelques heures.</li>
                </ol>

                {/* Statistiques locales */}
                <div className="bg-slate-deep text-white p-8 rounded-2xl my-10 not-prose">
                  <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">
                    Chiffres clés à {location.name}
                  </span>
                  <p className="text-white/80">
                    {cityContent.stats}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-pearlescent p-8 rounded-2xl sticky top-32">
                <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">
                  Devis Gratuit
                </span>
                <h3 className="text-2xl font-bold mb-4">
                  {service.name} à {location.name}
                </h3>
                <p className="text-slate-deep/70 mb-6">
                  Contactez-nous pour un devis gratuit et personnalisé.
                </p>
                <div className="space-y-4">
                  <a
                    href={`tel:${company.phone.replace(/\s/g, '')}`}
                    className="btn-luxury w-full text-center block"
                  >
                    {company.phone}
                  </a>
                  <Link
                    href="/contact"
                    className="block w-full text-center py-4 px-6 border-2 border-slate-deep text-slate-deep font-bold uppercase tracking-wider text-sm hover:bg-slate-deep hover:text-white transition-colors"
                  >
                    Formulaire de contact
                  </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-deep/10">
                  <span className="font-mono text-xs text-slate-deep/50 uppercase tracking-[0.2em] block mb-4">
                    Informations
                  </span>
                  <ul className="space-y-3 text-sm text-slate-deep/70">
                    <li><strong>Tarif :</strong> {service.priceRange}</li>
                    <li><strong>Durée :</strong> {service.duration}</li>
                    <li><strong>Zone :</strong> {location.name} ({location.postalCode})</li>
                    <li><strong>Département :</strong> {location.department}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Locations */}
      {nearbyLocations.length > 0 && (
        <section className="py-24 bg-pearlescent">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">
              Villes proches
            </span>
            <h2 className="text-3xl font-black tracking-tight mb-4">
              {service.name} autour de {location.name}
            </h2>
            <p className="text-slate-deep/70 text-lg mb-10">
              Nous intervenons également dans les villes voisines de {location.name}.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {nearbyLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/services/${service.slug}/${loc.slug}`}
                  className="bg-white p-6 rounded-lg hover:shadow-lg transition-shadow group"
                >
                  <span className="font-mono text-xs text-gold uppercase tracking-wider block mb-2">
                    {loc.departmentCode}
                  </span>
                  <span className="font-bold text-lg text-slate-deep group-hover:text-gold transition-colors block">
                    {loc.name}
                  </span>
                  <span className="text-sm text-slate-deep/50">{loc.postalCode}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">
              Autres services
            </span>
            <h2 className="text-3xl font-black tracking-tight mb-10">
              Nos autres services à {location.name}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService) => (
                <Link
                  key={relatedService.slug}
                  href={
                    ['nettoyage-canape', 'nettoyage-fauteuil'].includes(relatedService.slug)
                      ? `/services/${relatedService.slug}/${location.slug}`
                      : `/services/${relatedService.slug}`
                  }
                  className="group block"
                >
                  <div className="bg-pearlescent p-8 rounded-2xl h-full hover:shadow-lg transition-shadow">
                    <span className="font-mono text-xs text-gold uppercase tracking-wider block mb-4">
                      {relatedService.category}
                    </span>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-gold transition-colors">
                      {relatedService.name}
                    </h3>
                    <p className="text-slate-deep/70 mb-4">{relatedService.shortDescription}</p>
                    <span className="font-mono text-sm text-gold">{relatedService.priceRange}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
