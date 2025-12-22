import React, { useState } from "react";
import {
  Space,
  Card,
  Divider,
  Button,
  Heading2,
  Heading4,
  Heading1,
  Heading3,
  Heading5,
  Heading6,
  Body1,
  Body2,
  Caption,
} from "@Juscash/design-system";
import { ButtonPlayground as CodePlayground } from "../buttons/ButtonPlayground";

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
        <Button type="link" onClick={() => setShowPlayground((prev) => !prev)}>
          {showPlayground ? "Ocultar exemplo" : "Exemplo interativo"}
        </Button>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Body1>{description}</Body1>
        {preview}
        <Divider plain>
          <Body2 style={{ fontWeight: 600 }}>Exemplo interativo</Body2>
        </Divider>
        {showPlayground ? <CodePlayground code={code} /> : null}
      </Space>
    </Card>
  );
};

const headingsCode = `import {
  Heading1, Heading2, Heading3,
  Heading4, Heading5, Heading6
} from '@Juscash/design-system';

export function HeadingSamples() {
  return (
    <>
      <Heading1>Heading 1</Heading1>
      <Heading2>Heading 2</Heading2>
      <Heading3>Heading 3</Heading3>
      <Heading4>Heading 4</Heading4>
      <Heading5>Heading 5</Heading5>
      <Heading6>Heading 6</Heading6>
    </>
  );
}`;

const bodyCode = `import { Body1, Body2 } from '@Juscash/design-system';

export function BodySamples() {
  return (
    <>
      <Body1>Texto base para parágrafos e descrições principais.</Body1>
      <Body2>Texto secundário para apoio e legendas curtas.</Body2>
    </>
  );
}`;

const captionCode = `import { Caption } from '@Juscash/design-system';

export function CaptionSample() {
  return <Caption>Legenda e microcópia.</Caption>;
}`;

export const TypographySection: React.FC = () => (
  <Space direction="vertical" size={24} style={{ width: "100%" }}>
    <Heading2>Typography</Heading2>
    <Body1>
      Componentes tipográficos com tokens e tamanhos padronizados (Heading,
      Body e Caption). Use estes estilos para garantir consistência entre
      páginas.
    </Body1>

    <DemoCard
      title="Headings"
      description="Títulos hierárquicos H1–H6 com peso forte e espaçamentos alinhados ao design system."
      code={headingsCode}
      preview={
        <Space direction="vertical" size={4}>
          <Heading1>Heading 1</Heading1>
          <Heading2>Heading 2</Heading2>
          <Heading3>Heading 3</Heading3>
          <Heading4>Heading 4</Heading4>
          <Heading5>Heading 5</Heading5>
          <Heading6>Heading 6</Heading6>
        </Space>
      }
    />

    <DemoCard
      title="Body"
      description="Corpo de texto primário (Body1) e secundário (Body2) para conteúdos e descrições."
      code={bodyCode}
      preview={
        <Space direction="vertical" size={4}>
          <Body1>Texto base para parágrafos e descrições principais.</Body1>
          <Body2>Texto secundário para apoio e legendas curtas.</Body2>
        </Space>
      }
    />

    <DemoCard
      title="Caption"
      description="Uso para legendas, labels menores e microcópia contextual."
      code={captionCode}
      preview={
        <Space direction="vertical" size={4}>
          <Caption>Legenda e microcópia.</Caption>
        </Space>
      }
    />
  </Space>
);

