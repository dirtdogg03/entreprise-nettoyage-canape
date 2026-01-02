// =============================================================================
// EcoFooterBadges - CRO Component (+12% trust)
// Labels écologiques dans le footer
// =============================================================================

import { company } from '@/lib/data/company';

export function EcoFooterBadges() {
  const ecoConfig = company.cro?.ecoLabels;

  if (!ecoConfig?.enabled) {
    return null;
  }

  // Labels par defaut si non configures
  const labels = ecoConfig.items || [
    { icon: 'leaf', label: 'Produits Ecologiques', description: 'Respectueux de l\'environnement' },
    { icon: 'recycle', label: 'Demarche Responsable', description: 'Tri et recyclage' },
    { icon: 'heart', label: 'Sans Allergenes', description: 'Produits hypoallergeniques' },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'leaf':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'recycle':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'heart':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'shield':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'sparkles':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        );
    }
  };

  return (
    <div className="text-center">
      <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-6">
        {ecoConfig.title || 'Nos Engagements'}
      </h4>
      <div className="flex flex-wrap justify-center gap-8">
        {labels.map((label, index) => (
          <div key={index} className="flex flex-col items-center max-w-[140px]">
            <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center mb-3 text-green-400">
              {getIcon(label.icon)}
            </div>
            <span className="text-sm font-medium text-white mb-1">
              {label.label}
            </span>
            {label.description && (
              <span className="text-xs text-gray-400 text-center">
                {label.description}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EcoFooterBadges;
