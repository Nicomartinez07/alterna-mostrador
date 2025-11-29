import { setRequestLocale } from 'next-intl/server';
import Section from '@/components/ui/Section';
import ContactForm from '@/components/contact/ContactForm';
import MapEmbed from '@/components/contact/MapEmbed';
import { getSiteSettings } from '@/lib/strapi';
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  return generatePageMetadata({
    title: 'Contacto',
    description: 'Contáctanos para consultas, sugerencias o pedidos. Encuentra nuestra ubicación y horarios.',
    locale,
    path: '/contacto',
  });
}

export default async function ContactoPage({
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
        title="Contáctanos"
        subtitle="Estamos aquí para ayudarte"
        className="bg-gradient-to-b from-white to-green-50"
      >
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          ¿Tenés dudas, consultas o querés hacer una sugerencia? 
          Escribinos y te responderemos lo antes posible.
        </p>
      </Section>

      {/* Main content */}
      <Section noPadding className="py-12 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info + Form */}
            <div className="space-y-8">
              {/* Contact cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {settings?.direccion && (
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <MapPin className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                        <p className="text-sm text-gray-600">{settings.direccion}</p>
                      </div>
                    </div>
                  </div>
                )}

                {settings?.telefono && (
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                        <a 
                          href={`tel:${settings.telefono}`}
                          className="text-sm text-green-600 hover:text-green-700"
                        >
                          {settings.telefono}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {settings?.email && (
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                        <a 
                          href={`mailto:${settings.email}`}
                          className="text-sm text-blue-600 hover:text-blue-700 break-all"
                        >
                          {settings.email}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {settings?.instagram && (
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-pink-100 rounded-lg">
                        <Instagram className="w-5 h-5 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Instagram</h3>
                        <a 
                          href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-pink-600 hover:text-pink-700"
                        >
                          {settings.instagram}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Horarios */}
              {settings?.horarios && (
                <div className="bg-amber-50 rounded-lg p-6 border border-amber-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-200 rounded-lg">
                      <Clock className="w-5 h-5 text-amber-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">Horarios</h3>
                      <div 
                        className="text-sm text-gray-700 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: settings.horarios }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Contact form */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Envianos un mensaje
                </h3>
                <ContactForm/>
              </div>
            </div>

            {/* Map */}
            <div className="lg:sticky lg:top-24 h-[500px] lg:h-[700px]">
              <MapEmbed 
                embedUrl={settings?.google_maps_embed_url}
                address={settings?.direccion}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}