# Stack Technique - Entreprise Nettoyage Canapé

## Choix Technologiques

### Frontend

- **Framework**: Next.js 16 (App Router)
  - **Justification**: SSG/SSR optimal pour SEO, Server Components pour performance, App Router moderne
  - **Alternatives considérées**: Astro (moins flexible pour interactivité), Gatsby (écosystème vieillissant)

- **UI Library**: React 19
  - **Justification**: Dernière version stable, React Compiler activé, concurrent features

- **Langage**: TypeScript 5
  - **Justification**: Type safety, meilleure DX, détection erreurs au build

### Styling

- **Framework CSS**: Tailwind CSS 3.4
  - **Justification**: Utility-first, purge automatique, design system cohérent
  - **Alternatives considérées**: CSS Modules (plus verbeux), Styled Components (runtime CSS)

- **Component Library**: Radix UI Primitives
  - **Justification**: Accessibilité native, unstyled (personnalisable), headless
  - **Alternatives considérées**: shadcn/ui (basé sur Radix, prêt à l'emploi)

- **Animations**: Framer Motion
  - **Justification**: API déclarative, performance optimisée, gestures support
  - **Alternatives considérées**: CSS animations (moins puissant), GSAP (plus lourd)

### Content Management

- **Format**: Markdown avec frontmatter
  - **Justification**: Simple, versionné avec Git, pas de CMS externe nécessaire
  - **Alternatives considérées**: Sanity CMS (overhead pour site vitrine), Contentful (coût)

- **Processing**: react-markdown + remark-gfm + rehype-raw
  - **Justification**: Rendu côté serveur, GFM support, HTML dans Markdown

### Infrastructure

- **Hosting**: À définir
  - **Options recommandées**:
    1. **Vercel** (recommandé) - Optimisé Next.js, CDN global, preview deploys
    2. **Export statique** - Hébergement classique (OVH, Netlify, GitHub Pages)
    3. **Docker** - Contrôle total, auto-hébergement

- **Analytics**: À configurer
  - **Recommandation**: Plausible ou Umami (privacy-friendly, RGPD compliant)

- **Formulaire contact**: À implémenter
  - **Options**: Formspree, Netlify Forms, API Route custom

## Contraintes Techniques

1. **Performance**: Lighthouse > 90 sur toutes les métriques
2. **Accessibilité**: WCAG 2.1 AA minimum
3. **SEO**: Toutes pages indexables, schema.org obligatoire
4. **Mobile**: Mobile-first, responsive design
5. **Bundle size**: < 100kb JS initial (gzipped)

## Décisions d'Architecture (ADRs)

### ADR-001: App Router vs Pages Router

- **Date**: 2024-12-26
- **Status**: Accepté
- **Contexte**: Next.js offre deux systèmes de routing
- **Décision**: Utiliser App Router pour bénéficier des Server Components et du streaming
- **Conséquences**:
  - (+) Meilleures performances, moins de JS client
  - (+) Layouts imbriqués natifs
  - (-) Certaines librairies pas encore compatibles

### ADR-002: Markdown local vs CMS Headless

- **Date**: 2024-12-26
- **Status**: Accepté
- **Contexte**: Besoin de gérer le contenu (services, villes, blog)
- **Décision**: Fichiers Markdown dans le repo
- **Conséquences**:
  - (+) Pas de dépendance externe, versioning Git
  - (+) Gratuit, pas de limite API
  - (-) Modifications nécessitent un déploiement
  - (-) Pas d'interface pour non-développeurs

### ADR-003: Radix UI vs Component Library Complète

- **Date**: 2024-12-26
- **Status**: Accepté
- **Contexte**: Besoin de composants UI accessibles
- **Décision**: Radix UI Primitives avec styling Tailwind custom
- **Conséquences**:
  - (+) Accessibilité native, personnalisation totale
  - (+) Bundle size minimal (tree-shaking)
  - (-) Plus de travail initial de styling

### ADR-004: Structure SEO Multi-Villes

- **Date**: 2024-12-26
- **Status**: En discussion
- **Contexte**: Référencement local multi-villes Ile-de-France
- **Décision proposée**:
  - `/services/[service-slug]` - Pages services générales
  - `/services/[service-slug]/[city-slug]` - Pages service × ville
  - Contenu unique généré pour chaque combinaison
- **Conséquences**:
  - (+) Excellent pour SEO local
  - (-) Risque de contenu dupliqué si mal géré
  - **Mitigation**: Variations de contenu par ville, données locales spécifiques

## Évolutions Futures

- [ ] Intégration Google Business Profile API
- [ ] Système de réservation en ligne
- [ ] Blog avec catégories et tags
- [ ] Témoignages clients avec schema Review
- [ ] Multi-langue (FR/EN) si expansion
