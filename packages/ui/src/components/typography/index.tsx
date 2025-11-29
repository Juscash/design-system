import React from 'react';
import { Typography as AntdTypography, ConfigProvider, type ThemeConfig } from 'antd';
import type { TitleProps } from 'antd/es/typography/Title';
import type { TextProps } from 'antd/es/typography/Text';
import type { ParagraphProps } from 'antd/es/typography/Paragraph';
import { designSystemColors } from '../../theme/colors';

const { Title, Text, Paragraph } = AntdTypography;

type TypographyVariant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'heading6'
  | 'body1'
  | 'body2'
  | 'caption';

const colorMap = {
  primary: designSystemColors.primary[600],
  secondary: designSystemColors.secondary[600],
  neutral: designSystemColors.neutral[800],
  error: designSystemColors.feedback.red[500],
  warning: designSystemColors.feedback.yellow[500],
  success: designSystemColors.feedback.green[500],
} as const;

type DSColor = keyof typeof colorMap;

type TypographyComponentToken = NonNullable<NonNullable<ThemeConfig['components']>['Typography']>;

type AntdTypographyAllProps = Partial<Omit<TitleProps, 'level'> & TextProps & ParagraphProps>;

export type TypographyProps = AntdTypographyAllProps & {
  variant?: TypographyVariant;
  color?: DSColor;
};

function getGlobalTypographyTokens(): Partial<TypographyComponentToken> {
  return {
    fontFamily: 'Inter, sans-serif',
  };
}

function getHeading1Tokens(): Partial<TypographyComponentToken> {
  return {
    ...getGlobalTypographyTokens(),
    fontSizeHeading1: 61, // 3.813rem
    lineHeightHeading1: 1.2,
    fontWeightStrong: 700,
    colorTextHeading: designSystemColors.neutral[800],
  };
}

function getHeading2Tokens(): Partial<TypographyComponentToken> {
  return {
    ...getGlobalTypographyTokens(),
    fontSizeHeading2: 49, // 3.063rem
    lineHeightHeading2: 1.2,
    fontWeightStrong: 700,
    colorTextHeading: designSystemColors.neutral[800],
  };
}

function getHeading3Tokens(): Partial<TypographyComponentToken> {
  return {
    ...getGlobalTypographyTokens(),
    fontSizeHeading3: 39, // 2.438rem
    lineHeightHeading3: 1.2,
    fontWeightStrong: 700,
    colorTextHeading: designSystemColors.neutral[800],
  };
}

function getHeading4Tokens(): Partial<TypographyComponentToken> {
  return {
    ...getGlobalTypographyTokens(),
    fontSizeHeading4: 31, // 1.938rem
    lineHeightHeading4: 1.2,
    fontWeightStrong: 700,
    colorTextHeading: designSystemColors.neutral[800],
  };
}

function getHeading5Tokens(): Partial<TypographyComponentToken> {
  return {
    ...getGlobalTypographyTokens(),
    fontSizeHeading5: 25, // 1.563rem
    lineHeightHeading5: 1.2,
    fontWeightStrong: 700,
    colorTextHeading: designSystemColors.neutral[800],
  };
}

function getHeading6Tokens(): Partial<TypographyComponentToken> {
  return {
    ...getGlobalTypographyTokens(),
    fontWeightStrong: 700,
    colorTextHeading: designSystemColors.neutral[800],
  };
}

function getBody1Tokens(): Partial<TypographyComponentToken> {
  return {
    ...getGlobalTypographyTokens(),
    fontSize: 16, // 1rem
    lineHeight: 1.5,
    colorText: designSystemColors.neutral[800],
  };
}

function getBody2Tokens(): Partial<TypographyComponentToken> {
  return {
    ...getGlobalTypographyTokens(),
    fontSize: 13, // 0.813rem
    lineHeight: 1.4,
    colorText: designSystemColors.neutral[800],
  };
}

function getCaptionTokens(): Partial<TypographyComponentToken> {
  return {
    ...getGlobalTypographyTokens(),
    fontSize: 10, // 0.625rem
    lineHeight: 1.3,
    colorText: designSystemColors.neutral[600],
  };
}

const typographyVariants = {
  heading1: {
    Typography: getHeading1Tokens(),
  },
  heading2: {
    Typography: getHeading2Tokens(),
  },
  heading3: {
    Typography: getHeading3Tokens(),
  },
  heading4: {
    Typography: getHeading4Tokens(),
  },
  heading5: {
    Typography: getHeading5Tokens(),
  },
  heading6: {
    Typography: getHeading6Tokens(),
  },
  body1: {
    Typography: getBody1Tokens(),
  },
  body2: {
    Typography: getBody2Tokens(),
  },
  caption: {
    Typography: getCaptionTokens(),
  },
} as const;

export function Typography(props: TypographyProps): React.ReactElement {
  const { variant = 'body1', color, style, ...rest } = props;

  const variantTheme = typographyVariants[variant as keyof typeof typographyVariants];

  const textColor = color ? colorMap[color as DSColor] : undefined;

  const customStyle: React.CSSProperties = {
    margin: 0,
    ...(textColor ? { color: textColor } : {}),
    ...style,
  };

  let node: React.ReactElement;

  switch (variant) {
    case 'heading1':
      node = <Title level={1} style={customStyle} {...(rest as TitleProps)} />;
      break;
    case 'heading2':
      node = <Title level={2} style={customStyle} {...(rest as TitleProps)} />;
      break;
    case 'heading3':
      node = <Title level={3} style={customStyle} {...(rest as TitleProps)} />;
      break;
    case 'heading4':
      node = <Title level={4} style={customStyle} {...(rest as TitleProps)} />;
      break;
    case 'heading5':
      node = <Title level={5} style={customStyle} {...(rest as TitleProps)} />;
      break;
    case 'heading6':
      node = (
        <Title
          level={5}
          style={{
            ...customStyle,
            fontSize: '1.25rem',
            lineHeight: 1.2,
            fontWeight: 700,
          }}
          {...(rest as TitleProps)}
        />
      );
      break;
    case 'body1':
      node = <Paragraph style={customStyle} {...(rest as ParagraphProps)} />;
      break;
    case 'body2':
      node = <Paragraph style={customStyle} {...(rest as ParagraphProps)} />;
      break;
    case 'caption':
      node = <Text style={customStyle} {...(rest as TextProps)} />;
      break;
    default:
      node = <Paragraph style={customStyle} {...(rest as ParagraphProps)} />;
  }

  return <ConfigProvider theme={{ components: variantTheme }}>{node}</ConfigProvider>;
}

export interface Heading1Props extends Omit<TitleProps, 'level'> {
  color?: DSColor;
}

export interface Heading2Props extends Omit<TitleProps, 'level'> {
  color?: DSColor;
}

export interface Heading3Props extends Omit<TitleProps, 'level'> {
  color?: DSColor;
}

export interface Heading4Props extends Omit<TitleProps, 'level'> {
  color?: DSColor;
}

export interface Heading5Props extends Omit<TitleProps, 'level'> {
  color?: DSColor;
}

export interface Heading6Props extends Omit<TitleProps, 'level'> {
  color?: DSColor;
}

export interface Body1Props extends ParagraphProps {
  color?: DSColor;
}

export interface Body2Props extends ParagraphProps {
  color?: DSColor;
}

export interface CaptionProps extends TextProps {
  color?: DSColor;
}

export function Heading1(props: Heading1Props) {
  return <Typography variant="heading1" {...props} />;
}

export function Heading2(props: Heading2Props) {
  return <Typography variant="heading2" {...props} />;
}

export function Heading3(props: Heading3Props) {
  return <Typography variant="heading3" {...props} />;
}

export function Heading4(props: Heading4Props) {
  return <Typography variant="heading4" {...props} />;
}

export function Heading5(props: Heading5Props) {
  return <Typography variant="heading5" {...props} />;
}

export function Heading6(props: Heading6Props) {
  return <Typography variant="heading6" {...props} />;
}

export function Body1(props: Body1Props) {
  return <Typography variant="body1" {...props} />;
}

export function Body2(props: Body2Props) {
  return <Typography variant="body2" {...props} />;
}

export function Caption(props: CaptionProps) {
  return <Typography variant="caption" {...props} />;
}

export const TypographyComponents = {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Body1,
  Body2,
  Caption,
};
