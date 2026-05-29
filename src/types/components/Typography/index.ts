import type { TitleProps } from "antd/es/typography/Title";
import type { TextProps } from "antd/es/typography/Text";
import type { ParagraphProps } from "antd/es/typography/Paragraph";

/**
 * União com as 9 variantes publicadas no frame `Tipografia` (`4002:5004`)
 * do Figma. Não há outras variantes nem eixos de variação (por exemplo
 * `color`) documentados para Typography.
 */
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

/**
 * Superset das props que o Antd Typography expõe nos três entrypoints
 * (`Title`, `Text`, `Paragraph`). Usado como bag de pass-through após
 * descontar as props proprietárias (`variant`, `style`).
 */
export type AntdTypographyAllProps = Partial<
  Omit<TitleProps, "level"> & TextProps & ParagraphProps
>;

export type CustomTypographyProps = AntdTypographyAllProps & {
  variant?: TypographyVariant;
};

/*
 * Os aliases abaixo omitem `editable` e `copyable` por uma razão de build:
 * essas duas props do Antd Typography referenciam tipos internos
 * (`EditConfig`, `CopyConfig`) que não são exportados publicamente, fazendo
 * o `tsup --dts` falhar ao gerar `dist/index.d.ts` (erro TS4023). O runtime
 * continua aceitando essas props via spread; só não ficam advertidas na
 * superfície pública da API. O Figma também não documenta nenhuma das duas.
 */
export type HeadingProps = Omit<TitleProps, "level" | "editable" | "copyable">;

export type BodyProps = Omit<ParagraphProps, "editable" | "copyable">;

export type CaptionProps = Omit<TextProps, "editable" | "copyable">;
