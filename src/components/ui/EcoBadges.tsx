'use client';

import { motion } from 'framer-motion';

interface EcoBadgesProps {
  variant?: 'default' | 'compact' | 'inline' | 'cards';
  className?: string;
}

const ecoBadges = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
      </svg>
    ),
    title: 'Produits écologiques',
    description: 'Certifiés biodégradables',
    shortTitle: 'Éco-certifié',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    ),
    title: 'Sans substances nocives',
    description: 'Sûr pour enfants et animaux',
    shortTitle: 'Non toxique',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
      </svg>
    ),
    title: 'Respect des tissus',
    description: 'Techniques douces certifiées',
    shortTitle: 'Certifié',
  },
];

export default function EcoBadges({ variant = 'default', className = '' }: EcoBadgesProps) {
  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap items-center gap-4 ${className}`}>
        {ecoBadges.map((badge, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1.5 text-emerald-700 text-sm"
          >
            <span className="text-emerald-500">{badge.icon}</span>
            <span>{badge.shortTitle}</span>
          </span>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {ecoBadges.map((badge, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1.5 rounded-lg"
          >
            <span className="text-emerald-500 [&>svg]:w-4 [&>svg]:h-4">{badge.icon}</span>
            <span>{badge.shortTitle}</span>
          </span>
        ))}
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
        {ecoBadges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
              {badge.icon}
            </div>
            <h3 className="font-semibold text-slate-deep mb-1">{badge.title}</h3>
            <p className="text-sm text-slate-deep/60">{badge.description}</p>
          </motion.div>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-emerald-50 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-emerald-800">Engagement Éco-Responsable</h3>
          <p className="text-sm text-emerald-700/70">Pour votre santé et l&apos;environnement</p>
        </div>
      </div>

      <div className="space-y-3">
        {ecoBadges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <span className="text-emerald-500 flex-shrink-0 mt-0.5 [&>svg]:w-5 [&>svg]:h-5">
              {badge.icon}
            </span>
            <div>
              <p className="font-medium text-emerald-800 text-sm">{badge.title}</p>
              <p className="text-xs text-emerald-700/60">{badge.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Footer-specific eco badges (horizontal strip)
export function EcoFooterBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 text-sm ${className}`}>
      {ecoBadges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2 text-white/70">
          <span className="text-emerald-400 [&>svg]:w-4 [&>svg]:h-4">{badge.icon}</span>
          <span>{badge.shortTitle}</span>
        </div>
      ))}
    </div>
  );
}
