/**
 * Theme Config
 * 
 * Configuração final do tema combinando:
 * Seed Tokens → Map Tokens → Alias Tokens → Component Tokens
 * 
 * Este arquivo usa o algoritmo do Ant Design para gerar
 * automaticamente todos os tokens derivados.
 */

import { theme } from 'antd';
import type { ThemeConfig } from 'antd';
import { seedToken } from '@ds/themes/seed';
import { customMapTokens } from '@ds/themes/map';
import { customAliasTokens } from '@ds/themes/alias';
import { componentTokens } from '@ds/themes/components';
import { designSystemColors } from '@ds/themes/colors';

/**
 * Configuração completa do tema Ant Design
 * 
 * Esta configuração:
 * 1. Usa Seed Tokens como base
 * 2. Aplica algoritmo padrão do Ant Design para gerar Map Tokens
 * 3. Cria Alias Tokens automaticamente
 * 4. Aplica customizações de componentes
 * 
 * Quando receber valores do Figma, atualize apenas seedToken.
 * Todo o resto será calculado automaticamente.
 */
export const themeConfig: ThemeConfig = {
  // ============ Tokens Base ============
  // Seed Tokens - valores base que vêm do Figma
  token: {
    ...seedToken,
    borderRadius: 8, // Border radius padrão do design system
  },

  // ============ Algoritmo ============
  // Usa o algoritmo padrão do Ant Design para gerar Map Tokens
  // Isso calcula automaticamente todos os tokens derivados
  algorithm: theme.defaultAlgorithm,

  // ============ Component Tokens ============
  // Customizações específicas por componente baseadas no design system
  components: {
    ...componentTokens,
  },
};

/**
 * Export do tema configurado
 * 
 * Use este tema no ConfigProvider do Ant Design.
 */
export default themeConfig;

