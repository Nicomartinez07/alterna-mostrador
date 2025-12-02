import Section from '@/components/ui/Section';
import TimelineSkeleton from '@/components/ui/skeletons/TimelineSkeleton';
import ProductCardSkeleton from '@/components/ui/skeletons/ProductCardSkeleton';

export default function ProcesosLoading() {
  return (
    <>
      <Section className="bg-gradient-to-b from-green-50 to-white">
        <div className="text-center space-y-4 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-80 mx-auto" />
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto" />
        </div>
      </Section>

      <Section noPadding className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <TimelineSkeleton />
        </div>
      </Section>

      <Section className="bg-gray-50">
        <div className="text-center mb-8 space-y-3 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto" />
          <div className="h-5 bg-gray-200 rounded w-48 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </Section>
    </>
  );
}