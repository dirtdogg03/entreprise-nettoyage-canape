#!/bin/bash
# =============================================================================
# Test des accents français
# Vérifie que tous les fichiers ont des accents corrects
# =============================================================================

set -e

echo ""
echo "══════════════════════════════════════════════════════════"
echo "  🇫🇷 TEST ACCENTS FRANÇAIS"
echo "══════════════════════════════════════════════════════════"
echo ""

# Vérifier que le script existe
if [ ! -f "scripts/fix-french-accents.js" ]; then
  echo "❌ ERREUR: scripts/fix-french-accents.js introuvable"
  exit 1
fi

# Vérifier les fichiers de données
echo "📁 Vérification des fichiers de données..."
RESULT=$(node scripts/fix-french-accents.js --check src/lib/data/*.ts 2>&1)
DATA_ISSUES=$(echo "$RESULT" | grep "problème(s) trouvé(s)" | grep -oE "[0-9]+")

if [ "$DATA_ISSUES" != "0" ] && [ -n "$DATA_ISSUES" ]; then
  echo "$RESULT"
  echo ""
  echo "❌ FAIL: $DATA_ISSUES problème(s) d'accent dans les fichiers de données"
  echo "   → Exécutez: node scripts/fix-french-accents.js --fix src/lib/data/*.ts"
  exit 1
fi

echo "   ✅ Fichiers de données OK"

# Vérifier les composants (texte visible)
echo "📁 Vérification des composants..."
RESULT=$(node scripts/fix-french-accents.js --check src/components/**/*.tsx src/app/**/*.tsx 2>&1)
COMP_ISSUES=$(echo "$RESULT" | grep "problème(s) trouvé(s)" | grep -oE "[0-9]+")

if [ "$COMP_ISSUES" != "0" ] && [ -n "$COMP_ISSUES" ]; then
  echo "$RESULT"
  echo ""
  echo "❌ FAIL: $COMP_ISSUES problème(s) d'accent dans les composants"
  echo "   → Exécutez: node scripts/fix-french-accents.js --fix src/components/**/*.tsx src/app/**/*.tsx"
  exit 1
fi

echo "   ✅ Composants OK"

echo ""
echo "══════════════════════════════════════════════════════════"
echo "  ✅ TEST ACCENTS: PASS"
echo "══════════════════════════════════════════════════════════"
echo ""
