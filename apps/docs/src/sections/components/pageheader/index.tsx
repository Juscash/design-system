"use client";

import React, { useState } from "react";
import {
  PageHeader,
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
    <div style={{ width: "100%" }}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div>
          <Heading2 style={{ marginBottom: 8 }}>{title}</Heading2>
          <Body1>{description}</Body1>
        </div>
        {preview}
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
        {showPlayground ? <ButtonPlayground code={code} /> : null}
      </Space>
    </div>
  );
};

const PAGE_TEXTS = {
  title: "Análises IA",
  description:
    "Importe os processos que deseja analisar. A importação não envia os processos para análise, após esse passo, você decide quais seguirão para Análise IA ou humana.",
} as const;

const withActionCode = `import { PageHeader, Button, LucideIcons } from '@Juscash/design-system';

const PAGE_TEXTS = {
  title: "Análises IA",
  description:
    "Importe os processos que deseja analisar. A importação não envia os processos para análise, após esse passo, você decide quais seguirão para Análise IA ou humana.",
} as const;

function PageHeaderWithAction() {
  const handleNovaAnalise = () => {
    console.log('Importar processos');
  };

  return (
    <PageHeader
      title={PAGE_TEXTS.title}
      description={PAGE_TEXTS.description}
      action={
        <Button
          type="secondary"
          icon={<LucideIcons.Plus size={16} />}
          onClick={handleNovaAnalise}
        >
          Importar processos
        </Button>
      }
    />
  );
}

render(<PageHeaderWithAction />);`;

const withoutActionCode = `import { PageHeader } from '@Juscash/design-system';

const PAGE_TEXTS = {
  title: "Análises IA",
  description:
    "Importe os processos que deseja analisar. A importação não envia os processos para análise, após esse passo, você decide quais seguirão para Análise IA ou humana.",
} as const;

function PageHeaderWithoutAction() {
  return (
    <PageHeader
      title={PAGE_TEXTS.title}
      description={PAGE_TEXTS.description}
    />
  );
}

render(<PageHeaderWithoutAction />);`;

export const PageHeaderShowcase: React.FC = () => {
  const handleNovaAnalise = () => {
    console.log("Importar processos");
  };

  return (
    <Space direction="vertical" size={24} style={{ width: "100%" }}>
      <Heading2>PageHeader</Heading2>
      <Body1>
        Componente de cabeçalho de página com título, descrição e ação opcional.
        Ideal para páginas que precisam de um cabeçalho consistente com ações
        contextuais.
      </Body1>

      <DemoCard
        title="Com Action"
        description="PageHeader com botão de ação no lado direito."
        code={withActionCode}
        preview={
          <PageHeader
            title={PAGE_TEXTS.title}
            description={PAGE_TEXTS.description}
            action={
              <Button
                type="secondary"
                icon={<LucideIcons.Plus size={16} />}
                onClick={handleNovaAnalise}
              >
                Importar processos
              </Button>
            }
          />
        }
      />

      <DemoCard
        title="Sem Action"
        description="PageHeader apenas com título e descrição, sem ação."
        code={withoutActionCode}
        preview={
          <PageHeader
            title={PAGE_TEXTS.title}
            description={PAGE_TEXTS.description}
          />
        }
      />
    </Space>
  );
};

