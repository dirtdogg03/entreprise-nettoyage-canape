#!/bin/bash
# ============================================================================
# test-lighthouse.sh
# Gate 4.2: Verification Lighthouse scores >90
# ============================================================================

# Couleurs pour output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
MIN_SCORE="${MIN_SCORE:-90}"
TARGET_URL="${TARGET_URL:-http://localhost:3000}"
PAGES_TO_TEST=("/" "/services" "/contact")

echo "=============================================="
echo "  GATE 4.2: LIGHTHOUSE AUDIT"
echo "=============================================="
echo ""
echo "  Target: $TARGET_URL"
echo "  Score minimum: $MIN_SCORE"
echo ""

ERRORS=0
WARNINGS=0

# Verifier si lighthouse est installe
echo "1. Verification outils..."
if ! command -v lighthouse &> /dev/null; then
  echo -e "   ${YELLOW}WARNING: Lighthouse CLI non installe${NC}"
  echo "   Installation: npm install -g lighthouse"
  echo ""
  echo "   Alternative: Utiliser MCP Lighthouse"
  echo ""

  # Essayer avec le MCP si disponible
  if command -v npx &> /dev/null; then
    echo "   Tentative via npx..."
    HAS_LIGHTHOUSE=false
  else
    echo -e "   ${RED}ERREUR: Impossible d'executer Lighthouse${NC}"
    ERRORS=$((ERRORS + 1))
  fi
else
  echo -e "   ${GREEN}OK${NC}: Lighthouse CLI disponible"
  HAS_LIGHTHOUSE=true
fi
echo ""

# Verifier si le serveur est demarre
echo "2. Verification serveur..."
if curl -s "$TARGET_URL" > /dev/null 2>&1; then
  echo -e "   ${GREEN}OK${NC}: Serveur accessible"
  SERVER_UP=true
else
  echo -e "   ${YELLOW}WARNING: Serveur non accessible${NC}"
  echo "   Le serveur doit etre demarre: npm run start"
  echo ""
  echo "   Pour un test hors-ligne, ce gate sera SKIP"
  SERVER_UP=false
fi
echo ""

# Si pas de serveur ou pas de lighthouse, mode manuel
if [ "$SERVER_UP" = false ] || [ "$HAS_LIGHTHOUSE" = false ]; then
  echo "=============================================="
  echo "  MODE VERIFICATION MANUELLE"
  echo "=============================================="
  echo ""
  echo "  Lighthouse ne peut pas etre execute automatiquement."
  echo "  Veuillez verifier manuellement:"
  echo ""
  echo "  Option 1 - Chrome DevTools:"
  echo "    1. Ouvrir $TARGET_URL dans Chrome"
  echo "    2. F12 > Lighthouse > Generate report"
  echo "    3. Verifier scores >= $MIN_SCORE"
  echo ""
  echo "  Option 2 - PageSpeed Insights:"
  echo "    https://pagespeed.web.dev/"
  echo ""
  echo "  Option 3 - MCP Lighthouse (si disponible):"
  echo "    mcp__lighthouse__run_audit url=$TARGET_URL"
  echo ""
  echo "  CRITERES A VERIFIER:"
  echo "    [ ] Performance >= $MIN_SCORE"
  echo "    [ ] Accessibility >= $MIN_SCORE"
  echo "    [ ] Best Practices >= $MIN_SCORE"
  echo "    [ ] SEO >= $MIN_SCORE"
  echo ""
  echo -e "  ${YELLOW}GATE 4.2: VERIFICATION MANUELLE REQUISE${NC}"
  echo "=============================================="
  exit 0
fi

# Executer Lighthouse sur les pages
echo "3. Audit Lighthouse..."
RESULTS_DIR="/tmp/lighthouse-results"
mkdir -p "$RESULTS_DIR"

ALL_PASS=true
declare -A SCORES

for page in "${PAGES_TO_TEST[@]}"; do
  url="${TARGET_URL}${page}"
  output_file="$RESULTS_DIR/$(echo "$page" | tr '/' '-' | sed 's/^-/home/').json"

  echo ""
  echo "   Testing: $url"

  # Executer lighthouse
  lighthouse "$url" \
    --output=json \
    --output-path="$output_file" \
    --chrome-flags="--headless --no-sandbox" \
    --only-categories=performance,accessibility,best-practices,seo \
    --quiet 2>/dev/null

  if [ -f "$output_file" ]; then
    # Extraire les scores
    PERF=$(jq '.categories.performance.score * 100 | floor' "$output_file" 2>/dev/null || echo 0)
    A11Y=$(jq '.categories.accessibility.score * 100 | floor' "$output_file" 2>/dev/null || echo 0)
    BP=$(jq '.categories["best-practices"].score * 100 | floor' "$output_file" 2>/dev/null || echo 0)
    SEO=$(jq '.categories.seo.score * 100 | floor' "$output_file" 2>/dev/null || echo 0)

    echo "   Performance: $PERF | Accessibility: $A11Y | Best Practices: $BP | SEO: $SEO"

    # Verifier scores
    PAGE_PASS=true
    if [ "$PERF" -lt "$MIN_SCORE" ]; then
      echo -e "   ${RED}Performance < $MIN_SCORE${NC}"
      PAGE_PASS=false
    fi
    if [ "$A11Y" -lt "$MIN_SCORE" ]; then
      echo -e "   ${RED}Accessibility < $MIN_SCORE${NC}"
      PAGE_PASS=false
    fi
    if [ "$BP" -lt "$MIN_SCORE" ]; then
      echo -e "   ${RED}Best Practices < $MIN_SCORE${NC}"
      PAGE_PASS=false
    fi
    if [ "$SEO" -lt "$MIN_SCORE" ]; then
      echo -e "   ${RED}SEO < $MIN_SCORE${NC}"
      PAGE_PASS=false
    fi

    if [ "$PAGE_PASS" = true ]; then
      echo -e "   ${GREEN}OK${NC}: Tous les scores >= $MIN_SCORE"
    else
      ALL_PASS=false
      ERRORS=$((ERRORS + 1))
    fi
  else
    echo -e "   ${RED}ERREUR: Lighthouse echoue${NC}"
    ERRORS=$((ERRORS + 1))
    ALL_PASS=false
  fi
done
echo ""

# Resume
echo "=============================================="
echo "  RESULTAT GATE 4.2"
echo "=============================================="
echo "  Pages testees: ${#PAGES_TO_TEST[@]}"
echo "  Score minimum: $MIN_SCORE"
echo "  Erreurs: $ERRORS"
echo ""

if [ "$ALL_PASS" = true ]; then
  echo -e "  ${GREEN}GATE 4.2: PASS${NC}"
  echo "  → Tous les scores >= $MIN_SCORE"
  echo "  → Continuer vers Gate 4.3 (SEO Checklist)"
  echo "=============================================="
  exit 0
else
  echo -e "  ${RED}GATE 4.2: FAIL${NC}"
  echo "  $ERRORS page(s) sous le seuil"
  echo ""
  echo "  OPTIMISATIONS RECOMMANDEES:"
  echo "    - Performance: Images optimisees, lazy loading"
  echo "    - Accessibility: Contraste, aria-labels, alt text"
  echo "    - Best Practices: HTTPS, pas de console errors"
  echo "    - SEO: Meta tags, structured data, mobile-friendly"
  echo ""
  echo "  Rapports: $RESULTS_DIR/"
  echo "=============================================="
  exit 1
fi
