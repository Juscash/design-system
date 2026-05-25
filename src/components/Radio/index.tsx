import React from "react";
import { ConfigProvider, Radio as AntdRadio } from "antd";
import type { ComponentToken } from "antd/es/radio/style";
import { designSystemColors, spacing, radius } from "../../theme";
import type { RadioProps } from "../../types/components/Radio";
import "./index.module.css";

const BASE_CLASS = "ds-radio";
const ERROR_CLASS = "ds-radio-error";
const TRUNCATE_CLASS = "ds-radio--truncate";
const RICH_CLASS = "ds-radio--rich";
const RICH_CONTENT_CLASS = "ds-radio-rich__content";
const RICH_LABEL_CLASS = "ds-radio-rich__label";
const RICH_SECONDARY_CLASS = "ds-radio-rich__secondary";
const GROUP_CLASS = "ds-radio-group";

const RADIO_SIZE = 16;
const DOT_SIZE = 8;
const FOCUS_OUTLINE_WIDTH = 3;

/**
 * Tokens base do Radio (variante sem erro). Inclui os campos `button*` por
 * herança (caso o consumidor use `Radio.Button`, embora o padrão JusCash
 * seja usar `Segmented` nesse caso).
 */
const baseTokens: ComponentToken = {
  radioSize: RADIO_SIZE,
  dotSize: DOT_SIZE,
  dotColorDisabled: designSystemColors.neutral[300],
  wrapperMarginInlineEnd: spacing[2],
  buttonBg: designSystemColors.neutral[50],
  buttonCheckedBg: designSystemColors.neutral[50],
  buttonColor: designSystemColors.neutral[800],
  buttonPaddingInline: spacing[4],
  buttonCheckedBgDisabled: designSystemColors.neutral[300],
  buttonCheckedColorDisabled: designSystemColors.neutral[400],
  buttonSolidCheckedColor: designSystemColors.neutral[50],
  buttonSolidCheckedBg: designSystemColors.brand.primary[600],
  buttonSolidCheckedHoverBg: designSystemColors.brand.primary[600],
  buttonSolidCheckedActiveBg: designSystemColors.brand.primary[600],
};

/**
 * Tokens da variante `error`. Substitui as cores primary/solid pelo vermelho
 * `feedback.red.500`. Mantém o hover/active sem mudança visual.
 */
const errorTokens: ComponentToken = {
  ...baseTokens,
  buttonSolidCheckedBg: designSystemColors.feedback.red[500],
  buttonSolidCheckedHoverBg: designSystemColors.feedback.red[500],
  buttonSolidCheckedActiveBg: designSystemColors.feedback.red[500],
};

/**
 * Retorna os overrides de token global aplicáveis dentro do `ConfigProvider`
 * do Radio. Inclui `colorPrimary` (cor do dot/borda) e `controlOutline*` para
 * o anel de foco. Hover/active recebem a mesma cor de `colorPrimary` para que
 * o visual não mude no hover (Figma mantém igual).
 */
function getTokenOverrides(error: boolean) {
  if (error) {
    return {
      borderRadiusSM: radius.md,
      colorBorder: designSystemColors.feedback.red[500],
      colorPrimary: designSystemColors.feedback.red[500],
      colorPrimaryHover: designSystemColors.feedback.red[500],
      colorPrimaryActive: designSystemColors.feedback.red[500],
      controlOutlineWidth: FOCUS_OUTLINE_WIDTH,
      controlOutlineColor: designSystemColors.feedback.red[50],
    };
  }
  return {
    borderRadiusSM: radius.md,
    colorBorder: designSystemColors.border.regular,
    colorPrimary: designSystemColors.brand.primary[600],
    colorPrimaryHover: designSystemColors.brand.primary[600],
    colorPrimaryActive: designSystemColors.brand.primary[600],
    controlOutlineWidth: FOCUS_OUTLINE_WIDTH,
    controlOutlineColor: designSystemColors.neutral[300],
  };
}

/**
 * Compõe a className aplicada ao `<label class="ant-radio-wrapper">`:
 * `.ds-radio` sempre presente, `.ds-radio-error` em erro, `.ds-radio--truncate`
 * em label truncado, mais o className externo.
 */
function buildClassName(external: string | undefined, error: boolean, truncate: boolean, rich: boolean): string {
  return [BASE_CLASS, error ? ERROR_CLASS : "", truncate ? TRUNCATE_CLASS : "", rich ? RICH_CLASS : "", external ?? ""]
    .filter(Boolean)
    .join(" ");
}

/**
 * Compõe o conteúdo (children) do radio quando `rich=true`.
 */
function buildRichContent(label: React.ReactNode, secondaryText: string | undefined): React.ReactNode {
  return (
    <span className={RICH_CONTENT_CLASS}>
      <span className={RICH_LABEL_CLASS}>{label}</span>
      {secondaryText ?
        <span className={RICH_SECONDARY_CLASS}>{secondaryText}</span>
      : null}
    </span>
  );
}

/**
 * Radio do design system. Props proprietárias:
 *
 * - `error` — paleta vermelha (`feedback.red.500`) para validação inválida.
 * - `truncate` — wrapper ocupa 100% do container pai; label trunca com `...`
 *   dinamicamente quando excede o espaço disponível.
 * - `rich` — card 240×44 com `label` + `secondaryText` opcional. Combine com
 *   `truncate` para encurtar texto longo dentro do card.
 */
function RadioInner(props: RadioProps): React.ReactElement {
  const { error, truncate, rich, label, secondaryText, className, style, children, ...rest } = props;
  const finalClassName = buildClassName(className, Boolean(error), Boolean(truncate), Boolean(rich));
  const renderedChildren = rich ? buildRichContent(label ?? children, secondaryText) : children;

  return (
    <ConfigProvider
      theme={{
        components: { Radio: error ? errorTokens : baseTokens },
        token: getTokenOverrides(Boolean(error)),
      }}
    >
      <AntdRadio {...rest} className={finalClassName} style={style}>
        {renderedChildren}
      </AntdRadio>
    </ConfigProvider>
  );
}

RadioInner.displayName = "Radio";

/**
 * Wrapper do `Radio.Group` do Antd. Aplica a classe `.ds-radio-group` ao
 * container e envolve em `ConfigProvider` com os tokens do design system,
 * para que os itens internos renderizados pelo Antd via `options=[...]`
 * recebam a mesma identidade visual dos itens criados via `<Radio>` filhos.
 */
const RadioGroupInner = ((props) => {
  const { className, ...rest } = props as { className?: string } & Record<string, unknown>;
  const finalClassName = [GROUP_CLASS, typeof className === "string" ? className : ""].filter(Boolean).join(" ");
  return (
    <ConfigProvider theme={{ components: { Radio: baseTokens } }}>
      {React.createElement(AntdRadio.Group, { ...rest, className: finalClassName })}
    </ConfigProvider>
  );
}) as typeof AntdRadio.Group;

type RadioComponent = typeof RadioInner & {
  Group: typeof AntdRadio.Group;
  Button: typeof AntdRadio.Button;
};

const RadioWithSubs = RadioInner as RadioComponent;
RadioWithSubs.Group = RadioGroupInner;
RadioWithSubs.Button = AntdRadio.Button;

export const Radio = RadioWithSubs;
export const RadioGroup = RadioGroupInner;
export const RadioButton = AntdRadio.Button;

export type { RadioProps } from "../../types/components/Radio";
