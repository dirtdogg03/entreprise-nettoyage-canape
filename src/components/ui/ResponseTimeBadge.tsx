'use client';

import { motion } from 'framer-motion';

interface ResponseTimeBadgeProps {
  variant?: 'default' | 'compact' | 'inline' | 'prominent';
  responseTime?: string;
  className?: string;
}

export default function ResponseTimeBadge({
  variant = 'default',
  responseTime = '2h',
  className = '',
}: ResponseTimeBadgeProps) {
  const containerStyles = {
    default: 'bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3',
    compact: 'bg-emerald-500/10 rounded-lg px-3 py-1.5',
    inline: 'inline-flex',
    prominent: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl px-6 py-4 shadow-lg',
  };

  const iconStyles = {
    default: 'text-emerald-500',
    compact: 'text-emerald-600',
    inline: 'text-emerald-500',
    prominent: 'text-white',
  };

  const textStyles = {
    default: 'text-emerald-800',
    compact: 'text-emerald-700 text-sm',
    inline: 'text-emerald-700 text-sm',
    prominent: 'text-white',
  };

  const subtextStyles = {
    default: 'text-emerald-600/70 text-xs',
    compact: 'hidden',
    inline: 'hidden',
    prominent: 'text-white/80 text-sm',
  };

  if (variant === 'inline') {
    return (
      <span className={`inline-flex items-center gap-1.5 ${className}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-4 h-4 ${iconStyles[variant]}`}
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
            clipRule="evenodd"
          />
        </svg>
        <span className={textStyles[variant]}>
          Réponse sous {responseTime}
        </span>
      </span>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-3 ${containerStyles[variant]} ${className}`}
    >
      {/* Clock Icon with animation */}
      <div className={`flex-shrink-0 ${iconStyles[variant]}`}>
        {variant === 'prominent' ? (
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                clipRule="evenodd"
              />
            </svg>
            {/* Pulse effect */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
            </span>
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={variant === 'compact' ? 'w-5 h-5' : 'w-6 h-6'}
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {/* Text content */}
      <div>
        <p className={`font-semibold ${textStyles[variant]}`}>
          Réponse garantie sous {responseTime}
        </p>
        <p className={subtextStyles[variant]}>
          Du lundi au samedi, 8h-20h
        </p>
      </div>

      {/* Checkmark for default variant */}
      {variant === 'default' && (
        <div className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-emerald-500"
          >
            <path
              fillRule="evenodd"
              d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
