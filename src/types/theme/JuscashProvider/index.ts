import type { ReactNode } from "react";
import type { ThemeConfig } from "antd";

export interface JuscashProviderProps {
  themeOverride?: ThemeConfig;
  children: ReactNode;
}
