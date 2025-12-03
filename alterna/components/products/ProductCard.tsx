'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Plus } from 'lucide-react';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { Product } from '@/types/strapi';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const params = useParams();
  const locale = params.locale as string;
  const imageUrl = product.photo?.url;
  const categoryName = product.category?.name;
  const [isAdding, setIsAdding] = useState(false);

return (
  <Link 
    href={`/${locale}/carta/${product.slug}`}
    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group"
  >
    {/* Image */}
    <div className="relative aspect-square bg-gray-100">
      <Image
        src={getStrapiImageUrl(imageUrl)}
        alt={product.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      {categoryName && (
        <div className="absolute top-2 left-2">
          <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full">
            {categoryName}
          </span>
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-4 flex-1 flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
        {product.title}
      </h3>
      
      {product.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
          {product.description.replace(/<[^>]*>/g, '')}
        </p>
      )}

      {/* Price and hover Add button */}
      <div className="flex items-center justify-between mt-auto">
        {/* Price */}
        <span className="text-2xl font-bold text-green-600">
          €{product.price.toFixed(2)}
        </span>

        {/* ADD BUTTON (hidden until hover) */}
        {onAddToCart && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={async (e) => {
                e.preventDefault(); // ← evita navegar al producto
                if (isAdding) return;

                setIsAdding(true);

                try {
                  if (onAddToCart.constructor.name === 'AsyncFunction') {
                    await onAddToCart(product);
                  } else {
                    onAddToCart(product);
                  }
                } catch (error) {
                  console.error('Error adding to cart:', error);
                } finally {
                  setTimeout(() => setIsAdding(false), 300);
                }
              }}
              disabled={isAdding}
              className={`group relative flex items-center gap-2 px-5 py-2.5 border-2 rounded-lg transition-all duration-300 hover:shadow-md ${
                isAdding 
                  ? 'border-green-400 text-green-600 bg-green-50 cursor-wait' 
                  : 'border-green-600 text-green-700 hover:bg-green-50 active:bg-green-100'
              }`}
              aria-label={`Añadir ${product.title} al carrito`}
            >
              {/* Línea decorativa */}
              <div className={`absolute left-0 top-0 w-1 h-full bg-green-600 transform transition-transform duration-500 origin-top ${
                isAdding ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
              }`} />

              {/* Icono o spinner */}
              {isAdding ? (
                <div className="w-5 h-5">
                  <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
              ) : (
                <Plus className="w-5 h-5 text-green-600 transition-transform group-hover:rotate-180 duration-500" />
              )}

              <span className="font-semibold">
                {isAdding ? 'Añadiendo...' : 'Agregar'}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  </Link>
);

}