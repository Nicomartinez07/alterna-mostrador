import Link from 'next/link';
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react';
import type { SiteSettings } from '@/types/strapi';

interface LocationQuickProps {
  settings: SiteSettings | null;
  locale: string;
}

export default function LocationQuick({ settings, locale }: LocationQuickProps) {
  if (!settings) return null;

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Info Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Visítanos
            </h2>
            
            <div className="space-y-4 mb-8">
              {/* Address */}
              {settings.direccion && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                    <p className="text-gray-600">{settings.direccion}</p>
                  </div>
                </div>
              )}

              {/* Hours */}
              {settings.horarios && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horarios</h3>
                    <div 
                      className="text-gray-600 text-sm prose prose-sm"
                      dangerouslySetInnerHTML={{ __html: settings.horarios }}
                    />
                  </div>
                </div>
              )}

              {/* Phone */}
              {settings.telefono && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                    <a 
                      href={`tel:${settings.telefono}`}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      {settings.telefono}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1f4f49] text-white font-semibold rounded-lg hover:[#1f4f49] transition-colors group"
              >
                Cómo llegar
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {settings.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=Hola! Tengo una consulta`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#1f4f49] text-[#1f4f49] font-semibold rounded-lg hover:bg-green-50 transition-colors"
                >
                  Escribinos por WhatsApp
                </a>
              )}
            </div>
          </div>

          {/* Map Side */}
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            {settings.google_maps_embed_url ? (
              <iframe
                src={settings.google_maps_embed_url}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Alterna Mostrador"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-16 h-16 mx-auto mb-2" />
                  <p>Mapa no disponible</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}