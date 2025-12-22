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
  neutral: designSystemColors.neutral[800],
  error: designSystemColors.feedback.red[500],
  warning: designSystemColors.feedback.yellow[500],
  success: designSystemColors.feedback.green[500],
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
    Typography: {
      fontSizeHeading1: 61,
      lineHeightHeading1: 1.2,
      fontWeightStrong: 700,
      colorTextHeading: designSystemColors.neutral[800],
    },
  },
  heading2: {
    Typography: {
      fontSizeHeading2: 49,
      lineHeightHeading2: 1.2,
      fontWeightStrong: 700,
      colorTextHeading: designSystemColors.neutral[800],
    },
  },
  heading3: {
    Typography: {
      fontSizeHeading3: 39,
      lineHeightHeading3: 1.2,
      fontWeightStrong: 700,
      colorTextHeading: designSystemColors.neutral[800],
    },
  },
  heading4: {
    Typography: {
      fontSizeHeading4: 31,
      lineHeightHeading4: 1.2,
      fontWeightStrong: 700,
      colorTextHeading: designSystemColors.neutral[800],
    },
  },
  heading5: {
    Typography: {
      fontSizeHeading5: 25,
      lineHeightHeading5: 1.2,
      fontWeightStrong: 700,
      colorTextHeading: designSystemColors.neutral[800],
    },
  },
  heading6: {
    Typography: {
      fontWeightStrong: 700,
      colorTextHeading: designSystemColors.neutral[800],
    },
  },
  body1: {
    Typography: {
      fontSize: 16,
      lineHeight: 1.5,
      colorText: designSystemColors.neutral[800],
    },
  },
  body2: {
    Typography: {
      fontSize: 13,
      lineHeight: 1.4,
      colorText: designSystemColors.neutral[800],
    },
  },
  caption: {
    Typography: {
      fontSize: 10,
      lineHeight: 1.3,
      colorText: designSystemColors.neutral[600],
    },
  },
} as const;

export function Typography(props: CustomTypographyProps): React.ReactElement {
  const { variant = "body1", color, style, ...rest } = props;

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
      node = (
        <Title
          level={5}
          style={{
            ...baseStyle,
            fontSize: 20,
            lineHeight: 1.2,
            fontWeight: 700,
          }}
          {...(rest as TitleProps)}
        />
      );
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
      node = (
        <Text
          style={{ ...baseStyle, fontSize: 10, lineHeight: 1.3 }}
          {...(rest as TextProps)}
        />
      );
      break;
    default:
      node = <Paragraph style={baseStyle} {...(rest as ParagraphProps)} />;
  }

  return (
    <ConfigProvider theme={{ components: variantTheme }}>{node}</ConfigProvider>
  );
}

export function Heading1(props: Omit<CustomTypographyProps, "variant">) {
  return <Typography variant="heading1" {...props} />;
}
export function Heading2(props: Omit<CustomTypographyProps, "variant">) {
  return <Typography variant="heading2" {...props} />;
}
export function Heading3(props: Omit<CustomTypographyProps, "variant">) {
  return <Typography variant="heading3" {...props} />;
}
export function Heading4(props: Omit<CustomTypographyProps, "variant">) {
  return <Typography variant="heading4" {...props} />;
}
export function Heading5(props: Omit<CustomTypographyProps, "variant">) {
  return <Typography variant="heading5" {...props} />;
}
export function Heading6(props: Omit<CustomTypographyProps, "variant">) {
  return <Typography variant="heading6" {...props} />;
}
export function Body1(props: Omit<CustomTypographyProps, "variant">) {
  return <Typography variant="body1" {...props} />;
}
export function Body2(props: Omit<CustomTypographyProps, "variant">) {
  return <Typography variant="body2" {...props} />;
}
export function Caption(props: Omit<CustomTypographyProps, "variant">) {
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
