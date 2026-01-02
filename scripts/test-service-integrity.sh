#!/bin/bash
# ============================================================================
# test-service-integrity.sh
# Gate 2.1: Verification integrite des services et locations
# ============================================================================

set -e

SERVICES_FILE="src/lib/data/services.ts"
LOCATIONS_FILE="src/lib/data/locations.ts"
VARIATIONS_FILE="src/lib/data/content/variations/city-service-content.ts"

# Couleurs pour output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "=============================================="
echo "  GATE 2.1: INTEGRITE SERVICES & LOCATIONS"
echo "=============================================="
echo ""

ERRORS=0
WARNINGS=0

# 1. Verifier que les fichiers existent
echo "1. Verification fichiers sources..."
for file in "$SERVICES_FILE" "$LOCATIONS_FILE"; do
  if [ ! -f "$file" ]; then
    echo -e "   ${RED}ERREUR: Fichier manquant: $file${NC}"
    ERRORS=$((ERRORS + 1))
  else
    echo -e "   ${GREEN}OK${NC}: $file existe"
  fi
done
echo ""

# 2. Verifier unicite des slugs services
echo "2. Verification unicite slugs services..."
if [ -f "$SERVICES_FILE" ]; then
  DUPLICATE_SLUGS=$(grep -oP "slug:\s*'[^']+'|slug:\s*\"[^\"]+\"" "$SERVICES_FILE" | sort | uniq -d)
  if [ -n "$DUPLICATE_SLUGS" ]; then
    echo -e "   ${RED}ERREUR: Slugs services dupliques:${NC}"
    echo "$DUPLICATE_SLUGS" | sed 's/^/   - /'
    ERRORS=$((ERRORS + 1))
  else
    echo -e "   ${GREEN}OK${NC}: Tous les slugs services sont uniques"
  fi
fi
echo ""

# 3. Verifier unicite des slugs locations
echo "3. Verification unicite slugs locations..."
if [ -f "$LOCATIONS_FILE" ]; then
  DUPLICATE_LOCS=$(grep -oP "slug:\s*'[^']+'|slug:\s*\"[^\"]+\"" "$LOCATIONS_FILE" | sort | uniq -d)
  if [ -n "$DUPLICATE_LOCS" ]; then
    echo -e "   ${RED}ERREUR: Slugs locations dupliques:${NC}"
    echo "$DUPLICATE_LOCS" | sed 's/^/   - /'
    ERRORS=$((ERRORS + 1))
  else
    echo -e "   ${GREEN}OK${NC}: Tous les slugs locations sont uniques"
  fi
fi
echo ""

# 4. Verifier slugs ASCII-safe (pas d'accents)
echo "4. Verification slugs ASCII-safe..."
ACCENTED_SLUGS=""
if [ -f "$SERVICES_FILE" ]; then
  ACCENTED_SLUGS=$(grep -oP "slug:\s*'[^']+'|slug:\s*\"[^\"]+\"" "$SERVICES_FILE" | grep -E '[éèêëàâäùûüîïôöç]' || true)
fi
if [ -f "$LOCATIONS_FILE" ]; then
  ACCENTED_LOCS=$(grep -oP "slug:\s*'[^']+'|slug:\s*\"[^\"]+\"" "$LOCATIONS_FILE" | grep -E '[éèêëàâäùûüîïôöç]' || true)
  ACCENTED_SLUGS="$ACCENTED_SLUGS$ACCENTED_LOCS"
fi
if [ -n "$ACCENTED_SLUGS" ]; then
  echo -e "   ${RED}ERREUR: Slugs avec accents detectes:${NC}"
  echo "$ACCENTED_SLUGS" | sed 's/^/   /'
  ERRORS=$((ERRORS + 1))
else
  echo -e "   ${GREEN}OK${NC}: Tous les slugs sont ASCII-safe"
fi
echo ""

# 5. Verifier references nearbyLocations
echo "5. Verification coherence nearbyLocations..."
if [ -f "$LOCATIONS_FILE" ]; then
  # Extraire tous les slugs declares
  DECLARED_LOCS=$(grep -oP "slug:\s*'[^']+'|slug:\s*\"[^\"]+\"" "$LOCATIONS_FILE" | sed "s/slug: '//g" | sed 's/slug: "//g' | sed "s/'//g" | sed 's/"//g' | sort -u)

  # Extraire toutes les references dans nearbyLocations
  NEARBY_REFS=$(grep -oP "nearbyLocations:\s*\[[^\]]*\]" "$LOCATIONS_FILE" | grep -oP "'[^']+'" | sed "s/'//g" | sort -u)

  REF_ERRORS=0
  for ref in $NEARBY_REFS; do
    if ! echo "$DECLARED_LOCS" | grep -q "^${ref}$"; then
      echo -e "   ${RED}ERREUR: nearbyLocation invalide '$ref'${NC}"
      REF_ERRORS=$((REF_ERRORS + 1))
    fi
  done
  if [ $REF_ERRORS -eq 0 ]; then
    echo -e "   ${GREEN}OK${NC}: Toutes les nearbyLocations sont valides"
  else
    ERRORS=$((ERRORS + REF_ERRORS))
  fi
fi
echo ""

# 6. Verifier champs obligatoires services
echo "6. Verification champs obligatoires services..."
if [ -f "$SERVICES_FILE" ]; then
  SERVICE_COUNT=$(grep -c "slug:" "$SERVICES_FILE" | head -1)
  ID_COUNT=$(grep -c "id:" "$SERVICES_FILE" || echo 0)
  NAME_COUNT=$(grep -c "name:" "$SERVICES_FILE" || echo 0)

  echo "   Services detectes: $SERVICE_COUNT"

  # Verifier id present
  if grep -P "slug:\s*['\"][^'\"]+['\"]" "$SERVICES_FILE" | grep -v "id:" > /dev/null 2>&1; then
    echo -e "   ${YELLOW}WARNING: Certains services n'ont pas d'id${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi

  # Verifier category valide (canape, siege, traitement)
  INVALID_CAT=$(grep -oP "category:\s*['\"][^'\"]+['\"]" "$SERVICES_FILE" | grep -vE "(canape|siege|traitement)" || true)
  if [ -n "$INVALID_CAT" ]; then
    echo -e "   ${RED}ERREUR: Categories invalides detectees:${NC}"
    echo "$INVALID_CAT" | sed 's/^/   /'
    ERRORS=$((ERRORS + 1))
  else
    echo -e "   ${GREEN}OK${NC}: Toutes les categories sont valides"
  fi
fi
echo ""

# 7. Verifier champs obligatoires locations
echo "7. Verification champs obligatoires locations..."
if [ -f "$LOCATIONS_FILE" ]; then
  LOC_COUNT=$(grep -c "slug:" "$LOCATIONS_FILE" || echo 0)
  echo "   Locations detectees: $LOC_COUNT"

  # Verifier departmentCode present et format
  MISSING_DEPT=$(grep -A5 "slug:" "$LOCATIONS_FILE" | grep -L "departmentCode" || true)
  BAD_DEPT_CODE=$(grep -oP "departmentCode:\s*['\"][^'\"]+['\"]" "$LOCATIONS_FILE" | grep -vE "[0-9]{2,3}" || true)
  if [ -n "$BAD_DEPT_CODE" ]; then
    echo -e "   ${YELLOW}WARNING: Codes departement suspects:${NC}"
    echo "$BAD_DEPT_CODE" | head -3 | sed 's/^/   /'
    WARNINGS=$((WARNINGS + 1))
  else
    echo -e "   ${GREEN}OK${NC}: Codes departement valides"
  fi

  # Verifier postalCode format
  BAD_POSTAL=$(grep -oP "postalCode:\s*['\"][^'\"]+['\"]" "$LOCATIONS_FILE" | grep -vE "[0-9]{5}" || true)
  if [ -n "$BAD_POSTAL" ]; then
    echo -e "   ${YELLOW}WARNING: Codes postaux suspects:${NC}"
    echo "$BAD_POSTAL" | head -3 | sed 's/^/   /'
    WARNINGS=$((WARNINGS + 1))
  else
    echo -e "   ${GREEN}OK${NC}: Codes postaux valides"
  fi
fi
echo ""

# 8. Verifier variations city-service existent pour services declares
echo "8. Verification coherence variations..."
if [ -f "$VARIATIONS_FILE" ] && [ -f "$SERVICES_FILE" ]; then
  # Verifier que SERVICES_WITH_CITY_PAGES contient des services valides
  CITY_SERVICES=$(grep -oP "SERVICES_WITH_CITY_PAGES\s*=\s*\[[^\]]*\]" "$VARIATIONS_FILE" | grep -oP "'[^']+'|\"[^\"]+\"" | sed "s/['\"]//g" || true)

  for svc in $CITY_SERVICES; do
    if ! grep -q "slug:.*['\"]${svc}['\"]" "$SERVICES_FILE" 2>/dev/null; then
      echo -e "   ${RED}ERREUR: Service '$svc' dans SERVICES_WITH_CITY_PAGES mais absent de services.ts${NC}"
      ERRORS=$((ERRORS + 1))
    fi
  done

  if [ $ERRORS -eq 0 ]; then
    echo -e "   ${GREEN}OK${NC}: Coherence variations/services"
  fi
else
  echo -e "   ${YELLOW}SKIP${NC}: Fichier variations non trouve"
fi
echo ""

# 9. Resume
echo "=============================================="
echo "  RESULTAT GATE 2.1"
echo "=============================================="
SERVICE_COUNT=$(grep -c "slug:" "$SERVICES_FILE" 2>/dev/null || echo 0)
LOC_COUNT=$(grep -c "slug:" "$LOCATIONS_FILE" 2>/dev/null || echo 0)
echo "  Services: $SERVICE_COUNT"
echo "  Locations: $LOC_COUNT"
echo "  Erreurs:  $ERRORS"
echo "  Warnings: $WARNINGS"
echo ""

if [ $ERRORS -gt 0 ]; then
  echo -e "  ${RED}GATE 2.1: FAIL${NC}"
  echo "  $ERRORS erreur(s) detectee(s)"
  echo ""
  echo "  ═══════════════════════════════════════════"
  echo -e "  ${RED}BLOQUER GENERATION PAGES SERVICES${NC}"
  echo "  ═══════════════════════════════════════════"
  echo ""
  echo "  ACTIONS REQUISES:"
  echo "    1. Corriger les erreurs dans services.ts et/ou locations.ts"
  echo "    2. Re-executer ./scripts/test-service-integrity.sh"
  echo "    3. Continuer une fois Gate 2.1 PASS"
  echo ""
  echo "=============================================="
  exit 1
else
  if [ $WARNINGS -gt 0 ]; then
    echo -e "  ${YELLOW}GATE 2.1: PASS avec warnings${NC}"
    echo "  $WARNINGS warning(s) a verifier"
  else
    echo -e "  ${GREEN}GATE 2.1: PASS${NC}"
  fi
  echo "  → Donnees services/locations valides"
  echo "=============================================="
  exit 0
fi
