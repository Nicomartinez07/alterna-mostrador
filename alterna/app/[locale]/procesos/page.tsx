import { setRequestLocale, getTranslations } from 'next-intl/server';
import Section from '@/components/ui/Section';
import ProcessTimeline from '@/components/ui/ProcessTimeline';
import ProductsGrid from '@/components/products/ProductsGrid';
import { getProcessSteps, getProducts } from '@/lib/strapi';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'procesos' });

  return generatePageMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    locale,
    path: '/procesos'
  });
}

export default async function ProcesosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('procesos');

  const [processSteps, products] = await Promise.all([
    getProcessSteps(locale),
    getProducts(locale),
  ]);

  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Section
        title={t('title')}
        subtitle={t('subtitle')}
        className="bg-gradient-to-b from-white to-green-50"
      >
        <p className="text-center text-gray-600 max-w-3xl mx-auto">
          {t('description')}
        </p>
      </Section>

      <Section noPadding className="py-12 md:py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-5xl mx-auto px-4">
          <ProcessTimeline steps={processSteps} />
        </div>
      </Section>

      {featuredProducts.length > 0 && (
        <Section
          title={t('featuredProductsTitle')}
          subtitle={t('featuredProductsSubtitle')}
          className="bg-gray-50"
        >
          <ProductsGrid products={featuredProducts} />
        </Section>
      )}
    </>
  );
}
