'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '@/types/strapi';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_STORAGE_KEY = 'alterna_cart';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      setItems(JSON.parse(stored));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((current) => {
      const index = current.findIndex((i) => i.product.id === product.id);
      if (index >= 0) {
        const updated = [...current];
        updated[index].quantity += quantity;
        return updated;
      }
      return [...current, { product, quantity }];
    });
  };

  const removeItem = (id: number) =>
    setItems((current) => current.filter((item) => item.product.id !== id));

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) return removeItem(id);
    setItems((current) =>
      current.map((item) =>
        item.product.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};
