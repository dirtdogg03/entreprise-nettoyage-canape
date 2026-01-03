import Link from 'next/link';
import { locations, getDepartments, getLocationsByDepartment } from '@/lib/data/locations';
import { seoDefaults, company } from '@/lib/data/company';
import CTABanner from '@/components/sections/CTABanner';
import CitySearch from '@/components/zones/CitySearch';
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
  description: 'Découvrez toutes nos zones d\'intervention pour le nettoyage de canapés à domicile : Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94). Intervention à domicile en petite couronne.',
};

export default function ZonesPage() {
  const departments = getDepartments();

  // Trier: Paris (75) en premier, puis par code
  const sortedDepartments = [...departments].sort((a, b) => {
    if (a.code === '75') return -1;
    if (b.code === '75') return 1;
    return a.code.localeCompare(b.code);
  });

  // Préparer les données pour le composant de recherche
  const searchLocations = locations.map((loc) => ({
    name: loc.name,
    slug: loc.slug,
    postalCode: loc.postalCode,
    departmentCode: loc.departmentCode,
  }));

  return (
    <>
      {/* Hero Section */}
      <section className="bg-slate-deep py-24 lg:py-32 relative overflow-hidden">
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
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-none tracking-[-2px] text-white mb-6">
            Nettoyage de canapé à <span className="text-gold">Paris et Petite Couronne</span>
          </h1>
          <p className="text-lg lg:text-xl text-white/70 max-w-2xl leading-relaxed mb-10">
            Intervention à domicile dans tout Paris (75) et la petite couronne :
            Hauts-de-Seine (92), Seine-Saint-Denis (93) et Val-de-Marne (94).
          </p>

          {/* Recherche de ville */}
          <div className="mb-10">
            <p className="text-white/60 text-sm mb-3 font-mono uppercase tracking-wider">
              Trouvez votre ville
            </p>
            <CitySearch locations={searchLocations} />
          </div>

          {/* Stats utiles */}
          <div className="flex flex-wrap gap-4 lg:gap-6">
            <div className="bg-white/10 px-5 py-3 rounded-lg">
              <span className="font-mono text-[10px] text-gold uppercase tracking-[0.15em] block mb-1">
                Couverture
              </span>
              <span className="text-white font-bold text-lg">4 départements</span>
            </div>
            <div className="bg-white/10 px-5 py-3 rounded-lg">
              <span className="font-mono text-[10px] text-gold uppercase tracking-[0.15em] block mb-1">
                Délai moyen
              </span>
              <span className="text-white font-bold text-lg">24-48h</span>
            </div>
            <div className="bg-white/10 px-5 py-3 rounded-lg">
              <span className="font-mono text-[10px] text-gold uppercase tracking-[0.15em] block mb-1">
                Devis
              </span>
              <span className="text-white font-bold text-lg">Gratuit</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation rapide par département */}
      <nav className="bg-white border-b border-slate-deep/10 sticky top-0 z-40" aria-label="Navigation par département">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <ul className="flex overflow-x-auto gap-1 py-2 -mx-2" role="list">
            {sortedDepartments.map((dept) => (
              <li key={dept.code}>
                <a
                  href={`#dept-${dept.code}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-pearlescent transition-colors whitespace-nowrap group"
                >
                  <span className="font-mono text-sm font-bold text-gold">{dept.code}</span>
                  <span className="text-slate-deep/70 group-hover:text-slate-deep transition-colors text-sm">
                    {dept.name}
                  </span>
                  <span className="text-slate-deep/40 text-xs">({dept.count})</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Departments Grid - Paris en premier */}
      {sortedDepartments.map((dept, index) => {
        const deptLocations = getLocationsByDepartment(dept.code);
        const isParis = dept.code === '75';

        return (
          <section
            key={dept.code}
            id={`dept-${dept.code}`}
            className={`py-16 lg:py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-pearlescent'} scroll-mt-16`}
            aria-labelledby={`heading-${dept.code}`}
          >
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
              <div className="flex items-baseline gap-4 mb-8 lg:mb-10">
                <span className={`font-mono text-4xl lg:text-5xl font-bold ${isParis ? 'text-gold' : 'text-gold/70'}`}>
                  {dept.code}
                </span>
                <div>
                  <h2 id={`heading-${dept.code}`} className="text-2xl lg:text-3xl font-black tracking-tight">
                    {dept.name}
                  </h2>
                  <p className="text-slate-deep/60">
                    {dept.count} {dept.count > 1 ? 'villes desservies' : 'ville desservie'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
                {deptLocations.map((location) => (
                  <Link
                    key={location.slug}
                    href={`/services/nettoyage-canape/${location.slug}`}
                    className={`
                      block p-4 lg:p-5 rounded-xl transition-all duration-200
                      ${index % 2 === 0 ? 'bg-pearlescent hover:bg-gold/10' : 'bg-white hover:bg-gold/10'}
                      hover:shadow-lg hover:-translate-y-0.5 group
                      focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
                    `}
                  >
                    <span className="font-bold text-slate-deep group-hover:text-gold transition-colors block mb-1">
                      {location.name}
                    </span>
                    <span className="text-sm text-slate-deep/50 block">
                      {location.postalCode}
                    </span>
                    <span className="mt-3 inline-flex items-center text-xs text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      Voir les services
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA simplifié - pas de liste de services redondante */}
      <section className="py-16 lg:py-20 bg-slate-deep">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-black text-white mb-4">
            Votre ville n&apos;est pas listée ?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Contactez-nous pour vérifier si nous intervenons dans votre secteur.
            Nous étendons régulièrement notre zone de couverture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${company.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-white font-bold rounded-xl hover:bg-gold/90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              {company.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
            >
              Demander un devis
            </Link>
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
