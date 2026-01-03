'use client';

import Link from 'next/link';
import { company } from '@/lib/data/company';
import { services } from '@/lib/data/services';
import { locations, getDepartments } from '@/lib/data/locations';
import { EcoFooterBadges } from '@/components/cro/EcoFooterBadges';

// Top 15 villes par population
const topLocations = locations
  .filter((l) => l.population)
  .sort((a, b) => (b.population || 0) - (a.population || 0))
  .slice(0, 15);

// Regrouper villes par département
const departments = getDepartments();

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-deep text-white pt-20 pb-8" role="contentinfo">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Entreprise + NAP */}
          <div>
            <Link href="/" className="block mb-6" aria-label={`${company.name} - Retour à l'accueil`}>
              <div className="font-mono font-bold text-xl uppercase tracking-tighter">
                {company.shortName}.<span className="text-gold">à Domicile</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              {company.tagline}. Intervention à domicile à Paris et en petite couronne (75, 92, 93, 94).
            </p>
            {/* NAP - Name, Address, Phone */}
            <address className="not-italic text-sm text-white/80 space-y-2">
              <p className="font-semibold text-white">{company.name}</p>
              <p>
                {company.address.street}<br />
                {company.address.postalCode} {company.address.city}
              </p>
              <p>
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="text-gold hover:text-white transition-colors font-semibold"
                >
                  {company.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${company.email}`}
                  className="text-white/80 hover:text-gold transition-colors break-all"
                >
                  {company.email}
                </a>
              </p>
            </address>
            {/* Horaires */}
            <div className="mt-6 text-sm text-white/60">
              <p className="font-semibold text-white/80 mb-1">Horaires</p>
              <p>Lun-Ven: {company.businessHours.weekdays}</p>
              <p>Samedi: {company.businessHours.saturday}</p>
              <p>Dimanche: {company.businessHours.sunday}</p>
            </div>
          </div>

          {/* Column 2: Tous les Services (11) */}
          <nav aria-label="Nos services">
            <h3 className="font-mono text-xs uppercase tracking-[2px] font-bold text-gold mb-6">
              Nos Services
            </h3>
            <ul className="space-y-3" role="list">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Zones d'Intervention (15 villes principales) */}
          <nav aria-label="Zones d'intervention">
            <h3 className="font-mono text-xs uppercase tracking-[2px] font-bold text-gold mb-6">
              Nos Zones
            </h3>
            <ul className="space-y-3" role="list">
              {topLocations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/services/nettoyage-canape/${location.slug}`}
                    className="text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {location.name}
                    <span className="text-white/40 text-xs ml-1">({location.departmentCode})</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/zones"
                  className="text-sm text-gold hover:text-white transition-colors font-semibold"
                >
                  Voir toutes les villes &rarr;
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 4: Informations + Liens légaux */}
          <div>
            <nav aria-label="Informations">
              <h3 className="font-mono text-xs uppercase tracking-[2px] font-bold text-gold mb-6">
                Informations
              </h3>
              <ul className="space-y-3" role="list">
                <li>
                  <Link href="/a-propos" className="text-sm text-white/70 hover:text-gold transition-colors">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-white/70 hover:text-gold transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-white/70 hover:text-gold transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-sm text-white/70 hover:text-gold transition-colors">
                    Plan du site
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Réseaux sociaux */}
            {company.socialMedia && (
              <div className="mt-8">
                <h3 className="font-mono text-xs uppercase tracking-[2px] font-bold text-gold mb-4">
                  Suivez-nous
                </h3>
                <div className="flex gap-4">
                  {company.socialMedia.facebook && (
                    <a
                      href={company.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-gold hover:text-white transition-all"
                      aria-label="Suivez-nous sur Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  {company.socialMedia.instagram && (
                    <a
                      href={company.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-gold hover:text-white transition-all"
                      aria-label="Suivez-nous sur Instagram"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  {company.socialMedia.linkedin && (
                    <a
                      href={company.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-gold hover:text-white transition-all"
                      aria-label="Suivez-nous sur LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Départements couverts */}
            <div className="mt-8">
              <h3 className="font-mono text-xs uppercase tracking-[2px] font-bold text-gold mb-4">
                Départements
              </h3>
              <ul className="space-y-1 text-sm text-white/60">
                {departments.map((dept) => (
                  <li key={dept.code}>
                    {dept.name} ({dept.code}) - {dept.count} villes
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Eco Labels CRO - +12% trust */}
        {company.cro?.ecoLabels?.enabled && (
          <div className="mb-12 pt-8 border-t border-white/10">
            <EcoFooterBadges />
          </div>
        )}

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-xs text-white/40 text-center md:text-left">
              &copy; {currentYear} {company.name}. Tous droits réservés.
            </p>

            {/* Legal Links */}
            <nav aria-label="Informations légales">
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2" role="list">
                <li>
                  <Link
                    href="/mentions-legales"
                    className="text-xs text-white/40 hover:text-gold transition-colors"
                  >
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politique-confidentialite"
                    className="text-xs text-white/40 hover:text-gold transition-colors"
                  >
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cgv"
                    className="text-xs text-white/40 hover:text-gold transition-colors"
                  >
                    CGV
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
