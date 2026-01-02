#!/bin/bash
# ============================================================================
# validate-blog-generation.sh
# Validation AVANT generation d'articles de blog
# ============================================================================

set -e

BRIEFS_DIR="${BRIEFS_DIR:-/home/dirtd/.claude/outputs/briefs}"
ARTICLES_FILE="src/lib/data/articles.ts"

# Couleurs pour output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=============================================="
echo "  GATE 1.1: VALIDATION PRE-GENERATION BLOG"
echo "=============================================="
echo ""

ERRORS=0
WARNINGS=0
BRIEF_COUNT=0

# 0. Verifier les prerequis (jq ou python3)
echo "0. Verification prerequis..."
USE_JQ=false
USE_PYTHON=false

if command -v jq &> /dev/null; then
  USE_JQ=true
  echo -e "   ${GREEN}OK${NC}: jq disponible"
elif command -v python3 &> /dev/null; then
  USE_PYTHON=true
  echo -e "   ${YELLOW}INFO${NC}: jq non disponible, utilisation de python3"
else
  echo -e "   ${RED}ERREUR: ni jq ni python3 ne sont installes${NC}"
  echo "   Installer avec: sudo apt install jq"
  exit 1
fi
echo ""

# Fonction helper pour extraire JSON avec python3
json_get() {
  local file="$1"
  local path="$2"
  if [ "$USE_JQ" == "true" ]; then
    jq -r "$path // empty" "$file" 2>/dev/null
  else
    python3 -c "
import json, sys
try:
    with open('$file') as f:
        data = json.load(f)
    path = '$path'.replace('.', ' ').split()
    result = data
    for p in path:
        if p.startswith('[') and p.endswith(']'):
            result = result[int(p[1:-1])]
        else:
            result = result.get(p, None)
        if result is None:
            break
    print(result if result else '')
except:
    print('')
" 2>/dev/null
  fi
}

# Fonction pour valider JSON
json_valid() {
  local file="$1"
  if [ "$USE_JQ" == "true" ]; then
    jq empty "$file" 2>/dev/null
  else
    python3 -c "import json; json.load(open('$file'))" 2>/dev/null
  fi
}

# Fonction pour compter elements d'un array
json_array_len() {
  local file="$1"
  local path="$2"
  if [ "$USE_JQ" == "true" ]; then
    jq -r "$path | length" "$file" 2>/dev/null || echo "0"
  else
    python3 -c "
import json
try:
    with open('$file') as f:
        data = json.load(f)
    path = '$path'.replace('.', ' ').split()
    result = data
    for p in path:
        result = result.get(p, [])
    print(len(result) if isinstance(result, list) else 0)
except:
    print(0)
" 2>/dev/null
  fi
}

# 1. Verifier que les slugs sont ASCII-safe (pas d'accents)
echo "1. Verification slugs ASCII-safe..."
ACCENTED_SLUGS=$(grep -oP '"slug":\s*"[^"]+' "$BRIEFS_DIR"/*.json 2>/dev/null | grep -E '[éèêëàâäùûüîïôöç]' || true)
if [ -n "$ACCENTED_SLUGS" ]; then
  echo -e "   ${RED}ERREUR: Accents detectes dans les slugs:${NC}"
  echo "$ACCENTED_SLUGS" | sed 's/^/   /'
  ERRORS=$((ERRORS + 1))
else
  echo -e "   ${GREEN}OK${NC}: Tous les slugs sont ASCII-safe"
fi
echo ""

# 2. Verification JSON valide et champs requis
echo "2. Verification JSON et champs requis..."
for brief in "$BRIEFS_DIR"/*.json; do
  # Ignorer les fichiers de test
  if [[ "$(basename "$brief")" == test-* ]]; then
    continue
  fi

  # Verifier si le fichier existe
  if [ ! -f "$brief" ]; then
    continue
  fi

  briefname=$(basename "$brief")
  BRIEF_COUNT=$((BRIEF_COUNT + 1))
  BRIEF_ERRORS=0

  # 2.1 Verifier JSON valide
  if ! json_valid "$brief"; then
    echo -e "   ${RED}ERREUR: JSON invalide dans $briefname${NC}"
    ERRORS=$((ERRORS + 1))
    continue  # Skip autres verifications si JSON invalide
  fi

  # 2.2 Verifier slug (requis + format)
  SLUG=$(json_get "$brief" "slug")
  if [ -z "$SLUG" ] || [ "$SLUG" == "null" ] || [ "$SLUG" == "None" ]; then
    echo -e "   ${RED}ERREUR: slug manquant dans $briefname${NC}"
    BRIEF_ERRORS=$((BRIEF_ERRORS + 1))
  elif ! echo "$SLUG" | grep -qE '^[a-z0-9-]+$'; then
    echo -e "   ${RED}ERREUR: slug invalide '$SLUG' dans $briefname${NC}"
    echo "   Format attendu: uniquement a-z, 0-9 et -"
    BRIEF_ERRORS=$((BRIEF_ERRORS + 1))
  fi

  # 2.3 Verifier imagePath (requis + format)
  IMGPATH=$(json_get "$brief" "imagePath")
  if [ -z "$IMGPATH" ] || [ "$IMGPATH" == "null" ] || [ "$IMGPATH" == "None" ]; then
    echo -e "   ${RED}ERREUR: imagePath manquant dans $briefname${NC}"
    BRIEF_ERRORS=$((BRIEF_ERRORS + 1))
  elif ! echo "$IMGPATH" | grep -qE '^/images/blog/[a-z0-9-]+\.(jpg|jpeg|png|webp)$'; then
    echo -e "   ${YELLOW}WARNING: imagePath format non standard dans $briefname${NC}"
    echo "   Valeur: $IMGPATH"
    echo "   Format attendu: /images/blog/[slug].[jpg|png|webp]"
    WARNINGS=$((WARNINGS + 1))
  fi

  # 2.4 Verifier keyword_principal (requis)
  KEYWORD=$(json_get "$brief" "keyword_principal")
  if [ -z "$KEYWORD" ] || [ "$KEYWORD" == "null" ] || [ "$KEYWORD" == "None" ]; then
    echo -e "   ${YELLOW}WARNING: keyword_principal manquant dans $briefname${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi

  # 2.5 Verifier plan (requis + structure)
  PLAN_H1=$(json_get "$brief" "plan h1")
  PLAN_H2_COUNT=$(json_array_len "$brief" "plan h2")
  if [ -z "$PLAN_H1" ] || [ "$PLAN_H1" == "null" ] || [ "$PLAN_H1" == "None" ]; then
    echo -e "   ${RED}ERREUR: plan.h1 manquant dans $briefname${NC}"
    BRIEF_ERRORS=$((BRIEF_ERRORS + 1))
  fi
  if [ "$PLAN_H2_COUNT" -lt 3 ]; then
    echo -e "   ${YELLOW}WARNING: plan.h2 insuffisant ($PLAN_H2_COUNT < 3) dans $briefname${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi

  # 2.6 Verifier faq (requis + minimum questions)
  FAQ_COUNT=$(json_array_len "$brief" "faq")
  if [ "$FAQ_COUNT" -eq 0 ]; then
    echo -e "   ${RED}ERREUR: faq manquante dans $briefname${NC}"
    BRIEF_ERRORS=$((BRIEF_ERRORS + 1))
  elif [ "$FAQ_COUNT" -lt 3 ]; then
    echo -e "   ${YELLOW}WARNING: faq insuffisante ($FAQ_COUNT < 3) dans $briefname${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi

  # 2.7 Verifier category (requis)
  CATEGORY=$(json_get "$brief" "category")
  if [ -z "$CATEGORY" ] || [ "$CATEGORY" == "null" ] || [ "$CATEGORY" == "None" ]; then
    echo -e "   ${YELLOW}WARNING: category manquante dans $briefname${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi

  # Ajouter les erreurs du brief au total
  ERRORS=$((ERRORS + BRIEF_ERRORS))

  # Afficher OK si pas d'erreurs pour ce brief
  if [ $BRIEF_ERRORS -eq 0 ]; then
    echo -e "   ${GREEN}OK${NC}: $briefname"
  fi
done

echo ""
echo "   Briefs analyses: $BRIEF_COUNT"
echo ""

# 3. Calculer le prochain ID disponible
echo "3. Calcul du prochain ID disponible..."
if [ -f "$ARTICLES_FILE" ]; then
  LAST_ID=$(grep -oP "id:\s*\d+" "$ARTICLES_FILE" | grep -oP '\d+' | sort -n | tail -1)
  NEXT_ID=$((LAST_ID + 1))
  echo "   Dernier ID utilise: $LAST_ID"
  echo "   Prochain ID disponible: $NEXT_ID"
else
  echo "   INFO: Fichier articles.ts non trouve, premier ID sera 1"
  NEXT_ID=1
fi
echo ""

# 4. Verifier coherence des references dans briefs
echo "4. Verification coherence des references linking..."
for brief in "$BRIEFS_DIR"/*.json; do
  if [[ "$(basename "$brief")" == test-* ]]; then
    continue
  fi

  if [ ! -f "$brief" ]; then
    continue
  fi

  # Extraire les cross_cluster references
  if [ "$USE_JQ" == "true" ]; then
    REFS=$(jq -r '.linking.cross_cluster[]?' "$brief" 2>/dev/null || true)
  else
    REFS=$(python3 -c "
import json
try:
    with open('$brief') as f:
        data = json.load(f)
    refs = data.get('linking', {}).get('cross_cluster', [])
    for r in refs:
        print(r)
except:
    pass
" 2>/dev/null || true)
  fi

  for ref in $REFS; do
    if [ -n "$ref" ] && [ "$ref" != "null" ] && [ "$ref" != "None" ]; then
      # Verifier si le slug reference existe
      if [ -f "$ARTICLES_FILE" ] && ! grep -q "slug: '$ref'" "$ARTICLES_FILE"; then
        if ! grep -lq "\"slug\": \"$ref\"" "$BRIEFS_DIR"/*.json 2>/dev/null; then
          echo -e "   ${YELLOW}WARNING${NC}: Reference '$ref' non trouvee (brief: $(basename $brief))"
          WARNINGS=$((WARNINGS + 1))
        fi
      fi
    fi
  done
done
echo -e "   ${GREEN}OK${NC}: Verification references terminee"
echo ""

# 5. Resume
echo "=============================================="
echo "  RESULTAT GATE 1.1"
echo "=============================================="
echo "  Briefs analyses: $BRIEF_COUNT"
echo "  Erreurs:         $ERRORS"
echo "  Warnings:        $WARNINGS"
echo ""

if [ $ERRORS -gt 0 ]; then
  echo -e "  ${RED}GATE 1.1: FAIL${NC}"
  echo "  $ERRORS erreur(s) detectee(s)"
  echo "  → Corriger les erreurs avant de generer"
  echo "=============================================="
  exit 1
else
  if [ $WARNINGS -gt 0 ]; then
    echo -e "  ${YELLOW}GATE 1.1: PASS avec warnings${NC}"
    echo "  $WARNINGS warning(s) a considerer"
  else
    echo -e "  ${GREEN}GATE 1.1: PASS${NC}"
  fi
  echo "  Prochain ID: $NEXT_ID"
  echo "  → Pret pour la generation"
  echo "=============================================="
  exit 0
fi
