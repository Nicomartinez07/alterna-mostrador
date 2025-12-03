import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { ProcessStep } from '@/types/strapi';

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  if (steps.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No hay pasos de proceso disponibles
      </div>
    );
  }
  return (
    <div className="relative">
      {/* Línea del timeline para escritorio */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

      <div className="space-y-12 md:space-y-16">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;

          // Datos directos de Strapi (sin attributes)
          const imageUrl = step.media?.url;
          const title = step.title;
          const description = step.description;
          const stepOrder = step.step_order;

          return (
            <div
              key={step.id}
              className={`relative flex flex-col md:flex-row gap-6 md:gap-8 items-center ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* 📱 Imagen mobile (arriba del todo) */}
              <div className="w-full md:hidden">
                {imageUrl ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-md mb-2">
                    <Image
                      src={getStrapiImageUrl(imageUrl)}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center mb-2">
                    <span className="text-gray-400">Sin imagen</span>
                  </div>
                )}
              </div>

              {/* 🔵 Badge del número - SOLO EN DESKTOP */}
              <div className="
                hidden md:flex
                md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                z-10 flex-shrink-0
              ">
                <div className="w-16 h-16 bg-[#163834] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">
                  {stepOrder}
                </div>
              </div>

              {/* 📝 Contenido */}
              <div
                className={`flex-1 ${
                  isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                }`}
              >
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {title}
                  </h3>

                  <div className="text-gray-600 prose prose-sm max-w-none">
                    {typeof description === 'string' ? (
                      <div dangerouslySetInnerHTML={{ __html: description }} />
                    ) : Array.isArray(description) ? (
                      description.map((block: any, i: number) => (
                        <p key={i}>{block.children?.[0]?.text || ''}</p>
                      ))
                    ) : (
                      <p>{String(description)}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 🖼️ Imagen para escritorio */}
              <div className="flex-1 hidden md:block">
                {imageUrl ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={getStrapiImageUrl(imageUrl)}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="50vw"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Sin imagen</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}