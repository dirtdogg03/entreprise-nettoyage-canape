'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Location {
  name: string;
  slug: string;
  postalCode: string;
  departmentCode: string;
}

interface CitySearchProps {
  locations: Location[];
}

export default function CitySearch({ locations }: CitySearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredLocations = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return locations
      .filter(
        (loc) =>
          loc.name.toLowerCase().includes(q) ||
          loc.postalCode.includes(q)
      )
      .slice(0, 6);
  }, [query, locations]);

  const showResults = isFocused && query.trim().length > 0;

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Rechercher votre ville ou code postal..."
          aria-label="Rechercher une ville"
          className="w-full px-6 py-4 pl-14 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:border-gold focus:bg-white/20 transition-all text-lg"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-white/50"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {filteredLocations.length > 0 ? (
              <ul role="listbox" aria-label="Résultats de recherche">
                {filteredLocations.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/services/nettoyage-canape/${location.slug}`}
                      className="flex items-center justify-between px-6 py-4 hover:bg-pearlescent transition-colors group"
                    >
                      <div>
                        <span className="font-bold text-slate-deep group-hover:text-gold transition-colors">
                          {location.name}
                        </span>
                        <span className="text-slate-deep/50 ml-2">
                          ({location.postalCode})
                        </span>
                      </div>
                      <span className="font-mono text-xs text-gold bg-gold/10 px-2 py-1 rounded">
                        {location.departmentCode}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-6 py-4 text-slate-deep/60">
                Aucune ville trouvée pour &quot;{query}&quot;
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
