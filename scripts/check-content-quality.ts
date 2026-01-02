#!/usr/bin/env ts-node

/**
 * Script de vérification de la qualité du contenu
 * Usage: ts-node scripts/check-content-quality.ts
 */

import {
  getCityServiceContent,
  getAvailableCities
} from '../src/lib/data/content/variations/city-service-content';

// Configuration des seuils de qualité
const QUALITY_THRESHOLDS = {
  minLocalIntroLength: 200,
  minChallengesLength: 200,
  minTestimonialLength: 150,
  minLocalTipsLength: 150,
  minStatsLength: 30,
  minTotalLength: 500,
};

interface QualityReport {
  city: string;
  service: string;
  passed: boolean;
  issues: string[];
  stats: {
    localIntroLength: number;
    challengesLength: number;
    testimonialLength: number;
    localTipsLength: number;
    statsLength: number;
    totalLength: number;
  };
}

const services = [
  'nettoyage-canape-tissu',
  'nettoyage-canape-cuir',
  'nettoyage-canape-microfibre',
  'nettoyage-canape-velours',
  'detachage-canape',
  'desinfection-canape',
  'nettoyage-fauteuil',
  'nettoyage-chaise',
  'nettoyage-matelas',
  'nettoyage-tapis-moquette'
];

function checkContentQuality(city: string, service: string): QualityReport {
  const content = getCityServiceContent(city, service);

  const issues: string[] = [];

  if (!content) {
    return {
      city,
      service,
      passed: false,
      issues: ['Contenu non trouvé'],
      stats: {
        localIntroLength: 0,
        challengesLength: 0,
        testimonialLength: 0,
        localTipsLength: 0,
        statsLength: 0,
        totalLength: 0,
      },
    };
  }

  // Vérifier les longueurs
  const stats = {
    localIntroLength: content.localIntro.length,
    challengesLength: content.challenges.length,
    testimonialLength: content.testimonial.quote.length,
    localTipsLength: content.localTips.length,
    statsLength: content.stats.length,
    totalLength:
      content.localIntro.length +
      content.challenges.length +
      content.testimonial.quote.length +
      content.localTips.length +
      content.stats.length,
  };

  if (stats.localIntroLength < QUALITY_THRESHOLDS.minLocalIntroLength) {
    issues.push(`Intro trop courte: ${stats.localIntroLength} < ${QUALITY_THRESHOLDS.minLocalIntroLength}`);
  }

  if (stats.challengesLength < QUALITY_THRESHOLDS.minChallengesLength) {
    issues.push(`Challenges trop court: ${stats.challengesLength} < ${QUALITY_THRESHOLDS.minChallengesLength}`);
  }

  if (stats.testimonialLength < QUALITY_THRESHOLDS.minTestimonialLength) {
    issues.push(`Testimonial trop court: ${stats.testimonialLength} < ${QUALITY_THRESHOLDS.minTestimonialLength}`);
  }

  if (stats.localTipsLength < QUALITY_THRESHOLDS.minLocalTipsLength) {
    issues.push(`Tips trop courts: ${stats.localTipsLength} < ${QUALITY_THRESHOLDS.minLocalTipsLength}`);
  }

  if (stats.statsLength < QUALITY_THRESHOLDS.minStatsLength) {
    issues.push(`Stats trop courtes: ${stats.statsLength} < ${QUALITY_THRESHOLDS.minStatsLength}`);
  }

  if (stats.totalLength < QUALITY_THRESHOLDS.minTotalLength) {
    issues.push(`Total trop court: ${stats.totalLength} < ${QUALITY_THRESHOLDS.minTotalLength}`);
  }

  // Vérifier structure du témoignage
  if (!content.testimonial.name || content.testimonial.name.length < 3) {
    issues.push('Nom du témoignage invalide');
  }

  if (!content.testimonial.neighborhood || content.testimonial.neighborhood.length < 3) {
    issues.push('Quartier du témoignage invalide');
  }

  return {
    city,
    service,
    passed: issues.length === 0,
    issues,
    stats,
  };
}

function runQualityCheck() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('📊 VÉRIFICATION QUALITÉ DU CONTENU');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const cities = getAvailableCities();
  const reports: QualityReport[] = [];

  let totalChecks = 0;
  let passedChecks = 0;
  let failedChecks = 0;

  cities.forEach(city => {
    services.forEach(service => {
      const report = checkContentQuality(city, service);
      reports.push(report);

      totalChecks++;
      if (report.passed) {
        passedChecks++;
      } else {
        failedChecks++;
      }
    });
  });

  // Afficher les échecs
  const failures = reports.filter(r => !r.passed);

  if (failures.length > 0) {
    console.log('❌ ÉCHECS DE QUALITÉ\n');

    failures.forEach(failure => {
      console.log(`\n${failure.city} / ${failure.service}:`);
      failure.issues.forEach(issue => {
        console.log(`  - ${issue}`);
      });
    });

    console.log('\n');
  }

  // Statistiques globales
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('📈 STATISTIQUES GLOBALES');
  console.log('═══════════════════════════════════════════════════════════════\n');

  console.log(`Total de vérifications  : ${totalChecks}`);
  console.log(`✅ Réussies             : ${passedChecks} (${((passedChecks / totalChecks) * 100).toFixed(1)}%)`);
  console.log(`❌ Échouées             : ${failedChecks} (${((failedChecks / totalChecks) * 100).toFixed(1)}%)`);

  // Statistiques de longueur
  const avgStats = reports.reduce(
    (acc, r) => {
      acc.localIntro += r.stats.localIntroLength;
      acc.challenges += r.stats.challengesLength;
      acc.testimonial += r.stats.testimonialLength;
      acc.localTips += r.stats.localTipsLength;
      acc.stats += r.stats.statsLength;
      acc.total += r.stats.totalLength;
      return acc;
    },
    { localIntro: 0, challenges: 0, testimonial: 0, localTips: 0, stats: 0, total: 0 }
  );

  const count = reports.length;

  console.log('\n📏 LONGUEURS MOYENNES (caractères)');
  console.log('─────────────────────────────────────');
  console.log(`Local Intro    : ${Math.round(avgStats.localIntro / count)}`);
  console.log(`Challenges     : ${Math.round(avgStats.challenges / count)}`);
  console.log(`Testimonial    : ${Math.round(avgStats.testimonial / count)}`);
  console.log(`Local Tips     : ${Math.round(avgStats.localTips / count)}`);
  console.log(`Stats          : ${Math.round(avgStats.stats / count)}`);
  console.log(`───────────────────────────────────`);
  console.log(`TOTAL          : ${Math.round(avgStats.total / count)}`);

  // Résumé par ville
  console.log('\n🏙️  RÉSUMÉ PAR VILLE');
  console.log('─────────────────────────────────────');

  const citySummary = new Map<string, { passed: number; failed: number }>();

  reports.forEach(r => {
    if (!citySummary.has(r.city)) {
      citySummary.set(r.city, { passed: 0, failed: 0 });
    }

    const summary = citySummary.get(r.city)!;
    if (r.passed) {
      summary.passed++;
    } else {
      summary.failed++;
    }
  });

  Array.from(citySummary.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([city, summary]) => {
      const total = summary.passed + summary.failed;
      const percentage = ((summary.passed / total) * 100).toFixed(0);
      const status = summary.failed === 0 ? '✅' : '⚠️';

      console.log(`${status} ${city.padEnd(25)} : ${summary.passed}/${total} (${percentage}%)`);
    });

  console.log('\n═══════════════════════════════════════════════════════════════');

  if (failedChecks === 0) {
    console.log('✅ TOUS LES TESTS SONT PASSÉS !');
  } else {
    console.log(`⚠️  ${failedChecks} PROBLÈMES DÉTECTÉS`);
  }

  console.log('═══════════════════════════════════════════════════════════════\n');

  // Exit code
  process.exit(failedChecks > 0 ? 1 : 0);
}

// Exécuter
runQualityCheck();
