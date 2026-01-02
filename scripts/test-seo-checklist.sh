#!/bin/bash
# ============================================================================
# test-seo-checklist.sh
# Gate 4.3: SEO Checklist finale
# ============================================================================

set -e

# Couleurs pour output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "=============================================="
echo "  GATE 4.3: SEO CHECKLIST"
echo "=============================================="
echo ""

ERRORS=0
WARNINGS=0
CHECKS_PASSED=0
CHECKS_TOTAL=0

check_pass() {
  echo -e "   ${GREEN}✓${NC} $1"
  CHECKS_PASSED=$((CHECKS_PASSED + 1))
  CHECKS_TOTAL=$((CHECKS_TOTAL + 1))
}

check_warn() {
  echo -e "   ${YELLOW}⚠${NC} $1"
  WARNINGS=$((WARNINGS + 1))
  CHECKS_TOTAL=$((CHECKS_TOTAL + 1))
}

check_fail() {
  echo -e "   ${RED}✗${NC} $1"
  ERRORS=$((ERRORS + 1))
  CHECKS_TOTAL=$((CHECKS_TOTAL + 1))
}

# 1. META TAGS
echo "1. META TAGS"
echo "   ─────────────────────────────────"

# Verifier metadata exports dans les pages
META_PAGES=$(grep -rl "export.*metadata\|generateMetadata" src/app --include="*.tsx" 2>/dev/null | wc -l)
TOTAL_PAGES=$(find src/app -name "page.tsx" | wc -l)

if [ "$META_PAGES" -ge "$TOTAL_PAGES" ]; then
  check_pass "Metadata sur toutes les pages ($META_PAGES/$TOTAL_PAGES)"
elif [ "$META_PAGES" -ge $((TOTAL_PAGES * 80 / 100)) ]; then
  check_warn "Metadata sur $META_PAGES/$TOTAL_PAGES pages (>80%)"
else
  check_fail "Metadata manquantes ($META_PAGES/$TOTAL_PAGES pages)"
fi

# Verifier Open Graph
OG_COUNT=$(grep -r "openGraph" src/app --include="*.tsx" 2>/dev/null | wc -l)
if [ "$OG_COUNT" -gt 0 ]; then
  check_pass "Open Graph configure ($OG_COUNT occurrences)"
else
  check_warn "Open Graph non detecte"
fi

# Verifier Twitter Cards
TW_COUNT=$(grep -r "twitter" src/app --include="*.tsx" 2>/dev/null | wc -l)
if [ "$TW_COUNT" -gt 0 ]; then
  check_pass "Twitter Cards configure"
else
  check_warn "Twitter Cards non configure"
fi
echo ""

# 2. STRUCTURED DATA
echo "2. STRUCTURED DATA (Schema.org)"
echo "   ─────────────────────────────────"

# Verifier LocalBusiness
if grep -rq "LocalBusiness\|@type.*LocalBusiness" src/ 2>/dev/null; then
  check_pass "Schema LocalBusiness present"
else
  check_fail "Schema LocalBusiness manquant (critique pour SEO local)"
fi

# Verifier Service schema
if grep -rq "Service.*@type\|@type.*Service" src/ 2>/dev/null; then
  check_pass "Schema Service present"
else
  check_warn "Schema Service recommande"
fi

# Verifier FAQPage
if grep -rq "FAQPage\|@type.*FAQPage" src/ 2>/dev/null; then
  check_pass "Schema FAQPage present"
else
  check_warn "Schema FAQPage recommande pour articles"
fi

# Verifier Article schema
if grep -rq "Article.*@type\|@type.*Article\|BlogPosting" src/ 2>/dev/null; then
  check_pass "Schema Article/BlogPosting present"
else
  check_warn "Schema Article recommande pour blog"
fi

# Verifier BreadcrumbList
if grep -rq "BreadcrumbList\|@type.*BreadcrumbList" src/ 2>/dev/null; then
  check_pass "Schema BreadcrumbList present"
else
  check_warn "Schema BreadcrumbList recommande"
fi
echo ""

# 3. TECHNICAL SEO
echo "3. TECHNICAL SEO"
echo "   ─────────────────────────────────"

# Sitemap
if [ -f "public/sitemap.xml" ] || [ -f "src/app/sitemap.ts" ]; then
  check_pass "Sitemap configure"
else
  check_fail "Sitemap manquant"
fi

# Robots.txt
if [ -f "public/robots.txt" ] || [ -f "src/app/robots.ts" ]; then
  check_pass "robots.txt configure"
else
  check_fail "robots.txt manquant"
fi

# Canonical URLs
if grep -rq "canonical" src/app --include="*.tsx" 2>/dev/null; then
  check_pass "Canonical URLs configurees"
else
  check_warn "Canonical URLs recommandees"
fi

# Hreflang (si multilingue)
# Pour un site FR uniquement, on skip

# Mobile viewport
if grep -rq "viewport" src/app/layout.tsx 2>/dev/null; then
  check_pass "Viewport mobile configure"
else
  check_warn "Viewport mobile a verifier"
fi
echo ""

# 4. CONTENT SEO
echo "4. CONTENT SEO"
echo "   ─────────────────────────────────"

# Verifier H1 unique par page (dans les composants, pas dans le content markdown)
H1_COUNT=$(grep -r "<h1" src/components --include="*.tsx" 2>/dev/null | wc -l)
if [ "$H1_COUNT" -gt 0 ]; then
  check_pass "H1 dans composants ($H1_COUNT occurrences)"
else
  check_warn "Verifier H1 dans les pages"
fi

# Verifier alt sur images
IMG_NO_ALT=$(grep -r "<Image" src/ --include="*.tsx" 2>/dev/null | grep -v "alt=" | wc -l)
if [ "$IMG_NO_ALT" -eq 0 ]; then
  check_pass "Toutes les images ont alt"
else
  check_warn "$IMG_NO_ALT images sans alt detectees"
fi

# Verifier liens internes
INTERNAL_LINKS=$(grep -r "href=\"/" src/ --include="*.tsx" 2>/dev/null | wc -l)
if [ "$INTERNAL_LINKS" -gt 10 ]; then
  check_pass "Maillage interne ($INTERNAL_LINKS liens)"
else
  check_warn "Maillage interne faible ($INTERNAL_LINKS liens)"
fi
echo ""

# 5. PERFORMANCE SEO
echo "5. PERFORMANCE SEO"
echo "   ─────────────────────────────────"

# Verifier next/image usage
NEXT_IMG=$(grep -r "from 'next/image'\|from \"next/image\"" src/ --include="*.tsx" 2>/dev/null | wc -l)
if [ "$NEXT_IMG" -gt 0 ]; then
  check_pass "next/image utilise ($NEXT_IMG imports)"
else
  check_warn "next/image recommande pour optimisation"
fi

# Verifier lazy loading
LAZY=$(grep -r "loading=\"lazy\"\|priority" src/ --include="*.tsx" 2>/dev/null | wc -l)
if [ "$LAZY" -gt 0 ]; then
  check_pass "Lazy loading configure"
else
  check_warn "Lazy loading recommande"
fi

# Verifier preconnect/dns-prefetch
if grep -rq "preconnect\|dns-prefetch" src/app/layout.tsx 2>/dev/null; then
  check_pass "Preconnect configure"
else
  check_warn "Preconnect recommande pour ressources externes"
fi
echo ""

# 6. LOCAL SEO (specifique)
echo "6. LOCAL SEO"
echo "   ─────────────────────────────────"

# Verifier NAP (Name, Address, Phone)
if grep -rq "address\|adresse" src/ --include="*.tsx" 2>/dev/null; then
  check_pass "Adresse presente"
else
  check_warn "Adresse a verifier"
fi

if grep -rq "tel:\|telephone\|phone" src/ --include="*.tsx" 2>/dev/null; then
  check_pass "Telephone present"
else
  check_warn "Telephone a verifier"
fi

# Pages villes
CITY_PAGES=$(find src/app -path "*\[city\]*" -o -path "*\[ville\]*" 2>/dev/null | wc -l)
if [ "$CITY_PAGES" -gt 0 ]; then
  check_pass "Pages villes dynamiques ($CITY_PAGES)"
else
  # Verifier si villes dans locations.ts
  if [ -f "src/lib/data/locations.ts" ]; then
    LOC_COUNT=$(grep -c "slug:" src/lib/data/locations.ts 2>/dev/null || echo 0)
    if [ "$LOC_COUNT" -gt 5 ]; then
      check_pass "Locations configurees ($LOC_COUNT villes)"
    else
      check_warn "Peu de villes ($LOC_COUNT)"
    fi
  fi
fi
echo ""

# Resume
echo "=============================================="
echo "  RESULTAT GATE 4.3"
echo "=============================================="
echo "  Checks passes: $CHECKS_PASSED/$CHECKS_TOTAL"
echo "  Erreurs:       $ERRORS"
echo "  Warnings:      $WARNINGS"
echo ""

SCORE=$((CHECKS_PASSED * 100 / CHECKS_TOTAL))
echo "  Score SEO: ${SCORE}%"
echo ""

if [ $ERRORS -gt 0 ]; then
  echo -e "  ${RED}GATE 4.3: FAIL${NC}"
  echo "  $ERRORS erreur(s) critique(s) SEO"
  echo ""
  echo "  CORRECTIONS OBLIGATOIRES:"
  echo "    - Ajouter les elements manquants marques ✗"
  echo "    - Re-executer ./scripts/test-seo-checklist.sh"
  echo ""
  echo "=============================================="
  exit 1
elif [ $SCORE -lt 70 ]; then
  echo -e "  ${YELLOW}GATE 4.3: PASS avec ameliorations${NC}"
  echo "  Score SEO faible, optimisations recommandees"
  echo "=============================================="
  exit 0
else
  echo -e "  ${GREEN}GATE 4.3: PASS${NC}"
  echo "  → SEO checklist validee"
  echo "  → Site pret pour deploiement"
  echo "=============================================="
  exit 0
fi
