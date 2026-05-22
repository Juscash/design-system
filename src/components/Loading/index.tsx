import React from "react";
import { Spin, ConfigProvider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { designSystemColors } from "../../theme";
import type { LoadingProps } from "../../types/components/Loading";

const ICON_SIZE_LARGE = 40;
const ICON_SIZE_SMALL = 16;
const ICON_SIZE_DEFAULT = 24;

function resolveIconSize(size?: LoadingProps["size"]): number {
  if (size === "large") return ICON_SIZE_LARGE;
  if (size === "small") return ICON_SIZE_SMALL;
  return ICON_SIZE_DEFAULT;
}

/**
 * Indicador de carregamento padrão do design system. Envolve o `Spin` do Antd
 * com a paleta brand primary.
 */
export const Loading: React.FC<LoadingProps> = (props) => {
  const indicator = <LoadingOutlined style={{ fontSize: resolveIconSize(props.size) }} spin />;

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
