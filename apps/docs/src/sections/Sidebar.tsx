import React from "react";
import { Layout, Menu, Body2, type MenuProps } from "@Juscash/design-system";
import logoJuscash from "../utils/logo_branco.png";
import type { SectionKey } from "../types/navigation";

const { Sider } = Layout;

const menuItems: MenuProps["items"] = [
  { key: "components", label: "Componentes" },
  { key: "typography", label: "Typography" },
  { key: "tokens", label: "Design Tokens" },
  { key: "about", label: "Sobre" },
];

export interface SidebarProps {
  activeSection: SectionKey;
  onChange: (key: SectionKey) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onChange,
}) => (
  <Sider breakpoint="lg" collapsedWidth={0} style={{ background: "#0f172a" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 24px",
      }}
    >
      <img src={logoJuscash} alt="Juscash" style={{ height: 25 }} />
    </div>
    <Menu
      items={menuItems}
      selectedKeys={[activeSection]}
      onClick={({ key }: { key: string }) => onChange(key as SectionKey)}
      theme="dark"
      mode="inline"
    />
  </Sider>
);
