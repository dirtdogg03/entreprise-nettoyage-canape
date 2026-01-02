'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  testimonials,
  getAverageRating,
  getReviewCount,
  type Testimonial,
} from '@/lib/data/testimonials';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note: ${rating} sur 5 étoiles`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={star <= rating ? '#F59E0B' : '#E5E7EB'}
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.95 }}
      className={`bg-white rounded-3xl p-8 shadow-soft border border-gray-100 transition-all duration-300 ${
        isActive ? 'ring-2 ring-gold/20' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/40 flex items-center justify-center">
              <span className="font-bold text-gold text-lg">
                {testimonial.author.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-slate-deep">{testimonial.author}</h3>
              <p className="text-sm text-slate-deep/60">{testimonial.location}</p>
            </div>
          </div>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Quote */}
      <blockquote className="text-slate-deep/80 leading-relaxed mb-6">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <Link
          href={`/services/${testimonial.serviceSlug}`}
          className="text-sm font-medium text-gold hover:underline"
        >
          {testimonial.service}
        </Link>
        <span className="text-xs text-slate-deep/50">
          {new Date(testimonial.date).toLocaleDateString('fr-FR', {
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>

      {/* Verified badge */}
      {testimonial.verified && (
        <div className="flex items-center gap-1.5 mt-4 text-xs text-emerald-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          Client vérifié
        </div>
      )}
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const averageRating = getAverageRating();
  const reviewCount = getReviewCount();

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  // Visible testimonials (3 at a time on desktop, 1 on mobile)
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = -1; i <= 1; i++) {
      indices.push((activeIndex + i + testimonials.length) % testimonials.length);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="data-label">Témoignages Clients</span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-none tracking-[-2px] mt-4">
            Ce que disent nos <span className="text-gold">clients</span>
          </h2>

          {/* Rating summary */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-black text-slate-deep">{averageRating}</span>
              <span className="text-slate-deep/60">/5</span>
            </div>
            <div>
              <StarRating rating={Math.round(averageRating)} />
              <p className="text-sm text-slate-deep/60 mt-1">
                Basé sur {reviewCount} avis vérifiés
              </p>
            </div>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors hidden lg:flex"
            aria-label="Avis précédent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors hidden lg:flex"
            aria-label="Avis suivant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="wait">
              {/* Mobile: Show only active */}
              <div className="lg:hidden">
                <TestimonialCard
                  key={testimonials[activeIndex].id}
                  testimonial={testimonials[activeIndex]}
                  isActive={true}
                />
              </div>

              {/* Desktop: Show 3 */}
              {visibleIndices.map((index, i) => (
                <div key={testimonials[index].id} className="hidden lg:block">
                  <TestimonialCard
                    testimonial={testimonials[index]}
                    isActive={i === 1}
                  />
                </div>
              ))}
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-gold w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Aller à l'avis ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-slate-deep/70 mb-6">
            Rejoignez nos clients satisfaits
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-slate-deep text-white px-8 py-4 rounded-full font-semibold hover:bg-gold transition-colors"
          >
            Demander mon devis gratuit
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Schema.org AggregateRating - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Nettoyage Canapé à Domicile',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: averageRating.toString(),
              reviewCount: reviewCount.toString(),
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />
    </section>
  );
}
