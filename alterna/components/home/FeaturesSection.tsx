import { Leaf, Award, Heart, Clock } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features?: Feature[];
}

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  const defaultFeatures: Feature[] = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: '100% Vegano',
      description: 'Todos nuestros productos son plant-based, sin ingredientes de origen animal.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Artesanal',
      description: 'Elaborado a mano cada día con técnicas tradicionales y mucho amor.',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Ingredientes Locales',
      description: 'Trabajamos con productores de proximidad para garantizar frescura y calidad.',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Hecho Diariamente',
      description: 'Productos frescos elaborados cada mañana. Sin conservantes ni químicos.',
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