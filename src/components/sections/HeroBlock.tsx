'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface HeroBlockProps {
  title: string;
  subtitle?: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.19, 1, 0.22, 1] as [number, number, number, number],
    },
  },
};

export default function HeroBlock({
  title,
  subtitle = "Excellence & Pureté",
  description,
  ctaText = 'Réserver une Expertise',
  ctaHref = '/contact',
}: HeroBlockProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.01,
        y: (e.clientY - window.innerHeight / 2) * 0.01,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <header className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-24">
          {/* Hero Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.span variants={itemVariants} className="data-label">
              {subtitle}
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-[-3px] mb-8"
            >
              {title.split(' ').map((word, i) => (
                <span key={i} className={word.toLowerCase().includes('fibre') || word.toLowerCase().includes('vie') ? 'text-gold' : ''}>
                  {word}{' '}
                </span>
              ))}
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg lg:text-xl font-light opacity-80 max-w-md mb-12 leading-relaxed"
            >
              {description}
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <Link href={ctaHref} className="btn-luxury">
                {ctaText}
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="relative"
          >
            <div className="visual-container">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200"
                alt="Canapé de prestige dans un intérieur raffiné - Service de nettoyage professionnel à domicile à Paris et petite couronne"
                width={1200}
                height={800}
                priority
                fetchPriority="high"
                className="visual-image"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Pearl Orbs */}
              <div 
                className="pearl-orb top-[10%] right-[10%]" 
                style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
              />
              <div 
                className="pearl-orb bottom-[10%] left-[10%] scale-75 opacity-50" 
                style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}