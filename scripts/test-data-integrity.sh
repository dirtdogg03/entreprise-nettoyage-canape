#!/bin/bash
# =============================================================================
# GATE 3.1: DATA INTEGRITY
# =============================================================================
# Valide l'integrite de TOUTES les donnees avant build final
# - Services: slugs ASCII-safe
# - Locations: nearbyLocations valides
# - Articles: relatedArticles, relatedServices, liens markdown valides
#
# Usage: ./scripts/test-data-integrity.sh
# Exit: 0 si OK, 1 si erreurs
# =============================================================================

set -e

echo "═══════════════════════════════════════════════════════════════"
echo "🔍 GATE 3.1: DATA INTEGRITY"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Validation complete via Node.js
node -e "
const fs = require('fs');
let errors = [];
let warnings = [];

const accentPattern = /[àâäéèêëïîôùûüçœæÀÂÄÉÈÊËÏÎÔÙÛÜÇŒÆ]/;

// ══════════════════════════════════════════════════════════════════
// 1. SERVICES
// ══════════════════════════════════════════════════════════════════
let serviceSlugs = new Set();

if (fs.existsSync('src/lib/data/services.ts')) {
  const servicesContent = fs.readFileSync('src/lib/data/services.ts', 'utf-8');
  serviceSlugs = new Set([...servicesContent.matchAll(/slug:\s*['\"]([^'\"]+)['\"]/g)].map(m => m[1]));

  serviceSlugs.forEach(slug => {
    if (accentPattern.test(slug)) {
      errors.push('[SERVICES] Accent dans slug: ' + slug);
    }
  });

  // Check for duplicates
  const allServiceSlugs = [...servicesContent.matchAll(/slug:\s*['\"]([^'\"]+)['\"]/g)].map(m => m[1]);
  const duplicates = allServiceSlugs.filter((item, index) => allServiceSlugs.indexOf(item) !== index);
  duplicates.forEach(dup => {
    errors.push('[SERVICES] Slug duplique: ' + dup);
  });

  console.log('🛠️  SERVICES');
  console.log('   Total: ' + serviceSlugs.size);
  console.log('   Accents: ' + (errors.filter(e => e.includes('[SERVICES] Accent')).length === 0 ? '✅ 0' : '❌'));
  console.log('   Duplicats: ' + (duplicates.length === 0 ? '✅ 0' : '❌ ' + duplicates.length));
  console.log('');
} else {
  console.log('🛠️  SERVICES: Fichier non trouve (skip)');
  console.log('');
}

// ══════════════════════════════════════════════════════════════════
// 2. LOCATIONS
// ══════════════════════════════════════════════════════════════════
let locationSlugs = new Set();

if (fs.existsSync('src/lib/data/locations.ts')) {
  const locationsContent = fs.readFileSync('src/lib/data/locations.ts', 'utf-8');
  locationSlugs = new Set([...locationsContent.matchAll(/slug:\s*['\"]([^'\"]+)['\"]/g)].map(m => m[1]));

  let invalidNearby = [];

  // Check nearbyLocations
  const nearbyMatches = [...locationsContent.matchAll(/nearbyLocations:\s*\[([\s\S]*?)\]/g)];
  for (const match of nearbyMatches) {
    const refs = match[1].match(/['\"]([^'\"]+)['\"]/g);
    if (refs) {
      refs.forEach(ref => {
        const slug = ref.replace(/['\",]/g, '').trim();
        if (slug && !locationSlugs.has(slug)) {
          invalidNearby.push(slug);
          errors.push('[LOCATIONS] nearbyLocation invalide: ' + slug);
        }
      });
    }
  }

  // Check for accents in location slugs
  locationSlugs.forEach(slug => {
    if (accentPattern.test(slug)) {
      errors.push('[LOCATIONS] Accent dans slug: ' + slug);
    }
  });

  console.log('📍 LOCATIONS');
  console.log('   Total: ' + locationSlugs.size);
  console.log('   nearbyLocations invalides: ' + (invalidNearby.length === 0 ? '✅ 0' : '❌ ' + [...new Set(invalidNearby)].length));
  console.log('');
} else {
  console.log('📍 LOCATIONS: Fichier non trouve (skip)');
  console.log('');
}

// ══════════════════════════════════════════════════════════════════
// 3. ARTICLES
// ══════════════════════════════════════════════════════════════════
if (fs.existsSync('src/lib/data/articles.ts')) {
  const articlesContent = fs.readFileSync('src/lib/data/articles.ts', 'utf-8');
  const articleSlugs = new Set([...articlesContent.matchAll(/slug:\s*['\"]([^'\"]+)['\"]/g)].map(m => m[1]));

  let slugAccents = 0;
  let invalidRelatedArticles = [];
  let invalidRelatedServices = [];
  let invalidMdLinks = [];

  // Check accents in slugs
  articleSlugs.forEach(slug => {
    if (accentPattern.test(slug)) {
      slugAccents++;
      errors.push('[ARTICLES] Accent dans slug: ' + slug);
    }
  });

  // Check relatedArticles
  const relatedMatches = [...articlesContent.matchAll(/relatedArticles:\s*\[([\s\S]*?)\]/g)];
  for (const match of relatedMatches) {
    const refs = match[1].match(/['\"]([^'\"]+)['\"]/g);
    if (refs) {
      refs.forEach(ref => {
        const slug = ref.replace(/['\",]/g, '').trim();
        if (slug && !articleSlugs.has(slug)) {
          invalidRelatedArticles.push(slug);
          errors.push('[ARTICLES] relatedArticle invalide: ' + slug);
        }
      });
    }
  }

  // Check relatedServices
  const relatedServicesMatches = [...articlesContent.matchAll(/relatedServices:\s*\[([\s\S]*?)\]/g)];
  for (const match of relatedServicesMatches) {
    const refs = match[1].match(/['\"]([^'\"]+)['\"]/g);
    if (refs) {
      refs.forEach(ref => {
        const slug = ref.replace(/['\",]/g, '').trim();
        if (slug && !serviceSlugs.has(slug)) {
          invalidRelatedServices.push(slug);
          errors.push('[ARTICLES] relatedService invalide: ' + slug);
        }
      });
    }
  }

  // Check markdown links to /blog/
  const mdLinks = [...articlesContent.matchAll(/\]\(\/blog\/[^)]*\/([^)\s]+)\)/g)];
  mdLinks.forEach(match => {
    const slug = match[1];
    if (slug && !articleSlugs.has(slug)) {
      invalidMdLinks.push(slug);
      errors.push('[ARTICLES] Lien markdown invalide vers: ' + slug);
    }
  });

  // Check markdown links to /services/
  const serviceLinks = [...articlesContent.matchAll(/\]\(\/services\/([^)\s\/]+)\)/g)];
  serviceLinks.forEach(match => {
    const slug = match[1];
    if (slug && !serviceSlugs.has(slug)) {
      errors.push('[ARTICLES] Lien markdown vers service invalide: ' + slug);
    }
  });

  console.log('📝 ARTICLES');
  console.log('   Total: ' + articleSlugs.size);
  console.log('   Slugs avec accents: ' + (slugAccents === 0 ? '✅ 0' : '❌ ' + slugAccents));
  console.log('   relatedArticles invalides: ' + (invalidRelatedArticles.length === 0 ? '✅ 0' : '❌ ' + [...new Set(invalidRelatedArticles)].length));
  console.log('   relatedServices invalides: ' + (invalidRelatedServices.length === 0 ? '✅ 0' : '❌ ' + [...new Set(invalidRelatedServices)].length));
  console.log('   Liens markdown invalides: ' + (invalidMdLinks.length === 0 ? '✅ 0' : '❌ ' + [...new Set(invalidMdLinks)].length));
  console.log('');
} else {
  console.log('📝 ARTICLES: Fichier non trouve (skip)');
  console.log('');
}

// ══════════════════════════════════════════════════════════════════
// RESULTAT FINAL
// ══════════════════════════════════════════════════════════════════
console.log('═══════════════════════════════════════════════════════════════');

if (errors.length === 0) {
  console.log('✅ GATE 3.1: PASS - Toutes les donnees sont valides');
  console.log('═══════════════════════════════════════════════════════════════');
  process.exit(0);
} else {
  console.log('❌ GATE 3.1: FAIL - ' + errors.length + ' erreur(s) trouvee(s)');
  console.log('');
  console.log('Erreurs a corriger:');
  [...new Set(errors)].forEach(e => console.log('   • ' + e));
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('⛔ NE PAS CONTINUER - Corriger les erreurs puis re-executer');
  console.log('═══════════════════════════════════════════════════════════════');
  process.exit(1);
}
"
