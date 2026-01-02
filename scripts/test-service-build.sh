#!/bin/bash
# ============================================================================
# test-service-build.sh
# Gate 2.2: Build intermediaire apres generation pages services
# ============================================================================

set -e

# Couleurs pour output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "=============================================="
echo "  GATE 2.2: BUILD INTERMEDIAIRE SERVICES"
echo "=============================================="
echo ""

ERRORS=0
WARNINGS=0

# 1. Verification TypeScript (type-check seulement, pas de build complet)
echo "1. Verification TypeScript..."
TSC_OUTPUT=$(npx tsc --noEmit 2>&1) || true
TSC_STATUS=$?

if [ $TSC_STATUS -eq 0 ]; then
  echo -e "   ${GREEN}OK${NC}: Types valides"
else
  # Compter les erreurs
  ERROR_COUNT=$(echo "$TSC_OUTPUT" | grep -c "error TS" || echo 0)
  if [ "$ERROR_COUNT" -gt 0 ]; then
    echo -e "   ${RED}ERREUR: $ERROR_COUNT erreurs TypeScript${NC}"
    echo "$TSC_OUTPUT" | grep "error TS" | head -5 | sed 's/^/   /'
    ERRORS=$((ERRORS + 1))
  else
    echo -e "   ${GREEN}OK${NC}: Types valides (avec warnings)"
  fi
fi
echo ""

# 2. Verification pages services existent
echo "2. Verification structure pages services..."
SERVICES_DIR="src/app/services"

if [ -d "$SERVICES_DIR" ]; then
  # Compter les pages service
  PAGE_COUNT=$(find "$SERVICES_DIR" -name "page.tsx" | wc -l)
  echo "   Pages services trouvees: $PAGE_COUNT"

  # Verifier page index
  if [ -f "$SERVICES_DIR/page.tsx" ]; then
    echo -e "   ${GREEN}OK${NC}: Page index services presente"
  else
    echo -e "   ${YELLOW}WARNING: Pas de page index services${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi

  # Verifier au moins une page [slug]
  if [ -d "$SERVICES_DIR/[slug]" ] || ls "$SERVICES_DIR"/*/page.tsx > /dev/null 2>&1; then
    echo -e "   ${GREEN}OK${NC}: Pages services dynamiques presentes"
  else
    echo -e "   ${RED}ERREUR: Aucune page service dynamique${NC}"
    ERRORS=$((ERRORS + 1))
  fi
else
  echo -e "   ${RED}ERREUR: Dossier $SERVICES_DIR manquant${NC}"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# 3. Verification imports dans pages services
echo "3. Verification imports critiques..."
if [ -d "$SERVICES_DIR" ]; then
  # Verifier que les pages importent les donnees
  MISSING_IMPORTS=0

  for page in $(find "$SERVICES_DIR" -name "page.tsx"); do
    # Verifier import services ou locations
    if ! grep -q "import.*from.*data" "$page" 2>/dev/null; then
      if ! grep -q "import.*services\|import.*locations" "$page" 2>/dev/null; then
        echo -e "   ${YELLOW}WARNING: $page n'importe pas de donnees${NC}"
        WARNINGS=$((WARNINGS + 1))
      fi
    fi
  done

  if [ $WARNINGS -eq 0 ]; then
    echo -e "   ${GREEN}OK${NC}: Imports verifies"
  fi
fi
echo ""

# 4. Verification metadata exports
echo "4. Verification exports metadata..."
if [ -d "$SERVICES_DIR" ]; then
  MISSING_META=0

  for page in $(find "$SERVICES_DIR" -name "page.tsx"); do
    # Verifier export metadata ou generateMetadata
    if ! grep -qE "export (const|async function) (metadata|generateMetadata)" "$page" 2>/dev/null; then
      page_short=$(echo "$page" | sed 's|src/app/||')
      echo -e "   ${YELLOW}WARNING: $page_short sans metadata${NC}"
      WARNINGS=$((WARNINGS + 1))
      MISSING_META=$((MISSING_META + 1))
    fi
  done

  if [ $MISSING_META -eq 0 ]; then
    echo -e "   ${GREEN}OK${NC}: Toutes les pages ont metadata"
  fi
fi
echo ""

# 5. Build rapide (next build avec cache)
echo "5. Test build Next.js..."
BUILD_START=$(date +%s)
BUILD_OUTPUT=$(npm run build 2>&1) || true
BUILD_STATUS=$?
BUILD_END=$(date +%s)
BUILD_TIME=$((BUILD_END - BUILD_START))

if [ $BUILD_STATUS -eq 0 ]; then
  echo -e "   ${GREEN}OK${NC}: Build reussi en ${BUILD_TIME}s"

  # Verifier pages generees
  if [ -d ".next/server/app/services" ]; then
    GEN_PAGES=$(find ".next/server/app/services" -name "*.html" 2>/dev/null | wc -l)
    echo "   Pages services generees: $GEN_PAGES"
  fi
else
  echo -e "   ${RED}ERREUR: Build echoue${NC}"
  echo "$BUILD_OUTPUT" | grep -E "(Error|error|ERR)" | tail -5 | sed 's/^/   /'
  ERRORS=$((ERRORS + 1))
fi
echo ""

# 6. Resume
echo "=============================================="
echo "  RESULTAT GATE 2.2"
echo "=============================================="
echo "  Build time: ${BUILD_TIME}s"
echo "  Erreurs:    $ERRORS"
echo "  Warnings:   $WARNINGS"
echo ""

if [ $ERRORS -gt 0 ]; then
  echo -e "  ${RED}GATE 2.2: FAIL${NC}"
  echo "  $ERRORS erreur(s) detectee(s)"
  echo ""
  echo "  ═══════════════════════════════════════════"
  echo -e "  ${RED}BLOQUER AVANT GENERATION BLOG${NC}"
  echo "  ═══════════════════════════════════════════"
  echo ""
  echo "  ACTIONS REQUISES:"
  echo "    1. Corriger les erreurs de build"
  echo "    2. Re-executer ./scripts/test-service-build.sh"
  echo "    3. Continuer vers blog une fois Gate 2.2 PASS"
  echo ""
  echo "=============================================="
  exit 1
else
  if [ $WARNINGS -gt 0 ]; then
    echo -e "  ${YELLOW}GATE 2.2: PASS avec warnings${NC}"
    echo "  $WARNINGS warning(s) a verifier"
  else
    echo -e "  ${GREEN}GATE 2.2: PASS${NC}"
  fi
  echo "  → Build services OK"
  echo "  → Pret pour generation blog"
  echo "=============================================="
  exit 0
fi
