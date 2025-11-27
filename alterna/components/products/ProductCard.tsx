'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { Product } from '@/types/strapi';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // Los datos vienen directamente, no en product.attributes
  const imageUrl = product.photo?.url;
  const categoryName = product.category?.name;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={getStrapiImageUrl(imageUrl)}
          alt={product.title}
          fill
          className="object-cover"
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        {product.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
            {product.description.replace(/<[^>]*>/g, '')}
          </p>
        )}

        {/* Price and Add button */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-green-600">
            €{product.price.toFixed(2)}
          </span>
          
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(product)}
              className="flex items-center gap-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
              aria-label={`Añadir ${product.title} al carrito`}
            >
              <Plus className="w-4 h-4" />
              <span>Añadir</span>
            </button>
          )}
        </div>

        {/* Allergens indicator */}
        {product.allergens && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Alérgenos: {product.allergens}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}