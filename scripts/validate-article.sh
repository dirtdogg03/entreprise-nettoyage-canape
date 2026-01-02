#!/bin/bash
# ============================================================================
# validate-article.sh
# Gate 2.1: Validation format d'un article AVANT insertion
# ============================================================================

set -e

# Parametres
ARTICLE_JSON="$1"
SLUG="$2"

# Couleurs pour output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteurs
ERRORS=0
WARNINGS=0

echo "=============================================="
echo "  GATE 2.1: VALIDATION ARTICLE"
echo "  Slug: ${SLUG:-unknown}"
echo "=============================================="
echo ""

# Verifier que l'input est fourni
if [ -z "$ARTICLE_JSON" ]; then
  echo -e "${RED}ERREUR: Article JSON requis en argument${NC}"
  echo "Usage: $0 '<article_json>' [slug]"
  exit 1
fi

# 1. Verifier que c'est du JSON valide
echo "1. Verification JSON valide..."
if ! echo "$ARTICLE_JSON" | jq empty 2>/dev/null; then
  echo -e "   ${RED}ERREUR: JSON invalide${NC}"
  ERRORS=$((ERRORS + 1))
else
  echo -e "   ${GREEN}OK${NC}: JSON valide"
fi
echo ""

# 2. Verifier readingTime (doit etre string)
echo "2. Verification readingTime..."
RT_VALUE=$(echo "$ARTICLE_JSON" | jq -r '.readingTime // empty' 2>/dev/null)
RT_TYPE=$(echo "$ARTICLE_JSON" | jq -r '.readingTime | type' 2>/dev/null)

if [ -z "$RT_VALUE" ] || [ "$RT_VALUE" == "null" ]; then
  echo -e "   ${RED}ERREUR: readingTime absent${NC}"
  ERRORS=$((ERRORS + 1))
elif [ "$RT_TYPE" != "string" ]; then
  echo -e "   ${RED}ERREUR: readingTime doit etre string, pas $RT_TYPE${NC}"
  echo "   Valeur actuelle: $RT_VALUE"
  echo "   Format attendu: '12 min'"
  ERRORS=$((ERRORS + 1))
elif ! echo "$RT_VALUE" | grep -qE '^[0-9]+ min$'; then
  echo -e "   ${YELLOW}WARNING: Format readingTime non standard${NC}"
  echo "   Valeur: $RT_VALUE"
  echo "   Format recommande: 'X min'"
  WARNINGS=$((WARNINGS + 1))
else
  echo -e "   ${GREEN}OK${NC}: readingTime = '$RT_VALUE'"
fi
echo ""

# 3. Verifier keywords (doit etre array)
echo "3. Verification keywords..."
KW_TYPE=$(echo "$ARTICLE_JSON" | jq -r '.keywords | type' 2>/dev/null)

if [ "$KW_TYPE" == "null" ]; then
  echo -e "   ${RED}ERREUR: keywords absent${NC}"
  ERRORS=$((ERRORS + 1))
elif [ "$KW_TYPE" != "array" ]; then
  echo -e "   ${RED}ERREUR: keywords doit etre array, pas $KW_TYPE${NC}"
  if [ "$KW_TYPE" == "object" ]; then
    echo "   Detecte: object avec primary/secondary"
    echo "   Attendu: ['keyword1', 'keyword2', ...]"
  fi
  ERRORS=$((ERRORS + 1))
else
  KW_COUNT=$(echo "$ARTICLE_JSON" | jq -r '.keywords | length')
  echo -e "   ${GREEN}OK${NC}: keywords = array avec $KW_COUNT elements"
fi
echo ""

# 4. Verifier id (doit etre number)
echo "4. Verification id..."
ID_VALUE=$(echo "$ARTICLE_JSON" | jq -r '.id // empty' 2>/dev/null)
ID_TYPE=$(echo "$ARTICLE_JSON" | jq -r '.id | type' 2>/dev/null)

if [ -z "$ID_VALUE" ] || [ "$ID_VALUE" == "null" ]; then
  echo -e "   ${RED}ERREUR: id absent${NC}"
  ERRORS=$((ERRORS + 1))
elif [ "$ID_TYPE" != "number" ]; then
  echo -e "   ${RED}ERREUR: id doit etre number, pas $ID_TYPE${NC}"
  echo "   Valeur actuelle: $ID_VALUE"
  ERRORS=$((ERRORS + 1))
else
  echo -e "   ${GREEN}OK${NC}: id = $ID_VALUE"
fi
echo ""

# 5. Verifier slug (ASCII-safe, pas d'accents)
echo "5. Verification slug..."
SLUG_VALUE=$(echo "$ARTICLE_JSON" | jq -r '.slug // empty' 2>/dev/null)

if [ -z "$SLUG_VALUE" ] || [ "$SLUG_VALUE" == "null" ]; then
  echo -e "   ${RED}ERREUR: slug absent${NC}"
  ERRORS=$((ERRORS + 1))
elif echo "$SLUG_VALUE" | grep -qE '[éèêëàâäùûüîïôöçÉÈÊËÀÂÄÙÛÜÎÏÔÖÇ]'; then
  echo -e "   ${RED}ERREUR: slug contient des accents${NC}"
  echo "   Valeur: $SLUG_VALUE"
  echo "   Les slugs doivent etre ASCII-safe"
  ERRORS=$((ERRORS + 1))
elif ! echo "$SLUG_VALUE" | grep -qE '^[a-z0-9-]+$'; then
  echo -e "   ${YELLOW}WARNING: slug contient des caracteres non standards${NC}"
  echo "   Valeur: $SLUG_VALUE"
  echo "   Recommande: uniquement a-z, 0-9 et -"
  WARNINGS=$((WARNINGS + 1))
else
  echo -e "   ${GREEN}OK${NC}: slug = '$SLUG_VALUE'"
fi
echo ""

# 6. Verifier content (non vide, longueur suffisante)
echo "6. Verification content..."
CONTENT_VALUE=$(echo "$ARTICLE_JSON" | jq -r '.content // empty' 2>/dev/null)

if [ -z "$CONTENT_VALUE" ] || [ "$CONTENT_VALUE" == "null" ]; then
  echo -e "   ${RED}ERREUR: content absent${NC}"
  ERRORS=$((ERRORS + 1))
else
  CONTENT_LEN=${#CONTENT_VALUE}
  if [ "$CONTENT_LEN" -lt 500 ]; then
    echo -e "   ${RED}ERREUR: content trop court ($CONTENT_LEN chars, min: 500)${NC}"
    ERRORS=$((ERRORS + 1))
  elif [ "$CONTENT_LEN" -lt 1000 ]; then
    echo -e "   ${YELLOW}WARNING: content court ($CONTENT_LEN chars, recommande: >1000)${NC}"
    WARNINGS=$((WARNINGS + 1))
  else
    echo -e "   ${GREEN}OK${NC}: content = $CONTENT_LEN caracteres"
  fi
fi
echo ""

# 7. Verifier title et metaDescription (presence)
echo "7. Verification metadata..."
TITLE=$(echo "$ARTICLE_JSON" | jq -r '.title // empty' 2>/dev/null)
META_DESC=$(echo "$ARTICLE_JSON" | jq -r '.metaDescription // empty' 2>/dev/null)

if [ -z "$TITLE" ] || [ "$TITLE" == "null" ]; then
  echo -e "   ${RED}ERREUR: title absent${NC}"
  ERRORS=$((ERRORS + 1))
else
  TITLE_LEN=${#TITLE}
  if [ "$TITLE_LEN" -gt 60 ]; then
    echo -e "   ${YELLOW}WARNING: title trop long ($TITLE_LEN chars, max recommande: 60)${NC}"
    WARNINGS=$((WARNINGS + 1))
  else
    echo -e "   ${GREEN}OK${NC}: title = $TITLE_LEN chars"
  fi
fi

if [ -z "$META_DESC" ] || [ "$META_DESC" == "null" ]; then
  echo -e "   ${YELLOW}WARNING: metaDescription absent${NC}"
  WARNINGS=$((WARNINGS + 1))
else
  DESC_LEN=${#META_DESC}
  if [ "$DESC_LEN" -gt 160 ]; then
    echo -e "   ${YELLOW}WARNING: metaDescription trop long ($DESC_LEN chars, max: 160)${NC}"
    WARNINGS=$((WARNINGS + 1))
  else
    echo -e "   ${GREEN}OK${NC}: metaDescription = $DESC_LEN chars"
  fi
fi
echo ""

# Resume
echo "=============================================="
echo "  RESULTAT VALIDATION"
echo "=============================================="
echo "  Erreurs:  $ERRORS"
echo "  Warnings: $WARNINGS"
echo ""

if [ $ERRORS -gt 0 ]; then
  echo -e "  ${RED}GATE 2.1: FAIL${NC}"
  echo "  $ERRORS erreur(s) detectee(s)"
  echo "  → Action: Retry ou correction requise"
  echo "=============================================="
  exit 1
else
  if [ $WARNINGS -gt 0 ]; then
    echo -e "  ${YELLOW}GATE 2.1: PASS avec warnings${NC}"
  else
    echo -e "  ${GREEN}GATE 2.1: PASS${NC}"
  fi
  echo "=============================================="
  exit 0
fi
