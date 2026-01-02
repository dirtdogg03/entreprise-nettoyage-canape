'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface BeforeAfterItem {
  id: string;
  title: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  serviceSlug: string;
}

const galleryItems: BeforeAfterItem[] = [
  {
    id: '1',
    title: 'Canapé velours taché de vin',
    description: 'Taches de vin rouge incrustées depuis 6 mois - Nettoyage profond + détachage enzymatique',
    beforeLabel: 'Taches visibles',
    afterLabel: 'Comme neuf',
    serviceSlug: 'nettoyage-canape-velours',
  },
  {
    id: '2',
    title: 'Canapé cuir blanc grisé',
    description: 'Cuir blanc devenu gris par l\'usure - Nettoyage + nourrissage + protection',
    beforeLabel: 'Cuir terne',
    afterLabel: 'Éclat retrouvé',
    serviceSlug: 'nettoyage-canape-cuir',
  },
  {
    id: '3',
    title: 'Canapé tissu avec odeur animaux',
    description: 'Odeurs persistantes de chien - Désinfection + traitement enzymatique anti-odeurs',
    beforeLabel: 'Odeurs fortes',
    afterLabel: 'Odeur neutre',
    serviceSlug: 'désinfection-canape',
  },
  {
    id: '4',
    title: 'Canapé d\'angle familial',
    description: 'Taches multiples (café, nourriture, crayon) - Nettoyage complet grande surface',
    beforeLabel: 'Très taché',
    afterLabel: 'Impeccable',
    serviceSlug: 'nettoyage-canape-angle',
  },
];

function BeforeAfterSlider({ item }: { item: BeforeAfterItem }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="group">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none bg-slate-200"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Image AVANT (fond) - représentée par une zone colorée */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-300/50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-amber-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <span className="font-bold text-amber-800 text-lg">{item.beforeLabel}</span>
            <p className="text-amber-700 text-sm mt-1">Glissez pour comparer →</p>
          </div>
        </div>

        {/* Image APRÈS (révélée) - représentée par une zone colorée */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-300/50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-emerald-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-bold text-emerald-800 text-lg">{item.afterLabel}</span>
            <p className="text-emerald-700 text-sm mt-1">← Glissez pour comparer</p>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Poignée */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          AVANT
        </div>
        <div className="absolute bottom-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          APRÈS
        </div>
      </div>

      {/* Infos */}
      <div className="mt-4">
        <h3 className="font-bold text-lg text-slate-deep">{item.title}</h3>
        <p className="text-slate-deep/70 text-sm mt-1">{item.description}</p>
        <Link
          href={`/services/${item.serviceSlug}`}
          className="inline-flex items-center gap-1 text-gold font-semibold text-sm mt-2 hover:underline"
        >
          Voir ce service
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function BeforeAfterGallery() {
  return (
    <section className="py-24 bg-pearlescent relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="data-label">Résultats Garantis</span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-none tracking-[-2px] mt-4">
            Avant / <span className="text-gold">Après</span>
          </h2>
          <p className="mt-6 text-lg text-slate-deep/70 max-w-2xl mx-auto">
            Découvrez la transformation de nos interventions. Glissez le curseur pour comparer les résultats.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <BeforeAfterSlider item={item} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-slate-deep/70 mb-6">
            Votre canapé mérite le même traitement
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gold text-white px-8 py-4 rounded-full font-semibold hover:bg-gold/90 transition-colors"
          >
            Demander un devis gratuit
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
