// Generate sitemap.xml for static export
const fs = require('fs');
const path = require('path');

const domain = 'nettoyage-canape-a-domicile.fr';
const baseUrl = `https://${domain}`;
const today = new Date().toISOString().split('T')[0];

// Service slugs
const services = [
  'nettoyage-canape-tissu',
  'nettoyage-canape-cuir',
  'nettoyage-canape-microfibre',
  'nettoyage-canape-velours',
  'detachage-canape',
  'desinfection-canape',
  'nettoyage-matelas',
  'nettoyage-tapis-moquette',
  'nettoyage-fauteuil',
  'nettoyage-chaise',
];

// Location slugs
const locations = [
  'romainville', 'pantin', 'bobigny', 'montreuil', 'bagnolet',
  'noisy-le-sec', 'bondy', 'les-lilas', 'le-pre-saint-gervais',
  'rosny-sous-bois', 'villemomble', 'paris-19', 'paris-20',
  'paris-11', 'paris-10', 'vincennes', 'fontenay-sous-bois',
  'nogent-sur-marne',
];

// Article slugs
const articles = [
  'guide-complet-nettoyer-canape',
  'nettoyer-canape-tissu',
  'nettoyer-canape-cuir',
  'nettoyer-canape-microfibre',
  'nettoyer-canape-velours',
  'comparatif-techniques-nettoyage-canape',
  'guide-detachage-canape',
  'enlever-tache-cafe-the-canape',
  'enlever-tache-vin-rouge-canape',
  'enlever-tache-encre-canape',
  'urgence-produit-renverse-canape',
  'entretien-regulier-canape',
  'desinfection-canape-guide',
  'eliminer-acariens-canape',
  'odeurs-canape-solutions',
  'protection-canape-apres-nettoyage',
  'quand-faire-nettoyer-canape',
  'tarif-nettoyage-canape-professionnel',
  'temps-sechage-canape',
  'pro-vs-diy-nettoyage-canape',
];

function generateUrl(loc, priority, changefreq) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Static pages
sitemap += generateUrl(baseUrl, '1.0', 'weekly') + '\n';
sitemap += generateUrl(`${baseUrl}/services`, '0.9', 'weekly') + '\n';
sitemap += generateUrl(`${baseUrl}/blog`, '0.8', 'daily') + '\n';
sitemap += generateUrl(`${baseUrl}/zones`, '0.7', 'monthly') + '\n';
sitemap += generateUrl(`${baseUrl}/contact`, '0.6', 'monthly') + '\n';

// Service pages
services.forEach(slug => {
  sitemap += generateUrl(`${baseUrl}/services/${slug}`, '0.8', 'weekly') + '\n';
});

// Service + City pages
services.forEach(service => {
  locations.forEach(city => {
    sitemap += generateUrl(`${baseUrl}/services/${service}/${city}`, '0.7', 'weekly') + '\n';
  });
});

// Blog articles
articles.forEach(slug => {
  sitemap += generateUrl(`${baseUrl}/blog/${slug}`, '0.7', 'monthly') + '\n';
});

sitemap += `</urlset>`;

// Write sitemap.xml
const publicDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml generated with', sitemap.match(/<url>/g).length, 'URLs');

// Generate robots.txt
const robots = `# Robots.txt - ${domain}
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: ${baseUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
console.log('✅ robots.txt generated');
