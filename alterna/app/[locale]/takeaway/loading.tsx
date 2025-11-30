import Section from '@/components/ui/Section';

export default function TakeawayLoading() {
  return (
    <>
      <Section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center space-y-4 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto" />
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto" />
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      </Section>

      <Section className="bg-green-50">
        <div className="max-w-3xl mx-auto text-center space-y-6 animate-pulse">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto" />
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto" />
          <div className="h-5 bg-gray-200 rounded w-96 mx-auto" />
          <div className="h-12 bg-gray-300 rounded-full w-64 mx-auto" />
        </div>
      </Section>
    </>
  );
}