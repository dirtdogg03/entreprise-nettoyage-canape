'use client';

import { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { company } from '@/lib/data/company';
import { services } from '@/lib/data/services';
import { locations as mainCities } from '@/lib/data/locations';

type FormStep = 1 | 2 | 3;

// Départements de la petite couronne (zone desservie)
const COVERED_DEPARTMENTS = ['75', '92', '93', '94'];

const DEPARTMENT_NAMES: Record<string, string> = {
  '75': 'Paris',
  '92': 'Hauts-de-Seine',
  '93': 'Seine-Saint-Denis',
  '94': 'Val-de-Marne',
};

interface FormData {
  service: string;
  city: string;
  customCity: string;
  postalCode: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  wantsWaitlist: boolean;
}

interface ServiceFormProps {
  variant?: 'default' | 'sidebar' | 'inline';
  preselectedService?: string;
  preselectedCity?: string;
  className?: string;
}

// Validation du code postal petite couronne
const isValidPostalCode = (code: string): { valid: boolean; department?: string; error?: string } => {
  const cleaned = code.replace(/\s/g, '');

  if (!/^\d{5}$/.test(cleaned)) {
    return { valid: false, error: 'Le code postal doit contenir 5 chiffres' };
  }

  const dept = cleaned.substring(0, 2);

  if (!COVERED_DEPARTMENTS.includes(dept)) {
    return {
      valid: false,
      error: `Nous intervenons uniquement à Paris et en petite couronne (75, 92, 93, 94). Votre code postal (${dept}) est hors zone.`
    };
  }

  return { valid: true, department: dept };
};

export default function ServiceForm({
  variant = 'default',
  preselectedService,
  preselectedCity,
  className = '',
}: ServiceFormProps) {
  // Unique IDs for ARIA accessibility
  const formId = useId();
  const serviceErrorId = `${formId}-service-error`;
  const cityErrorId = `${formId}-city-error`;
  const postalCodeErrorId = `${formId}-postalcode-error`;
  const nameErrorId = `${formId}-name-error`;
  const phoneErrorId = `${formId}-phone-error`;
  const cityStatusId = `${formId}-city-status`;

  const [step, setStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>({
    service: preselectedService || '',
    city: preselectedCity || '',
    customCity: '',
    postalCode: '',
    name: '',
    phone: '',
    email: '',
    message: '',
    wantsWaitlist: false,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'waitlist'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [detectedCity, setDetectedCity] = useState<string>('');
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [isOutOfZone, setIsOutOfZone] = useState(false);

  // Groupe les villes par département pour un meilleur affichage
  const citiesByDept = COVERED_DEPARTMENTS.reduce((acc, dept) => {
    acc[dept] = mainCities.filter(c => c.departmentCode === dept);
    return acc;
  }, {} as Record<string, typeof mainCities>);

  // Détection automatique de la ville via API gouvernementale
  useEffect(() => {
    const fetchCity = async () => {
      if (formData.postalCode.length !== 5) {
        setDetectedCity('');
        setIsOutOfZone(false);
        return;
      }

      const validation = isValidPostalCode(formData.postalCode);
      if (!validation.valid) {
        setDetectedCity('');
        // Détecter si c'est hors zone (code postal valide mais pas dans nos départements)
        const cleaned = formData.postalCode.replace(/\s/g, '');
        if (/^\d{5}$/.test(cleaned)) {
          const dept = cleaned.substring(0, 2);
          setIsOutOfZone(!COVERED_DEPARTMENTS.includes(dept));
        }
        return;
      }

      setIsOutOfZone(false);
      setIsLoadingCity(true);
      try {
        const response = await fetch(
          `https://geo.api.gouv.fr/communes?codePostal=${formData.postalCode}&fields=nom&limit=5`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          // Si plusieurs communes, on les liste
          const cities = data.map((c: { nom: string }) => c.nom).join(', ');
          setDetectedCity(cities);
        } else {
          setDetectedCity('');
        }
      } catch {
        setDetectedCity('');
      } finally {
        setIsLoadingCity(false);
      }
    };

    const debounce = setTimeout(fetchCity, 300);
    return () => clearTimeout(debounce);
  }, [formData.postalCode]);

  const validateStep = (currentStep: FormStep): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (currentStep === 1) {
      if (!formData.service) newErrors.service = 'Sélectionnez un service';

      if (formData.city === 'other') {
        // Validation code postal pour "autre ville"
        if (!formData.postalCode) {
          newErrors.postalCode = 'Entrez votre code postal';
        } else {
          const validation = isValidPostalCode(formData.postalCode);
          if (!validation.valid && !formData.wantsWaitlist) {
            // Ne pas bloquer si l'utilisateur veut être sur liste d'attente
            newErrors.postalCode = validation.error;
          }
        }
      } else if (!formData.city) {
        newErrors.city = 'Sélectionnez une ville';
      }
    } else if (currentStep === 2) {
      if (!formData.name.trim()) newErrors.name = 'Entrez votre nom';
      if (!formData.phone.trim()) {
        newErrors.phone = 'Entrez votre téléphone';
      } else if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Format: 06 12 34 56 78';
      }
      // Email optionnel sauf pour waitlist
      if (formData.wantsWaitlist && !formData.email.trim()) {
        newErrors.email = 'Email requis pour la liste d\'attente';
      } else if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email invalide';
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
      // Si waitlist, statut différent
      if (formData.wantsWaitlist) {
        setStatus('waitlist');
      } else {
        setStatus('success');
      }
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

  // Récupère le nom de la ville pour l'affichage
  const getDisplayCity = (): string => {
    if (formData.city === 'other') {
      return detectedCity || formData.customCity || `Code postal ${formData.postalCode}`;
    }
    return mainCities.find((c) => c.slug === formData.city)?.name || '';
  };

  const progressPercent = ((step - 1) / 2) * 100;

  const containerStyles = {
    default: 'bg-white rounded-3xl shadow-soft p-8',
    sidebar: 'bg-white rounded-2xl shadow-soft p-6',
    inline: 'bg-gray-50 rounded-2xl p-6',
  };

  const resetForm = () => {
    setStatus('idle');
    setStep(1);
    setFormData({
      service: '',
      city: '',
      customCity: '',
      postalCode: '',
      name: '',
      phone: '',
      email: '',
      message: '',
      wantsWaitlist: false,
    });
    setIsOutOfZone(false);
    setDetectedCity('');
  };

  // État de succès - Demande normale
  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${containerStyles[variant]} text-center ${className}`}
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-emerald-600" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-deep mb-2">Demande envoyée !</h3>
        <p className="text-slate-deep/60 mb-4">
          Nous vous recontactons sous 2h maximum.
        </p>
        <button
          onClick={resetForm}
          className="text-sm text-gold hover:underline focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 rounded"
        >
          Nouvelle demande
        </button>
      </motion.div>
    );
  }

  // État de succès - Liste d'attente
  if (status === 'waitlist') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${containerStyles[variant]} text-center ${className}`}
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-amber-600" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-deep mb-2">Inscrit sur liste d&apos;attente</h3>
        <p className="text-slate-deep/60 mb-4">
          Nous vous contacterons dès que nous interviendrons dans votre zone.
        </p>
        <button
          onClick={resetForm}
          className="text-sm text-gold hover:underline focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 rounded"
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
                Type de service <span className="text-red-400" aria-hidden="true">*</span>
              </label>
              <select
                id="service"
                value={formData.service}
                onChange={(e) => updateField('service', e.target.value)}
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? serviceErrorId : undefined}
                aria-required="true"
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
                <p id={serviceErrorId} className="text-red-500 text-xs mt-1" role="alert">
                  {errors.service}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-slate-deep mb-1.5">
                Ville d&apos;intervention <span className="text-red-400" aria-hidden="true">*</span>
              </label>
              <select
                id="city"
                value={formData.city}
                onChange={(e) => {
                  updateField('city', e.target.value);
                  // Reset postal code si on change de ville
                  if (e.target.value !== 'other') {
                    updateField('postalCode', '');
                    updateField('customCity', '');
                    setDetectedCity('');
                    setIsOutOfZone(false);
                    setFormData(prev => ({ ...prev, wantsWaitlist: false }));
                  }
                }}
                aria-invalid={!!errors.city}
                aria-describedby={errors.city ? cityErrorId : undefined}
                aria-required="true"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${
                  errors.city ? 'border-red-400' : 'border-gray-200'
                }`}
              >
                <option value="">Sélectionnez une ville</option>

                {/* Groupes par département */}
                {COVERED_DEPARTMENTS.map((dept) => (
                  <optgroup key={dept} label={DEPARTMENT_NAMES[dept]}>
                    {citiesByDept[dept]?.map((city) => (
                      <option key={city.slug} value={city.slug}>
                        {city.name} ({city.postalCode})
                      </option>
                    ))}
                  </optgroup>
                ))}

                {/* Option "Autre ville" */}
                <optgroup label="────────────">
                  <option value="other">Autre ville (Paris / Petite Couronne)</option>
                </optgroup>
              </select>
              {errors.city && (
                <p id={cityErrorId} className="text-red-500 text-xs mt-1" role="alert">
                  {errors.city}
                </p>
              )}
            </div>

            {/* Champ code postal si "Autre ville" sélectionné */}
            <AnimatePresence>
              {formData.city === 'other' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-slate-deep mb-1.5">
                      Votre code postal <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={5}
                      value={formData.postalCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                        updateField('postalCode', value);
                      }}
                      placeholder="Ex: 93100"
                      aria-invalid={!!errors.postalCode}
                      aria-describedby={`${postalCodeErrorId} ${cityStatusId}`}
                      aria-required="true"
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${
                        errors.postalCode && !isOutOfZone ? 'border-red-400' : isOutOfZone ? 'border-amber-400' : 'border-gray-200'
                      }`}
                    />

                    {/* Statut de détection de ville - zone live pour lecteurs d'écran */}
                    <div id={cityStatusId} aria-live="polite" aria-atomic="true">
                      {isLoadingCity && (
                        <p className="text-xs text-slate-deep/50 mt-1 flex items-center gap-1">
                          <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Recherche de la ville...
                        </p>
                      )}

                      {!isLoadingCity && detectedCity && !errors.postalCode && !isOutOfZone && (
                        <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                          {detectedCity} - Zone desservie
                        </p>
                      )}
                    </div>

                    {errors.postalCode && !isOutOfZone && (
                      <p id={postalCodeErrorId} className="text-red-500 text-xs mt-1" role="alert">
                        {errors.postalCode}
                      </p>
                    )}
                  </div>

                  {/* Option liste d'attente si hors zone */}
                  <AnimatePresence>
                    {isOutOfZone && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-amber-50 border border-amber-200 rounded-xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                          </svg>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-amber-800 mb-1">
                              Zone non desservie actuellement
                            </p>
                            <p className="text-xs text-amber-700 mb-3">
                              Nous intervenons uniquement à Paris et en petite couronne (75, 92, 93, 94).
                              Mais nous développons notre réseau !
                            </p>
                            <label className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={formData.wantsWaitlist}
                                onChange={(e) => setFormData(prev => ({ ...prev, wantsWaitlist: e.target.checked }))}
                                className="w-4 h-4 rounded border-amber-300 text-gold focus:ring-gold/50"
                              />
                              <span className="text-sm text-amber-800 group-hover:text-amber-900">
                                M&apos;alerter quand vous interviendrez dans ma zone
                              </span>
                            </label>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Info zone couverte */}
                  {!isOutOfZone && (
                    <p className="text-xs text-slate-deep/40">
                      Zone couverte : Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94)
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

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
                Votre nom <span className="text-red-400" aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Jean Dupont"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? nameErrorId : undefined}
                aria-required="true"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${
                  errors.name ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {errors.name && (
                <p id={nameErrorId} className="text-red-500 text-xs mt-1" role="alert">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-deep mb-1.5">
                Téléphone <span className="text-red-400" aria-hidden="true">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="06 12 34 56 78"
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? phoneErrorId : undefined}
                aria-required="true"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${
                  errors.phone ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {errors.phone && (
                <p id={phoneErrorId} className="text-red-500 text-xs mt-1" role="alert">{errors.phone}</p>
              )}
            </div>

            {/* Champ email - requis pour liste d'attente, optionnel sinon */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-deep mb-1.5">
                Email {formData.wantsWaitlist ? (
                  <span className="text-red-400" aria-hidden="true">*</span>
                ) : (
                  <span className="text-slate-deep/40 font-normal">(optionnel)</span>
                )}
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="jean.dupont@email.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                aria-required={formData.wantsWaitlist}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${
                  errors.email ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {errors.email && (
                <p id={`${formId}-email-error`} className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>
              )}
              {formData.wantsWaitlist && !errors.email && (
                <p className="text-xs text-amber-600 mt-1">
                  Nous vous contacterons par email dès que votre zone sera desservie.
                </p>
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
            <div className={`rounded-xl p-4 text-sm ${formData.wantsWaitlist ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-slate-deep">Récapitulatif</p>
                {formData.wantsWaitlist && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-200 text-amber-800 rounded-full text-xs font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3" aria-hidden="true">
                      <path d="M3.6 1.7A.75.75 0 014.5 1h7a.75.75 0 01.9.7l.5 6a.75.75 0 01-.19.58l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 01-.19-.58l.5-6zM8 4a1 1 0 100 2 1 1 0 000-2z" />
                    </svg>
                    Liste d&apos;attente
                  </span>
                )}
              </div>
              <div className="space-y-1 text-slate-deep/70">
                {!formData.wantsWaitlist && (
                  <p>
                    <span className="font-medium">Service:</span>{' '}
                    {services.find((s) => s.slug === formData.service)?.name}
                  </p>
                )}
                <p>
                  <span className="font-medium">{formData.wantsWaitlist ? 'Zone:' : 'Ville:'}</span>{' '}
                  {formData.wantsWaitlist ? (
                    <span className="text-amber-700">Hors zone ({formData.postalCode})</span>
                  ) : (
                    <>
                      {getDisplayCity()}
                      {formData.city === 'other' && formData.postalCode && (
                        <span className="text-slate-deep/50"> ({formData.postalCode})</span>
                      )}
                    </>
                  )}
                </p>
                <p>
                  <span className="font-medium">Contact:</span> {formData.name} - {formData.phone}
                </p>
                {formData.email && (
                  <p>
                    <span className="font-medium">Email:</span> {formData.email}
                  </p>
                )}
              </div>
              {formData.wantsWaitlist && (
                <p className="mt-3 text-xs text-amber-700 border-t border-amber-200 pt-2">
                  Vous serez alerté par email dès que nous interviendrons dans votre zone.
                </p>
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
                onClick={handleSubmit}
                disabled={status === 'submitting'}
                className={`flex-1 font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                  formData.wantsWaitlist
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'bg-slate-deep text-white hover:bg-slate-deep/90'
                }`}
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Envoi...
                  </>
                ) : formData.wantsWaitlist ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z" />
                    </svg>
                    M&apos;inscrire sur la liste d&apos;attente
                  </>
                ) : (
                  'Envoyer ma demande'
                )}
              </button>
            </div>

            <p className="text-center text-xs text-slate-deep/40">
              {formData.wantsWaitlist
                ? 'Nous vous contacterons dès que votre zone sera desservie'
                : 'Réponse garantie sous 2h - Devis gratuit et sans engagement'}
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
