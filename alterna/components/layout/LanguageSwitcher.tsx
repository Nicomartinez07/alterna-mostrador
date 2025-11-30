'use client';

import { usePathname, useRouter } from '@/navigation';
import { useTransition, useState } from 'react';
import { Earth } from 'lucide-react';
// 1. CAMBIO: Importamos 'routing' en lugar de 'locales' sueltos
// y el tipo 'Locale' para que TypeScript no se queje
import { routing, type Locale } from '@/routing'; 

interface LanguageSwitcherProps {
  currentLocale: string;
}

const localeNames: Record<string, string> = {
  es: 'ES',
  ca: 'CA',
  en: 'EN',
};

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const safeCurrentLocale = routing.locales.includes(currentLocale as any)
    ? (currentLocale as Locale)
    : 'es';

  const handleLocaleChange = (newLocale: Locale) => {
    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        disabled={isPending}
      >
        <Earth className="w-4 h-4" />
        <span>{localeNames[safeCurrentLocale]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-24 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {routing.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              disabled={isPending}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                locale === currentLocale ? 'bg-gray-50 font-semibold text-green-600' : 'text-gray-700'
              }`}
            >
              {localeNames[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}