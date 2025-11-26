// i18n.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Nota: en versiones nuevas, 'locale' viene dentro de una promesa 'requestLocale'
  let locale = await requestLocale;

  // Validar si el locale es correcto, si no usar el default
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});