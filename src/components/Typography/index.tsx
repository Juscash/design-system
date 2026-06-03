import React from "react";
import { Typography as AntdTypography } from "antd";
import type { TitleProps } from "antd/es/typography/Title";
import type { TextProps } from "antd/es/typography/Text";
import type { ParagraphProps } from "antd/es/typography/Paragraph";
import { typography as typographyToken, designSystemColors } from "../../theme";
import type {
  AntdTypographyAllProps,
  BodyProps,
  CaptionProps,
  CustomTypographyProps,
  HeadingProps,
  NativeTypographyProps,
  TypographyComponentTag,
  TypographyVariant,
} from "../../types/components/Typography";

const { Title, Text, Paragraph } = AntdTypography;

// Tokens herdados da foundation (`Figma › Fundamentos › Tipografia 4002:5004`).
// O Figma documenta `Inter Regular 400, letter-spacing 0` para as 9 variantes;
// line-height é exposto em px absoluto (= size × 1.2) conforme o Inspect do
// Figma. Sem outros eixos (sem `color`, sem `weight`).
const FONT_FAMILY = typographyToken.fontFamily;
const FONT_WEIGHT = typographyToken.fontWeight;
const LETTER_SPACING = `${typographyToken.letterSpacing}px`;
// Cor de texto padrão = token `text.dark` do Figma (= `#262626`). É a cor
// que o Antd já aplicava por default antes da refatoração; mantida para
// não mudar a aparência. O Figma documenta `text-black (#000)` nos samples
// do frame Tipografia, mas instrução do usuário é ignorar essa diferença.
const COLOR_DEFAULT = designSystemColors.text.dark;

type VariantToken = { px: number; lineHeightPx: number };

const variantTokens: Record<TypographyVariant, VariantToken> = {
  heading1: { px: typographyToken.scale.heading1.px, lineHeightPx: typographyToken.scale.heading1.lineHeightPx },
  heading2: { px: typographyToken.scale.heading2.px, lineHeightPx: typographyToken.scale.heading2.lineHeightPx },
  heading3: { px: typographyToken.scale.heading3.px, lineHeightPx: typographyToken.scale.heading3.lineHeightPx },
  heading4: { px: typographyToken.scale.heading4.px, lineHeightPx: typographyToken.scale.heading4.lineHeightPx },
  heading5: { px: typographyToken.scale.heading5.px, lineHeightPx: typographyToken.scale.heading5.lineHeightPx },
  heading6: { px: typographyToken.scale.heading6.px, lineHeightPx: typographyToken.scale.heading6.lineHeightPx },
  body1: { px: typographyToken.scale.body1.px, lineHeightPx: typographyToken.scale.body1.lineHeightPx },
  body2: { px: typographyToken.scale.body2.px, lineHeightPx: typographyToken.scale.body2.lineHeightPx },
  caption: { px: typographyToken.scale.caption1.px, lineHeightPx: typographyToken.scale.caption1.lineHeightPx },
};

/**
 * Monta o style inline aplicado a TODA variante. `font-size` e `line-height`
 * variam por variante (em px absoluto); família/peso/letter-spacing são
 * iguais para todas. Aplicamos via inline style — sem depender de tokens do
 * Antd cujos defaults (ex.: `fontWeightStrong`, `lineHeightHeadingN`) podem
 * divergir do Figma.
 */
function buildVariantStyle(variant: TypographyVariant, base: React.CSSProperties): React.CSSProperties {
  const { px, lineHeightPx } = variantTokens[variant];
  return {
    fontFamily: FONT_FAMILY,
    fontWeight: FONT_WEIGHT,
    fontSize: `${px}px`,
    lineHeight: `${lineHeightPx}px`,
    letterSpacing: LETTER_SPACING,
    color: COLOR_DEFAULT,
    ...base,
  };
}

/**
 * Decide qual subcomponente do Antd Typography renderizar a partir da
 * `variant`. Aplica o style inline com os tokens da foundation, propaga
 * margin/cor zerados e o resto das props do Antd via spread.
 */
function renderTypography(
  variant: TypographyVariant,
  baseStyle: React.CSSProperties,
  rest: AntdTypographyAllProps,
): React.ReactElement {
  const style = buildVariantStyle(variant, baseStyle);
  switch (variant) {
    case "heading1":
      return <Title level={1} style={style} {...(rest as TitleProps)} />;
    case "heading2":
      return <Title level={2} style={style} {...(rest as TitleProps)} />;
    case "heading3":
      return <Title level={3} style={style} {...(rest as TitleProps)} />;
    case "heading4":
      return <Title level={4} style={style} {...(rest as TitleProps)} />;
    case "heading5":
      return <Title level={5} style={style} {...(rest as TitleProps)} />;
    // Antd Title aceita level 1–5. Heading6 cai em <h5> com font-size 20px
    // (token heading/06) preservando a hierarquia visual.
    case "heading6":
      return <Title level={5} style={style} {...(rest as TitleProps)} />;
    case "body1":
      return <Paragraph style={style} {...(rest as ParagraphProps)} />;
    case "body2":
      return <Paragraph style={style} {...(rest as ParagraphProps)} />;
    case "caption":
      return <Text style={style} {...(rest as TextProps)} />;
    default:
      return <Paragraph style={style} {...(rest as ParagraphProps)} />;
  }
}

/**
 * Predicado que identifica props HTML padrão repassáveis para tags nativas.
 * Aceita `children`, `className`, `id`, `style`, atributos `data-*` e `aria-*`,
 * e quaisquer handlers `on*` (ex.: `onClick`, `onMouseEnter`). Outras props
 * (ex.: `mark`, `code`, `strong` do Antd) são descartadas ao renderizar
 * via prop `component`.
 */
function isNativeProp(key: string): boolean {
  if (key === "children" || key === "className" || key === "id" || key === "style") return true;
  if (key.startsWith("data-") || key.startsWith("aria-")) return true;
  if (/^on[A-Z]/.test(key)) return true;
  return false;
}

/**
 * Filtra o bag de props do Antd mantendo apenas o que faz sentido em tags
 * HTML nativas. Sem `any` — usa `unknown` no record intermediário.
 */
function pickNativeProps(rest: AntdTypographyAllProps): NativeTypographyProps {
  const source = rest as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(source)) {
    if (isNativeProp(key)) out[key] = source[key];
  }
  return out as NativeTypographyProps;
}

/**
 * Renderiza a tag HTML nativa indicada por `component`, aplicando o mesmo
 * `style` gerado por `buildVariantStyle` e repassando apenas props HTML
 * padrão (filtradas por `pickNativeProps`). O Antd Typography não é
 * envolvido nesse caminho.
 */
function renderNativeElement(
  tag: TypographyComponentTag,
  variant: TypographyVariant,
  baseStyle: React.CSSProperties,
  rest: AntdTypographyAllProps,
): React.ReactElement {
  const style = buildVariantStyle(variant, baseStyle);
  const nativeProps = pickNativeProps(rest);
  return React.createElement(tag, { ...nativeProps, style });
}

/**
 * Componente raiz de tipografia. Aplica `variant` (`heading1..6`, `body1|2`,
 * `caption`) sobre o `Typography` do Antd usando os tokens do design system
 * (`Inter`, peso `400`, line-height `120%`). Sem prop de cor — o Figma não
 * documenta cor como eixo de Typography.
 *
 * Se `component` for informada, o componente bypassa o Antd Typography e
 * renderiza a tag HTML nativa (`p`, `span`, `h1`..`h6`) com o mesmo style
 * gerado por `buildVariantStyle`. Apenas props HTML padrão são repassadas;
 * props específicas do Antd (`mark`, `code`, `strong`, etc.) são ignoradas.
 */
export function Typography(props: CustomTypographyProps): React.ReactElement {
  const { variant = "body1", style, component, ...rest } = props;
  const baseStyle: React.CSSProperties = {
    margin: 0,
    ...style,
  };
  if (component !== undefined) {
    return renderNativeElement(component, variant, baseStyle, rest);
  }
  return renderTypography(variant, baseStyle, rest);
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

// Body1 e Body2 renderizam como `<p>` nativo por padrão. O `Paragraph` do
// Antd 6 internamente usa `<div>` (ver `node_modules/antd/lib/typography/Paragraph.js`),
// o que confunde semântica (parágrafo virando bloco). Default `component="p"`
// alinha o DOM com a expectativa do consumidor. Pode ser sobrescrito passando
// `component={"span" | "h1" | ...}` explicitamente.
export const Body1: React.FC<BodyProps> = ({ component = "p", ...props }) => (
  <Typography variant="body1" component={component} {...props} />
);
Body1.displayName = "Body1";

export const Body2: React.FC<BodyProps> = ({ component = "p", ...props }) => (
  <Typography variant="body2" component={component} {...props} />
);
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
  NativeTypographyProps,
  TypographyComponentTag,
  TypographyVariant,
} from "../../types/components/Typography";
