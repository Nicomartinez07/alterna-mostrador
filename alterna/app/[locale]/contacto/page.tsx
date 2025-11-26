import { setRequestLocale } from 'next-intl/server';
import Section from '@/components/ui/Section';

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Section title="Contacto" subtitle="Encuéntranos">
      <p className="text-center text-gray-600">
        Próximamente: Mapa + formulario de contacto
      </p>
    </Section>
  );
}