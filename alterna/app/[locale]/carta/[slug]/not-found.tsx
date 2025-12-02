import Link from 'next/link';
import Section from '@/components/ui/Section';
import { ArrowLeft } from 'lucide-react';

export default function ProductNotFound() {
  return (
    <Section>
      <div className="text-center py-16 bg-white">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Producto no encontrado
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          El producto que buscas no existe o ha sido eliminado.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/carta"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Ver toda la carta
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </Section>
  );
}