#!/bin/bash
# ============================================================================
# reserve-ids.sh
# Gate 1.2: Reservation sequentielle des IDs pour eviter les doublons
# ============================================================================

set -e

ARTICLES_FILE="src/lib/data/articles.ts"
BRIEFS_DIR="${BRIEFS_DIR:-/home/dirtd/.claude/outputs/briefs}"
RESERVATION_FILE="/tmp/id-reservations.txt"

# Couleurs pour output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "=============================================="
echo "  GATE 1.2: RESERVATION DES IDS"
echo "=============================================="
echo ""

# Detecter jq ou python3
USE_JQ=false
if command -v jq &> /dev/null; then
  USE_JQ=true
elif ! command -v python3 &> /dev/null; then
  echo -e "   ${RED}ERREUR: ni jq ni python3 ne sont installes${NC}"
  exit 1
fi

# Fonction pour extraire slug du JSON
get_slug() {
  local file="$1"
  if [ "$USE_JQ" == "true" ]; then
    jq -r '.slug' "$file" 2>/dev/null
  else
    python3 -c "import json; print(json.load(open('$file')).get('slug', ''))" 2>/dev/null
  fi
}

# Nettoyer le fichier de reservation precedent
rm -f "$RESERVATION_FILE"

# 1. Trouver le dernier ID utilise
echo "1. Recherche du dernier ID..."
if [ -f "$ARTICLES_FILE" ]; then
  LAST_ID=$(grep -oP "id:\s*\d+" "$ARTICLES_FILE" | grep -oP '\d+' | sort -n | tail -1)
  if [ -z "$LAST_ID" ]; then
    LAST_ID=0
  fi
else
  LAST_ID=0
fi
echo "   Dernier ID trouve: $LAST_ID"
echo ""

# 2. Lister les briefs a traiter
echo "2. Analyse des briefs..."
BRIEF_COUNT=0
for brief in "$BRIEFS_DIR"/*.json; do
  # Ignorer les fichiers de test
  if [[ "$(basename "$brief")" == test-* ]]; then
    continue
  fi

  # Verifier si le brief existe
  if [ ! -f "$brief" ]; then
    continue
  fi

  # Extraire le slug
  SLUG=$(get_slug "$brief")
  if [ -z "$SLUG" ] || [ "$SLUG" == "null" ] || [ "$SLUG" == "None" ]; then
    echo -e "   ${YELLOW}WARNING${NC}: Slug manquant dans $(basename "$brief")"
    continue
  fi

  # Verifier si l'article existe deja
  if grep -q "slug: '$SLUG'" "$ARTICLES_FILE" 2>/dev/null; then
    echo "   SKIP: $SLUG (deja dans articles.ts)"
    continue
  fi

  # Reserver un ID
  LAST_ID=$((LAST_ID + 1))
  echo "$SLUG:$LAST_ID" >> "$RESERVATION_FILE"
  BRIEF_COUNT=$((BRIEF_COUNT + 1))
  echo "   RESERVE: $SLUG -> ID $LAST_ID"
done
echo ""

# 3. Resume
echo "=============================================="
echo "  RESULTAT RESERVATION"
echo "=============================================="

if [ $BRIEF_COUNT -eq 0 ]; then
  echo "  Aucun nouveau brief a traiter"
  echo "  (tous les articles sont deja dans articles.ts)"
  echo "=============================================="
  exit 0
fi

echo "  Briefs a traiter: $BRIEF_COUNT"
echo "  IDs reserves: de $((LAST_ID - BRIEF_COUNT + 1)) a $LAST_ID"
echo "  Fichier de reservation: $RESERVATION_FILE"
echo ""

# Afficher le contenu du fichier de reservation
echo "  MAPPING SLUG -> ID:"
cat "$RESERVATION_FILE" | while read line; do
  SLUG=$(echo "$line" | cut -d: -f1)
  ID=$(echo "$line" | cut -d: -f2)
  echo "    $SLUG -> $ID"
done

echo ""
echo "=============================================="
echo "  GATE 1.2: PASS"
echo "=============================================="

# Exporter la variable pour les scripts suivants
export RESERVATION_FILE
exit 0
