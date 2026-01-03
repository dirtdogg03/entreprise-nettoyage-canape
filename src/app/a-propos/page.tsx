import { Metadata } from 'next';
import Link from 'next/link';
import { company } from '@/lib/data/company';

export const metadata: Metadata = {
  title: `À Propos | ${company.name}`,
  description: `Découvrez ${company.name}, votre expert du nettoyage de canapés à domicile à Paris et petite couronne. Notre équipe intervient dans un rayon de ${company.serviceArea.radius} autour de ${company.serviceArea.headquarters}.`,
};

export default function AProposPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-slate-deep py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="pearl-orb top-[-10%] right-[-5%]" />

        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 relative text-center z-10">
          <span className="data-label text-gold mb-6 block">
            Notre Histoire
          </span>
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-white leading-none tracking-[-2px] mb-8">
            À Propos de <span className="text-gold">Notre Atelier</span>
          </h1>
          <p className="mt-6 text-xl font-light text-white/80 max-w-2xl mx-auto">
            {company.tagline}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-pearlescent">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-12">

          {/* Mission */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-slate-deep mb-8 tracking-tight">
              Notre <span className="text-gold">Mission</span>
            </h2>
            <div className="prose prose-lg max-w-none text-slate-deep/80">
              <p>
                Chez <strong>{company.name}</strong>, nous avons une mission simple : redonner vie à vos canapés
                et fauteuils directement chez vous, sans que vous ayez à vous déplacer. Nous savons que votre
                canapé est au centre de votre vie quotidienne. C&apos;est là que vous vous détendez après une
                longue journée, que vous recevez vos proches, que vos enfants jouent.
              </p>
              <p>
                Avec le temps, les taches s&apos;accumulent, les odeurs s&apos;installent, et le tissu perd de
                son éclat. Notre équipe intervient pour restaurer votre mobilier avec des techniques
                professionnelles adaptées à chaque type de revêtement : tissu, cuir, microfibre, velours.
              </p>
            </div>
          </div>

          {/* Expertise */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-slate-deep mb-8 tracking-tight">
              Notre <span className="text-gold">Expertise</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-deep mb-3">Nettoyage Professionnel</h3>
                <p className="text-slate-deep/70">
                  Équipements professionnels de niveau industriel pour un nettoyage en profondeur.
                  Extraction à l&apos;eau chaude, injection-extraction, vapeur haute température.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-deep mb-3">Produits Écologiques</h3>
                <p className="text-slate-deep/70">
                  Nous utilisons exclusivement des produits biodégradables et sans danger pour
                  votre famille et vos animaux de compagnie.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-deep mb-3">Intervention Rapide</h3>
                <p className="text-slate-deep/70">
                  Rendez-vous sous 48h dans toute notre zone d&apos;intervention.
                  Nous nous adaptons à votre emploi du temps, y compris le samedi.
                </p>
              </div>
            </div>
          </div>

          {/* Zone d'intervention */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-slate-deep mb-8 tracking-tight">
              Zone d&apos;<span className="text-gold">Intervention</span>
            </h2>
            <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-soft border border-gray-100">
              <p className="text-lg text-slate-deep/80 mb-6">
                Basés à <strong>{company.address.city}</strong> ({company.address.postalCode}), nous intervenons
                dans un rayon de <strong>{company.serviceArea.radius}</strong> couvrant :
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {company.serviceArea.departments.map((dept) => (
                  <li key={dept} className="flex items-center gap-3 text-slate-deep/80">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gold flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {dept}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/zones"
                  className="inline-flex items-center gap-2 text-gold font-semibold hover:underline"
                >
                  Voir toutes nos zones d&apos;intervention
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-slate-deep mb-8 tracking-tight">
              Nos <span className="text-gold">Horaires</span>
            </h2>
            <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100 max-w-md">
              <ul className="space-y-4">
                <li className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-slate-deep font-medium">Lundi - Vendredi</span>
                  <span className="text-gold font-bold">{company.businessHours.weekdays}</span>
                </li>
                <li className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-slate-deep font-medium">Samedi</span>
                  <span className="text-gold font-bold">{company.businessHours.saturday}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-deep font-medium">Dimanche</span>
                  <span className="text-slate-deep/50">{company.businessHours.sunday}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-deep mb-6 tracking-tight">
              Prêt à redonner vie à votre <span className="text-gold">canapé</span> ?
            </h2>
            <p className="text-lg text-slate-deep/70 mb-8 max-w-xl mx-auto">
              Demandez votre devis gratuit. Nous vous répondons sous 24h.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-slate-deep text-white font-mono uppercase tracking-[2px] text-sm rounded-xl hover:bg-gold transition-colors duration-300"
            >
              Demander un devis
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
