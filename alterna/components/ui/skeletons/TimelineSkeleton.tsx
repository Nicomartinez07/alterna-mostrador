export default function TimelineSkeleton() {
  return (
    <div className="relative space-y-12 md:space-y-16">
      {/* Timeline line */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

      {[...Array(3)].map((_, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={index}
            className={`relative flex flex-col md:flex-row gap-6 md:gap-8 items-center animate-pulse ${
              isEven ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Step number badge */}
            <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10 flex-shrink-0">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-full" />
            </div>

            {/* Content */}
            <div className={`flex-1 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
              <div className="bg-gray-100 rounded-lg p-6 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-4/6" />
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="flex-1">
              <div className="aspect-video rounded-lg bg-gray-200" />
            </div>
          </div>
        );
      })}
    </div>
  );
}