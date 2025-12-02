import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductDetail from '@/components/products/ProductDetail';
import RelatedProducts from '@/components/products/RelatedProducts';
import { getProductBySlug, getRandomProducts } from '@/lib/strapi';
import { generatePageMetadata } from '@/lib/metadata';

interface ProductPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale);

  if (!product) {
    return generatePageMetadata({
      title: 'Producto no encontrado',
      description: 'El producto que buscas no existe',
      locale,
    });
  }

  return generatePageMetadata({
    title: product.title,
    description: product.description?.substring(0, 160) || `${product.title} - €${product.price}`,
    locale,
    path: `/carta/${slug}`,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRandomProducts(product.id, 4, locale);

  const breadcrumbItems = [
    { label: 'Inicio', href: '' },
    { label: 'Carta', href: '/carta' },
    ...(product.category ? [{ label: product.category.name }] : []),
    { label: product.title },
  ];

  return (
    <Section noPadding className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 bg-white">
        <Breadcrumbs items={breadcrumbItems} locale={locale} />
        
        <ProductDetail product={product} locale={locale} />
        
        <RelatedProducts products={relatedProducts} locale={locale} />
      </div>
    </Section>
  );
}