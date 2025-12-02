import Section from '@/components/ui/Section';

export default function ProductDetailLoading() {
  return (
    <Section noPadding className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs skeleton */}
        <div className="mb-6 flex items-center gap-2 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-4 w-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-4 w-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>

        {/* Product detail skeleton */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Image */}
            <div className="aspect-square md:min-h-[500px] bg-gray-200" />

            {/* Info */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Title & Price */}
              <div>
                <div className="h-10 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-12 bg-gray-200 rounded w-32" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-32" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
              </div>

              {/* Ingredients */}
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-32" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>

              {/* Quantity */}
              <div className="h-12 bg-gray-200 rounded w-48" />

              {/* Button */}
              <div className="h-14 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Related products skeleton */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-6 bg-gray-200 rounded w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}