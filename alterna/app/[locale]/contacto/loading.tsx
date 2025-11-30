import Section from '@/components/ui/Section';

export default function ContactoLoading() {
  return (
    <>
      <Section className="bg-gradient-to-b from-purple-50 to-white">
        <div className="text-center space-y-4 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto" />
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto" />
        </div>
      </Section>

      <Section>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left side - Form */}
            <div className="space-y-8 animate-pulse">
              <div className="grid sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-6 h-24 bg-gray-100" />
                ))}
              </div>
              <div className="bg-white rounded-lg p-8 space-y-6">
                <div className="h-8 bg-gray-200 rounded w-48" />
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-24" />
                      <div className={`h-${i === 3 ? '32' : '12'} bg-gray-200 rounded`} />
                    </div>
                  ))}
                </div>
                <div className="h-12 bg-gray-200 rounded-lg" />
              </div>
            </div>

            {/* Right side - Map */}
            <div className="h-[500px] lg:h-[700px] bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </Section>
    </>
  );
}