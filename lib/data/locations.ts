// Locations - nettoyage-canape-a-domicile.fr
// Zone d'intervention : 25km autour de Romainville

export interface Location {
  slug: string;
  name: string;
  department: string;
  departmentCode: string;
  postalCode: string;
  population?: number;
  isHeadquarters?: boolean;
  nearbyLocations: string[];
  localInfo: {
    description: string;
    landmarks?: string[];
  };
}

export const locations: Location[] = [
  // Seine-Saint-Denis (93) - 11 villes
  {
    slug: "romainville",
    name: "Romainville",
    department: "Seine-Saint-Denis",
    departmentCode: "93",
    postalCode: "93230",
    population: 30000,
    isHeadquarters: true,
    nearbyLocations: ["les-lilas", "noisy-le-sec", "pantin", "montreuil"],
    localInfo: {
      description: "Siège de notre entreprise, nous intervenons rapidement à Romainville et ses environs pour le nettoyage de vos canapés.",
      landmarks: ["Parc de la Corniche des Forts", "Base de loisirs"],
    },
  },
  {
    slug: "pantin",
    name: "Pantin",
    department: "Seine-Saint-Denis",
    departmentCode: "93",
    postalCode: "93500",
    population: 55000,
    nearbyLocations: ["romainville", "le-pre-saint-gervais", "bobigny", "les-lilas"],
    localInfo: {
      description: "Intervention rapide à Pantin pour le nettoyage de canapés. Zone dynamique aux portes de Paris.",
      landmarks: ["Canal de l'Ourcq", "Grands Moulins de Pantin"],
    },
  },
  {
    slug: "bobigny",
    name: "Bobigny",
    department: "Seine-Saint-Denis",
    departmentCode: "93",
    postalCode: "93000",
    population: 53000,
    nearbyLocations: ["pantin", "noisy-le-sec", "bondy", "romainville"],
    localInfo: {
      description: "Préfecture de Seine-Saint-Denis, nous couvrons tout Bobigny pour vos besoins en nettoyage de canapés.",
      landmarks: ["Préfecture", "Bourse du travail"],
    },
  },
  {
    slug: "montreuil",
    name: "Montreuil",
    department: "Seine-Saint-Denis",
    departmentCode: "93",
    postalCode: "93100",
    population: 109000,
    nearbyLocations: ["romainville", "bagnolet", "vincennes", "fontenay-sous-bois"],
    localInfo: {
      description: "Plus grande ville de Seine-Saint-Denis, nous intervenons dans tous les quartiers de Montreuil.",
      landmarks: ["Murs à pêches", "Centre-ville historique"],
    },
  },
  {
    slug: "bagnolet",
    name: "Bagnolet",
    department: "Seine-Saint-Denis",
    departmentCode: "93",
    postalCode: "93170",
    population: 36000,
    nearbyLocations: ["montreuil", "les-lilas", "romainville", "paris-20"],
    localInfo: {
      description: "Aux portes de Paris, intervention rapide à Bagnolet pour le nettoyage professionnel de vos canapés.",
      landmarks: ["Parc Jean Moulin - Les Guilands"],
    },
  },
  {
    slug: "noisy-le-sec",
    name: "Noisy-le-Sec",
    department: "Seine-Saint-Denis",
    departmentCode: "93",
    postalCode: "93130",
    population: 44000,
    nearbyLocations: ["romainville", "bobigny", "bondy", "rosny-sous-bois"],
    localInfo: {
      description: "Intervention à Noisy-le-Sec et proximité immédiate pour vos canapés, fauteuils et sièges.",
    },
  },
  {
    slug: "bondy",
    name: "Bondy",
    department: "Seine-Saint-Denis",
    departmentCode: "93",
    postalCode: "93140",
    population: 54000,
    nearbyLocations: ["noisy-le-sec", "bobigny", "rosny-sous-bois", "villemomble"],
    localInfo: {
      description: "Nettoyage de canapés à Bondy. Intervention dans tous les quartiers de la ville.",
      landmarks: ["Parc de la Mairie"],
    },
  },
  {
    slug: "les-lilas",
    name: "Les Lilas",
    department: "Seine-Saint-Denis",
    departmentCode: "93",
    postalCode: "93260",
    population: 24000,
    nearbyLocations: ["romainville", "bagnolet", "pantin", "le-pre-saint-gervais"],
    localInfo: {
      description: "Ville résidentielle aux portes de Paris, nous intervenons rapidement aux Lilas.",
      landmarks: ["Place Charles de Gaulle"],
    },
  },
  {
    slug: "le-pre-saint-gervais",
    name: "Le Pré-Saint-Gervais",
    department: "Seine-Saint-Denis",
    departmentCode: "93",
    postalCode: "93310",
    population: 18000,
    nearbyLocations: ["pantin", "les-lilas", "romainville", "paris-19"],
    localInfo: {
      description: "Plus petite commune du département, intervention rapide au Pré-Saint-Gervais.",
    },
  },
  {
    slug: "rosny-sous-bois",
    name: "Rosny-sous-Bois",
    department: "Seine-Saint-Denis",
    departmentCode: "93",
    postalCode: "93110",
    population: 46000,
    nearbyLocations: ["noisy-le-sec", "villemomble", "montreuil", "fontenay-sous-bois"],
    localInfo: {
      description: "Nettoyage professionnel de canapés à Rosny-sous-Bois, proche centre commercial Domus.",
      landmarks: ["Centre commercial Domus", "Rosny 2"],
    },
  },
  {
    slug: "villemomble",
    name: "Villemomble",
    department: "Seine-Saint-Denis",
    departmentCode: "93",
    postalCode: "93250",
    population: 30000,
    nearbyLocations: ["rosny-sous-bois", "bondy", "neuilly-sur-marne", "gagny"],
    localInfo: {
      description: "Intervention à Villemomble pour le nettoyage de vos canapés et mobilier textile.",
    },
  },

  // Paris (75) - 4 arrondissements
  {
    slug: "paris-10",
    name: "Paris 10e",
    department: "Paris",
    departmentCode: "75",
    postalCode: "75010",
    population: 90000,
    nearbyLocations: ["paris-11", "paris-19", "pantin"],
    localInfo: {
      description: "Nettoyage de canapés Paris 10e arrondissement. Intervention rapide Gare du Nord, Canal Saint-Martin.",
      landmarks: ["Gare du Nord", "Gare de l'Est", "Canal Saint-Martin"],
    },
  },
  {
    slug: "paris-11",
    name: "Paris 11e",
    department: "Paris",
    departmentCode: "75",
    postalCode: "75011",
    population: 145000,
    nearbyLocations: ["paris-10", "paris-20", "montreuil", "bagnolet"],
    localInfo: {
      description: "Intervention nettoyage canapé Paris 11e. Quartiers Bastille, République, Oberkampf.",
      landmarks: ["Place de la Bastille", "Place de la République"],
    },
  },
  {
    slug: "paris-19",
    name: "Paris 19e",
    department: "Paris",
    departmentCode: "75",
    postalCode: "75019",
    population: 185000,
    nearbyLocations: ["paris-10", "paris-20", "pantin", "le-pre-saint-gervais"],
    localInfo: {
      description: "Nettoyage professionnel de canapés Paris 19e. Buttes-Chaumont, La Villette, Belleville.",
      landmarks: ["Parc des Buttes-Chaumont", "Parc de la Villette", "Bassin de la Villette"],
    },
  },
  {
    slug: "paris-20",
    name: "Paris 20e",
    department: "Paris",
    departmentCode: "75",
    postalCode: "75020",
    population: 195000,
    nearbyLocations: ["paris-11", "paris-19", "bagnolet", "les-lilas"],
    localInfo: {
      description: "Nettoyage de canapés Paris 20e arrondissement. Belleville, Ménilmontant, Père Lachaise.",
      landmarks: ["Cimetière du Père Lachaise", "Parc de Belleville"],
    },
  },

  // Val-de-Marne (94) - 3 villes
  {
    slug: "vincennes",
    name: "Vincennes",
    department: "Val-de-Marne",
    departmentCode: "94",
    postalCode: "94300",
    population: 50000,
    nearbyLocations: ["montreuil", "fontenay-sous-bois", "paris-20", "paris-11"],
    localInfo: {
      description: "Nettoyage de canapés à Vincennes. Proche Bois de Vincennes et château.",
      landmarks: ["Château de Vincennes", "Bois de Vincennes"],
    },
  },
  {
    slug: "fontenay-sous-bois",
    name: "Fontenay-sous-Bois",
    department: "Val-de-Marne",
    departmentCode: "94",
    postalCode: "94120",
    population: 53000,
    nearbyLocations: ["vincennes", "montreuil", "rosny-sous-bois", "nogent-sur-marne"],
    localInfo: {
      description: "Intervention nettoyage canapé à Fontenay-sous-Bois et environs.",
      landmarks: ["Parc de l'Hôtel de Ville"],
    },
  },
  {
    slug: "nogent-sur-marne",
    name: "Nogent-sur-Marne",
    department: "Val-de-Marne",
    departmentCode: "94",
    postalCode: "94130",
    population: 33000,
    nearbyLocations: ["fontenay-sous-bois", "vincennes", "neuilly-sur-marne", "gournay-sur-marne"],
    localInfo: {
      description: "Nettoyage professionnel de canapés à Nogent-sur-Marne, bords de Marne.",
      landmarks: ["Bords de Marne", "Pavillon Baltard"],
    },
  },
];

// Note: Neuilly-sur-Marne et Gournay-sur-Marne peuvent être ajoutés si souhaité (93/77)

export const getLocationBySlug = (slug: string): Location | undefined => {
  return locations.find((l) => l.slug === slug);
};

export const getAllLocationSlugs = (): string[] => {
  return locations.map((l) => l.slug);
};

export const getLocationsByDepartment = (departmentCode: string): Location[] => {
  return locations.filter((l) => l.departmentCode === departmentCode);
};

export const getDepartments = () => {
  const depts = new Map<string, { code: string; name: string; count: number }>();
  locations.forEach((l) => {
    if (!depts.has(l.departmentCode)) {
      depts.set(l.departmentCode, {
        code: l.departmentCode,
        name: l.department,
        count: 1,
      });
    } else {
      const dept = depts.get(l.departmentCode)!;
      dept.count++;
    }
  });
  return Array.from(depts.values());
};
