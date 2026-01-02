'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { company } from '@/lib/data/company';

interface MobileStickyBarProps {
  scrollThreshold?: number;
}

export default function MobileStickyBar({ scrollThreshold = 300 }: MobileStickyBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  const phoneNumber = company.phone.replace(/\s/g, '');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          {/* Gradient fade effect */}
          <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />

          {/* Main bar */}
          <div className="bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 safe-area-pb">
            <div className="flex items-center gap-3">
              {/* Call button */}
              <a
                href={`tel:${phoneNumber}`}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-deep text-white font-semibold py-3.5 rounded-xl hover:bg-slate-deep/90 transition-colors"
                aria-label={`Appeler ${company.phone}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Appeler</span>
              </a>

              {/* Quote button */}
              <a
                href="/contact"
                className="flex-1 flex items-center justify-center gap-2 bg-gold text-white font-semibold py-3.5 rounded-xl hover:bg-gold/90 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Devis gratuit</span>
              </a>
            </div>

            {/* Trust indicator */}
            <p className="text-center text-xs text-slate-deep/50 mt-2">
              Réponse garantie sous 2h • Sans engagement
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
