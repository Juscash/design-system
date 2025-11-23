'use client';

import React from 'react';
import { ConfigProvider } from 'antd';
import { themeConfig } from '@ds/themes';
import type { ThemeConfig } from 'antd';
import type { Locale } from 'antd/es/locale';

export interface DesignSystemProviderProps {
  children: React.ReactNode;
  theme?: ThemeConfig;
  /**
   * Prefixo para classes CSS do Ant Design
   * Útil para evitar conflitos em projetos Next.js
   */
  prefixCls?: string;
  /**
   * Locale do Ant Design
   * Padrão: pt_BR (Português do Brasil)
   */
  locale?: Locale;
}

/**
 * Provider do Design System
 *
 * Use este componente para envolver sua aplicação Next.js
 * e aplicar o tema customizado do design system.
 *
 * @example
 * ```tsx
 * // app/layout.tsx (Next.js 15+)
 * import { DesignSystemProvider } from '@design-system/components/provider';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="pt-BR">
 *       <body>
 *         <DesignSystemProvider>
 *           {children}
 *         </DesignSystemProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  children,
  theme: customTheme,
  prefixCls = 'ant',
  locale,
}) => {
  const mergedTheme = customTheme || themeConfig;

  return (
    <ConfigProvider theme={mergedTheme} prefixCls={prefixCls} locale={locale}>
      {children}
    </ConfigProvider>
  );
};
