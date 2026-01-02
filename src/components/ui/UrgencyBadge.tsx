'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UrgencyBadgeProps {
  variant?: 'default' | 'compact' | 'pulse' | 'banner';
  className?: string;
  messages?: string[];
  rotationInterval?: number;
}

const defaultMessages = [
  'Plus que 3 créneaux cette semaine',
  'Devis gratuit - Sans engagement',
  'Réponse garantie sous 2h',
  'Intervention rapide disponible',
];

export default function UrgencyBadge({
  variant = 'default',
  className = '',
  messages = defaultMessages,
  rotationInterval = 4000,
}: UrgencyBadgeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [messages.length, rotationInterval]);

  const baseStyles = {
    default: 'bg-amber-50 border border-amber-200 text-amber-800',
    compact: 'bg-amber-500/10 text-amber-700',
    pulse: 'bg-red-50 border border-red-200 text-red-700',
    banner: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
  };

  const iconStyles = {
    default: 'text-amber-500',
    compact: 'text-amber-600',
    pulse: 'text-red-500',
    banner: 'text-white',
  };

  const sizeStyles = {
    default: 'px-4 py-2.5 rounded-xl',
    compact: 'px-3 py-1.5 rounded-lg text-sm',
    pulse: 'px-4 py-2.5 rounded-xl',
    banner: 'px-6 py-3 rounded-2xl',
  };

  return (
    <div
      className={`inline-flex items-center gap-2 ${baseStyles[variant]} ${sizeStyles[variant]} ${className}`}
      role="status"
      aria-live="polite"
    >
      {/* Icon */}
      <div className={`flex-shrink-0 ${iconStyles[variant]}`}>
        {variant === 'pulse' ? (
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {/* Rotating Text */}
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="font-medium"
        >
          {messages[currentIndex]}
        </motion.span>
      </AnimatePresence>

      {/* Optional flame icon for urgency */}
      {variant === 'pulse' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-4 h-4 ${iconStyles[variant]}`}
        >
          <path
            fillRule="evenodd"
            d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0113.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
}
