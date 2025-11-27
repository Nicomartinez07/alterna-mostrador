import { MapPin } from 'lucide-react';

interface MapEmbedProps {
  embedUrl?: string;
  address?: string;
}

export default function MapEmbed({ embedUrl, address }: MapEmbedProps) {
  // Si no hay URL de embed, mostrar placeholder
  if (!embedUrl) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-lg flex flex-col items-center justify-center p-8 text-center">
        <MapPin className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-600 font-medium mb-2">Mapa no disponible</p>
        {address && (
          <p className="text-sm text-gray-500">{address}</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación de Alterna Mostrador"
      />
    </div>
  );
}