/**
 * Map Tokens
 * 
 * Tokens derivados calculados a partir dos Seed Tokens.
 * Estes tokens são gerados automaticamente via algoritmo do Ant Design.
 * 
 * Você pode sobrescrever valores específicos aqui se necessário,
 * mas geralmente o algoritmo padrão é suficiente.
 */

import type { MapToken } from 'antd/es/theme/interface';
import { seedToken } from './seed';

/**
 * Gera Map Tokens a partir dos Seed Tokens
 * 
 * O Ant Design usa algoritmos para calcular tokens derivados.
 * Esta função permite customizar o processo se necessário.
 * 
 * @param seed - Seed Tokens de origem
 * @returns Map Tokens derivados
 */
export function generateMapTokens(seed: typeof seedToken): Partial<MapToken> {
  // O Ant Design calculará automaticamente os Map Tokens
  // através do algoritmo padrão (theme.defaultAlgorithm)
  // 
  // Você pode adicionar customizações específicas aqui se necessário:
  
  return {
    // Exemplo: Customizar espaçamentos baseados no seed
    // padding: seed.sizeStep * 4, // 16px
    // paddingXS: seed.sizeStep * 1, // 4px
    // paddingSM: seed.sizeStep * 2, // 8px
    // paddingLG: seed.sizeStep * 6, // 24px
    // paddingXL: seed.sizeStep * 8, // 32px
    
    // Exemplo: Customizar border radius baseado no seed
    // borderRadiusLG: seed.borderRadius * 1.5,
    // borderRadiusSM: seed.borderRadius * 0.67,
    // borderRadiusXS: seed.borderRadius * 0.33,
    
    // Exemplo: Customizar control heights baseado no seed
    // controlHeightSM: seed.controlHeight * 0.75, // 24px
    // controlHeightLG: seed.controlHeight * 1.25, // 40px
    
    // Por padrão, deixamos o algoritmo do Ant Design calcular tudo
    // Adicione customizações apenas quando necessário
  };
}

/**
 * Map Tokens customizados (opcional)
 * 
 * Use apenas se precisar sobrescrever valores calculados pelo algoritmo.
 * Na maioria dos casos, o algoritmo padrão é suficiente.
 */
export const customMapTokens: Partial<MapToken> = {
  // Adicione customizações específicas aqui se necessário
  // Exemplo:
  // padding: 16,
  // margin: 16,
};

