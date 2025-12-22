import React from "react";
import { Heading2, Body1, Body2, Space, Card } from "@Juscash/design-system";

export const TokensSection: React.FC = () => (
  <Space direction="vertical" size={16} style={{ width: "100%" }}>
    <Heading2>Design Tokens</Heading2>
    <Body1>
      Em breve: documentação com cores, espaçamentos, radius, sombras e
      breakpoints. Enquanto isso, utilize os exports do pacote:
      <code>designSystemColors</code>, <code>spacing</code>,{" "}
      <code>radius</code>, <code>breakpoints</code> e <code>shadow</code>.
    </Body1>
    <Card>
      <Body2>
        Exemplo de import:
        <pre
          style={{
            background: "#f5f5f5",
            padding: 12,
            borderRadius: 6,
            overflowX: "auto",
            fontSize: 12
          }}
        >{`import {
  designSystemColors,
  spacing,
  radius,
  breakpoints
} from '@Juscash/design-system';`}</pre>
      </Body2>
    </Card>
  </Space>
);


