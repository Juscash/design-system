/**
 * Exemplos de uso do tema do Design System
 */

import { DesignSystemProvider, theme, designTokens } from '@design-system/components';
import { Button, Input, Card, Space } from 'antd';

// ============ Exemplo 1: Uso Básico ============

export function BasicUsage() {
  return (
    <DesignSystemProvider>
      <Button type="primary">Botão com tema aplicado</Button>
      <Input placeholder="Input com tema aplicado" />
    </DesignSystemProvider>
  );
}

// ============ Exemplo 2: Customizar Tema ============

import type { ThemeConfig } from 'antd';

const customTheme: ThemeConfig = {
  ...theme,
  token: {
    ...theme.token,
    colorPrimary: '#00b96b', // Verde customizado
    borderRadius: 8, // Border radius maior
  },
  components: {
    Button: {
      ...theme.components?.Button,
      controlHeight: 40, // Botões maiores
    },
  },
};

export function CustomTheme() {
  return (
    <DesignSystemProvider theme={customTheme}>
      <Button type="primary">Botão com tema customizado</Button>
    </DesignSystemProvider>
  );
}

// ============ Exemplo 3: Usar Design Tokens ============

export function UsingTokens() {
  return (
    <DesignSystemProvider>
      <Card
        style={{
          padding: designTokens.spacing.lg,
          borderRadius: designTokens.borderRadius.lg,
          backgroundColor: designTokens.colors.bgElevated,
        }}
      >
        <Space direction="vertical">
          <div style={{ color: designTokens.colors.primary }}>
            Cor primária: {designTokens.colors.primary}
          </div>
          <div style={{ fontSize: designTokens.typography.fontSize.lg }}>
            Tamanho de fonte grande
          </div>
          <div style={{ marginTop: designTokens.spacing.md }}>
            Espaçamento médio aplicado
          </div>
        </Space>
      </Card>
    </DesignSystemProvider>
  );
}

// ============ Exemplo 4: Tema em Next.js 15+ ============

// app/layout.tsx
export function NextJSAppLayout({ children }: { children: React.ReactNode }) {
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

// app/page.tsx
export default function HomePage() {
  return (
    <div style={{ padding: designTokens.spacing.lg }}>
      <h1>Minha Página</h1>
      <Button type="primary">Botão</Button>
      <Input placeholder="Input" />
    </div>
  );
}

