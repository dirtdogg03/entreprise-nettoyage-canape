#!/bin/bash
# ============================================================================
# test-article-integrity.sh
# Gate 3.1: Tests de non-regression APRES generation d'articles
# Avec support ROLLBACK automatique
# ============================================================================

set -e

ARTICLES_FILE="src/lib/data/articles.ts"
BACKUP_DIR="/tmp/article-backups"
BACKUP_FILE="$BACKUP_DIR/articles-$(date +%Y%m%d-%H%M%S).ts"

# Couleurs pour output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parametres
ENABLE_ROLLBACK="${ENABLE_ROLLBACK:-true}"  # Par defaut: rollback active

echo "=============================================="
echo "  GATE 3.1: TESTS D'INTEGRITE DES ARTICLES"
echo "=============================================="
echo ""

ERRORS=0
WARNINGS=0

# 0. Creer backup avant tests
echo "0. Creation backup..."
mkdir -p "$BACKUP_DIR"
if [ -f "$ARTICLES_FILE" ]; then
  cp "$ARTICLES_FILE" "$BACKUP_FILE"
  echo -e "   ${GREEN}OK${NC}: Backup cree: $BACKUP_FILE"
else
  echo -e "   ${YELLOW}WARNING${NC}: Fichier articles.ts non trouve"
fi
echo ""

# Fonction de rollback
rollback_articles() {
  if [ "$ENABLE_ROLLBACK" != "true" ]; then
    echo -e "   ${YELLOW}ROLLBACK DESACTIVE${NC}"
    return 0
  fi

  if [ -f "$BACKUP_FILE" ]; then
    echo -e "   ${BLUE}ROLLBACK EN COURS...${NC}"
    cp "$BACKUP_FILE" "$ARTICLES_FILE"
    echo -e "   ${GREEN}ROLLBACK OK${NC}: articles.ts restaure depuis $BACKUP_FILE"
    return 0
  else
    echo -e "   ${RED}ROLLBACK IMPOSSIBLE${NC}: Backup non trouve"
    return 1
  fi
}

# 1. Verifier unicite des IDs
echo "1. Verification unicite des IDs..."
DUPLICATE_IDS=$(grep -oP "id:\s*\d+" "$ARTICLES_FILE" | grep -oP '\d+' | sort | uniq -d)
if [ -n "$DUPLICATE_IDS" ]; then
  echo -e "   ${RED}ERREUR: IDs dupliques detectes:${NC}"
  echo "$DUPLICATE_IDS" | sed 's/^/   - ID: /'
  ERRORS=$((ERRORS + 1))
else
  echo -e "   ${GREEN}OK${NC}: Tous les IDs sont uniques"
fi
echo ""

# 2. Verifier unicite des slugs
echo "2. Verification unicite des slugs..."
DUPLICATE_SLUGS=$(grep -oP "slug:\s*'[^']+'" "$ARTICLES_FILE" | sort | uniq -d)
if [ -n "$DUPLICATE_SLUGS" ]; then
  echo -e "   ${RED}ERREUR: Slugs dupliques detectes:${NC}"
  echo "$DUPLICATE_SLUGS" | sed 's/^/   /'
  ERRORS=$((ERRORS + 1))
else
  echo -e "   ${GREEN}OK${NC}: Tous les slugs sont uniques"
fi
echo ""

# 3. Verifier slugs ASCII-safe (pas d'accents)
echo "3. Verification slugs ASCII-safe..."
ACCENTED_SLUGS=$(grep -oP "slug:\s*'[^']+'" "$ARTICLES_FILE" | grep -E '[éèêëàâäùûüîïôöç]' || true)
if [ -n "$ACCENTED_SLUGS" ]; then
  echo -e "   ${RED}ERREUR: Slugs avec accents detectes:${NC}"
  echo "$ACCENTED_SLUGS" | sed 's/^/   /'
  ERRORS=$((ERRORS + 1))
else
  echo -e "   ${GREEN}OK${NC}: Tous les slugs sont ASCII-safe"
fi
echo ""

# 4. Verifier coherence slugs/references
echo "4. Verification coherence references..."
# Extraire tous les slugs declares
DECLARED=$(grep -oP "slug:\s*'[^']+'" "$ARTICLES_FILE" | sed "s/slug: '//g" | sed "s/'//g" | sort -u)

# Extraire toutes les references
REFERENCED=$(grep -oP "relatedArticles:\s*\[[^\]]*\]" "$ARTICLES_FILE" | grep -oP "'[^']+'" | sed "s/'//g" | sort -u)

# Trouver les references cassees
REF_ERRORS=0
for ref in $REFERENCED; do
  if ! echo "$DECLARED" | grep -q "^${ref}$"; then
    echo -e "   ${RED}ERREUR: Reference cassee '$ref'${NC}"
    REF_ERRORS=$((REF_ERRORS + 1))
  fi
done
if [ $REF_ERRORS -eq 0 ]; then
  echo -e "   ${GREEN}OK${NC}: Toutes les references sont valides"
else
  ERRORS=$((ERRORS + REF_ERRORS))
fi
echo ""

# 5. Verifier types corrects
echo "5. Verification types TypeScript..."

# readingTime doit etre une string ('X min')
BAD_READING_TIME=$(grep -P "readingTime:\s*\d+," "$ARTICLES_FILE" || true)
if [ -n "$BAD_READING_TIME" ]; then
  echo -e "   ${RED}ERREUR: readingTime doit etre une string ('X min'), pas un number${NC}"
  echo "$BAD_READING_TIME" | head -3 | sed 's/^/   /'
  ERRORS=$((ERRORS + 1))
else
  echo -e "   ${GREEN}OK${NC}: readingTime format correct"
fi

# keywords doit etre un array [] pas un objet {}
BAD_KEYWORDS=$(grep -P "keywords:\s*\{" "$ARTICLES_FILE" || true)
if [ -n "$BAD_KEYWORDS" ]; then
  echo -e "   ${RED}ERREUR: keywords doit etre un array [], pas un objet${NC}"
  echo "$BAD_KEYWORDS" | head -3 | sed 's/^/   /'
  ERRORS=$((ERRORS + 1))
else
  echo -e "   ${GREEN}OK${NC}: keywords format correct"
fi

# id doit etre un number
BAD_ID=$(grep -P "id:\s*'" "$ARTICLES_FILE" || true)
if [ -n "$BAD_ID" ]; then
  echo -e "   ${RED}ERREUR: id doit etre un number, pas une string${NC}"
  echo "$BAD_ID" | head -3 | sed 's/^/   /'
  ERRORS=$((ERRORS + 1))
else
  echo -e "   ${GREEN}OK${NC}: id format correct"
fi
echo ""

# 6. Verifier presence des champs obligatoires
echo "6. Verification champs obligatoires..."
ARTICLE_COUNT=$(grep -c "slug: '" "$ARTICLES_FILE")
echo "   Nombre d'articles: $ARTICLE_COUNT"

# Compter les articles avec chaque champ
TITLE_COUNT=$(grep -c "title: '" "$ARTICLES_FILE")
CATEGORY_COUNT=$(grep -c "category: '" "$ARTICLES_FILE")
CONTENT_COUNT=$(grep -c "content: " "$ARTICLES_FILE")

if [ "$TITLE_COUNT" -lt "$ARTICLE_COUNT" ]; then
  echo -e "   ${YELLOW}WARNING: Certains articles n'ont pas de title${NC}"
  WARNINGS=$((WARNINGS + 1))
fi

if [ "$CATEGORY_COUNT" -lt "$ARTICLE_COUNT" ]; then
  echo -e "   ${YELLOW}WARNING: Certains articles n'ont pas de category${NC}"
  WARNINGS=$((WARNINGS + 1))
fi

if [ "$CONTENT_COUNT" -lt "$ARTICLE_COUNT" ]; then
  echo -e "   ${YELLOW}WARNING: Certains articles n'ont pas de content${NC}"
  WARNINGS=$((WARNINGS + 1))
fi

if [ $WARNINGS -eq 0 ]; then
  echo -e "   ${GREEN}OK${NC}: Tous les champs obligatoires sont presents"
fi
echo ""

# 7. Verifier absence de H1 dans content
echo "7. Verification absence H1 dans content..."
H1_IN_CONTENT=$(grep -c "^# " "$ARTICLES_FILE" 2>/dev/null || true)
H1_IN_CONTENT=${H1_IN_CONTENT:-0}
if [ "$H1_IN_CONTENT" -gt 0 ]; then
  echo -e "   ${RED}ERREUR: $H1_IN_CONTENT H1 trouves dans content${NC}"
  echo "   Le H1 doit etre rendu par le composant, pas dans le markdown"
  grep -n "^# " "$ARTICLES_FILE" | head -5 | sed 's/^/   /'
  ERRORS=$((ERRORS + 1))
else
  echo -e "   ${GREEN}OK${NC}: Aucun H1 dans content"
fi
echo ""

# 8. Test de build
echo "8. Test de build TypeScript..."
BUILD_OUTPUT=$(npm run build 2>&1)
BUILD_STATUS=$?
if [ $BUILD_STATUS -eq 0 ]; then
  echo -e "   ${GREEN}OK${NC}: Build reussi"
else
  echo -e "   ${RED}ERREUR: Build echoue${NC}"
  echo "   Derniere ligne d'erreur:"
  echo "$BUILD_OUTPUT" | tail -5 | sed 's/^/   /'
  ERRORS=$((ERRORS + 1))
fi
echo ""

# 9. Resume
echo "=============================================="
echo "  RESULTAT GATE 3.1"
echo "=============================================="
echo "  Articles: $ARTICLE_COUNT"
echo "  Erreurs:  $ERRORS"
echo "  Warnings: $WARNINGS"
echo "  Backup:   $BACKUP_FILE"
echo ""

if [ $ERRORS -gt 0 ]; then
  echo -e "  ${RED}GATE 3.1: FAIL${NC}"
  echo "  $ERRORS erreur(s) detectee(s)"
  echo ""

  # Rollback automatique
  if [ "$ENABLE_ROLLBACK" == "true" ]; then
    echo "  ═══════════════════════════════════════════"
    echo "  ROLLBACK AUTOMATIQUE"
    echo "  ═══════════════════════════════════════════"
    rollback_articles
    echo ""
  fi

  echo "  ═══════════════════════════════════════════"
  echo -e "  ${RED}⚠️ ESCALADE HUMAINE REQUISE${NC}"
  echo "  ═══════════════════════════════════════════"
  echo ""
  echo "  ERREUR(S) DETECTEE(S):"
  echo "    → Voir details ci-dessus"
  echo ""
  echo "  ACTIONS POSSIBLES:"
  echo "    1. Corriger manuellement et re-executer"
  echo "    2. Restaurer depuis: $BACKUP_FILE"
  echo "    3. Desactiver rollback: ENABLE_ROLLBACK=false"
  echo ""
  echo "=============================================="
  exit 1
else
  if [ $WARNINGS -gt 0 ]; then
    echo -e "  ${YELLOW}GATE 3.1: PASS avec warnings${NC}"
    echo "  $WARNINGS warning(s) a considerer"
  else
    echo -e "  ${GREEN}GATE 3.1: PASS${NC}"
  fi
  echo "  → Tous les tests passent"

  # Nettoyer ancien backup si succes
  echo ""
  echo "  Backup conserve 24h: $BACKUP_FILE"
  # Supprimer backups de plus de 24h
  find "$BACKUP_DIR" -name "articles-*.ts" -mtime +1 -delete 2>/dev/null || true

  echo "=============================================="
  exit 0
fi
