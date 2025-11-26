import { setRequestLocale } from 'next-intl/server';
import Section from '@/components/ui/Section';

export default async function ProcesosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Section title="Nuestros Procesos" subtitle="De la selección al producto final">
      <p className="text-center text-gray-600">
        Próximamente: Timeline de procesos artesanales
      </p>
    </Section>
  );
}