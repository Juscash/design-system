import type { HTMLAttributes } from "react";
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
 * Tags HTML aceitas pela prop `component`. Quando informada, o Typography
 * troca o entrypoint do Antd (`Title`/`Text`/`Paragraph`) por essa tag nativa,
 * preservando o `style` da `variant`.
 *
 * Inclui blocos (`p`, `blockquote`, `pre`), inline genéricos (`span`, `label`),
 * inline semânticos (`strong`, `b`, `em`, `i`, `small`, `mark`, `del`, `ins`,
 * `sub`, `sup`, `code`, `kbd`, `samp`, `abbr`, `cite`, `q`, `time`) e headings
 * (`h1`–`h6`).
 */
export type TypographyComponentTag =
  | "p"
  | "span"
  | "strong"
  | "b"
  | "em"
  | "i"
  | "small"
  | "mark"
  | "del"
  | "ins"
  | "sub"
  | "sup"
  | "code"
  | "pre"
  | "kbd"
  | "samp"
  | "abbr"
  | "cite"
  | "q"
  | "time"
  | "label"
  | "blockquote"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

/**
 * Props HTML repassáveis quando `component` é informado: `children`,
 * `className`, `id`, `style`, `data-*`, `aria-*` e handlers `on*`.
 * Mais permissiva que `HTMLAttributes<HTMLElement>` para aceitar
 * `data-*`/`aria-*` arbitrários como `unknown`.
 */
export type NativeTypographyProps = HTMLAttributes<HTMLElement> & {
  [dataAttr: `data-${string}`]: unknown;
  [ariaAttr: `aria-${string}`]: unknown;
};

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
  /**
   * Tag HTML a renderizar. Quando informada, o componente bypassa o Antd
   * Typography e renderiza um elemento nativo, aplicando o mesmo `style`
   * gerado por `buildVariantStyle` (margin: 0 + tokens da variante + style
   * do consumidor). Apenas props HTML padrão (`children`, `className`, `id`,
   * `data-*`, `aria-*`, eventos `on*`) são repassadas — props específicas
   * do Antd (`mark`, `code`, `strong`, etc.) são ignoradas nesse modo.
   */
  component?: TypographyComponentTag;
};

/*
 * Os aliases abaixo omitem `editable` e `copyable` por uma razão de build:
 * essas duas props do Antd Typography referenciam tipos internos
 * (`EditConfig`, `CopyConfig`) que não são exportados publicamente, fazendo
 * o `tsup --dts` falhar ao gerar `dist/index.d.ts` (erro TS4023). O runtime
 * continua aceitando essas props via spread; só não ficam advertidas na
 * superfície pública da API. O Figma também não documenta nenhuma das duas.
 *
 * Os três aceitam `component?: TypographyComponentTag` para reproduzir a
 * mesma capacidade do `Typography` raiz: trocar a tag HTML renderizada
 * mantendo o style da variante (ex.: `<Body1 component="p">`).
 */
export type HeadingProps = Omit<TitleProps, "level" | "editable" | "copyable"> & {
  component?: TypographyComponentTag;
};

export type BodyProps = Omit<ParagraphProps, "editable" | "copyable"> & {
  component?: TypographyComponentTag;
};

export type CaptionProps = Omit<TextProps, "editable" | "copyable"> & {
  component?: TypographyComponentTag;
};
