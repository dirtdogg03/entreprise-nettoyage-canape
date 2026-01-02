import ServicesGrid from '@/components/sections/ServicesGrid';
import CTABanner from '@/components/sections/CTABanner';
import { seoDefaults } from '@/lib/data/company';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Nos Services de Nettoyage de Canapés${seoDefaults.titleSuffix}`,
  description: 'Découvrez nos services de nettoyage de canapés à domicile : tissu, cuir, microfibre, velours. Détachage, désinfection, nettoyage fauteuils et chaises.',
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-slate-deep py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 relative">
          <span className="font-mono text-xs font-bold text-gold uppercase tracking-[0.2em] mb-4 block">Nos Services</span>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-none tracking-[-2px] text-white">
            Nettoyage de <span className="text-gold">Canapés</span>
          </h1>
          <p className="mt-8 text-lg text-white/70 max-w-2xl leading-relaxed">
            Découvrez nos services spécialisés pour redonner vie à vos canapés et sièges.
            Intervention professionnelle à domicile avec des techniques adaptées à chaque type de revêtement.
          </p>
        </div>
      </section>

      <ServicesGrid />
      <CTABanner />
    </>
  );
}
