import React from "react";
import { ChevronDown } from "lucide-react";
import type {
  NavigationMenuContentItem,
  NavigationMenuItem,
  NavigationMenuProps,
} from "../../types/components/NavigationMenu";
import "./index.module.css";

const ROOT_CLASS = "ds-navigation-menu";
const TRIGGER_CLASS = "ds-navigation-menu__trigger";
const TRIGGER_OPEN_CLASS = "ds-navigation-menu__trigger--open";
const CHEVRON_ICON_SIZE = 16;
const DEFAULT_ARIA_LABEL = "Navegação principal";
const ESCAPE_KEY = "Escape";

/**
 * Junta classes filtrando valores falsy.
 */
function composeClassName(...tokens: Array<string | false | undefined>): string {
  return tokens.filter(Boolean).join(" ");
}

/**
 * Renderiza um único item de conteúdo dentro do painel. Usa `<a>` quando há
 * `href`; caso contrário, `<button type="button">`. Em ambos os casos o
 * elemento recebe `role="menuitem"` para satisfazer o `role="menu"` do painel.
 */
function ContentItem(props: { item: NavigationMenuContentItem; onSelect: () => void }): React.ReactElement {
  const { item, onSelect } = props;
  const handleClick = (): void => {
    item.onClick?.();
    onSelect();
  };

  const titleNode = <span className="ds-navigation-menu__content-item-title">{item.title}</span>;
  const descriptionNode = item.description ? (
    <span className="ds-navigation-menu__content-item-description">{item.description}</span>
  ) : null;

  if (item.href) {
    return (
      <a
        role="menuitem"
        className="ds-navigation-menu__content-item"
        href={item.href}
        onClick={handleClick}
      >
        {titleNode}
        {descriptionNode}
      </a>
    );
  }
  return (
    <button
      type="button"
      role="menuitem"
      className="ds-navigation-menu__content-item"
      onClick={handleClick}
    >
      {titleNode}
      {descriptionNode}
    </button>
  );
}

/**
 * Painel exibido abaixo do trigger ativo. Posicionamento absoluto controlado
 * pelo CSS Module. Recebe `role="menu"` para semântica ARIA.
 */
function Panel(props: { items: NavigationMenuContentItem[]; onSelect: () => void; panelId: string }): React.ReactElement {
  const { items, onSelect, panelId } = props;
  return (
    <div className="ds-navigation-menu__panel" id={panelId}>
      <div role="menu" className="ds-navigation-menu__content">
        {items.map((item) => (
          <ContentItem key={item.key} item={item} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

/**
 * Componente individual de trigger + painel associado.
 */
function MenuEntry(props: {
  item: NavigationMenuItem;
  isOpen: boolean;
  onToggle: (key: string) => void;
  onClose: () => void;
}): React.ReactElement {
  const { item, isOpen, onToggle, onClose } = props;
  const hasContent = Array.isArray(item.content) && item.content.length > 0;
  const panelId = `${ROOT_CLASS}__panel-${item.key}`;

  const handleClick = (): void => {
    if (!hasContent) return;
    onToggle(item.key);
  };

  return (
    <li className="ds-navigation-menu__item">
      <button
        type="button"
        className={composeClassName(TRIGGER_CLASS, isOpen && TRIGGER_OPEN_CLASS)}
        aria-haspopup={hasContent ? "menu" : undefined}
        aria-expanded={hasContent ? isOpen : undefined}
        aria-controls={hasContent && isOpen ? panelId : undefined}
        onClick={handleClick}
      >
        <span>{item.label}</span>
        {hasContent ? (
          <span className="ds-navigation-menu__chevron" aria-hidden="true">
            <ChevronDown size={CHEVRON_ICON_SIZE} />
          </span>
        ) : null}
      </button>
      {hasContent && isOpen && item.content ? (
        <Panel items={item.content} onSelect={onClose} panelId={panelId} />
      ) : null}
    </li>
  );
}

/**
 * Componente `NavigationMenu`. Renderiza uma linha horizontal de triggers
 * — cada trigger pode opcionalmente abrir um painel rico abaixo de si com
 * itens navegáveis dispostos lado a lado. Conforme dump
 * `figma/components/navigation-menu/design-context-4080-15062.md`.
 *
 * Apenas um painel fica aberto por vez. Clicar fora do menu ou pressionar
 * `Escape` fecha o painel ativo.
 */
export function NavigationMenu(props: NavigationMenuProps): React.ReactElement {
  const { items, className, style, "aria-label": ariaLabel = DEFAULT_ARIA_LABEL } = props;
  const [openKey, setOpenKey] = React.useState<string | null>(null);
  const rootRef = React.useRef<HTMLElement | null>(null);

  const handleToggle = React.useCallback((key: string): void => {
    setOpenKey((current) => (current === key ? null : key));
  }, []);

  const handleClose = React.useCallback((): void => {
    setOpenKey(null);
  }, []);

  React.useEffect(() => {
    if (openKey === null) return undefined;
    const handlePointerDown = (event: MouseEvent): void => {
      const node = rootRef.current;
      if (node && event.target instanceof Node && !node.contains(event.target)) {
        setOpenKey(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === ESCAPE_KEY) setOpenKey(null);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openKey]);

  return (
    <nav
      ref={rootRef}
      role="navigation"
      aria-label={ariaLabel}
      className={composeClassName(ROOT_CLASS, className)}
      style={style}
    >
      <ul className="ds-navigation-menu__list">
        {items.map((item) => (
          <MenuEntry
            key={item.key}
            item={item}
            isOpen={openKey === item.key}
            onToggle={handleToggle}
            onClose={handleClose}
          />
        ))}
      </ul>
    </nav>
  );
}

NavigationMenu.displayName = "NavigationMenu";

export type {
  NavigationMenuItem,
  NavigationMenuContentItem,
  NavigationMenuProps,
} from "../../types/components/NavigationMenu";
