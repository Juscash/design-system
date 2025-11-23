import React from 'react';
import { Button as AntdButton, ConfigProvider } from 'antd';
import type { ButtonProps as AntdButtonProps } from 'antd';
import type { ThemeConfig } from 'antd';
import { designSystemColors } from '@ds/themes/colors';

/**
 * Tipos de botão customizados além dos tipos padrão do Ant Design
 */
type CustomButtonType = 'secondary' | 'neutral' | 'outline' | 'ghost' | 'destructive';

/**
 * Tipo expandido que inclui os tipos padrão do Ant Design + tipos customizados
 */
type ButtonTypeWithCustom = NonNullable<AntdButtonProps['type']> | CustomButtonType;

/**
 * Props do Button customizado
 * Expande a tipagem do Ant Design para incluir tipos customizados
 */
export interface ButtonProps extends Omit<AntdButtonProps, 'type'> {
  /**
   * Tipo do botão
   * - `primary`: Botão primário (verde)
   * - `secondary`: Botão secundário (azul)
   * - `neutral`: Botão neutro (cinza)
   * - `outline`: Botão com borda
   * - `ghost`: Botão fantasma (transparente)
   * - `destructive`: Botão destrutivo (vermelho)
   * - `default`: Botão padrão do Ant Design
   * - `link`: Botão link do Ant Design
   * - `text`: Botão texto do Ant Design
   */
  type?: ButtonTypeWithCustom;
}

/**
 * Configurações de tema para cada tipo de botão customizado
 */
const buttonThemeConfigs: Record<CustomButtonType, ThemeConfig> = {
  secondary: {
    components: {
      Button: {
        colorPrimary: designSystemColors.secondary[700],
        colorPrimaryHover: designSystemColors.secondary[800],
        colorPrimaryActive: designSystemColors.secondary[800],
        defaultHoverBorderColor: 'transparent',
        defaultBorderColor: 'transparent',
      },
    },
  },
  neutral: {
    components: {
      Button: {
        colorPrimary: designSystemColors.neutral[200],
        colorPrimaryHover: designSystemColors.neutral[400],
        colorPrimaryActive: designSystemColors.neutral[400],
        defaultBg: designSystemColors.neutral[200],
        defaultHoverBg: designSystemColors.neutral[400],
        defaultActiveBg: designSystemColors.neutral[400],
        defaultBorderColor: 'transparent',
        defaultHoverBorderColor: 'transparent',
        defaultColor: designSystemColors.neutral[900],
        defaultHoverColor: designSystemColors.neutral[900],
      },
    },
  },
  outline: {
    components: {
      Button: {
        defaultBg: 'transparent',
        defaultHoverBg: designSystemColors.neutral[100],
        defaultActiveBg: designSystemColors.neutral[200],
        defaultBorderColor: designSystemColors.neutral[300],
        defaultHoverBorderColor: designSystemColors.neutral[400],
        defaultColor: designSystemColors.neutral[900],
        defaultHoverColor: designSystemColors.neutral[900],
      },
    },
  },
  ghost: {
    components: {
      Button: {
        defaultBg: 'transparent',
        defaultHoverBg: designSystemColors.neutral[100],
        defaultActiveBg: designSystemColors.neutral[200],
        defaultBorderColor: 'transparent',
        defaultHoverBorderColor: 'transparent',
        defaultColor: designSystemColors.neutral[900],
        defaultHoverColor: designSystemColors.neutral[900],
      },
    },
  },
  destructive: {
    components: {
      Button: {
        colorPrimary: designSystemColors.feedback.red[500],
        colorPrimaryHover: designSystemColors.feedback.red[900],
        colorPrimaryActive: designSystemColors.feedback.red[900],
        defaultHoverBorderColor: 'transparent',
        defaultBorderColor: 'transparent',
      },
    },
  },
};

/**
 * Componente Button customizado
 *
 * Expande o Button do Ant Design com tipos customizados do design system.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, className, ...rest }: ButtonProps, ref) => {
    // Se for um tipo customizado, aplicar tema específico
    if (type && ['secondary', 'neutral', 'outline', 'ghost', 'destructive'].includes(type)) {
      const customType = type as CustomButtonType;
      const themeConfig = buttonThemeConfigs[customType];

      // Para variantes customizadas, usamos o estilo "primary" como base para preenchido,
      // e "default" para outline/ghost, conforme necessário.
      const isFilled =
        customType === 'secondary' || customType === 'neutral' || customType === 'destructive';
      const resolvedType: AntdButtonProps['type'] = isFilled ? 'primary' : 'default';

      return (
        <ConfigProvider theme={themeConfig}>
          <AntdButton ref={ref} type={resolvedType} className={className} {...rest} />
        </ConfigProvider>
      );
    }

    // Para tipos padrão do Ant Design (primary, default, link, text), usar diretamente
    return (
      <AntdButton
        ref={ref}
        type={type as AntdButtonProps['type']}
        className={className}
        {...rest}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
