import Section from '@/components/ui/Section';

export default function MercadoLoading() {
  return (
    <>
      <Section className="bg-gradient-to-b from-amber-50 to-white">
        <div className="text-center space-y-4 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto" />
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto" />
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-24" />
                  <div className="flex items-center justify-between">
                    <div className="h-5 bg-gray-200 rounded w-32" />
                    <div className="flex gap-2">
                      <div className="h-8 w-8 bg-gray-200 rounded-lg" />
                      <div className="h-8 w-8 bg-gray-200 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}