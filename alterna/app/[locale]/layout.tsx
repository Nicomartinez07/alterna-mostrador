import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
// 1. CAMBIO: Importamos 'routing' en lugar de 'locales' desde i18n
import { routing } from '@/routing'; 
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getSiteSettings } from '@/lib/strapi';
import '../globals.css';

export function generateStaticParams() {
  // 2. CAMBIO: Usamos el array desde routing
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // 3. CAMBIO: Validación contra routing.locales
  // Usamos 'as any' para validar el string que viene de la URL
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // getMessages lee automáticamente el locale del request context configurado en i18n.ts
  const messages = await getMessages();
  const settings = await getSiteSettings();

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} siteName={settings?.nombre_local} />
          <main className="flex-1">
            {children}
          </main>
          <Footer settings={settings} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}