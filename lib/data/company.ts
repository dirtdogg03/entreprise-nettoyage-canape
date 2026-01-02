// Informations entreprise - nettoyage-canape-a-domicile.fr

export const company = {
  name: "Nettoyage Canapé à Domicile",
  domain: "nettoyage-canape-a-domicile.fr",
  tagline: "Expert en nettoyage de canapés en Île-de-France",
  description: "Spécialiste du nettoyage professionnel de canapés à domicile. Intervention rapide dans toute l'Île-de-France, 25km autour de Romainville.",

  // Contact (placeholders - à remplacer)
  phone: "06 XX XX XX XX",
  email: "contact@nettoyage-canape-a-domicile.fr",

  // Adresse siège
  address: {
    street: "",
    city: "Romainville",
    postalCode: "93230",
    region: "Île-de-France",
    country: "France",
  },

  // Horaires
  openingHours: {
    weekdays: "8h00 - 19h00",
    saturday: "9h00 - 18h00",
    sunday: "Fermé",
  },

  // Réseaux sociaux (placeholders)
  social: {
    facebook: "",
    instagram: "",
    google: "",
  },

  // SEO
  seo: {
    titleSuffix: " | Nettoyage Canapé à Domicile",
    defaultKeywords: [
      "nettoyage canapé à domicile",
      "nettoyage canapé Île-de-France",
      "nettoyage canapé professionnel",
      "détachage canapé",
      "nettoyage canapé 93",
    ],
  },
} as const;

export type Company = typeof company;
