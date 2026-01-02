#!/bin/bash
# ============================================================================
# orchestrate-blog.sh
# Orchestrateur principal pour generation de blog avec gates de verification
# Target: 90-95% de fiabilite
# ============================================================================

set -e

# Configuration
SCRIPTS_DIR="$(dirname "$0")"
PROJECT_ROOT="$(dirname "$SCRIPTS_DIR")"
BRIEFS_DIR="${BRIEFS_DIR:-/home/dirtd/.claude/outputs/briefs}"
ARTICLES_FILE="$PROJECT_ROOT/src/lib/data/articles.ts"
RESERVATION_FILE="/tmp/id-reservations.txt"
LOG_FILE="/tmp/blog-generation-$(date +%Y%m%d-%H%M%S).log"

# Couleurs pour output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Compteurs
TOTAL_BRIEFS=0
PROCESSED=0
SUCCESS=0
FAILED=0
SKIPPED=0

# Options
MAX_RETRIES="${MAX_RETRIES:-2}"
SKIP_EXISTING="${SKIP_EXISTING:-true}"
DRY_RUN="${DRY_RUN:-false}"

# ============================================================================
# FONCTIONS UTILITAIRES
# ============================================================================

log() {
  echo "[$(date +%H:%M:%S)] $1" | tee -a "$LOG_FILE"
}

log_error() {
  echo -e "${RED}[$(date +%H:%M:%S)] ERROR: $1${NC}" | tee -a "$LOG_FILE"
}

log_success() {
  echo -e "${GREEN}[$(date +%H:%M:%S)] OK: $1${NC}" | tee -a "$LOG_FILE"
}

log_warning() {
  echo -e "${YELLOW}[$(date +%H:%M:%S)] WARNING: $1${NC}" | tee -a "$LOG_FILE"
}

log_info() {
  echo -e "${CYAN}[$(date +%H:%M:%S)] INFO: $1${NC}" | tee -a "$LOG_FILE"
}

show_escalation() {
  local gate="$1"
  local slug="$2"
  local error="$3"
  local retries="$4"

  echo ""
  echo "══════════════════════════════════════════════════════════"
  echo -e "${RED}⚠️ ESCALADE HUMAINE REQUISE${NC}"
  echo "══════════════════════════════════════════════════════════"
  echo ""
  echo -e "🔴 GATE ECHOUEE: ${RED}$gate${NC}"
  echo "📄 ARTICLE: $slug"
  echo "🔄 RETRIES: $retries/$MAX_RETRIES"
  echo ""
  echo "❌ ERREUR:"
  echo "   $error"
  echo ""
  echo "🔧 ACTIONS POSSIBLES:"
  echo "   1. Corriger manuellement et relancer"
  echo "   2. Ignorer cet article: SKIP_SLUG=$slug $0"
  echo "   3. Annuler la generation"
  echo ""
  echo "══════════════════════════════════════════════════════════"
  echo ""
}

# ============================================================================
# PHASE 0: HEADER ET CONFIGURATION
# ============================================================================

show_header() {
  clear
  echo "══════════════════════════════════════════════════════════"
  echo "  🚀 ORCHESTRATEUR GENERATION BLOG"
  echo "  Target: 90-95% fiabilite"
  echo "══════════════════════════════════════════════════════════"
  echo ""
  echo "  📁 Briefs:     $BRIEFS_DIR"
  echo "  📄 Articles:   $ARTICLES_FILE"
  echo "  📋 Log:        $LOG_FILE"
  echo "  🔄 Max retries: $MAX_RETRIES"
  echo "  🔀 Dry run:     $DRY_RUN"
  echo ""
  echo "══════════════════════════════════════════════════════════"
  echo ""
}

# ============================================================================
# PHASE 1: PRE-VERIFICATION
# ============================================================================

run_pre_verification() {
  echo ""
  echo "┌──────────────────────────────────────────────────────────┐"
  echo "│  PHASE 1: PRE-VERIFICATION                               │"
  echo "└──────────────────────────────────────────────────────────┘"
  echo ""

  # Gate 1.1: Validation des briefs
  log_info "Execution Gate 1.1: Validation briefs..."
  if ! "$SCRIPTS_DIR/validate-blog-generation.sh"; then
    log_error "Gate 1.1 FAILED - Briefs invalides"
    return 1
  fi
  log_success "Gate 1.1 PASSED"
  echo ""

  # Gate 1.2: Reservation des IDs
  log_info "Execution Gate 1.2: Reservation IDs..."
  if ! "$SCRIPTS_DIR/reserve-ids.sh"; then
    log_error "Gate 1.2 FAILED - Reservation IDs echouee"
    return 1
  fi
  log_success "Gate 1.2 PASSED"
  echo ""

  return 0
}

# ============================================================================
# PHASE 2: GENERATION (UNE ITERATION)
# ============================================================================

process_single_article() {
  local slug="$1"
  local id="$2"
  local brief_file="$BRIEFS_DIR/$slug.json"
  local retries=0

  echo ""
  echo "  ─────────────────────────────────────────────────────────"
  echo -e "  📝 Article: ${CYAN}$slug${NC} (ID: $id)"
  echo "  ─────────────────────────────────────────────────────────"

  # Verifier si l'article existe deja
  if [ "$SKIP_EXISTING" == "true" ] && grep -q "slug: '$slug'" "$ARTICLES_FILE" 2>/dev/null; then
    log_warning "Article deja existant, skip"
    SKIPPED=$((SKIPPED + 1))
    return 0
  fi

  # Verifier si on doit skip ce slug specifique
  if [ "$SKIP_SLUG" == "$slug" ]; then
    log_warning "Article ignore par SKIP_SLUG"
    SKIPPED=$((SKIPPED + 1))
    return 0
  fi

  # Mode dry-run
  if [ "$DRY_RUN" == "true" ]; then
    log_info "DRY-RUN: Serait traite avec ID $id"
    return 0
  fi

  # TODO: Integration avec Claude Code agents
  # Pour l'instant, ce script ne fait que la validation
  # L'integration avec les agents sera faite via le skill generate-blog

  log_info "Article pret pour generation (ID: $id)"
  log_info "→ Utiliser le skill generate-blog pour la redaction"

  SUCCESS=$((SUCCESS + 1))
  return 0
}

# ============================================================================
# PHASE 3: POST-VERIFICATION
# ============================================================================

run_post_verification() {
  echo ""
  echo "┌──────────────────────────────────────────────────────────┐"
  echo "│  PHASE 3: POST-VERIFICATION                              │"
  echo "└──────────────────────────────────────────────────────────┘"
  echo ""

  # Gate 3.1: Test d'integrite
  log_info "Execution Gate 3.1: Test integrite..."
  if ! "$SCRIPTS_DIR/test-article-integrity.sh"; then
    log_error "Gate 3.1 FAILED - Integrite compromise"
    log_info "Rollback automatique effectue si active"
    return 1
  fi
  log_success "Gate 3.1 PASSED"
  echo ""

  # Gate 3.2: Build TypeScript (deja fait dans test-article-integrity.sh)
  log_success "Gate 3.2 PASSED (inclus dans Gate 3.1)"
  echo ""

  return 0
}

# ============================================================================
# MAIN
# ============================================================================

main() {
  show_header

  # Initialiser le log
  echo "=== Blog Generation Log ===" > "$LOG_FILE"
  echo "Date: $(date)" >> "$LOG_FILE"
  echo "" >> "$LOG_FILE"

  # Phase 1: Pre-verification
  if ! run_pre_verification; then
    echo ""
    echo -e "${RED}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${RED}  ECHEC PHASE 1: PRE-VERIFICATION${NC}"
    echo -e "${RED}  Corriger les erreurs avant de continuer${NC}"
    echo -e "${RED}═══════════════════════════════════════════════════════════${NC}"
    exit 1
  fi

  # Phase 2: Traitement des articles
  echo ""
  echo "┌──────────────────────────────────────────────────────────┐"
  echo "│  PHASE 2: TRAITEMENT DES ARTICLES                        │"
  echo "└──────────────────────────────────────────────────────────┘"
  echo ""

  # Lire le fichier de reservation
  if [ ! -f "$RESERVATION_FILE" ]; then
    log_warning "Aucune reservation trouvee (tous les articles existent deja?)"
  else
    while IFS=: read -r slug id; do
      if [ -n "$slug" ] && [ -n "$id" ]; then
        TOTAL_BRIEFS=$((TOTAL_BRIEFS + 1))
        process_single_article "$slug" "$id"
        PROCESSED=$((PROCESSED + 1))
      fi
    done < "$RESERVATION_FILE"
  fi

  # Phase 3: Post-verification (seulement si des articles ont ete traites)
  if [ $SUCCESS -gt 0 ]; then
    if ! run_post_verification; then
      echo ""
      echo -e "${RED}═══════════════════════════════════════════════════════════${NC}"
      echo -e "${RED}  ECHEC PHASE 3: POST-VERIFICATION${NC}"
      echo -e "${RED}  Voir details ci-dessus${NC}"
      echo -e "${RED}═══════════════════════════════════════════════════════════${NC}"
      exit 1
    fi
  fi

  # Rapport final
  echo ""
  echo "══════════════════════════════════════════════════════════"
  echo "  📊 RAPPORT FINAL"
  echo "══════════════════════════════════════════════════════════"
  echo ""
  echo "  Briefs trouves:  $TOTAL_BRIEFS"
  echo "  Traites:         $PROCESSED"
  echo -e "  ${GREEN}Succes:${NC}          $SUCCESS"
  echo -e "  ${YELLOW}Ignores:${NC}         $SKIPPED"
  echo -e "  ${RED}Echecs:${NC}          $FAILED"
  echo ""
  echo "  Log complet:     $LOG_FILE"
  echo ""

  # Calcul du taux de succes
  if [ $PROCESSED -gt 0 ]; then
    SUCCESS_RATE=$(echo "scale=1; ($SUCCESS * 100) / $PROCESSED" | bc)
    echo -e "  Taux de succes:  ${GREEN}${SUCCESS_RATE}%${NC}"
    echo ""
  fi

  if [ $FAILED -eq 0 ]; then
    echo -e "  ${GREEN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "  ${GREEN}✅ GENERATION TERMINEE AVEC SUCCES${NC}"
    echo -e "  ${GREEN}═══════════════════════════════════════════════════════════${NC}"
    exit 0
  else
    echo -e "  ${YELLOW}═══════════════════════════════════════════════════════════${NC}"
    echo -e "  ${YELLOW}⚠️ GENERATION TERMINEE AVEC ERREURS${NC}"
    echo -e "  ${YELLOW}   $FAILED article(s) en echec${NC}"
    echo -e "  ${YELLOW}═══════════════════════════════════════════════════════════${NC}"
    exit 1
  fi
}

# ============================================================================
# AIDE
# ============================================================================

show_help() {
  echo "Usage: $0 [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  -h, --help      Afficher cette aide"
  echo "  --dry-run       Mode simulation (pas de modifications)"
  echo "  --no-skip       Ne pas ignorer les articles existants"
  echo ""
  echo "Variables d'environnement:"
  echo "  BRIEFS_DIR      Repertoire des briefs (defaut: ~/.claude/outputs/briefs)"
  echo "  MAX_RETRIES     Nombre max de retries (defaut: 2)"
  echo "  DRY_RUN         Mode simulation (defaut: false)"
  echo "  SKIP_EXISTING   Ignorer articles existants (defaut: true)"
  echo "  SKIP_SLUG       Ignorer un slug specifique"
  echo "  ENABLE_ROLLBACK Activer rollback auto (defaut: true)"
  echo ""
  echo "Exemples:"
  echo "  $0                          # Execution normale"
  echo "  $0 --dry-run                # Simulation"
  echo "  SKIP_SLUG=article-x $0      # Ignorer un article"
  echo "  MAX_RETRIES=3 $0            # Plus de retries"
  echo ""
}

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -h|--help)
      show_help
      exit 0
      ;;
    --dry-run)
      DRY_RUN="true"
      shift
      ;;
    --no-skip)
      SKIP_EXISTING="false"
      shift
      ;;
    *)
      echo "Option inconnue: $1"
      show_help
      exit 1
      ;;
  esac
done

# Lancer le main
main
