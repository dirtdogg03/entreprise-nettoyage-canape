// Services - nettoyage-canape-a-domicile.fr

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  category: 'canape' | 'siege' | 'traitement';
  keywords: string[];
  benefits: string[];
  priceRange: string;
  duration: string;
}

export const services: Service[] = [
  // Service principal avec pages villes
  {
    id: 'nettoyage-canape',
    slug: 'nettoyage-canape',
    name: 'Nettoyage de Canapé',
    shortDescription: 'Nettoyage professionnel à domicile pour tous types de canapés',
    description: 'Service complet de nettoyage à domicile pour canapés tissu, cuir, microfibre, velours et convertibles. Nous éliminons taches, odeurs et allergènes avec des produits professionnels respectueux de vos textiles.',
    icon: 'sofa',
    category: 'canape',
    keywords: ['nettoyage canapé', 'nettoyage canapé à domicile', 'nettoyer canapé professionnel'],
    benefits: ['Tous types de canapés (tissu, cuir, microfibre, velours)', 'Élimination taches et odeurs', 'Séchage rapide 2-4h'],
    priceRange: 'À partir de 59€',
    duration: '45min - 2h selon taille',
  },
  // Services détaillés par type (sans pages villes)
  {
    id: 'nettoyage-canape-tissu',
    slug: 'nettoyage-canape-tissu',
    name: 'Nettoyage Canapé Tissu',
    shortDescription: 'Nettoyage en profondeur pour canapés tissu',
    description: 'Service professionnel de nettoyage en profondeur pour tous types de canapés en tissu. Élimination des taches, odeurs et allergènes avec des produits écologiques.',
    icon: 'sofa',
    category: 'canape',
    keywords: ['nettoyage canapé tissu', 'nettoyer canapé tissu', 'nettoyage canapé tissu à domicile'],
    benefits: ['Élimine 99% des bactéries', 'Ravive les couleurs', 'Séchage rapide 2-4h'],
    priceRange: 'À partir de 59€',
    duration: '45min - 1h30',
  },
  {
    id: 'nettoyage-canape-cuir',
    slug: 'nettoyage-canape-cuir',
    name: 'Nettoyage Canapé Cuir',
    shortDescription: 'Entretien et soin spécialisé du cuir',
    description: 'Entretien et nettoyage spécialisé pour canapés en cuir. Nourrit le cuir, élimine les taches et redonne éclat à votre mobilier.',
    icon: 'sparkles',
    category: 'canape',
    keywords: ['nettoyage canapé cuir', 'entretien canapé cuir', 'nettoyer canapé cuir'],
    benefits: ['Préserve la souplesse', 'Évite les craquelures', 'Protection longue durée'],
    priceRange: 'À partir de 79€',
    duration: '1h - 1h30',
  },
  {
    id: 'nettoyage-canape-microfibre',
    slug: 'nettoyage-canape-microfibre',
    name: 'Nettoyage Canapé Microfibre',
    shortDescription: 'Technique adaptée à la microfibre',
    description: 'Nettoyage professionnel adapté aux canapés en microfibre. Technique spécifique pour préserver la texture douce et l\'aspect neuf.',
    icon: 'waves',
    category: 'canape',
    keywords: ['nettoyage canapé microfibre', 'nettoyer microfibre', 'canapé microfibre taches'],
    benefits: ['Conserve l\'aspect velours', 'Élimine les auréoles', 'Résultat uniforme'],
    priceRange: 'À partir de 69€',
    duration: '45min - 1h15',
  },
  {
    id: 'nettoyage-canape-velours',
    slug: 'nettoyage-canape-velours',
    name: 'Nettoyage Canapé Velours',
    shortDescription: 'Nettoyage délicat du velours',
    description: 'Nettoyage délicat pour canapés en velours. Préserve le tombé caractéristique et l\'éclat du velours avec des techniques douces.',
    icon: 'star',
    category: 'canape',
    keywords: ['nettoyage canapé velours', 'nettoyer velours', 'entretien canapé velours'],
    benefits: ['Conserve le tombé luxueux', 'Ravive l\'éclat', 'Protection velours'],
    priceRange: 'À partir de 89€',
    duration: '1h - 1h30',
  },
  {
    id: 'nettoyage-canape-angle',
    slug: 'nettoyage-canape-angle',
    name: 'Nettoyage Canapé d\'Angle',
    shortDescription: 'Service pour grands canapés d\'angle',
    description: 'Service de nettoyage complet pour grands canapés d\'angle. Traitement de toutes les sections, y compris les recoins difficiles d\'accès.',
    icon: 'maximize',
    category: 'canape',
    keywords: ['nettoyage canapé angle', 'nettoyer canapé angle', 'nettoyage grand canapé'],
    benefits: ['Résultat homogène', 'Accès aux recoins', 'Forfait grandes surfaces'],
    priceRange: 'À partir de 129€',
    duration: '1h30 - 2h30',
  },
  {
    id: 'nettoyage-canape-convertible',
    slug: 'nettoyage-canape-convertible',
    name: 'Nettoyage Canapé Convertible',
    shortDescription: 'Nettoyage canapés-lits et convertibles',
    description: 'Nettoyage spécialisé pour canapés-lits convertibles. Traitement de l\'assise, du dossier et du couchage avec attention au mécanisme.',
    icon: 'bed',
    category: 'canape',
    keywords: ['nettoyage canapé convertible', 'nettoyer canapé lit', 'nettoyage BZ clic-clac'],
    benefits: ['Hygiène du couchage', 'Anti-acariens matelas', 'Mécanisme préservé'],
    priceRange: 'À partir de 99€',
    duration: '1h30 - 2h',
  },
  {
    id: 'détachage-canape',
    slug: 'détachage-canape',
    name: 'Détachage Canapé',
    shortDescription: 'Élimination des taches tenaces',
    description: 'Service de détachage professionnel pour éliminer les taches tenaces : vin, café, encre, urine, sang, maquillage, graisse...',
    icon: 'eraser',
    category: 'traitement',
    keywords: ['détachage canapé', 'enlever tache canapé', 'tache vin canapé', 'tache urine canapé'],
    benefits: ['Taux réussite > 95%', 'Taches anciennes', 'Sans dégradation'],
    priceRange: 'À partir de 35€',
    duration: '30min - 1h',
  },
  {
    id: 'désinfection-canape',
    slug: 'désinfection-canape',
    name: 'Désinfection Canapé',
    shortDescription: 'Désinfection anti-bactérienne complète',
    description: 'Désinfection en profondeur de votre canapé. Élimine bactéries, virus, acariens et allergènes pour un environnement sain.',
    icon: 'shield',
    category: 'traitement',
    keywords: ['désinfection canapé', 'canapé anti-acariens', 'assainir canapé'],
    benefits: ['Élimine 99,9% des bactéries', 'Idéal allergiques', 'Désodorisation'],
    priceRange: 'À partir de 69€',
    duration: '1h - 1h30',
  },
  {
    id: 'nettoyage-fauteuil',
    slug: 'nettoyage-fauteuil',
    name: 'Nettoyage Fauteuil',
    shortDescription: 'Nettoyage tous types de fauteuils',
    description: 'Nettoyage professionnel de fauteuils : bergère, club, relaxation, fauteuil de bureau... Tous tissus et cuirs.',
    icon: 'armchair',
    category: 'siege',
    keywords: ['nettoyage fauteuil', 'nettoyer fauteuil', 'nettoyage fauteuil cuir'],
    benefits: ['Tarif avantageux', 'Tous types fauteuils', 'Tissu et cuir'],
    priceRange: 'À partir de 35€',
    duration: '30min - 45min',
  },
  {
    id: 'nettoyage-chaise',
    slug: 'nettoyage-chaise',
    name: 'Nettoyage Chaise',
    shortDescription: 'Nettoyage de chaises rembourrées',
    description: 'Nettoyage de chaises rembourrées : chaises de salle à manger, chaises de bureau, tabourets hauts... Tarif dégressif par lot.',
    icon: 'chair',
    category: 'siege',
    keywords: ['nettoyage chaise', 'nettoyer chaises salle à manger', 'nettoyage chaise bureau'],
    benefits: ['Prix attractif par lot', 'Nettoyage rapide', 'Pro et particuliers'],
    priceRange: 'À partir de 15€/chaise',
    duration: '15min par chaise',
  },
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((s) => s.slug === slug);
};

export const getAllServiceSlugs = (): string[] => {
  return services.map((s) => s.slug);
};

export const getServicesByCategory = (category: Service['category']): Service[] => {
  return services.filter((s) => s.category === category);
};
