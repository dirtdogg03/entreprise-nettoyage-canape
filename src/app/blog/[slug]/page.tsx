import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { articles, getArticleBySlug, getAllArticleSlugs, getRelatedArticles } from '@/lib/data/articles';
import { services, getServiceBySlug, type Service } from '@/lib/data/services';
import { company, seoDefaults, schemaLocalBusiness } from '@/lib/data/company';
import CTABanner from '@/components/sections/CTABanner';
import type { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article non trouvé' };
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      locale: 'fr_FR',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [company.name],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article);
  const relatedServices = article.relatedServices
    .map((slug: string) => getServiceBySlug(slug))
    .filter((s: Service | undefined): s is Service => s !== undefined);

  // Category labels
  const categoryLabels: Record<string, string> = {
    nettoyage: 'Nettoyage',
    detachage: 'Détachage',
    entretien: 'Entretien & Hygiène',
    pratique: 'Questions Pratiques',
  };

  // Schema.org Article
  const schemaArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    author: {
      "@type": "Organization",
      name: company.name,
      url: `https://${company.domain}`,
    },
    publisher: schemaLocalBusiness,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://${company.domain}/blog/${article.slug}`,
    },
  };

  // Schema.org FAQPage
  const schemaFAQ = article.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item: { question: string; answer: string }) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } : null;

  // Schema.org BreadcrumbList
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: `https://${company.domain}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `https://${company.domain}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryLabels[article.category],
        item: `https://${company.domain}/blog?categorie=${article.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: article.title,
      },
    ],
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }}
      />
      {schemaFAQ && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />

      {/* Hero Section */}
      <section className="bg-slate-deep relative overflow-hidden">
        {/* Featured Image */}
        <div className="relative h-[40vh] min-h-[300px] max-h-[500px] w-full">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-deep/30 via-slate-deep/60 to-slate-deep" />
        </div>

        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 relative pb-16 -mt-32">
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Link href="/blog" className="font-mono text-xs text-gold uppercase tracking-[0.2em] hover:underline">
              Blog
            </Link>
            <span className="text-white/50">/</span>
            <span className="font-mono text-xs text-white/70 uppercase tracking-[0.2em]">
              {categoryLabels[article.category]}
            </span>
          </div>

          {article.isPillar && (
            <span className="inline-block bg-gold text-white text-[10px] font-bold uppercase px-3 py-1 rounded mb-6">
              Guide Complet
            </span>
          )}

          <h1 className="text-[clamp(2rem,5vw,4rem)] font-black leading-tight tracking-[-2px] text-white mb-6">
            {article.title}
          </h1>

          <p className="text-xl text-white/70 max-w-3xl leading-relaxed mb-8">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="bg-white/10 px-6 py-4 rounded-lg backdrop-blur-sm">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-1">Publié le</span>
              <span className="text-white font-bold text-lg">
                {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="bg-white/10 px-6 py-4 rounded-lg backdrop-blur-sm">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-1">Temps de lecture</span>
              <span className="text-white font-bold text-lg">{article.readingTime}</span>
            </div>
            <div className="bg-white/10 px-6 py-4 rounded-lg backdrop-blur-sm">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-1">Catégorie</span>
              <span className="text-white font-bold text-lg">{categoryLabels[article.category]}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none text-slate-deep/80
                  prose-headings:text-slate-deep prose-headings:font-black prose-headings:tracking-tight
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:leading-relaxed prose-p:mb-6
                  prose-ul:space-y-2 prose-li:text-slate-deep/80
                  prose-strong:text-slate-deep prose-strong:font-bold
                  prose-a:text-gold prose-a:no-underline hover:prose-a:underline">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold hover:underline"
                      >
                        {children}
                      </a>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-8">
                        <table className="min-w-full border-collapse">{children}</table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="bg-slate-deep !text-white font-bold px-4 py-3 text-left text-sm uppercase tracking-wider">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-3 border-b border-slate-deep/10 text-slate-deep/80">
                        {children}
                      </td>
                    ),
                    h2: ({ children }) => {
                      const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      return <h2 id={id}>{children}</h2>;
                    },
                    h3: ({ children }) => {
                      const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      return <h3 id={id}>{children}</h3>;
                    },
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 space-y-2 my-4">{children}</ul>
                    ),
                    hr: () => <hr className="my-8 border-slate-deep/20" />,
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                {/* CTA Box */}
                <div className="bg-pearlescent p-8 rounded-2xl">
                  <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">
                    Besoin d&apos;un Expert ?
                  </span>
                  <h3 className="text-2xl font-bold mb-4">
                    Devis Gratuit
                  </h3>
                  <p className="text-slate-deep/70 mb-6">
                    Nos experts interviennent à domicile pour redonner vie à vos canapés.
                  </p>
                  <div className="space-y-4">
                    <a
                      href={`tel:${company.phone.replace(/\s/g, '')}`}
                      className="btn-luxury w-full text-center block"
                    >
                      {company.phone}
                    </a>
                    <Link
                      href="/contact"
                      className="block w-full text-center py-4 px-6 border-2 border-slate-deep text-slate-deep font-bold uppercase tracking-wider text-sm hover:bg-slate-deep hover:text-white transition-colors"
                    >
                      Demander un devis
                    </Link>
                  </div>
                </div>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                  <div className="bg-white border border-slate-deep/10 p-8 rounded-2xl">
                    <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">
                      Services Associés
                    </span>
                    <ul className="space-y-4">
                      {relatedServices.map((service: Service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="flex items-center gap-3 group"
                          >
                            <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                            <span className="text-slate-deep group-hover:text-gold transition-colors">
                              {service.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Table of Contents for Pillar Articles */}
                {article.isPillar && (
                  <div className="bg-white border border-slate-deep/10 p-8 rounded-2xl">
                    <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">
                      Sommaire
                    </span>
                    <nav className="space-y-2 text-sm">
                      {extractHeadings(article.content).map((heading, index) => (
                        <a
                          key={index}
                          href={`#${heading.id}`}
                          className="block text-slate-deep/70 hover:text-gold transition-colors py-1"
                          style={{ paddingLeft: heading.level === 3 ? '1rem' : 0 }}
                        >
                          {heading.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {article.faq.length > 0 && (
        <section className="py-24 bg-pearlescent">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">
              Questions Fréquentes
            </span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-10">
              FAQ - {article.title}
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {article.faq.map((item: { question: string; answer: string }, index: number) => (
                <div key={index} className="bg-white p-8 rounded-2xl">
                  <h3 className="font-bold text-lg mb-3">{item.question}</h3>
                  <p className="text-slate-deep/70">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-4">
              Articles Liés
            </span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-10">
              Continuez votre lecture
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.slice(0, 3).map((relatedArticle) => (
                <Link
                  key={relatedArticle.slug}
                  href={`/blog/${relatedArticle.slug}`}
                  className="group block"
                >
                  <div className="bg-pearlescent p-8 rounded-2xl h-full hover:shadow-lg transition-shadow">
                    <span className="font-mono text-xs text-gold uppercase tracking-wider block mb-4">
                      {categoryLabels[relatedArticle.category]}
                    </span>
                    {relatedArticle.isPillar && (
                      <span className="inline-block bg-gold/10 text-gold text-[10px] font-bold uppercase px-2 py-1 rounded mb-3">
                        Guide
                      </span>
                    )}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-gold transition-colors">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-slate-deep/70 text-sm mb-4 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                    <span className="font-mono text-xs text-slate-deep/50">
                      {relatedArticle.readingTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}

// Helper function to extract headings for table of contents
function extractHeadings(content: string): { text: string; id: string; level: number }[] {
  const headings: { text: string; id: string; level: number }[] = [];
  const regex = /^(#{2,3}) (.+)$/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    headings.push({ text, id, level });
  }

  return headings;
}
