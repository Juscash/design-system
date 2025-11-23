/**
 * Seed Tokens
 * 
 * Tokens de origem que definem as intenções de design.
 * Estes são os valores base que vêm diretamente do Figma.
 * 
 * Quando receber o design do Figma, atualize apenas estes valores.
 * Todo o resto será calculado automaticamente.
 */

import type { SeedToken } from 'antd/es/theme/interface';

/**
 * Seed Tokens - Valores base do design system
 * 
 * Estes valores são a origem de todo o sistema de design.
 * Atualize aqui quando receber os valores do Figma.
 */
export const seedToken: SeedToken = {
  // ============ Cores Semânticas ============
  // Valores extraídos do Figma - Design System Juscash
  colorPrimary: '#009c46', // Brand Primary 500
  colorSuccess: '#1e7e34', // Feedback Green 500
  colorWarning: '#867400', // Feedback Yellow 500
  colorError: '#d2190b', // Feedback Red 500
  colorInfo: '#207ac3', // Feedback Blue 500

  // ============ Tipografia ============
  // Fonte: Inter (do Figma)
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontFamilyCode: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  
  // Tamanho base de fonte - Body 01 (16px)
  fontSize: 16,
  
  // Line height base - 1.2 (do Figma)
  lineHeight: 1.2,
  
  // Font weight
  fontWeightStrong: 600,

  // ============ Espaçamento ============
  // Baseado nos espaçamentos do Figma: 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 40px, 48px, 56px, 64px, 80px, 96px
  sizeUnit: 4, // Unidade base (4px = 1 unidade)
  sizeStep: 4, // Incremento base

  // ============ Border ============
  // Border radius base - será sobrescrito no themeConfig para 8px
  borderRadius: 4,
  
  // Largura de borda
  lineWidth: 1,

  // ============ Controles ============
  // Altura base de controles (padrão Ant Design)
  controlHeight: 32,
  
  // Padding horizontal base
  controlPaddingHorizontal: 12,

  // ============ Motion ============
  // Durações de animação (padrão Ant Design)
  motionDurationFast: '0.1s',
  motionDurationMid: '0.2s',
  motionDurationSlow: '0.3s',
  
  // Curvas de animação (padrão Ant Design)
  motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  motionEaseIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',

  // ============ Outros ============
  // Modo wireframe (desenho de linha)
  wireframe: false,
  
  // Opacidade de loading
  opacityLoading: 0.65,
  
  // Z-index base
  zIndexBase: 0,
  zIndexPopupBase: 1000,
};

/**
 * Type export para Seed Tokens
 */
export type SeedTokenType = typeof seedToken;

