'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { services } from '@/lib/data/services';

export default function ServicesGrid() {
  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="data-label">Nos Services</span>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-none tracking-[-2px]">
              Nettoyage <span className="text-gold">Professionnel</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xs font-normal text-slate-deep/80 text-lg leading-relaxed"
          >
            Intervention à domicile par nos techniciens experts en nettoyage de canapés.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link href={`/services/${service.slug}`} className="group block h-full">
                <div className="service-card-luxury h-full flex flex-col">
                  <span className="font-mono text-xs uppercase tracking-[3px] text-gold mb-10 block">
                    {`0${index + 1} // ${service.category.toUpperCase()}`}
                  </span>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold tracking-tight mb-6 group-hover:text-gold transition-colors duration-300">
                    {service.name}
                  </h3>
                  
                  <p className="font-normal text-slate-deep/70 mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* Prix et Durée */}
                  <div className="flex flex-wrap gap-4 mb-8 text-sm">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 text-gold rounded-full font-semibold">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3a3.78 3.78 0 01-1.653-.713 2.42 2.42 0 01-.71-.88.75.75 0 011.302-.744c.1.175.254.343.47.484.215.141.461.25.716.312v-2.952a4.1 4.1 0 01-1.202-.334 2.39 2.39 0 01-.757-.586c-.285-.348-.43-.768-.43-1.244 0-.865.501-1.623 1.29-2.14a4.1 4.1 0 011.099-.524V4.75A.75.75 0 0110 4z" clipRule="evenodd" />
                      </svg>
                      {service.priceRange}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-deep/70 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                      </svg>
                      {service.duration}
                    </span>
                  </div>

                  <div className="font-mono text-xs uppercase tracking-[2px] text-gold flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                    En savoir plus <span className="text-lg">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}