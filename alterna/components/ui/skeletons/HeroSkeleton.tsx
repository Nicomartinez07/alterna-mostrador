export default function HeroSkeleton() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden bg-gray-200 animate-pulse">
      {/* Content skeleton */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 text-center space-y-6">
        {/* Title */}
        <div className="h-12 bg-gray-300 rounded-lg w-64 md:w-96" />
        
        {/* Subtitle */}
        <div className="space-y-3">
          <div className="h-6 bg-gray-300 rounded w-80 md:w-[500px]" />
          <div className="h-6 bg-gray-300 rounded w-72 md:w-[450px]" />
        </div>
        
        {/* CTA button */}
        <div className="h-12 bg-gray-300 rounded-lg w-40 mt-4" />
      </div>
    </section>
  );
}