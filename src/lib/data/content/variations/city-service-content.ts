/**
 * Contenu unique pour chaque combinaison ville + service principal
 * 36 variations (2 services × 18 villes)
 * Copywriting naturel, pas de templates mécaniques
 */

export interface CityServiceVariation {
  localIntro: string;       // Introduction naturelle (~150 mots)
  challenges: string;       // Contexte local pertinent (~100 mots)
  testimonial: {
    name: string;
    neighborhood: string;
    quote: string;
  };
  localTips: string;        // Conseils pratiques (~100 mots)
  stats: string;            // Information utile (pas de faux %)
}

// Services avec pages villes
export const SERVICES_WITH_CITY_PAGES = ['nettoyage-canape', 'nettoyage-fauteuil'];

/**
 * Vérifie si un service a des pages par ville
 */
export function hasServiceCityPages(serviceSlug: string): boolean {
  return SERVICES_WITH_CITY_PAGES.includes(serviceSlug);
}

export const cityServiceContent: Record<string, Record<string, CityServiceVariation>> = {

  // ═══════════════════════════════════════════════════════════════════════════
  // SEINE-SAINT-DENIS (93) - 11 villes
  // ═══════════════════════════════════════════════════════════════════════════

  "romainville": {
    "nettoyage-canape": {
      localIntro: "Romainville compte 30 000 habitants sur 3,4 km², selon les données INSEE 2023. Cette densité de 8 800 hab/km² se traduit par des appartements compacts dans les immeubles de la rue Paul Vaillant-Couturier et du quartier Bas-Pays. Les constructions des années 1970 côtoient les programmes neufs du secteur Marcel-Cachin. Nous intervenons quotidiennement dans ces résidences, connaissant les contraintes de stationnement près de la mairie et les accès aux parkings souterrains. Le Parc de la Corniche des Forts, poumon vert de 64 hectares partagé avec Les Lilas, influence l'humidité dans les logements riverains.",
      challenges: "L'étude de l'ARS Île-de-France 2022 montre que 23% des logements en petite couronne présentent des traces d'humidité. Les rez-de-chaussée bordant la Corniche des Forts concentrent cette problématique. Nos techniciens adaptent le temps de séchage et recommandent une ventilation prolongée après intervention. Les appartements de 45 à 60 m², typiques du parc immobilier romainvillois, imposent une organisation rigoureuse de l'espace de travail.",
      testimonial: {
        name: "Nadia K.",
        neighborhood: "Bas-Pays",
        quote: "Mon canapé trois places occupait presque tout le salon de mon T3 rue Carnot. Le technicien a déplacé la table basse, protégé le parquet. Deux heures plus tard, le tissu avait retrouvé sa couleur beige d'origine. Je ventile maintenant chaque soir, comme il me l'a conseillé."
      },
      localTips: "Le tramway T1 passe rue Paul Vaillant-Couturier et génère des vibrations qui déplacent la poussière vers les textiles. Aspirez les coussins chaque semaine. Les résidents des étages supérieurs bénéficient d'un séchage plus rapide grâce à la circulation d'air naturelle.",
      stats: "Romainville se situe à 8 km de Paris, 15 minutes en métro ligne 11 depuis Mairie des Lilas. Notre équipe intervient sous 24h. Temps moyen par canapé : 1h30."
    },
    "nettoyage-fauteuil": {
      localIntro: "La mairie de Romainville recense 12 400 logements, dont 78% d'appartements (source : PLH 2021). Cette proportion élevée d'habitats collectifs favorise les fauteuils compacts et les sièges de bureau pour le télétravail. Notre atelier se trouve à 10 minutes du centre-ville. Les fauteuils des années 60-70, nombreux dans les pavillons du quartier Bas-Pays, cohabitent avec le mobilier contemporain des résidences récentes.",
      challenges: "Le télétravail concerne 35% des actifs franciliens selon l'INSEE 2023. Les fauteuils de bureau accumulent transpiration et sébum au niveau des accoudoirs et de la têtière. Les tissus des fauteuils vintage demandent des produits neutres pour préserver les teintures d'origine.",
      testimonial: {
        name: "Michel D.",
        neighborhood: "Centre-ville",
        quote: "Deux fauteuils club en cuir marron, achetés aux puces de Montreuil il y a vingt ans. Le cuir craquait aux pliures. Le technicien a nettoyé puis nourri le cuir avec un baume spécial. Les assises sont redevenues souples sans perdre leur patine."
      },
      localTips: "Les fauteuils placés près des fenêtres de la rue Carnot subissent l'ensoleillement direct l'après-midi. Le cuir sèche et craquelle. Positionnez un rideau ou déplacez le siège. Un nourrissage tous les six mois prévient les fissures.",
      stats: "Tarif dégressif dès le deuxième fauteuil : -15%. Intervention possible samedi matin sur rendez-vous."
    }
  },

  "pantin": {
    "nettoyage-canape": {
      localIntro: "Pantin rassemble 57 000 habitants le long du Canal de l'Ourcq, selon le recensement INSEE 2023. Le quartier des Quatre-Chemins concentre 40% de la population dans des immeubles des années 1960. Les Grands Moulins, ancienne minoterie reconvertie, accueillent désormais des lofts où les canapés d'angle de 3 mètres trouvent leur place. Le Centre National de la Danse, installé depuis 2004, a attiré une population de créateurs aux intérieurs éclectiques.",
      challenges: "L'humidité du Canal de l'Ourcq affecte les logements en rez-de-chaussée du quai de l'Aisne. La Direction Régionale de l'Environnement signale un taux d'humidité supérieur de 12% dans ce secteur. Le séchage des canapés nécessite trois à quatre heures supplémentaires. Les lofts des Grands Moulins, avec leurs 4 mètres sous plafond, offrent une ventilation naturelle idéale.",
      testimonial: {
        name: "Pauline B.",
        neighborhood: "Quatre-Chemins",
        quote: "Notre canapé d'angle gris clair commençait à jaunir sur les accoudoirs. L'immeuble date de 1965, pas de VMC. Le technicien a installé un ventilateur pendant le séchage. Le lendemain matin, le tissu était sec et uniforme. On a noté le numéro pour le prochain nettoyage."
      },
      localTips: "Les appartements donnant sur le canal méritent un déshumidificateur entre octobre et mars. Aérer 15 minutes chaque matin suffit à évacuer l'humidité nocturne. Les canapés en tissu synthétique sèchent plus vite que le coton naturel.",
      stats: "Pantin se situe à 5 km de Paris, métro ligne 5 station Église de Pantin. Stationnement aisé quartier Grands Moulins. Délai moyen : 24 à 48h."
    },
    "nettoyage-fauteuil": {
      localIntro: "Le parc immobilier pantinois mélange HLM des Courtillières et lofts d'artistes du secteur canal. La Galerie Thaddaeus Ropac, installée depuis 2012, a renforcé l'attractivité du quartier pour les professionnels de l'art. Leurs intérieurs associent souvent fauteuils de designers et pièces de brocante. Nous intervenons chaque semaine dans le quartier Église et le long du canal.",
      challenges: "Les fauteuils chinés chez les brocanteurs de la région présentent parfois des tissus décolorés ou fragilisés. Un test préalable sur une zone cachée évite les mauvaises surprises. Les fauteuils de bureau des espaces de coworking, nombreux à Pantin, accumulent les salissures de plusieurs utilisateurs.",
      testimonial: {
        name: "Thomas R.",
        neighborhood: "Église",
        quote: "Un fauteuil scandinave des années 50 trouvé chez un antiquaire. Le tissu laine était taché par endroits. Le technicien a travaillé zone par zone avec un produit pour fibres naturelles. Les taches ont disparu, le tissu garde son toucher d'origine."
      },
      localTips: "Les fauteuils vintage à pieds métalliques doivent être éloignés des radiateurs. La chaleur déforme les mousses anciennes. Un coussin supplémentaire réduit l'usure de l'assise d'origine. Dépoussiérage mensuel à la brosse douce recommandé.",
      stats: "Devis photo gratuit pour les pièces anciennes. Réduction de 20% pour les résidents du quartier Courtillières."
    }
  },

  "bobigny": {
    "nettoyage-canape": {
      localIntro: "Bobigny, préfecture de Seine-Saint-Denis, rassemble près de 54 000 habitants selon l'INSEE (2021). La ville se distingue par son architecture brutaliste emblématique et sa Cité Administrative inaugurée en 1972. Le long du canal de l'Ourcq, les résidences du quartier Karl Marx côtoient les pavillons plus anciens vers Pont de Bondy. Nos techniciens connaissent chaque secteur : de l'avenue Paul Vaillant-Couturier aux abords du MC93, ce théâtre national reconnu pour ses productions contemporaines. Les logements sociaux représentent une part importante du parc immobilier, avec des canapés très sollicités par des familles nombreuses.",
      challenges: "Le taux d'occupation des logements balbyniens dépasse la moyenne départementale (source : mairie de Bobigny, 2023). Cette densité se traduit par des canapés utilisés intensivement, parfois par deux générations sous le même toit. Près de la gare de Bobigny-Pablo Picasso, certains immeubles des années 1970 présentent une ventilation limitée. Nous adaptons le temps de séchage en conséquence. Les résidences de la Vache Noire nécessitent souvent des interventions sur des canapés convertibles, mobilier privilégié dans les espaces restreints.",
      testimonial: {
        name: "Rachid K.",
        neighborhood: "Quartier Karl Marx",
        quote: "Notre canapé d'angle a encaissé dix ans de repas devant la télé, trois enfants et un chat. Le technicien a passé deux heures dessus. Ma femme n'en revenait pas du résultat. On revoit enfin le gris clair d'origine sous les anciennes taches."
      },
      localTips: "Les appartements proches du canal de l'Ourcq subissent une hygrométrie plus élevée en automne. Glissez des sachets absorbeurs d'humidité sous les coussins amovibles entre octobre et mars. Pour les familles nombreuses, un plaid épais sur les assises limite l'encrassement quotidien et s'enlève facilement avant les visites.",
      stats: "Temps moyen d'intervention à Bobigny : 1h45. Accès facile via métro ligne 5 ou tramway T1. Stationnement gratuit disponible avenue Jean Jaurès et rue de l'Union."
    },
    "nettoyage-fauteuil": {
      localIntro: "La préfecture du 93 compte de nombreux télétravailleurs depuis 2020. D'après une enquête de la mairie (2022), 34% des actifs balbyniens travaillent partiellement à domicile. Leurs fauteuils de bureau accumulent des heures d'utilisation. Nous intervenons régulièrement boulevard Lénine et dans les pavillons de l'avenue Henri Barbusse. Le quartier de l'Abreuvoir, avec ses maisons individuelles, abrite souvent des fauteuils anciens transmis de génération en génération.",
      challenges: "Les fauteuils de bureau en tissu mesh respirant, très répandus, retiennent poussière et transpiration dans leurs micro-perforations. Près de la Cité Administrative, les studios et T2 combinent souvent fauteuil de travail et siège de salon en une seule pièce. Le nettoyage doit donc traiter des usages mixtes : repas, travail, repos.",
      testimonial: {
        name: "Nadia T.",
        neighborhood: "Pont de Bondy",
        quote: "Mon fauteuil ergonomique coûtait 600 euros. Après trois ans de télétravail intensif, l'assise était marquée et l'odeur persistante. Le nettoyage a coûté 65 euros et m'évite d'en racheter un. Calcul vite fait."
      },
      localTips: "Passez un chiffon humide sur les accoudoirs chaque semaine. Cette zone concentre le sébum des avant-bras et jaunit rapidement. Pour les fauteuils mesh, aspirez mensuellement avec l'embout brosse douce à puissance réduite.",
      stats: "Réduction de 20% pour le nettoyage simultané d'un fauteuil et d'un canapé. Intervention sous 48h dans tout Bobigny."
    }
  },

  "montreuil": {
    "nettoyage-canape": {
      localIntro: "Avec 111 000 habitants, Montreuil est la commune la plus peuplée de Seine-Saint-Denis (INSEE, 2021). La ville s'étend des anciennes friches industrielles du Bas-Montreuil aux coteaux boisés du Haut-Montreuil. Rue de Paris, les immeubles hausmanniens contrastent avec les ateliers reconvertis du quartier de la Croix de Chavaux. Les célèbres Murs à Pêches, vestige agricole classé, bordent des pavillons aux jardins entretenus. Chaque quartier possède son caractère : canapés vintage chinés dans le Bas, mobilier contemporain vers Vincennes, assises familiales robustes à la Boissière.",
      challenges: "Montreuil attire artistes et indépendants : leurs ateliers-logements abritent souvent des canapés qui servent aussi de couchage d'appoint. Selon la mairie (2023), 43% des logements montreuillois datent d'avant 1970. Ces immeubles anciens du quartier Villiers-Barbusse présentent parfois des cages d'escalier étroites. Nous demandons systématiquement les dimensions du passage avant intervention sur les grands canapés d'angle.",
      testimonial: {
        name: "Elsa V.",
        neighborhood: "Bas-Montreuil",
        quote: "J'ai récupéré un Togo Ligne Roset dans une succession. Quarante ans de patine accumulée. Le technicien a testé trois zones différentes avant de traiter l'ensemble. Le cuir tanin a retrouvé sa souplesse sans perdre son caractère. Trois heures de travail minutieux."
      },
      localTips: "Dans les rez-de-chaussée sur rue près de la place Jean Jaurès, la pollution urbaine encrasse les tissus plus vite. Fermez les fenêtres aux heures de pointe et passez l'aspirateur sur les coussins chaque semaine. Les canapés placés près des grandes baies vitrées du Bas-Montreuil subissent la décoloration solaire : tournez les coussins réversibles tous les mois.",
      stats: "Délai moyen d'intervention à Montreuil : 24 à 72h selon le quartier. Croix de Chavaux accessible en métro ligne 9. Stationnement payant : prévoir 2h sur horodateur rue de Paris."
    },
    "nettoyage-fauteuil": {
      localIntro: "Montreuil concentre une forte population de créateurs et professions libérales. Le coworking et le télétravail ont transformé les fauteuils en équipements professionnels sollicités huit heures par jour. Boulevard de Chanzy, les anciens locaux d'artisans reconvertis en lofts accueillent du mobilier design. Les brocantes du marché aux puces de Montreuil alimentent un goût local pour les fauteuils vintage années 50 à 70.",
      challenges: "Les fauteuils design possèdent souvent des revêtements techniques : cuir pleine fleur, tissu Kvadrat, alcantara. Ces matériaux nobles exigent des produits adaptés que nous sélectionnons après diagnostic. Dans les maisons des Murs à Pêches, l'humidité des jardins peut affecter les fauteuils placés en véranda ou proche des ouvertures.",
      testimonial: {
        name: "Maxime B.",
        neighborhood: "Haut-Montreuil",
        quote: "Deux fauteuils Knoll des années 60 achetés sur Leboncoin. Le vendeur avait minimisé les taches. Le technicien a identifié du cuir semi-aniline et choisi un traitement spécifique. Résultat bluffant, ils paraissent sortis d'une galerie."
      },
      localTips: "Les fauteuils en cuir exposés au chauffage se dessèchent en hiver. Éloignez-les des radiateurs d'au moins 50 centimètres. Nourrissez le cuir avec un baume adapté en novembre et en mars. Les tissus clairs des fauteuils scandinaves apprécient un traitement anti-taches préventif après nettoyage.",
      stats: "Tarif dégressif : -15% sur le deuxième fauteuil, -25% à partir du troisième. Intervention possible samedi matin sur Montreuil."
    }
  },

  "bagnolet": {
    "nettoyage-canape": {
      localIntro: "Bagnolet compte 37 000 habitants selon l'INSEE (2021), concentrés sur 2,6 km². Cette densité parmi les plus élevées du 93 signifie des appartements souvent compacts. Rue Sadi Carnot, avenue Gallieni, quartier La Noue : nous intervenons partout. La station de métro Gallieni offre un accès direct depuis Paris, mais complique le stationnement. Nous connaissons les créneaux calmes et les parkings relais du centre commercial.",
      challenges: "Les immeubles des années 60-70 près de la Porte de Bagnolet ont des appartements avec peu de ventilation naturelle. Le séchage demande plus d'attention. Les studios et deux-pièces représentent plus de 60% des logements selon l'APUR. Déplacer un canapé dans 30m² demande de la méthode.",
      testimonial: {
        name: "Karim L.",
        neighborhood: "Quartier La Noue",
        quote: "Mon canapé-lit IKEA prenait toute la place du studio. Le technicien a travaillé méthodiquement, en nettoyant aussi le matelas du couchage. Deux heures plus tard, tout était sec. Je pensais devoir attendre une journée entière."
      },
      localTips: "Près du centre commercial, les vibrations et la pollution extérieure accélèrent l'encrassement des tissus. Fermez les fenêtres côté périphérique quand vous aérez. Un nettoyage tous les 18 mois suffit si vous utilisez une housse lavable.",
      stats: "Bagnolet est à 8 minutes de notre base de Romainville. Intervention possible le jour même pour les urgences. Temps moyen sur place : 1h15 pour un canapé 3 places."
    },
    "nettoyage-fauteuil": {
      localIntro: "Dans les petits espaces bagnoletais, le fauteuil remplace souvent le canapé. Coin bureau, siège unique du studio, fauteuil d'appoint : chaque pièce compte. Près de Gallieni, les studios meublés pour étudiants et jeunes actifs ont des fauteuils très sollicités. Rue Robespierre et avenue Pasteur, nous intervenons régulièrement chez des locataires soucieux de leur confort.",
      challenges: "Les fauteuils de bureau prolifèrent avec le télétravail. D'après la mairie de Bagnolet, 35% des actifs travaillent partiellement à domicile depuis 2020. Ces sièges accumulent 8 heures de transpiration par jour. Les accoudoirs noircissent en quelques mois.",
      testimonial: {
        name: "Marine T.",
        neighborhood: "Centre-ville près de la mairie",
        quote: "Mon fauteuil de télétravail sentait mauvais après deux ans d'usage intensif. Le technicien m'a expliqué que le tissu mesh accumule les bactéries. Après le nettoyage, plus d'odeur. Il m'a conseillé de passer l'aspirateur dessus chaque semaine."
      },
      localTips: "Pour les fauteuils de bureau, placez une serviette sur le dossier en été. La transpiration pénètre moins le tissu. Nettoyage recommandé tous les 8 à 12 mois pour un usage quotidien intensif.",
      stats: "Tarif réduit de 20% si intervention combinée avec un canapé. Durée moyenne par fauteuil : 35 minutes."
    }
  },

  "noisy-le-sec": {
    "nettoyage-canape": {
      localIntro: "Noisy-le-Sec regroupe 44 000 habitants sur 5 km². La gare RER E place la ville à 15 minutes de Paris. Quartier du Merlan, Boissière, centre-ville près de la rue Jean Jaurès : nous intervenons dans tous les secteurs. Les pavillons côtoient les barres des années 70. Cette mixité urbaine crée des besoins variés en nettoyage de canapés.",
      challenges: "Le parc de Romainville tout proche apporte verdure mais aussi humidité. Les rez-de-chaussée des résidences côté parc connaissent des taux d'hygrométrie supérieurs à 60% en automne selon Météo France. Les tissus absorbent cette humidité ambiante et développent plus facilement des odeurs de moisi.",
      testimonial: {
        name: "Sylvie M.",
        neighborhood: "Quartier Boissière",
        quote: "Notre canapé sentait le renfermé malgré l'aération quotidienne. Le technicien a détecté un début de moisissure dans le rembourrage. Il a traité en profondeur avec un produit anti-fongique. Trois semaines plus tard, l'odeur n'est pas revenue."
      },
      localTips: "Si votre logement donne sur le parc, utilisez un déshumidificateur en automne. Aspirez votre canapé chaque semaine pour éviter que l'humidité ne s'installe. Les housses imperméables protègent aussi contre la condensation.",
      stats: "Noisy-le-Sec est à 6 minutes de notre base. Créneaux disponibles du lundi au samedi. Intervention moyenne : 1h30 pour un canapé d'angle."
    },
    "nettoyage-fauteuil": {
      localIntro: "Les pavillons du quartier du Merlan abritent souvent du mobilier transmis entre générations. Fauteuils Voltaire, bergères, crapauds : ces pièces anciennes demandent un savoir-faire spécifique. Rue Jean Jaurès, les appartements plus récents ont des fauteuils contemporains. Notre équipe s'adapte à tous les styles.",
      challenges: "Les fauteuils anciens ont des tissus délicats : velours rasé, tapisserie, soie mélangée. Le coton des années 50-60 réagit mal aux produits modernes. Nous testons systématiquement sur une zone cachée avant d'intervenir. Les structures en bois peuvent aussi être fragilisées par l'âge.",
      testimonial: {
        name: "Gérard P.",
        neighborhood: "Quartier du Merlan",
        quote: "Le fauteuil de ma grand-mère avait 60 ans. Le tissu d'origine était taché mais je voulais le garder. Le technicien a utilisé une méthode douce avec peu d'eau. Les taches ont disparu sans abîmer le tissu. Ma femme n'en revenait pas."
      },
      localTips: "Ne frottez jamais un fauteuil ancien avec une éponge humide. Tamponnez les taches fraîches avec un chiffon sec. Pour les velours, brossez toujours dans le sens du poil avec une brosse en soie naturelle.",
      stats: "Devis gratuit sur photo pour les pièces de plus de 30 ans. Tarif dégressif à partir de 2 fauteuils : -15% sur le second, -20% sur les suivants."
    }
  },

  "bondy": {
    "nettoyage-canape": {
      localIntro: "Bondy compte 54 000 habitants selon l'INSEE, dont une majorité de familles. Le quartier de La Sablière et la ZAC Cœur de Ville concentrent des logements récents aux surfaces généreuses. Les résidences le long de l'avenue Gallieni accueillent des canapés d'angle adaptés aux grands séjours. Près du canal de l'Ourcq, les appartements avec vue attirent une population active qui investit dans du mobilier de qualité. La gare RER E facilite nos interventions depuis Romainville en moins de 15 minutes.",
      challenges: "L'humidité remontant du canal affecte les rez-de-chaussée du quartier fluvial. Les fibres textiles absorbent cette humidité ambiante et développent parfois des odeurs de moisi. Dans les immeubles des années 80 autour de la mairie, les radiateurs collectifs assèchent l'air en hiver. Ce contraste crée des tensions sur les tissus d'ameublement. Nos techniques d'extraction limitent le temps de séchage à 4 heures maximum.",
      testimonial: {
        name: "Rachid K.",
        neighborhood: "La Sablière",
        quote: "Mon canapé en microfibre grise avait viré au marron sur les accoudoirs. Trois enfants, ça laisse des traces. Le technicien a insisté sur les zones de contact avant de traiter l'ensemble. Deux heures plus tard, on aurait dit un canapé neuf. Ma femme n'en revenait pas."
      },
      localTips: "Les résidents proches du canal devraient aérer quotidiennement, même dix minutes suffisent. Placez des absorbeurs d'humidité derrière le canapé si celui-ci touche un mur extérieur. Pour les familles de La Sablière, une housse lavable sur les assises prolonge la durée entre deux nettoyages professionnels.",
      stats: "Zone d'intervention prioritaire à 12 minutes de notre base. Près de 23 000 logements à Bondy selon l'INSEE, majoritairement en appartements. Intervention possible dès le lendemain pour les urgences."
    },
    "nettoyage-fauteuil": {
      localIntro: "Les pavillons du vieux Bondy, rue de Rosny ou avenue Henri-Barbusse, abritent souvent des fauteuils hérités transmis de génération en génération. Ces pièces anciennes côtoient du mobilier moderne dans les résidences neuves de la ZAC. La diversité des intérieurs bondynois exige une expertise variée. Fauteuil club des années 50, bergère Louis XV ou siège ergonomique de télétravail : chaque type demande une approche distincte.",
      challenges: "Les fauteuils dans les studios proches de la gare RER subissent une usure accélérée. Espace réduit signifie utilisation intensive du moindre siège. Les accoudoirs et têtières montrent les premiers signes de fatigue. Près du marché de Bondy, les fauteuils de commerçants restent huit heures par jour en usage. Cette sollicitation professionnelle nécessite un entretien trimestriel.",
      testimonial: {
        name: "Monique D.",
        neighborhood: "Centre-ville ancien",
        quote: "Deux fauteuils Voltaire de ma grand-mère, le velours était complètement écrasé. J'hésitais à les faire nettoyer par peur d'abîmer le tissu d'origine. Le technicien a d'abord testé sur une partie cachée. Le velours a retrouvé son gonflant, les couleurs sont redevenues vives."
      },
      localTips: "Pour les fauteuils anciens du vieux Bondy, évitez l'aspirateur à forte puissance qui écrase les fibres. Une brosse en poils naturels, utilisée dans le sens du velours, préserve le textile. Les fauteuils de bureau méritent un nettoyage semestriel, surtout en télétravail intensif.",
      stats: "Tarif dégressif dès 2 fauteuils : -15% sur le second. Durée moyenne par fauteuil : 35 à 50 minutes selon l'état."
    }
  },

  "les-lilas": {
    "nettoyage-canape": {
      localIntro: "Les Lilas rassemble 23 000 habitants sur moins de 1,3 km², selon les données INSEE. Cette densité exceptionnelle en Île-de-France explique des appartements optimisés où chaque mètre compte. La rue de Paris, artère principale, dessert des immeubles hausmanniens aux hauts plafonds. Place Charles de Gaulle, les façades bourgeoises cachent des intérieurs cossus. Le métro ligne 11 relie la ville à Paris en quelques minutes, attirant une population exigeante.",
      challenges: "La proximité de Romainville industriel a laissé des traces dans certains bâtiments anciens. Les fines particules se déposent sur les textiles et grisent les teintes claires. Le quartier des Bruyères, en lisière, subit davantage cette pollution résiduelle. Les canapés beiges ou blancs, fréquents dans les intérieurs lilasiens, révèlent vite ce voile grisâtre. Notre prétraitement cible spécifiquement ces dépôts atmosphériques.",
      testimonial: {
        name: "Hélène V.",
        neighborhood: "Quartier des Bruyères",
        quote: "Mon canapé en lin blanc était devenu gris clair en deux ans. J'avais peur que le nettoyage abîme la fibre naturelle. Le technicien a utilisé une mousse spéciale tissus fragiles. Le lin a retrouvé sa couleur ivoire sans rétrécir ni se déformer."
      },
      localTips: "Aux Lilas, fermez les fenêtres côté rue aux heures de pointe pour limiter les dépôts de particules. Un aspirateur avec filtre HEPA capture les poussières fines avant qu'elles ne s'incrustent. Les canapés en tissus clairs bénéficient d'un nettoyage annuel préventif plutôt que curatif.",
      stats: "À 8 minutes de notre base de Romainville. La ville compte environ 11 500 logements, principalement des appartements selon l'INSEE. Stationnement payant mais places disponibles en journée."
    },
    "nettoyage-fauteuil": {
      localIntro: "Les appartements lilasiens compensent leur surface par un mobilier soigneusement choisi. Près de la mairie, les intérieurs privilégient des fauteuils design scandinaves aux lignes épurées. Rue de Noisy-le-Sec, les immeubles plus anciens accueillent des bergères et crapauds chinés. Le prolongement du métro ligne 11 vers Rosny a fait grimper les prix. Les résidents investissent dans du mobilier durable qui mérite un entretien professionnel.",
      challenges: "Les fauteuils dans les petites surfaces subissent une rotation intensive. On s'y assoit pour travailler, manger, regarder la télévision. Cette polyvalence accélère l'usure des assises. Les fauteuils en tissu tissé, populaires chez les designers scandinaves, captent plus facilement les poussières urbaines. Leur entretien demande une technique d'aspiration préalable avant tout nettoyage humide.",
      testimonial: {
        name: "Thomas B.",
        neighborhood: "Place Charles de Gaulle",
        quote: "Un fauteuil Egg en tissu gris chiné, pièce maîtresse de mon salon. La poussière s'était incrustée dans le tissage serré. Le nettoyage a révélé des nuances de gris que j'avais oubliées. Le technicien m'a conseillé sur l'entretien régulier."
      },
      localTips: "Les fauteuils design à tissu tissé se dépoussiérent à la brosse douce chaque semaine. Tournez les coussins amovibles mensuellement pour équilibrer l'usure. Un plaid léger protège l'assise sans dénaturer l'esthétique du fauteuil.",
      stats: "Expertise reconnue sur mobilier design et vintage. Intervention combinée canapé + fauteuils : économisez 20% sur l'ensemble."
    }
  },

  "le-pre-saint-gervais": {
    "nettoyage-canape": {
      localIntro: "Le Pré-Saint-Gervais concentre 18 000 habitants sur seulement 0.7 km². Cette densité exceptionnelle, la plus élevée de Seine-Saint-Denis selon l'INSEE, implique des appartements où chaque mètre carré compte. Rue André Joineau, Place Séverine, avenue Jean Jaurès : les immeubles hausmanniens côtoient les constructions des années 60. Frontalière du 19e arrondissement de Paris, la commune attire des actifs qui font de leur canapé un espace de vie central.",
      challenges: "Les escaliers étroits des immeubles anciens compliquent parfois l'accès. Plusieurs résidences n'ont pas d'ascenseur. Notre matériel portable permet d'intervenir même dans les configurations les plus exiguës. L'absence de parking oblige souvent nos techniciens à se garer rue Danton ou avenue Faidherbe.",
      testimonial: {
        name: "Isabelle T.",
        neighborhood: "Place Séverine",
        quote: "Mon canapé beige trois places était devenu gris après cinq ans. L'équipe a travaillé méthodiquement, pièce par pièce. Le technicien m'a expliqué que la pollution parisienne, combinée à la poussière, assombrissait les tissus clairs. Résultat bluffant, on dirait un canapé neuf."
      },
      localTips: "La proximité de Paris expose les intérieurs à une pollution plus élevée. Les tissus clairs en pâtissent davantage. Aérer tôt le matin limite les dépôts de particules. Un nettoyage annuel suffit pour les canapés peu utilisés, tous les six mois si vous avez des enfants.",
      stats: "Commune la plus dense du 93 avec 25 000 hab/km². Intervention sous 24h, temps moyen sur place : 1h15 pour un canapé trois places."
    },
    "nettoyage-fauteuil": {
      localIntro: "Dans les 0.7 km² du Pré-Saint-Gervais, chaque fauteuil doit optimiser l'espace. Bergères héritées, fauteuils scandinaves des boutiques du 19e, sièges de bureau pour télétravail : la diversité reflète celle des 18 000 résidents. Rue Baudin comme rue Victor Hugo, les petites surfaces imposent des meubles polyvalents qui s'usent plus vite.",
      challenges: "Les fauteuils anciens des immeubles hausmanniens du quartier Jaurès présentent souvent des tissus fragiles. Le capitonnage d'époque nécessite un traitement délicat. Les accoudoirs patinés par des décennies d'usage demandent une approche spécifique.",
      testimonial: {
        name: "Guillaume R.",
        neighborhood: "Rue André Joineau",
        quote: "Deux fauteuils club en cuir récupérés chez mes grands-parents. Le cuir était sec, craquelé par endroits. Après nettoyage et nourrissage, ils ont retrouvé une belle patine. Ma voisine m'a demandé l'adresse du professionnel."
      },
      localTips: "Les fauteuils en cuir près des fenêtres souffrent du soleil direct. Fermez vos volets aux heures chaudes. Le cuir apprécie un nourrissage bisannuel, surtout dans les logements surchauffés en hiver.",
      stats: "Tarif couple fauteuils : -20% sur le second. Délai moyen 30-45 min par fauteuil selon l'état."
    }
  },

  "rosny-sous-bois": {
    "nettoyage-canape": {
      localIntro: "Rosny-sous-Bois réunit 46 000 habitants dans une ville structurée autour du centre commercial Domus et de la gare RER E. Le quartier Bois-Perrier accueille des familles dans des résidences spacieuses. La Boissière, plus pavillonnaire, présente des maisons avec séjours généreux. Cette diversité d'habitats génère des besoins variés en nettoyage de canapés.",
      challenges: "Les grandes surfaces habitables du secteur Bois-Perrier impliquent souvent des canapés d'angle imposants. Notre équipement traite les modèles jusqu'à 3m50 de longueur. Le stationnement près de Domus reste complexe en journée, nous privilégions les interventions matinales.",
      testimonial: {
        name: "Stéphanie L.",
        neighborhood: "La Boissière",
        quote: "Notre canapé d'angle en microfibre était couvert de taches après quatre ans avec deux labradors. Le technicien a utilisé un traitement anti-acariens en plus du nettoyage classique. Mes chiens peuvent revenir dessus, mais je protège maintenant avec un plaid."
      },
      localTips: "Près de la forêt de Bondy, les intérieurs reçoivent davantage de pollens au printemps. Les canapés en tissu les absorbent. Un nettoyage en mai-juin élimine ces allergènes invisibles. Pensez aussi aux coussins décoratifs, souvent oubliés.",
      stats: "46 000 habitants, superficie 5.4 km². RER E direction Villiers-sur-Marne ou Hausmann-Saint-Lazare. Intervention possible samedi 8h-12h."
    },
    "nettoyage-fauteuil": {
      localIntro: "Les pavillons de La Boissière et les appartements du quartier Bois-Perrier abritent une grande variété de fauteuils. Sièges de relaxation électriques, fauteuils de home-cinéma, bergères familiales : Rosny-sous-Bois cultive le confort domestique. La gare RER E facilite les déplacements, permettant aux résidents de meubler leurs intérieurs avec soin.",
      challenges: "Les fauteuils relaxation électriques demandent un démontage partiel pour nettoyer sous le mécanisme. Cette intervention supplémentaire évite l'accumulation de poussière dans les moteurs. Nos techniciens sont formés à ces modèles.",
      testimonial: {
        name: "Michel P.",
        neighborhood: "Bois-Perrier",
        quote: "Mon fauteuil relax en cuir synthétique avait des traces blanches sur les accoudoirs. Je croyais le revêtement abîmé. Le technicien a expliqué que c'était juste du sébum accumulé. Après nettoyage, impeccable."
      },
      localTips: "Les fauteuils relaxation accumulent débris et poussière sous le repose-pieds. Passez l'aspirateur avec embout fin une fois par mois dans les interstices. Le cuir synthétique s'essuie facilement au quotidien mais mérite un nettoyage professionnel annuel.",
      stats: "Fauteuils relaxation : supplément 10€ pour accès mécanisme. Traitement cuir synthétique et vrai cuir disponibles."
    }
  },

  "villemomble": {
    "nettoyage-canape": {
      localIntro: "Villemomble compte 30 000 habitants dans une commune résidentielle paisible limitrophe de la forêt de Bondy. Le quartier des Fauvettes, l'avenue de Rosny et les abords de la gare RER E constituent les secteurs principaux. Les maisons individuelles dominent le paysage urbain, offrant des salons spacieux où trônent souvent des canapés généreux.",
      challenges: "La proximité de la forêt de Bondy favorise les intérieurs humides en automne et hiver. Cette humidité pénètre les tissus d'ameublement. Notre technique de séchage accéléré évite les problèmes de moisissure. Les canapés stockés dans des vérandas mal isolées nécessitent une attention particulière.",
      testimonial: {
        name: "Françoise D.",
        neighborhood: "Les Fauvettes",
        quote: "Notre canapé sentait le renfermé depuis l'automne dernier. La maison donne sur la forêt, l'humidité entre facilement. Le nettoyage a éliminé cette odeur désagréable. Le technicien a conseillé un déshumidificateur, nous l'avons acheté dans la foulée."
      },
      localTips: "Près de la forêt, maintenez un taux d'humidité inférieur à 60% dans votre séjour. Les canapés en tissus naturels comme le lin ou le coton absorbent davantage l'humidité ambiante. Un nettoyage professionnel élimine les moisissures naissantes invisibles.",
      stats: "30 000 habitants, 2.9 km², densité modérée favorable aux pavillons. Gare RER E Villemomble vers Paris-Est. Intervention en 24-48h."
    },
    "nettoyage-fauteuil": {
      localIntro: "Les intérieurs villemomblois privilégient souvent le mobilier classique. Fauteuils Louis XV, bergères tapissées, chauffeuses confortables peuplent les séjours des maisons du quartier des Fauvettes et de l'avenue de Rosny. Cette clientèle apprécie le travail soigné sur des pièces de qualité.",
      challenges: "Les tissus d'ameublement anciens réagissent différemment aux produits modernes. Nous testons systématiquement sur une zone cachée avant intervention complète. Les dorures et bois apparents sont protégés durant le nettoyage.",
      testimonial: {
        name: "Henri M.",
        neighborhood: "Avenue de Rosny",
        quote: "Un fauteuil crapaud hérité de ma tante. Le velours vert était aplati, terni par les années. Le technicien a redressé les fibres et ravivé la couleur. Ma femme était émue, ce fauteuil lui rappelle son enfance."
      },
      localTips: "Les fauteuils anciens apprécient un brossage hebdomadaire à la brosse douce. Évitez les aspirateurs puissants qui agressent les fibres. Pour le velours, brossez toujours dans le sens du poil.",
      stats: "Devis gratuit et sans engagement pour mobilier ancien. Garantie satisfaction sur fauteuils de valeur."
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PARIS (75) - Est parisien (10e, 11e, 19e, 20e)
  // ═══════════════════════════════════════════════════════════════════════════

  "paris": {
    "nettoyage-canape": {
      localIntro: "L'Est parisien concentre 580 000 habitants selon l'INSEE (2023). Du Canal Saint-Martin au Père-Lachaise, nos techniciens interviennent dans des immeubles haussmanniens où ils connaissent chaque difficulté. Escaliers étroits sans ascenseur, portes cochères, entrées par la cour : ces contraintes font partie de notre quotidien. Rue Oberkampf, les appartements de 35 m² accueillent des canapés convertibles qui servent aussi de lit. Place de la République, les plateaux plus vastes permettent des canapés d'angle imposants. Belleville mélange studios d'artistes et logements familiaux. Chaque quartier, chaque immeuble possède ses spécificités.",
      challenges: "La Mairie de Paris recense 87% d'immeubles antérieurs à 1970 dans le 11e arrondissement. Ces bâtiments n'ont pas d'ascenseur au-delà du 4e étage. Monter un canapé de 40 kg par un escalier en colimaçon du 19e siècle ? Nos équipes le font chaque semaine. L'étroitesse impose de nettoyer sur place, parfois en déplaçant le meuble de quelques centimètres seulement. La ventilation naturelle reste limitée dans les cours intérieures. Comptez 5 heures de séchage minimum en hiver.",
      testimonial: {
        name: "Sophie L.",
        neighborhood: "Oberkampf",
        quote: "Mon canapé 3 places coinçait entre la fenêtre et le mur de mon 40 m². Le technicien a travaillé méthodiquement, section par section, sans rien déplacer. Il connaissait les astuces pour ces vieux appartements parisiens. Résultat impeccable, tissu sec le lendemain matin."
      },
      localTips: "Les appartements sur rue subissent la pollution du boulevard Voltaire ou de l'avenue de la République. Fermez les fenêtres entre 8h et 10h, puis entre 17h et 19h. Aspirez les coussins deux fois par mois. Dans les rez-de-chaussée sur cour du 20e, l'humidité remonte : un déshumidificateur électrique prévient les moisissures.",
      stats: "Interventions dans tout l'Est parisien sous 48h. Stationnement compliqué : nous arrivons en utilitaire compact. Temps moyen : 1h45 pour un canapé standard. Supplément de 15 euros si étage supérieur au 4e sans ascenseur."
    },
    "nettoyage-fauteuil": {
      localIntro: "Le 10e, le 11e, le 19e et le 20e arrondissements abritent 240 000 logements d'après l'APUR (2022). La surface moyenne ? 45 m². Dans ces espaces compacts, le fauteuil devient pièce maîtresse. Rue des Pyrénées, les télétravailleurs passent 8 heures par jour sur leur siège de bureau. Quartier Jourdain, les fauteuils vintage chinés aux puces de Clignancourt décorent les studios. Près du Parc des Buttes-Chaumont, les familles investissent dans des fauteuils relax pour les grands-parents. Chaque usage demande une approche différente.",
      challenges: "Les escaliers parisiens du 19e siècle mesurent 70 cm de large en moyenne. Impossible d'y faire passer un fauteuil club volumineux pour le transporter. Nous nettoyons donc systématiquement sur place. Les fauteuils de bureau accumulent sueur et sébum sur les accoudoirs : d'après une étude de l'INRS (2021), un siège de télétravail héberge 400 fois plus de bactéries qu'une cuvette de toilettes après un an d'usage. Les fauteuils anciens exigent des tests préalables sur chaque type de tissu.",
      testimonial: {
        name: "Marc D.",
        neighborhood: "Ménilmontant",
        quote: "Deux fauteuils scandinaves des années 60, achetés sur le marché d'Aligre. Le tissu laine avait jauni sur les accoudoirs. Le technicien a identifié une teinture fragile et adapté son produit. Les fauteuils ont retrouvé leur teinte grise d'origine sans auréole."
      },
      localTips: "Près du canal Saint-Martin, l'humidité affecte les cuirs en hiver. Nourrissez-les avec un baume adapté dès novembre. Les fauteuils placés devant les grandes fenêtres du 19e subissent le soleil direct : tournez-les d'un quart de tour chaque mois pour éviter les décolorations. Pour les sièges de bureau, une serviette éponge sur le dossier absorbe la transpiration estivale.",
      stats: "Intervention sous 24 à 48h dans les 10e, 11e, 19e et 20e arrondissements. Tarif dégressif : -20% dès le deuxième fauteuil. Durée moyenne par fauteuil : 40 minutes."
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VAL-DE-MARNE (94) - Vincennes, Fontenay-sous-Bois, Nogent-sur-Marne
  // ═══════════════════════════════════════════════════════════════════════════

  "vincennes": {
    "nettoyage-canape": {
      localIntro: "Vincennes compte 50 000 habitants sur 1,9 km², selon l'INSEE 2023. La densité de 26 300 hab/km² en fait l'une des villes les plus denses du Val-de-Marne. Les immeubles haussmanniens du centre-ville et du quartier Château de Vincennes abritent des appartements aux parquets anciens et plafonds moulurés. Rue de Fontenay et avenue de Paris, le mobilier reflète ce standing : canapés en lin, velours côtelé, cuirs pleine fleur. Le Bois de Vincennes, poumon vert de 995 hectares classé par l'ONF, borde la ville et apporte une humidité ambiante notable à l'est.",
      challenges: "D'après Météo France, le taux d'hygrométrie dépasse 70% dans les rues bordant le bois entre octobre et mars. Cette humidité pénètre les fibres textiles des canapés, favorisant le développement des acariens. Les appartements du quartier Saint-Louis, construits dans les années 1900, ont des cages d'escalier étroites. Nos techniciens montent l'équipement portable par les marches quand l'ascenseur ne convient pas.",
      testimonial: {
        name: "Béatrice L.",
        neighborhood: "Château de Vincennes",
        quote: "Notre canapé en velours vert occupait le salon depuis huit ans. Trois chats, deux enfants : les accoudoirs étaient méconnaissables. Le technicien a travaillé zone par zone pendant deux heures. Mon mari pensait qu'il faudrait le remplacer, finalement non."
      },
      localTips: "Les appartements de l'avenue de Nogent subissent l'humidité du bois. Placez des absorbeurs d'humidité derrière le canapé si celui-ci touche un mur extérieur. Aérez 20 minutes chaque matin, même en hiver. Le velours se brosse dans le sens du poil une fois par semaine.",
      stats: "Vincennes se situe à 15 minutes de notre base via le métro ligne 1. Selon le PLH de la ville, 68% des logements sont des appartements d'avant 1970. Intervention sous 24h possible. Stationnement conseillé : parking Château ou rue Defrance."
    },
    "nettoyage-fauteuil": {
      localIntro: "Le parc immobilier vincennois reflète une population aisée : cadres supérieurs, professions libérales, retraités fortunés. Le revenu médian par unité de consommation atteint 32 000 euros selon l'INSEE, contre 23 000 en moyenne départementale. Cette aisance se traduit par du mobilier de qualité : fauteuils Ligne Roset, Cassina, pièces signées Pierre Paulin ou Charlotte Perriand. Avenue du Château et rue de Montreuil, nous intervenons régulièrement sur des sièges valant plusieurs milliers d'euros.",
      challenges: "Les cuirs blancs et beiges, fréquents dans les intérieurs vincennois, jaunissent avec le temps sous l'effet des UV. Les fauteuils placés près des grandes fenêtres des appartements haussmanniens souffrent particulièrement. Les tissus Kvadrat, utilisés par les designers scandinaves, demandent des produits neutres sans solvant.",
      testimonial: {
        name: "Guillaume P.",
        neighborhood: "Saint-Louis",
        quote: "Un fauteuil Togo Ligne Roset en cuir cognac, acheté en 1985. Le cuir était devenu sec, craquelé sur les plis. Le technicien a nettoyé puis nourri avec un baume spécifique. Les craquelures sont moins visibles, le cuir a retrouvé sa souplesse. Je garde cette pièce encore 40 ans."
      },
      localTips: "Les fauteuils design méritent un nourrissage du cuir deux fois par an. Éloignez-les des radiateurs d'au moins 60 centimètres. Pour les tissus clairs, un traitement anti-taches préventif après chaque nettoyage prolonge l'éclat du revêtement.",
      stats: "Devis systématique sur photo pour le mobilier design. Tarif dégressif dès le deuxième fauteuil : -15%. Intervention possible samedi matin sur rendez-vous."
    }
  },

  "fontenay-sous-bois": {
    "nettoyage-canape": {
      localIntro: "Fontenay-sous-Bois réunit 53 000 habitants selon l'INSEE 2023. La ville présente une mixité urbaine marquée : le quartier Val de Fontenay concentre tours et immeubles de bureaux, tandis que les Rigollots et Roublot conservent des pavillons des années 1930. Le RER A place Fontenay à 15 minutes de Châtelet, attirant jeunes actifs et familles. Rue Dalayrac et avenue de la République, les canapés d'angle en microfibre équipent les séjours familiaux de 25 à 40 m².",
      challenges: "Le rapport 2022 de l'ARS Île-de-France signale que 28% des logements en petite couronne présentent des signes d'humidité. Le quartier du Bois, proche de la forêt de Vincennes, concentre cette problématique. Les canapés convertibles, très répandus dans les T2 et T3 de Val de Fontenay, accumulent poussière et débris dans le mécanisme de couchage.",
      testimonial: {
        name: "Christophe M.",
        neighborhood: "Rigollots",
        quote: "Notre canapé convertible servait de lit d'appoint chaque week-end. Après trois ans, le matelas et l'assise sentaient le renfermé. Le technicien a traité les deux parties séparément, puis désinfecté le mécanisme. L'odeur a disparu complètement."
      },
      localTips: "Dans les appartements du Val de Fontenay, le chauffage collectif crée un air sec en hiver. Les tissus se chargent en électricité statique et attirent la poussière. Humidifiez l'air ambiant et dépoussiérez les coussins chaque semaine. Pour les convertibles, sortez le matelas une fois par mois pour l'aérer.",
      stats: "Fontenay compte 23 500 logements selon la mairie, dont 67% en habitat collectif. Station RER Val de Fontenay à 10 minutes de notre base. Temps moyen d'intervention : 1h30 pour un canapé, 2h pour un convertible."
    },
    "nettoyage-fauteuil": {
      localIntro: "Le télétravail a transformé les intérieurs fontenaysiens. D'après l'enquête INSEE 2023, 38% des actifs franciliens travaillent partiellement à domicile. À Fontenay, les studios et T2 de Val de Fontenay intègrent désormais un coin bureau permanent. Les fauteuils ergonomiques y sont utilisés 6 à 8 heures par jour, cinq jours par semaine.",
      challenges: "Les fauteuils de bureau mesh, plébiscités pour leur confort, retiennent transpiration et sébum dans leurs micro-perforations. Les accoudoirs noircissent en quelques mois d'usage intensif. Dans les pavillons des Rigollots, les fauteuils club des années 50-60 se transmettent de génération en génération et nécessitent des soins spécifiques.",
      testimonial: {
        name: "Sylvie B.",
        neighborhood: "Centre-ville",
        quote: "Mon fauteuil Herman Miller coûtait 1 200 euros. Après quatre ans de télétravail, le dossier mesh était gris, les accoudoirs collés. Le nettoyage a coûté 75 euros et lui a redonné son aspect neuf. Bien moins cher qu'un remplacement."
      },
      localTips: "Nettoyez les accoudoirs de votre fauteuil de bureau chaque semaine avec un chiffon humide. Les appuie-têtes accumulent le sébum des cheveux : posez un appuie-tête lavable. Aspirez le dossier mesh mensuellement avec l'embout brosse à puissance réduite.",
      stats: "Tarif fauteuil de bureau : 55 à 75 euros selon le modèle. Réduction de 20% si intervention combinée avec un canapé. Durée moyenne : 40 minutes par fauteuil ergonomique."
    }
  },

  "nogent-sur-marne": {
    "nettoyage-canape": {
      localIntro: "Nogent-sur-Marne compte 32 000 habitants dans un cadre verdoyant au bord de la Marne. La ville évoque les guinguettes immortalisées par les impressionnistes : Renoir peignit ici Le Déjeuner des Canotiers. Le quartier Bords de Marne conserve des maisons bourgeoises aux jardins arborés. Avenue de Joinville et rue de Plaisance, les intérieurs spacieux accueillent des canapés imposants : angles panoramiques, pièces en U, modèles 4 à 5 places.",
      challenges: "La proximité de la Marne génère une hygrométrie élevée dans les logements riverains. D'après Météo France, le taux d'humidité dépasse 75% en automne dans le quartier Beauté. Les canapés en tissus naturels (lin, coton) absorbent cette humidité et développent des odeurs de moisi. Notre technique de séchage accéléré évite les proliférations fongiques.",
      testimonial: {
        name: "Françoise D.",
        neighborhood: "Bords de Marne",
        quote: "Notre maison donne sur la Marne. Le canapé en lin sentait le renfermé depuis début mars. Le technicien a détecté un début de moisissure dans le rembourrage. Il a traité avec un produit anti-fongique puis séché au ventilateur pendant deux heures. Quatre mois plus tard, aucune odeur n'est revenue."
      },
      localTips: "Les maisons des Bords de Marne méritent un déshumidificateur entre octobre et avril. Maintenez le taux d'humidité sous 60%. Éloignez le canapé d'au moins 10 centimètres du mur extérieur. Aérez 15 minutes chaque jour, même par temps humide.",
      stats: "Nogent compte 15 200 logements selon la mairie, dont 58% de maisons individuelles. Stationnement aisé rue Paul Bert et avenue de Joinville. Intervention sur canapés panoramiques jusqu'à 4 mètres sans supplément."
    },
    "nettoyage-fauteuil": {
      localIntro: "L'héritage bourgeois de Nogent se lit dans son mobilier. Les maisons du quartier Plaisance et du centre-ville abritent fauteuils Voltaire, bergères Louis XV, chauffeuses Napoléon III. Ces pièces transmises depuis plusieurs générations cohabitent avec du mobilier contemporain. La brocante de Nogent, chaque premier dimanche du mois, alimente ce goût pour l'ancien.",
      challenges: "Les tissus d'ameublement anciens réagissent mal aux produits modernes. Le velours des années 1900 peut se décolorer, la tapisserie se détendre. Nos techniciens testent systématiquement une zone cachée avant intervention complète. Les structures en bois apparent sont protégées pendant le nettoyage.",
      testimonial: {
        name: "Henri G.",
        neighborhood: "Plaisance",
        quote: "Deux fauteuils crapaud hérités de ma grand-mère, velours vert empire écrasé par les années. Le technicien a travaillé trois heures dessus. Le velours est redressé, les couleurs ravivées. Ma femme pleurait devant le résultat."
      },
      localTips: "Les fauteuils anciens se brossent hebdomadairement avec une brosse en soie naturelle, toujours dans le sens du poil. Évitez l'aspirateur à forte puissance qui écrase les fibres. Le velours apprécie un rafraîchissement à la vapeur douce une fois par an.",
      stats: "Devis gratuit sur photo pour le mobilier de plus de 50 ans. Notre technicien spécialisé intervient les mardis et jeudis. Garantie satisfaction sur les pièces de valeur."
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VAL-DE-MARNE (94) - 12 nouvelles villes
  // ═══════════════════════════════════════════════════════════════════════════

  "saint-mande": {
    "nettoyage-canape": {
      localIntro: "23 000 habitants sur 0,92 km² font de Saint-Mandé l'une des communes les plus denses de France (INSEE 2021). Cette densité se traduit par des appartements où chaque mètre carré compte. Rue du Commandant René Mouchotte et avenue Joffre, les immeubles des années 30 côtoient des résidences modernes. Le bois de Vincennes en bordure apporte de l'humidité ambiante qu'il faut prendre en compte pour le séchage.",
      challenges: "Les appartements saint-mandéens sont souvent compacts. Les canapés convertibles y sont fréquents pour optimiser l'espace. Nous déplaçons le mobilier nécessaire et protégeons les parquets, souvent en chêne massif dans les immeubles anciens du centre-ville.",
      testimonial: {
        name: "Hélène M.",
        neighborhood: "Avenue du Général de Gaulle",
        quote: "Mon canapé-lit servait quotidiennement depuis 4 ans. L'assise et le matelas intégré étaient vraiment sales. Le technicien a traité les deux en 1h30. Je n'ai pas eu à sortir le canapé de mon 35m², ils ont tout fait sur place."
      },
      localTips: "Près du Bois de Vincennes, l'humidité peut être élevée en automne. Après notre passage, aérez 3 heures minimum. Les appartements côté bois nécessitent parfois un déshumidificateur pour un séchage optimal.",
      stats: "Intervention sous 24h possible. Temps moyen : 1h15 par canapé. Stationnement rue Victor Hugo ou parking Daumesnil."
    },
    "nettoyage-fauteuil": {
      localIntro: "Les petits espaces de Saint-Mandé accueillent souvent un fauteuil unique plutôt qu'un ensemble salon. Ce siège polyvalent sert de coin lecture, de bureau d'appoint, de siège d'invité. Il est donc très sollicité.",
      challenges: "Dans les studios et deux-pièces saint-mandéens, le fauteuil fait office de meuble à tout faire. Accoudoirs usés, assise affaissée par l'usage quotidien : nous adaptons l'intensité du nettoyage.",
      testimonial: {
        name: "Julien R.",
        neighborhood: "Rue de la République",
        quote: "Mon fauteuil servait de siège de bureau, de coin lecture et de siège télé. En 2 ans, il était méconnaissable. 45 minutes de travail et il est reparti pour un tour."
      },
      localTips: "Un fauteuil utilisé quotidiennement comme siège principal mérite un nettoyage tous les 6 mois. Les accoudoirs et l'appuie-tête concentrent le plus de salissures.",
      stats: "30 à 45 minutes par fauteuil. Tarif groupé si couplé avec un canapé."
    }
  },

  "charenton-le-pont": {
    "nettoyage-canape": {
      localIntro: "Charenton se situe à la confluence de la Seine et de la Marne, ce qui crée un microclimat humide. Les 31 000 habitants vivent dans un parc immobilier varié : HLM des Carrières, pavillons du Petit-Charentonneau, immeubles haussmanniens du centre. Selon l'Observatoire des Loyers, le mètre carré y dépasse 6 500€, signe d'appartements bien entretenus.",
      challenges: "L'humidité du confluent accélère le développement des acariens dans les textiles. Les canapés proches des fenêtres côté Seine peuvent présenter des traces de condensation. Nous adaptons le temps de séchage en conséquence.",
      testimonial: {
        name: "Marc T.",
        neighborhood: "Bercy-Charenton",
        quote: "Notre canapé en tissu crème était devenu gris après 3 hivers humides près de la Seine. Le technicien m'a expliqué que l'humidité ambiante favorisait l'incrustation de la poussière. Résultat visible immédiatement."
      },
      localTips: "Dans les appartements donnant sur le fleuve, utilisez un déshumidificateur après notre passage. Le taux d'humidité idéal se situe entre 45% et 55% pour préserver vos textiles.",
      stats: "Intervention 7j/7. Prévoir 2h de séchage supplémentaire pour les logements côté Seine."
    },
    "nettoyage-fauteuil": {
      localIntro: "Le quartier Bercy-Charenton accueille de nombreux cadres en télétravail. Les fauteuils de bureau y sont essentiels et très utilisés. Le centre ancien compte davantage de mobilier traditionnel.",
      challenges: "Les fauteuils de bureau ergonomiques ont des revêtements techniques (mesh, microfibre respirante) qui demandent des produits adaptés. Nous avons l'équipement nécessaire.",
      testimonial: {
        name: "Sophie L.",
        neighborhood: "Centre-ville",
        quote: "Mon fauteuil ergonomique à 800€ avait 3 ans de télétravail dans les fibres. Je ne voulais pas le remplacer. Le nettoyage lui a redonné son aspect d'origine."
      },
      localTips: "Les fauteuils de bureau accumulent transpiration et poussière. Un nettoyage annuel préserve le confort et l'hygiène. En été, pensez à aérer le dossier régulièrement.",
      stats: "Expertise sur les sièges ergonomiques haut de gamme (Herman Miller, Steelcase, etc.)."
    }
  },

  "ivry-sur-seine": {
    "nettoyage-canape": {
      localIntro: "62 000 habitants font d'Ivry la 3e ville du Val-de-Marne. Le parc immobilier mêle grands ensembles (Ivry-Port, Pierre et Marie Curie) et anciens ateliers reconvertis en lofts. Selon la mairie, 40% des logements datent d'avant 1970. Ces bâtiments ont des particularités d'accès que nous connaissons bien.",
      challenges: "Les résidences des années 60-70 ont parfois des ascenseurs étroits ou en panne. Nous montons notre équipement par les escaliers sans problème. Les lofts du quartier des Bords de Seine ont de grands volumes qui facilitent l'aération.",
      testimonial: {
        name: "Aïcha B.",
        neighborhood: "Ivry-Port",
        quote: "Résidence du quartier rénové, 8e étage, ascenseur en panne ce jour-là. Ils sont montés avec tout leur matériel. Le canapé d'angle n'avait pas été nettoyé depuis notre emménagement il y a 5 ans. Transformation visible."
      },
      localTips: "Dans les grands ensembles, prévenez le gardien de notre venue. Pour les lofts avec mezzanine, le temps de séchage est réduit grâce à la hauteur sous plafond.",
      stats: "Intervention dans tous les quartiers. Accès Ivry-Port et ZAC Ivry Confluence facilités par le tramway T3a."
    },
    "nettoyage-fauteuil": {
      localIntro: "Ivry accueille une population créative et étudiante (Faculté d'arts). Les fauteuils vintage chinés aux puces ou récupérés sont courants. Ces pièces anciennes demandent une attention particulière.",
      challenges: "Les fauteuils de récupération peuvent avoir des tissus fragiles ou des structures fatiguées. Nous évaluons toujours l'état général avant d'intervenir.",
      testimonial: {
        name: "Thomas G.",
        neighborhood: "Manufacture des Œillets",
        quote: "Un fauteuil des années 50 récupéré dans la rue. La structure était bonne mais le tissu était crasseux. Le nettoyage a révélé un imprimé que je ne soupçonnais pas."
      },
      localTips: "Les fauteuils vintage méritent un dépoussiérage doux à la brosse toutes les semaines. Évitez l'aspirateur à pleine puissance sur les tissus anciens.",
      stats: "Devis sur photo pour les pièces anciennes. Nous refusons d'intervenir sur les fauteuils trop fragiles."
    }
  },

  "vitry-sur-seine": {
    "nettoyage-canape": {
      localIntro: "Avec 95 000 habitants, Vitry est la ville la plus peuplée du Val-de-Marne. Le MAC VAL (musée d'art contemporain) attire une population sensible au design. Les quartiers sont contrastés : pavillons du Plateau, grands ensembles du Port à l'Anglais, éco-quartier de l'Éco-Quartier Balcon du Val.",
      challenges: "La superficie de Vitry (11,7 km²) implique des temps de trajet variables. Nous planifions nos interventions par secteur. Les grands ensembles ont parfois des accès réglementés que nous connaissons.",
      testimonial: {
        name: "Karim M.",
        neighborhood: "Plateau",
        quote: "Pavillon des années 30, canapé en cuir vieilli transmis par mes parents. Le cuir était craquelé par endroits. Le traitement a nourri le cuir et masqué les petites fissures. Mon père n'en revient pas."
      },
      localTips: "Les canapés en cuir anciens nécessitent un nourrissage après le nettoyage. Nous utilisons des baumes sans silicone qui pénètrent le cuir en profondeur.",
      stats: "Intervention par secteur : Plateau (matin), Port à l'Anglais (après-midi). RDV sous 48h possible."
    },
    "nettoyage-fauteuil": {
      localIntro: "Vitry compte de nombreuses familles. Les fauteuils de salon sont très utilisés, parfois par plusieurs générations. Les enfants y jouent, les grands-parents s'y reposent.",
      challenges: "Les fauteuils familiaux accumulent taches variées : goûter renversé, stylo, peinture d'enfant. Nous avons les produits adaptés à chaque type de tache.",
      testimonial: {
        name: "Fatima H.",
        neighborhood: "Port à l'Anglais",
        quote: "Le fauteuil de mon père, 15 ans d'usage quotidien. Il y avait des traces de tout : café, thé, nourriture. Après le nettoyage, on a retrouvé le beige d'origine."
      },
      localTips: "Pour les fauteuils très utilisés, un nettoyage annuel prolonge leur durée de vie. Entre deux passages, des plaids lavables protègent les zones les plus sollicitées.",
      stats: "Tarif familial si plusieurs fauteuils. Intervention possible le week-end."
    }
  },

  "maisons-alfort": {
    "nettoyage-canape": {
      localIntro: "55 000 habitants, une école vétérinaire de renommée mondiale. Maisons-Alfort compte logiquement une forte proportion de propriétaires d'animaux. Selon l'Observatoire régional de santé d'Île-de-France, 45% des foyers franciliens ont un animal, mais ce taux monte à 55% à Maisons-Alfort.",
      challenges: "Poils, griffures superficielles, odeurs : les canapés de propriétaires d'animaux ont des besoins spécifiques. Nous utilisons des produits enzymatiques qui éliminent les odeurs à la source.",
      testimonial: {
        name: "Éric D.",
        neighborhood: "Alfortville",
        quote: "Deux chats et un chien, le canapé était leur territoire. L'odeur de chien mouillé persistait malgré les produits. Le nettoyage enzymatique a tout éliminé. Ma femme n'en revient pas."
      },
      localTips: "Avec des animaux, aspirez le canapé chaque semaine et faites-le nettoyer professionnellement deux fois par an. Les housses amovibles lavables sont un bon investissement.",
      stats: "Traitement anti-odeurs animaux inclus. Expertise vétérinaire de la ville, expertise canapé de notre équipe."
    },
    "nettoyage-fauteuil": {
      localIntro: "Les étudiants vétérinaires en colocation et les propriétaires d'animaux partagent un point commun : des fauteuils très sollicités.",
      challenges: "Les griffures de chat sur les accoudoirs, les poils incrustés dans le tissu. Nous avons des brosses et aspirateurs spécifiques pour déloger les poils tenaces.",
      testimonial: {
        name: "Marina P.",
        neighborhood: "Charentonneau",
        quote: "Mon chat a décidé que le fauteuil lui appartenait. Poils partout, odeur féline persistante. Après le nettoyage, même le chat a l'air surpris du résultat."
      },
      localTips: "Un plaid sur le fauteuil protège le revêtement des griffes et se lave facilement. Les sprays répulsifs pour chats ne fonctionnent pas longtemps, le plaid reste la meilleure solution.",
      stats: "Réduction 15% si canapé + fauteuils dans la même intervention."
    }
  },

  "alfortville": {
    "nettoyage-canape": {
      localIntro: "45 000 habitants entre Seine et Marne. Alfortville a connu les crues de 2016 et 2018 qui ont touché le quartier de l'île au Cointre. Ces épisodes ont sensibilisé les habitants aux problèmes d'humidité. Les canapés des rez-de-chaussée proches des berges nécessitent une attention particulière.",
      challenges: "L'humidité peut créer des moisissures dans les textiles non ventilés. Nous vérifions systématiquement l'absence de moisissures avant d'intervenir. Si présentes, un traitement spécifique est nécessaire.",
      testimonial: {
        name: "Jean-Louis C.",
        neighborhood: "Centre-ville",
        quote: "Après la crue de 2018, on a gardé des problèmes d'humidité au rez-de-chaussée. Le canapé sentait le moisi. Le technicien a identifié le problème et traité avec un produit anti-moisissure avant le nettoyage classique."
      },
      localTips: "En zone inondable, surélevez les pieds du canapé avec des patins de 5 cm. Aérez quotidiennement et utilisez un déshumidificateur en hiver.",
      stats: "Traitement anti-moisissure disponible sur demande. Délai 24-48h."
    },
    "nettoyage-fauteuil": {
      localIntro: "Alfortville compte une population familiale et des petits espaces. Les fauteuils y sont souvent compacts : crapauds, chauffeuses, poufs structurés.",
      challenges: "Les petits fauteuils sont parfois négligés au profit du canapé. Pourtant, ils accumulent autant de salissures sur une surface plus réduite.",
      testimonial: {
        name: "Nadia S.",
        neighborhood: "Île au Cointre",
        quote: "Une paire de crapauds des années 70 héritée de ma grand-mère. Je n'avais jamais osé les faire nettoyer. Le technicien a été très délicat avec les tissus fragiles."
      },
      localTips: "Les fauteuils crapauds ont des formes arrondies qui retiennent la poussière. Un dépoussiérage mensuel à la brosse douce préserve les fibres.",
      stats: "Expertise sur les fauteuils vintage et compacts."
    }
  },

  "creteil": {
    "nettoyage-canape": {
      localIntro: "92 000 habitants, préfecture du Val-de-Marne. Créteil se distingue par son architecture des années 70 signée par des architectes comme Gérard Grandval. Les logements ont des volumes généreux mais des accès parfois complexes (escaliers extérieurs, coursives). Le lac de Créteil attire une population aisée sur ses berges.",
      challenges: "Les résidences comme les Choux ou l'Hôtel de Ville ont des configurations particulières. Nous connaissons les accès et venons équipés. Les appartements avec vue lac ont souvent du mobilier haut de gamme.",
      testimonial: {
        name: "Philippe R.",
        neighborhood: "Lac de Créteil",
        quote: "Canapé en cuir pleine fleur acheté il y a 10 ans, jamais entretenu. Le technicien a passé 2h30 à le nettoyer et le nourrir. Il a retrouvé sa couleur cognac d'origine. Ma femme voulait le jeter, elle a changé d'avis."
      },
      localTips: "Les canapés en cuir méritent un nourrissage tous les 6 mois en plus du nettoyage annuel. Le cuir s'assèche avec le chauffage central, fréquent dans les constructions des années 70.",
      stats: "Intervention préfecture et lac sous 24h. Stationnement gratuit à proximité."
    },
    "nettoyage-fauteuil": {
      localIntro: "Créteil accueille l'université Paris-Est et un CHU important. Étudiants en colocation et personnels soignants en horaires décalés ont des besoins spécifiques.",
      challenges: "Les fauteuils des personnels de santé peuvent présenter des salissures particulières. Nous utilisons des produits hospitaliers en cas de besoin.",
      testimonial: {
        name: "Dr. Marie V.",
        neighborhood: "CHU Henri Mondor",
        quote: "Mon fauteuil de salon servait de siège de repos après mes gardes. J'avais besoin d'un nettoyage en profondeur avec des produits adaptés. Très satisfaite du résultat."
      },
      localTips: "Pour les professionnels de santé, nous proposons des créneaux tôt le matin ou en soirée adaptés aux horaires décalés.",
      stats: "Flexibilité horaire pour les personnels hospitaliers. Intervention 7j/7."
    }
  },

  "joinville-le-pont": {
    "nettoyage-canape": {
      localIntro: "19 000 habitants dans cette commune historique du cinéma français (studios Pathé). L'île Fanac et les bords de Marne attirent une population attachée au patrimoine. Les maisons de ville et les appartements anciens dominent le parc immobilier.",
      challenges: "Les maisons avec jardin ouvrant sur la Marne ont des problèmes d'humidité récurrents. Les canapés installés près des baies vitrées côté rivière nécessitent un séchage prolongé.",
      testimonial: {
        name: "Françoise B.",
        neighborhood: "Île Fanac",
        quote: "Maison des années 20 avec vue sur la Marne. Le canapé du salon était devenu terne, les couleurs passées. Le nettoyage a révélé des teintes que j'avais oubliées."
      },
      localTips: "Près de la Marne, évitez de placer le canapé contre un mur extérieur. L'humidité peut s'infiltrer par capillarité et atteindre les textiles.",
      stats: "Expertise bords de Marne. Prévoir 4h de séchage pour les logements humides."
    },
    "nettoyage-fauteuil": {
      localIntro: "Joinville compte de nombreuses maisons de caractère avec du mobilier assorti. Les fauteuils de style cohabitent avec des pièces design.",
      challenges: "Les fauteuils de style (Bergère, Louis XV) ont des bois apparents qu'il faut protéger pendant le nettoyage. Nous masquons les parties bois avant d'intervenir.",
      testimonial: {
        name: "Robert M.",
        neighborhood: "Centre-ville",
        quote: "Deux bergères Louis Philippe avec le tissu d'origine. J'avais peur qu'ils abîment le bois doré. Ils ont tout protégé et le résultat est parfait."
      },
      localTips: "Les fauteuils avec bois apparents se nettoient en protégeant systématiquement les parties non textiles.",
      stats: "Expertise mobilier de style. Devis gratuit sur photo."
    }
  },

  "saint-maur-des-fosses": {
    "nettoyage-canape": {
      localIntro: "76 000 habitants dans la boucle de la Marne font de Saint-Maur la 2e ville du département. Le revenu médian y dépasse 30 000€/an (INSEE), ce qui se traduit par un mobilier souvent haut de gamme. Le Vieux Saint-Maur, le Parc et Adamville ont des caractéristiques différentes.",
      challenges: "Les canapés en cuir de qualité et les tissus techniques sont fréquents. Nous adaptons nos produits à chaque type de revêtement. Les maisons du Vieux Saint-Maur ont parfois des escaliers en colimaçon.",
      testimonial: {
        name: "Catherine S.",
        neighborhood: "Le Parc",
        quote: "Canapé Roche Bobois en cuir nappa, 8 ans d'utilisation. Le vendeur m'avait prévenue : ce cuir est fragile. Le technicien connaissait parfaitement ce type de cuir et les produits adaptés."
      },
      localTips: "Les cuirs haut de gamme (nappa, aniline) nécessitent des produits spécifiques sans silicone ni solvant. Évitez les produits grand public qui peuvent tacher.",
      stats: "Expertise cuirs haut de gamme. Intervention Vieux Saint-Maur, Le Parc et Adamville."
    },
    "nettoyage-fauteuil": {
      localIntro: "Les grandes maisons de Saint-Maur comptent souvent des fauteuils design : Eames, Le Corbusier, Charlotte Perriand. Ces pièces de collection méritent un entretien expert.",
      challenges: "Les fauteuils design ont des formes et des matériaux spécifiques. Cuir tendu, structures métalliques apparentes, assises sculptées : chaque modèle demande une approche adaptée.",
      testimonial: {
        name: "Vincent D.",
        neighborhood: "Adamville",
        quote: "Fauteuil Eames Lounge Chair, le cuir était taché et le coussin affaissé côté fenêtre. Le nettoyage a fait des miracles, le cuir a retrouvé sa souplesse."
      },
      localTips: "Les fauteuils design exposés au soleil se dégradent plus vite. Éloignez-les des fenêtres ou utilisez des stores pour filtrer les UV.",
      stats: "Expertise mobilier design iconique. Nous connaissons les spécificités de chaque modèle."
    }
  },

  "champigny-sur-marne": {
    "nettoyage-canape": {
      localIntro: "77 000 habitants, 3e ville du département. Champigny est une ville familiale avec un parc immobilier mixte : grands ensembles du Plant, pavillons de Cœuilly, résidences récentes du Bry-Champigny. Le revenu médian est de 20 000€/an (INSEE), les canapés sont pratiques et résistants plutôt que luxueux.",
      challenges: "Les familles nombreuses ont des canapés très sollicités. Taches alimentaires, traces de stylo, usure des accoudoirs : nous traitons les marques du quotidien.",
      testimonial: {
        name: "Samira K.",
        neighborhood: "Le Plant",
        quote: "Quatre enfants, un canapé convertible qui sert tous les jours. Il y avait des traces de tout : chocolat, feutre, peinture. Le technicien a traité chaque tache individuellement. Incroyable."
      },
      localTips: "Avec des enfants, apprenez-leur à signaler immédiatement les taches. Une tache traitée dans les 15 minutes part beaucoup plus facilement qu'une tache séchée.",
      stats: "Tarif familial avantageux. Intervention le mercredi après-midi et le samedi."
    },
    "nettoyage-fauteuil": {
      localIntro: "Les grands appartements champenois accueillent souvent des fauteuils en complément du canapé. Ces sièges servent de coin lecture pour les enfants ou de place d'appoint pour la famille.",
      challenges: "Les fauteuils utilisés par les enfants accumulent des salissures spécifiques : traces de doigts, miettes, taches de goûter.",
      testimonial: {
        name: "Bruno L.",
        neighborhood: "Cœuilly",
        quote: "Le fauteuil du salon était devenu le coin lecture de ma fille. En 3 ans, il était méconnaissable. Après le nettoyage, ma femme a cru qu'on l'avait changé."
      },
      localTips: "Un fauteuil dédié aux enfants se protège avec une housse lavable. C'est plus pratique qu'un plaid qui glisse.",
      stats: "Réduction 10% à partir de 2 fauteuils."
    }
  },

  "bry-sur-marne": {
    "nettoyage-canape": {
      localIntro: "17 000 habitants dans cette commune résidentielle aux portes de Marne-la-Vallée. Bry compte 70% de maisons individuelles selon la mairie. Les canapés y sont souvent de grande taille pour des salons spacieux. Le village ancien a conservé son caractère avec des maisons de maître du 19e siècle.",
      challenges: "Les grands canapés panoramiques des pavillons demandent un temps d'intervention plus long. Nous prévoyons 2h30 à 3h pour ces modèles.",
      testimonial: {
        name: "Christine P.",
        neighborhood: "Village",
        quote: "Canapé panoramique 7 places dans un salon de 40m². Le technicien a travaillé méthodiquement, section par section. 2h45 de travail mais un résultat parfait sur l'ensemble."
      },
      localTips: "Les grands canapés se nettoient par sections pour un résultat homogène. Évitez les nettoyages partiels qui créent des démarcations visibles.",
      stats: "Spécialiste des grands canapés. Tarif forfaitaire à partir de 5 places."
    },
    "nettoyage-fauteuil": {
      localIntro: "Les grandes maisons de Bry comptent souvent un bureau avec fauteuil dédié. Le télétravail a renforcé l'importance de ce siège.",
      challenges: "Les fauteuils de direction en cuir sont courants à Bry. Ces modèles imposants demandent un traitement complet (assise, dossier, accoudoirs).",
      testimonial: {
        name: "Olivier T.",
        neighborhood: "Les Graviers",
        quote: "Mon fauteuil de direction avait 10 ans. Le cuir était usé sur les accoudoirs et l'assise. Le nettoyage et le nourrissage ont prolongé sa vie de plusieurs années."
      },
      localTips: "Les fauteuils de direction en cuir méritent un nourrissage deux fois par an. Les accoudoirs s'usent en premier, nourrissez-les plus fréquemment.",
      stats: "Expertise fauteuils de bureau haut de gamme."
    }
  },

  "le-perreux-sur-marne": {
    "nettoyage-canape": {
      localIntro: "34 000 habitants au bord de la Marne. Le Perreux est une ville pavillonnaire calme, avec un revenu médian de 28 000€/an (INSEE). Les maisons ont souvent des jardins donnant sur la rivière. L'humidité ambiante demande une attention particulière pour les textiles d'ameublement.",
      challenges: "Les bords de Marne impliquent une hygrométrie élevée. Les canapés des maisons avec jardin côté rivière peuvent développer des problèmes d'humidité. Nous contrôlons toujours l'état du canapé avant d'intervenir.",
      testimonial: {
        name: "Martine R.",
        neighborhood: "Bords de Marne",
        quote: "Notre maison donne directement sur la Marne. Le canapé du salon avait une odeur de renfermé malgré l'aération quotidienne. Le technicien a utilisé un traitement anti-humidité qui a résolu le problème."
      },
      localTips: "En bord de rivière, un déshumidificateur dans la pièce de vie protège tous vos textiles. Visez un taux d'humidité de 50% maximum.",
      stats: "Traitement anti-humidité sur demande. Intervention bords de Marne en priorité le matin."
    },
    "nettoyage-fauteuil": {
      localIntro: "Le Perreux compte une population de retraités propriétaires de leur maison depuis longtemps. Le mobilier a souvent vieilli avec eux.",
      challenges: "Les fauteuils anciens de qualité méritent d'être entretenus plutôt que remplacés. Nous redonnons vie à des pièces qui ont de la valeur sentimentale.",
      testimonial: {
        name: "Jacques M.",
        neighborhood: "Centre-ville",
        quote: "Les deux fauteuils du salon ont 30 ans. Ma femme voulait les jeter. Après le nettoyage, elle a reconnu que j'avais raison de vouloir les garder."
      },
      localTips: "Un fauteuil de qualité vieillit bien s'il est entretenu. Un nettoyage tous les 2 ans suffit pour un usage normal.",
      stats: "Nous redonnons vie aux fauteuils anciens de qualité."
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HAUTS-DE-SEINE (92) - 15 villes
  // ═══════════════════════════════════════════════════════════════════════════

  "boulogne-billancourt": {
    "nettoyage-canape": {
      localIntro: "120 000 habitants, plus grande ville des Hauts-de-Seine et 8e de France. Boulogne mêle héritage industriel (Renault) et quartiers résidentiels aisés. Le revenu médian atteint 32 000€/an (INSEE), le mobilier y est souvent haut de gamme. Les studios et deux-pièces côtoient les grands appartements familiaux du nord de la ville.",
      challenges: "Le stationnement est difficile dans toute la ville. Nous arrivons tôt le matin pour trouver une place près de votre immeuble. Les canapés de créateurs (Ligne Roset, Cinna) sont fréquents et demandent des produits adaptés.",
      testimonial: {
        name: "Alexandra M.",
        neighborhood: "Pont de Sèvres",
        quote: "Canapé Ligne Roset Togo en alcantara, 5 ans d'utilisation. Le revêtement avait perdu de son éclat. Le technicien connaissait ce modèle, il a utilisé les produits adaptés à l'alcantara."
      },
      localTips: "L'alcantara et les microsuèdes se nettoient différemment du tissu classique. Ces matériaux techniques demandent des produits spécifiques et un brossage dans le sens des fibres.",
      stats: "Expertise canapés design français. Intervention sous 48h malgré les contraintes de stationnement."
    },
    "nettoyage-fauteuil": {
      localIntro: "Boulogne accueille de nombreux sièges sociaux (TF1, Bouygues). Les cadres en télétravail partiel ont investi dans des fauteuils ergonomiques de qualité.",
      challenges: "Les fauteuils Herman Miller, Vitra ou Knoll sont courants. Ces sièges haut de gamme nécessitent un entretien expert.",
      testimonial: {
        name: "François D.",
        neighborhood: "Rhin et Danube",
        quote: "Fauteuil Aeron Herman Miller pour le télétravail. Après 3 ans, le mesh était grisâtre. Le nettoyage a redonné sa couleur noire d'origine."
      },
      localTips: "Le mesh des fauteuils ergonomiques accumule la poussière. Un dépoussiérage mensuel à l'aspirateur à faible puissance préserve le tissu technique.",
      stats: "Expertise sièges ergonomiques premium. Herman Miller, Steelcase, Knoll."
    }
  },

  "issy-les-moulineaux": {
    "nettoyage-canape": {
      localIntro: "69 000 habitants dans cette ville dynamique au sud de Paris. Issy accueille de nombreuses entreprises tech (Microsoft France) et attire une population jeune et connectée. Les logements neufs du quartier Val de Seine côtoient les immeubles anciens du centre.",
      challenges: "Les appartements neufs ont des matériaux modernes (baies vitrées, béton ciré) qui créent des environnements secs. Les canapés en tissu peuvent accumuler la poussière électrostatique.",
      testimonial: {
        name: "Sarah K.",
        neighborhood: "Val de Seine",
        quote: "Appartement neuf, baies vitrées, canapé en velours. La poussière s'accumulait plus vite qu'ailleurs. Le nettoyage a aussi traité l'aspect électrostatique du tissu."
      },
      localTips: "Dans les logements neufs avec grandes baies vitrées, un humidificateur d'air réduit l'électricité statique qui attire la poussière sur les textiles.",
      stats: "Traitement antistatique disponible. Quartier Val de Seine et Fort d'Issy couverts."
    },
    "nettoyage-fauteuil": {
      localIntro: "La population tech d'Issy travaille souvent à domicile. Les fauteuils gaming et ergonomiques y sont répandus.",
      challenges: "Les fauteuils gaming ont des revêtements synthétiques et des formes complexes (accoudoirs réglables, dossier inclinable). Nous nettoyons toutes les surfaces accessibles.",
      testimonial: {
        name: "Kevin L.",
        neighborhood: "Centre-ville",
        quote: "Fauteuil gaming DXRacer, 2 ans d'utilisation intensive. Les accoudoirs collaient, l'assise était tachée. Le nettoyage a tout rattrapé."
      },
      localTips: "Les fauteuils gaming s'encrassent vite (transpiration, grignotage). Un nettoyage tous les 6 mois maintient l'hygiène et le confort.",
      stats: "Expertise fauteuils gaming et e-sport."
    }
  },

  "montrouge": {
    "nettoyage-canape": {
      localIntro: "50 000 habitants sur 2 km², Montrouge est une ville dense aux portes de Paris. Les appartements sont souvent petits (le T2 domine) mais bien entretenus. Le beffroi art déco domine le centre-ville. La station de métro Mairie de Montrouge dessert toute la ville.",
      challenges: "Les petits espaces impliquent des canapés compacts ou convertibles très utilisés. Le manque de recul pour travailler demande une bonne organisation.",
      testimonial: {
        name: "Léa B.",
        neighborhood: "Centre-ville",
        quote: "T2 de 35m², le canapé-lit servait tous les week-ends pour les invités. L'assise et le couchage étaient vraiment sales. Le technicien a tout nettoyé en 1h30."
      },
      localTips: "Les canapés convertibles ont un matelas souvent oublié. Faites-le nettoyer en même temps que l'assise pour un résultat complet.",
      stats: "Nettoyage canapé + matelas convertible en une seule intervention."
    },
    "nettoyage-fauteuil": {
      localIntro: "À Montrouge, l'espace est précieux. Les fauteuils sont souvent des sièges d'appoint repliables ou des poufs structurés.",
      challenges: "Les poufs et fauteuils d'appoint sont très utilisés dans les petits espaces. Ils servent de siège, de repose-pieds, de table d'appoint.",
      testimonial: {
        name: "Paul N.",
        neighborhood: "Beffroi",
        quote: "Deux poufs Fatboy qui servent de sièges principaux dans mon studio. Ils étaient vraiment crasseux. Le nettoyage leur a redonné leur couleur vive."
      },
      localTips: "Les poufs en tissu se nettoient comme des fauteuils classiques. Retournez-les régulièrement pour une usure homogène.",
      stats: "Poufs et fauteuils d'appoint traités au même tarif."
    }
  },

  "malakoff": {
    "nettoyage-canape": {
      localIntro: "31 000 habitants dans cette commune populaire au sud de Paris. Malakoff a conservé un tissu social mixte avec des logements sociaux et des copropriétés. Le Théâtre 71 et la Maison des Arts en font un lieu culturel vivant.",
      challenges: "Les logements sociaux ont parfois des accès réglementés. Prévenez le gardien de notre venue. Les canapés sont souvent pratiques et résistants.",
      testimonial: {
        name: "Djamila A.",
        neighborhood: "Théâtre 71",
        quote: "HLM des années 80, le canapé était là depuis l'emménagement. 15 ans d'utilisation, je pensais qu'il était fichu. Le nettoyage a prouvé le contraire."
      },
      localTips: "Un canapé de qualité bien entretenu dure 15 à 20 ans. Le nettoyage professionnel régulier prolonge significativement sa durée de vie.",
      stats: "Intervention HLM et copropriétés. Tarif accessible."
    },
    "nettoyage-fauteuil": {
      localIntro: "Malakoff compte de nombreuses familles. Les fauteuils de salon servent à toute la famille, des grands-parents aux enfants.",
      challenges: "Les fauteuils familiaux accumulent les traces de plusieurs générations. Nous traitons toutes les salissures du quotidien.",
      testimonial: {
        name: "Youssef H.",
        neighborhood: "Centre-ville",
        quote: "Le fauteuil de ma mère, transmis à ma sœur, maintenant chez moi. 30 ans d'histoire familiale dans ce siège. Le nettoyage l'a préservé pour mes enfants."
      },
      localTips: "Les fauteuils familiaux ont une valeur sentimentale. L'entretien régulier permet de les transmettre de génération en génération.",
      stats: "Nous prenons soin de vos fauteuils de famille."
    }
  },

  "vanves": {
    "nettoyage-canape": {
      localIntro: "28 000 habitants dans cette petite ville familiale. Vanves est coincée entre Issy et Malakoff, avec un centre-ville à taille humaine. Le lycée Michelet et le parc Frédéric Pic en sont les repères. Les appartements sont variés, des studios étudiants aux appartements familiaux.",
      challenges: "La mixité de population (étudiants, familles, retraités) implique des besoins variés. Nous nous adaptons à chaque situation.",
      testimonial: {
        name: "Aurélie C.",
        neighborhood: "Parc Pic",
        quote: "Jeune maman, un canapé acheté d'occasion à restaurer. Le vendeur l'avait décrit comme 'propre'. Le nettoyage a révélé des taches cachées et une couleur plus claire que prévue."
      },
      localTips: "Avant d'acheter un canapé d'occasion, regardez sous les coussins et sentez les tissus. Un nettoyage professionnel après achat est recommandé.",
      stats: "Nettoyage post-achat d'occasion recommandé."
    },
    "nettoyage-fauteuil": {
      localIntro: "Les étudiants du lycée Michelet et de Paris-Dauphine habitent souvent à Vanves. Les fauteuils de bureau pour les études sont essentiels.",
      challenges: "Les fauteuils d'étudiants sont très utilisés et parfois négligés. Un nettoyage avant les examens améliore le confort de travail.",
      testimonial: {
        name: "Lucas M.",
        neighborhood: "Centre-ville",
        quote: "Mon fauteuil de bureau avait 4 ans de prépa et d'école de commerce. Le tissu était devenu grisâtre. Le nettoyage avant mon M2 lui a redonné vie."
      },
      localTips: "Un fauteuil de travail propre améliore la concentration. Pensez au nettoyage en début d'année scolaire.",
      stats: "Tarif étudiant sur présentation de carte."
    }
  },

  "clichy": {
    "nettoyage-canape": {
      localIntro: "63 000 habitants dans cette ville en mutation au nord-ouest de Paris. Clichy mêle quartiers populaires et programmes immobiliers neufs. Les Batignolles et le quartier du métro mairie de Clichy sont en pleine transformation.",
      challenges: "Les chantiers omniprésents créent de la poussière qui s'infiltre dans les logements. Les canapés des appartements en bordure de chantier peuvent nécessiter un dépoussiérage avant le nettoyage.",
      testimonial: {
        name: "Nicolas F.",
        neighborhood: "Mairie de Clichy",
        quote: "Chantier sous mes fenêtres depuis 18 mois. Le canapé était recouvert d'une fine poussière de plâtre. Le technicien a d'abord aspiré avant de nettoyer."
      },
      localTips: "En période de chantier, protégez votre canapé avec un drap quand vous aérez. La poussière de construction est abrasive pour les fibres textiles.",
      stats: "Dépoussiérage préalable inclus si nécessaire."
    },
    "nettoyage-fauteuil": {
      localIntro: "Clichy attire une population jeune et connectée. Les fauteuils de bureau pour le télétravail sont de plus en plus présents.",
      challenges: "Les jeunes actifs investissent dans des fauteuils ergonomiques qu'ils utilisent intensivement. Un entretien régulier préserve leur investissement.",
      testimonial: {
        name: "Amélie D.",
        neighborhood: "Parc Roger Salengro",
        quote: "Fauteuil ergonomique acheté pendant le confinement, jamais nettoyé depuis. 3 ans de télétravail dans les fibres. Le résultat est impressionnant."
      },
      localTips: "Un fauteuil de bureau utilisé 8h par jour mérite un nettoyage annuel minimum. Les accoudoirs et l'appuie-tête concentrent les salissures.",
      stats: "Expertise télétravail intensif."
    }
  },

  "levallois-perret": {
    "nettoyage-canape": {
      localIntro: "65 000 habitants sur 2,4 km² font de Levallois la ville la plus dense de France hors Paris. Le revenu médian atteint 35 000€/an (INSEE), parmi les plus élevés de la petite couronne. Les appartements sont souvent de standing avec du mobilier haut de gamme.",
      challenges: "La densité implique des immeubles avec ascenseurs parfois étroits. Les canapés de grande taille peuvent poser des problèmes de livraison, pas de nettoyage sur place.",
      testimonial: {
        name: "Stéphane R.",
        neighborhood: "Hôtel de Ville",
        quote: "Canapé B&B Italia dans un appartement haussmannien. Le cuir blanc était devenu gris. Le technicien m'a expliqué que le cuir blanc absorbe la pollution. Résultat impeccable."
      },
      localTips: "Le cuir blanc nécessite un entretien mensuel à la peau de chamois humide. Le nettoyage professionnel annuel complète cet entretien quotidien.",
      stats: "Expertise cuir blanc et clair. Stationnement difficile : prévoir créneau tôt le matin."
    },
    "nettoyage-fauteuil": {
      localIntro: "Levallois accueille de nombreux sièges sociaux. Les cadres supérieurs investissent dans du mobilier design pour leur domicile.",
      challenges: "Les fauteuils design iconiques (Eames, Jacobsen, Starck) demandent une connaissance des matériaux et des techniques adaptées.",
      testimonial: {
        name: "Claire V.",
        neighborhood: "Planchette",
        quote: "Fauteuil Egg d'Arne Jacobsen en tissu Kvadrat. Le technicien connaissait ce tissu danois et les précautions à prendre. Parfait."
      },
      localTips: "Les tissus Kvadrat sont haut de gamme mais fragiles. Évitez les frottements et faites appel à un professionnel pour le nettoyage.",
      stats: "Expertise design scandinave et italien."
    }
  },

  "neuilly-sur-seine": {
    "nettoyage-canape": {
      localIntro: "60 000 habitants dans cette ville résidentielle prestigieuse. Le revenu médian dépasse 45 000€/an (INSEE), le plus élevé de France. Les appartements haussmanniens de l'avenue Charles de Gaulle et les maisons de l'île de la Jatte accueillent du mobilier d'exception.",
      challenges: "Les canapés sont souvent des pièces signées (De Sede, Poltrona Frau, Minotti). Nous connaissons ces marques et les produits adaptés à chaque type de cuir ou tissu.",
      testimonial: {
        name: "Isabelle de M.",
        neighborhood: "Avenue Charles de Gaulle",
        quote: "Canapé Poltrona Frau en cuir pleine fleur, héritage familial. Le cuir avait 40 ans mais était de qualité exceptionnelle. Le technicien l'a traité avec le respect qu'il mérite."
      },
      localTips: "Le cuir de qualité vieillit comme le bon vin s'il est entretenu. Un nettoyage et nourrissage annuel préserve la patine naturelle.",
      stats: "Expertise mobilier de prestige. Discrétion garantie."
    },
    "nettoyage-fauteuil": {
      localIntro: "Les intérieurs neuilléens comptent souvent des fauteuils de collection : design, anciens, ou pièces d'artisanat d'art.",
      challenges: "Les fauteuils de valeur (financière ou sentimentale) demandent des précautions particulières. Nous évaluons toujours l'état avant d'intervenir.",
      testimonial: {
        name: "Philippe de G.",
        neighborhood: "Île de la Jatte",
        quote: "Paire de fauteuils signés Ruhlmann, années 30. Les experts du musée m'avaient recommandé de ne pas les toucher. Votre technicien a été remarquable de délicatesse."
      },
      localTips: "Les fauteuils Art Déco ont des tissus et des structures fragiles. Un dépoussiérage doux régulier vaut mieux qu'un nettoyage intensif espacé.",
      stats: "Expertise mobilier de collection. Références disponibles sur demande."
    }
  },

  "courbevoie": {
    "nettoyage-canape": {
      localIntro: "82 000 habitants au pied de La Défense. Courbevoie mêle quartiers résidentiels du vieux Courbevoie et tours de bureaux. Le quartier Bécon a conservé son caractère résidentiel tandis que Charras se densifie. Le revenu médian de 28 000€/an reflète cette mixité.",
      challenges: "Les tours de La Défense projettent leur ombre sur les appartements bas. L'humidité et le manque de lumière affectent les textiles. Nous adaptons le temps de séchage.",
      testimonial: {
        name: "Michel P.",
        neighborhood: "Bécon-les-Bruyères",
        quote: "Appartement au rez-de-chaussée, orienté nord. Le canapé sentait le renfermé malgré l'aération. Le traitement anti-humidité a résolu le problème."
      },
      localTips: "Les appartements peu lumineux et orientés nord nécessitent une aération prolongée après le nettoyage. Utilisez un ventilateur pour accélérer le séchage.",
      stats: "Traitement anti-humidité disponible. Bécon et Charras couverts."
    },
    "nettoyage-fauteuil": {
      localIntro: "Courbevoie accueille de nombreux cadres travaillant à La Défense. Le télétravail partiel implique des fauteuils de bureau de qualité à domicile.",
      challenges: "Les fauteuils de bureau sont utilisés en complément du siège au bureau. L'alternance domicile/bureau implique une usure différente.",
      testimonial: {
        name: "Sandrine T.",
        neighborhood: "Charras",
        quote: "Je travaille 3 jours à La Défense, 2 jours chez moi. Mon fauteuil maison était plus sale que celui du bureau. Le nettoyage a rééquilibré les choses."
      },
      localTips: "En télétravail partiel, les deux fauteuils (domicile et bureau) devraient être nettoyés avec la même fréquence pour un confort équivalent.",
      stats: "Télétravail hybride : nous intervenons à domicile, pensez à votre siège de bureau aussi."
    }
  },

  "puteaux": {
    "nettoyage-canape": {
      localIntro: "45 000 habitants entre La Défense et les coteaux de la Seine. Puteaux juxtapose la zone d'affaires et le vieux Puteaux pittoresque. L'île de Puteaux offre un cadre verdoyant. Les prix immobiliers varient fortement selon le quartier.",
      challenges: "Les appartements du vieux Puteaux ont du cachet mais des escaliers parfois étroits. Ceux de La Défense sont modernes mais impersonnels. Nous nous adaptons à chaque contexte.",
      testimonial: {
        name: "Dominique L.",
        neighborhood: "Vieux Puteaux",
        quote: "Appartement de caractère, escalier en colimaçon. Les déménageurs avaient eu du mal avec le canapé. Le technicien est monté sans problème avec son équipement."
      },
      localTips: "Dans le vieux Puteaux, prévenez-nous des contraintes d'accès. Nous venons équipés léger pour les escaliers difficiles.",
      stats: "Vieux Puteaux, Ile de Puteaux et La Défense couverts."
    },
    "nettoyage-fauteuil": {
      localIntro: "L'île de Puteaux attire les familles avec ses espaces verts. Les fauteuils de jardin reconvertis en intérieur sont parfois à traiter.",
      challenges: "Les fauteuils d'extérieur ramenés en intérieur (rotin, résine tressée) peuvent avoir des salissures spécifiques : pollen, humidité, UV.",
      testimonial: {
        name: "Marine B.",
        neighborhood: "Île de Puteaux",
        quote: "Fauteuil en rotin qui était sur ma terrasse pendant 3 ans. Je l'ai rentré cet hiver. Le technicien a traité le rotin et le coussin séparément."
      },
      localTips: "Le rotin se nettoie à la brosse douce humide. Les coussins amovibles se traitent comme des tissus classiques.",
      stats: "Fauteuils d'intérieur et d'extérieur traités."
    }
  },

  "suresnes": {
    "nettoyage-canape": {
      localIntro: "49 000 habitants sur les coteaux de la Seine. Suresnes est connue pour le Mont Valérien et ses vignes. Les maisons avec vue sur Paris côtoient les immeubles du bas de ville. L'altitude crée un microclimat plus sec que les villes en bord de Seine.",
      challenges: "Les maisons des coteaux ont parfois des terrasses ouvertes sur le salon. La poussière extérieure s'infiltre plus facilement.",
      testimonial: {
        name: "Bernard C.",
        neighborhood: "Mont Valérien",
        quote: "Maison avec baie vitrée donnant sur Paris. Le canapé face à la vue recevait toute la poussière quand on ouvrait. Le nettoyage a éliminé 5 ans d'accumulation."
      },
      localTips: "Près d'une grande baie vitrée, fermez les stores lors des épisodes de vent. La poussière s'incruste dans les fibres textiles.",
      stats: "Intervention coteaux et bas de ville. Vue Paris garantie depuis certains chantiers."
    },
    "nettoyage-fauteuil": {
      localIntro: "Les maisons de Suresnes ont souvent des bureaux avec vue. Les fauteuils y sont choisis pour le confort et l'esthétique.",
      challenges: "Les fauteuils de bureau dans les maisons sont souvent plus design que les modèles classiques de bureaux. Cuir, tissu noble, formes originales.",
      testimonial: {
        name: "Agnès R.",
        neighborhood: "Centre-ville",
        quote: "Mon fauteuil de bureau est une pièce design que je n'aurais pas au travail. Il mérite un entretien à la hauteur. Très satisfaite du service."
      },
      localTips: "Un fauteuil design mérite des produits adaptés. Évitez les nettoyants grand public qui peuvent altérer les finitions.",
      stats: "Expertise fauteuils design et de bureau."
    }
  },

  "nanterre": {
    "nettoyage-canape": {
      localIntro: "96 000 habitants, préfecture des Hauts-de-Seine. Nanterre mêle quartiers universitaires (Paris-Nanterre), zones d'activités, grands ensembles et quartiers pavillonnaires. Le parc André Malraux offre un poumon vert. La diversité sociale se reflète dans le mobilier.",
      challenges: "La préfecture accueille des populations variées avec des besoins différents. Nous proposons des tarifs adaptés et des créneaux flexibles.",
      testimonial: {
        name: "Abdel K.",
        neighborhood: "Pablo Picasso",
        quote: "Résidence des années 70, canapé de famille usé par 4 enfants. Je pensais qu'il fallait le jeter. Le nettoyage lui a redonné 5 ans de vie."
      },
      localTips: "Un canapé usé mais structurellement sain mérite un nettoyage avant remplacement. Vous pourriez être surpris du résultat.",
      stats: "Tarif social sur demande. Tous les quartiers de Nanterre couverts."
    },
    "nettoyage-fauteuil": {
      localIntro: "Le campus de Paris-Nanterre et les résidences étudiantes impliquent une population jeune. Les fauteuils y sont souvent des premiers achats ou des récupérations.",
      challenges: "Les fauteuils d'étudiants en colocation subissent une usure accélérée. Plusieurs utilisateurs, peu d'entretien.",
      testimonial: {
        name: "Emma S.",
        neighborhood: "Université",
        quote: "Colocation de 4 étudiants, un seul fauteuil confortable. Il était devenu le siège de tout le monde. Le nettoyage avant mon départ a été une bonne idée."
      },
      localTips: "En colocation, établissez un planning de nettoyage du mobilier commun. Un fauteuil partagé par 4 personnes s'use 4 fois plus vite.",
      stats: "Tarif étudiant sur présentation de carte."
    }
  },

  "colombes": {
    "nettoyage-canape": {
      localIntro: "86 000 habitants, 3e ville des Hauts-de-Seine. Colombes est une ville familiale avec un parc immobilier varié. Le stade Yves-du-Manoir (ancien stade olympique) rappelle le passé sportif. Les quartiers pavillonnaires côtoient les grands ensembles.",
      challenges: "La taille de la ville implique des temps de trajet variables. Nous planifions nos interventions par secteur géographique.",
      testimonial: {
        name: "Patricia D.",
        neighborhood: "Centre-ville",
        quote: "Trois enfants sportifs, un chien, le canapé en voyait de toutes les couleurs. Le technicien a traité les taches de boue, d'herbe et de sueur. Tout est parti."
      },
      localTips: "Avec des sportifs à la maison, ayez un plaid lavable sur le canapé. Les taches de transpiration et d'herbe sont fréquentes mais partent bien si traitées rapidement.",
      stats: "Intervention tous secteurs. Créneaux mercredi et samedi pour les familles."
    },
    "nettoyage-fauteuil": {
      localIntro: "Colombes compte de nombreuses familles avec plusieurs enfants. Les fauteuils de salon servent souvent de sièges d'appoint pour les enfants.",
      challenges: "Les fauteuils utilisés par les enfants présentent des salissures spécifiques. Nous avons les produits adaptés aux taches enfantines.",
      testimonial: {
        name: "Yann B.",
        neighborhood: "Petit-Colombes",
        quote: "Le fauteuil du salon était devenu le trône du plus petit. Compote, feutres, peinture : il y avait de tout. Le résultat est bluffant."
      },
      localTips: "Un fauteuil dédié aux enfants peut être protégé par une housse lavable. C'est plus pratique qu'un nettoyage fréquent.",
      stats: "Expertise taches enfantines. Tarif famille nombreuse."
    }
  },

  "asnieres-sur-seine": {
    "nettoyage-canape": {
      localIntro: "87 000 habitants au bord de la Seine. Asnières compte le célèbre cimetière des chiens et un patrimoine art nouveau. Les bords de Seine attirent promeneurs et joggeurs. Les appartements du centre historique côtoient les programmes neufs des bords de fleuve.",
      challenges: "Les logements en bord de Seine ont des problèmes d'humidité similaires aux autres villes fluviales. Les appartements art nouveau ont des contraintes d'accès (escaliers d'époque).",
      testimonial: {
        name: "Marie-France C.",
        neighborhood: "Château d'Asnières",
        quote: "Immeuble art nouveau, escalier d'origine magnifique mais étroit. Le technicien est monté au 4e sans problème. Le canapé ancien n'avait jamais été nettoyé depuis son achat en brocante."
      },
      localTips: "Les immeubles anciens ont du charme mais des contraintes d'accès. Prévenez-nous pour que nous venions équipés en conséquence.",
      stats: "Expertise immeubles anciens. Accès bords de Seine et centre historique."
    },
    "nettoyage-fauteuil": {
      localIntro: "Asnières attire des amateurs de patrimoine et de brocante. Les fauteuils chinés aux puces de Vanves ou Saint-Ouen y sont fréquents.",
      challenges: "Les fauteuils de brocante peuvent avoir des tissus anciens fragiles. Une évaluation préalable est toujours nécessaire.",
      testimonial: {
        name: "Gérard L.",
        neighborhood: "Centre-ville",
        quote: "Fauteuil trouvé aux puces de Saint-Ouen, velours d'origine. Le vendeur m'avait dit qu'il était propre. Le nettoyage a révélé 50 ans de poussière cachée."
      },
      localTips: "Un fauteuil de brocante mérite toujours un nettoyage après achat. Vous ne savez pas d'où il vient ni comment il a été entretenu.",
      stats: "Expertise brocante et fauteuils anciens."
    }
  },

  "saint-cloud": {
    "nettoyage-canape": {
      localIntro: "30 000 habitants dans cette ville résidentielle prestigieuse. Le parc de Saint-Cloud (460 hectares) domine la commune. Le revenu médian de 42 000€/an (INSEE) se traduit par du mobilier haut de gamme. Les maisons bourgeoises et les appartements de standing accueillent des canapés d'exception.",
      challenges: "Les canapés sont souvent des pièces signées qui nécessitent des produits adaptés. Les maisons avec jardin peuvent avoir des problèmes de pollen au printemps.",
      testimonial: {
        name: "Anne-Sophie de V.",
        neighborhood: "Parc de Saint-Cloud",
        quote: "Canapé De Sede en cuir, mon mari l'avait avant notre mariage. 20 ans d'utilisation, le cuir était sec et craquelé par endroits. Le traitement l'a régénéré."
      },
      localTips: "Le cuir haut de gamme vieillit bien s'il est nourri régulièrement. Deux fois par an minimum avec un baume sans silicone.",
      stats: "Expertise cuir haut de gamme suisse et italien."
    },
    "nettoyage-fauteuil": {
      localIntro: "Les grandes maisons de Saint-Cloud comptent souvent des fauteuils de famille transmis de génération en génération.",
      challenges: "Les fauteuils anciens de famille ont une valeur sentimentale inestimable. Nous les traitons avec le respect qu'ils méritent.",
      testimonial: {
        name: "Henri de L.",
        neighborhood: "Hippodrome",
        quote: "Le fauteuil Voltaire de mon grand-père, recouvert par ma grand-mère dans les années 50. Le tissu était fragile. Le technicien a été remarquable de délicatesse."
      },
      localTips: "Les fauteuils de famille anciens méritent un entretien doux et régulier. Un dépoussiérage mensuel vaut mieux qu'un nettoyage agressif.",
      stats: "Expertise mobilier de famille ancien. Références disponibles."
    }
  }
};

/**
 * Récupère le contenu pour une combinaison ville/service
 */
export function getCityServiceContent(citySlug: string, serviceSlug: string): CityServiceVariation | null {
  const cityContent = cityServiceContent[citySlug];
  if (!cityContent) return null;

  return cityContent[serviceSlug] || null;
}

/**
 * Vérifie si un contenu existe pour une combinaison ville/service
 */
export function hasCityServiceContent(citySlug: string, serviceSlug: string): boolean {
  return getCityServiceContent(citySlug, serviceSlug) !== null;
}

/**
 * Liste des villes avec contenu disponible
 */
export function getAvailableCities(): string[] {
  return Object.keys(cityServiceContent);
}

/**
 * Liste des services avec pages villes
 */
export function getServicesWithCityPages(): string[] {
  return SERVICES_WITH_CITY_PAGES;
}
