// Authors - E-E-A-T Signals for Blog Articles
// nettoyage-canape-a-domicile.fr

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  shortBio: string;
  credentials: string[];
  experience: string;
  image: string;
  linkedin?: string;
  specialties: string[];
  isFounder?: boolean;
}

export const authors: Author[] = [
  {
    id: "marc-durand",
    name: "Marc Durand",
    role: "Fondateur & Expert Nettoyage Textile",
    bio: "Fort de 15 ans d'expérience dans le nettoyage professionnel de textiles d'ameublement, Marc a fondé Nettoyage Canapé à Domicile avec une vision claire : offrir un service d'excellence accessible à tous les foyers de Paris et petite couronne. Formé aux techniques les plus avancées et certifié par l'INHNI (Institut National de l'Hygiène et du Nettoyage Industriel), il supervise personnellement chaque intervention et forme notre équipe aux meilleures pratiques du secteur.",
    shortBio: "Fondateur avec 15 ans d'expérience en nettoyage textile professionnel.",
    credentials: [
      "Certification INHNI Niveau 3 - Nettoyage Textile",
      "Formation Woolsafe Approved Technician",
      "CAP Entretien des Articles Textiles",
      "Habilitation Produits Écologiques EU Ecolabel"
    ],
    experience: "15 ans",
    image: "/images/about/cleaning-products.jpg", // TODO: Ajouter photo marc-durand
    linkedin: "https://linkedin.com/in/marc-durand-nettoyage",
    specialties: ["Tissus délicats", "Velours et soie", "Détachage complexe", "Formation équipe"],
    isFounder: true,
  },
  {
    id: "sophie-martin",
    name: "Sophie Martin",
    role: "Spécialiste Cuir & Matières Nobles",
    bio: "Sophie est notre experte en entretien des cuirs et matières nobles. Après 10 ans passés dans l'industrie du luxe à restaurer des pièces de maroquinerie haut de gamme, elle a rejoint notre équipe pour apporter son expertise unique. Elle maîtrise les techniques de nettoyage, nourrissage et restauration de tous types de cuirs : pleine fleur, nubuck, daim, cuir exotique.",
    shortBio: "Spécialiste cuir avec 10 ans d'expérience dans l'industrie du luxe.",
    credentials: [
      "Certificat Restauration Cuir - École du Cuir de Paris",
      "Formation Aniline & Cuirs Sensibles",
      "Spécialisation Nubuck et Daim"
    ],
    experience: "10 ans",
    image: "/images/about/cleaning-products.jpg", // TODO: Ajouter photo sophie-martin
    specialties: ["Cuir pleine fleur", "Nubuck et daim", "Restauration cuir", "Cuirs exotiques"],
  },
  {
    id: "thomas-bernard",
    name: "Thomas Bernard",
    role: "Technicien Senior Détachage",
    bio: "Thomas est notre spécialiste des cas difficiles. Avec 8 ans d'expérience exclusivement dédiés au détachage professionnel, il a développé une expertise reconnue pour éliminer les taches les plus tenaces : vin rouge, sang, encre, urine animale, moisissures. Son taux de réussite de 97% sur les taches anciennes témoigne de son savoir-faire exceptionnel.",
    shortBio: "Expert détachage avec 97% de réussite sur taches tenaces.",
    credentials: [
      "Formation Chimie des Taches - AFPN",
      "Certification Traitement Taches Biologiques",
      "Habilitation Produits Enzymatiques Professionnels"
    ],
    experience: "8 ans",
    image: "/images/about/cleaning-products.jpg", // TODO: Ajouter photo thomas-bernard
    specialties: ["Taches anciennes", "Taches biologiques", "Taches grasses", "Moisissures"],
  },
  {
    id: "julie-petit",
    name: "Julie Petit",
    role: "Responsable Hygiène & Désinfection",
    bio: "Julie supervise tous nos protocoles de désinfection et d'assainissement. Formée en microbiologie appliquée, elle garantit l'efficacité de nos traitements anti-acariens, anti-bactériens et anti-allergènes. Elle adapté nos protocoles aux besoins spécifiques des familles avec enfants en bas âge, personnes allergiques ou immunodéprimées.",
    shortBio: "Responsable hygiène, spécialiste des environnements sensibles.",
    credentials: [
      "BTS Bioanalyses et Controles",
      "Certification Désinfection EN 14476",
      "Formation Allergènes et Asthme - AFPRAL"
    ],
    experience: "6 ans",
    image: "/images/about/cleaning-products.jpg", // TODO: Ajouter photo julie-petit
    specialties: ["Désinfection", "Anti-acariens", "Environnements allergiques", "Protocoles sanitaires"],
  },
  {
    id: "équipe-redaction",
    name: "Équipe Éditoriale",
    role: "Rédaction & Conseil",
    bio: "Notre équipe éditoriale rassemble les connaissances de tous nos experts pour vous proposer des guides pratiques, des conseils d'entretien et des solutions aux problèmes courants. Chaque article est relu et validé par au moins un technicien certifié avant publication.",
    shortBio: "Équipe de rédacteurs experts en entretien textile.",
    credentials: [
      "Validation technique par experts certifiés",
      "Mise à jour régulière des contenus",
      "Sources vérifiées et citées"
    ],
    experience: "Collectif",
    image: "/images/about/cleaning-supplies.jpg", // TODO: Ajouter photo équipe
    specialties: ["Guides pratiques", "Conseils entretien", "Comparatifs produits", "FAQ"],
  },
];

/**
 * Récupère un auteur par son ID
 */
export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}

/**
 * Récupère tous les auteurs (hors équipe éditoriale)
 */
export function getIndividualAuthors(): Author[] {
  return authors.filter((a) => a.id !== "équipe-redaction");
}

/**
 * Récupère le fondateur
 */
export function getFounder(): Author | undefined {
  return authors.find((a) => a.isFounder);
}

/**
 * Génère le schema Person pour un auteur
 */
export function generateAuthorSchema(author: Author) {
  return {
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.shortBio,
    ...(author.linkedin ? { url: author.linkedin } : {}),
    ...(author.image ? { image: author.image } : {}),
    knowsAbout: author.specialties,
  };
}
