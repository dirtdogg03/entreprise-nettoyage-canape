'use client';

import { motion } from 'framer-motion';
import { company } from '@/lib/data/company';
import ServiceForm from '@/components/forms/ServiceForm';

export default function ContactPage() {
  return (
    <>
      <section className="bg-slate-deep py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        {/* Decorative Orbs */}
        <div className="pearl-orb top-[-10%] right-[-5%]" />
        
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 relative text-center z-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="data-label text-gold mb-6 block"
          >
            Service Client
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2.5rem,6vw,5rem)] font-black text-white leading-none tracking-[-2px] mb-8"
          >
            Demandez votre <span className="text-gold">Devis</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-xl font-light text-white/80 max-w-2xl mx-auto"
          >
            Réponse garantie sous 24h. Intervention d&apos;excellence à Paris et en petite couronne.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-pearlescent relative">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Infos */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-12 text-slate-deep tracking-tight">
                Coordonnées de <span className="text-gold">L&apos;Atelier</span>
              </h2>
              <div className="space-y-12">
                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 rounded-full bg-white border border-gold/20 flex items-center justify-center text-gold shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-mono text-xs font-bold text-gold uppercase tracking-widest mb-2">Téléphone</h3>
                    <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="text-2xl font-bold text-slate-deep hover:text-gold transition-colors block">
                      {company.phone}
                    </a>
                    <p className="text-sm text-slate-deep/60 mt-1">Du Lundi au Samedi, 9h - 19h</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 rounded-full bg-white border border-gold/20 flex items-center justify-center text-gold shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-mono text-xs font-bold text-gold uppercase tracking-widest mb-2">Email</h3>
                    <a href="mailto:contact@nettoyage-canape.fr" className="text-2xl font-bold text-slate-deep hover:text-gold transition-colors block break-all">
                      contact@nettoyage-canape.fr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 rounded-full bg-white border border-gold/20 flex items-center justify-center text-gold shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-mono text-xs font-bold text-gold uppercase tracking-widest mb-2">Zone d&apos;intervention</h3>
                    <p className="text-xl font-bold text-slate-deep mb-2">
                      Paris &amp; Petite Couronne
                    </p>
                    <p className="text-slate-deep/70 leading-relaxed max-w-sm">
                      Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94).
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Formulaire Multi-étapes CRO (+86% conversion) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ServiceForm variant="default" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}