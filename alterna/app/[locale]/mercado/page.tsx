import { setRequestLocale, getTranslations } from 'next-intl/server';
import Section from '@/components/ui/Section';
import MarketGrid from '@/components/market/MarketGrid';
import { getMarketItems, getSiteSettings } from '@/lib/strapi';
import { Calendar, Users } from 'lucide-react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'market' });
  
  return generatePageMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: '/mercado',
  });
}

export default async function MercadoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Obtener las traducciones
  const t = await getTranslations('market');

  const [marketItems, settings] = await Promise.all([
    getMarketItems(locale),
    getSiteSettings(locale), // ← Pasar el locale aquí también
  ]);

  return (
    <>
      {/* Hero section */}
      <Section
        title={t('title')}
        subtitle={t('subtitle')}
        className="bg-gradient-to-b from-amber-50 to-gray-50"
      >
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
          {t('description')}
        </p>

        {/* Info cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-start gap-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {t('info.weeklyProducts.title')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('info.weeklyProducts.description')}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {t('info.directContact.title')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('info.directContact.description')}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Market items */}
      <Section noPadding className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <MarketGrid items={marketItems} />
        </div>
      </Section>

      {/* CTA section */}
      {marketItems.length > 0 && (
        <Section className="bg-gray-50">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('cta.title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('cta.description')}
            </p>
            {settings?.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=Hola! Quiero ser parte del mercado semanal`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                {t('cta.button')}
              </a>
            )}
          </div>
        </Section>
      )}
    </>
  );
}