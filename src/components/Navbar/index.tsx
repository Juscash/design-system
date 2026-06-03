import React from "react";
import type { NavbarProps } from "../../types/components/Navbar";
import "./index.module.css";

const ROOT_CLASS = "ds-navbar";
const DEFAULT_ARIA_LABEL = "Barra de navegação";

/** Junta a classe base do navbar com a classe extra do consumidor. */
function buildRootClassName(className: string | undefined): string {
  return [ROOT_CLASS, className].filter(Boolean).join(" ");
}

/**
 * Navbar do design system (Figma `4146:12875`). Shell de layout TOTALMENTE
 * composável: a barra é a única coisa fixa — `<header role="banner">` com fundo
 * `neutral/50`, borda inferior `border/regular` e padding `16` (que cai para `8`
 * na horizontal no mobile < 1024px). Todo o conteúdo é livre, via os slots
 * `left`, `center` e `right`.
 *
 * O layout é um grid de 3 colunas (`1fr auto 1fr`): `left` à esquerda, `center`
 * no centro exato da barra e `right` à direita. Sem `center`, comporta-se como
 * uma barra `justify-between`. Cada slot é, por dentro, `flex gap-8 items-center`.
 *
 * Os itens do Figma (botão de menu, logo, pill "SIJ", "Enviar processo",
 * notificação, avatar) são apenas EXEMPLOS — nenhum é fixo no componente.
 * Componha com os primitivos do DS:
 *
 * ```tsx
 * <Navbar
 *   left={
 *     <>
 *       <Button type="ghost" size="s" icon={<PanelRight size={16} />} aria-label="Menu" tooltip="Menu" />
 *       <img src="/logo.svg" alt="JusCash" height={18.653} />
 *     </>
 *   }
 *   right={
 *     <>
 *       <Button type="primary" size="s" icon={<Send size={12} />}>Enviar processo</Button>
 *       <Button type="ghost" size="s" icon={<Bell size={16} />} aria-label="Notificações" tooltip="Notificações" />
 *       <AvatarMenu>CN</AvatarMenu>
 *     </>
 *   }
 * />
 * ```
 */
export function Navbar(props: NavbarProps): React.ReactElement {
  const { left, center, right, className, "aria-label": ariaLabel = DEFAULT_ARIA_LABEL, ...rest } = props;

  return (
    <header {...rest} role="banner" aria-label={ariaLabel} className={buildRootClassName(className)}>
      <div className="ds-navbar__left">{left}</div>
      <div className="ds-navbar__center">{center}</div>
      <div className="ds-navbar__right">{right}</div>
    </header>
  );
}

Navbar.displayName = "Navbar";

export type { NavbarProps } from "../../types/components/Navbar";
