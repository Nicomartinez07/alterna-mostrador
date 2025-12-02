'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Product } from '@/types/strapi';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'alterna_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  }, [items, isLoaded]);

  // Add item to cart
  const addItem = (product: Product, quantity: number = 1) => {
    setItems((current) => {
      const existingIndex = current.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIndex >= 0) {
        // Update quantity if item exists
        const updated = [...current];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        // Add new item
        return [...current, { product, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeItem = (productId: number) => {
    setItems((current) => current.filter((item) => item.product.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
  };

  // Calculate total
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Get item count
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    items,
    itemCount,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isLoaded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook personalizado para usar el carrito
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}