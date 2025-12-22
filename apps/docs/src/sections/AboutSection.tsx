import React from "react";
import { Heading2, Body1, Space } from "@Juscash/design-system";

export const AboutSection: React.FC = () => (
  <Space direction="vertical" size={16} style={{ width: "100%" }}>
    <Heading2>Sobre o Juscash Design System</Heading2>
    <Body1>
      Biblioteca proprietária construída sobre o Ant Design 6 e icons Lucide
      para garantir consistência em aplicações Next.js e React.
    </Body1>
    <Body1>
      Centralize tokens, componentes e documentação em um único pacote e evite
      dependências duplicadas do Ant Design nos projetos.
    </Body1>
  </Space>
);


