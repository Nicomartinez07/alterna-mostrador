import type { Metadata } from 'next';

interface GenerateMetadataParams {
  title: string;
  description: string;
  locale: string;
  path?: string;
}

export function generatePageMetadata({
  title,
  description,
  locale,
  path = '',
}: GenerateMetadataParams): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = `${baseUrl}/${locale}${path}`;

  return {
    title: `${title} | Alterna Mostrador`,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: `${baseUrl}/es${path}`,
        ca: `${baseUrl}/ca${path}`,
        en: `${baseUrl}/en${path}`,
      },
    },
    openGraph: {
      title: `${title} | Alterna Mostrador`,
      description,
      url,
      siteName: 'Alterna Mostrador',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Alterna Mostrador`,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}