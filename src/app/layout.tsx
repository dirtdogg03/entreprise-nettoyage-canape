import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import MobileStickyBar from "@/components/layout/MobileStickyBar";
import ExitIntentPopup from "@/components/modals/ExitIntentPopup";
import { company, seoDefaults, schemaLocalBusiness } from "@/lib/data/company";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${company.domain}`),
  title: {
    default: seoDefaults.defaultTitle,
    template: `%s${seoDefaults.titleSuffix}`,
  },
  description: seoDefaults.defaultDescription,
  keywords: seoDefaults.keywords,
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: seoDefaults.siteName,
    title: seoDefaults.defaultTitle,
    description: seoDefaults.defaultDescription,
    url: `https://${company.domain}`,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: `${company.name} - ${company.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoDefaults.defaultTitle,
    description: seoDefaults.defaultDescription,
    creator: '@nettoyagecanape',
    images: ['/twitter-image.png'],
  },
  alternates: {
    canonical: `https://${company.domain}`,
  },
  verification: {
    // IMPORTANT: Remplacer par votre code de verification Google Search Console
    // 1. Aller sur https://search.google.com/search-console
    // 2. Ajouter la propriete du domaine
    // 3. Choisir "balise HTML" comme methode de verification
    // 4. Copier le code (contenu de l'attribut "content")
    google: 'REMPLACER_PAR_VOTRE_CODE_GOOGLE',
  },
};

function BackgroundFilament() {
  return (
    <div className="bg-filament">
      {[1, 3, 5, 7, 9].map((i) => (
        <div 
          key={i} 
          className="filament-line" 
          style={{ 
            left: `${i * 10}%`,
            animationDelay: `${i * 0.5}s`
          } as React.CSSProperties} 
        />
      ))}
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${spaceMono.variable} scroll-smooth`}>
      <head>
        {/* LocalBusiness Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaLocalBusiness),
          }}
        />
        {/* WebSite Schema.org JSON-LD - Pour sitelinks searchbox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: company.name,
              url: `https://${company.domain}`,
              description: company.description,
              publisher: {
                "@type": "Organization",
                name: company.name,
              },
            }),
          }}
        />
        {/* Organization Schema.org JSON-LD - Pour Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: company.name,
              url: `https://${company.domain}`,
              logo: `https://${company.domain}/logo.png`,
              description: company.description,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: company.phone,
                contactType: "customer service",
                availableLanguage: "French",
                areaServed: "FR",
              },
              sameAs: [
                company.socialMedia?.facebook,
                company.socialMedia?.instagram,
                company.socialMedia?.linkedin,
              ].filter(Boolean),
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-pearlescent text-slate-deep min-h-screen flex flex-col">
        {/* Skip-to-content link pour accessibilité clavier */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-gold focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Aller au contenu principal
        </a>
        <BackgroundFilament />
        <Header />
        <main id="main-content" className="flex-grow" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        {/* WhatsApp floating button - CRO +45-60% conversion */}
        {company.cro?.whatsapp?.enabled && <WhatsAppButton />}
        {/* Mobile sticky bar - CRO +35% conversion */}
        {company.cro?.mobileStickyBar?.enabled && <MobileStickyBar />}
        {/* Exit-intent popup - CRO +10-15% recuperation */}
        {company.cro?.exitIntent?.enabled && <ExitIntentPopup />}
      </body>
    </html>
  );
}
