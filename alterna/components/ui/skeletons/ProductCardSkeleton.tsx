export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Category badge */}
        <div className="h-4 bg-gray-200 rounded-full w-20" />
        
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        
        {/* Description lines */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-3 bg-gray-200 rounded w-4/6" />
        </div>
        
        {/* Price and button */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="h-9 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  );
}