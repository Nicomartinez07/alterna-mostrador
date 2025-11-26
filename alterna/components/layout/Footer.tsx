import { useTranslations } from 'next-intl';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import type { SiteSettings } from '@/types/strapi';

interface FooterProps {
  settings?: SiteSettings | null;
}

export default function Footer({ settings }: FooterProps) {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {settings?.nombre_local || 'Alterna Mostrador'}
            </h3>
            <div className="space-y-2 text-sm">
              {settings?.direccion && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{settings.direccion}</span>
                </div>
              )}
              {settings?.telefono && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a 
                    href={`tel:${settings.telefono}`}
                    className="hover:text-white transition-colors"
                  >
                    {settings.telefono}
                  </a>
                </div>
              )}
              {settings?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a 
                    href={`mailto:${settings.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {settings.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Horarios */}
          {settings?.horarios && (
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Horarios</h3>
              <div 
                className="text-sm prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: settings.horarios }}
              />
            </div>
          )}

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {t('follow_us')}
            </h3>
            <div className="flex gap-4">
              {settings?.instagram && (
                <a
                  href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {settings?.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="WhatsApp"
                >
                  <Phone className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-800 text-center text-sm">
          <p>
            © {currentYear} {settings?.nombre_local || 'Alterna Mostrador'}. {t('rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}