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
  // Hover do checkbox marcado escurece para `brand.primary[800]` (#005C12)
  // — mesmo padrão usado no Button (600 → 800). Sem este escurecimento, o
  // hover ficava idêntico ao default, sem feedback visual.
  colorPrimaryHover: designSystemColors.brand.primary[800],
  colorPrimaryBorder: designSystemColors.brand.primary[600],
  colorPrimaryBorderHover: designSystemColors.brand.primary[800],
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
      {secondaryText ?
        <span className={RICH_SECONDARY_CLASS}>{secondaryText}</span>
      : null}
    </span>
  );
}

/**
 * Handler de teclado que aceita `Enter` como segunda tecla de seleção do
 * checkbox (além do `Space` nativo do input). Antd Checkbox / DOM nativo
 * só togglam com `Space` por default — o usuário pediu `Enter` também.
 *
 * O `onKeyDown` passado ao `<Checkbox>` do Antd é forwardado para o
 * `<input class="ant-checkbox-input">` interno (via `restProps` spread em
 * `@rc-component/checkbox`). Logo, `event.currentTarget` é o próprio input.
 * Chamamos `input.click()` programático, o que dispara `onChange` normalmente.
 */
function handleEnterToToggle(event: React.KeyboardEvent<HTMLInputElement>): void {
  if (event.key !== "Enter") return;
  if (event.defaultPrevented) return;
  const input = event.currentTarget;
  if (input.disabled) return;
  event.preventDefault();
  input.click();
}

/**
 * Checkbox do design system. Props proprietárias:
 *
 * - `error` — paleta vermelha (`feedback.red.500`) para validação inválida.
 * - `truncate` — wrapper ocupa 100% do container pai; label trunca com `...`
 *   dinamicamente quando excede o espaço disponível.
 * - `rich` — card 240×44 com `label` + `secondaryText` opcional. Combine com
 *   `truncate` para encurtar texto longo dentro do card.
 *
 * `Checkbox.Group` é exposto como sub-componente — wrapper que aplica
 * `.ds-checkbox-group` ao container e o `ConfigProvider` com os tokens.
 */
function CheckboxInner({
  error,
  truncate,
  rich,
  label,
  secondaryText,
  className,
  style,
  children,
  onKeyDown,
  ...props
}: CheckboxProps): React.ReactElement {
  const finalClassName = buildClassName(className, Boolean(error), Boolean(truncate), Boolean(rich));
  const renderedChildren = rich ? buildRichContent(label ?? children, secondaryText) : children;

  // Compõe o handler de teclado: aplica o toggle por `Enter` e em seguida
  // delega para o `onKeyDown` do consumidor (se existir). O `onKeyDown` que
  // o Antd repassa para `restProps` cai no `<input>` interno.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    handleEnterToToggle(event);
    (onKeyDown as ((e: React.KeyboardEvent<HTMLInputElement>) => void) | undefined)?.(event);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: error ? errorTokens : checkboxTokens,
        },
      }}
    >
      <AntdCheckbox {...props} className={finalClassName} style={style} onKeyDown={handleKeyDown}>
        {renderedChildren}
      </AntdCheckbox>
    </ConfigProvider>
  );
}

CheckboxInner.displayName = "Checkbox";

/**
 * Handler de teclado delegado para o wrapper do `Checkbox.Group`. Quando o
 * usuário pressiona `Enter` em qualquer `.ant-checkbox-input` interno do
 * grupo, dispara um `click()` programático no input — o que aciona o
 * `onChange` do antd e propaga pro estado do grupo.
 *
 * Necessário porque o Antd 6 renderiza os itens do grupo via `options=[...]`
 * usando seu `Checkbox` raw (não o nosso `CheckboxInner`), bypassando o
 * `handleEnterToToggle` que adicionamos no wrapper standalone.
 */
function handleGroupEnterToToggle(event: React.KeyboardEvent<HTMLDivElement>): void {
  if (event.key !== "Enter") return;
  if (event.defaultPrevented) return;
  const target = event.target as HTMLElement;
  if (!target.classList.contains("ant-checkbox-input")) return;
  const input = target as HTMLInputElement;
  if (input.disabled) return;
  event.preventDefault();
  input.click();
}

/**
 * Wrapper do `Checkbox.Group` do Antd. Aplica a classe `.ds-checkbox-group`
 * ao container e envolve em `ConfigProvider` com os tokens do design system,
 * de modo que **os itens internos renderizados pelo Antd via `options=[...]`**
 * recebam a mesma identidade visual dos itens criados via `<Checkbox>` filhos.
 *
 * Sem este wrapper, `<Checkbox.Group options={...}>` gerava itens sem a
 * classe `.ds-checkbox` — os overrides de hover/focus/indeterminate/disabled
 * (scoped via `:global(.ds-checkbox …)` no `index.module.css`) não aplicavam.
 *
 * Adiciona `onKeyDown` delegado para suportar `Enter` como alternativa ao
 * `Space` nativo, mantendo o comportamento consistente com o `Checkbox`
 * standalone — mesmo nos itens gerados via `options=[...]`.
 */
const CheckboxGroupInner = ((props) => {
  const { className, onKeyDown: consumerKeyDown, ...rest } = props as {
    className?: string;
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  } & Record<string, unknown>;
  const finalClassName = [GROUP_CLASS, typeof className === "string" ? className : ""].filter(Boolean).join(" ");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    handleGroupEnterToToggle(event);
    consumerKeyDown?.(event);
  };
  const groupProps = { ...rest, className: finalClassName, onKeyDown: handleKeyDown } as Record<string, unknown>;
  return (
    <ConfigProvider theme={{ components: { Checkbox: checkboxTokens } }}>
      {React.createElement(AntdCheckbox.Group, groupProps)}
    </ConfigProvider>
  );
}) as typeof AntdCheckbox.Group;

const CheckboxWithGroup = CheckboxInner as CheckboxComponent;
CheckboxWithGroup.Group = CheckboxGroupInner;

export const Checkbox = CheckboxWithGroup;
export const CheckboxGroup = CheckboxGroupInner;

export type { CheckboxProps } from "../../types/components/Checkbox";
