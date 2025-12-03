import { Leaf, Award, Heart, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features?: Feature[];
}

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  const t = useTranslations('FeaturesSection');
  
  const defaultFeatures: Feature[] = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: t('veganTitle'),
      description: t('veganDescription'),
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: t('artisanTitle'),
      description: t('artisanDescription'),
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t('localTitle'),
      description: t('localDescription'),
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('freshTitle'),
      description: t('freshDescription'),
    },
  ];

  const items = features || defaultFeatures;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 text-green-600 rounded-full group-hover:bg-green-600 group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}