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
    nearbyLocations: ["montreuil", "les-lilas", "romainville", "paris"],
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
    nearbyLocations: ["pantin", "les-lilas", "romainville", "paris"],
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
    nearbyLocations: ["rosny-sous-bois", "bondy"],
    localInfo: {
      description: "Intervention à Villemomble pour le nettoyage de vos canapés et mobilier textile.",
    },
  },
  // Paris (75) - Est parisien
  {
    slug: "paris",
    name: "Paris",
    department: "Paris",
    departmentCode: "75",
    postalCode: "75000",
    population: 2161000,
    nearbyLocations: ["pantin", "montreuil", "bagnolet", "les-lilas", "le-pre-saint-gervais", "vincennes"],
    localInfo: {
      description: "Nettoyage professionnel de canapés à Paris. Nous intervenons dans les 10e, 11e, 19e et 20e arrondissements : Canal Saint-Martin, Bastille, Oberkampf, Buttes-Chaumont, La Villette, Belleville, Ménilmontant, Père-Lachaise.",
      landmarks: ["Canal Saint-Martin", "Place de la Bastille", "Parc des Buttes-Chaumont", "Cimetière du Père Lachaise", "Parc de la Villette", "Parc de Belleville"],
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
    nearbyLocations: ["montreuil", "fontenay-sous-bois", "paris"],
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
    nearbyLocations: ["fontenay-sous-bois", "vincennes", "le-perreux-sur-marne", "joinville-le-pont"],
    localInfo: {
      description: "Nettoyage professionnel de canapés à Nogent-sur-Marne, bords de Marne.",
      landmarks: ["Bords de Marne", "Pavillon Baltard"],
    },
  },
  {
    slug: "saint-mande",
    name: "Saint-Mandé",
    department: "Val-de-Marne",
    departmentCode: "94",
    postalCode: "94160",
    population: 23000,
    nearbyLocations: ["vincennes", "charenton-le-pont", "montreuil"],
    localInfo: {
      description: "Intervention nettoyage canapé à Saint-Mandé, aux portes du Bois de Vincennes.",
      landmarks: ["Bois de Vincennes", "Lac Daumesnil"],
    },
  },
  {
    slug: "charenton-le-pont",
    name: "Charenton-le-Pont",
    department: "Val-de-Marne",
    departmentCode: "94",
    postalCode: "94220",
    population: 31000,
    nearbyLocations: ["saint-mande", "ivry-sur-seine", "maisons-alfort", "alfortville"],
    localInfo: {
      description: "Nettoyage de canapés à Charenton-le-Pont, confluence Seine-Marne.",
      landmarks: ["Bercy Village", "Confluence Seine-Marne"],
    },
  },
  {
    slug: "ivry-sur-seine",
    name: "Ivry-sur-Seine",
    department: "Val-de-Marne",
    departmentCode: "94",
    postalCode: "94200",
    population: 62000,
    nearbyLocations: ["charenton-le-pont", "vitry-sur-seine", "alfortville"],
    localInfo: {
      description: "Nettoyage professionnel de canapés à Ivry-sur-Seine, ville créative aux portes de Paris.",
      landmarks: ["Manufacture des Œillets", "Quais de Seine"],
    },
  },
  {
    slug: "vitry-sur-seine",
    name: "Vitry-sur-Seine",
    department: "Val-de-Marne",
    departmentCode: "94",
    postalCode: "94400",
    population: 95000,
    nearbyLocations: ["ivry-sur-seine", "alfortville"],
    localInfo: {
      description: "Intervention nettoyage canapé à Vitry-sur-Seine, plus grande ville du Val-de-Marne.",
      landmarks: ["MAC VAL", "Port à l'Anglais"],
    },
  },
  {
    slug: "maisons-alfort",
    name: "Maisons-Alfort",
    department: "Val-de-Marne",
    departmentCode: "94",
    postalCode: "94700",
    population: 55000,
    nearbyLocations: ["charenton-le-pont", "alfortville", "creteil", "saint-maur-des-fosses"],
    localInfo: {
      description: "Nettoyage de canapés à Maisons-Alfort, ville résidentielle au bord de la Marne.",
      landmarks: ["École Vétérinaire", "Parc du Confluent"],
    },
  },
  {
    slug: "alfortville",
    name: "Alfortville",
    department: "Val-de-Marne",
    departmentCode: "94",
    postalCode: "94140",
    population: 45000,
    nearbyLocations: ["charenton-le-pont", "maisons-alfort", "ivry-sur-seine", "vitry-sur-seine"],
    localInfo: {
      description: "Intervention nettoyage canapé à Alfortville, entre Seine et Marne.",
      landmarks: ["Pont d'Ivry", "Île au Cointre"],
    },
  },
  {
    slug: "creteil",
    name: "Créteil",
    department: "Val-de-Marne",
    departmentCode: "94",
    postalCode: "94000",
    population: 92000,
    nearbyLocations: ["maisons-alfort", "saint-maur-des-fosses", "alfortville"],
    localInfo: {
      description: "Nettoyage professionnel de canapés à Créteil, préfecture du Val-de-Marne.",
      landmarks: ["Lac de Créteil", "Cathédrale Notre-Dame", "Préfecture"],
    },
  },
  {
    slug: "joinville-le-pont",
    name: "Joinville-le-Pont",
    department: "Val-de-Marne",
    departmentCode: "94",
    postalCode: "94340",
    population: 19000,
    nearbyLocations: ["saint-maur-des-fosses", "nogent-sur-marne", "champigny-sur-marne", "fontenay-sous-bois"],
    localInfo: {
      description: "Nettoyage de canapés à Joinville-le-Pont, capitale du cinéma français.",
      landmarks: ["Studios de Joinville", "Île Fanac", "Pont de Joinville"],
    },
  },
  {
    slug: "saint-maur-des-fosses",
    name: "Saint-Maur-des-Fossés",
    department: "Val-de-Marne",
    departmentCode: "94",
    postalCode: "94100",
    population: 76000,
    nearbyLocations: ["joinville-le-pont", "creteil", "champigny-sur-marne", "nogent-sur-marne"],
    localInfo: {
      description: "Intervention nettoyage canapé à Saint-Maur-des-Fossés, dans la boucle de la Marne.",
      landmarks: ["Boucle de la Marne", "Parc de Saint-Maur", "Abbaye"],
    },
  },
  {
    slug: "champigny-sur-marne",
    name: "Champigny-sur-Marne",
    department: "Val-de-Marne",
    departmentCode: "94",
    postalCode: "94500",
    population: 77000,
    nearbyLocations: ["saint-maur-des-fosses", "joinville-le-pont", "bry-sur-marne", "fontenay-sous-bois"],
    localInfo: {
      description: "Nettoyage professionnel de canapés à Champigny-sur-Marne, ville familiale au bord de l'eau.",
      landmarks: ["Bords de Marne", "Base de loisirs", "Pont de Champigny"],
    },
  },
  {
    slug: "bry-sur-marne",
    name: "Bry-sur-Marne",
    department: "Val-de-Marne",
    departmentCode: "94",
    postalCode: "94360",
    population: 17000,
    nearbyLocations: ["champigny-sur-marne", "le-perreux-sur-marne", "nogent-sur-marne"],
    localInfo: {
      description: "Nettoyage de canapés à Bry-sur-Marne, village résidentiel aux portes de Marne-la-Vallée.",
      landmarks: ["Église Saint-Gervais", "Château de Bry"],
    },
  },
  {
    slug: "le-perreux-sur-marne",
    name: "Le Perreux-sur-Marne",
    department: "Val-de-Marne",
    departmentCode: "94",
    postalCode: "94170",
    population: 34000,
    nearbyLocations: ["nogent-sur-marne", "bry-sur-marne", "fontenay-sous-bois"],
    localInfo: {
      description: "Intervention nettoyage canapé au Perreux-sur-Marne, ville paisible au bord de l'eau.",
      landmarks: ["Bords de Marne", "Pont du Perreux", "Centre-ville"],
    },
  },
  // Hauts-de-Seine (92) - 15 villes
  {
    slug: "boulogne-billancourt",
    name: "Boulogne-Billancourt",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCode: "92100",
    population: 120000,
    nearbyLocations: ["issy-les-moulineaux", "saint-cloud"],
    localInfo: {
      description: "Nettoyage professionnel de canapés à Boulogne-Billancourt, plus grande ville des Hauts-de-Seine.",
      landmarks: ["Île Seguin", "Musée Albert-Kahn", "Parc de Billancourt"],
    },
  },
  {
    slug: "issy-les-moulineaux",
    name: "Issy-les-Moulineaux",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCode: "92130",
    population: 69000,
    nearbyLocations: ["boulogne-billancourt", "vanves", "malakoff"],
    localInfo: {
      description: "Intervention nettoyage canapé à Issy-les-Moulineaux, ville dynamique aux portes de Paris.",
      landmarks: ["Île Saint-Germain", "Fort d'Issy", "Héliport"],
    },
  },
  {
    slug: "montrouge",
    name: "Montrouge",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCode: "92120",
    population: 50000,
    nearbyLocations: ["malakoff", "vanves"],
    localInfo: {
      description: "Nettoyage de canapés à Montrouge, ville résidentielle au sud de Paris.",
      landmarks: ["Beffroi de Montrouge", "Cimetière de Montrouge"],
    },
  },
  {
    slug: "malakoff",
    name: "Malakoff",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCode: "92240",
    population: 31000,
    nearbyLocations: ["montrouge", "vanves"],
    localInfo: {
      description: "Intervention nettoyage canapé à Malakoff, commune populaire au sud de Paris.",
      landmarks: ["Théâtre 71", "Maison des Arts"],
    },
  },
  {
    slug: "vanves",
    name: "Vanves",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCode: "92170",
    population: 28000,
    nearbyLocations: ["issy-les-moulineaux", "malakoff"],
    localInfo: {
      description: "Nettoyage de canapés à Vanves, petite ville familiale aux portes de Paris.",
      landmarks: ["Parc Frédéric Pic", "Lycée Michelet"],
    },
  },
  {
    slug: "clichy",
    name: "Clichy",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCode: "92110",
    population: 63000,
    nearbyLocations: ["levallois-perret", "asnieres-sur-seine"],
    localInfo: {
      description: "Nettoyage professionnel de canapés à Clichy, ville dynamique au nord-ouest de Paris.",
      landmarks: ["Pavillon Vendôme", "Parc Roger Salengro"],
    },
  },
  {
    slug: "levallois-perret",
    name: "Levallois-Perret",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCode: "92300",
    population: 65000,
    nearbyLocations: ["clichy", "neuilly-sur-seine", "courbevoie"],
    localInfo: {
      description: "Intervention nettoyage canapé à Levallois-Perret, ville la plus dense de France.",
      landmarks: ["Hôtel de Ville", "Parc de la Planchette"],
    },
  },
  {
    slug: "neuilly-sur-seine",
    name: "Neuilly-sur-Seine",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCode: "92200",
    population: 60000,
    nearbyLocations: ["levallois-perret", "courbevoie", "puteaux"],
    localInfo: {
      description: "Nettoyage de canapés haut de gamme à Neuilly-sur-Seine, ville résidentielle prestigieuse.",
      landmarks: ["Bois de Boulogne", "Île de la Jatte", "Avenue Charles de Gaulle"],
    },
  },
  {
    slug: "courbevoie",
    name: "Courbevoie",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCode: "92400",
    population: 82000,
    nearbyLocations: ["neuilly-sur-seine", "levallois-perret", "puteaux"],
    localInfo: {
      description: "Nettoyage professionnel de canapés à Courbevoie, aux pieds de La Défense.",
      landmarks: ["La Défense", "Parc de Bécon", "Gare de Bécon-les-Bruyères"],
    },
  },
  {
    slug: "puteaux",
    name: "Puteaux",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCode: "92800",
    population: 45000,
    nearbyLocations: ["courbevoie", "neuilly-sur-seine", "suresnes", "nanterre"],
    localInfo: {
      description: "Intervention nettoyage canapé à Puteaux, entre La Défense et les coteaux de la Seine.",
      landmarks: ["La Défense", "Île de Puteaux", "Vieux Puteaux"],
    },
  },
  {
    slug: "suresnes",
    name: "Suresnes",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCode: "92150",
    population: 49000,
    nearbyLocations: ["puteaux", "nanterre", "saint-cloud"],
    localInfo: {
      description: "Nettoyage de canapés à Suresnes, ville sur les coteaux avec vue sur Paris.",
      landmarks: ["Mont Valérien", "Vignes de Suresnes", "Bords de Seine"],
    },
  },
  {
    slug: "nanterre",
    name: "Nanterre",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCode: "92000",
    population: 96000,
    nearbyLocations: ["puteaux", "suresnes", "colombes"],
    localInfo: {
      description: "Nettoyage professionnel de canapés à Nanterre, préfecture des Hauts-de-Seine.",
      landmarks: ["Préfecture", "Université Paris-Nanterre", "Parc André Malraux"],
    },
  },
  {
    slug: "colombes",
    name: "Colombes",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCode: "92700",
    population: 86000,
    nearbyLocations: ["nanterre", "asnieres-sur-seine"],
    localInfo: {
      description: "Intervention nettoyage canapé à Colombes, grande ville familiale des Hauts-de-Seine.",
      landmarks: ["Stade Yves-du-Manoir", "Coulée Verte", "Gare de Colombes"],
    },
  },
  {
    slug: "asnieres-sur-seine",
    name: "Asnières-sur-Seine",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCode: "92600",
    population: 87000,
    nearbyLocations: ["clichy", "colombes"],
    localInfo: {
      description: "Nettoyage de canapés à Asnières-sur-Seine, ville résidentielle au bord de Seine.",
      landmarks: ["Château d'Asnières", "Cimetière des Chiens", "Bords de Seine"],
    },
  },
  {
    slug: "saint-cloud",
    name: "Saint-Cloud",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    postalCode: "92210",
    population: 30000,
    nearbyLocations: ["boulogne-billancourt", "suresnes"],
    localInfo: {
      description: "Nettoyage de canapés haut de gamme à Saint-Cloud, ville résidentielle prestigieuse.",
      landmarks: ["Parc de Saint-Cloud", "Hippodrome", "Grande Cascade"],
    },
  },
];

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
