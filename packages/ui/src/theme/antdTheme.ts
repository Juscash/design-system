import type { ThemeConfig } from 'antd';
import { designSystemColors } from './colors';

// Tema base: define o verde como primary (conforme DS) e radius padrão.
export const antdTheme: ThemeConfig = {
  token: {
    borderRadius: 8,
    colorPrimary: designSystemColors.primary[600]
  },
  components: {
    Button: {
      colorPrimary: designSystemColors.primary[600],
      colorPrimaryHover: designSystemColors.primary[700],
      colorPrimaryActive: designSystemColors.primary[800]
    }
  }
};
