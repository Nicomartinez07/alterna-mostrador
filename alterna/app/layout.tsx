import type { Metadata } from 'next';


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