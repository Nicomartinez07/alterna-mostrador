import type { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'Alterna Mostrador',
  description: 'Comida vegana artesanal en Barcelona',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}