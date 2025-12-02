import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { CartItem as CartItemType } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item;
  const imageUrl = product.photo?.url;
  const subtotal = product.price * quantity;

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-b-0">
      {/* Image */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={getStrapiImageUrl(imageUrl)}
          alt={product.title}
          fill
          className="object-cover"
          sizes="80px"
          unoptimized
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">
          {product.title}
        </h4>
        <p className="text-sm font-bold text-green-600 mb-2">
          €{product.price.toFixed(2)}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
            <button
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-4 h-4 text-gray-700" />
            </button>
            <span className="w-8 text-center text-black font-semibold text-sm">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          <button
            onClick={() => onRemove(product.id)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Eliminar producto"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="text-right">
        <p className="font-bold text-gray-900">
          €{subtotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
}