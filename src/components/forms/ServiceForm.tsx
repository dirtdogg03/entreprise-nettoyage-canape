'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { company } from '@/lib/data/company';
import { services } from '@/lib/data/services';
import { locations as cities } from '@/lib/data/locations';

type FormStep = 1 | 2 | 3;

interface FormData {
  service: string;
  city: string;
  name: string;
  phone: string;
  message: string;
}

interface ServiceFormProps {
  variant?: 'default' | 'sidebar' | 'inline';
  preselectedService?: string;
  preselectedCity?: string;
  className?: string;
}

export default function ServiceForm({
  variant = 'default',
  preselectedService,
  preselectedCity,
  className = '',
}: ServiceFormProps) {
  const [step, setStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>({
    service: preselectedService || '',
    city: preselectedCity || '',
    name: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateStep = (currentStep: FormStep): boolean => {
    const newErrors: Partial<FormData> = {};

    if (currentStep === 1) {
      if (!formData.service) newErrors.service = 'Sélectionnez un service';
      if (!formData.city) newErrors.city = 'Sélectionnez une ville';
    } else if (currentStep === 2) {
      if (!formData.name.trim()) newErrors.name = 'Entrez votre nom';
      if (!formData.phone.trim()) {
        newErrors.phone = 'Entrez votre téléphone';
      } else if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Numéro invalide';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3) as FormStep);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1) as FormStep);
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) {
      setStep(2);
      return;
    }

    setStatus('submitting');

    // Simulation d'envoi (remplacer par vraie API)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const progressPercent = ((step - 1) / 2) * 100;

  const containerStyles = {
    default: 'bg-white rounded-3xl shadow-soft p-8',
    sidebar: 'bg-white rounded-2xl shadow-soft p-6',
    inline: 'bg-gray-50 rounded-2xl p-6',
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${containerStyles[variant]} text-center ${className}`}
      >
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-emerald-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-deep mb-2">Demande envoyée</h3>
        <p className="text-slate-deep/60 mb-4">
          Nous vous recontactons sous 2h maximum.
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setStep(1);
            setFormData({ service: '', city: '', name: '', phone: '', message: '' });
          }}
          className="text-sm text-gold hover:underline"
        >
          Nouvelle demande
        </button>
      </motion.div>
    );
  }

  return (
    <div className={`${containerStyles[variant]} ${className}`}>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-deep/60">
            Étape {step}/3
          </span>
          <span className="text-xs text-slate-deep/40">
            {step === 1 && 'Votre besoin'}
            {step === 2 && 'Vos coordonnées'}
            {step === 3 && 'Message (optionnel)'}
          </span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gold rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent + 33}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Service + Ville */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-slate-deep mb-1.5">
                Type de service
              </label>
              <select
                id="service"
                value={formData.service}
                onChange={(e) => updateField('service', e.target.value)}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${
                  errors.service ? 'border-red-400' : 'border-gray-200'
                }`}
              >
                <option value="">Sélectionnez un service</option>
                {services.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.name}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-red-500 text-xs mt-1">{errors.service}</p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-slate-deep mb-1.5">
                Ville d&apos;intervention
              </label>
              <select
                id="city"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${
                  errors.city ? 'border-red-400' : 'border-gray-200'
                }`}
              >
                <option value="">Sélectionnez une ville</option>
                {cities.map((city) => (
                  <option key={city.slug} value={city.slug}>
                    {city.name} ({city.postalCode})
                  </option>
                ))}
              </select>
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-gold text-white font-semibold py-3.5 rounded-xl hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
            >
              Continuer
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </motion.div>
        )}

        {/* Step 2: Nom + Téléphone */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-deep mb-1.5">
                Votre nom
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Jean Dupont"
                autoComplete="name"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${
                  errors.name ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-deep mb-1.5">
                Téléphone
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="06 12 34 56 78"
                autoComplete="tel"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${
                  errors.phone ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-100 text-slate-deep font-medium py-3.5 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Retour
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-gold text-white font-semibold py-3.5 rounded-xl hover:bg-gold/90 transition-colors"
              >
                Continuer
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Message optionnel */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-deep mb-1.5">
                Détails supplémentaires{' '}
                <span className="text-slate-deep/40 font-normal">(optionnel)</span>
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => updateField('message', e.target.value)}
                placeholder="Décrivez votre besoin, type de tache, taille du canapé..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all resize-none"
              />
            </div>

            {/* Résumé */}
            <div className="bg-gray-50 rounded-xl p-4 text-sm">
              <p className="font-medium text-slate-deep mb-2">Récapitulatif</p>
              <div className="space-y-1 text-slate-deep/70">
                <p>
                  <span className="font-medium">Service:</span>{' '}
                  {services.find((s) => s.slug === formData.service)?.name}
                </p>
                <p>
                  <span className="font-medium">Ville:</span>{' '}
                  {cities.find((c) => c.slug === formData.city)?.name}
                </p>
                <p>
                  <span className="font-medium">Contact:</span> {formData.name} - {formData.phone}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-100 text-slate-deep font-medium py-3.5 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Retour
              </button>
              <button
                onClick={handleSubmit}
                disabled={status === 'submitting'}
                className="flex-1 bg-slate-deep text-white font-semibold py-3.5 rounded-xl hover:bg-slate-deep/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Envoi...
                  </>
                ) : (
                  'Envoyer ma demande'
                )}
              </button>
            </div>

            <p className="text-center text-xs text-slate-deep/40">
              Réponse garantie sous 2h - Devis gratuit et sans engagement
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust indicators */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-4 text-xs text-slate-deep/50">
        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-emerald-500">
            <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          Données sécurisées
        </span>
        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-gold">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
          </svg>
          Réponse rapide
        </span>
      </div>
    </div>
  );
}
