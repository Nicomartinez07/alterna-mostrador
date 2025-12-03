import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { ProcessStep } from '@/types/strapi';
import { useTranslations } from 'next-intl';

interface ProcessPreviewProps {
  steps: ProcessStep[];
  locale: string;
  title?: string;
  subtitle?: string;
}

export default function ProcessPreview({
  steps,
  locale,
  title = 'Nuestro Proceso Artesanal',
  subtitle = 'De la selección de ingredientes al producto final',
}: ProcessPreviewProps) {
  if (steps.length === 0) return null;

  // Tomar solo los primeros 3 pasos
  const previewSteps = steps.slice(0, 3);
  const t = useTranslations('home');

  

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {previewSteps.map((step, index) => (
            <div
              key={step.id}
              className="relative group"
            >
              {/* Number Badge */}
              <div className="absolute -top-4 -left-4 z-10 w-12 h-12 bg-[#163834] text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                {step.step_order}
              </div>

              {/* Card */}
              <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                {/* Image */}
                {step.media?.url && (
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <Image
                      src={getStrapiImageUrl(step.media.url)}
                      alt={step.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <div className="text-gray-600 text-sm line-clamp-3">
                    {typeof step.description === 'string' ? (
                      <div dangerouslySetInnerHTML={{ __html: step.description }} />
                    ) : Array.isArray(step.description) ? (
                      <p>{step.description[0]?.children?.[0]?.text || ''}</p>
                    ) : (
                      <p>{String(step.description)}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <div className="text-center">
          <Link
            href={`/${locale}/procesos`}
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-colors group"
          >
            {t('prc_btn_learn')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}