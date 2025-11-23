// Exportar componentes
export { Button, type ButtonProps } from './components/button';
export {
  Typography,
  type CustomTypographyProps,
  type TypographyVariant,
  type DSColor,
  TypographyComponents,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Body1,
  Body2,
  Caption,
} from './components/typography';

// Exportar tipos
export type { ComponentProps } from './types';

// Exportar tema e configurações
export { themeConfig as theme, seedToken, themeConfig } from './themes';
export type { SeedTokenType } from './themes';
export type { ThemeConfig } from 'antd';

// Exportar cores do design system para uso em outros projetos
export { designSystemColors } from './themes/colors';
export type { DesignSystemColors } from './themes/colors';

// Exportar Provider (também disponível via /provider)
export { DesignSystemProvider } from './provider';
export type { DesignSystemProviderProps } from './provider';

// Exportar locale padrão (pt-BR)
export { default as ptBR } from 'antd/locale/pt_BR';

// Exportar hooks úteis
// export { useTheme } from './hooks/useTheme';

