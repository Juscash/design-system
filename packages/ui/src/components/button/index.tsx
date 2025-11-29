import React from 'react';
import {
  ConfigProvider,
  type ButtonProps as AntdButtonProps,
  Button as AntdButton,
  type ThemeConfig,
} from 'antd';
import { designSystemColors } from '../../theme/colors';
import { radius, spacing } from '../../theme/fundamentos';

type AntdButtonType = NonNullable<AntdButtonProps['type']>;
type ExtendedButtonType =
  | AntdButtonType
  | 'secondary'
  | 'destructive'
  | 'ghost'
  | 'neutral'
  | 'outlined';

type DsSize = 'xs' | 's' | 'm' | 'p' | 'g';

type ButtonComponentToken = NonNullable<NonNullable<ThemeConfig['components']>['Button']>;

export interface ButtonProps extends Omit<AntdButtonProps, 'type' | 'size'> {
  type?: ExtendedButtonType;
  dsSize?: DsSize;
  size?: AntdButtonProps['size'];
  iconOnly?: boolean;
}

function getGlobalButtonTokens(): Partial<ButtonComponentToken> {
  return {
    borderRadius: parseInt(radius.xl),
  };
}

function getPrimaryTokens(): Partial<ButtonComponentToken> {
  return {
    ...getGlobalButtonTokens(),
    colorPrimary: designSystemColors.primary[600],
    colorPrimaryHover: designSystemColors.primary[800],
    colorPrimaryActive: designSystemColors.primary[800],
    defaultColor: designSystemColors.neutral[50],
    colorTextDisabled: designSystemColors.neutral[400],
    colorBgContainerDisabled: designSystemColors.neutral[300],
  };
}

function getSecondaryTokens(): Partial<ButtonComponentToken> {
  return {
    ...getGlobalButtonTokens(),
    defaultBg: designSystemColors.secondary[700],
    defaultColor: designSystemColors.neutral[50],
    defaultHoverColor: designSystemColors.neutral[50],
    defaultActiveColor: designSystemColors.neutral[50],
    defaultHoverBg: designSystemColors.secondary[800],
    defaultActiveBg: designSystemColors.secondary[800],
    defaultBorderColor: 'transparent',
    defaultHoverBorderColor: 'transparent',

    colorTextDisabled: designSystemColors.neutral[400],
    colorBgContainerDisabled: designSystemColors.neutral[300],
  };
}

function getGhostTokens(): Partial<ButtonComponentToken> {
  return {
    ...getGlobalButtonTokens(),
    defaultBg: 'transparent',
    defaultColor: designSystemColors.neutral[800],
    defaultHoverColor: designSystemColors.neutral[800],
    defaultActiveColor: designSystemColors.neutral[800],
    defaultBorderColor: 'transparent',
    defaultHoverBorderColor: 'transparent',
    defaultHoverBg: designSystemColors.neutral[100], // #F5F5F5
    defaultActiveBg: designSystemColors.neutral[100],
    colorTextDisabled: designSystemColors.neutral[400], // #A3A3A3
  };
}

function getDestructiveTokens(): Partial<ButtonComponentToken> {
  return {
    ...getGlobalButtonTokens(),
    colorPrimary: designSystemColors.feedback.red[500], // #D2190B
    colorPrimaryHover: designSystemColors.feedback.red[900], // #9D231C
    colorPrimaryActive: designSystemColors.feedback.red[900],
    defaultColor: designSystemColors.neutral[50],
    colorTextDisabled: designSystemColors.neutral[400], // #A3A3A3
    colorBgContainerDisabled: designSystemColors.neutral[300], // #D4D4D4
  };
}

function getNeutralTokens(): Partial<ButtonComponentToken> {
  return {
    ...getGlobalButtonTokens(),
    defaultBg: designSystemColors.neutral[200], // #E5E5E5
    defaultColor: designSystemColors.neutral[800], // #262626
    defaultBorderColor: 'transparent', // #D4D4D4
    defaultHoverBorderColor: designSystemColors.neutral[300],
    defaultHoverBg: designSystemColors.neutral[400], // #A3A3A3
    defaultActiveBg: designSystemColors.neutral[400],
    defaultHoverColor: designSystemColors.neutral[800],
    defaultActiveColor: designSystemColors.neutral[800],
    colorTextDisabled: designSystemColors.neutral[400], // #A3A3A3
    colorBgContainerDisabled: designSystemColors.neutral[300], // #D4D4D4
  };
}

function getOutlinedTokens(): Partial<ButtonComponentToken> {
  return {
    ...getGlobalButtonTokens(),
    // Outlined neutral: texto e borda cinzas (sem brand)
    defaultColor: designSystemColors.neutral[800], // #262626
    defaultBorderColor: designSystemColors.neutral[300], // #D4D4D4
    defaultHoverBorderColor: designSystemColors.neutral[400], // #A3A3A3
    defaultHoverColor: designSystemColors.neutral[800],
    defaultHoverBg: designSystemColors.neutral[100], // #F5F5F5
    defaultActiveBg: designSystemColors.neutral[100],
    colorTextDisabled: designSystemColors.neutral[400], // #A3A3A3
    colorBgContainerDisabled: designSystemColors.neutral[300], // #D4D4D4
  };
}

function normalizeSize(dsSize?: DsSize): Exclude<DsSize, 'p' | 'g'> | undefined {
  if (dsSize === 'p') return 's';
  if (dsSize === 'g') return 'm';
  return dsSize as Exclude<DsSize, 'p' | 'g'> | undefined;
}

function getSizeTokens(dsSize?: DsSize, iconOnly?: boolean): Partial<ButtonComponentToken> {
  const size = normalizeSize(dsSize);

  if (iconOnly) {
    // Tamanhos específicos para botões apenas com ícone (quadrados)
    if (size === 'xs') {
      return {
        controlHeight: 24,
        paddingContentHorizontal: spacing[1],
        paddingContentVertical: spacing[1],
        fontSize: 10,
        borderRadius: parseInt(radius.md),
      };
    }
    if (size === 's') {
      return {
        controlHeight: 32,
        paddingContentHorizontal: spacing[1],
        paddingContentVertical: spacing[1],
        fontSize: 13,
        borderRadius: parseInt(radius.xl),
      };
    }
    // M (default)
    return {
      controlHeight: 36,
      paddingContentHorizontal: spacing[1],
      paddingContentVertical: spacing[1],
      fontSize: 13,
      borderRadius: parseInt(radius.xl),
    };
  }

  // Tamanhos normais com texto
  if (size === 'xs') {
    return {
      controlHeight: 24,
      paddingContentHorizontal: spacing[2],
      paddingContentVertical: spacing[1],
      fontSize: 10,
      borderRadius: parseInt(radius.md), // XS usa 4px conforme Figma
    };
  }
  if (size === 's') {
    return {
      controlHeight: 32,
      paddingContentHorizontal: spacing[3],
      paddingContentVertical: spacing[1],
      fontSize: 13,
      borderRadius: parseInt(radius.xl),
    };
  }
  // M (default)
  return {
    controlHeight: 36,
    paddingContentHorizontal: spacing[4],
    paddingContentVertical: spacing[2],
    fontSize: 13,
    borderRadius: parseInt(radius.xl),
  };
}

function mapToAntSize(dsSize?: DsSize): AntdButtonProps['size'] {
  const size = normalizeSize(dsSize);
  if (size === 'xs' || size === 's') return 'small';
  return 'middle';
}

export function Button(props: ButtonProps): React.ReactElement {
  const { type, dsSize, size, iconOnly, ...rest } = props;
  const resolvedSize = size ?? mapToAntSize(dsSize);
  const sizeTokens = getSizeTokens(dsSize, iconOnly);

  if (type === 'primary') {
    return (
      <ConfigProvider theme={{ components: { Button: { ...getPrimaryTokens(), ...sizeTokens } } }}>
        <AntdButton type="primary" size={resolvedSize} {...rest} />
      </ConfigProvider>
    );
  }

  if (type === 'secondary') {
    return (
      <ConfigProvider
        theme={{ components: { Button: { ...getSecondaryTokens(), ...sizeTokens } } }}
      >
        <AntdButton type="default" size={resolvedSize} {...rest} />
      </ConfigProvider>
    );
  }

  if (type === 'ghost') {
    // Ghost sem borda aparente (border transparente) e texto neutro
    return (
      <ConfigProvider theme={{ components: { Button: { ...getGhostTokens(), ...sizeTokens } } }}>
        <AntdButton type="default" size={resolvedSize} {...rest} />
      </ConfigProvider>
    );
  }

  if (type === 'destructive') {
    return (
      <ConfigProvider
        theme={{ components: { Button: { ...getDestructiveTokens(), ...sizeTokens } } }}
      >
        <AntdButton type="primary" size={resolvedSize} {...rest} />
      </ConfigProvider>
    );
  }

  if (type === 'neutral') {
    return (
      <ConfigProvider theme={{ components: { Button: { ...getNeutralTokens(), ...sizeTokens } } }}>
        <AntdButton type="default" size={resolvedSize} {...rest} />
      </ConfigProvider>
    );
  }

  if (type === 'outlined') {
    return (
      <ConfigProvider theme={{ components: { Button: { ...getOutlinedTokens(), ...sizeTokens } } }}>
        <AntdButton type="default" size={resolvedSize} {...rest} />
      </ConfigProvider>
    );
  }

  return <AntdButton type={type as AntdButtonType} size={resolvedSize} {...rest} />;
}
