import React from "react";
import { Checkbox as AntdCheckbox, ConfigProvider } from "antd";
import type { ComponentToken } from "antd/es/checkbox/style";
import { designSystemColors, spacing, radius } from "../../theme";
import type { CheckboxComponent, CheckboxProps } from "../../types/components/Checkbox";
import "./index.module.css";

const BASE_CLASS = "ds-checkbox";
const ERROR_CLASS = "ds-checkbox-error";
const TRUNCATE_CLASS = "ds-checkbox--truncate";
const RICH_CLASS = "ds-checkbox--rich";
const RICH_CONTENT_CLASS = "ds-checkbox-rich__content";
const RICH_LABEL_CLASS = "ds-checkbox-rich__label";
const RICH_SECONDARY_CLASS = "ds-checkbox-rich__secondary";
const GROUP_CLASS = "ds-checkbox-group";

const CHECKBOX_BOX_SIZE = 16;
const TRUNCATE_DEFAULT_WIDTH = 240;

/**
 * Tokens da paleta padrão do Checkbox. Aplica a brand primary no estado
 * marcado, neutral 50 no fundo da caixa e o border regular em default.
 *
 * - `colorPrimary` / `colorPrimaryBorder` — cor da caixa marcada.
 * - `colorPrimaryHover` / `colorPrimaryBorderHover` — Antd troca a cor da caixa
 *   no `:hover`. Mantemos a mesma `brand.primary.600` (Figma não exige mudança
 *   visual no hover). **Usar `transparent` aqui zera o BG verde no hover,
 *   fazendo o checkbox parecer "desmarcado".**
 * - `colorBorderDisabled` — `border.disabled` (neutral 200), conforme Figma
 *   (Antd default usa neutral 300, daí o override).
 */
const checkboxTokens: Partial<ComponentToken> = {
  colorPrimary: designSystemColors.brand.primary[600],
  colorPrimaryHover: designSystemColors.brand.primary[600],
  colorPrimaryBorder: designSystemColors.brand.primary[600],
  colorPrimaryBorderHover: designSystemColors.brand.primary[600],
  colorBgContainer: designSystemColors.neutral[50],
  colorText: designSystemColors.neutral[800],
  colorTextDisabled: designSystemColors.neutral[400],
  colorBorder: designSystemColors.border.regular,
  colorBorderDisabled: designSystemColors.border.disabled,
  controlInteractiveSize: CHECKBOX_BOX_SIZE,
  borderRadiusSM: radius.md,
  paddingXS: spacing[2],
};

/**
 * Tokens da variante `error`. Mantém a paleta padrão para tudo exceto
 * cores brand → vermelho `feedback.red.500` (default) e `.900` (hover).
 */
const errorTokens: Partial<ComponentToken> = {
  ...checkboxTokens,
  colorPrimary: designSystemColors.feedback.red[500],
  colorPrimaryHover: designSystemColors.feedback.red[900],
  colorPrimaryBorder: designSystemColors.feedback.red[500],
  colorPrimaryBorderHover: designSystemColors.feedback.red[900],
  colorBorder: designSystemColors.feedback.red[500],
};

/**
 * Compõe a className aplicada ao wrapper Antd (`<label class="ant-checkbox-wrapper">`):
 * `.ds-checkbox` sempre presente, `.ds-checkbox-error` quando `error=true`,
 * `.ds-checkbox--truncate` quando `truncate=true`, mais o className externo se houver.
 */
function buildClassName(external: string | undefined, error: boolean, truncate: boolean, rich: boolean): string {
  return [BASE_CLASS, error ? ERROR_CLASS : "", truncate ? TRUNCATE_CLASS : "", rich ? RICH_CLASS : "", external ?? ""]
    .filter(Boolean)
    .join(" ");
}

/**
 * Compõe o conteúdo (children) do checkbox quando `rich=true`. Combina
 * `label` (ou children) com `secondaryText` em uma estrutura empilhada.
 */
function buildRichContent(label: React.ReactNode, secondaryText: string | undefined): React.ReactNode {
  return (
    <span className={RICH_CONTENT_CLASS}>
      <span className={RICH_LABEL_CLASS}>{label}</span>
      {secondaryText ? <span className={RICH_SECONDARY_CLASS}>{secondaryText}</span> : null}
    </span>
  );
}

/**
 * Resolve a largura máxima efetiva. Quando `width` é informado, usa o valor;
 * se for um número, vira pixels. Quando `width` é `undefined` e `truncate=true`,
 * aplica o default `TRUNCATE_DEFAULT_WIDTH` (240px). Caso contrário retorna
 * `undefined` (sem `max-width` aplicado).
 */
function resolveMaxWidth(width: number | string | undefined, truncate: boolean): string | undefined {
  const effective = width ?? (truncate ? TRUNCATE_DEFAULT_WIDTH : undefined);
  if (effective === undefined) return undefined;
  return typeof effective === "number" ? `${effective}px` : effective;
}

/**
 * Mescla o `style` externo com o `maxWidth` calculado a partir de `width` +
 * `truncate`. Não cria um objeto novo se nada precisar ser injetado.
 */
function buildStyle(external: React.CSSProperties | undefined, maxWidth: string | undefined): React.CSSProperties | undefined {
  if (maxWidth === undefined) return external;
  return { ...external, maxWidth };
}

/**
 * Checkbox do design system. Props proprietárias:
 *
 * - `error` — paleta vermelha (`feedback.red.500`) para validação inválida.
 * - `truncate` — label com `...` quando texto excede a largura disponível.
 * - `width` — largura máxima do wrapper. Number = pixels, string = qualquer valor CSS.
 *   Quando `truncate=true` e `width` é `undefined`, usa 240px como default.
 *
 * `Checkbox.Group` é exposto como sub-componente — wrapper que aplica
 * `.ds-checkbox-group` ao container e o `ConfigProvider` com os tokens.
 */
function CheckboxInner({
  error,
  truncate,
  width,
  rich,
  label,
  secondaryText,
  className,
  style,
  children,
  ...props
}: CheckboxProps): React.ReactElement {
  const finalClassName = buildClassName(className, Boolean(error), Boolean(truncate), Boolean(rich));
  // No modo rich, o card já ocupa 100% do container pai — `width`/`truncate`
  // não aplicam `max-width` inline (que sobrescreveria os 100%). O truncate
  // do label dentro do card vem das classes CSS `.ds-checkbox--truncate`.
  const maxWidth = rich ? undefined : resolveMaxWidth(width, Boolean(truncate));
  const finalStyle = buildStyle(style, maxWidth);
  const renderedChildren = rich ? buildRichContent(label ?? children, secondaryText) : children;

  return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: error ? errorTokens : checkboxTokens,
        },
      }}
    >
      <AntdCheckbox {...props} className={finalClassName} style={finalStyle}>
        {renderedChildren}
      </AntdCheckbox>
    </ConfigProvider>
  );
}

CheckboxInner.displayName = "Checkbox";

/**
 * Wrapper do `Checkbox.Group` do Antd. Aplica a classe `.ds-checkbox-group`
 * ao container e envolve em `ConfigProvider` com os tokens do design system,
 * de modo que **os itens internos renderizados pelo Antd via `options=[...]`**
 * recebam a mesma identidade visual dos itens criados via `<Checkbox>` filhos.
 *
 * Sem este wrapper, `<Checkbox.Group options={...}>` gerava itens sem a
 * classe `.ds-checkbox` — os overrides de hover/focus/indeterminate/disabled
 * (scoped via `:global(.ds-checkbox …)` no `index.module.css`) não aplicavam.
 */
const CheckboxGroupInner = ((props) => {
  const { className, ...rest } = props as { className?: string } & Record<string, unknown>;
  const finalClassName = [GROUP_CLASS, typeof className === "string" ? className : ""].filter(Boolean).join(" ");
  return (
    <ConfigProvider theme={{ components: { Checkbox: checkboxTokens } }}>
      {React.createElement(AntdCheckbox.Group, { ...rest, className: finalClassName })}
    </ConfigProvider>
  );
}) as typeof AntdCheckbox.Group;

const CheckboxWithGroup = CheckboxInner as CheckboxComponent;
CheckboxWithGroup.Group = CheckboxGroupInner;

export const Checkbox = CheckboxWithGroup;
export const CheckboxGroup = CheckboxGroupInner;

export type { CheckboxProps } from "../../types/components/Checkbox";
