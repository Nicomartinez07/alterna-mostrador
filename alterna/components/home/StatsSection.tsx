import { useTranslations } from 'next-intl';

interface Stat {
  number: string;
  label: string;
  suffix?: string;
}

interface StatsSectionProps {
  stats?: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const t = useTranslations('StatsSection');
  
  const defaultStats: Stat[] = [
    { number: '100', label: t('veganProducts'), suffix: '+' },
    { number: '5', label: t('yearsExperience'), suffix: '+' },
    { number: '1000', label: t('happyCustomers'), suffix: '+' },
    { number: '100', label: t('artisan'), suffix: '%' },
  ];

  const items = stats || defaultStats;

  return (
    <section className="py-16 bg-[#163834] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.number}
                {stat.suffix && (
                  <span className="text-green-200">{stat.suffix}</span>
                )}
              </div>
              <div className="text-green-100 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}