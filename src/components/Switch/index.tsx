import React from "react";
import { ConfigProvider, Switch as AntdSwitch } from "antd";
import type { ComponentToken } from "antd/es/switch/style";
import { designSystemColors, shadow, spacing } from "../../theme";
import type { SwitchProps } from "../../types/components/Switch";
import "./index.module.css";

const BASE_CLASS = "ds-switch";
const ERROR_CLASS = "ds-switch-error";
const FIELD_WRAPPER_CLASS = "ds-switch-field";
const FIELD_LABEL_CLASS = "ds-switch-field__label";
const RICH_WRAPPER_CLASS = "ds-switch-rich";
const RICH_WRAPPER_DISABLED_CLASS = "ds-switch-rich--disabled";
const RICH_WRAPPER_TRUNCATE_CLASS = "ds-switch-rich--truncate";
const RICH_CONTENT_CLASS = "ds-switch-rich__content";
const RICH_LABEL_CLASS = "ds-switch-rich__label";
const RICH_SECONDARY_CLASS = "ds-switch-rich__secondary";

const TRACK_HEIGHT = 18;
const TRACK_HEIGHT_SM = 14;
const TRACK_MIN_WIDTH = 33;
const TRACK_MIN_WIDTH_SM = 26;
const TRACK_PADDING = 2;
const HANDLE_SIZE = 14;
const HANDLE_SIZE_SM = 10;

/**
 * Tokens do Switch alinhados ao Figma (track 33×18, handle 14, padding 2).
 */
const switchTokens: Partial<ComponentToken> = {
  trackHeight: TRACK_HEIGHT,
  trackHeightSM: TRACK_HEIGHT_SM,
  trackMinWidth: TRACK_MIN_WIDTH,
  trackMinWidthSM: TRACK_MIN_WIDTH_SM,
  trackPadding: TRACK_PADDING,
  handleSize: HANDLE_SIZE,
  handleSizeSM: HANDLE_SIZE_SM,
  handleBg: designSystemColors.neutral[50],
  handleShadow: shadow.xs,
  innerMinMargin: spacing[2],
  innerMaxMargin: spacing[3],
  innerMinMarginSM: spacing[1],
  innerMaxMarginSM: spacing[2],
};

/**
 * Tokens globais (cores) aplicados via `theme.token`. Hover/active escurecem
 * a cor do track quando o switch está ligado — mesmo padrão do Button,
 * Checkbox e Radio (default → `brand.primary[800]`, error → `red.900`).
 */
function getTokenOverrides(error: boolean) {
  if (error) {
    return {
      colorPrimary: designSystemColors.feedback.red[500],
      colorPrimaryHover: designSystemColors.feedback.red[900],
      colorPrimaryActive: designSystemColors.feedback.red[900],
    };
  }
  return {
    colorPrimary: designSystemColors.brand.primary[600],
    colorPrimaryHover: designSystemColors.brand.primary[800],
    colorPrimaryActive: designSystemColors.brand.primary[800],
  };
}

/**
 * Compõe a className final do switch: `.ds-switch` sempre presente,
 * `.ds-switch-error` em erro, mais o className externo.
 */
function buildClassName(external: string | undefined, error: boolean): string {
  return [BASE_CLASS, error ? ERROR_CLASS : "", external ?? ""].filter(Boolean).join(" ");
}

/**
 * Forwarda o click do wrapper para o `<button class="ant-switch">` interno.
 * Ignora cliques que já caem no botão (evita duplo toggle). Usado tanto pelo
 * wrapper rich quanto pelo wrapper de field (sem rich).
 *
 * Importante: o wrapper é um `<div>` (não `<label>`) porque o `<label>`
 * dispara "click forwarding" nativo para form-controls descendentes — com
 * um `<button>` dentro, isso causa duplo toggle (browser dispara o click
 * uma vez no botão direto e outra via label, cancelando o efeito).
 *
 * Após o toggle, força foco no button para que teclas subsequentes (`Enter`,
 * `Space`) continuem operando no switch — sem este `focus()`, o foco fica
 * no `<body>` e o usuário precisa clicar diretamente no botão pra interagir
 * por teclado.
 */
function handleWrapperClick(event: React.MouseEvent<HTMLDivElement>): void {
  const target = event.target as HTMLElement;
  if (target.closest(".ant-switch")) return;
  const button = event.currentTarget.querySelector<HTMLButtonElement>(".ant-switch");
  if (!button || button.disabled) return;
  button.click();
  button.focus();
}

/**
 * Switch do design system. Toggle on/off binário. Props proprietárias:
 *
 * - `error` — paleta vermelha (`feedback.red.500`) para validação inválida.
 * - `label` — texto exibido **ao lado** do switch. Sem `rich`, gera um
 *   wrapper `<label>` simples com o switch + texto na mesma linha. Com
 *   `rich`, vira o título do card (acompanhado de `secondaryText` opcional).
 * - `rich` — quando `true`, envelopa o switch em um card 240×44 com
 *   `label` principal + `secondaryText` opcional (Figma `rich switch group`).
 *
 * Demais props seguem a API do Antd (exceto `loading`, removida — ver tipo).
 */
export function Switch(props: SwitchProps): React.ReactElement {
  const { error, rich, label, secondaryText, truncate, className, disabled, ...rest } = props;
  const finalClassName = buildClassName(className, Boolean(error));

  // `wave={{ disabled: true }}` suprime o ripple/onda que o antd v6 emite ao
  // clicar no switch (monta um `<div class="ant-wave">` no body com keyframe
  // de `box-shadow` animado). O design system não usa esse feedback visual —
  // mantemos apenas o anel de `:focus-visible`.
  const antdSwitch = (
    <ConfigProvider
      theme={{
        components: { Switch: switchTokens },
        token: getTokenOverrides(Boolean(error)),
      }}
      wave={{ disabled: true }}
    >
      <AntdSwitch {...rest} disabled={disabled} className={finalClassName} />
    </ConfigProvider>
  );

  if (rich) {
    const wrapperClassName = [
      RICH_WRAPPER_CLASS,
      disabled ? RICH_WRAPPER_DISABLED_CLASS : "",
      truncate ? RICH_WRAPPER_TRUNCATE_CLASS : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={wrapperClassName} onClick={handleWrapperClick} role="presentation">
        {antdSwitch}
        <span className={RICH_CONTENT_CLASS}>
          {label !== undefined ? <span className={RICH_LABEL_CLASS}>{label}</span> : null}
          {secondaryText !== undefined ? <span className={RICH_SECONDARY_CLASS}>{secondaryText}</span> : null}
        </span>
      </div>
    );
  }

  // Sem rich, mas com `label` — wrapper inline com switch + texto na mesma
  // linha. A estilização do span do label vive na DS (não no consumidor).
  // Usamos `<div>` (não `<label>`) — ver explicação em `handleWrapperClick`.
  if (label !== undefined) {
    return (
      <div className={FIELD_WRAPPER_CLASS} onClick={handleWrapperClick} role="presentation">
        {antdSwitch}
        <span className={FIELD_LABEL_CLASS}>{label}</span>
      </div>
    );
  }

  return antdSwitch;
}

Switch.displayName = "Switch";

export type { SwitchProps } from "../../types/components/Switch";
