// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export default createMiddleware({
  ...routing,
  
  // Estrategia de detección de locale
  localeDetection: true, // ← Activa la detección automática
  
  // Locale por defecto si no se detecta nada
  defaultLocale: 'es',
  
  // URLs siempre con prefijo
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};