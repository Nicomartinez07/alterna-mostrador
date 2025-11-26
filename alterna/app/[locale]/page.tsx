import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { getSiteSettings } from '@/lib/strapi';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const settings = await getSiteSettings();

  return (
    <HomeContent locale={locale} settings={settings} />
  );
}

function HomeContent({ 
  locale, 
  settings 
}: { 
  locale: string; 
  settings: any;
}) {
  const t = useTranslations('home');

  return (
    <>
      {/* Hero */}
      <Hero
        title={settings?.nombre_local || 'Alterna Mostrador'}
        tagline={settings?.tagline || t('welcome')}
        imageUrl={settings?.hero_image?.url}
        ctaText={t('hero_cta')}
        ctaHref="/carta"
        locale={locale}
      />

      {/* Introduction Section */}
      <Section
        title="Comida vegana artesanal"
        subtitle="Elaborada con amor y los mejores ingredientes de la tierra"
      >
        <div className="grid md:grid-cols-2 gap-8 text-gray-700">
          <div>
            <p className="mb-4">
              En Alterna Mostrador creemos que la comida vegana puede ser deliciosa, 
              nutritiva y sostenible. Cada día preparamos nuestros productos de forma 
              artesanal, con ingredientes frescos y de proximidad.
            </p>
          </div>
          <div>
            <p className="mb-4">
              Desde empanadas hasta panes de masa madre, cada bocado está pensado 
              para nutrir tu cuerpo y respetar el planeta. Te invitamos a descubrir 
              nuestros sabores y a formar parte de esta alternativa consciente.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-green-50">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            ¿Listo para probar?
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Visítanos en nuestro local o haz tu pedido para llevar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
              href={`/${locale}/carta`}
              className="inline-block px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Ver carta
            </a>
            
              href={`/${locale}/contacto`}
              className="inline-block px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
            >
              Cómo llegar
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}