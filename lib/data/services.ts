// Services - nettoyage-canape-a-domicile.fr

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  shortDescription: string;
  icon: string;
  features: string[];
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  faq: { question: string; answer: string }[];
  priceRange: string;
  duration: string;
  keywords: string[];
}

export const services: Service[] = [
  {
    slug: "nettoyage-canape-tissu",
    name: "Nettoyage Canapé Tissu",
    shortName: "Canapé Tissu",
    description: "Service professionnel de nettoyage en profondeur pour tous types de canapés en tissu. Élimination des taches, odeurs et allergènes avec des produits écologiques.",
    shortDescription: "Nettoyage professionnel de canapés en tissu à domicile",
    icon: "Sofa",
    features: [
      "Nettoyage vapeur haute température",
      "Extraction des taches tenaces",
      "Désinfection anti-acariens",
      "Produits écologiques certifiés",
      "Séchage rapide (2-4h)",
    ],
    benefits: [
      "Élimine 99% des bactéries et allergènes",
      "Ravive les couleurs d'origine",
      "Prolonge la durée de vie du tissu",
      "Sans résidu chimique nocif",
    ],
    process: [
      { step: 1, title: "Diagnostic", description: "Analyse du tissu et identification des taches" },
      { step: 2, title: "Pré-traitement", description: "Application de détachants spécifiques" },
      { step: 3, title: "Nettoyage vapeur", description: "Injection-extraction haute pression" },
      { step: 4, title: "Finition", description: "Brossage et protection anti-taches" },
    ],
    faq: [
      { question: "Combien de temps faut-il pour nettoyer un canapé tissu ?", answer: "Le nettoyage dure en moyenne 45 minutes à 1h30 selon la taille et l'état du canapé." },
      { question: "Le canapé sera-t-il utilisable immédiatement ?", answer: "Le séchage prend 2 à 4 heures. Nous recommandons d'attendre avant de vous asseoir." },
      { question: "Les produits utilisés sont-ils sans danger pour les enfants ?", answer: "Oui, nous utilisons exclusivement des produits écologiques certifiés, sans danger pour les enfants et animaux." },
    ],
    priceRange: "À partir de 59€",
    duration: "45min - 1h30",
    keywords: ["nettoyage canapé tissu", "nettoyer canapé tissu", "nettoyage canapé tissu à domicile"],
  },
  {
    slug: "nettoyage-canape-cuir",
    name: "Nettoyage Canapé Cuir",
    shortName: "Canapé Cuir",
    description: "Entretien et nettoyage spécialisé pour canapés en cuir. Nourrit le cuir, élimine les taches et redonne éclat à votre mobilier.",
    shortDescription: "Nettoyage et soin du cuir professionnel à domicile",
    icon: "Armchair",
    features: [
      "Nettoyage doux adapté au cuir",
      "Nourrissage et hydratation",
      "Traitement anti-craquelures",
      "Raviveur de couleur",
      "Protection longue durée",
    ],
    benefits: [
      "Préserve la souplesse du cuir",
      "Évite le dessèchement et craquelures",
      "Élimine les traces de gras",
      "Prolonge la vie du canapé de plusieurs années",
    ],
    process: [
      { step: 1, title: "Dépoussiérage", description: "Retrait des poussières et particules" },
      { step: 2, title: "Nettoyage", description: "Produit spécial cuir en douceur" },
      { step: 3, title: "Nourrissage", description: "Application de crème hydratante pour cuir" },
      { step: 4, title: "Protection", description: "Couche protectrice anti-taches" },
    ],
    faq: [
      { question: "À quelle fréquence nettoyer un canapé en cuir ?", answer: "Nous recommandons un nettoyage professionnel tous les 6 à 12 mois, et un entretien régulier à domicile." },
      { question: "Pouvez-vous traiter tous les types de cuir ?", answer: "Oui, nous traitons le cuir pleine fleur, cuir pigmenté, nubuck et cuir synthétique." },
      { question: "Le cuir sera-t-il gras après le traitement ?", answer: "Non, nos produits pénètrent le cuir sans laisser de film gras en surface." },
    ],
    priceRange: "À partir de 79€",
    duration: "1h - 1h30",
    keywords: ["nettoyage canapé cuir", "entretien canapé cuir", "nettoyer canapé cuir"],
  },
  {
    slug: "nettoyage-canape-microfibre",
    name: "Nettoyage Canapé Microfibre",
    shortName: "Canapé Microfibre",
    description: "Nettoyage professionnel adapté aux canapés en microfibre. Technique spécifique pour préserver la texture douce et l'aspect neuf.",
    shortDescription: "Nettoyage expert de canapés microfibre à domicile",
    icon: "Sparkles",
    features: [
      "Technique adaptée à la microfibre",
      "Préservation de la texture",
      "Élimination des taches d'eau",
      "Anti-auréoles garanti",
      "Brossage directionnel",
    ],
    benefits: [
      "Conserve l'aspect velours de la microfibre",
      "Élimine les auréoles disgracieuses",
      "Restaure la douceur au toucher",
      "Résultat uniforme sans traces",
    ],
    process: [
      { step: 1, title: "Test de réaction", description: "Vérification sur zone cachée" },
      { step: 2, title: "Aspiration", description: "Retrait des poussières incrustées" },
      { step: 3, title: "Nettoyage adapté", description: "Méthode W ou S selon le code du tissu" },
      { step: 4, title: "Brossage", description: "Remise en forme des fibres" },
    ],
    faq: [
      { question: "La microfibre peut-elle être nettoyée à l'eau ?", answer: "Cela dépend du code d'entretien. Nous utilisons la méthode adaptée (eau ou solvant) selon votre canapé." },
      { question: "Comment éviter les auréoles sur microfibre ?", answer: "Notre technique professionnelle élimine les auréoles existantes et prévient leur réapparition." },
    ],
    priceRange: "À partir de 69€",
    duration: "45min - 1h15",
    keywords: ["nettoyage canapé microfibre", "nettoyer microfibre", "canapé microfibre taches"],
  },
  {
    slug: "nettoyage-canape-velours",
    name: "Nettoyage Canapé Velours",
    shortName: "Canapé Velours",
    description: "Nettoyage délicat pour canapés en velours. Préserve le tombé caractéristique et l'éclat du velours avec des techniques douces.",
    shortDescription: "Nettoyage spécialisé de canapés en velours",
    icon: "Star",
    features: [
      "Nettoyage ultra-doux",
      "Préservation du sens du poil",
      "Ravivage de la brillance",
      "Anti-écrasement des fibres",
      "Protection velours longue durée",
    ],
    benefits: [
      "Conserve le tombé luxueux du velours",
      "Élimine les traces et marques",
      "Ravive l'éclat et les reflets",
      "Protège contre les taches futures",
    ],
    process: [
      { step: 1, title: "Inspection", description: "Analyse du sens du velours et zones sensibles" },
      { step: 2, title: "Vapeur douce", description: "Nettoyage vapeur basse pression" },
      { step: 3, title: "Brossage sens poil", description: "Remise en place des fibres" },
      { step: 4, title: "Séchage contrôlé", description: "Éviter l'écrasement pendant le séchage" },
    ],
    faq: [
      { question: "Le velours supporte-t-il le nettoyage vapeur ?", answer: "Oui, avec une vapeur douce et basse pression, le velours retrouve son éclat sans dommage." },
      { question: "Comment entretenir mon canapé velours entre deux nettoyages ?", answer: "Passez régulièrement une brosse douce dans le sens du poil et aspirez à faible puissance." },
    ],
    priceRange: "À partir de 89€",
    duration: "1h - 1h30",
    keywords: ["nettoyage canapé velours", "nettoyer velours", "entretien canapé velours"],
  },
  {
    slug: "nettoyage-canape-angle",
    name: "Nettoyage Canapé d'Angle",
    shortName: "Canapé d'Angle",
    description: "Service de nettoyage complet pour grands canapés d'angle. Traitement de toutes les sections, y compris les recoins difficiles d'accès.",
    shortDescription: "Nettoyage professionnel de canapés d'angle XXL",
    icon: "LayoutGrid",
    features: [
      "Traitement de toutes les sections",
      "Nettoyage des recoins",
      "Tarif adapté grande taille",
      "Même qualité sur chaque module",
      "Séchage uniforme",
    ],
    benefits: [
      "Résultat homogène sur tout le canapé",
      "Pas de différence de teinte entre sections",
      "Accès aux zones difficiles",
      "Forfait avantageux grandes surfaces",
    ],
    process: [
      { step: 1, title: "Découpage zones", description: "Division en sections pour traitement méthodique" },
      { step: 2, title: "Nettoyage section par section", description: "Traitement uniforme de chaque partie" },
      { step: 3, title: "Jonctions", description: "Attention particulière aux angles et recoins" },
      { step: 4, title: "Contrôle final", description: "Vérification de l'homogénéité" },
    ],
    faq: [
      { question: "Combien coûte le nettoyage d'un canapé d'angle ?", answer: "Le prix dépend du nombre de places. Comptez environ 30-40€ par place assise." },
      { question: "Faut-il déplacer le canapé ?", answer: "Non, nous travaillons sur place. Nous pouvons légèrement le décaler du mur si nécessaire." },
    ],
    priceRange: "À partir de 129€",
    duration: "1h30 - 2h30",
    keywords: ["nettoyage canapé angle", "nettoyer canapé angle", "nettoyage grand canapé"],
  },
  {
    slug: "nettoyage-canape-convertible",
    name: "Nettoyage Canapé Convertible",
    shortName: "Canapé Convertible",
    description: "Nettoyage spécialisé pour canapés-lits convertibles. Traitement de l'assise, du dossier et du couchage avec attention au mécanisme.",
    shortDescription: "Nettoyage de canapés-lits et convertibles",
    icon: "BedDouble",
    features: [
      "Nettoyage partie assise",
      "Nettoyage partie couchage",
      "Respect du mécanisme",
      "Désinfection matelas intégré",
      "Traitement anti-acariens",
    ],
    benefits: [
      "Hygiène optimale pour dormir",
      "Élimination des acariens du couchage",
      "Pas de résidu sur le matelas",
      "Mécanisme préservé et fonctionnel",
    ],
    process: [
      { step: 1, title: "Déploiement", description: "Ouverture du canapé en mode lit" },
      { step: 2, title: "Nettoyage assise", description: "Traitement de la partie canapé" },
      { step: 3, title: "Nettoyage couchage", description: "Nettoyage et désinfection du matelas" },
      { step: 4, title: "Repliage", description: "Séchage et remise en configuration canapé" },
    ],
    faq: [
      { question: "Nettoyez-vous le matelas du convertible ?", answer: "Oui, nous traitons l'ensemble : assise, dossier et matelas intégré du couchage." },
      { question: "Le mécanisme risque-t-il d'être abîmé ?", answer: "Non, nous prenons soin de ne pas mouiller les parties mécaniques." },
    ],
    priceRange: "À partir de 99€",
    duration: "1h30 - 2h",
    keywords: ["nettoyage canapé convertible", "nettoyer canapé lit", "nettoyage BZ clic-clac"],
  },
  {
    slug: "detachage-canape",
    name: "Détachage Canapé",
    shortName: "Détachage",
    description: "Service de détachage professionnel pour éliminer les taches tenaces : vin, café, encre, urine, sang, maquillage, graisse...",
    shortDescription: "Élimination des taches tenaces sur canapé",
    icon: "Eraser",
    features: [
      "Traitement taches organiques",
      "Détachage taches grasses",
      "Élimination encre et feutre",
      "Traitement taches anciennes",
      "Produits spécifiques par type de tache",
    ],
    benefits: [
      "Taux de réussite > 95%",
      "Pas de dégradation du tissu",
      "Traitement des taches anciennes",
      "Devis gratuit si tache difficile",
    ],
    process: [
      { step: 1, title: "Identification", description: "Analyse de la nature de la tache" },
      { step: 2, title: "Test", description: "Essai du détachant sur zone cachée" },
      { step: 3, title: "Traitement", description: "Application du produit adapté" },
      { step: 4, title: "Rinçage", description: "Extraction et neutralisation" },
    ],
    faq: [
      { question: "Pouvez-vous enlever une tache de vin rouge ?", answer: "Oui, le vin rouge se traite très bien s'il n'a pas été frotté. Taux de réussite > 90%." },
      { question: "Et les taches d'urine animale ?", answer: "Nous éliminons la tache ET l'odeur avec un traitement enzymatique spécifique." },
      { question: "Combien coûte un détachage ?", answer: "Le détachage est souvent inclus dans le nettoyage complet. En intervention ciblée, à partir de 35€." },
    ],
    priceRange: "À partir de 35€",
    duration: "30min - 1h",
    keywords: ["détachage canapé", "enlever tache canapé", "tache vin canapé", "tache urine canapé"],
  },
  {
    slug: "desinfection-canape",
    name: "Désinfection Canapé",
    shortName: "Désinfection",
    description: "Désinfection en profondeur de votre canapé. Élimine bactéries, virus, acariens et allergènes pour un environnement sain.",
    shortDescription: "Désinfection anti-bactérienne et anti-acariens",
    icon: "ShieldCheck",
    features: [
      "Élimination 99,9% des bactéries",
      "Traitement anti-acariens",
      "Neutralisation des virus",
      "Désodorisation complète",
      "Certification produits virucides",
    ],
    benefits: [
      "Environnement sain pour la famille",
      "Idéal pour allergiques et asthmatiques",
      "Élimine les odeurs à la source",
      "Protection longue durée",
    ],
    process: [
      { step: 1, title: "Aspiration profonde", description: "Retrait des acariens et poussières" },
      { step: 2, title: "Nettoyage vapeur 180°C", description: "Élimination thermique des pathogènes" },
      { step: 3, title: "Traitement désinfectant", description: "Application de solution virucide" },
      { step: 4, title: "Assainissement UV", description: "Finalisation aux UV-C si nécessaire" },
    ],
    faq: [
      { question: "La désinfection est-elle utile contre les allergies ?", answer: "Oui, nous éliminons les acariens responsables de 80% des allergies respiratoires à domicile." },
      { question: "Les produits désinfectants sont-ils dangereux ?", answer: "Non, nous utilisons des produits certifiés, sans danger après séchage (environ 1h)." },
    ],
    priceRange: "À partir de 69€",
    duration: "1h - 1h30",
    keywords: ["désinfection canapé", "canapé anti-acariens", "assainir canapé"],
  },
  {
    slug: "nettoyage-fauteuil",
    name: "Nettoyage Fauteuil",
    shortName: "Fauteuil",
    description: "Nettoyage professionnel de fauteuils : bergère, club, relaxation, fauteuil de bureau... Tous tissus et cuirs.",
    shortDescription: "Nettoyage de tous types de fauteuils",
    icon: "ArmchairIcon",
    features: [
      "Tous types de fauteuils",
      "Tissu, cuir, velours",
      "Fauteuils de bureau",
      "Fauteuils relaxation",
      "Bergères et clubs",
    ],
    benefits: [
      "Tarif avantageux par fauteuil",
      "Même qualité que pour canapés",
      "Traitement adapté au revêtement",
      "Idéal en complément du canapé",
    ],
    process: [
      { step: 1, title: "Identification", description: "Type de fauteuil et revêtement" },
      { step: 2, title: "Préparation", description: "Dépoussiérage et pré-traitement" },
      { step: 3, title: "Nettoyage", description: "Technique adaptée au matériau" },
      { step: 4, title: "Finition", description: "Protection et séchage" },
    ],
    faq: [
      { question: "Quel est le prix pour un fauteuil ?", answer: "Comptez 35 à 55€ par fauteuil selon le type et l'état. Tarif dégressif si plusieurs." },
      { question: "Nettoyez-vous les fauteuils de bureau ?", answer: "Oui, tissu comme cuir/similicuir. Parfait pour un environnement de travail sain." },
    ],
    priceRange: "À partir de 35€",
    duration: "30min - 45min",
    keywords: ["nettoyage fauteuil", "nettoyer fauteuil", "nettoyage fauteuil cuir"],
  },
  {
    slug: "nettoyage-chaise",
    name: "Nettoyage Chaise",
    shortName: "Chaises",
    description: "Nettoyage de chaises rembourrées : chaises de salle à manger, chaises de bureau, tabourets hauts... Tarif dégressif par lot.",
    shortDescription: "Nettoyage de chaises et sièges rembourrés",
    icon: "Chair",
    features: [
      "Chaises salle à manger",
      "Chaises de bureau",
      "Tabourets hauts",
      "Tarif dégressif par lot",
      "Tous revêtements",
    ],
    benefits: [
      "Prix attractif par lot",
      "Nettoyage rapide et efficace",
      "Résultat uniforme sur l'ensemble",
      "Idéal restaurateurs et particuliers",
    ],
    process: [
      { step: 1, title: "Comptage", description: "Évaluation du nombre et de l'état" },
      { step: 2, title: "Préparation", description: "Aspiration de l'ensemble" },
      { step: 3, title: "Nettoyage en série", description: "Traitement méthodique par lot" },
      { step: 4, title: "Contrôle", description: "Vérification de chaque chaise" },
    ],
    faq: [
      { question: "Quel est le prix par chaise ?", answer: "15 à 25€ par chaise selon le revêtement. Prix dégressif : 6 chaises = -20%." },
      { question: "Intervenez-vous chez les professionnels ?", answer: "Oui, nous travaillons avec restaurants, hôtels et entreprises. Devis sur mesure." },
    ],
    priceRange: "À partir de 15€/chaise",
    duration: "15min par chaise",
    keywords: ["nettoyage chaise", "nettoyer chaises salle à manger", "nettoyage chaise bureau"],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((s) => s.slug === slug);
};

export const getAllServiceSlugs = (): string[] => {
  return services.map((s) => s.slug);
};
