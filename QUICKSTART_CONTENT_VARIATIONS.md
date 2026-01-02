# QuickStart - Content Variations

Guide de démarrage rapide pour utiliser le système de variations de contenu.

---

## Installation

Les fichiers sont déjà créés dans votre projet :

```
src/lib/data/content/variations/
├── city-service-content.ts      ← Contenu + logique
├── content-generator.ts         ← Générateur automatique
└── index.ts                     ← Barrel export
```

Aucune dépendance externe nécessaire !

---

## Utilisation en 3 Étapes

### 1. Import

```typescript
import { getCityServiceContent } from '@/lib/data/content/variations';
```

### 2. Récupération

```typescript
const content = getCityServiceContent('romainville', 'nettoyage-canape-tissu');
```

### 3. Affichage

```typescript
if (content) {
  return (
    <div>
      <p>{content.localIntro}</p>
      <p>{content.challenges}</p>
      <blockquote>"{content.testimonial.quote}"</blockquote>
      <p>{content.localTips}</p>
      <p>{content.stats}</p>
    </div>
  );
}
```

**C'est tout !** 🎉

---

## Exemple Complet : Page Service+Ville

```typescript
// app/services/[serviceSlug]/[citySlug]/page.tsx

import { getCityServiceContent } from '@/lib/data/content/variations';
import { getServiceBySlug } from '@/lib/data/services';
import { getLocationBySlug } from '@/lib/data/locations';

interface PageProps {
  params: {
    serviceSlug: string;
    citySlug: string;
  };
}

export default function ServiceCityPage({ params }: PageProps) {
  const { serviceSlug, citySlug } = params;

  const service = getServiceBySlug(serviceSlug);
  const location = getLocationBySlug(citySlug);
  const content = getCityServiceContent(citySlug, serviceSlug);

  if (!service || !location || !content) {
    return <div>Page non trouvée</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Titre */}
      <h1 className="text-4xl font-bold mb-6">
        {service.name} à {location.name}
      </h1>

      {/* Section 1: Introduction Locale */}
      <section className="mb-8 prose max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed">
          {content.localIntro}
        </p>
      </section>

      {/* Section 2: Défis & Solutions */}
      <section className="mb-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Nos Solutions à {location.name}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {content.challenges}
        </p>
      </section>

      {/* Section 3: Témoignage Client */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Témoignage Client
        </h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
          <p className="italic text-gray-700 mb-3">
            "{content.testimonial.quote}"
          </p>
          <p className="font-semibold">
            — {content.testimonial.name}
          </p>
          <p className="text-sm text-gray-600">
            {content.testimonial.neighborhood}, {location.name}
          </p>
        </div>
      </section>

      {/* Section 4: Conseils Locaux */}
      <section className="mb-8 bg-green-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Nos Conseils pour {location.name}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {content.localTips}
        </p>
      </section>

      {/* Section 5: Statistiques */}
      <section className="mb-8 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Nos Interventions à {location.name}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {content.stats}
        </p>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">
          Demander un Devis Gratuit
        </h2>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold">
          Contactez-nous
        </button>
      </section>
    </div>
  );
}

// Métadonnées SEO
export function generateMetadata({ params }: PageProps) {
  const { serviceSlug, citySlug } = params;
  const service = getServiceBySlug(serviceSlug);
  const location = getLocationBySlug(citySlug);
  const content = getCityServiceContent(citySlug, serviceSlug);

  if (!service || !location || !content) {
    return {};
  }

  return {
    title: `${service.name} ${location.name} | Devis Gratuit 24h`,
    description: content.localIntro.slice(0, 157) + '...',
  };
}
```

---

## Vérifier qu'une Ville a du Contenu

```typescript
import { hasCityServiceContent } from '@/lib/data/content/variations';

if (hasCityServiceContent('romainville', 'nettoyage-canape-tissu')) {
  // Afficher la page
} else {
  // Rediriger ou afficher 404
}
```

---

## Liste des Villes Disponibles

```typescript
import { getAvailableCities } from '@/lib/data/content/variations';

const cities = getAvailableCities();
// ['romainville', 'pantin', 'bobigny', 'montreuil', ...]
```

---

## Vérifier la Qualité

```bash
# Lancer le script de vérification
ts-node scripts/check-content-quality.ts
```

Affiche :
- Nombre de variations valides
- Longueurs moyennes
- Résumé par ville
- Problèmes détectés

---

## Structure des Données

```typescript
interface CityServiceVariation {
  localIntro: string;           // ~100 mots
  challenges: string;           // ~100 mots
  testimonial: {
    name: string;               // Ex: "Sophie M."
    neighborhood: string;       // Ex: "Quartier Carnot"
    quote: string;              // ~80 mots
  };
  localTips: string;            // ~100 mots
  stats: string;                // ~50 mots
}
```

---

## Villes Disponibles (18)

### Seine-Saint-Denis (11 villes)
- romainville ⭐ (siège)
- pantin ⭐
- bobigny ⭐
- montreuil
- bagnolet
- noisy-le-sec
- bondy
- les-lilas
- le-pre-saint-gervais
- rosny-sous-bois
- villemomble

### Paris (4 arrondissements)
- paris-10
- paris-11
- paris-19
- paris-20

### Val-de-Marne (3 villes)
- vincennes
- fontenay-sous-bois
- nogent-sur-marne

⭐ = Contenu statique ultra-détaillé
Autres = Contenu généré automatiquement

---

## Services Disponibles (10)

1. nettoyage-canape-tissu
2. nettoyage-canape-cuir
3. nettoyage-canape-microfibre
4. nettoyage-canape-velours
5. detachage-canape
6. desinfection-canape
7. nettoyage-fauteuil
8. nettoyage-chaise
9. nettoyage-matelas
10. nettoyage-tapis-moquette

**Total : 180 combinaisons** (18 villes × 10 services)

---

## Composant Réutilisable

```typescript
// components/LocalContentSection.tsx

import { getCityServiceContent } from '@/lib/data/content/variations';

interface Props {
  citySlug: string;
  serviceSlug: string;
  section: 'intro' | 'challenges' | 'testimonial' | 'tips' | 'stats';
}

export function LocalContentSection({ citySlug, serviceSlug, section }: Props) {
  const content = getCityServiceContent(citySlug, serviceSlug);

  if (!content) return null;

  switch (section) {
    case 'intro':
      return <p className="text-lg">{content.localIntro}</p>;

    case 'challenges':
      return <p>{content.challenges}</p>;

    case 'testimonial':
      return (
        <blockquote className="border-l-4 border-blue-500 pl-4 italic">
          <p>"{content.testimonial.quote}"</p>
          <footer className="mt-2 font-semibold">
            — {content.testimonial.name}, {content.testimonial.neighborhood}
          </footer>
        </blockquote>
      );

    case 'tips':
      return <p>{content.localTips}</p>;

    case 'stats':
      return <p className="font-semibold">{content.stats}</p>;

    default:
      return null;
  }
}

// Utilisation
<LocalContentSection
  citySlug="romainville"
  serviceSlug="nettoyage-canape-tissu"
  section="intro"
/>
```

---

## Ajouter une Nouvelle Ville

### Méthode 1 : Contenu Généré (Facile)

1. Ouvrir `src/lib/data/content/variations/content-generator.ts`

2. Ajouter dans `cityData` :

```typescript
const cityData = {
  // ... villes existantes

  "nouvelle-ville": {
    population: 50000,
    character: "mixte-urbain",
    landmarks: ["Monument principal", "Parc local"],
    specificities: ["Caractéristique 1", "Caractéristique 2"],
    proximities: ["Ville voisine 1", "Ville voisine 2"]
  }
}
```

3. Ajouter dans `city-service-content.ts` :

```typescript
const autoGeneratedCities = [
  // ... villes existantes
  "nouvelle-ville"
];
```

**C'est tout !** La ville aura automatiquement du contenu pour les 10 services.

### Méthode 2 : Contenu Statique (Qualité Max)

Ajouter directement dans `cityServiceContent` de `city-service-content.ts` :

```typescript
export const cityServiceContent: Record<string, Record<string, CityServiceVariation>> = {
  // ... villes existantes

  "nouvelle-ville": {
    "nettoyage-canape-tissu": {
      localIntro: "...",
      challenges: "...",
      testimonial: { name: "...", neighborhood: "...", quote: "..." },
      localTips: "...",
      stats: "..."
    },
    // ... autres services
  }
}
```

---

## FAQ

### Q: Puis-je modifier le contenu généré ?

Oui ! Copiez-le depuis le générateur vers le contenu statique et modifiez-le.

### Q: Comment savoir si une ville utilise le contenu statique ou généré ?

Les 3 premières villes (Romainville, Pantin, Bobigny) sont statiques. Les autres sont générées.

### Q: Le contenu généré est-il de bonne qualité pour le SEO ?

Oui ! Il respecte tous les critères : unicité, pertinence locale, longueur minimale.

### Q: Puis-je ajouter 50 villes facilement ?

Oui ! Utilisez le générateur automatique. Ajoutez simplement les données de ville dans `cityData`.

### Q: Comment tester la qualité du contenu ?

```bash
ts-node scripts/check-content-quality.ts
```

---

## Support

- **Documentation complète** : `src/lib/data/content/variations/README.md`
- **Exemples** : `src/lib/data/content/variations/USAGE_EXAMPLE.tsx`
- **Rapport détaillé** : `CONTENT_VARIATIONS_REPORT.md`

---

## Résumé Ultra-Rapide

```typescript
// 1. Import
import { getCityServiceContent } from '@/lib/data/content/variations';

// 2. Récupération
const content = getCityServiceContent('romainville', 'nettoyage-canape-tissu');

// 3. Utilisation
<div>
  <p>{content.localIntro}</p>
  <p>{content.challenges}</p>
  <blockquote>"{content.testimonial.quote}"</blockquote>
  <p>{content.localTips}</p>
  <p>{content.stats}</p>
</div>
```

**180 variations disponibles immédiatement !** ✅

---

Prêt à l'emploi ! 🚀
