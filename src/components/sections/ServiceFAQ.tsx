'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  className?: string;
  showSchema?: boolean;
}

export default function ServiceFAQ({
  title = 'Questions fréquentes',
  subtitle,
  faqs,
  className = '',
  showSchema = true,
}: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      {/* Schema.org FAQ */}
      {showSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-screen-lg mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-deep mb-4"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-deep/60 text-lg max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-slate-deep pr-4">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 text-gold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.span>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-5 text-slate-deep/70 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA after FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-deep/60 mb-4">
            Vous avez d&apos;autres questions ?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-gold text-white font-semibold px-6 py-3 rounded-xl hover:bg-gold/90 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                clipRule="evenodd"
              />
            </svg>
            Contactez-nous
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Default FAQs for cleaning services
export const defaultCleaningFAQs: FAQItem[] = [
  {
    question: 'Combien coûte le nettoyage d\'un canapé ?',
    answer: 'Le prix dépend de la taille et du type de canapé. Comptez entre 49€ et 149€ pour un canapé standard. Nous proposons un devis gratuit et sans engagement pour vous donner un prix exact.',
  },
  {
    question: 'Combien de temps dure le nettoyage ?',
    answer: 'En moyenne, le nettoyage d\'un canapé prend entre 45 minutes et 1h30 selon la taille et l\'état. Le séchage complet prend ensuite 2 à 4 heures.',
  },
  {
    question: 'Quels produits utilisez-vous ?',
    answer: 'Nous utilisons exclusivement des produits écologiques certifiés, sans substances nocives pour votre santé ou celle de vos animaux. Nos produits sont biodégradables et respectueux de l\'environnement.',
  },
  {
    question: 'Intervenez-vous à domicile ?',
    answer: 'Oui, nous intervenons directement chez vous, partout en Île-de-France. Pas besoin de déplacer votre canapé, nous apportons tout le matériel nécessaire.',
  },
  {
    question: 'Proposez-vous une garantie ?',
    answer: 'Absolument ! Nous offrons une garantie "Satisfait ou Re-nettoyé". Si le résultat ne vous convient pas, nous revenons gratuitement pour un second passage.',
  },
  {
    question: 'Puis-je utiliser mon canapé juste après le nettoyage ?',
    answer: 'Nous recommandons d\'attendre 2 à 4 heures pour un séchage optimal. Pour les tissus délicats, prévoir jusqu\'à 6 heures avant utilisation.',
  },
  {
    question: 'Traitez-vous les taches tenaces ?',
    answer: 'Oui, nous sommes spécialisés dans le traitement des taches difficiles : vin, café, encre, sang, urine animale, etc. Notre taux de réussite est de plus de 95%.',
  },
];
