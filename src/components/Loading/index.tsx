import React from "react";
import { Spin, ConfigProvider } from "antd";
import { Loader2 } from "lucide-react";
import { designSystemColors } from "../../theme";
import type { LoadingProps } from "../../types/components/Loading";
import "./index.module.css";

const ICON_SIZE_LARGE = 40;
const ICON_SIZE_SMALL = 16;
const ICON_SIZE_DEFAULT = 24;

/**
 * Resolve o tamanho do ícone de loading em pixels a partir do prop `size`
 * herdado do `Spin` do Antd.
 */
function resolveIconSize(size?: LoadingProps["size"]): number {
  if (size === "large") return ICON_SIZE_LARGE;
  if (size === "small") return ICON_SIZE_SMALL;
  return ICON_SIZE_DEFAULT;
}

/**
 * Indicador de carregamento padrão do design system. Envolve o `Spin` do Antd
 * com a paleta brand primary e usa o ícone `Loader2` do `lucide-react` com
 * animação `spin` aplicada via CSS module local (`ds-loading-spinner`).
 */
export const Loading: React.FC<LoadingProps> = (props) => {
  const indicator = (
    <span className="ds-loading-spinner">
      <Loader2 size={resolveIconSize(props.size)} color={designSystemColors.brand.primary[500]} />
    </span>
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Spin: {
            colorPrimary: designSystemColors.brand.primary[500],
          },
        },
        token: {
          colorPrimary: designSystemColors.brand.primary[500],
        },
      }}
    >
      <Spin indicator={indicator} {...props} />
    </ConfigProvider>
  );
};

Loading.displayName = "Loading";

export type { LoadingProps } from "../../types/components/Loading";
