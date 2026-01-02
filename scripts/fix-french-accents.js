#!/usr/bin/env node
/**
 * Script de correction des accents français
 *
 * Usage:
 *   node scripts/fix-french-accents.js [--check] [--fix] [file...]
 *
 * Options:
 *   --check  Mode vérification uniquement (pas de modification)
 *   --fix    Mode correction (modifie les fichiers)
 *
 * Exemples:
 *   node scripts/fix-french-accents.js --check src/lib/data/articles.ts
 *   node scripts/fix-french-accents.js --fix src/lib/data/*.ts
 */

const fs = require('fs');
const path = require('path');

// Dictionnaire des corrections
// Format: { motIncorrect: motCorrigé }
const CORRECTIONS = {
  // === MOTS AVEC É ===
  'probleme': 'problème',
  'Probleme': 'Problème',
  'problemes': 'problèmes',
  'Problemes': 'Problèmes',
  'materiel': 'matériel',
  'Materiel': 'Matériel',
  'materiels': 'matériels',
  'Materiels': 'Matériels',
  'methode': 'méthode',
  'Methode': 'Méthode',
  'methodes': 'méthodes',
  'Methodes': 'Méthodes',
  'reponse': 'réponse',
  'Reponse': 'Réponse',
  'reponses': 'réponses',
  'resultat': 'résultat',
  'Resultat': 'Résultat',
  'resultats': 'résultats',
  'resume': 'résumé',
  'Resume': 'Résumé',
  'resumes': 'résumés',
  'general': 'général',
  'General': 'Général',
  'generale': 'générale',
  'generalement': 'généralement',
  'regenerer': 'régénérer',
  'regenere': 'régénère',
  'generation': 'génération',
  'Generation': 'Génération',
  'generer': 'générer',
  'Generer': 'Générer',
  'genere': 'génère',
  'Genere': 'Génère',
  'elegance': 'élégance',
  'Elegance': 'Élégance',
  'elegant': 'élégant',
  'Elegant': 'Élégant',
  'elegante': 'élégante',
  'element': 'élément',
  'Element': 'Élément',
  'elements': 'éléments',
  'Elements': 'Éléments',
  'elementaire': 'élémentaire',
  'energie': 'énergie',
  'Energie': 'Énergie',
  'energetique': 'énergétique',
  'equipe': 'équipe',
  'Equipe': 'Équipe',
  'equipement': 'équipement',
  'Equipement': 'Équipement',
  'equipements': 'équipements',
  'equilibre': 'équilibre',
  'Equilibre': 'Équilibre',
  'equilibrer': 'équilibrer',
  'etape': 'étape',
  'Etape': 'Étape',
  'etapes': 'étapes',
  'Etapes': 'Étapes',
  'etat': 'état',
  'Etat': 'État',
  'etats': 'états',
  'etablir': 'établir',
  'etablissement': 'établissement',
  'ete': 'été',
  'Ete': 'Été',
  'evenement': 'événement',
  'Evenement': 'Événement',
  'evenements': 'événements',
  'eventuel': 'éventuel',
  'Eventuel': 'Éventuel',
  'eventuelle': 'éventuelle',
  'eventuelles': 'éventuelles',
  'eventuellement': 'éventuellement',
  'evolution': 'évolution',
  'Evolution': 'Évolution',
  'evoluer': 'évoluer',
  'econome': 'économe',
  'economie': 'économie',
  'Economie': 'Économie',
  'economique': 'économique',
  'Economique': 'Économique',
  'ecologique': 'écologique',
  'Ecologique': 'Écologique',
  'ecologiques': 'écologiques',
  'efficacite': 'efficacité',
  'Efficacite': 'Efficacité',
  'immediat': 'immédiat',
  'Immediat': 'Immédiat',
  'immediate': 'immédiate',
  'immediatement': 'immédiatement',
  'necessaire': 'nécessaire',
  'Necessaire': 'Nécessaire',
  'necessaires': 'nécessaires',
  'necessiter': 'nécessiter',
  'necessite': 'nécessité',
  'preference': 'préférence',
  'Preference': 'Préférence',
  'preferer': 'préférer',
  'prefere': 'préfère',
  'preferes': 'préfères',
  'preferee': 'préférée',
  'present': 'présent',
  'Present': 'Présent',
  'presente': 'présente',
  'presenter': 'présenter',
  'presentation': 'présentation',
  'Presentation': 'Présentation',
  'prepare': 'préparé',
  'Prepare': 'Préparé',
  'preparee': 'préparée',
  'preparer': 'préparer',
  'Preparer': 'Préparer',
  'preparez': 'préparez',
  'Preparez': 'Préparez',
  'preparent': 'préparent',
  'preparation': 'préparation',
  'Preparation': 'Préparation',
  'precis': 'précis',
  'Precis': 'Précis',
  'precise': 'précise',
  'preciser': 'préciser',
  'precision': 'précision',
  'Precision': 'Précision',
  'precaution': 'précaution',
  'Precaution': 'Précaution',
  'precautions': 'précautions',
  'precedent': 'précédent',
  'Precedent': 'Précédent',
  'precedente': 'précédente',
  'preceder': 'précéder',
  'precede': 'précède',
  'preferable': 'préférable',
  'Preferable': 'Préférable',
  'preliminaire': 'préliminaire',
  'Preliminaire': 'Préliminaire',
  'premiere': 'première',
  'Premiere': 'Première',
  'premieres': 'premières',
  'protege': 'protégé',
  'Protege': 'Protégé',
  'protegee': 'protégée',
  'proteger': 'protéger',
  'Proteger': 'Protéger',
  'reduit': 'réduit',
  'Reduit': 'Réduit',
  'reduite': 'réduite',
  'reduire': 'réduire',
  'Reduire': 'Réduire',
  'reduction': 'réduction',
  'Reduction': 'Réduction',
  'referer': 'référer',
  'reference': 'référence',
  'Reference': 'Référence',
  'references': 'références',
  'regulier': 'régulier',
  'Regulier': 'Régulier',
  'reguliere': 'régulière',
  'regulierement': 'régulièrement',
  'regularite': 'régularité',
  'reparation': 'réparation',
  'Reparation': 'Réparation',
  'reparations': 'réparations',
  'reparer': 'réparer',
  'repare': 'réparé',
  'repertoire': 'répertoire',
  'Repertoire': 'Répertoire',
  'repeter': 'répéter',
  'repete': 'répète',
  'repetition': 'répétition',
  'repetez': 'répétez',
  'residu': 'résidu',
  'Residu': 'Résidu',
  'residus': 'résidus',
  'resoudre': 'résoudre',
  'Resoudre': 'Résoudre',
  'resolution': 'résolution',
  'Resolution': 'Résolution',
  'resistant': 'résistant',
  'Resistant': 'Résistant',
  'resistante': 'résistante',
  'resistent': 'résistent',
  'resistance': 'résistance',
  'Resistance': 'Résistance',
  'resister': 'résister',
  'reveler': 'révéler',
  'revele': 'révèle',
  'revelation': 'révélation',
  'securite': 'sécurité',
  'Securite': 'Sécurité',
  'securiser': 'sécuriser',
  'securise': 'sécurisé',
  'secher': 'sécher',
  'Secher': 'Sécher',
  'sechez': 'séchez',
  'Sechez': 'Séchez',
  'sechage': 'séchage',
  'Sechage': 'Séchage',
  'seche': 'sèche',
  'Seche': 'Sèche',
  'selectif': 'sélectif',
  'Selectif': 'Sélectif',
  'selective': 'sélective',
  'selection': 'sélection',
  'Selection': 'Sélection',
  'selectionner': 'sélectionner',
  'selectionne': 'sélectionné',
  'separer': 'séparer',
  'separe': 'séparé',
  'separee': 'séparée',
  'separation': 'séparation',
  'Separation': 'Séparation',
  'serieux': 'sérieux',
  'Serieux': 'Sérieux',
  'serieuse': 'sérieuse',
  'serieusement': 'sérieusement',
  'specialise': 'spécialisé',
  'Specialise': 'Spécialisé',
  'specialisee': 'spécialisée',
  'specialiser': 'spécialiser',
  'specialiste': 'spécialiste',
  'Specialiste': 'Spécialiste',
  'specialistes': 'spécialistes',
  'specialite': 'spécialité',
  'Specialite': 'Spécialité',
  'specifique': 'spécifique',
  'Specifique': 'Spécifique',
  'specifiques': 'spécifiques',
  'specificite': 'spécificité',
  'succes': 'succès',
  'Succes': 'Succès',
  'superieur': 'supérieur',
  'Superieur': 'Supérieur',
  'superieure': 'supérieure',
  'superieures': 'supérieures',
  'telephone': 'téléphone',
  'Telephone': 'Téléphone',
  'telephonique': 'téléphonique',
  'televise': 'télévisé',
  'televiseur': 'téléviseur',
  'television': 'télévision',
  'temoignage': 'témoignage',
  'Temoignage': 'Témoignage',
  'temoignages': 'témoignages',
  'verite': 'vérité',
  'Verite': 'Vérité',
  'veritable': 'véritable',
  'Veritable': 'Véritable',
  'verifier': 'vérifier',
  'Verifier': 'Vérifier',
  'verifiez': 'vérifiez',
  'Verifiez': 'Vérifiez',
  'verifie': 'vérifié',
  'Verifie': 'Vérifié',
  'verifiee': 'vérifiée',
  'verification': 'vérification',
  'Verification': 'Vérification',
  'veterinaire': 'vétérinaire',
  'Veterinaire': 'Vétérinaire',
  'veterinaires': 'vétérinaires',

  // === MOTS AVEC È ===
  'particuliere': 'particulière',
  'Particuliere': 'Particulière',
  'particulierement': 'particulièrement',
  'entiere': 'entière',
  'Entiere': 'Entière',
  'entierement': 'entièrement',
  'derniere': 'dernière',
  'Derniere': 'Dernière',
  'dernieres': 'dernières',
  'legere': 'légère',
  'Legere': 'Légère',
  'legerement': 'légèrement',
  'Legerement': 'Légèrement',
  'severe': 'sévère',
  'Severe': 'Sévère',
  'severes': 'sévères',
  'severement': 'sévèrement',
  'maniere': 'manière',
  'Maniere': 'Manière',
  'matieres': 'matières',
  'Matieres': 'Matières',
  'matiere': 'matière',
  'Matiere': 'Matière',
  'critere': 'critère',
  'Critere': 'Critère',
  'criteres': 'critères',
  'Criteres': 'Critères',
  'poussiere': 'poussière',
  'Poussiere': 'Poussière',
  'poussieres': 'poussières',
  'lumiere': 'lumière',
  'Lumiere': 'Lumière',
  'lumieres': 'lumières',
  'atmosphere': 'atmosphère',
  'Atmosphere': 'Atmosphère',
  'caractere': 'caractère',
  'Caractere': 'Caractère',
  'caracteres': 'caractères',
  'modele': 'modèle',
  'Modele': 'Modèle',
  'modeles': 'modèles',
  'systeme': 'système',
  'Systeme': 'Système',
  'systemes': 'systèmes',
  'pres': 'près',
  'apres': 'après',
  'Apres': 'Après',
  'tres': 'très',
  'Tres': 'Très',

  // === MOTS AVEC Ê ===
  'etre': 'être',
  'Etre': 'Être',
  'fenetre': 'fenêtre',
  'Fenetre': 'Fenêtre',
  'fenetres': 'fenêtres',
  'meme': 'même',
  'Meme': 'Même',
  'memes': 'mêmes',
  'extreme': 'extrême',
  'Extreme': 'Extrême',
  'extremement': 'extrêmement',
  'Extremement': 'Extrêmement',
  'extremes': 'extrêmes',
  'tete': 'tête',
  'Tete': 'Tête',
  'tetes': 'têtes',
  'arret': 'arrêt',
  'Arret': 'Arrêt',
  'arreter': 'arrêter',
  'arrete': 'arrête',
  'foret': 'forêt',
  'Foret': 'Forêt',
  'forets': 'forêts',
  'interet': 'intérêt',
  'Interet': 'Intérêt',
  'interets': 'intérêts',
  'peut-etre': 'peut-être',
  'Peut-etre': 'Peut-être',
  'gene': 'gêne',
  'Gene': 'Gêne',
  'gener': 'gêner',
  'genee': 'gênée',
  'genant': 'gênant',
  'genante': 'gênante',
  'gene': 'gêne',
  'enquete': 'enquête',
  'Enquete': 'Enquête',
  'enquetes': 'enquêtes',
  'conquete': 'conquête',
  'Conquete': 'Conquête',
  'requete': 'requête',
  'Requete': 'Requête',
  'requetes': 'requêtes',
  'fete': 'fête',
  'Fete': 'Fête',
  'fetes': 'fêtes',

  // === MOTS AVEC À ===
  // Note: "a" seul est trop courant, on ne le corrige que dans des contextes spécifiques
  'deja': 'déjà',
  'Deja': 'Déjà',
  'la-bas': 'là-bas',
  'La-bas': 'Là-bas',
  'voila': 'voilà',
  'Voila': 'Voilà',

  // === MOTS AVEC Ô ===
  'controle': 'contrôle',
  'Controle': 'Contrôle',
  'controles': 'contrôles',
  'controler': 'contrôler',
  'Controler': 'Contrôler',
  // EXCLU: conflit avec attribut HTML role=""
  // 'role': 'rôle',
  // 'Role': 'Rôle',
  // 'roles': 'rôles',
  'cote': 'côté',
  'Cote': 'Côté',
  'cotes': 'côtés',
  'hotel': 'hôtel',
  'Hotel': 'Hôtel',
  'hotels': 'hôtels',
  'hopital': 'hôpital',
  'Hopital': 'Hôpital',
  'hopitaux': 'hôpitaux',
  'tot': 'tôt',
  'Tot': 'Tôt',
  'plutot': 'plutôt',
  'Plutot': 'Plutôt',

  // === MOTS AVEC Î ===
  'ile': 'île',
  'Ile': 'Île',
  'iles': 'îles',
  'ile-de-france': 'Île-de-France',
  'Ile-de-France': 'Île-de-France',
  'maitre': 'maître',
  'Maitre': 'Maître',
  'maitrise': 'maîtrise',
  'Maitrise': 'Maîtrise',
  'maitriser': 'maîtriser',
  'maitrisee': 'maîtrisée',
  'connaitre': 'connaître',
  'Connaitre': 'Connaître',
  'connait': 'connaît',
  'reconnaitre': 'reconnaître',
  'paraitre': 'paraître',
  'parait': 'paraît',
  'apparaitre': 'apparaître',
  'apparait': 'apparaît',
  'disparaitre': 'disparaître',
  'disparait': 'disparaît',
  'naitre': 'naître',
  'nait': 'naît',
  'chaine': 'chaîne',
  'Chaine': 'Chaîne',
  'chaines': 'chaînes',
  'traine': 'traîne',
  'Traine': 'Traîne',
  'entrainer': 'entraîner',
  'Entrainer': 'Entraîner',
  'entraine': 'entraîne',
  'entrainement': 'entraînement',
  'Entrainement': 'Entraînement',
  'fraiche': 'fraîche',
  'Fraiche': 'Fraîche',
  'fraicheur': 'fraîcheur',
  'Fraicheur': 'Fraîcheur',

  // === MOTS AVEC Ç ===
  'ca': 'ça',
  'Ca': 'Ça',
  'francais': 'français',
  'Francais': 'Français',
  'francaise': 'française',
  'Francaise': 'Française',
  'francaises': 'françaises',
  'garcon': 'garçon',
  'Garcon': 'Garçon',
  'garcons': 'garçons',
  'facon': 'façon',
  'Facon': 'Façon',
  'facons': 'façons',
  'lecon': 'leçon',
  'Lecon': 'Leçon',
  'lecons': 'leçons',
  'recu': 'reçu',
  'Recu': 'Reçu',
  'recue': 'reçue',
  'recus': 'reçus',
  'apercu': 'aperçu',
  'Apercu': 'Aperçu',
  'apercue': 'aperçue',
  'decu': 'déçu',
  'Decu': 'Déçu',
  'decue': 'déçue',
  'decevoir': 'décevoir',
  'decevant': 'décevant',
  'commencant': 'commençant',
  'Commencant': 'Commençant',
  'avancant': 'avançant',
  'effacant': 'effaçant',
  'remplacant': 'remplaçant',
  'remplacante': 'remplaçante',
  'commercant': 'commerçant',
  'Commercant': 'Commerçant',
  'commercante': 'commerçante',
  'commercants': 'commerçants',

  // === MOTS AVEC Ù ===
  // NOTE: "ou" n'est PAS corrigé automatiquement car "ou" (alternative) est correct
  // Seuls les patterns contextuels pour "où" (lieu) sont utilisés

  // === CORRECTIONS D'ACCENTS ERRONÉS ===
  'traitément': 'traitement',
  'Traitément': 'Traitement',
  'traitér': 'traiter',
  'Traitér': 'Traiter',

  // === MOTS SPÉCIFIQUES AU NETTOYAGE ===
  'detachage': 'détachage',
  'Detachage': 'Détachage',
  'detacher': 'détacher',
  'Detacher': 'Détacher',
  'detachant': 'détachant',
  'Detachant': 'Détachant',
  'detache': 'détaché',
  'Detache': 'Détaché',
  'detachee': 'détachée',
  'degraissage': 'dégraissage',
  'Degraissage': 'Dégraissage',
  'degraissant': 'dégraissant',
  'Degraissant': 'Dégraissant',
  'desinfection': 'désinfection',
  'Desinfection': 'Désinfection',
  'desinfecter': 'désinfecter',
  'Desinfecter': 'Désinfecter',
  'desinfectant': 'désinfectant',
  'Desinfectant': 'Désinfectant',
  'desodorisation': 'désodorisation',
  'Desodorisation': 'Désodorisation',
  'desodoriser': 'désodoriser',
  'desodorisant': 'désodorisant',
  'Desodorisant': 'Désodorisant',
  'deterioration': 'détérioration',
  'Deterioration': 'Détérioration',
  'deteriorer': 'détériorer',
  'deteriore': 'détérioré',
  'deterioree': 'détériorée',
  'decoloration': 'décoloration',
  'Decoloration': 'Décoloration',
  'decolorer': 'décolorer',
  'decolore': 'décoloré',
  'decolorent': 'décolorent',
  'dessecher': 'dessécher',
  'Dessecher': 'Dessécher',
  'dessechement': 'dessèchement',
  'Dessechement': 'Dessèchement',
  'desseche': 'desséché',
  'dessechee': 'desséchée',
  'assecher': 'assécher',
  'Assecher': 'Assécher',
  'assechent': 'assèchent',
  'degat': 'dégât',
  'Degat': 'Dégât',
  'degats': 'dégâts',
  'Degats': 'Dégâts',
  'revetement': 'revêtement',
  'Revetement': 'Revêtement',
  'revetements': 'revêtements',
  'impregne': 'imprégné',
  'Impregne': 'Imprégné',
  'impregnee': 'imprégnée',
  'impregner': 'imprégner',
  'penetrer': 'pénétrer',
  'Penetrer': 'Pénétrer',
  'penetre': 'pénètre',
  'penetration': 'pénétration',
  'Penetration': 'Pénétration',
  'profondement': 'profondément',
  'Profondement': 'Profondément',
  'durete': 'dureté',
  'Durete': 'Dureté',
  'proprete': 'propreté',
  'Proprete': 'Propreté',
  'etancheite': 'étanchéité',
  'Etancheite': 'Étanchéité',
  'permeabilite': 'perméabilité',
  'Permeabilite': 'Perméabilité',
  'impermeabiliser': 'imperméabiliser',
  'impermeabilise': 'imperméabilisé',
  'impermeabilisation': 'imperméabilisation',
  'impermeable': 'imperméable',
  'Impermeable': 'Imperméable',
  'vulnerable': 'vulnérable',
  'Vulnerable': 'Vulnérable',
  'vulnerables': 'vulnérables',
  'vulnerabilite': 'vulnérabilité',
  'exposee': 'exposée',
  'Exposee': 'Exposée',
  'exposees': 'exposées',
  'sure': 'sûre',
  'Sure': 'Sûre',
  'sures': 'sûres',
  'surete': 'sûreté',
  'adapte': 'adapté',
  'Adapte': 'Adapté',
  'adaptee': 'adaptée',
  'adaptees': 'adaptées',
  'delicatesse': 'délicatesse',
  'Delicatesse': 'Délicatesse',
  'delicat': 'délicat',
  'Delicat': 'Délicat',
  'delicate': 'délicate',
  'delicats': 'délicats',
  'delicates': 'délicates',
  'proprietaire': 'propriétaire',
  'Proprietaire': 'Propriétaire',
  'proprietaires': 'propriétaires',

  // === AJOUTS SUITE À L'ANALYSE ===
  'Humidite': 'Humidité',
  'humidite': 'humidité',
  'validee': 'validée',
  'Validee': 'Validée',
  'creuse': 'creusé', // contexte: "le cuir se creuse"
};

// Patterns contextuels (regex)
const CONTEXTUAL_PATTERNS = [
  // "a domicile" -> "à domicile"
  { pattern: /\ba domicile\b/gi, replacement: 'à domicile' },
  { pattern: /\bA Domicile\b/g, replacement: 'À Domicile' },
  { pattern: /\bA domicile\b/g, replacement: 'À domicile' },

  // "a proximite" -> "à proximité"
  { pattern: /\ba proximite\b/gi, replacement: 'à proximité' },
  { pattern: /\bA Proximite\b/g, replacement: 'À Proximité' },

  // "grace a" -> "grâce à"
  { pattern: /\bgrace a\b/gi, replacement: 'grâce à' },
  { pattern: /\bGrace a\b/g, replacement: 'Grâce à' },

  // "jusqu'a" -> "jusqu'à"
  { pattern: /\bjusqu'a\b/gi, replacement: "jusqu'à" },
  { pattern: /\bJusqu'a\b/g, replacement: "Jusqu'à" },

  // "quant a" -> "quant à"
  { pattern: /\bquant a\b/gi, replacement: 'quant à' },

  // "face a" -> "face à"
  { pattern: /\bface a\b/gi, replacement: 'face à' },
  { pattern: /\bFace a\b/g, replacement: 'Face à' },

  // "a une session" -> "à une session" (et similaires)
  { pattern: /\ba une\b/gi, replacement: 'à une' },
  { pattern: /\bA une\b/g, replacement: 'À une' },

  // "a un" suivi de nom -> "à un" (contexte)
  { pattern: /\ba un nettoyage\b/gi, replacement: 'à un nettoyage' },
  { pattern: /\ba un entretien\b/gi, replacement: 'à un entretien' },
  { pattern: /\ba un traitement\b/gi, replacement: 'à un traitement' },
  { pattern: /\ba un professionnel\b/gi, replacement: 'à un professionnel' },

  // "a la" -> "à la" (dans certains contextes)
  { pattern: /\ba la vapeur\b/gi, replacement: 'à la vapeur' },
  { pattern: /\bA la vapeur\b/g, replacement: 'À la vapeur' },
  { pattern: /\ba la main\b/gi, replacement: 'à la main' },
  { pattern: /\bA la main\b/g, replacement: 'À la main' },
  { pattern: /\ba la surface\b/gi, replacement: 'à la surface' },

  // "ou" -> "où" dans contextes de lieu
  { pattern: /\bla ou\b/gi, replacement: 'là où' },
  { pattern: /\bLa ou\b/g, replacement: 'Là où' },
  { pattern: /\bendroit ou\b/gi, replacement: 'endroit où' },
  { pattern: /\bzone ou\b/gi, replacement: 'zone où' },
  { pattern: /\bmoment ou\b/gi, replacement: 'moment où' },
  { pattern: /\bcas ou\b/gi, replacement: 'cas où' },
];

// Fonction pour appliquer les corrections
function fixAccents(content) {
  let fixed = content;
  let changes = [];

  // 1. Appliquer les corrections directes (mot à mot)
  for (const [incorrect, correct] of Object.entries(CORRECTIONS)) {
    // Regex avec word boundaries pour éviter les faux positifs
    const regex = new RegExp(`\\b${escapeRegex(incorrect)}\\b`, 'g');
    const matches = fixed.match(regex);
    if (matches) {
      changes.push({
        from: incorrect,
        to: correct,
        count: matches.length
      });
      fixed = fixed.replace(regex, correct);
    }
  }

  // 2. Appliquer les patterns contextuels
  for (const { pattern, replacement } of CONTEXTUAL_PATTERNS) {
    const matches = fixed.match(pattern);
    if (matches) {
      changes.push({
        from: pattern.toString(),
        to: replacement,
        count: matches.length
      });
      fixed = fixed.replace(pattern, replacement);
    }
  }

  return { fixed, changes };
}

// Escape special regex characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Fonction pour vérifier un fichier (mode check)
function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { changes } = fixAccents(content);

  if (changes.length > 0) {
    console.log(`\n📄 ${filePath}`);
    console.log('   Problèmes trouvés:');
    for (const change of changes) {
      console.log(`   • "${change.from}" → "${change.to}" (${change.count}x)`);
    }
    return { file: filePath, issues: changes.length, changes };
  }
  return { file: filePath, issues: 0, changes: [] };
}

// Fonction pour corriger un fichier (mode fix)
function fixFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { fixed, changes } = fixAccents(content);

  if (changes.length > 0) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    console.log(`\n✅ ${filePath}`);
    console.log('   Corrections appliquées:');
    for (const change of changes) {
      console.log(`   • "${change.from}" → "${change.to}" (${change.count}x)`);
    }
    return { file: filePath, fixed: changes.length, changes };
  }
  console.log(`\n✓ ${filePath} - Aucune correction nécessaire`);
  return { file: filePath, fixed: 0, changes: [] };
}

// Main
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║  SCRIPT DE CORRECTION DES ACCENTS FRANÇAIS                   ║
╚══════════════════════════════════════════════════════════════╝

Usage:
  node scripts/fix-french-accents.js [--check|--fix] [fichiers...]

Options:
  --check    Mode vérification (affiche les problèmes sans corriger)
  --fix      Mode correction (modifie les fichiers)
  --help     Affiche cette aide

Exemples:
  # Vérifier un fichier
  node scripts/fix-french-accents.js --check src/lib/data/articles.ts

  # Corriger un fichier
  node scripts/fix-french-accents.js --fix src/lib/data/articles.ts

  # Vérifier tous les fichiers de données
  node scripts/fix-french-accents.js --check src/lib/data/*.ts

  # Corriger tous les fichiers TypeScript dans src/
  find src -name "*.ts" -o -name "*.tsx" | xargs node scripts/fix-french-accents.js --fix
`);
    process.exit(0);
  }

  const mode = args.includes('--fix') ? 'fix' : 'check';
  const files = args.filter(arg => !arg.startsWith('--'));

  if (files.length === 0) {
    console.error('❌ Aucun fichier spécifié');
    process.exit(1);
  }

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  MODE: ${mode.toUpperCase()}`);
  console.log(`  Fichiers: ${files.length}`);
  console.log(`${'═'.repeat(60)}`);

  let totalIssues = 0;
  let totalFixed = 0;
  const results = [];

  for (const file of files) {
    if (!fs.existsSync(file)) {
      console.error(`\n❌ Fichier non trouvé: ${file}`);
      continue;
    }

    if (mode === 'check') {
      const result = checkFile(file);
      totalIssues += result.issues;
      results.push(result);
    } else {
      const result = fixFile(file);
      totalFixed += result.fixed;
      results.push(result);
    }
  }

  // Résumé
  console.log(`\n${'═'.repeat(60)}`);
  if (mode === 'check') {
    console.log(`  RÉSUMÉ: ${totalIssues} problème(s) trouvé(s)`);
    if (totalIssues > 0) {
      console.log(`  → Exécutez avec --fix pour corriger`);
    }
  } else {
    console.log(`  RÉSUMÉ: ${totalFixed} correction(s) appliquée(s)`);
  }
  console.log(`${'═'.repeat(60)}\n`);

  // Exit code non-zero si problèmes trouvés en mode check
  if (mode === 'check' && totalIssues > 0) {
    process.exit(1);
  }
}

main();
