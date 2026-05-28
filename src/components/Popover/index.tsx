import React from "react";
import type { ReactNode } from "react";
import { Popover as AntdPopover, ConfigProvider } from "antd";
import { designSystemColors, radius, shadow } from "../../theme";
import type { PopoverProps, PopoverSlotNo } from "../../types/components/Popover";
import "./index.module.css";

const POPOVER_WIDTH = 280;
const POPOVER_BORDER_WIDTH = 1;
const ESCAPE_KEY = "Escape";
const DEFAULT_DIALOG_LABEL = "Popover";

type ResolvableValue<T> = T | ((info: { props: PopoverProps }) => T) | undefined;

/** Tokens do Popover repassados ao ConfigProvider local. */
function getPopoverTokens(): Record<string, unknown> {
  return {
    colorBgElevated: designSystemColors.neutral[50],
    colorBorder: designSystemColors.border.regular,
    borderRadiusLG: radius.xl,
    boxShadowSecondary: shadow.l,
  };
}

/**
 * Resolve um valor semântico do Antd (objeto ou função `(info) => objeto`)
 * para a forma de objeto, mantendo a interface contratada pelo Antd.
 */
function resolveSemantic<T extends object>(value: ResolvableValue<T>, props: PopoverProps): T | undefined {
  if (typeof value === "function") return value({ props });
  return value;
}

/**
 * Placeholder roxo exibido quando um slot não recebe conteúdo. É um indicador
 * de desenvolvimento (não aparece em produção); por isso o wrapper recebe
 * `role="presentation"` e o texto `aria-hidden`, evitando que tecnologias
 * assistivas anunciem o rótulo de baixo contraste como conteúdo real.
 */
function SlotPlaceholder(): React.ReactElement {
  return (
    <div className="ds-popover-slot" data-testid="ds-popover-slot-placeholder" role="presentation">
      <span className="ds-popover-slot__label" aria-hidden="true">
        Slot
      </span>
    </div>
  );
}

interface PanelSlots {
  slotNo: PopoverSlotNo;
  headerSlot: ReactNode | null;
  mainSlot: ReactNode | null;
  footerSlot: ReactNode | null;
  ariaLabel: string;
}

/** Indica se a variante de slots inclui header (`"2 slots"` ou `"3 slots"`). */
function hasHeader(slotNo: PopoverSlotNo): boolean {
  return slotNo === "2 slots" || slotNo === "3 slots";
}

/** Indica se a variante de slots inclui footer (`"3 slots"`). */
function hasFooter(slotNo: PopoverSlotNo): boolean {
  return slotNo === "3 slots";
}

/** Renderiza o slot ou um placeholder quando o conteúdo não é informado. */
function renderSlot(content: ReactNode | null | undefined): React.ReactElement {
  if (content) return <>{content}</>;
  return <SlotPlaceholder />;
}

/**
 * Compõe o painel do popover a partir dos slots, respeitando o eixo
 * `slotNo`. Define `role="dialog"` no container (A11Y-01) e exige um nome
 * acessível via `aria-label` para satisfazer a regra `aria-dialog-name` do
 * axe (A11Y-02). O rótulo vem do consumidor — quando ausente, cai no
 * fallback `"Popover"`.
 */
function PopoverPanel({ slotNo, headerSlot, mainSlot, footerSlot, ariaLabel }: PanelSlots): React.ReactElement {
  const isOneSlot = slotNo === "1 slot";
  const panelClassName = ["ds-popover-panel", isOneSlot ? "ds-popover-panel--gap" : ""].filter(Boolean).join(" ");
  return (
    <div className={panelClassName} role="dialog" aria-label={ariaLabel}>
      {hasHeader(slotNo) && renderSlot(headerSlot)}
      {renderSlot(mainSlot)}
      {hasFooter(slotNo) && renderSlot(footerSlot)}
    </div>
  );
}

/**
 * Hook interno que controla o estado de abertura do popover, suportando
 * tanto o modo controlado (`open` + `onOpenChange`) quanto o não-controlado,
 * e dispara o fechamento via tecla `Escape` (A11Y-05).
 */
function usePopoverOpenState(
  controlledOpen: boolean | undefined,
  onOpenChange: PopoverProps["onOpenChange"],
): { open: boolean; handleOpenChange: (next: boolean) => void } {
  const [internalOpen, setInternalOpen] = React.useState<boolean>(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? Boolean(controlledOpen) : internalOpen;

  const handleOpenChange = React.useCallback(
    (next: boolean): void => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  React.useEffect((): (() => void) | void => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === ESCAPE_KEY) handleOpenChange(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return (): void => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleOpenChange]);

  return { open, handleOpenChange };
}

/**
 * Constrói o objeto `styles` repassado ao AntdPopover, mesclando os
 * defaults do design system (largura fixa de 280px, fundo, borda, raio e
 * sombra do token) com qualquer override semântico vindo do consumidor.
 */
function buildMergedStyles(
  resolvedStyles: Record<string, React.CSSProperties | undefined>,
): Record<string, React.CSSProperties> {
  return {
    ...resolvedStyles,
    root: { width: POPOVER_WIDTH, ...(resolvedStyles.root ?? {}) },
    container: {
      background: designSystemColors.neutral[50],
      border: `${POPOVER_BORDER_WIDTH}px solid ${designSystemColors.border.regular}`,
      borderRadius: radius.xl,
      boxShadow: shadow.l,
      ...(resolvedStyles.container ?? {}),
    },
  };
}

/**
 * Popover do design system. Wrapper do Ant Design Popover com tokens
 * próprios e composição de slots (`headerSlot`, `mainSlot`, `footerSlot`)
 * definidos pelo eixo `slotNo`. Conforme dump `figma/components/popover/`.
 */
export function Popover(props: PopoverProps): React.ReactElement {
  const {
    slotNo = "1 slot",
    headerSlot = null,
    mainSlot = null,
    footerSlot = null,
    showArrow = false,
    className,
    classNames,
    styles,
    open: controlledOpen,
    onOpenChange,
    "aria-label": ariaLabelProp,
    ...rest
  } = props;

  const { open, handleOpenChange } = usePopoverOpenState(controlledOpen, onOpenChange);
  const dialogLabel = ariaLabelProp ?? DEFAULT_DIALOG_LABEL;

  const resolvedClassNames = resolveSemantic<Record<string, string | undefined>>(classNames, props) ?? {};
  const resolvedStyles = resolveSemantic<Record<string, React.CSSProperties | undefined>>(styles, props) ?? {};
  const rootClassName = ["ds-popover-root", className, resolvedClassNames.root].filter(Boolean).join(" ");
  const mergedStyles = buildMergedStyles(resolvedStyles);

  return (
    <ConfigProvider theme={{ components: { Popover: getPopoverTokens() } }}>
      <AntdPopover
        {...rest}
        open={open}
        onOpenChange={handleOpenChange}
        arrow={showArrow}
        content={
          <PopoverPanel
            slotNo={slotNo}
            headerSlot={headerSlot}
            mainSlot={mainSlot}
            footerSlot={footerSlot}
            ariaLabel={dialogLabel}
          />
        }
        classNames={{ ...resolvedClassNames, root: rootClassName }}
        styles={mergedStyles}
      />
    </ConfigProvider>
  );
}

Popover.displayName = "Popover";

export type { PopoverProps, PopoverSlotNo } from "../../types/components/Popover";
