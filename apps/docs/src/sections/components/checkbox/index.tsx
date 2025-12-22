"use client";

import React, { useState } from "react";
import {
  Card,
  Space,
  Checkbox,
  Heading2,
  Body1,
  Body2,
} from "@Juscash/design-system";
import { ButtonPlayground } from "../buttons/ButtonPlayground";

interface DemoCardProps {
  title: string;
  description: string;
  code: string;
  preview: React.ReactNode;
}

const DemoCard: React.FC<DemoCardProps> = ({
  title,
  description,
  code,
  preview,
}) => {
  const [showPlayground, setShowPlayground] = useState(false);

  return (
    <Card
      title={title}
      style={{ width: "100%" }}
      extra={
        <Body2
          onClick={() => setShowPlayground((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: "#136CE2",
            fontWeight: 600,
          }}
        >
          {showPlayground ? "Ocultar exemplo" : "Exemplo interativo"}
        </Body2>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Body1>{description}</Body1>
        {preview}
        {showPlayground ? <ButtonPlayground code={code} /> : null}
      </Space>
    </Card>
  );
};

const basicCode = `import { Checkbox, Space } from '@Juscash/design-system';

function CheckboxBasic() {
  return (
    <Space direction="vertical">
      <Checkbox defaultChecked>Checkbox selecionado</Checkbox>
      <Checkbox>Checkbox não selecionado</Checkbox>
    </Space>
  );
}

render(<CheckboxBasic />);`;

const disabledCode = `import { Checkbox, Space } from '@Juscash/design-system';

function CheckboxDisabled() {
  return (
    <Space direction="vertical">
      <Checkbox defaultChecked disabled>
        Selecionado desabilitado
      </Checkbox>
      <Checkbox disabled>Não selecionado desabilitado</Checkbox>
    </Space>
  );
}

render(<CheckboxDisabled />);`;

export const CheckboxShowcase: React.FC = () => (
  <Space direction="vertical" size={24} style={{ width: "100%" }}>
    <Heading2>Checkbox</Heading2>
    <Body1>
      Caixa de seleção padrão com estados selecionado, não selecionado e
      desabilitado, seguindo o design do Figma.
    </Body1>

    <DemoCard
      title="Básico"
      description="Versões selecionada e não selecionada."
      code={basicCode}
      preview={
        <Space direction="vertical">
          <Checkbox defaultChecked>Checkbox selecionado</Checkbox>
          <Checkbox>Checkbox não selecionado</Checkbox>
        </Space>
      }
    />

    <DemoCard
      title="Desabilitado"
      description="Estados desabilitados mantêm o preenchimento e borda mais claros."
      code={disabledCode}
      preview={
        <Space direction="vertical">
          <Checkbox defaultChecked disabled>
            Selecionado desabilitado
          </Checkbox>
          <Checkbox disabled>Não selecionado desabilitado</Checkbox>
        </Space>
      }
    />
  </Space>
);
