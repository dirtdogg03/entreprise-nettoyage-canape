// Company Data - nettoyage-canape-a-domicile.fr

// CRO Configuration Types
export interface CROConfig {
  whatsapp?: {
    enabled: boolean;
    phone?: string;
    message?: string;
  };
  mobileStickyBar?: {
    enabled: boolean;
  };
  exitIntent?: {
    enabled: boolean;
    title?: string;
    offer?: string;
  };
  phoneButton?: {
    enabled: boolean;
  };
  ecoLabels?: {
    enabled: boolean;
    title?: string;
    items?: Array<{
      icon: string;
      label: string;
      description?: string;
    }>;
  };
  urgencyBadge?: {
    enabled: boolean;
    type?: 'availability' | 'demand' | 'limited';
    message?: string;
    subMessage?: string;
  };
  beforeAfter?: {
    enabled: boolean;
    title?: string;
    subtitle?: string;
    description?: string;
    items?: Array<{
      id: string;
      title: string;
      before: string;
      after: string;
      description?: string;
    }>;
  };
}

export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  domain: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    department: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  serviceArea: {
    radius: string;
    headquarters: string;
    departments: string[];
  };
  cro?: CROConfig;
}

export const company: CompanyInfo = {
  name: "Nettoyage Canapé à Domicile",
  shortName: "Nettoyage Canapé",
  tagline: "Experts du nettoyage de canapés à domicile en Île-de-France",
  description: "Service professionnel de nettoyage de canapés, fauteuils et sièges à domicile. Intervention rapide dans un rayon de 25km autour de Romainville. Tissu, cuir, microfibre, velours - nous traitons tous les types de revêtements.",
  domain: "nettoyage-canape-a-domicile.fr",
  phone: "01 84 80 45 67", // TODO: Remplacer par le numéro réel
  email: "contact@nettoyage-canape-a-domicile.fr",
  address: {
    street: "12 Rue de la Fraternité", // TODO: Remplacer par l'adresse réelle
    city: "Romainville",
    postalCode: "93230",
    department: "Seine-Saint-Denis",
  },
  socialMedia: {
    facebook: "https://facebook.com/nettoyage.canape.domicile", // TODO: URLs réelles
    instagram: "https://instagram.com/nettoyage_canape_idf",
    linkedin: "https://linkedin.com/company/nettoyage-canape-domicile",
  },
  businessHours: {
    weekdays: "8h00 - 19h00",
    saturday: "9h00 - 18h00",
    sunday: "Fermé",
  },
  serviceArea: {
    radius: "25km",
    headquarters: "Romainville",
    departments: ["Seine-Saint-Denis (93)", "Paris (75)", "Val-de-Marne (94)", "Hauts-de-Seine (92)"],
  },
  // CRO Features - Toggle on/off as needed
  cro: {
    whatsapp: {
      enabled: true,
      phone: "33184804567", // Sans le +, format international
      message: "Bonjour, je souhaite un devis pour le nettoyage de mon canape.",
    },
    mobileStickyBar: {
      enabled: true,
    },
    exitIntent: {
      enabled: true,
      title: "Attendez ! -10% sur votre premier nettoyage",
      offer: "Utilisez le code BIENVENUE10 lors de votre demande de devis.",
    },
    phoneButton: {
      enabled: true,
    },
    ecoLabels: {
      enabled: true,
      title: "Nos Engagements Eco-Responsables",
      items: [
        { icon: "leaf", label: "Produits Ecologiques", description: "Respectueux de l'environnement" },
        { icon: "heart", label: "Sans Allergenes", description: "Produits hypoallergeniques" },
        { icon: "recycle", label: "Demarche Responsable", description: "Tri et recyclage" },
      ],
    },
    urgencyBadge: {
      enabled: true,
      type: "availability",
    },
    beforeAfter: {
      enabled: true,
      title: "Avant / Après",
      subtitle: "Nos Resultats",
      description: "Decouvrez la transformation de vos canapes grâce à notre expertise professionnelle.",
    },
  },
};

// SEO Meta Data
export const seoDefaults = {
  siteName: "Nettoyage Canapé à Domicile",
  titleSuffix: " | Nettoyage Canapé à Domicile",
  defaultTitle: "Nettoyage de Canapé à Domicile en Île-de-France | Expert Tissu, Cuir, Microfibre",
  defaultDescription: "Service professionnel de nettoyage de canapés à domicile. Intervention rapide en Seine-Saint-Denis, Paris et Val-de-Marne. Devis gratuit. Tissu, cuir, velours, microfibre.",
  keywords: [
    "nettoyage canapé à domicile",
    "nettoyage canapé tissu",
    "nettoyage canapé cuir",
    "détachage canapé",
    "désinfection canapé",
    "nettoyage fauteuil",
    "île-de-france",
    "seine-saint-denis",
  ],
};

// Schema.org LocalBusiness data
export const schemaLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  description: company.description,
  téléphone: company.phone,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    postalCode: company.address.postalCode,
    addressRegion: company.address.department,
    addressCountry: "FR",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 48.8847,
      longitude: 2.4347,
    },
    geoRadius: "25000",
  },
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "18:00",
    },
  ],
};
