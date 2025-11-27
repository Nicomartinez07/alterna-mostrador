'use client';

import { useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CartItem from './CartItem';
import { useCart } from '@/hooks/useCart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber?: string;
}

export default function CartDrawer({ isOpen, onClose, whatsappNumber }: CartDrawerProps) {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;

    // Build WhatsApp message
    let message = '¡Hola Alterna Mostrador! 🌱\n\n';
    message += 'Me gustaría hacer el siguiente pedido:\n\n';

    items.forEach((item) => {
      message += `• ${item.quantity}x ${item.product.title} - €${(item.product.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total: €${total.toFixed(2)}*\n\n`;
    message += '¿Está disponible para retirar en el local?\n';
    message += 'Gracias 😊';

    const encodedMessage = encodeURIComponent(message);
    const phone = whatsappNumber?.replace(/\D/g, '') || '34600000000';
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Tu Carrito
                </h2>
                {items.length > 0 && (
                  <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg font-medium mb-2">
                    Tu carrito está vacío
                  </p>
                  <p className="text-gray-400 text-sm">
                    Agrega productos para hacer tu pedido
                  </p>
                </div>
              ) : (
                <div className="space-y-0">
                  {items.map((item) => (
                    <CartItem
                      key={item.product.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="font-bold text-green-600 text-2xl">
                    €{total.toFixed(2)}
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Enviar pedido por WhatsApp
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full border-2 border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}