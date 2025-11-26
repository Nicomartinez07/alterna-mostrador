import { setRequestLocale } from 'next-intl/server';
import Section from '@/components/ui/Section';

export default async function TakeawayPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Section title="Take Away" subtitle="Pide desde casa">
      <p className="text-center text-gray-600">
        Próximamente: Links a Glovo y Uber Eats
      </p>
    </Section>
  );
}