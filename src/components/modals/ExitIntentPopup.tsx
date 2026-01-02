'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { company } from '@/lib/data/company';

const COOKIE_NAME = 'exit_intent_shown';
const COOKIE_EXPIRY_DAYS = 7;

interface ExitIntentPopupProps {
  disabled?: boolean;
}

export default function ExitIntentPopup({ disabled = false }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  // Check if popup was already shown
  const wasShown = useCallback(() => {
    if (typeof window === 'undefined') return true;
    return document.cookie.includes(COOKIE_NAME);
  }, []);

  // Set cookie to prevent re-showing
  const setCookie = useCallback(() => {
    const date = new Date();
    date.setTime(date.getTime() + COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    document.cookie = `${COOKIE_NAME}=true; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
  }, []);

  // Handle exit intent detection
  useEffect(() => {
    if (disabled || wasShown()) return;

    let triggered = false;

    // Desktop: Mouse leave viewport (top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered) return;
      if (e.clientY <= 0) {
        triggered = true;
        setIsOpen(true);
        setCookie();
      }
    };

    // Mobile: Back button or visibility change (less aggressive)
    const handleVisibilityChange = () => {
      if (triggered) return;
      if (document.visibilityState === 'hidden') {
        // Don't show on mobile, just set cookie to not be annoying
        // setCookie();
      }
    };

    // Add listeners
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [disabled, wasShown, setCookie]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate phone
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setError('Numéro de téléphone invalide');
      return;
    }

    if (!formData.name.trim()) {
      setError('Veuillez entrer votre nom');
      return;
    }

    setStatus('submitting');

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
    } catch {
      setStatus('error');
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-gold to-amber-500 px-6 py-8 text-center relative">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  aria-label="Fermer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Icon */}
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-white"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                  </svg>
                </div>

                <h2 id="exit-intent-title" className="text-2xl font-bold text-white mb-2">
                  Attendez !
                </h2>
                <p className="text-white/90">
                  Obtenez votre devis gratuit en 2 minutes
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-4"
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-8 h-8 text-emerald-600"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-deep mb-2">
                      Demande envoyée !
                    </h3>
                    <p className="text-slate-deep/60">
                      Nous vous recontactons sous 2h maximum.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-4 text-gold hover:underline text-sm"
                    >
                      Fermer
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Benefits */}
                    <div className="flex items-center gap-3 text-sm text-slate-deep/70 mb-4">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Sans engagement
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        100% gratuit
                      </span>
                    </div>

                    {/* Name field */}
                    <div>
                      <label htmlFor="exit-name" className="sr-only">
                        Votre nom
                      </label>
                      <input
                        id="exit-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Votre nom"
                        autoComplete="name"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                      />
                    </div>

                    {/* Phone field */}
                    <div>
                      <label htmlFor="exit-phone" className="sr-only">
                        Votre téléphone
                      </label>
                      <input
                        id="exit-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="Votre téléphone"
                        autoComplete="tel"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                      />
                    </div>

                    {/* Error message */}
                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full bg-gold text-white font-semibold py-3.5 rounded-xl hover:bg-gold/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === 'submitting' ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Envoi...
                        </>
                      ) : (
                        'Recevoir mon devis gratuit'
                      )}
                    </button>

                    {/* Trust text */}
                    <p className="text-center text-xs text-slate-deep/40">
                      Vos données restent confidentielles
                    </p>
                  </form>
                )}
              </div>

              {/* Footer with phone */}
              {status !== 'success' && (
                <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
                  <p className="text-center text-sm text-slate-deep/60">
                    Vous préférez appeler ?{' '}
                    <a
                      href={`tel:${company.phone.replace(/\s/g, '')}`}
                      className="text-gold font-semibold hover:underline"
                    >
                      {company.phone}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
