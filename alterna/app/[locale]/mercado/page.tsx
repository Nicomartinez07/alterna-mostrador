import { setRequestLocale } from 'next-intl/server';
import Section from '@/components/ui/Section';

export default async function MercadoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Section title="Mercado Semanal" subtitle="Productos de nuestros colaboradores">
      <p className="text-center text-gray-600">
        Próximamente: Market items con vendor info
      </p>
    </Section>
  );
}