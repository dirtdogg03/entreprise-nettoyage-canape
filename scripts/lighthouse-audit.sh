#!/bin/bash
# lighthouse-audit.sh - Wrapper Lighthouse pour WSL2
# Usage: ./scripts/lighthouse-audit.sh [URL]
# Defaut: http://localhost:3000
#
# Ce script configure automatiquement CHROME_PATH pour utiliser
# Chrome installe dans WSL plutot que Chrome Windows.

set -e

URL="${1:-http://localhost:3000}"
OUTPUT_FILE="/tmp/lighthouse-audit-$$.json"
THRESHOLD=90

# Configuration Chrome pour WSL2
export CHROME_PATH="/usr/bin/google-chrome-stable"

# Verifier que Chrome existe
if [ ! -x "$CHROME_PATH" ]; then
    echo "ERREUR: Chrome non trouve a $CHROME_PATH"
    echo "Installer avec: sudo apt install google-chrome-stable"
    exit 1
fi

# Verifier que lighthouse est installe
if ! command -v lighthouse &> /dev/null; then
    echo "ERREUR: Lighthouse non installe"
    echo "Installer avec: npm install -g lighthouse"
    exit 1
fi

echo "======================================"
echo "LIGHTHOUSE AUDIT"
echo "======================================"
echo "URL: $URL"
echo "Chrome: $CHROME_PATH"
echo ""
echo "Analyse en cours..."
echo ""

# Executer Lighthouse
lighthouse "$URL" \
  --output=json \
  --output-path="$OUTPUT_FILE" \
  --chrome-flags="--headless --no-sandbox --disable-gpu --disable-dev-shm-usage" \
  --only-categories=performance,accessibility,best-practices,seo \
  --quiet

# Parser les resultats
PERF=$(node -e "console.log(Math.round(require('$OUTPUT_FILE').categories.performance.score * 100))")
A11Y=$(node -e "console.log(Math.round(require('$OUTPUT_FILE').categories.accessibility.score * 100))")
BP=$(node -e "console.log(Math.round(require('$OUTPUT_FILE').categories['best-practices'].score * 100))")
SEO=$(node -e "console.log(Math.round(require('$OUTPUT_FILE').categories.seo.score * 100))")

echo "RESULTATS:"
echo "  Performance:    $PERF"
echo "  Accessibility:  $A11Y"
echo "  Best Practices: $BP"
echo "  SEO:            $SEO"
echo ""

# Nettoyer
rm -f "$OUTPUT_FILE"

# Verifier le seuil
if [ "$PERF" -ge "$THRESHOLD" ] && [ "$A11Y" -ge "$THRESHOLD" ] && [ "$BP" -ge "$THRESHOLD" ] && [ "$SEO" -ge "$THRESHOLD" ]; then
  echo "STATUS: PASS (tous >= $THRESHOLD)"
  exit 0
else
  echo "STATUS: FAIL (au moins un score < $THRESHOLD)"
  exit 1
fi
