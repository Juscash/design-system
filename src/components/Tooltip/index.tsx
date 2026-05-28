import React from "react";
import { Tooltip as AntdTooltip, ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";
import { designSystemColors, radius } from "../../theme";
import type {
  TooltipProps,
  TooltipSemanticClassNames,
  TooltipSemanticStyles,
} from "../../types/components/Tooltip";
import "./index.module.css";

const MAX_TOOLTIP_WIDTH = 200;
const TOOLTIP_FONT_SIZE = 13;
const TOOLTIP_LINE_HEIGHT = 1.2;
const TOOLTIP_ARROW_SIZE = 11.5;
const INTER_FONT_FAMILY = '"Inter", sans-serif';

/**
 * Tema local do Tooltip do design system. Mantém os tokens nativos do Antd
 * alinhados com `neutral[800]` (fundo) e `neutral[50]` (texto), conforme o
 * frame `4041:9017` do Figma. `sizePopupArrow` força o Antd a recalcular a
 * geometria e o translation matrix da seta para todos os 4 placements de
 * forma consistente.
 */
function getTooltipTheme(): ThemeConfig {
  return {
    components: {
      Tooltip: {
        colorBgSpotlight: designSystemColors.neutral[800],
        colorTextLightSolid: designSystemColors.neutral[50],
        borderRadius: radius.xl,
        fontFamily: INTER_FONT_FAMILY,
        fontSize: TOOLTIP_FONT_SIZE,
        lineHeight: TOOLTIP_LINE_HEIGHT,
        sizePopupArrow: TOOLTIP_ARROW_SIZE,
      },
    },
    token: {
      fontFamily: INTER_FONT_FAMILY,
      sizePopupArrow: TOOLTIP_ARROW_SIZE,
    },
  };
}

/**
 * Resolve um valor semântico do Antd Tooltip, que pode ser objeto literal ou
 * função `(info) => objeto`. Mantém a mesma interface contratada pelo Antd.
 */
function resolveSemanticValue<T extends object>(
  value: T | ((info: { props: TooltipProps }) => T) | undefined,
  props: TooltipProps,
): T | undefined {
  if (typeof value === "function") {
    return value({ props });
  }
  return value;
}

/**
 * Context que propaga uma função "feche-se" do Tooltip ancestral mais
 * próximo. Quando um Tooltip filho abre, ele chama essa função, garantindo
 * que tooltips aninhados não convivam abertos ao mesmo tempo. Regra
 * pedida pelo usuário (não documentada no Figma) — registrada como
 * comportamento proprietário do wrapper Juscash.
 */
const TooltipParentCloseContext = React.createContext<(() => void) | null>(null);

/**
 * Tooltip do design system com fundo escuro `neutral[800]` e texto claro
 * `neutral[50]`, baseado no frame Figma `4041:9017` (matriz `side`).
 * Encadeia o auto-fechamento do ancestral via `TooltipParentCloseContext`
 * mesmo quando o consumidor não passa `open` (modo uncontrolled).
 */
export function Tooltip(props: TooltipProps): React.ReactElement {
  const {
    children,
    classNames,
    styles,
    overlayClassName,
    overlayStyle,
    overlayInnerStyle,
    open: openProp,
    defaultOpen,
    onOpenChange: onOpenChangeProp,
    ...rest
  } = props;

  const closeAncestor = React.useContext(TooltipParentCloseContext);
  const [internalOpen, setInternalOpen] = React.useState<boolean>(defaultOpen ?? false);

  const isControlled = openProp !== undefined;
  const currentOpen = isControlled ? openProp : internalOpen;

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (next && closeAncestor) closeAncestor();
      if (!isControlled) setInternalOpen(next);
      onOpenChangeProp?.(next);
    },
    [closeAncestor, isControlled, onOpenChangeProp],
  );

  const closeSelf = React.useCallback(() => {
    if (!isControlled) setInternalOpen(false);
    onOpenChangeProp?.(false);
  }, [isControlled, onOpenChangeProp]);

  const resolvedClassNames = resolveSemanticValue<TooltipSemanticClassNames>(classNames, props) ?? {};
  const resolvedStyles = resolveSemanticValue<TooltipSemanticStyles>(styles, props) ?? {};

  const rootClassName = ["ds-tooltip", overlayClassName, resolvedClassNames.root].filter(Boolean).join(" ");

  return (
    <TooltipParentCloseContext.Provider value={closeSelf}>
      <ConfigProvider theme={getTooltipTheme()}>
        <AntdTooltip
          classNames={{ ...resolvedClassNames, root: rootClassName }}
          styles={{
            ...resolvedStyles,
            root: { maxWidth: MAX_TOOLTIP_WIDTH, ...overlayStyle, ...resolvedStyles.root },
            container: { ...overlayInnerStyle, ...resolvedStyles.container },
          }}
          open={currentOpen}
          onOpenChange={handleOpenChange}
          {...rest}
        >
          {children}
        </AntdTooltip>
      </ConfigProvider>
    </TooltipParentCloseContext.Provider>
  );
}

Tooltip.displayName = "Tooltip";

export type { TooltipProps } from "../../types/components/Tooltip";
