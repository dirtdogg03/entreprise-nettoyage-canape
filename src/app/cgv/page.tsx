import { Metadata } from 'next';
import { company } from '@/lib/data/company';

export const metadata: Metadata = {
  title: `Conditions Générales de Vente | ${company.name}`,
  description: `Conditions générales de vente des services de ${company.name}. Tarifs, modalités d'intervention, garanties et droit de rétractation.`,
  robots: {
    index: false,
    follow: true,
  },
};

export default function CGVPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-slate-deep py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />

        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 relative text-center z-10">
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-black text-white leading-none tracking-[-2px]">
            Conditions Générales <span className="text-gold">de Vente</span>
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-pearlescent">
        <div className="mx-auto max-w-screen-lg px-6 lg:px-12">
          <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-soft border border-gray-100">
            <div className="prose prose-lg max-w-none text-slate-deep/80">

              <h2 className="text-2xl font-bold text-slate-deep mb-6">Article 1 - Objet et champ d&apos;application</h2>
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre
                <strong> {company.name}</strong>, ci-après dénommé &quot;le Prestataire&quot;, et toute personne physique
                ou morale, ci-après dénommée &quot;le Client&quot;, souhaitant bénéficier des services de nettoyage
                à domicile proposés par le Prestataire.
              </p>
              <p>
                Toute commande de prestation implique l&apos;acceptation sans réserve par le Client des présentes CGV.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">Article 2 - Description des services</h2>
              <p>
                Le Prestataire propose des services de nettoyage professionnel à domicile, comprenant notamment :
              </p>
              <ul>
                <li>Nettoyage de canapés (tissu, cuir, microfibre, velours)</li>
                <li>Nettoyage de fauteuils et chaises rembourrées</li>
                <li>Détachage professionnel</li>
                <li>Désinfection et traitement anti-acariens</li>
                <li>Traitement des odeurs</li>
              </ul>
              <p>
                Le détail des prestations et leurs tarifs sont communiqués lors de l&apos;établissement du devis.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">Article 3 - Zone d&apos;intervention</h2>
              <p>
                Le Prestataire intervient dans un rayon de <strong>{company.serviceArea.radius}</strong> autour de
                {' '}<strong>{company.serviceArea.headquarters}</strong>, couvrant les départements suivants :
              </p>
              <ul>
                {company.serviceArea.departments.map((dept) => (
                  <li key={dept}>{dept}</li>
                ))}
              </ul>
              <p>
                Pour toute intervention en dehors de cette zone, merci de nous contacter pour étudier la faisabilité.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">Article 4 - Devis et commande</h2>
              <h3 className="text-xl font-bold text-slate-deep mb-4">4.1 Établissement du devis</h3>
              <p>
                Tout devis est gratuit et sans engagement. Il est établi sur la base des informations communiquées
                par le Client (type de mobilier, matière, dimensions, état, taches à traiter).
              </p>
              <p>
                Le devis précise :
              </p>
              <ul>
                <li>La nature des prestations</li>
                <li>Le prix hors taxes et toutes taxes comprises</li>
                <li>La durée estimée de l&apos;intervention</li>
                <li>Le délai d&apos;intervention proposé</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-deep mb-4 mt-8">4.2 Validité et acceptation</h3>
              <p>
                Le devis est valable <strong>30 jours</strong> à compter de sa date d&apos;émission.
                L&apos;acceptation du devis vaut commande ferme et définitive.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">Article 5 - Prix et modalités de paiement</h2>
              <h3 className="text-xl font-bold text-slate-deep mb-4">5.1 Tarification</h3>
              <p>
                Les prix sont indiqués en euros, toutes taxes comprises (TTC). Le Prestataire se réserve le droit
                de modifier ses tarifs à tout moment. Les prestations sont facturées sur la base des tarifs en
                vigueur au jour de la commande.
              </p>

              <h3 className="text-xl font-bold text-slate-deep mb-4 mt-8">5.2 Supplément éventuel</h3>
              <p>
                Si, lors de l&apos;intervention, le technicien constate un état du mobilier différent de celui
                décrit lors du devis (taches supplémentaires, dimensions plus importantes, etc.), un supplément
                pourra être proposé au Client. Ce supplément ne sera facturé qu&apos;après accord explicite du Client.
              </p>

              <h3 className="text-xl font-bold text-slate-deep mb-4 mt-8">5.3 Paiement</h3>
              <p>
                Le paiement s&apos;effectue à la fin de l&apos;intervention, par :
              </p>
              <ul>
                <li>Carte bancaire</li>
                <li>Espèces</li>
                <li>Virement bancaire (pour les professionnels)</li>
              </ul>
              <p>
                En cas de paiement par virement, le délai de paiement est de 30 jours à compter de la date de facture.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">Article 6 - Conditions d&apos;intervention</h2>
              <h3 className="text-xl font-bold text-slate-deep mb-4">6.1 Accessibilité</h3>
              <p>
                Le Client s&apos;engage à :
              </p>
              <ul>
                <li>Permettre l&apos;accès au lieu d&apos;intervention au technicien</li>
                <li>Assurer un espace de travail suffisant autour du mobilier</li>
                <li>Signaler tout élément fragile à proximité</li>
                <li>Informer des éventuelles contraintes d&apos;accès (étage, escalier, parking)</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-deep mb-4 mt-8">6.2 Présence du Client</h3>
              <p>
                La présence du Client ou d&apos;un représentant majeur est obligatoire pendant toute la durée
                de l&apos;intervention.
              </p>

              <h3 className="text-xl font-bold text-slate-deep mb-4 mt-8">6.3 Temps de séchage</h3>
              <p>
                Après l&apos;intervention, un temps de séchage de <strong>2 à 6 heures</strong> est généralement
                nécessaire selon le type de traitement effectué. Le technicien vous indiquera le temps de séchage
                exact en fin d&apos;intervention.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">Article 7 - Droit de rétractation</h2>
              <p>
                Conformément aux articles L.221-18 et suivants du Code de la consommation, le Client dispose
                d&apos;un délai de <strong>14 jours</strong> à compter de la conclusion du contrat pour exercer
                son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
              </p>
              <p>
                <strong>Exception :</strong> Conformément à l&apos;article L.221-28 du Code de la consommation,
                le droit de rétractation ne peut être exercé pour les prestations de services pleinement exécutées
                avant la fin du délai de rétractation et dont l&apos;exécution a commencé avec l&apos;accord
                préalable et exprès du Client.
              </p>
              <p>
                Pour exercer ce droit, le Client doit adresser une demande par email à{' '}
                <a href={`mailto:${company.email}`} className="text-gold hover:underline">{company.email}</a>.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">Article 8 - Annulation et report</h2>
              <h3 className="text-xl font-bold text-slate-deep mb-4">8.1 Par le Client</h3>
              <ul>
                <li><strong>Plus de 48h avant :</strong> annulation ou report gratuit</li>
                <li><strong>Moins de 48h :</strong> frais de déplacement de 30€ TTC</li>
                <li><strong>Absence au rendez-vous :</strong> facturation de 50€ TTC</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-deep mb-4 mt-8">8.2 Par le Prestataire</h3>
              <p>
                En cas d&apos;empêchement (maladie, conditions météo extrêmes), le Prestataire s&apos;engage à
                prévenir le Client dans les meilleurs délais et à proposer un nouveau rendez-vous sans frais.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">Article 9 - Garanties et responsabilités</h2>
              <h3 className="text-xl font-bold text-slate-deep mb-4">9.1 Garantie de résultat</h3>
              <p>
                Le Prestataire s&apos;engage à mettre en œuvre tous les moyens techniques à sa disposition pour
                obtenir le meilleur résultat possible. Toutefois, certaines taches anciennes, imprégnées ou
                ayant fait l&apos;objet de traitements préalables peuvent ne pas disparaître totalement.
              </p>
              <p>
                En cas de résultat insatisfaisant, le Client peut demander une reprise de l&apos;intervention
                sous 48h, gratuitement.
              </p>

              <h3 className="text-xl font-bold text-slate-deep mb-4 mt-8">9.2 Assurance professionnelle</h3>
              <p>
                Le Prestataire est couvert par une assurance responsabilité civile professionnelle pour tous
                dommages causés lors de l&apos;intervention. En cas de dégradation imputable au Prestataire,
                le Client dispose de 48h pour le signaler.
              </p>

              <h3 className="text-xl font-bold text-slate-deep mb-4 mt-8">9.3 Limites de responsabilité</h3>
              <p>
                Le Prestataire ne peut être tenu responsable :
              </p>
              <ul>
                <li>Des dégradations préexistantes non signalées</li>
                <li>Des réactions du textile liées à des traitements antérieurs</li>
                <li>Des défauts de fabrication du mobilier</li>
                <li>De l&apos;usure normale des matériaux</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">Article 10 - Réclamations</h2>
              <p>
                Toute réclamation doit être adressée dans un délai de <strong>7 jours</strong> suivant
                l&apos;intervention, par email à{' '}
                <a href={`mailto:${company.email}`} className="text-gold hover:underline">{company.email}</a>
                {' '}ou par courrier recommandé.
              </p>
              <p>
                La réclamation doit préciser la nature du problème et être accompagnée de photos si nécessaire.
                Le Prestataire s&apos;engage à répondre sous 48h ouvrées.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">Article 11 - Protection des données</h2>
              <p>
                Les données personnelles collectées sont traitées conformément au Règlement Général sur la
                Protection des Données (RGPD). Pour plus d&apos;informations, consultez notre{' '}
                <a href="/politique-confidentialite" className="text-gold hover:underline">
                  Politique de confidentialité
                </a>.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">Article 12 - Litiges et médiation</h2>
              <p>
                En cas de litige, le Client peut recourir gratuitement au service de médiation de la consommation.
                Le médiateur peut être saisi en ligne ou par courrier après avoir tenté une résolution amiable
                avec le Prestataire.
              </p>
              <p>
                À défaut de résolution amiable, les tribunaux français seront seuls compétents.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">Article 13 - Dispositions générales</h2>
              <p>
                Si l&apos;une des clauses des présentes CGV venait à être déclarée nulle ou inapplicable,
                les autres clauses conserveraient leur pleine validité.
              </p>
              <p>
                Les présentes CGV sont soumises au droit français.
              </p>

              <h2 className="text-2xl font-bold text-slate-deep mb-6 mt-12">Contact</h2>
              <p>
                Pour toute question concernant les présentes CGV :
              </p>
              <ul>
                <li><strong>Email :</strong> {company.email}</li>
                <li><strong>Téléphone :</strong> {company.phone}</li>
                <li><strong>Adresse :</strong> {company.address.street}, {company.address.postalCode} {company.address.city}</li>
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
