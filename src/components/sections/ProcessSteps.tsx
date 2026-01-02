'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Diagnostic',
    description: 'On examine votre canapé : type de tissu, taches à traiter, état général.',
  },
  {
    number: '02',
    title: 'Nettoyage',
    description: 'Application de nos produits professionnels adaptés à votre revêtement.',
  },
  {
    number: '03',
    title: 'Détachage',
    description: 'Traitement ciblé de chaque tache avec la technique appropriée.',
  },
  {
    number: '04',
    title: 'Séchage',
    description: 'Extraction optimisée. Votre canapé est utilisable sous 2-4 heures.',
  },
];

const trustItems = [
  { value: '10+', label: "Années d'expérience" },
  { value: '2-4h', label: 'Séchage rapide' },
  { value: '25km', label: 'Zone couverte' },
  { value: '4.9/5', label: 'Avis clients' },
];

export default function ProcessSteps() {
  return (
    <>
      {/* Trust Banner */}
      <section className="border-y border-gray-100 bg-pearlescent py-20">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {trustItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <span className="block font-mono font-bold text-2xl lg:text-3xl text-slate-deep mb-2">
                  {item.value}
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[3px] opacity-40">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-32 bg-pearlescent relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-24">
            <span className="data-label">Notre Méthode</span>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-none tracking-[-2px]">
              En 4 <span className="text-gold">étapes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-6 mb-8">
                  <span className="text-5xl lg:text-6xl font-black text-gold/10 font-mono leading-none">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-slate-deep">
                    {step.title}
                  </h3>
                </div>
                <div className="pl-6 border-l border-gold/30">
                  <p className="text-slate-deep/70 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}