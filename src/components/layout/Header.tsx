'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { company } from '@/lib/data/company';
import PhoneButton from '@/components/ui/PhoneButton';

// Navigation principale - 5 liens seulement (optimal SEO)
const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Services', href: '/services', hasDropdown: true },
  { name: 'Zones', href: '/zones' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

// Services principaux pour dropdown (5 max - pas de mega menu)
// Choix strategique: services avec le plus de volume de recherche
const mainServices = [
  { name: 'Nettoyage Canapé', href: '/services/nettoyage-canape', description: 'Tous types de canapés' },
  { name: 'Canapé Tissu', href: '/services/nettoyage-canape-tissu', description: 'Nettoyage en profondeur' },
  { name: 'Canapé Cuir', href: '/services/nettoyage-canape-cuir', description: 'Entretien spécialisé' },
  { name: 'Détachage', href: '/services/détachage-canape', description: 'Taches tenaces' },
  { name: 'Fauteuils', href: '/services/nettoyage-fauteuil', description: 'Tous types de fauteuils' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);

  // Détection de la couleur du texte selon la page et le scroll
  const isHomePage = pathname === '/';
  const isDarkPage = !isHomePage; // Toutes les pages sauf homepage ont un hero sombre
  const shouldUseDarkText = true; // Fond blanc partout = texte sombre partout

  // Vérifie si un lien est actif (exact ou préfixe pour sous-pages)
  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer les menus avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (servicesOpen) setServicesOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen, servicesOpen]);

  // Fermer dropdown services au clic exterieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    if (servicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [servicesOpen]);

  return (
    <header className={`fixed w-full z-[100] transition-all duration-500 ${
      scrolled
        ? 'py-6 px-10 bg-white/90 backdrop-blur-md shadow-sm'
        : isDarkPage
          ? 'py-10 px-15 bg-white/90 backdrop-blur-md'
          : 'py-10 px-15 bg-transparent'
    }`}>
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center w-full">
        {/* Logo */}
        <Link href="/" className="group" aria-label={`${company.name} - Retour à l'accueil`}>
          <div className={`font-mono font-bold text-xl uppercase tracking-tighter transition-colors duration-500 ${
            shouldUseDarkText ? 'text-slate-deep' : 'text-white'
          }`}>
            {company.shortName}.<span className="text-gold">à Domicile</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-12" role="list">
            {navigation.map((item) => {
              const isActive = isActiveLink(item.href);
              const hasDropdown = 'hasDropdown' in item && item.hasDropdown;

              // Services avec dropdown
              if (hasDropdown) {
                return (
                  <li key={item.name} className="relative" ref={servicesRef}>
                    <button
                      type="button"
                      onClick={() => setServicesOpen(!servicesOpen)}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      className={`font-mono text-[0.7rem] uppercase tracking-[2px] font-bold transition-colors duration-300 hover:text-gold flex items-center gap-1 ${
                        isActive
                          ? 'text-gold'
                          : shouldUseDarkText ? 'text-slate-deep' : 'text-white/90'
                      }`}
                    >
                      {item.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className={`w-3 h-3 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>

                    {/* Dropdown Services - Simple, pas mega menu */}
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-4 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                        >
                          <div className="p-2">
                            {mainServices.map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                onClick={() => setServicesOpen(false)}
                                className="block px-4 py-3 rounded-lg hover:bg-pearlescent transition-colors group"
                              >
                                <span className="block font-bold text-sm text-slate-deep group-hover:text-gold transition-colors">
                                  {service.name}
                                </span>
                                <span className="block text-xs text-slate-deep/60">
                                  {service.description}
                                </span>
                              </Link>
                            ))}
                            <div className="border-t border-gray-100 mt-2 pt-2">
                              <Link
                                href="/services"
                                onClick={() => setServicesOpen(false)}
                                className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gold/10 transition-colors group"
                              >
                                <span className="font-mono text-xs uppercase tracking-wider font-bold text-gold">
                                  Tous les services
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gold">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              // Liens standards
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`font-mono text-[0.7rem] uppercase tracking-[2px] font-bold transition-colors duration-300 hover:text-gold ${
                      isActive
                        ? 'text-gold'
                        : shouldUseDarkText ? 'text-slate-deep' : 'text-white/90'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
            {/* PhoneButton - Click-to-call CRO (+25% conversion) */}
            {company.cro?.phoneButton?.enabled && (
              <li>
                <PhoneButton />
              </li>
            )}
            <li>
              <Link href="/contact" className="btn-luxury py-3 px-8 text-[0.7rem]">
                Devis Gratuit
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-menu"
          className={`lg:hidden font-mono text-[0.7rem] uppercase tracking-[2px] font-bold transition-colors duration-300 ${
             shouldUseDarkText ? 'text-slate-deep' : 'text-white'
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? 'Fermer' : 'Menu'}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-soft lg:hidden"
          >
            <nav aria-label="Navigation mobile">
              <ul className="flex flex-col p-8 gap-4" role="list">
                {navigation.map((item) => {
                  const isActive = isActiveLink(item.href);
                  const hasDropdown = 'hasDropdown' in item && item.hasDropdown;

                  // Services avec sous-menu expandable
                  if (hasDropdown) {
                    return (
                      <li key={item.name}>
                        <button
                          type="button"
                          onClick={() => setServicesOpen(!servicesOpen)}
                          aria-expanded={servicesOpen}
                          className={`w-full flex items-center justify-between font-mono text-sm uppercase tracking-[3px] font-bold ${
                            isActive ? 'text-gold' : 'text-slate-deep'
                          }`}
                        >
                          {item.name}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {servicesOpen && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 ml-4 space-y-2 overflow-hidden"
                            >
                              {mainServices.map((service) => (
                                <li key={service.href}>
                                  <Link
                                    href={service.href}
                                    onClick={() => { setMobileMenuOpen(false); setServicesOpen(false); }}
                                    className="block py-2 text-sm text-slate-deep/80 hover:text-gold transition-colors"
                                  >
                                    {service.name}
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link
                                  href="/services"
                                  onClick={() => { setMobileMenuOpen(false); setServicesOpen(false); }}
                                  className="block py-2 text-sm text-gold font-bold"
                                >
                                  Tous les services →
                                </Link>
                              </li>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }

                  // Liens standards
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`font-mono text-sm uppercase tracking-[3px] font-bold ${
                          isActive ? 'text-gold' : 'text-slate-deep'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
                <li className="pt-4">
                  <Link
                    href="/contact"
                    className="btn-luxury text-center block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Devis Gratuit
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}