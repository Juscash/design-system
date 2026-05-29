import React from "react";
import { Tabs as AntdTabs, ConfigProvider } from "antd";
import type { TabsProps as AntdTabsProps } from "antd";
import * as LucideIcons from "lucide-react";
import { Ellipsis } from "lucide-react";
import { designSystemColors, spacing } from "../../theme";
import type { TabsProps, TabsSize, TabsVariant, TabItem } from "../../types/components/Tabs";
import "./index.module.css";

const TAB_FONT_SIZE_M = 13;
const TAB_FONT_SIZE_S = 10;
const MORE_ICON_SIZE = 16;
const MORE_DEFAULT_ARIA_LABEL = "Mais abas";
const ICON_SIZE_DEFAULT = 16;
const ICON_SIZE_SMALL = 12;

type TabsComponentToken = Record<string, unknown>;

function getPrimaryTokens(): TabsComponentToken {
  return {
    itemColor: designSystemColors.neutral[500],
    itemActiveColor: designSystemColors.brand.primary[600],
    itemHoverColor: designSystemColors.brand.primary[600],
    itemSelectedColor: designSystemColors.brand.primary[600],
    inkBarColor: designSystemColors.brand.primary[600],
    horizontalItemGutter: 0,
    horizontalItemMargin: "0",
  };
}

function getSecondaryTokens(): TabsComponentToken {
  return {
    itemColor: designSystemColors.neutral[500],
    itemActiveColor: designSystemColors.brand.secondary[600],
    itemHoverColor: designSystemColors.brand.secondary[600],
    itemSelectedColor: designSystemColors.brand.secondary[600],
    inkBarColor: designSystemColors.brand.secondary[600],
    horizontalItemGutter: 0,
    horizontalItemMargin: "0",
  };
}

function getSizeTokens(dsSize: TabsSize): TabsComponentToken {
  switch (dsSize) {
    case "s":
      return {
        titleFontSize: TAB_FONT_SIZE_S,
        horizontalItemPadding: `1px ${spacing[1]}px`,
        horizontalMargin: "0",
      };
    case "l":
      return {
        titleFontSize: TAB_FONT_SIZE_M,
        horizontalItemPadding: `${spacing[1]}px ${spacing[3]}px`,
        horizontalMargin: "0",
      };
    case "m":
    default:
      return {
        titleFontSize: TAB_FONT_SIZE_M,
        horizontalItemPadding: `${spacing[1]}px ${spacing[2]}px`,
        horizontalMargin: "0",
      };
  }
}

function mapAntdSize(size: AntdTabsProps["size"]): TabsSize {
  switch (size) {
    case "small":
      return "s";
    case "large":
      return "l";
    default:
      return "m";
  }
}

function getVariantTokens(variant: TabsVariant): TabsComponentToken {
  return variant === "secondary" ? getSecondaryTokens() : getPrimaryTokens();
}

type MoreWithAria = NonNullable<AntdTabsProps["more"]> & { "aria-label"?: string };

/**
 * Retorna o `aria-label` configurado no prop `more` ou o fallback padrão.
 * Usado tanto na resolução do prop quanto no efeito que reaplica no DOM.
 */
function resolveMoreAriaLabel(more: AntdTabsProps["more"]): string {
  const moreWithAria = (more ?? {}) as MoreWithAria;
  return moreWithAria["aria-label"] ?? MORE_DEFAULT_ARIA_LABEL;
}

/**
 * Garante `aria-label` no botão de overflow ("more") e ícone padrão Lucide,
 * preservando qualquer configuração já passada pelo consumidor.
 */
function resolveMoreProp(more: AntdTabsProps["more"]): MoreWithAria {
  const moreWithAria = (more ?? {}) as MoreWithAria;
  const fallbackIcon = <Ellipsis size={MORE_ICON_SIZE} />;
  return {
    icon: moreWithAria.icon ?? fallbackIcon,
    ...moreWithAria,
    "aria-label": resolveMoreAriaLabel(more),
  };
}

/**
 * Resolve o ícone de um item: se for string, busca no registro Lucide;
 * caso contrário retorna o ReactNode sem alteração.
 */
function resolveItemIcon(
  icon: string | React.ReactNode | undefined,
  dsSize: TabsSize
): React.ReactNode {
  if (icon === undefined || icon === null) return undefined;
  if (typeof icon !== "string") return icon;
  const iconSize = dsSize === "s" ? ICON_SIZE_SMALL : ICON_SIZE_DEFAULT;
  const registry = LucideIcons as unknown as Record<string, unknown>;
  const IconComponent = registry[icon];
  if (typeof IconComponent !== "function" && typeof IconComponent !== "object") return undefined;
  const LucideIcon = IconComponent as React.ComponentType<{ size?: number }>;
  return <LucideIcon size={iconSize} />;
}

/**
 * Converte os itens do DS (TabItem[]) para o formato que o antd espera (Tab[]).
 * Resolve string icons para ReactNode via Lucide.
 */
function resolveItems(
  items: TabItem[] | undefined,
  dsSize: TabsSize
): AntdTabsProps["items"] {
  if (!items) return undefined;
  return items.map((item) => ({
    ...item,
    icon: resolveItemIcon(item.icon, dsSize),
  }));
}

/**
 * Tabs do design system. Aceita `variant` (`primary|secondary`) que controla
 * paleta de seleção e `dsSize` (`s|m|l`) para altura e espaçamento.
 * Os itens suportam `icon` como nome de ícone Lucide (string) ou ReactNode.
 */
export function Tabs(props: TabsProps): React.ReactElement {
  const { variant = "primary", dsSize = "m", size, className, more, items, ...rest } = props;

  const resolvedSize = size ? mapAntdSize(size) : dsSize;
  const sizeTokens = getSizeTokens(resolvedSize);
  const mergedClassName = ["ds-tabs", `ds-tabs-${resolvedSize}`, `ds-tabs-${variant}`, className]
    .filter(Boolean)
    .join(" ");
  const resolvedMore = resolveMoreProp(more);
  const resolvedItems = resolveItems(items, resolvedSize);
  const resolvedMoreLabel = resolveMoreAriaLabel(more);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // O antd 6 não propaga `more["aria-label"]` para o botão renderizado.
  // Reaplicamos o atributo manualmente em cada render (idempotente).
  React.useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const moreButton = root.querySelector(".ant-tabs-nav-more");
    if (moreButton && !moreButton.hasAttribute("aria-label")) {
      moreButton.setAttribute("aria-label", resolvedMoreLabel);
    }
  });

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: { ...getVariantTokens(variant), ...sizeTokens },
        },
      }}
    >
      <div ref={containerRef}>
        <AntdTabs
          {...rest}
          items={resolvedItems}
          more={resolvedMore}
          className={mergedClassName}
        />
      </div>
    </ConfigProvider>
  );
}

Tabs.displayName = "Tabs";

export type { TabsProps, TabsSize, TabsVariant, TabItem } from "../../types/components/Tabs";
