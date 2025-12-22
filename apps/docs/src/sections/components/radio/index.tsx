"use client";

import React, { useState } from "react";
import {
  Card,
  Space,
  Divider,
  Radio,
  RadioGroup,
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

const basicCode = `import { Radio, Space } from '@Juscash/design-system';

function RadioBasic() {
  return (
    <Space direction="vertical">
      <Radio checked>Radio selecionado</Radio>
      <Radio>Radio não selecionado</Radio>
    </Space>
  );
}

render(<RadioBasic />);`;

const disabledCode = `import { Radio, Space } from '@Juscash/design-system';

function RadioDisabled() {
  return (
    <Space direction="vertical">
      <Radio checked disabled>
        Selecionado desabilitado
      </Radio>
      <Radio disabled>Não selecionado desabilitado</Radio>
    </Space>
  );
}

render(<RadioDisabled />);`;

const errorCode = `import { Radio, Space } from '@Juscash/design-system';

function RadioError() {
  return (
    <Space direction="vertical">
      <Radio error checked>
        Erro selecionado
      </Radio>
      <Radio error>Erro não selecionado</Radio>
    </Space>
  );
}

render(<RadioError />);`;

const groupCode = `import { Radio, RadioGroup, Space } from '@Juscash/design-system';

function RadioGroupExample() {
  return (
    <RadioGroup defaultValue="a">
      <Space direction="vertical">
        <Radio value="a">Opção A</Radio>
        <Radio value="b">Opção B</Radio>
        <Radio value="c" disabled>
          Opção C desabilitada
        </Radio>
      </Space>
    </RadioGroup>
  );
}

render(<RadioGroupExample />);`;

export const RadioShowcase: React.FC = () => (
  <Space direction="vertical" size={24} style={{ width: "100%" }}>
    <Heading2>Radio</Heading2>
    <Body1>
      Seleção única com estados padrão, desabilitado, erro e em grupo, seguindo
      o design do Figma.
    </Body1>

    <DemoCard
      title="Básico"
      description="Versões selecionada e não selecionada."
      code={basicCode}
      preview={
        <Space direction="vertical">
          <Radio checked>Radio selecionado</Radio>
          <Radio>Radio não selecionado</Radio>
        </Space>
      }
    />

    <DemoCard
      title="Desabilitado"
      description="Estados desabilitados com preenchimento e borda mais claros."
      code={disabledCode}
      preview={
        <Space direction="vertical">
          <Radio checked disabled>
            Selecionado desabilitado
          </Radio>
          <Radio disabled>Não selecionado desabilitado</Radio>
        </Space>
      }
    />

    <DemoCard
      title="Erro"
      description="Aplicando o estado de erro via prop error."
      code={errorCode}
      preview={
        <Space direction="vertical">
          <Radio error checked>
            Erro selecionado
          </Radio>
          <Radio error>Erro não selecionado</Radio>
        </Space>
      }
    />

    <DemoCard
      title="Grupo"
      description="Exemplo de RadioGroup com opções, incluindo desabilitada."
      code={groupCode}
      preview={
        <RadioGroup defaultValue="a">
          <Space direction="vertical">
            <Radio value="a">Opção A</Radio>
            <Radio value="b">Opção B</Radio>
            <Radio value="c" disabled>
              Opção C desabilitada
            </Radio>
          </Space>
        </RadioGroup>
      }
    />
  </Space>
);
