import type { SiteSettings } from '@/types/strapi';
import { getStrapiImageUrl } from '@/lib/strapi';

interface RestaurantSchemaProps {
  settings: SiteSettings | null;
}

export default function RestaurantSchema({ settings }: RestaurantSchemaProps) {
  if (!settings) return null;

  // Obtener la URL de la imagen de manera segura
  const getHeroImageUrl = () => {
    if (!settings.hero_image) return undefined;
    
    // Dependiendo de la estructura de tu consulta GraphQL/REST
    const imageUrl =
      settings.hero_image.data?.attributes?.url;
    
    return imageUrl ? getStrapiImageUrl(imageUrl) : undefined;
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: settings.nombre_local,
    image: getHeroImageUrl(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.direccion,
      addressLocality: 'Barcelona',
      addressCountry: 'ES',
    },
    telephone: settings.telefono,
    email: settings.email,
    servesCuisine: 'Vegan',
    priceRange: '€€',
    acceptsReservations: false,
    takeoutEnabled: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}