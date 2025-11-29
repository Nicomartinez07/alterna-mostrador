import MarketCard from './MarketCard';
import type { MarketItem } from '@/types/strapi';
import { useTranslations } from 'next-intl';

interface MarketGridProps {
  items: MarketItem[];
}

export default function MarketGrid({ items }: MarketGridProps) {
  const t = useTranslations('marketGrid');

  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500 text-lg mb-2">
          {t('emptyTitle')}
        </p>
        <p className="text-gray-400 text-sm">
          {t('emptyDescription')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <MarketCard key={item.id} item={item} />
      ))}
    </div>
  );
}