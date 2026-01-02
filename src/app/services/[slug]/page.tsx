import { notFound } from 'next/navigation';
import Link from 'next/link';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/lib/data/services';
import { locations } from '@/lib/data/locations';
import { company, seoDefaults } from '@/lib/data/company';
import CTABanner from '@/components/sections/CTABanner';
import type { Metadata } from 'next';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: 'Service non trouvé' };
  }

  return {
    title: `${service.name} à Domicile${seoDefaults.titleSuffix}`,
    description: `${service.description} Intervention à domicile en Île-de-France. ${service.priceRange}. Devis gratuit.`,
    keywords: service.keywords,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Get category label
  const categoryLabels: Record<string, string> = {
    canape: 'Canapé',
    siege: 'Siège',
    traitement: 'Traitement',
  };

  // Schema.org Service
  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: company.name,
      telephone: company.phone,
      email: company.email,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 48.8847,
        longitude: 2.4347,
      },
      geoRadius: "25000",
    },
    serviceType: service.name,
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
          <div className="flex items-center gap-2 mb-6">
            <Link href="/services" className="font-mono text-xs text-gold uppercase tracking-[0.2em] hover:underline">
              Services
            </Link>
            <span className="text-white/50">/</span>
            <span className="font-mono text-xs text-white/70 uppercase tracking-[0.2em]">
              {categoryLabels[service.category]}
            </span>
          </div>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-none tracking-[-2px] text-white mb-6">
            {service.name}
          </h1>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-6 mt-10">
            <div className="bg-white/10 px-6 py-4 rounded-lg">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-1">Tarif</span>
              <span className="text-white font-bold text-lg">{service.priceRange}</span>
            </div>
            <div className="bg-white/10 px-6 py-4 rounded-lg">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-1">Durée</span>
              <span className="text-white font-bold text-lg">{service.duration}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">Avantages</span>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-8">
                Pourquoi choisir notre service de {service.name.toLowerCase()} ?
              </h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center text-gold font-bold text-sm">
                      {index + 1}
                    </span>
                    <span className="text-slate-deep/80 text-lg pt-1">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-pearlescent p-10 rounded-2xl">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">Devis Gratuit</span>
              <h3 className="text-2xl font-bold mb-4">Besoin d&apos;un {service.name.toLowerCase()} ?</h3>
              <p className="text-slate-deep/70 mb-6">
                Contactez-nous pour obtenir un devis gratuit et personnalisé. Intervention rapide à domicile
                en Seine-Saint-Denis, Paris et Val-de-Marne.
              </p>
              <div className="space-y-4">
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="btn-luxury w-full text-center block"
                >
                  Appeler : {company.phone}
                </a>
                <Link
                  href="/contact"
                  className="block w-full text-center py-4 px-6 border-2 border-slate-deep text-slate-deep font-bold uppercase tracking-wider text-sm hover:bg-slate-deep hover:text-white transition-colors"
                >
                  Demander un devis en ligne
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zones d'intervention */}
      <section className="py-24 bg-pearlescent">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">Zones d&apos;intervention</span>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">
            {service.name} près de chez vous
          </h2>
          <p className="text-slate-deep/70 text-lg mb-10 max-w-2xl">
            Nous intervenons dans un rayon de 25km autour de Romainville. Découvrez nos pages dédiées à chaque ville.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={
                  ['nettoyage-canape', 'nettoyage-fauteuil'].includes(service.slug)
                    ? `/services/${service.slug}/${location.slug}`
                    : `/services/nettoyage-canape/${location.slug}`
                }
                className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow group"
              >
                <span className="font-mono text-xs text-gold uppercase tracking-wider block mb-1">
                  {location.departmentCode}
                </span>
                <span className="font-bold text-slate-deep group-hover:text-gold transition-colors">
                  {location.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">FAQ</span>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-10">
            Questions fréquentes sur le {service.name.toLowerCase()}
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-pearlescent p-8 rounded-2xl">
              <h3 className="font-bold text-lg mb-3">Combien de temps dure l&apos;intervention ?</h3>
              <p className="text-slate-deep/70">
                Pour un {service.name.toLowerCase()}, comptez généralement {service.duration}.
                La durée peut varier selon la taille et l&apos;état de votre mobilier.
              </p>
            </div>
            <div className="bg-pearlescent p-8 rounded-2xl">
              <h3 className="font-bold text-lg mb-3">Quel est le tarif ?</h3>
              <p className="text-slate-deep/70">
                Nos tarifs pour le {service.name.toLowerCase()} commencent {service.priceRange.toLowerCase()}.
                Nous établissons un devis gratuit après évaluation de vos besoins.
              </p>
            </div>
            <div className="bg-pearlescent p-8 rounded-2xl">
              <h3 className="font-bold text-lg mb-3">Intervenez-vous à domicile ?</h3>
              <p className="text-slate-deep/70">
                Oui, nous nous déplaçons directement chez vous avec tout le matériel professionnel nécessaire.
                Zone d&apos;intervention : 25km autour de Romainville (93).
              </p>
            </div>
            <div className="bg-pearlescent p-8 rounded-2xl">
              <h3 className="font-bold text-lg mb-3">Combien de temps pour le séchage ?</h3>
              <p className="text-slate-deep/70">
                Le séchage est généralement complet en 2 à 4 heures grâce à nos techniques d&apos;extraction
                professionnelles. Vous pouvez utiliser votre canapé le jour même.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
