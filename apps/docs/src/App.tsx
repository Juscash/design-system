import React, { useState } from "react";
import { JuscashProvider } from "@Juscash/design-system";
import { MainLayout } from "./layouts/MainLayout";
import { ComponentsSection } from "./sections/ComponentsSection";
import { TypographySection } from "./sections/components/typography";
import { TokensSection } from "./sections/TokensSection";
import { AboutSection } from "./sections/AboutSection";
import type { SectionKey, ComponentKey } from "./types/navigation";

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>("components");
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentKey | null>(null);

  const renderSection = () => {
    switch (activeSection) {
      case "components":
        return (
          <ComponentsSection
            selectedComponent={selectedComponent}
            onSelect={setSelectedComponent}
          />
        );
      case "typography":
        return <TypographySection />;
      case "tokens":
        return <TokensSection />;
      case "about":
        return <AboutSection />;
      default:
        return null;
    }
  };

  const handleSectionChange = (key: string) => {
    setActiveSection(key as SectionKey);
    setSelectedComponent(null);
  };

  return (
    <JuscashProvider>
      <MainLayout
        activeSection={activeSection}
        onChangeSection={handleSectionChange}
      >
        {renderSection()}
      </MainLayout>
    </JuscashProvider>
  );
};
