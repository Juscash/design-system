import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, type ThemeConfig } from "antd";
import ptBR from "antd/locale/pt_BR";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import "antd/dist/reset.css";
import { designSystemColors } from "./foundations";
import type { JuscashProviderProps } from "../types/theme/JuscashProvider";

dayjs.locale("pt-br");

const baseTheme: ThemeConfig = {
  token: {
    colorPrimary: designSystemColors.brand.primary[400],
    fontFamily: "var(--font-primary), sans-serif",
  },
};

const customLocale = {
  ...ptBR,
  Table: {
    ...ptBR.Table,
    triggerAsc: "Clique para organizar em ordem crescente",
    triggerDesc: "Clique para organizar em ordem decrescente",
    cancelSort: "Clique para remover ordenação",
  },
};

/**
 * Provider raiz do design system. Envolve a aplicação com o `AntdRegistry`
 * (para SSR em Next.js App Router) e o `ConfigProvider` do Antd aplicando os
 * tokens base e o locale pt-BR. Aceita `themeOverride` para sobrescrever
 * tokens pontuais sem perder a base.
 */
export const JuscashProvider: React.FC<JuscashProviderProps> = ({ themeOverride, children }) => {
  const mergedTheme: ThemeConfig = {
    ...baseTheme,
    ...themeOverride,
    token: {
      ...baseTheme.token,
      ...(themeOverride?.token ?? {}),
    },
  };

  return (
    <AntdRegistry>
      <ConfigProvider theme={mergedTheme} locale={customLocale}>
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
};

JuscashProvider.displayName = "JuscashProvider";

export type { JuscashProviderProps } from "../types/theme/JuscashProvider";
