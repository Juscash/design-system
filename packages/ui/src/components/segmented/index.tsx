import React from 'react';
import { ConfigProvider, Segmented as AntdSegmented, type ThemeConfig } from 'antd';
import type { SegmentedProps as AntdSegmentedProps } from 'antd';
import { designSystemColors } from '../../theme/colors';
import { radius, spacing } from '../../theme/fundamentos';

type DsSize = 'xs' | 's' | 'm';

type SegmentedComponentToken = NonNullable<NonNullable<ThemeConfig['components']>['Segmented']>;

export interface SegmentedProps extends AntdSegmentedProps {
  dsSize?: DsSize;
}

function getGlobalSegmentedTokens(): Partial<SegmentedComponentToken> {
  return {
    borderRadius: parseInt(radius.xl),
    trackBg: 'transparent',
    trackPadding: 0,
  };
}

function getSizeTokens(dsSize?: DsSize): Partial<SegmentedComponentToken> {
  const baseTokens = {
    itemSelectedBg: designSystemColors.neutral[900],
    itemSelectedColor: designSystemColors.neutral[50],
    itemColor: designSystemColors.neutral[800],
    itemHoverBg: designSystemColors.neutral[200],
    itemHoverColor: designSystemColors.neutral[800],
    itemActiveBg: designSystemColors.neutral[900],
  };

  if (dsSize === 'xs') {
    return {
      ...baseTokens,
      borderRadius: parseInt(radius.md),
    };
  }

  if (dsSize === 's') {
    return {
      ...baseTokens,
      borderRadius: parseInt(radius.md),
    };
  }

  // M (default)
  return {
    ...baseTokens,
    borderRadius: parseInt(radius.xl),
  };
}

function mapToAntSize(dsSize?: DsSize): AntdSegmentedProps['size'] {
  if (dsSize === 'xs' || dsSize === 's') return 'small';
  return 'middle';
}

function getItemStyles(dsSize?: DsSize): React.CSSProperties {
  if (dsSize === 'xs') {
    return {
      padding: `${spacing[1]}px ${spacing[2]}px`,
      fontSize: 10,
      fontFamily: 'Inter, sans-serif',
    };
  }

  if (dsSize === 's') {
    return {
      padding: `${spacing[1]}px ${spacing[2]}px`,
      fontSize: 13,
      fontFamily: 'Inter, sans-serif',
    };
  }

  // M (default)
  return {
    padding: `${spacing[2]}px ${spacing[3]}px`,
    fontSize: 13,
    fontFamily: 'Inter, sans-serif',
  };
}

export function Segmented(props: SegmentedProps): React.ReactElement {
  const { dsSize, size, style, className, ...rest } = props;
  const resolvedSize = size ?? mapToAntSize(dsSize);
  const sizeTokens = getSizeTokens(dsSize);
  const globalTokens = getGlobalSegmentedTokens();

  const tokens = {
    ...globalTokens,
    ...sizeTokens,
  };

  const customClassName = `ds-segmented-${dsSize || 'm'} ${className || ''}`.trim();

  const customStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    ...style,
  };

  const itemStyles = getItemStyles(dsSize);

  // A prop 'styles' existe na documentação do Ant Design mas não está nos tipos TypeScript
  // Usamos type assertion para permitir seu uso
  const segmentedProps = {
    size: resolvedSize,
    style: customStyle,
    className: customClassName,
    styles: {
      item: itemStyles,
    },
    ...rest,
  } as AntdSegmentedProps & { styles?: { item?: React.CSSProperties } };

  return (
    <ConfigProvider theme={{ components: { Segmented: tokens } }}>
      <AntdSegmented {...segmentedProps} />
    </ConfigProvider>
  );
}
