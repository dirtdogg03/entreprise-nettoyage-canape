import HeroBlock from '@/components/sections/HeroBlock';
import ServicesGrid from '@/components/sections/ServicesGrid';
import BeforeAfterGallery from '@/components/sections/BeforeAfterGallery';
import ProcessSteps from '@/components/sections/ProcessSteps';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTABanner from '@/components/sections/CTABanner';
import { company, seoDefaults } from '@/lib/data/company';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: seoDefaults.defaultTitle,
  description: seoDefaults.defaultDescription,
  keywords: seoDefaults.keywords,
  openGraph: {
    title: seoDefaults.defaultTitle,
    description: seoDefaults.defaultDescription,
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroBlock
        subtitle={`Expert en Nettoyage de Canapé - ${company.serviceArea.headquarters} et environs`}
        title="Nettoyage de Canapé à Domicile"
        description={`Service professionnel de nettoyage de canapés, fauteuils et sièges à domicile. Intervention rapide en Seine-Saint-Denis, Paris et Val-de-Marne. Devis gratuit au ${company.phone}.`}
        ctaText="Devis Gratuit"
        ctaHref="/contact"
      />

      <ServicesGrid />

      {/* CRO: Galerie Avant/Après - +83% conversion services */}
      <BeforeAfterGallery />

      <ProcessSteps />

      {/* CRO: Témoignages - +34% conversion, Schema.org AggregateRating */}
      <TestimonialsSection />

      <CTABanner />
    </>
  );
}