import { setRequestLocale } from 'next-intl/server';
import Section from '@/components/ui/Section';
import MarketGrid from '@/components/market/MarketGrid';
import { getMarketItems, getSiteSettings } from '@/lib/strapi';
import { Calendar, Users } from 'lucide-react';

export default async function MercadoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [marketItems, settings] = await Promise.all([
    getMarketItems(locale),
    getSiteSettings(),
  ]);

  return (
    <>
      {/* Hero section */}
      <Section
        title="Mercado Semanal"
        subtitle="Productos seleccionados de nuestros colaboradores"
        className="bg-gradient-to-b from-amber-50 to-white"
      >
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
          Cada semana traemos productos artesanales de pequeños productores locales. 
          Apoyá el comercio justo y conocé directamente a quienes elaboran estos productos.
        </p>

        {/* Info cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-start gap-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Productos semanales
              </h3>
              <p className="text-sm text-gray-600">
                Nuevos productos cada semana. Consulta disponibilidad.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Contacto directo
              </h3>
              <p className="text-sm text-gray-600">
                Habla directamente con los productores por WhatsApp o Instagram.
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
              ¿Sos productor local?
            </h3>
            <p className="text-gray-600 mb-6">
              Si elaborás productos artesanales y querés formar parte de nuestro 
              mercado semanal, contactanos.
            </p>
            {settings?.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=Hola! Quiero ser parte del mercado semanal`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Contactar por WhatsApp
              </a>
            )}
          </div>
        </Section>
      )}
    </>
  );
}