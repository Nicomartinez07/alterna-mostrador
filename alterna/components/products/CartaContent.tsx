'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import ProductsGrid from './ProductsGrid';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import { useCart } from '@/hooks/useCart';
import type { Product, ProductCategory } from '@/types/strapi';

interface CartaContentProps {
  products: Product[];
  categories: ProductCategory[];
}


export default function CartaContent({ products, categories }: CartaContentProps) {
  const t = useTranslations('carta');

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem } = useCart();

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== null) {
      filtered = filtered.filter((product) => {
        // @ts-ignore - depende del naming en Strapi
        return product.product_category?.id === selectedCategory;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((product) => {
        const titleMatch = (product.title || '').toLowerCase().includes(query);
        const descMatch = (product.description || '').toLowerCase().includes(query);
        const ingMatch = (product.ingredients || '').toLowerCase().includes(query);
        return titleMatch || descMatch || ingMatch;
      });
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Filters section */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">

        {/* Search bar */}
        <div>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={t('searchPlaceholder')}
          />
        </div>

        {/* Category filters */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            {t('filterByCategory')}
          </h3>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {filteredProducts.length === products.length ? (
            <span>
              {t('showing')} <strong>{products.length}</strong> {t('products')}
            </span>
          ) : (
            <span>
              {t('showing')} <strong>{filteredProducts.length}</strong> {t('of')}{' '}
              <strong>{products.length}</strong> {t('products')}
            </span>
          )}
        </p>

        {(selectedCategory !== null || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery('');
            }}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            {t('clearFilters')}
          </button>
        )}
      </div>

      {/* Products grid */}
      {filteredProducts.length > 0 ? (
        <ProductsGrid products={filteredProducts} onAddToCart={addItem} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">
            {t('noResultsTitle')}
          </p>
          <p className="text-gray-400 text-sm">
            {t('noResultsSubtitle')}
          </p>
        </div>
      )}
    </div>
  );
}
