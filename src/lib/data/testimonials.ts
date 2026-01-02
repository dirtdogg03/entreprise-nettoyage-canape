// Testimonials - Customer Reviews for E-E-A-T & Social Proof
// nettoyage-canape-a-domicile.fr

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  departmentCode: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string; // Format: YYYY-MM-DD
  text: string;
  shortText?: string;
  service: string;
  serviceSlug: string;
  verified: boolean;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    author: "Marie L.",
    location: "Paris 20e",
    departmentCode: "75",
    rating: 5,
    date: "2024-12-15",
    text: "Mon canapé en velours avait des taches de vin et de café depuis des mois. J'avais tout essayé sans succès. L'équipe a fait des miracles ! Le velours est comme neuf, les couleurs sont ravivées et il n'y a plus aucune trace. Je recommande à 100%.",
    shortText: "L'équipe a fait des miracles sur mon velours taché !",
    service: "Nettoyage Canapé Velours",
    serviceSlug: "nettoyage-canape-velours",
    verified: true,
    featured: true,
  },
  {
    id: "t2",
    author: "Jean-Pierre M.",
    location: "Montreuil",
    departmentCode: "93",
    rating: 5,
    date: "2024-12-10",
    text: "Intervention rapide et professionnelle pour notre canapé d'angle en tissu. 3 enfants à la maison, vous imaginez l'état... Résultat impeccable, le technicien a pris le temps d'expliquer comment entretenir le canapé. Prix très correct.",
    shortText: "Résultat impeccable sur notre canapé familial.",
    service: "Nettoyage Canapé d'Angle",
    serviceSlug: "nettoyage-canape-angle",
    verified: true,
    featured: true,
  },
  {
    id: "t3",
    author: "Isabelle D.",
    location: "Vincennes",
    departmentCode: "94",
    rating: 5,
    date: "2024-12-05",
    text: "Notre canapé en cuir blanc commençait à grisonner et à se craqueler. Sophie a fait un travail remarquable : nettoyage, nourrissage et protection. Le cuir est redevenu souple et lumineux. Elle m'a aussi donné des conseils pour l'entretien régulier.",
    shortText: "Notre cuir blanc est redevenu lumineux.",
    service: "Nettoyage Canapé Cuir",
    serviceSlug: "nettoyage-canape-cuir",
    verified: true,
    featured: true,
  },
  {
    id: "t4",
    author: "Ahmed K.",
    location: "Pantin",
    departmentCode: "93",
    rating: 5,
    date: "2024-11-28",
    text: "Problème d'urine de chat sur notre canapé. Odeur impossible à éliminer malgré plusieurs tentatives. Le traitement enzymatique a complètement neutralisé l'odeur. Même notre chat ne retourne plus sur le canapé !",
    shortText: "Odeur d'urine de chat complètement neutralisée.",
    service: "Détachage Canapé",
    serviceSlug: "détachage-canape",
    verified: true,
  },
  {
    id: "t5",
    author: "Catherine B.",
    location: "Boulogne-Billancourt",
    departmentCode: "92",
    rating: 5,
    date: "2024-11-22",
    text: "Ma fille est asthmatique et nous voulions assainir notre intérieur. La désinfection du canapé et du matelas a été très efficace. Le technicien nous a montré les résultats du test acariens avant/après. Impressionnant !",
    shortText: "Désinfection efficace pour ma fille asthmatique.",
    service: "Désinfection Canapé",
    serviceSlug: "désinfection-canape",
    verified: true,
  },
  {
    id: "t6",
    author: "François R.",
    location: "Romainville",
    departmentCode: "93",
    rating: 5,
    date: "2024-11-18",
    text: "Habitant à Romainville, j'ai choisi cette entreprise locale. Intervention le jour même de mon appel ! Mon vieux canapé en microfibre a retrouvé une seconde jeunesse. Très satisfait du rapport qualité/prix.",
    shortText: "Intervention le jour même, résultat parfait.",
    service: "Nettoyage Canapé Microfibre",
    serviceSlug: "nettoyage-canape-microfibre",
    verified: true,
  },
  {
    id: "t7",
    author: "Nathalie G.",
    location: "Levallois-Perret",
    departmentCode: "92",
    rating: 4,
    date: "2024-11-12",
    text: "Bon travail sur nos 6 chaises de salle à manger. Le tarif dégressif est intéressant. Seul bémol : le temps de séchage un peu plus long que prévu (5h au lieu de 3h annoncées). Mais le résultat est là.",
    shortText: "Bon travail sur nos chaises, tarif dégressif appréciable.",
    service: "Nettoyage Chaise",
    serviceSlug: "nettoyage-chaise",
    verified: true,
  },
  {
    id: "t8",
    author: "Pierre et Anne S.",
    location: "Créteil",
    departmentCode: "94",
    rating: 5,
    date: "2024-11-05",
    text: "Nous avons fait nettoyer notre canapé convertible que nous utilisons quotidiennement comme lit d'appoint. Le technicien a traité aussi bien l'assise que le matelas intégré. Hygiène parfaite, on dort mieux !",
    shortText: "Canapé-lit parfaitement nettoyé, matelas inclus.",
    service: "Nettoyage Canapé Convertible",
    serviceSlug: "nettoyage-canape-convertible",
    verified: true,
  },
  {
    id: "t9",
    author: "Sylvie P.",
    location: "Neuilly-sur-Seine",
    departmentCode: "92",
    rating: 5,
    date: "2024-10-28",
    text: "Canapé haut de gamme en tissu Designers Guild. J'avais peur de confier ce meuble précieux mais l'équipe a été d'un professionnalisme exemplaire. Test sur zone cachée avant intervention complète. Résultat sublime.",
    shortText: "Professionnalisme exemplaire sur tissu haut de gamme.",
    service: "Nettoyage Canapé Tissu",
    serviceSlug: "nettoyage-canape-tissu",
    verified: true,
  },
  {
    id: "t10",
    author: "Michel T.",
    location: "Bobigny",
    departmentCode: "93",
    rating: 5,
    date: "2024-10-20",
    text: "Fauteuil club en cuir vieilli que je tiens de mon père. Thomas a su le nettoyer tout en préservant sa patine. Un vrai travail d'artisan. Merci pour votre respect de ce meuble qui à une valeur sentimentale.",
    shortText: "Fauteuil club nettoyé avec respect de sa patine.",
    service: "Nettoyage Fauteuil",
    serviceSlug: "nettoyage-fauteuil",
    verified: true,
  },
  {
    id: "t11",
    author: "Émilie V.",
    location: "Saint-Maur-des-Fossés",
    departmentCode: "94",
    rating: 5,
    date: "2024-10-15",
    text: "Tache de stylo bille sur notre canapé beige... la catastrophe ! J'ai appelé en urgence et Thomas est intervenu le lendemain. Technique impressionnante, la tache a disparu progressivement sous mes yeux. Magique !",
    shortText: "Tache de stylo bille miraculeusement éliminée.",
    service: "Détachage Canapé",
    serviceSlug: "détachage-canape",
    verified: true,
  },
  {
    id: "t12",
    author: "Laurent D.",
    location: "Nanterre",
    departmentCode: "92",
    rating: 5,
    date: "2024-10-08",
    text: "Suite à un dégât des eaux, notre canapé avait développé des moisissures. L'intervention a permis d'éliminer les traces et surtout les odeurs de moisi. Le traitement anti-fongique est très efficace.",
    shortText: "Moisissures et odeurs de moisi éliminées.",
    service: "Désinfection Canapé",
    serviceSlug: "désinfection-canape",
    verified: true,
  },
];

/**
 * Récupère tous les témoignages
 */
export function getAllTestimonials(): Testimonial[] {
  return testimonials;
}

/**
 * Récupère les témoignages mis en avant
 */
export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.featured);
}

/**
 * Récupère les témoignages par service
 */
export function getTestimonialsByService(serviceSlug: string): Testimonial[] {
  return testimonials.filter((t) => t.serviceSlug === serviceSlug);
}

/**
 * Récupère les témoignages par département
 */
export function getTestimonialsByDepartment(departmentCode: string): Testimonial[] {
  return testimonials.filter((t) => t.departmentCode === departmentCode);
}

/**
 * Calcule la note moyenne
 */
export function getAverageRating(): number {
  const total = testimonials.reduce((sum, t) => sum + t.rating, 0);
  return Math.round((total / testimonials.length) * 10) / 10;
}

/**
 * Compte le nombre d'avis
 */
export function getReviewCount(): number {
  return testimonials.length;
}

/**
 * Génère le schema AggregateRating
 */
export function generateAggregateRatingSchema() {
  return {
    "@type": "AggregateRating",
    ratingValue: getAverageRating().toString(),
    reviewCount: getReviewCount().toString(),
    bestRating: "5",
    worstRating: "1",
  };
}

/**
 * Génère le schema Review pour un témoignage
 */
export function generateReviewSchema(testimonial: Testimonial) {
  return {
    "@type": "Review",
    author: {
      "@type": "Person",
      name: testimonial.author,
    },
    datePublished: testimonial.date,
    reviewBody: testimonial.text,
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating.toString(),
      bestRating: "5",
      worstRating: "1",
    },
  };
}
