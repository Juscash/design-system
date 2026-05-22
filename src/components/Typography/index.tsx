import React from "react";
import { Typography as AntdTypography, ConfigProvider } from "antd";
import type { TitleProps } from "antd/es/typography/Title";
import type { TextProps } from "antd/es/typography/Text";
import type { ParagraphProps } from "antd/es/typography/Paragraph";
import { designSystemColors } from "../../theme";
import type {
  BodyProps,
  CaptionProps,
  CustomTypographyProps,
  DSColor,
  HeadingProps,
  TypographyVariant,
} from "../../types/components/Typography";

const { Title, Text, Paragraph } = AntdTypography;

const HEADING1_SIZE = 61;
const HEADING2_SIZE = 49;
const HEADING3_SIZE = 39;
const HEADING4_SIZE = 31;
const HEADING5_SIZE = 25;
const HEADING6_SIZE = 20;
const BODY1_SIZE = 16;
const BODY2_SIZE = 13;
const CAPTION_SIZE = 10;

const colorMap: Record<DSColor, string> = {
  primary: designSystemColors.brand.primary[600],
  secondary: designSystemColors.brand.secondary[600],
  neutral: designSystemColors.neutral[500],
  dark: designSystemColors.neutral[800],
  error: designSystemColors.feedback.red[500],
  warning: designSystemColors.feedback.yellow[500],
  success: designSystemColors.feedback.green[500],
  disabled: designSystemColors.neutral[400],
  info: designSystemColors.feedback.blue[500],
};

const typographyVariants = {
  heading1: {
    fontSizeHeading1: HEADING1_SIZE,
    lineHeightHeading1: 1.2,
    fontWeightStrong: 700,
    colorTextHeading: designSystemColors.neutral[800],
  },
  heading2: {
    fontSizeHeading2: HEADING2_SIZE,
    lineHeightHeading2: 1.2,
    fontWeightStrong: 700,
    colorTextHeading: designSystemColors.neutral[800],
  },
  heading3: {
    fontSizeHeading3: HEADING3_SIZE,
    lineHeightHeading3: 1.2,
    fontWeightStrong: 700,
    colorTextHeading: designSystemColors.neutral[800],
  },
  heading4: {
    fontSizeHeading4: HEADING4_SIZE,
    lineHeightHeading4: 1.2,
    fontWeightStrong: 700,
    colorTextHeading: designSystemColors.neutral[800],
  },
  heading5: {
    fontSizeHeading5: HEADING5_SIZE,
    lineHeightHeading5: 1.2,
    fontWeightStrong: 700,
    colorTextHeading: designSystemColors.neutral[800],
  },
  heading6: {
    fontSizeHeading5: HEADING6_SIZE,
    colorTextHeading: designSystemColors.neutral[800],
    lineHeightHeading5: 1.2,
  },
  body1: {
    fontSize: BODY1_SIZE,
    lineHeight: 1.5,
    colorText: designSystemColors.neutral[800],
  },
  body2: {
    fontSize: BODY2_SIZE,
    lineHeight: 1.4,
    colorText: designSystemColors.neutral[800],
  },
  caption: {
    fontSize: CAPTION_SIZE,
    lineHeight: 1.3,
    colorText: designSystemColors.neutral[600],
  },
} as const;

function renderTypography(variant: TypographyVariant, baseStyle: React.CSSProperties, rest: object): React.ReactElement {
  switch (variant) {
    case "heading1":
      return <Title level={1} style={baseStyle} {...(rest as TitleProps)} />;
    case "heading2":
      return <Title level={2} style={baseStyle} {...(rest as TitleProps)} />;
    case "heading3":
      return <Title level={3} style={baseStyle} {...(rest as TitleProps)} />;
    case "heading4":
      return <Title level={4} style={baseStyle} {...(rest as TitleProps)} />;
    case "heading5":
      return <Title level={5} style={baseStyle} {...(rest as TitleProps)} />;
    case "heading6":
      return <Title level={5} style={baseStyle} {...(rest as TitleProps)} />;
    case "body1":
      return <Paragraph style={{ ...baseStyle, fontSize: BODY1_SIZE, lineHeight: 1.5 }} {...(rest as ParagraphProps)} />;
    case "body2":
      return <Paragraph style={{ ...baseStyle, fontSize: BODY2_SIZE, lineHeight: 1.4 }} {...(rest as ParagraphProps)} />;
    case "caption":
      return <Text style={baseStyle} {...(rest as TextProps)} />;
    default:
      return <Paragraph style={baseStyle} {...(rest as ParagraphProps)} />;
  }
}

/**
 * Componente raiz de tipografia. Aplica `variant` (`heading1..6`, `body1|2`,
 * `caption`) e `color` (paleta DS) sobre o `Typography` do Antd.
 */
export function Typography(props: CustomTypographyProps): React.ReactElement {
  const { variant = "body1", color = "dark", style, ...rest } = props;
  const variantTheme = typographyVariants[variant as keyof typeof typographyVariants];
  const textColor = color ? colorMap[color] : undefined;

  const baseStyle: React.CSSProperties = {
    margin: 0,
    color: textColor,
    ...style,
  };

  const node = renderTypography(variant, baseStyle, rest);
  return <ConfigProvider theme={{ token: { fontWeightStrong: 700, ...variantTheme } }}>{node}</ConfigProvider>;
}

Typography.displayName = "Typography";

export const Heading1: React.FC<HeadingProps> = (props) => <Typography variant="heading1" {...props} />;
Heading1.displayName = "Heading1";

export const Heading2: React.FC<HeadingProps> = (props) => <Typography variant="heading2" {...props} />;
Heading2.displayName = "Heading2";

export const Heading3: React.FC<HeadingProps> = (props) => <Typography variant="heading3" {...props} />;
Heading3.displayName = "Heading3";

export const Heading4: React.FC<HeadingProps> = (props) => <Typography variant="heading4" {...props} />;
Heading4.displayName = "Heading4";

export const Heading5: React.FC<HeadingProps> = (props) => <Typography variant="heading5" {...props} />;
Heading5.displayName = "Heading5";

export const Heading6: React.FC<HeadingProps> = (props) => <Typography variant="heading6" {...props} />;
Heading6.displayName = "Heading6";

export const Body1: React.FC<BodyProps> = (props) => <Typography variant="body1" {...props} />;
Body1.displayName = "Body1";

export const Body2: React.FC<BodyProps> = (props) => <Typography variant="body2" {...props} />;
Body2.displayName = "Body2";

export const Caption: React.FC<CaptionProps> = (props) => <Typography variant="caption" {...props} />;
Caption.displayName = "Caption";

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

export type {
  CustomTypographyProps,
  HeadingProps,
  BodyProps,
  CaptionProps,
  TypographyVariant,
  DSColor,
} from "../../types/components/Typography";
