"use client";
import ProductCard from './ProductCard';
import type { Product } from '@/types/strapi';
import { useCart } from '@/hooks/useCart';
interface ProductsGridProps {
  products: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
}

export default function ProductsGrid({ products}: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No hay productos disponibles
      </div>
    );
  }
  const { addItem } = useCart();
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

