import { setRequestLocale } from 'next-intl/server';
import Section from '@/components/ui/Section';
import { getSiteSettings } from '@/lib/strapi';
import { Smartphone, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';

export default async function TakeawayPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const settings = await getSiteSettings();

  return (
    <>
      {/* Hero section */}
      <Section
        title="Pedí para llevar"
        subtitle="Disfrutá nuestros productos desde casa o la oficina"
        className="bg-gradient-to-b from-white to-blue-50"
      >
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Realizá tu pedido fácilmente a través de nuestras plataformas de delivery 
          o directamente por WhatsApp para retiro en el local.
        </p>
      </Section>

      {/* Delivery platforms */}
      <Section title="Plataformas de Delivery" className='bg-gradient-to-b from-blue-50 to-white'>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Glovo */}
          {settings?.takeaway_url_glovo ? (
            <a
              href={settings.takeaway_url_glovo}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-8 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-bold">Glovo</h3>
                  <Smartphone className="w-10 h-10" />
                </div>
                <p className="text-white/90 mb-6">
                  Delivery rápido en menos de 30 minutos
                </p>
                <div className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-full font-semibold group-hover:bg-orange-50 transition-colors">
                  Pedir ahora
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          ) : (
            <div className="bg-gray-100 rounded-2xl p-8 text-center bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-8 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
              <h3 className="text-2xl font-bold text-gray-400 mb-2">Glovo</h3>
              <p className="text-gray-500">Próximamente disponible</p>
            </div>
          )}

          {/* Uber Eats */}
          {settings?.takeaway_url_uber ? (
            <a
              href={settings.takeaway_url_uber}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-8 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-bold">Uber Eats</h3>
                  <Smartphone className="w-10 h-10" />
                </div>
                <p className="text-white/90 mb-6">
                  Seguí tu pedido en tiempo real
                </p>
                <div className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-full font-semibold group-hover:bg-green-50 transition-colors">
                  Pedir ahora
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          ) : (
            <div className="bg-gray-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-400 mb-2">Uber Eats</h3>
              <p className="text-gray-500">Próximamente disponible</p>
            </div>
          )}
        </div>
      </Section>

      {/* WhatsApp order */}
      <Section className="bg-green-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            O pedí por WhatsApp
          </h3>
          <p className="text-gray-600 mb-8">
            Contactanos directamente para hacer tu pedido y retirarlo en el local. 
            Sin comisiones, directo con nosotros.
          </p>
          
          {settings?.whatsapp && (
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=Hola! Quiero hacer un pedido para llevar 🌱`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Pedir por WhatsApp
            </a>
          )}
        </div>
      </Section>

      {/* Info adicional */}
      <Section title="Información importante" className='bg-green-50'>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Horarios</h4>
            <p className="text-sm text-gray-600">
              Pedidos de Lun-Vie: 10:00 - 20:00<br/>
              Sáb-Dom: 11:00 - 18:00
            </p>
          </div>

          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Zona de entrega</h4>
            <p className="text-sm text-gray-600">
              Barcelona ciudad<br/>
              Radio de 5km del local
            </p>
          </div>

          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4">
              <Smartphone className="w-6 h-6 text-amber-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Pedido mínimo</h4>
            <p className="text-sm text-gray-600">
              €15 para delivery<br/>
              Sin mínimo para retiro
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}