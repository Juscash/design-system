"use client";

import React, { useState } from "react";
import {
  Card,
  Space,
  Heading2,
  Body1,
  Body2,
  Button,
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

const basicCode = `import { Card, Space, Body1 } from '@Juscash/design-system';

function CardBasic() {
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Card title="Card Básico" style={{ width: 300 }}>
        <Body1>Conteúdo do card básico.</Body1>
      </Card>
      <Card style={{ width: 300 }}>
        <Body1>Card sem título.</Body1>
      </Card>
    </Space>
  );
}

render(<CardBasic />);`;

const withExtraCode = `import { Card, Space, Body1, Button, LucideIcons } from '@Juscash/design-system';

function CardWithExtra() {
  return (
    <Card
      title="Card com Extra"
      extra={<Button type="link" icon={<LucideIcons.Settings size={16} />}>Configurar</Button>}
      style={{ width: 300 }}
    >
      <Body1>Card com área extra no cabeçalho.</Body1>
    </Card>
  );
}

render(<CardWithExtra />);`;

const hoverableCode = `import { Card, Space, Body1 } from '@Juscash/design-system';

function CardHoverable() {
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Card hoverable style={{ width: 300 }}>
        <Body1>Passe o mouse sobre este card para ver o efeito.</Body1>
      </Card>
      <Card style={{ width: 300 }}>
        <Body1>Este card não tem efeito hover.</Body1>
      </Card>
    </Space>
  );
}

render(<CardHoverable />);`;

const borderedCode = `import { Card, Space, Body1 } from '@Juscash/design-system';

function CardBordered() {
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Card title="Card com Borda" bordered style={{ width: 300 }}>
        <Body1>Card com borda visível (padrão).</Body1>
      </Card>
      <Card title="Card sem Borda" bordered={false} style={{ width: 300 }}>
        <Body1>Card sem borda.</Body1>
      </Card>
    </Space>
  );
}

render(<CardBordered />);`;

const loadingCode = `import { Card, Space, Body1 } from '@Juscash/design-system';

function CardLoading() {
  return (
    <Card title="Card Carregando" loading style={{ width: 300 }}>
      <Body1>Este conteúdo será exibido após o carregamento.</Body1>
    </Card>
  );
}

render(<CardLoading />);`;

export const CardShowcase: React.FC = () => (
  <Space direction="vertical" size={24} style={{ width: "100%" }}>
    <Heading2>Card</Heading2>
    <Body1>
      Componente de card para exibir conteúdo agrupado com título, extra e
      diferentes variações visuais.
    </Body1>

    <DemoCard
      title="Básico"
      description="Cards básicos com e sem título."
      code={basicCode}
      preview={
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Card title="Card Básico" style={{ width: "100%", maxWidth: 300 }}>
            <Body1>Conteúdo do card básico.</Body1>
          </Card>
          <Card style={{ width: "100%", maxWidth: 300 }}>
            <Body1>Card sem título.</Body1>
          </Card>
        </Space>
      }
    />

    <DemoCard
      title="Com Extra"
      description="Card com área extra no cabeçalho para ações adicionais."
      code={withExtraCode}
      preview={
        <Card
          title="Card com Extra"
          extra={
            <Button
              type="link"
              icon={<LucideIcons.Settings size={16} />}
              onClick={() => {}}
            >
              Configurar
            </Button>
          }
          style={{ width: "100%", maxWidth: 300 }}
        >
          <Body1>Card com área extra no cabeçalho.</Body1>
        </Card>
      }
    />

    <DemoCard
      title="Hoverable"
      description="Card com efeito hover ao passar o mouse."
      code={hoverableCode}
      preview={
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Card hoverable style={{ width: "100%", maxWidth: 300 }}>
            <Body1>Passe o mouse sobre este card para ver o efeito.</Body1>
          </Card>
          <Card style={{ width: "100%", maxWidth: 300 }}>
            <Body1>Este card não tem efeito hover.</Body1>
          </Card>
        </Space>
      }
    />

    <DemoCard
      title="Borda"
      description="Cards com e sem borda."
      code={borderedCode}
      preview={
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Card title="Card com Borda" bordered style={{ width: "100%", maxWidth: 300 }}>
            <Body1>Card com borda visível (padrão).</Body1>
          </Card>
          <Card title="Card sem Borda" bordered={false} style={{ width: "100%", maxWidth: 300 }}>
            <Body1>Card sem borda.</Body1>
          </Card>
        </Space>
      }
    />

    <DemoCard
      title="Loading"
      description="Card com estado de carregamento."
      code={loadingCode}
      preview={
        <Card title="Card Carregando" loading style={{ width: "100%", maxWidth: 300 }}>
          <Body1>Este conteúdo será exibido após o carregamento.</Body1>
        </Card>
      }
    />
  </Space>
);

