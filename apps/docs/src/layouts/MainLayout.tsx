import React from "react";
import { Layout } from "@Juscash/design-system";
import { HeaderBar } from "../sections/HeaderBar";
import { Sidebar } from "../sections/Sidebar";
import type { SectionKey } from "../types/navigation";

const { Content } = Layout;

export interface MainLayoutProps {
  activeSection: SectionKey;
  onChangeSection: (key: SectionKey) => void;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  activeSection,
  onChangeSection,
  children
}) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar activeSection={activeSection} onChange={onChangeSection} />
      <Layout>
        <HeaderBar />
        <Content style={{ padding: "32px 40px", background: "#f5f6f8" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};


