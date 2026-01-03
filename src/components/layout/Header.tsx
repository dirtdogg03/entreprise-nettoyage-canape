'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { company } from '@/lib/data/company';
import PhoneButton from '@/components/ui/PhoneButton';

// Navigation principale - 5 liens seulement (optimal SEO)
const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Zones', href: '/zones' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  // Fermer le menu mobile avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

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
