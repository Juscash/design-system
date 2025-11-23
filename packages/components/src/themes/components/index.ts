/**
 * Component Tokens
 *
 * Customizações específicas por componente baseadas no design system Juscash.
 */

import type { ComponentsToken } from 'antd/es/theme/interface';
import { designSystemColors } from '../colors';

/**
 * Component Tokens - Customizações por componente
 *
 * Baseado no tema do projeto original do usuário.
 */
export const componentTokens: Partial<ComponentsToken> = {
  // ============ Button ============
  Button: {
    // Tamanhos (segundo padrão do AntD e alinhado ao DS p/m/g)
    borderRadius: 8,
    controlHeightSM: 24, // p
    controlHeight: 32, // m
    controlHeightLG: 40, // g
    // Espaçamentos horizontais
    paddingInlineSM: 12,
    paddingInline: 16,
    paddingInlineLG: 20,
    // Tipografia
    fontSize: 16,

    colorPrimary: designSystemColors.primary[600],
    colorPrimaryHover: designSystemColors.primary[700],
    colorPrimaryActive: designSystemColors.primary[800],

    defaultBg: designSystemColors.neutral[200],
    defaultColor: designSystemColors.neutral[900],
    defaultHoverBg: designSystemColors.neutral[400],
    defaultActiveBg: designSystemColors.neutral[400],
    defaultBorderColor: 'transparent',
    defaultHoverBorderColor: 'transparent',
    defaultHoverColor: designSystemColors.neutral[900],
    defaultGhostColor: designSystemColors.neutral[900],
    defaultGhostBorderColor: designSystemColors.neutral[300],
    defaultActiveBorderColor: designSystemColors.neutral[900],

    colorError: designSystemColors.feedback.red[500],
    colorErrorHover: designSystemColors.feedback.red[500],
    colorErrorActive: designSystemColors.feedback.red[500],
  },

  // ============ Select ============
  Select: {
    colorPrimary: designSystemColors.neutral[300],
    colorPrimaryHover: designSystemColors.neutral[300],
    colorPrimaryActive: designSystemColors.neutral[300],
    colorPrimaryBorder: designSystemColors.neutral[300],
    colorPrimaryBorderHover: designSystemColors.neutral[300],
    colorBgBase: designSystemColors.neutral[200],
    activeBorderColor: designSystemColors.neutral[300],
    hoverBorderColor: designSystemColors.neutral[400],
    optionSelectedBg: designSystemColors.neutral[200],
  },

  // ============ Typography ============
  Typography: {
    fontSizeHeading1: 49,
    fontSizeHeading2: 39,
    fontSizeHeading3: 31,
    fontSizeHeading4: 25,
    fontSizeHeading5: 20,
    fontWeightStrong: 700,

    fontSize: 16,
    lineHeightHeading1: 1.4,
    lineHeightHeading2: 1.4,
    lineHeightHeading3: 1.4,
    lineHeightHeading4: 1.4,
    lineHeightHeading5: 1.2,
    lineHeight: 1,
    colorText: designSystemColors.neutral[800],
    colorTextHeading: designSystemColors.neutral[800],
  },

  // ============ Card ============
  Card: {
    colorBgContainer: designSystemColors.neutral[50],
    colorBorder: designSystemColors.neutral[300],
    colorBorderSecondary: designSystemColors.neutral[300],
    padding: 6,
    bodyPadding: 6,
    borderRadius: 8,
    boxShadow: '0px 1px 2px 0px #0000000D',
  },

  // ============ Spin ============
  Spin: {
    colorPrimary: designSystemColors.primary[600],
  },

  // ============ Form ============
  Form: {
    labelFontSize: 16,
    labelColor: designSystemColors.neutral[800],
    labelRequiredMarkColor: designSystemColors.feedback.red[500],
    verticalLabelPadding: '0 0 8px 0',
    itemMarginBottom: 16,
  },

  // ============ Input ============
  Input: {
    fontSize: 16,
    colorBgTextActive: designSystemColors.neutral[300],
    colorPrimaryBorderHover: designSystemColors.neutral[300],
    colorPrimaryBorder: designSystemColors.neutral[300],
    colorPrimaryHover: designSystemColors.neutral[300],
    colorPrimaryActive: designSystemColors.neutral[300],
    colorPrimary: designSystemColors.neutral[300],
  },

  // ============ Table ============
  Table: {
    colorBgContainer: designSystemColors.neutral[50],
    headerBg: designSystemColors.neutral[50],
    headerColor: designSystemColors.neutral[800],
    headerSplitColor: designSystemColors.neutral[300],
    borderColor: designSystemColors.neutral[300],
    headerBorderRadius: 12,
    borderRadius: 12,
    rowHoverBg: designSystemColors.neutral[100],
    rowSelectedBg: designSystemColors.neutral[100],
    rowSelectedHoverBg: designSystemColors.neutral[100],
    fontSize: 13,
    cellPaddingBlock: 10,
    cellPaddingInline: 12,
    stickyScrollBarBg: designSystemColors.neutral[300],
    stickyScrollBarBorderRadius: 8,
  },

  // ============ Pagination ============
  Pagination: {
    colorText: designSystemColors.neutral[800],
    colorPrimary: designSystemColors.neutral[800],
    colorPrimaryHover: designSystemColors.neutral[800],
    colorBorder: designSystemColors.neutral[300],
    colorPrimaryBorder: designSystemColors.neutral[300],
    itemActiveBg: designSystemColors.neutral[50],
    itemBg: designSystemColors.neutral[50],
  },

  // ============ Tag ============
  Tag: {
    borderRadius: 20,
    fontSize: 12,
  },

  // ============ Layout ============
  Layout: {
    bodyBg: designSystemColors.neutral[100],
  },
};
