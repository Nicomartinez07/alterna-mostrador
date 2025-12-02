'use client';

import { Minus, Plus } from 'lucide-react';

interface ProductQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export default function ProductQuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 20,
}: ProductQuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-gray-700">Cantidad:</span>
      <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
        <button
          onClick={handleDecrement}
          disabled={quantity <= min}
          className="p-2 hover:bg-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Disminuir cantidad"
        >
          <Minus className="w-4 h-4 text-gray-700" />
        </button>
        
        <span className="w-12 text-center font-semibold text-gray-900">
          {quantity}
        </span>
        
        <button
          onClick={handleIncrement}
          disabled={quantity >= max}
          className="p-2 hover:bg-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Aumentar cantidad"
        >
          <Plus className="w-4 h-4 text-gray-700" />
        </button>
      </div>
    </div>
  );
}