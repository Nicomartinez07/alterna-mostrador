import Link from 'next/link';
import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { Product } from '@/types/strapi';

interface RelatedProductsProps {
  products: Product[];
  locale: string;
}

export default function RelatedProducts({ products, locale }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 pt-16 border-t border-gray-200">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        También te puede gustar
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/${locale}/carta/${product.slug}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={getStrapiImageUrl(product.photo?.url)}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              
              {/* Info */}
              <div className="p-3 md:p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm md:text-base group-hover:text-green-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-lg md:text-xl font-bold text-green-600">
                  €{product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}