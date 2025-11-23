import React from 'react';
import { ConfigProvider, type ButtonProps as AntdButtonProps, Button as AntdButton } from 'antd';
import { designSystemColors } from '../../theme/colors';

type AntdButtonType = NonNullable<AntdButtonProps['type']>;
type ExtendedButtonType = AntdButtonType | 'secondary' | 'destructive' | 'ghost' | 'neutral';
// Design System sizes:
// xs < s < m  (referência Figma)
// Mantemos aliases antigos por compat para docs antigas: 'p' => 's', 'g' => 'm'
type DsSize = 'xs' | 's' | 'm' | 'p' | 'g';

export interface ButtonProps extends Omit<AntdButtonProps, 'type' | 'size'> {
  type?: ExtendedButtonType;
  dsSize?: DsSize;
  size?: AntdButtonProps['size'];
}

function getSecondaryTokens() {
  return {
    borderRadius: 8,
    defaultBg: designSystemColors.secondary[700], // #0D4897
    defaultColor: designSystemColors.neutral[50], // #FAFAFA
    defaultHoverColor: designSystemColors.neutral[50],
    defaultHoverBg: designSystemColors.secondary[800], // #093671
    defaultActiveBg: designSystemColors.secondary[800],
    defaultBorderColor: 'transparent',
    defaultHoverBorderColor: 'transparent',
    colorTextDisabled: designSystemColors.neutral[400], // #A3A3A3
    colorBgContainerDisabled: designSystemColors.neutral[300], // #D4D4D4 (Figma)
  };
}

function getGhostTokens() {
  return {
    borderRadius: 8,
    defaultGhostColor: designSystemColors.primary[600], // #008633
    defaultGhostBorderColor: designSystemColors.primary[600],
    defaultHoverBg: designSystemColors.neutral[100], // #F5F5F5
  };
}

function getDestructiveTokens() {
  return {
    borderRadius: 8,
    colorError: designSystemColors.feedback.red[500], // #D2190B
    colorErrorHover: designSystemColors.feedback.red[500],
    colorErrorActive: designSystemColors.feedback.red[500], // hover/active via danger
  };
}

function getNeutralTokens() {
  return {
    borderRadius: 8,
    defaultBg: designSystemColors.neutral[200], // #E5E5E5
    defaultColor: designSystemColors.neutral[800], // #262626
    defaultBorderColor: designSystemColors.neutral[300], // #D4D4D4
    defaultHoverBorderColor: designSystemColors.neutral[300],
    defaultHoverBg: designSystemColors.neutral[400], // #A3A3A3
    defaultActiveBg: designSystemColors.neutral[400],
    colorTextDisabled: designSystemColors.neutral[400], // #A3A3A3
    colorBgContainerDisabled: designSystemColors.neutral[300], // #D4D4D4
  };
}

function normalizeSize(dsSize?: DsSize): Exclude<DsSize, 'p' | 'g'> | undefined {
  if (dsSize === 'p') return 's';
  if (dsSize === 'g') return 'm';
  return dsSize as Exclude<DsSize, 'p' | 'g'> | undefined;
}

function getSizeTokens(dsSize?: DsSize) {
  const size = normalizeSize(dsSize);

  // Apenas fonte/tipografia conforme Figma; mantemos alturas/paddings padrão
  if (size === 'xs') {
    // XS: 10px
    return { fontSize: 10 };
  }
  if (size === 's') {
    // S: 13px
    return { fontSize: 13 };
  }
  // M (default): 13px
  return { fontSize: 13 };
}

function mapToAntSize(dsSize?: DsSize): AntdButtonProps['size'] {
  const size = normalizeSize(dsSize);
  if (size === 'xs' || size === 's') return 'small';
  return 'middle'; // m (default)
}

export function Button(props: ButtonProps): React.ReactElement {
  const { type, dsSize, size, ...rest } = props;
  const resolvedSize = size ?? mapToAntSize(dsSize);
  const sizeTokens = getSizeTokens(dsSize);

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
    // Ghost no Figma: sem borda, texto na cor da brand e hover com bg neutro
    return (
      <ConfigProvider theme={{ components: { Button: { ...getGhostTokens(), ...sizeTokens } } }}>
        <AntdButton
          type="text"
          size={resolvedSize}
          style={{ color: designSystemColors.primary[600] }}
          {...rest}
        />
      </ConfigProvider>
    );
  }

  if (type === 'destructive') {
    return (
      <ConfigProvider
        theme={{ components: { Button: { ...getDestructiveTokens(), ...sizeTokens } } }}
      >
        <AntdButton danger type="primary" size={resolvedSize} {...rest} />
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

  return <AntdButton type={type as AntdButtonType} size={resolvedSize} {...rest} />;
}
