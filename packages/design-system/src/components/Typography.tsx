"use client";

import React from "react";
import { Typography as AntdTypography, ConfigProvider } from "antd";
import type { TitleProps } from "antd/es/typography/Title";
import type { TextProps } from "antd/es/typography/Text";
import type { ParagraphProps } from "antd/es/typography/Paragraph";
import { designSystemColors } from "../theme";

const { Title, Text, Paragraph } = AntdTypography;

type TypographyVariant =
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6"
  | "body1"
  | "body2"
  | "caption";

const colorMap = {
  primary: designSystemColors.brand.primary[600],
  secondary: designSystemColors.brand.secondary[600],
  neutral: designSystemColors.neutral[500],
  dark: designSystemColors.neutral[800],
  error: designSystemColors.feedback.red[500],
  warning: designSystemColors.feedback.yellow[500],
  success: designSystemColors.feedback.green[500],
  disabled: designSystemColors.neutral[400],
} as const;

type DSColor = keyof typeof colorMap;

type AntdTypographyAllProps = Partial<
  Omit<TitleProps, "level"> & TextProps & ParagraphProps
>;

export type CustomTypographyProps = AntdTypographyAllProps & {
  variant?: TypographyVariant;
  color?: DSColor;
};

const typographyVariants = {
  heading1: {
    fontSizeHeading1: 61,
    lineHeightHeading1: 1.2,
    fontWeightStrong: 700,
    colorTextHeading: designSystemColors.neutral[800],
  },
  heading2: {
    fontSizeHeading2: 49,
    lineHeightHeading2: 1.2,
    fontWeightStrong: 700,
    colorTextHeading: designSystemColors.neutral[800],
  },
  heading3: {
    fontSizeHeading3: 39,
    lineHeightHeading3: 1.2,
    fontWeightStrong: 700,
    colorTextHeading: designSystemColors.neutral[800],
  },
  heading4: {
    fontSizeHeading4: 31,
    lineHeightHeading4: 1.2,
    fontWeightStrong: 700,
    colorTextHeading: designSystemColors.neutral[800],
  },
  heading5: {
    fontSizeHeading5: 25,
    lineHeightHeading5: 1.2,
    fontWeightStrong: 700,
    colorTextHeading: designSystemColors.neutral[800],
  },
  heading6: {
    fontSizeHeading5: 20,
    colorTextHeading: designSystemColors.neutral[800],
    lineHeightHeading5: 1.2,
  },
  body1: {
    fontSize: 16,
    lineHeight: 1.5,
    colorText: designSystemColors.neutral[800],
  },
  body2: {
    fontSize: 13,
    lineHeight: 1.4,
    colorText: designSystemColors.neutral[800],
  },
  caption: {
    fontSize: 10,
    lineHeight: 1.3,
    colorText: designSystemColors.neutral[600],
  },
} as const;

export function Typography(props: CustomTypographyProps): React.ReactElement {
  const { variant = "body1", color = "dark", style, ...rest } = props;

  const variantTheme =
    typographyVariants[variant as keyof typeof typographyVariants];
  const textColor = color ? colorMap[color as DSColor] : undefined;

  const baseStyle: React.CSSProperties = {
    margin: 0,
    color: textColor,
    ...style,
  };

  let node: React.ReactElement;

  switch (variant) {
    case "heading1":
      node = <Title level={1} style={baseStyle} {...(rest as TitleProps)} />;
      break;
    case "heading2":
      node = <Title level={2} style={baseStyle} {...(rest as TitleProps)} />;
      break;
    case "heading3":
      node = <Title level={3} style={baseStyle} {...(rest as TitleProps)} />;
      break;
    case "heading4":
      node = <Title level={4} style={baseStyle} {...(rest as TitleProps)} />;
      break;
    case "heading5":
      node = <Title level={5} style={baseStyle} {...(rest as TitleProps)} />;
      break;
    case "heading6":
      node = <Title level={5} style={baseStyle} {...(rest as TitleProps)} />;
      break;
    case "body1":
      node = (
        <Paragraph
          style={{ ...baseStyle, fontSize: 16, lineHeight: 1.5 }}
          {...(rest as ParagraphProps)}
        />
      );
      break;
    case "body2":
      node = (
        <Paragraph
          style={{ ...baseStyle, fontSize: 13, lineHeight: 1.4 }}
          {...(rest as ParagraphProps)}
        />
      );
      break;
    case "caption":
      node = <Text style={baseStyle} {...(rest as TextProps)} />;
      break;
    default:
      node = <Paragraph style={baseStyle} {...(rest as ParagraphProps)} />;
  }

  return (
    <ConfigProvider
      theme={{ token: { fontWeightStrong: 700, ...variantTheme } }}
    >
      {node}
    </ConfigProvider>
  );
}
type CleanHeadingProps = {
  [K in keyof TitleProps as K extends "level" ? never : K]: TitleProps[K];
};
type HeadingProps = CleanHeadingProps & {
  color?: DSColor;
};

type BodyProps = ParagraphProps & {
  color?: DSColor;
};

type CaptionProps = TextProps & {
  color?: DSColor;
};

export const Heading1: React.FC<HeadingProps> = (props) => {
  return <Typography variant="heading1" {...props} />;
};
Heading1.displayName = "Heading1";

export const Heading2: React.FC<HeadingProps> = (props) => {
  return <Typography variant="heading2" {...props} />;
};
Heading2.displayName = "Heading2";

export const Heading3: React.FC<HeadingProps> = (props) => {
  return <Typography variant="heading3" {...props} />;
};
Heading3.displayName = "Heading3";

export const Heading4: React.FC<HeadingProps> = (props) => {
  return <Typography variant="heading4" {...props} />;
};
Heading4.displayName = "Heading4";

export const Heading5: React.FC<HeadingProps> = (props) => {
  return <Typography variant="heading5" {...props} />;
};
Heading5.displayName = "Heading5";

export const Heading6: React.FC<HeadingProps> = (props) => {
  return <Typography variant="heading6" {...props} />;
};
Heading6.displayName = "Heading6";

export const Body1: React.FC<BodyProps> = (props) => {
  return <Typography variant="body1" {...props} />;
};
Body1.displayName = "Body1";

export const Body2: React.FC<BodyProps> = (props) => {
  return <Typography variant="body2" {...props} />;
};
Body2.displayName = "Body2";

export const Caption: React.FC<CaptionProps> = (props) => {
  return <Typography variant="caption" {...props} />;
};
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
