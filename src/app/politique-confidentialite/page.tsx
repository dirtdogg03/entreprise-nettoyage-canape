import { Metadata } from 'next';
import { company } from '@/lib/data/company';

export const metadata: Metadata = {
  title: `Politique de Confidentialité | ${company.name}`,
  description: `Politique de confidentialité et protection des données personnelles du site ${company.domain}. Conformité RGPD.`,
  robots: {
    index: false,
    follow: true,
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-slate-deep py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />

        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 relative text-center z-10">
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-black text-white leading-none tracking-[-2px]">
            Politique de <span className="text-gold">Confidentialité</span>
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-pearlescent">
        <div className="mx-auto max-w-screen-lg px-6 lg:px-12">
          <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-soft border border-gray-100">
            <div className="prose prose-lg max-w-none text-slate-deep/80">

              <p className="lead text-lg">
                La protection de vos données personnelles est une priorité pour {company.name}.
                Cette politique de confidentialité vous informe sur la manière dont nous collectons,
                utilisons et protégeons vos informations conformément au Règlement Général sur la
                Protection des Données (RGPD).
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">1. Responsable du traitement</h2>
              <p>
                Le responsable du traitement des données est :
              </p>
              <ul>
                <li><strong>{company.name}</strong></li>
                <li>{company.address.city} ({company.address.postalCode})</li>
                <li>Email : {company.email}</li>
                <li>Téléphone : {company.phone}</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">2. Données collectées</h2>
              <p>
                Nous collectons les données suivantes lorsque vous utilisez notre site :
              </p>

              <h3 className="text-xl font-bold text-slate-deep mb-4 mt-8">2.1 Données que vous nous fournissez</h3>
              <ul>
                <li><strong>Formulaire de contact :</strong> nom, prénom, email, téléphone, message</li>
                <li><strong>Demande de devis :</strong> nom, prénom, email, téléphone, adresse, description du service souhaité</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-deep mb-4 mt-8">2.2 Données collectées automatiquement</h3>
              <ul>
                <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées, durée de visite</li>
                <li><strong>Cookies :</strong> voir la section 7 ci-dessous</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">3. Finalités du traitement</h2>
              <p>
                Vos données personnelles sont collectées pour les finalités suivantes :
              </p>
              <ul>
                <li>Répondre à vos demandes de contact et de devis</li>
                <li>Vous fournir nos services de nettoyage</li>
                <li>Améliorer notre site et nos services</li>
                <li>Respecter nos obligations légales</li>
                <li>Vous envoyer des informations commerciales (uniquement avec votre consentement)</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">4. Base légale du traitement</h2>
              <p>
                Le traitement de vos données repose sur les bases légales suivantes :
              </p>
              <ul>
                <li><strong>Exécution d&apos;un contrat :</strong> pour vous fournir nos services</li>
                <li><strong>Consentement :</strong> pour l&apos;envoi de communications commerciales</li>
                <li><strong>Intérêt légitime :</strong> pour améliorer nos services et assurer la sécurité du site</li>
                <li><strong>Obligation légale :</strong> pour la conservation des factures et documents comptables</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">5. Durée de conservation</h2>
              <p>
                Vos données personnelles sont conservées pendant les durées suivantes :
              </p>
              <ul>
                <li><strong>Données de contact :</strong> 3 ans après le dernier contact</li>
                <li><strong>Données clients :</strong> durée de la relation commerciale + 5 ans (obligations légales)</li>
                <li><strong>Données de navigation :</strong> 13 mois maximum</li>
                <li><strong>Cookies :</strong> 13 mois maximum</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">6. Vos droits</h2>
              <p>
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul>
                <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données personnelles</li>
                <li><strong>Droit de rectification :</strong> corriger des données inexactes ou incomplètes</li>
                <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
                <li><strong>Droit de retirer votre consentement :</strong> à tout moment, sans affecter la licéité du traitement antérieur</li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-nous à : <strong>{company.email}</strong>
              </p>
              <p>
                Vous disposez également du droit d&apos;introduire une réclamation auprès de la CNIL
                (Commission Nationale de l&apos;Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">www.cnil.fr</a>
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">7. Cookies</h2>
              <p>
                Notre site utilise des cookies pour améliorer votre expérience de navigation.
              </p>

              <h3 className="text-xl font-bold text-slate-deep mb-4 mt-8">7.1 Types de cookies utilisés</h3>
              <ul>
                <li><strong>Cookies strictement nécessaires :</strong> indispensables au fonctionnement du site</li>
                <li><strong>Cookies analytiques :</strong> pour mesurer l&apos;audience et améliorer le site (avec votre consentement)</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-deep mb-4 mt-8">7.2 Gestion des cookies</h3>
              <p>
                Vous pouvez à tout moment modifier vos préférences en matière de cookies via les paramètrès
                de votre navigateur. La désactivation de certains cookies peut affecter votre expérience
                de navigation sur notre site.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">8. Sécurité des données</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger
                vos données personnelles contre la destruction accidentelle ou illicite, la perte, l&apos;altération,
                la divulgation ou l&apos;accès non autorisé.
              </p>
              <ul>
                <li>Chiffrement SSL/TLS des communications</li>
                <li>Hébergement sécurisé</li>
                <li>Accès restreint aux données personnelles</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">9. Transfert de données</h2>
              <p>
                Vos données personnelles sont hébergées en Europe. En cas de transfert vers un pays
                tiers, nous nous assurons que des garanties appropriées sont mises en place conformément
                au RGPD.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">10. Modifications</h2>
              <p>
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
                Les modifications prendront effet dès leur publication sur cette page. Nous vous encourageons
                à consulter régulièrement cette page.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">11. Contact</h2>
              <p>
                Pour toute question concernant cette politique de confidentialité ou vos données personnelles,
                contactez-nous :
              </p>
              <ul>
                <li><strong>Email :</strong> {company.email}</li>
                <li><strong>Téléphone :</strong> {company.phone}</li>
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
