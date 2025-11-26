import { setRequestLocale } from 'next-intl/server';
import Section from '@/components/ui/Section';

export default async function CartaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Section title="Nuestra Carta" subtitle="Productos frescos y artesanales">
      <p className="text-center text-gray-600">
        Próximamente: Carta completa con filtros
      </p>
    </Section>
  );
}