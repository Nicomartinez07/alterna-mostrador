import { setRequestLocale } from 'next-intl/server';
import Section from '@/components/ui/Section';
import ProcessTimeline from '@/components/ui/ProcessTimeline';
import ProductsGrid from '@/components/products/ProductsGrid';
import { getProcessSteps, getProducts } from '@/lib/strapi';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  return generatePageMetadata({
    title: 'Procesos Artesanales',
    description: 'Conoce nuestro proceso de elaboración artesanal, desde la selección de ingredientes hasta el producto final.',
    locale,
    path: '/procesos',
  });
}

export default async function ProcesosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [processSteps, products] = await Promise.all([
    getProcessSteps(locale),
    getProducts(locale),
  ]);

  // Tomar solo los primeros 4 productos para destacar
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      {/* Hero section */}
      <Section 
        title="Nuestro Proceso Artesanal"
        subtitle="Desde la selección de ingredientes hasta el producto final"
        className="bg-gradient-to-b from-white to-green-50"
      >
        <p className="text-center text-gray-600 max-w-3xl mx-auto">
          En Alterna Mostrador, cada producto es elaborado con dedicación y respeto 
          por los ingredientes. Conocé nuestro proceso de principio a fin.
        </p>
      </Section>

      {/* Process Timeline */}
      <Section noPadding className="py-12 md:py-16 bg-gradient-to-b from-green-50 to-white ">
        <div className="max-w-5xl mx-auto px-4">
          <ProcessTimeline steps={processSteps} />
        </div>
      </Section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <Section 
          title="Productos Destacados"
          subtitle="Algunos de nuestros favoritos"
          className="bg-gray-50"
        >
          <ProductsGrid products={featuredProducts} />
        </Section>
      )}
    </>
  );
}