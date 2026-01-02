#!/bin/bash
# ============================================================================
# test-final-build.sh
# Gate 4.1: Build complet final avec verifications exhaustives
# ============================================================================

set -e

# Couleurs pour output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "=============================================="
echo "  GATE 4.1: BUILD FINAL COMPLET"
echo "=============================================="
echo ""

ERRORS=0
WARNINGS=0

# 1. Nettoyage cache
echo "1. Nettoyage cache..."
rm -rf .next 2>/dev/null || true
echo -e "   ${GREEN}OK${NC}: Cache nettoye"
echo ""

# 2. Verification TypeScript stricte
echo "2. Verification TypeScript stricte..."
TSC_OUTPUT=$(npx tsc --noEmit 2>&1) || true
TSC_ERRORS=$(echo "$TSC_OUTPUT" | grep -c "error TS" || echo 0)

if [ "$TSC_ERRORS" -gt 0 ]; then
  echo -e "   ${RED}ERREUR: $TSC_ERRORS erreurs TypeScript${NC}"
  echo "$TSC_OUTPUT" | grep "error TS" | head -10 | sed 's/^/   /'
  ERRORS=$((ERRORS + 1))
else
  echo -e "   ${GREEN}OK${NC}: Types valides"
fi
echo ""

# 3. Lint
echo "3. Verification ESLint..."
LINT_OUTPUT=$(npm run lint 2>&1) || true
LINT_STATUS=$?

if [ $LINT_STATUS -eq 0 ]; then
  echo -e "   ${GREEN}OK${NC}: ESLint passe"
else
  LINT_ERRORS=$(echo "$LINT_OUTPUT" | grep -c "error" || echo 0)
  if [ "$LINT_ERRORS" -gt 0 ]; then
    echo -e "   ${RED}ERREUR: $LINT_ERRORS erreurs ESLint${NC}"
    echo "$LINT_OUTPUT" | grep "error" | head -5 | sed 's/^/   /'
    ERRORS=$((ERRORS + 1))
  else
    echo -e "   ${YELLOW}WARNING: ESLint avec avertissements${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
fi
echo ""

# 4. Build production
echo "4. Build production..."
BUILD_START=$(date +%s)
BUILD_OUTPUT=$(npm run build 2>&1)
BUILD_STATUS=$?
BUILD_END=$(date +%s)
BUILD_TIME=$((BUILD_END - BUILD_START))

if [ $BUILD_STATUS -eq 0 ]; then
  echo -e "   ${GREEN}OK${NC}: Build reussi en ${BUILD_TIME}s"
else
  echo -e "   ${RED}ERREUR: Build echoue${NC}"
  echo "$BUILD_OUTPUT" | grep -E "(Error|error|ERR)" | tail -10 | sed 's/^/   /'
  ERRORS=$((ERRORS + 1))
fi
echo ""

# 5. Verification pages generees
echo "5. Verification pages generees..."
if [ -d ".next/server/app" ]; then
  # Compter les pages
  TOTAL_PAGES=$(find ".next/server/app" -name "*.html" 2>/dev/null | wc -l)
  SERVICE_PAGES=$(find ".next/server/app/services" -name "*.html" 2>/dev/null | wc -l || echo 0)
  BLOG_PAGES=$(find ".next/server/app/blog" -name "*.html" 2>/dev/null | wc -l || echo 0)

  echo "   Pages totales: $TOTAL_PAGES"
  echo "   Pages services: $SERVICE_PAGES"
  echo "   Pages blog: $BLOG_PAGES"

  # Verifier minimum attendu
  if [ "$TOTAL_PAGES" -lt 5 ]; then
    echo -e "   ${RED}ERREUR: Moins de 5 pages generees${NC}"
    ERRORS=$((ERRORS + 1))
  else
    echo -e "   ${GREEN}OK${NC}: Nombre de pages suffisant"
  fi
else
  echo -e "   ${RED}ERREUR: Dossier .next/server/app manquant${NC}"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# 6. Verification sitemap
echo "6. Verification sitemap..."
if [ -f "public/sitemap.xml" ]; then
  URL_COUNT=$(grep -c "<url>" "public/sitemap.xml" || echo 0)
  echo "   URLs dans sitemap: $URL_COUNT"
  echo -e "   ${GREEN}OK${NC}: Sitemap present"
elif [ -f ".next/server/app/sitemap.xml" ] || [ -f "src/app/sitemap.ts" ]; then
  echo -e "   ${GREEN}OK${NC}: Sitemap dynamique configure"
else
  echo -e "   ${YELLOW}WARNING: Pas de sitemap detecte${NC}"
  WARNINGS=$((WARNINGS + 1))
fi
echo ""

# 7. Verification robots.txt
echo "7. Verification robots.txt..."
if [ -f "public/robots.txt" ]; then
  echo -e "   ${GREEN}OK${NC}: robots.txt present"
  # Verifier contenu minimal
  if grep -q "Sitemap:" "public/robots.txt"; then
    echo -e "   ${GREEN}OK${NC}: Sitemap reference dans robots.txt"
  else
    echo -e "   ${YELLOW}WARNING: Sitemap non reference dans robots.txt${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
elif [ -f "src/app/robots.ts" ]; then
  echo -e "   ${GREEN}OK${NC}: robots.txt dynamique configure"
else
  echo -e "   ${YELLOW}WARNING: Pas de robots.txt detecte${NC}"
  WARNINGS=$((WARNINGS + 1))
fi
echo ""

# 8. Verification taille bundle
echo "8. Analyse taille bundle..."
if [ -f ".next/build-manifest.json" ]; then
  # Estimer taille totale JS
  JS_SIZE=$(find ".next/static" -name "*.js" -exec du -ch {} + 2>/dev/null | tail -1 | cut -f1)
  echo "   Taille JS totale: $JS_SIZE"

  # Verifier pas de fichiers > 500KB
  BIG_FILES=$(find ".next/static" -name "*.js" -size +500k 2>/dev/null | wc -l)
  if [ "$BIG_FILES" -gt 0 ]; then
    echo -e "   ${YELLOW}WARNING: $BIG_FILES fichiers JS > 500KB${NC}"
    WARNINGS=$((WARNINGS + 1))
  else
    echo -e "   ${GREEN}OK${NC}: Pas de gros fichiers JS"
  fi
fi
echo ""

# 9. Resume
echo "=============================================="
echo "  RESULTAT GATE 4.1"
echo "=============================================="
echo "  Build time: ${BUILD_TIME}s"
echo "  Pages:      $TOTAL_PAGES"
echo "  Erreurs:    $ERRORS"
echo "  Warnings:   $WARNINGS"
echo ""

if [ $ERRORS -gt 0 ]; then
  echo -e "  ${RED}GATE 4.1: FAIL${NC}"
  echo "  $ERRORS erreur(s) critique(s)"
  echo ""
  echo "  ═══════════════════════════════════════════"
  echo -e "  ${RED}NE PAS DEPLOYER${NC}"
  echo "  ═══════════════════════════════════════════"
  echo ""
  echo "  ACTIONS REQUISES:"
  echo "    1. Corriger les erreurs ci-dessus"
  echo "    2. Re-executer ./scripts/test-final-build.sh"
  echo "    3. Gate 4.2 (Lighthouse) seulement apres PASS"
  echo ""
  echo "=============================================="
  exit 1
else
  if [ $WARNINGS -gt 0 ]; then
    echo -e "  ${YELLOW}GATE 4.1: PASS avec warnings${NC}"
    echo "  $WARNINGS warning(s) a considerer"
  else
    echo -e "  ${GREEN}GATE 4.1: PASS${NC}"
  fi
  echo "  → Build production OK"
  echo "  → Continuer vers Gate 4.2 (Lighthouse)"
  echo "=============================================="
  exit 0
fi
