import { DesignSystemProvider } from '@design-system/components/provider';
// O locale pt-BR já está configurado por padrão no DesignSystemProvider
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'App com Design System',
  description: 'Exemplo de uso do Design System no Next.js 15+',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <DesignSystemProvider>
          {children}
        </DesignSystemProvider>
      </body>
    </html>
  );
}

