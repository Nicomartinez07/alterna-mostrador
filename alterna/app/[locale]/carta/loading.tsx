import Section from '@/components/ui/Section';
import ProductCardSkeleton from '@/components/ui/skeletons/ProductCardSkeleton';

export default function CartaLoading() {
  return (
    <>
      <Section className="bg-gradient-to-b from-green-50 to-white ">
        <div className="text-center space-y-4 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto" />
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto" />
        </div>
      </Section>

      <Section className='bg-white'>
        {/* Filters skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6 mb-8 animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg" />
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-9 bg-gray-200 rounded-full w-24" />
            ))}
          </div>
        </div>

        {/* Products grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </Section>
    </>
  );
}