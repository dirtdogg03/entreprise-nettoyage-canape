'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { company } from '@/lib/data/company';
import { services } from '@/lib/data/services';
import GuaranteeBadge from '@/components/ui/GuaranteeBadge';

export default function CTABanner() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulation d'envoi
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <section className="px-4 lg:px-12 py-12 lg:py-24 bg-pearlescent">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        className="bg-slate-deep rounded-[40px] lg:rounded-[80px] overflow-hidden relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">
          {/* Left: Content */}
          <div className="p-8 lg:p-20 flex flex-col justify-center relative z-10">
            <span className="font-mono text-xs uppercase tracking-[3px] text-gold mb-8 block">
              Devis Gratuit
            </span>
            
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white mb-8 tracking-[-1px] leading-tight">
              Redonnez son éclat à votre <span className="text-gold italic">intérieur</span>.
            </h2>
            
            <p className="text-white/60 text-lg font-light mb-12 max-w-md">
              Décrivez-nous votre besoin. Réponse rapide sous 24h. Devis gratuit et sans engagement.
            </p>

            <div className="flex items-center gap-6">
               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
               </div>
               <div>
                 <p className="text-sm uppercase tracking-widest text-white/40 mb-1">Service Client</p>
                 <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="text-xl text-white font-mono hover:text-gold transition-colors">{company.phone}</a>
               </div>
            </div>

            {/* CRO: Garantie Satisfaction - +24-49% conversion */}
            <div className="mt-8">
              <GuaranteeBadge variant="compact" />
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white/5 p-8 lg:p-20 flex items-center">
            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center w-full py-12"
              >
                <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-2xl text-white font-bold mb-4">Demande Reçue</h3>
                <p className="text-white/60">Un expert vous contactera d&apos;ici quelques instants.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 text-sm text-gold hover:text-white transition-colors underline underline-offset-4"
                >
                  Envoyer une autre demande
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full space-y-6" aria-label="Formulaire de devis rapide">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="cta-name"
                      className="text-sm uppercase tracking-widest text-white/40 ml-4"
                    >
                      Votre Nom <span className="sr-only">(obligatoire)</span>
                    </label>
                    <input
                      id="cta-name"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      autoComplete="name"
                      placeholder="Jean Dupont"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="cta-phone"
                      className="text-sm uppercase tracking-widest text-white/40 ml-4"
                    >
                      Téléphone <span className="sr-only">(obligatoire)</span>
                    </label>
                    <input
                      id="cta-phone"
                      name="phone"
                      type="tel"
                      required
                      aria-required="true"
                      autoComplete="tel"
                      placeholder="06 12 34 56 78"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="cta-service"
                    className="text-sm uppercase tracking-widest text-white/40 ml-4"
                  >
                    Type de besoin <span className="sr-only">(obligatoire)</span>
                  </label>
                  <select
                    id="cta-service"
                    name="service"
                    required
                    aria-required="true"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                  >
                    {services.map((service) => (
                      <option key={service.slug} value={service.slug} className="bg-slate-deep text-white">
                        {service.name}
                      </option>
                    ))}
                    <option value="autre" className="bg-slate-deep text-white">Autre demande</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  aria-disabled={formStatus === 'submitting'}
                  className="w-full bg-white text-slate-deep font-bold uppercase tracking-widest py-5 rounded-2xl hover:bg-gold hover:text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                  {formStatus === 'submitting' ? 'Envoi en cours...' : 'Recevoir mon devis gratuit'}
                </button>

                <p className="text-center text-white/20 text-xs mt-4">
                  Vos données restent confidentielles.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Decorative éléments */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
      </motion.div>
    </section>
  );
}