import Image from 'next/image';
import Link from 'next/link';
import { getStrapiImageUrl } from '@/lib/strapi';

interface HeroProps {
  title: string;
  tagline?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  locale: string;
}

export default function Hero({
  title,
  tagline,
  imageUrl,
  ctaText,
  ctaHref,
  locale,
}: HeroProps) {
  const heroImage = getStrapiImageUrl(imageUrl);

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          {title}
        </h1>
        
        {tagline && (
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl drop-shadow-md">
            {tagline}
          </p>
        )}

        {ctaText && ctaHref && (
          <Link
            href={`/${locale}${ctaHref}`}
            className="inline-block px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {ctaText}
          </Link>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/70"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}