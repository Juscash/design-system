/**
 * Theme Exports
 *
 * Export centralizado de todos os tokens e configurações do tema.
 */

// Seed Tokens - valores base
export { seedToken } from './seed';
export type { SeedTokenType } from './seed';

// Figma Tokens - referência completa dos valores do Figma (uso interno)
// Não exportado - use designSystemColors ao invés

// Design System Colors - cores exportáveis para uso em outros projetos
export { designSystemColors } from './colors';
export type { DesignSystemColors } from './colors';

// Map Tokens - tokens derivados
export { generateMapTokens, customMapTokens } from './map';

// Alias Tokens - tokens semânticos
export { generateAliasTokens, customAliasTokens } from './alias';

// Component Tokens - customizações por componente
export { componentTokens } from './components';

// Theme Config - configuração final
export { themeConfig } from './config';
export { themeConfig as theme } from './config';
export { default } from './config';

// Tipos do tema devem ser importados diretamente de 'antd' pelos consumidores
