import { Metadata } from 'next';
import { company } from '@/lib/data/company';

export const metadata: Metadata = {
  title: `Mentions Légales | ${company.name}`,
  description: `Mentions légales du site ${company.domain}. Informations sur l'éditeur, l'hébergeur et les conditions d'utilisation.`,
  robots: {
    index: false,
    follow: true,
  },
};

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-slate-deep py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />

        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 relative text-center z-10">
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-black text-white leading-none tracking-[-2px]">
            Mentions <span className="text-gold">Légales</span>
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-pearlescent">
        <div className="mx-auto max-w-screen-lg px-6 lg:px-12">
          <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-soft border border-gray-100">
            <div className="prose prose-lg max-w-none text-slate-deep/80">

              <h2 className="text-2xl font-bold text-slate-deep mb-6">1. Éditeur du site</h2>
              <p>
                Le site <strong>{company.domain}</strong> est édité par :
              </p>
              <ul>
                <li><strong>Raison sociale :</strong> {company.name}</li>
                <li><strong>Siège social :</strong> {company.address.city} ({company.address.postalCode}), {company.address.department}</li>
                <li><strong>Téléphone :</strong> {company.phone}</li>
                <li><strong>Email :</strong> {company.email}</li>
                <li><strong>SIRET :</strong> [À compléter]</li>
                <li><strong>Numéro TVA intracommunautaire :</strong> [À compléter]</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">2. Directeur de la publication</h2>
              <p>
                Le directeur de la publication du site est le représentant légal de la société
                {' '}{company.name}.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">3. Hébergement</h2>
              <p>
                Le site est hébergé par :
              </p>
              <ul>
                <li><strong>Vercel Inc.</strong></li>
                <li>440 N Barranca Ave #4133</li>
                <li>Covina, CA 91723, États-Unis</li>
                <li>Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">vercel.com</a></li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">4. Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, sons, logiciels, etc.)
                est la propriété exclusive de {company.name} ou de ses partenaires et est protégé par les lois
                françaises et internationales relatives à la propriété intellectuelle.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des
                éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation
                écrite préalable de {company.name}.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">5. Limitation de responsabilité</h2>
              <p>
                {company.name} s&apos;efforce d&apos;assurer au mieux de ses possibilités l&apos;exactitude et la mise à jour
                des informations diffusées sur ce site. Toutefois, {company.name} ne peut garantir l&apos;exactitude,
                la précision ou l&apos;exhaustivité des informations mises à disposition sur ce site.
              </p>
              <p>
                En conséquence, {company.name} décline toute responsabilité :
              </p>
              <ul>
                <li>Pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site ;</li>
                <li>Pour tous dommages résultant d&apos;une intrusion frauduleuse d&apos;un tiers ayant entraîné une modification des informations mises à disposition sur le site ;</li>
                <li>Et plus généralement, pour tous dommages, directs ou indirects, qu&apos;elles qu&apos;en soient les causes, origines, natures ou conséquences.</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">6. Liens hypertextes</h2>
              <p>
                Le site peut contenir des liens hypertextes vers d&apos;autres sites. {company.name} n&apos;exerce
                aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">7. Droit applicable</h2>
              <p>
                Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux
                français seront seuls compétents.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">8. Contact</h2>
              <p>
                Pour toute question concernant les présentes mentions légales, vous pouvez nous contacter :
              </p>
              <ul>
                <li><strong>Par email :</strong> {company.email}</li>
                <li><strong>Par téléphone :</strong> {company.phone}</li>
              </ul>

              <p className="text-sm text-slate-deep/50 mt-12 pt-8 border-t border-gray-200">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
