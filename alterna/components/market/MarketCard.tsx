import Image from 'next/image';
import { Instagram, Phone } from 'lucide-react';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { MarketItem } from '@/types/strapi';

interface MarketCardProps {
  item: MarketItem;
}

export default function MarketCard({ item }: MarketCardProps) {
  const imageUrl = item.photo?.url;
  
  // Format WhatsApp number (remove non-digits)
  const whatsappNumber = item.vendor_contact_whatsapp?.replace(/\D/g, '');
  const whatsappLink = whatsappNumber 
    ? `https://wa.me/${whatsappNumber}?text=Hola! Vi tu producto "${item.title}" en Alterna Mostrador`
    : null;

  // Format Instagram handle
  const instagramHandle = item.vendor_instagram?.replace('@', '');
  const instagramLink = instagramHandle
    ? `https://instagram.com/${instagramHandle}`
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-100">
        <Image
          src={getStrapiImageUrl(imageUrl)}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
        />
        {/* Price badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-green-600 text-white px-3 py-1.5 rounded-full font-bold text-lg shadow-lg">
            €{item.price.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Product title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {item.title}
        </h3>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
            {item.description}
          </p>
        )}

        {/* Vendor section */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
            Vendedor
          </p>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-900">{item.vendor_name}</p>
            
            {/* Contact buttons */}
            <div className="flex gap-2">
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                  aria-label={`Contactar a ${item.vendor_name} por WhatsApp`}
                >
                  <Phone className="w-4 h-4" />
                </a>
              )}
              
              {instagramLink && (
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors"
                  aria-label={`Ver Instagram de ${item.vendor_name}`}
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Availability dates */}
        {(item.available_from || item.available_to) && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              {item.available_from && item.available_to ? (
                <>
                  Disponible del {new Date(item.available_from).toLocaleDateString('es-ES')} 
                  {' '}al {new Date(item.available_to).toLocaleDateString('es-ES')}
                </>
              ) : item.available_from ? (
                <>Disponible desde {new Date(item.available_from).toLocaleDateString('es-ES')}</>
              ) : (
                <>Disponible hasta {new Date(item.available_to!).toLocaleDateString('es-ES')}</>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}