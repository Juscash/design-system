"use client";

import React, { useState } from "react";
import {
  Card,
  Space,
  Tag,
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

const basicCode = `import { Tag, Space } from '@Juscash/design-system';

function TagBasic() {
  return (
    <Space size="small">
      <Tag>Default</Tag>
      <Tag closable>Closable</Tag>
      <Tag icon={<LucideIcons.Star size={12} />}>Com ícone</Tag>
    </Space>
  );
}

render(<TagBasic />);`;

const statusCode = `import { Tag, Space } from '@Juscash/design-system';

function TagStatus() {
  return (
    <Space size="small">
      <Tag success>Sucesso</Tag>
      <Tag warning>Aviso</Tag>
      <Tag error>Erro</Tag>
    </Space>
  );
}

render(<TagStatus />);`;

export const TagShowcase: React.FC = () => (
  <Space direction="vertical" size={24} style={{ width: "100%" }}>
    <Heading2>Tag</Heading2>
    <Body1>
      Rótulos para categorizar e sinalizar estados (padrão, sucesso, aviso,
      erro), com opção de ícone e fechamento.
    </Body1>

    <DemoCard
      title="Básico"
      description="Tags padrão com versão closable e com ícone."
      code={basicCode}
      preview={
        <Space size="small" wrap>
          <Tag>Default</Tag>
          <Tag closable>Closable</Tag>
          <Tag icon={<LucideIcons.Star size={12} />}>Com ícone</Tag>
        </Space>
      }
    />

    <DemoCard
      title="Status"
      description="Variações de sucesso, aviso e erro."
      code={statusCode}
      preview={
        <Space size="small" wrap>
          <Tag success>Sucesso</Tag>
          <Tag warning>Aviso</Tag>
          <Tag error>Erro</Tag>
        </Space>
      }
    />
  </Space>
);
