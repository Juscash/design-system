import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import 'antd/dist/reset.css';
import AntdStyleRegistry from './AntdStyleRegistry';
import { AntdProvider } from '@juscash/design-system';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Design System Docs',
  description: 'Catálogo e guia do Design System'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        <AntdStyleRegistry>
          <AntdProvider>
            <header style={{ padding: 16, borderBottom: '1px solid #e5e5e5' }}>
              <nav style={{ display: 'flex', gap: 12 }}>
                <Link href="/">Home</Link>
                <Link href="/design-tokens">Design Tokens</Link>
                <Link href="/components">Componentes</Link>
              </nav>
            </header>
            <main style={{ padding: 16 }}>{children}</main>
          </AntdProvider>
        </AntdStyleRegistry>
      </body>
    </html>
  );
}


