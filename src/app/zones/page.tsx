import Link from 'next/link';
import { locations, getDepartments, getLocationsByDepartment } from '@/lib/data/locations';
import { services } from '@/lib/data/services';
import { seoDefaults, company } from '@/lib/data/company';
import CTABanner from '@/components/sections/CTABanner';
import type { Metadata } from 'next';

// Schema BreadcrumbList pour SEO
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": `https://${company.domain}`
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Zones d'intervention",
      "item": `https://${company.domain}/zones`
    }
  ]
};

export const metadata: Metadata = {
  title: `Zones d'intervention - Nettoyage de Canapé à Domicile${seoDefaults.titleSuffix}`,
  description: 'Découvrez toutes nos zones d\'intervention pour le nettoyage de canapés à domicile : Seine-Saint-Denis, Paris, Val-de-Marne. Intervention dans un rayon de 25km autour de Romainville.',
};

export default function ZonesPage() {
  const departments = getDepartments();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-slate-deep py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 relative">
          <span className="font-mono text-xs font-bold text-gold uppercase tracking-[0.2em] mb-4 block">
            Zones d&apos;intervention
          </span>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-none tracking-[-2px] text-white">
            Nous intervenons <span className="text-gold">près de chez vous</span>
          </h1>
          <p className="mt-8 text-lg text-white/70 max-w-2xl leading-relaxed">
            Notre équipe se déplace à domicile dans un rayon de 25km autour de Romainville.
            Découvrez toutes les villes où nous intervenons pour le nettoyage de vos canapés.
          </p>
          <div className="flex flex-wrap gap-6 mt-10">
            <div className="bg-white/10 px-6 py-4 rounded-lg">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-1">Villes</span>
              <span className="text-white font-bold text-2xl">{locations.length}</span>
            </div>
            <div className="bg-white/10 px-6 py-4 rounded-lg">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-1">Départements</span>
              <span className="text-white font-bold text-2xl">{departments.length}</span>
            </div>
            <div className="bg-white/10 px-6 py-4 rounded-lg">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-1">Rayon</span>
              <span className="text-white font-bold text-2xl">25 km</span>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      {departments.map((dept) => {
        const deptLocations = getLocationsByDepartment(dept.code);
        return (
          <section key={dept.code} className="py-20 bg-white border-b border-slate-deep/10 last:border-b-0">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
              <div className="flex items-baseline gap-4 mb-10">
                <span className="font-mono text-4xl font-bold text-gold">{dept.code}</span>
                <div>
                  <h2 className="text-3xl font-black tracking-tight">{dept.name}</h2>
                  <p className="text-slate-deep/60">{dept.count} villes couvertes</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {deptLocations.map((location) => (
                  <div key={location.slug} className="bg-pearlescent p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-lg text-slate-deep">{location.name}</span>
                      {location.isHeadquarters && (
                        <span className="bg-gold text-white text-[10px] font-bold uppercase px-2 py-1 rounded">
                          Siège
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-deep/60 mb-4">{location.postalCode}</p>

                    {/* Quick links to services in this city */}
                    <div className="flex flex-wrap gap-2">
                      {services.slice(0, 3).map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}/${location.slug}`}
                          className="text-xs text-gold hover:underline"
                        >
                          {service.name.replace('Nettoyage ', '')}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* All Services */}
      <section className="py-20 bg-pearlescent">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">
            Nos services
          </span>
          <h2 className="text-3xl font-black tracking-tight mb-10">
            Tous nos services disponibles dans ces zones
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow group"
              >
                <span className="font-mono text-xs text-gold uppercase tracking-wider block mb-2">
                  {service.category}
                </span>
                <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                  {service.name}
                </h3>
                <p className="text-slate-deep/70 text-sm mb-3">{service.shortDescription}</p>
                <span className="font-mono text-sm text-slate-deep/50">{service.priceRange}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />

      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />
    </>
  );
}
