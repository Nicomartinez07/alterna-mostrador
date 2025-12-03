import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getSiteSettings, getProducts, getProcessSteps } from '@/lib/strapi';
import Hero from '@/components/ui/Hero';
import FeaturesSection from '@/components/home/FeaturesSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ProcessPreview from '@/components/home/ProcessPreview';
import StatsSection from '@/components/home/StatsSection';
import LocationQuick from '@/components/home/LocationQuick';
import Section from '@/components/ui/Section';
import { Link } from '@/navigation';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return generatePageMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    locale,
    path: '',
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch all data in parallel
  const [settings, products, processSteps] = await Promise.all([
    getSiteSettings(locale),
    getProducts(locale),
    getProcessSteps(locale),
  ]);

  // Get featured products (you can filter by a "featured" field or just take first 4)
  const featuredProducts = products.slice(0, 4);

  return <HomeContent 
    locale={locale} 
    settings={settings}
    featuredProducts={featuredProducts}
    processSteps={processSteps}
  />;
}

async function HomeContent({
  locale,
  settings,
  featuredProducts,
  processSteps,
}: {
  locale: string;
  settings: any;
  featuredProducts: any[];
  processSteps: any[];
}) {
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <>
      {/* 1. Hero */}
      <Hero
        title={settings?.nombre_local || 'Alterna Mostrador'}
        tagline={settings?.tagline || t('welcome')}
        imageUrl={settings?.hero_image?.url}
        ctaText={t('hero_cta')}
        ctaHref="/carta"
        locale={locale}
      />

      {/* 2. Features/Valores */}
      <FeaturesSection />

      {/* 3. Stats */}
      <StatsSection />

      {/* 4. Featured Products */}
      <FeaturedProducts
        products={featuredProducts}
        locale={locale}
        title={t('featured_title')}
        subtitle={t('featured_subtitle')}
      />

      {/* 5. Process Preview */}
      <ProcessPreview
        steps={processSteps}
        locale={locale}
        title={t('process_title')}
        subtitle={t('process_subtitle')}
      />

      {/* 6. Location Quick Info */}
      <LocationQuick settings={settings} locale={locale} />

      {/* 7. Final CTA */}
      <Section className="bg-[#1f4f49] text-white">
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            {t('cta_title')}
          </h3>
          <p className="text-green-50 mb-8 max-w-2xl mx-auto text-lg">
            {t('cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center ">
            <Link
              href="/carta"
              className="inline-block px-8 py-4 bg-white text-[#1f4f49] font-bold rounded-lg hover:bg-green-50 transition-colors shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              {t('cta_btn_menu')}
            </Link>
            <Link
              href="/takeaway"
              className="inline-block px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#1f4f49] transition-colors"
            >
              {t('cta_btn_takeaway')}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}