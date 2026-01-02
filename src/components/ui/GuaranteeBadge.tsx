'use client';

import { motion } from 'framer-motion';

interface GuaranteeBadgeProps {
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
}

export default function GuaranteeBadge({ variant = 'default', className = '' }: GuaranteeBadgeProps) {
  if (variant === 'inline') {
    return (
      <span className={`inline-flex items-center gap-1.5 text-emerald-700 font-medium ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
        </svg>
        Satisfait ou re-nettoyé
      </span>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-emerald-600">
          <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
        </svg>
        <span className="font-semibold text-emerald-800 text-sm">Garantie Satisfaction</span>
      </div>
    );
  }

  // Default variant - full badge
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-6 ${className}`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7">
            <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-bold text-emerald-900 text-lg">Satisfait ou Re-nettoyé</h3>
          <p className="text-emerald-700 mt-1 text-sm leading-relaxed">
            Si le résultat ne vous convient pas, nous revenons gratuitement pour une nouvelle intervention.
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs text-emerald-600">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Sans condition
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Sous 7 jours
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              100% gratuit
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
