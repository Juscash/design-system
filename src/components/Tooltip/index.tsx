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
 * Delay (ms) aplicado ao liberar o ancestral suprimido. Evita que o tooltip
 * do pai pisque imediatamente após o filho fechar — dá tempo do usuário sair
 * da área do filho sem ver o pai reaparecer no meio do gesto.
 */
const PARENT_RELEASE_DELAY_MS = 200;

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
 * Controle de supressão/liberação propagado para o Tooltip ancestral mais
 * próximo. Quando um Tooltip filho abre, o pai é **suprimido** (visualmente
 * escondido sem perder o estado natural de hover do Antd); quando o filho
 * fecha, o pai é **liberado** e volta a aparecer se o mouse ainda estiver
 * sobre seu âncora. Regra pedida pelo usuário (não documentada no Figma).
 */
type TooltipParentControl = {
  suppress: () => void;
  release: () => void;
};

const TooltipParentControlContext = React.createContext<TooltipParentControl | null>(null);

/**
 * Tooltip do design system com fundo escuro `neutral[800]` e texto claro
 * `neutral[50]`, baseado no frame Figma `4041:9017` (matriz `side`).
 * Suprime ancestrais quando aberto e os libera quando fechado — ver
 * `TooltipParentControlContext`.
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

  const ancestor = React.useContext(TooltipParentControlContext);
  const [internalOpen, setInternalOpen] = React.useState<boolean>(defaultOpen ?? false);
  const [suppressed, setSuppressed] = React.useState<boolean>(false);

  const isControlled = openProp !== undefined;
  const naturalOpen = isControlled ? openProp : internalOpen;
  const effectiveOpen = suppressed ? false : naturalOpen;

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      const title = typeof rest.title === "string" ? rest.title.slice(0, 30) : "?";
      // eslint-disable-next-line no-console
      console.log(`[DS Tooltip "${title}"] handleOpenChange(${next}), ancestor=${ancestor ? "Y" : "N"}`);
      if (next && ancestor) ancestor.suppress();
      else if (!next && ancestor) ancestor.release();
      if (!isControlled) setInternalOpen(next);
      onOpenChangeProp?.(next);
    },
    [ancestor, isControlled, onOpenChangeProp, rest.title],
  );

  const releaseTimerRef = React.useRef<number | null>(null);

  const clearReleaseTimer = React.useCallback(() => {
    if (releaseTimerRef.current !== null) {
      window.clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = null;
    }
  }, []);

  const suppress = React.useCallback(() => {
    clearReleaseTimer();
    setSuppressed(true);
  }, [clearReleaseTimer]);

  const release = React.useCallback(() => {
    clearReleaseTimer();
    releaseTimerRef.current = window.setTimeout(() => {
      releaseTimerRef.current = null;
      setSuppressed(false);
    }, PARENT_RELEASE_DELAY_MS);
  }, [clearReleaseTimer]);

  React.useEffect(() => clearReleaseTimer, [clearReleaseTimer]);

  const control = React.useMemo<TooltipParentControl>(
    () => ({ suppress, release }),
    [suppress, release],
  );

  const resolvedClassNames = resolveSemanticValue<TooltipSemanticClassNames>(classNames, props) ?? {};
  const resolvedStyles = resolveSemanticValue<TooltipSemanticStyles>(styles, props) ?? {};

  const rootClassName = ["ds-tooltip", overlayClassName, resolvedClassNames.root].filter(Boolean).join(" ");

  // eslint-disable-next-line no-console
  console.log(
    `[DS Tooltip RENDER "${typeof rest.title === "string" ? rest.title.slice(0, 30) : "?"}"] effectiveOpen=${effectiveOpen}, suppressed=${suppressed}, internalOpen=${internalOpen}, isControlled=${isControlled}, ancestor=${ancestor ? "Y" : "N"}`,
  );

  return (
    <TooltipParentControlContext.Provider value={control}>
      <ConfigProvider theme={getTooltipTheme()}>
        <AntdTooltip
          classNames={{ ...resolvedClassNames, root: rootClassName }}
          styles={{
            ...resolvedStyles,
            root: { maxWidth: MAX_TOOLTIP_WIDTH, ...overlayStyle, ...resolvedStyles.root },
            container: { ...overlayInnerStyle, ...resolvedStyles.container },
          }}
          open={effectiveOpen}
          onOpenChange={handleOpenChange}
          {...rest}
        >
          {children}
        </AntdTooltip>
      </ConfigProvider>
    </TooltipParentControlContext.Provider>
  );
}

Tooltip.displayName = "Tooltip";

export type { TooltipProps } from "../../types/components/Tooltip";
