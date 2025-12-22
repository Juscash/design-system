"use client";

import React, { useState } from "react";
import {
  Card,
  Space,
  Switch,
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

const basicCode = `import { Switch, Space } from '@Juscash/design-system';

function SwitchBasic() {
  return (
    <Space direction="vertical">
      <Switch defaultChecked />
      <Switch />
    </Space>
  );
}

render(<SwitchBasic />);`;

const disabledCode = `import { Switch, Space } from '@Juscash/design-system';

function SwitchDisabled() {
  return (
    <Space direction="vertical">
      <Switch defaultChecked disabled />
      <Switch disabled />
    </Space>
  );
}

render(<SwitchDisabled />);`;

const errorCode = `import { Switch, Space } from '@Juscash/design-system';

function SwitchError() {
  return (
    <Space direction="vertical">
      <Switch error defaultChecked />
      <Switch error />
    </Space>
  );
}

render(<SwitchError />);`;

export const SwitchShowcase: React.FC = () => (
  <Space direction="vertical" size={24} style={{ width: "100%" }}>
    <Heading2>Switch</Heading2>
    <Body1>
      Interruptor on/off com estados padrão, desabilitado e erro, seguindo o
      design do Figma.
    </Body1>

    <DemoCard
      title="Básico"
      description="Versões ligado e desligado."
      code={basicCode}
      preview={
        <Space direction="vertical">
          <Switch defaultChecked />
          <Switch />
        </Space>
      }
    />

    <DemoCard
      title="Desabilitado"
      description="Exemplo de switches desabilitados."
      code={disabledCode}
      preview={
        <Space direction="vertical">
          <Switch defaultChecked disabled />
          <Switch disabled />
        </Space>
      }
    />

    <DemoCard
      title="Erro"
      description="Aplicando o estado de erro com a prop error."
      code={errorCode}
      preview={
        <Space direction="vertical">
          <Switch error defaultChecked />
          <Switch error />
        </Space>
      }
    />
  </Space>
);
