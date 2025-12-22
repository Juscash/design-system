"use client";

import React from "react";
import { ConfigProvider, type ThemeConfig } from "antd";
import ptBR from "antd/locale/pt_BR";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { designSystemColors } from "./foundations";
import "antd/dist/reset.css";

dayjs.locale("pt-br");

export interface JuscashProviderProps {
  themeOverride?: ThemeConfig;
  children: React.ReactNode;
}

const baseTheme: ThemeConfig = {
  token: {
    colorPrimary: designSystemColors.brand.primary[400],
    fontFamily: "var(--font-primary), sans-serif",
  },
};

export const JuscashProvider: React.FC<JuscashProviderProps> = ({
  themeOverride,
  children,
}) => {
  const mergedTheme: ThemeConfig = {
    ...baseTheme,
    ...themeOverride,
    token: {
      ...baseTheme.token,
      ...(themeOverride?.token ?? {}),
    },
  };

  return (
    <ConfigProvider theme={mergedTheme} locale={ptBR}>
      {children}
    </ConfigProvider>
  );
};
