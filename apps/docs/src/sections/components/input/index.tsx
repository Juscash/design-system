"use client";

import React, { useState } from "react";
import {
  Card,
  Space,
  Input,
  Heading2,
  Body1,
  Body2,
  LucideIcons,
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

const sizesCode = `import { Input, Space } from '@Juscash/design-system';

function InputSizes() {
  return (
    <Space direction="vertical" size="middle">
      <Input placeholder="Extra small" dsSize="xs" />
      <Input placeholder="Small" dsSize="s" />
      <Input placeholder="Medium" dsSize="m" />
      <Input placeholder="Large" dsSize="l" />
    </Space>
  );
}

render(<InputSizes />);`;

const statesCode = `import { Input, Space } from '@Juscash/design-system';

function InputStates() {
  return (
    <Space direction="vertical" size="middle">
      <Input placeholder="Input ativo" defaultValue="Texto digitado" />
      <Input placeholder="Input desabilitado" disabled />
      <Input placeholder="Input com erro" status="error" />
    </Space>
  );
}

render(<InputStates />);`;

const iconsCode = `import { Input, Space, LucideIcons } from '@Juscash/design-system';

function InputIcons() {
  return (
    <Space direction="vertical" size="middle">
      <Input
        placeholder="Com ícone prefix"
        prefix={<LucideIcons.Search size={16} />}
      />
      <Input
        placeholder="Com ícone suffix"
        suffix={<LucideIcons.Eye size={16} />}
      />
      <Input
        placeholder="Com prefix e suffix"
        prefix={<LucideIcons.User size={16} />}
        suffix={<LucideIcons.Check size={16} />}
      />
    </Space>
  );
}

render(<InputIcons />);`;

const textAreaCode = `import { Input, Space } from '@Juscash/design-system';

const { TextArea } = Input;

function TextAreaBasic() {
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <TextArea placeholder="Digite sua mensagem" rows={4} />
      <TextArea placeholder="Com valor padrão" defaultValue="Texto inicial" rows={4} />
    </Space>
  );
}

render(<TextAreaBasic />);`;

const textAreaStatesCode = `import { Input, Space } from '@Juscash/design-system';

const { TextArea } = Input;

function TextAreaStates() {
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <TextArea placeholder="TextArea ativo" rows={4} />
      <TextArea placeholder="TextArea desabilitado" disabled rows={4} />
      <TextArea placeholder="TextArea com erro" status="error" rows={4} />
    </Space>
  );
}

render(<TextAreaStates />);`;

// Extrair TextArea para uso local (TypeScript pode não reconhecer como propriedade estática)
const TextAreaComponent = (
  Input as unknown as { TextArea: React.ComponentType<any> }
).TextArea;

export const InputShowcase: React.FC = () => (
  <Space direction="vertical" size={24} style={{ width: "100%" }}>
    <Heading2>Input</Heading2>
    <Body1>
      Campo de entrada de texto com tamanhos customizados (xs, s, m, l), estados
      ativo, desabilitado e erro, além de suporte a ícones prefix e suffix.
    </Body1>

    <DemoCard
      title="Tamanhos"
      description="Demonstração dos tamanhos xs, s, m e l."
      code={sizesCode}
      preview={
        <Space direction="vertical" size="middle">
          <Input placeholder="Extra small" dsSize="xs" />
          <Input placeholder="Small" dsSize="s" />
          <Input placeholder="Medium" dsSize="m" />
          <Input placeholder="Large" dsSize="l" />
        </Space>
      }
    />

    <DemoCard
      title="Estados"
      description="Input ativo, desabilitado e com erro."
      code={statesCode}
      preview={
        <Space direction="vertical" size="middle">
          <Input placeholder="Input ativo" defaultValue="Texto digitado" />
          <Input placeholder="Input desabilitado" disabled />
          <Input placeholder="Input com erro" status="error" />
        </Space>
      }
    />

    <DemoCard
      title="Com ícones"
      description="Exemplos com ícones prefix, suffix e ambos."
      code={iconsCode}
      preview={
        <Space direction="vertical" size="middle">
          <Input
            placeholder="Com ícone prefix"
            prefix={<LucideIcons.Search size={16} />}
          />
          <Input
            placeholder="Com ícone suffix"
            suffix={<LucideIcons.Eye size={16} />}
          />
          <Input
            placeholder="Com prefix e suffix"
            prefix={<LucideIcons.User size={16} />}
            suffix={<LucideIcons.Check size={16} />}
          />
        </Space>
      }
    />

    <DemoCard
      title="TextArea"
      description="Campo de texto multilinha básico."
      code={textAreaCode}
      preview={
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <TextAreaComponent placeholder="Digite sua mensagem" rows={4} />
          <TextAreaComponent
            placeholder="Com valor padrão"
            defaultValue="Texto inicial"
            rows={4}
          />
        </Space>
      }
    />

    <DemoCard
      title="TextArea - Estados"
      description="TextArea ativo, desabilitado e com erro."
      code={textAreaStatesCode}
      preview={
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <TextAreaComponent placeholder="TextArea ativo" rows={4} />
          <TextAreaComponent
            placeholder="TextArea desabilitado"
            disabled
            rows={4}
          />
          <TextAreaComponent
            placeholder="TextArea com erro"
            status="error"
            rows={4}
          />
        </Space>
      }
    />
  </Space>
);
