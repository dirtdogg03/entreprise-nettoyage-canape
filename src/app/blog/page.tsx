import Link from 'next/link';
import Image from 'next/image';
import { articles, getPillarArticles, getArticlesByCategory, type Article } from '@/lib/data/articles';
import { seoDefaults } from '@/lib/data/company';
import CTABanner from '@/components/sections/CTABanner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Blog - Conseils Nettoyage Canapé${seoDefaults.titleSuffix}`,
  description: 'Découvrez nos conseils d\'experts pour le nettoyage, l\'entretien et le détachage de vos canapés. Guides complets, astuces et solutions professionnelles.',
  keywords: ['nettoyage canapé', 'entretien canapé', 'détacher canapé', 'nettoyer canapé tissu', 'nettoyer canapé cuir'],
};

// Category labels
const categoryLabels: Record<string, string> = {
  nettoyage: 'Nettoyage',
  détachage: 'Détachage',
  entretien: 'Entretien & Hygiène',
  pratique: 'Questions Pratiques',
};

// Category descriptions
const categoryDescriptions: Record<string, string> = {
  nettoyage: 'Techniques et méthodes de nettoyage pour tous types de canapés',
  détachage: 'Solutions pour éliminer les taches les plus tenaces',
  entretien: 'Conseils pour préserver la beauté de votre mobilier',
  pratique: 'Réponses à vos questions fréquentes',
};

export default function BlogPage() {
  const pillarArticles = getPillarArticles();
  const categories = ['nettoyage', 'détachage', 'entretien', 'pratique'] as const;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-slate-deep py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 relative text-center">
          <span className="font-mono text-xs font-bold text-gold uppercase tracking-[0.2em] mb-6 block">
            Le Journal
          </span>
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-white leading-none tracking-[-2px] mb-8">
            L&apos;Art du <span className="text-gold">Soin</span>
          </h1>
          <p className="mt-6 text-xl font-light text-white/80 max-w-2xl mx-auto">
            Conseils d&apos;experts, secrets d&apos;atelier et inspirations pour un intérieur d&apos;exception.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <div className="bg-white/10 px-6 py-4 rounded-lg">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-1">Articles</span>
              <span className="text-white font-bold text-2xl">{articles.length}</span>
            </div>
            <div className="bg-white/10 px-6 py-4 rounded-lg">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-1">Guides Complets</span>
              <span className="text-white font-bold text-2xl">{pillarArticles.length}</span>
            </div>
            <div className="bg-white/10 px-6 py-4 rounded-lg">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-1">Catégories</span>
              <span className="text-white font-bold text-2xl">{categories.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar Articles - Featured */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">
            Guides Complets
          </span>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">
            Nos articles de référence
          </h2>
          <p className="text-slate-deep/70 text-lg mb-10 max-w-2xl">
            Des guides exhaustifs rédigés par nos experts pour vous accompagner dans l&apos;entretien de votre mobilier.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {pillarArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block"
              >
                <div className="bg-slate-deep rounded-2xl h-full hover:shadow-xl transition-shadow relative overflow-hidden">
                  <div className="relative h-56 w-full">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-deep via-slate-deep/50 to-transparent" />
                  </div>
                  <div className="p-10 pt-6 relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] rounded-full pointer-events-none" />
                    <span className="inline-block bg-gold text-white text-[10px] font-bold uppercase px-3 py-1 rounded mb-4">
                      Guide Complet
                    </span>
                    <span className="font-mono text-xs text-gold uppercase tracking-wider block mb-4">
                      {categoryLabels[article.category]}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-gold transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-white/70 mb-6 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-white/50">{article.readingTime}</span>
                      <span className="text-white/30">•</span>
                      <span className="font-mono text-xs text-white/50">
                        {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles by Category */}
      {categories.map((category) => {
        const categoryArticles = getArticlesByCategory(category).filter(a => !a.isPillar);
        if (categoryArticles.length === 0) return null;

        return (
          <section key={category} className="py-20 bg-pearlescent border-b border-slate-deep/10 last:border-b-0">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
              <div className="flex items-baseline gap-4 mb-10">
                <span className="font-mono text-4xl font-bold text-gold">{categoryArticles.length}</span>
                <div>
                  <h2 className="text-3xl font-black tracking-tight">{categoryLabels[category]}</h2>
                  <p className="text-slate-deep/60">{categoryDescriptions[category]}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* All Articles Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">
            Tous les Articles
          </span>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-10">
            Parcourir l&apos;ensemble du blog
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block"
              >
                <div className="bg-pearlescent p-6 rounded-xl h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[10px] text-gold uppercase tracking-wider">
                      {categoryLabels[article.category]}
                    </span>
                    {article.isPillar && (
                      <span className="bg-gold/10 text-gold text-[9px] font-bold uppercase px-2 py-0.5 rounded">
                        Guide
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-deep mb-2 group-hover:text-gold transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-deep/60 line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                  <span className="font-mono text-xs text-slate-deep/40">
                    {article.readingTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

// Article Card Component
function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group block"
    >
      <div className="bg-white rounded-2xl h-full hover:shadow-lg transition-shadow overflow-hidden">
        <div className="relative h-48 w-full">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <span className="font-mono text-xs text-gold uppercase tracking-wider block mb-3">
            {categoryLabels[article.category]}
          </span>
          <h3 className="text-xl font-bold mb-3 group-hover:text-gold transition-colors">
            {article.title}
          </h3>
          <p className="text-slate-deep/70 text-sm mb-4 line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-slate-deep/50">
              {article.readingTime}
            </span>
            <span className="font-mono text-xs text-gold group-hover:translate-x-1 transition-transform">
              Lire →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
