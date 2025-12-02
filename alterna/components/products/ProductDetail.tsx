'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Share2, ShoppingCart, Tag } from 'lucide-react';
import { getStrapiImageUrl } from '@/lib/strapi';
import { useCart } from '@/contexts/CartContext';
import ProductQuantitySelector from './ProductQuantitySelector';
import type { Product } from '@/types/strapi';

interface ProductDetailProps {
  product: Product;
  locale: string;
}

export default function ProductDetail({ product, locale }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
  };

  const handleShare = () => {
    const url = window.location.href;
    const text = `¡Mirá este producto de Alterna Mostrador! ${product.title} - €${product.price.toFixed(2)}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const imageUrl = getStrapiImageUrl(product.photo?.url);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Image Section */}
        <div className="relative aspect-square md:aspect-auto md:min-h-[500px] bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          
          {/* Category badge */}
          {product.category && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700 shadow-md">
                <Tag className="w-4 h-4" />
                {product.category.name}
              </span>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="p-6 md:p-8 flex flex-col">
          {/* Title & Price */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-green-600">
                €{product.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Descripción
              </h2>
              <div
                className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Ingredientes
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.ingredients}
              </p>
            </div>
          )}

          {/* Allergens */}
          {product.allergens && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h2 className="text-sm font-semibold text-amber-900 mb-1">
                ⚠️ Alérgenos
              </h2>
              <p className="text-sm text-amber-800">
                {product.allergens}
              </p>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6 mt-auto">
            <ProductQuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-4 rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="w-5 h-5" />
              Añadir al carrito
            </button>
            
            <button
              onClick={handleShare}
              className="sm:w-auto px-6 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              aria-label="Compartir producto"
            >
              <Share2 className="w-5 h-5" />
              <span className="sm:hidden">Compartir</span>
            </button>
          </div>

          {/* Added message */}
          {showAddedMessage && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center animate-fade-in">
              ✓ Producto añadido al carrito
            </div>
          )}

          {/* Availability badges */}
          <div className="flex gap-2 mt-6 pt-6 border-t border-gray-200">
            {product.is_takeaway_available && (
              <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                🚀 Disponible para llevar
              </span>
            )}
            {product.is_on_menu && (
              <span className="inline-flex items-center px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                📋 En carta
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}