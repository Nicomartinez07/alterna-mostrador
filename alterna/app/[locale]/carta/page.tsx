import { setRequestLocale } from 'next-intl/server';
import Section from '@/components/ui/Section';
import CartaContent from '@/components/products/CartaContent';
import { getProducts, getProductCategories } from '@/lib/strapi';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  return generatePageMetadata({
    title: 'Carta',
    description: 'Descubre nuestra carta de productos veganos artesanales: empanadas, panes, postres y más.',
    locale,
    path: '/carta',
  });
}

export default async function CartaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [products, categories] = await Promise.all([
    getProducts(locale),
    getProductCategories(locale),
  ]);

  return (
    <>
      {/* Hero section */}
      <Section
        title="Nuestra Carta"
        subtitle="Productos frescos y artesanales elaborados con amor"
        className="bg-gradient-to-b from-white to-green-50"
      >
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Todos nuestros productos son 100% veganos, elaborados diariamente 
          con ingredientes frescos y de temporada.
        </p>
      </Section>

      {/* Products with filters */}
      <Section noPadding className="py-8 md:py-12 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <CartaContent products={products} categories={categories} />
        </div>
      </Section>
    </>
  );
}