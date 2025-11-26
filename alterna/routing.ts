// routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'ca', 'en'],
  defaultLocale: 'es',
  // La configuración de prefijos ahora vive aquí
  localePrefix: 'always' 
});

// Tipos útiles para typescript
export type Locale = (typeof routing.locales)[number];