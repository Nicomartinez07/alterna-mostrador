'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { Product } from '@/types/strapi';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // Los datos vienen directamente, no en product.attributes
  const imageUrl = product.photo?.url;
  const categoryName = product.category?.name;
  const [isAdding, setIsAdding] = useState(false);

  // Función segura para limpiar HTML de la descripción
  const getCleanDescription = (description: any): string => {
    if (!description) return '';
    
    // Convertir a string si no lo es
    const descString = String(description);
    
    // Eliminar etiquetas HTML si existen
    return descString.replace(/<[^>]*>/g, '');
  };

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
          unoptimized
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
            {getCleanDescription(product.description)}
          </p>
        )}

       {/* Price and Add button */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-green-600">
            €{product.price.toFixed(2)}
          </span>
          
          {onAddToCart && (
            <button
              onClick={async () => {
                if (isAdding) return; // Evitar clics múltiples
                
                setIsAdding(true);
                
                try {
                  // Si onAddToCart es async/await
                  if (onAddToCart.constructor.name === 'AsyncFunction') {
                    await onAddToCart(product);
                  } else {
                    onAddToCart(product);
                  }
                } catch (error) {
                  console.error('Error adding to cart:', error);
                } finally {
                  // Pequeña pausa para feedback visual
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
              
              {/* Tooltip sutil - solo en hover si no está añadiendo */}
              {!isAdding && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  ¡Agregado al carrito!
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
              )}
              
              {/* Tooltip para cuando está añadiendo */}
              {isAdding && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs py-1 px-2 rounded opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  Procesando...
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-blue-600 rotate-45" />
                </div>
              )}
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