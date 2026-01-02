import type { Metadata } from 'next';
import { company, seoDefaults } from '@/lib/data/company';

export const metadata: Metadata = {
  title: `Contact & Devis Gratuit${seoDefaults.titleSuffix}`,
  description:
    'Contactez notre équipe pour un devis gratuit de nettoyage de canapé à domicile. Réponse sous 24h. Intervention en Île-de-France : Paris, Seine-Saint-Denis, Val-de-Marne.',
  keywords: [
    'devis nettoyage canapé',
    'contact nettoyage canapé',
    'nettoyage canapé île-de-france',
    'devis gratuit nettoyage',
  ],
  openGraph: {
    title: 'Contact & Devis Gratuit | Nettoyage Canapé à Domicile',
    description:
      'Demandez votre devis gratuit pour le nettoyage professionnel de votre canapé. Réponse garantie sous 24h.',
    type: 'website',
    locale: 'fr_FR',
  },
  alternates: {
    canonical: `https://${company.domain}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
