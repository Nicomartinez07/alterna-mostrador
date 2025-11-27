'use client';

import { useState, useMemo } from 'react';
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
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem } = useCart();

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== null) {
      filtered = filtered.filter(
        (product) => product.category?.id === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.ingredients?.toLowerCase().includes(query)
      );
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
            placeholder="Buscar por nombre, ingredientes..."
          />
        </div>

        {/* Category filters */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Filtrar por categoría
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
            <span>Mostrando <strong>{products.length}</strong> productos</span>
          ) : (
            <span>
              Mostrando <strong>{filteredProducts.length}</strong> de{' '}
              <strong>{products.length}</strong> productos
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
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Products grid */}
      {filteredProducts.length > 0 ? (
        <ProductsGrid products={filteredProducts} onAddToCart={addItem} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">
            No se encontraron productos
          </p>
          <p className="text-gray-400 text-sm">
            Intenta cambiar los filtros o la búsqueda
          </p>
        </div>
      )}
    </div>
  );
}