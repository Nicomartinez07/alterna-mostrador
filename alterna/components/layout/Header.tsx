'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X, ShoppingCart } from 'lucide-react';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  locale: string;
  siteName?: string;
}

export default function Header({ locale, siteName = 'Alterna Mostrador' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('nav');

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          {/* Hamburger button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Logo / Site name */}
          <Link 
            href={`/${locale}`}
            className="text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors"
          >
            {siteName}
          </Link>

          {/* Language switcher + Cart */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
            
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {/* Badge de cantidad - lo agregaremos después */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        locale={locale}
      />

      {/* Spacer para el header fijo */}
      <div className="h-[57px]" />
    </>
  );
}