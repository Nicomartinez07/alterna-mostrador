"use client";
import { useTranslations } from 'next-intl';
import ProductCard from './ProductCard';
import type { Product } from '@/types/strapi';
import { useCart } from '@/contexts/CartContext';

interface ProductsGridProps {
  products: Product[];
  onAddToCart?: (product: Product, quantity?: number) => void;
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  const t = useTranslations('ProcessPage');
  const { addItem } = useCart();

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {t('emptyProducts')}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addItem}
        />
      ))}
    </div>
  );
}