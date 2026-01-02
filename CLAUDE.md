# Entreprise Nettoyage Canapé

Site vitrine SEO local pour une entreprise de nettoyage de canapés, tapis et matelas en Ile-de-France. Objectif : générer des leads via le référencement local.

## Stack Technique

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS 3.4, tailwindcss-animate
- **UI Components**: Radix UI (Accordion, Dialog, Dropdown, Navigation, Tabs)
- **Animations**: Framer Motion
- **Content**: Markdown avec react-markdown, rehype-raw, remark-gfm
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## Structure du Projet

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page d'accueil
│   ├── layout.tsx         # Layout principal
│   ├── services/          # Pages services
│   ├── blog/              # Pages blog
│   └── contact/           # Page contact
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Blocs de page (Hero, CTA, etc.)
│   ├── seo/               # Composants SEO
│   └── ui/                # Composants réutilisables
├── content/               # Contenu Markdown
│   ├── services/          # Fiches services
│   ├── cities/            # Pages villes (SEO local)
│   └── blog/              # Articles blog
├── lib/                   # Utilitaires et helpers
│   └── data/              # Fonctions de chargement données
└── types/                 # Types TypeScript
```

## Conventions de Code

### Style
- **Nommage fichiers**: PascalCase pour composants (.tsx), camelCase pour utils (.ts)
- **Nommage variables**: camelCase
- **Nommage types/interfaces**: PascalCase avec préfixe (ex: `IServiceData`, `TCity`)
- **Formatting**: ESLint + config Next.js
- **Imports**: Alias `@/` pour src/

### Commits
- **Format**: Conventional Commits
- **Langue**: Français ou Anglais accepté
- **Types**: feat, fix, docs, style, refactor, perf, test, chore
- **Exemples**:
  - `feat(seo): ajout schema.org LocalBusiness`
  - `fix(contact): correction validation formulaire`
  - `perf(images): optimisation WebP`

### SEO
- Chaque page DOIT avoir ses metadata exportées
- Schema.org obligatoire (LocalBusiness, Service, FAQPage)
- Images avec alt descriptif
- URLs propres sans trailing slash

## Commandes Utiles

```bash
# Installation
npm install

# Développement
npm run dev

# Build production
npm run build

# Serveur production
npm start

# Lint
npm run lint

# Export statique (si configuré)
next build && next export
```

## Règles Spécifiques

### A Faire
- Utiliser les Server Components par défaut
- Optimiser les images avec next/image
- Metadata dynamiques pour chaque page service/ville
- Structured data JSON-LD sur toutes les pages
- Mobile-first design
- Core Web Vitals > 90 sur Lighthouse

### A Eviter
- Client Components sans nécessité ("use client" uniquement si interactivité)
- Images non optimisées
- Contenu dupliqué entre pages villes
- Liens cassés internes
- CSS inline (utiliser Tailwind)
- Dépendances inutiles

## SEO Local - Points Clés

- **Zone géographique**: Ile-de-France
- **Services principaux**: Nettoyage canapé, tapis, matelas
- **Mots-clés cibles**: "nettoyage canapé [ville]", "nettoyage tapis [ville]"
- **Pages à créer**: 1 page par service × 1 page par ville principale

## Ressources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/docs/primitives)
- [Google Search Central](https://developers.google.com/search/docs)
