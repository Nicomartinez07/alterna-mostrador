import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getSiteSettings } from '@/lib/strapi';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import { Link } from '@/navigation';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

// -----------------------------
// METADATA TRADUCIDA
// -----------------------------
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

// -----------------------------
// PAGE
// -----------------------------
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fija el locale para la renderización estática
  setRequestLocale(locale);

  const settings = await getSiteSettings(locale);

  return <HomeContent locale={locale} settings={settings} />;
}

// -----------------------------
// CLIENT-SAFE CONTENT
// -----------------------------
async function HomeContent({
  locale,
  settings,
}: {
  locale: string;
  settings: any;
}) {
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={settings?.nombre_local || 'Alterna Mostrador'}
        tagline={settings?.tagline || t('welcome')}
        imageUrl={settings?.hero_image?.url}
        ctaText={t('hero_cta')}
        ctaHref="/carta"
        locale={locale}
      />

      {/* Intro Section */}
      <Section
        title={t('intro_title')}
        subtitle={t('intro_subtitle')}
        className="bg-gray-50"
      >
        <div className="grid md:grid-cols-2 gap-8 text-gray-700">
          <div>
            <p className="mb-4">{t('intro_p1')}</p>
          </div>

          <div>
            <p className="mb-4">{t('intro_p2')}</p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-green-50">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {t('cta_title')}
          </h3>

          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            {t('cta_subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Botón: Carta */}
            <Link
              href="/carta"
              className="inline-block px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              {t('cta_btn_menu')}
            </Link>

            {/* Botón: Contacto */}
            <Link
              href="/contacto"
              className="inline-block px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
            >
              {t('cta_btn_contact')}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
