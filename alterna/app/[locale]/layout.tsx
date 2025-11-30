import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing'; 
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantSchema from '@/components/seo/RestaurantSchema';
import { getSiteSettings } from '@/lib/strapi';
import '../globals.css';
import { CartProvider } from '@/context/CartContext';
import { Analytics } from '@vercel/analytics/next';

export function generateStaticParams() {
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
  
  // Validación contra routing.locales
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // getMessages lee automáticamente el locale del request context configurado en i18n.ts
  const messages = await getMessages();
  const settings = await getSiteSettings(locale);

  return (
    <html lang={locale}>
      <head>
        <RestaurantSchema settings={settings} />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Analytics />
        <CartProvider>
          <NextIntlClientProvider messages={messages}>
          
            <Header 
              locale={locale} 
              siteName={settings?.nombre_local}
              whatsappNumber={settings?.whatsapp}
            />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer settings={settings} />
          </NextIntlClientProvider>
        </CartProvider>
      </body>

    </html>
  );
}