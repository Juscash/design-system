import type React from "react";
import type { TabsProps as AntdTabsProps } from "antd";

export type TabsSize = "s" | "m" | "l";
export type TabsVariant = "primary" | "secondary";

/** Item de tab com suporte a ícone via string (nome Lucide) além de ReactNode. */
export type TabItem = {
  key: string;
  label: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  forceRender?: boolean;
  destroyOnHidden?: boolean;
  /** Nome de ícone Lucide (ex.: `"Search"`) ou ReactNode. */
  icon?: string | React.ReactNode;
};

type CleanAntdProps = {
  [K in keyof AntdTabsProps as K extends "size" | "type" | "items" ? never : K]: AntdTabsProps[K];
};

export type TabsProps = CleanAntdProps & {
  dsSize?: TabsSize;
  size?: AntdTabsProps["size"];
  variant?: TabsVariant;
  /** Lista de tabs. Aceita `icon` como string Lucide ou ReactNode. */
  items?: TabItem[];
};
