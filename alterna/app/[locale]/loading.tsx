import HeroSkeleton from '@/components/ui/skeletons/HeroSkeleton';
import Section from '@/components/ui/Section';

export default function HomeLoading() {
  return (
    <>
      <HeroSkeleton />
      
      <Section>
        <div className="grid md:grid-cols-2 gap-8 animate-pulse">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}