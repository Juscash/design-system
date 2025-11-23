/**
 * Alias Tokens
 * 
 * Tokens semânticos que mapeiam para Map Tokens.
 * Estes tokens facilitam o uso e customização do tema.
 * 
 * Você pode criar aliases customizados aqui para facilitar
 * o uso em componentes específicos.
 */

import type { AliasToken } from 'antd/es/theme/interface';

/**
 * Gera Alias Tokens a partir dos Map Tokens
 * 
 * Alias Tokens são nomes semânticos que mapeiam para Map Tokens.
 * O Ant Design já cria muitos aliases automaticamente.
 * 
 * Você pode adicionar aliases customizados aqui se necessário.
 * 
 * @param map - Map Tokens derivados
 * @returns Alias Tokens semânticos
 */
export function generateAliasTokens(map: Partial<AliasToken>): Partial<AliasToken> {
  // O Ant Design já cria muitos aliases automaticamente:
  // - colorText, colorTextSecondary, colorTextTertiary
  // - colorBg, colorBgContainer, colorBgElevated
  // - colorBorder, colorBorderSecondary
  // - colorFill, colorFillSecondary, colorFillTertiary
  // - etc.
  
  // Você pode adicionar aliases customizados aqui:
  return {
    // Exemplo: Alias customizado para cor de destaque
    // colorHighlight: map.colorPrimary,
    
    // Exemplo: Alias para espaçamento padrão
    // spacingDefault: map.padding,
    
    // Por padrão, os aliases do Ant Design são suficientes
    // Adicione apenas aliases customizados se necessário
  };
}

/**
 * Alias Tokens customizados (opcional)
 * 
 * Use apenas se precisar criar aliases semânticos específicos
 * que não existem no Ant Design por padrão.
 */
export const customAliasTokens: Partial<AliasToken> = {
  // Adicione aliases customizados aqui se necessário
};

