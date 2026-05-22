import type { TitleProps } from "antd/es/typography/Title";
import type { TextProps } from "antd/es/typography/Text";
import type { ParagraphProps } from "antd/es/typography/Paragraph";

export type TypographyVariant =
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6"
  | "body1"
  | "body2"
  | "caption";

export type DSColor =
  | "primary"
  | "secondary"
  | "neutral"
  | "dark"
  | "error"
  | "warning"
  | "success"
  | "disabled"
  | "info";

type AntdTypographyAllProps = Partial<Omit<TitleProps, "level"> & TextProps & ParagraphProps>;

export type CustomTypographyProps = AntdTypographyAllProps & {
  variant?: TypographyVariant;
  color?: DSColor;
};

type CleanHeadingProps = {
  [K in keyof TitleProps as K extends "level" ? never : K]: TitleProps[K];
};

export type HeadingProps = CleanHeadingProps & {
  color?: DSColor;
};

export type BodyProps = ParagraphProps & {
  color?: DSColor;
};

export type CaptionProps = TextProps & {
  color?: DSColor;
};
