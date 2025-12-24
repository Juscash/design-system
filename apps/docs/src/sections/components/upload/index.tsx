"use client";

import React, { useState } from "react";
import {
  Card,
  Space,
  Upload,
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

const verticalSizesCode = `import { Upload, Space } from '@Juscash/design-system';

function UploadVerticalSizes() {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <p>Extra Small (xs)</p>
        <Upload
          layout="vertical"
          dsSize="xs"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        />
      </div>
      <div>
        <p>Small (s)</p>
        <Upload
          layout="vertical"
          dsSize="s"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        />
      </div>
      <div>
        <p>Medium (m)</p>
        <Upload
          layout="vertical"
          dsSize="m"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        />
      </div>
      <div>
        <p>Large (l)</p>
        <Upload
          layout="vertical"
          dsSize="l"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        />
      </div>
    </Space>
  );
}

render(<UploadVerticalSizes />);`;

const horizontalSizesCode = `import { Upload, Space } from '@Juscash/design-system';

function UploadHorizontalSizes() {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <p>Extra Small (xs)</p>
        <Upload
          layout="horizontal"
          dsSize="xs"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        />
      </div>
      <div>
        <p>Small (s)</p>
        <Upload
          layout="horizontal"
          dsSize="s"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        />
      </div>
      <div>
        <p>Medium (m)</p>
        <Upload
          layout="horizontal"
          dsSize="m"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        />
      </div>
      <div>
        <p>Large (l)</p>
        <Upload
          layout="horizontal"
          dsSize="l"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        />
      </div>
    </Space>
  );
}

render(<UploadHorizontalSizes />);`;

const verticalBasicCode = `import { Upload, Space } from '@Juscash/design-system';

function UploadVerticalBasic() {
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Upload
        layout="vertical"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      />
    </Space>
  );
}

render(<UploadVerticalBasic />);`;

const horizontalBasicCode = `import { Upload, Space } from '@Juscash/design-system';

function UploadHorizontalBasic() {
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Upload
        layout="horizontal"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      />
    </Space>
  );
}

render(<UploadHorizontalBasic />);`;

export const UploadShowcase: React.FC = () => (
  <Space direction="vertical" size={24} style={{ width: "100%" }}>
    <Heading2>Upload</Heading2>
    <Body1>
      Componente de upload de arquivos com suporte a layouts vertical e
      horizontal, além de 4 tamanhos customizados (xs, s, m, l).
    </Body1>

    <DemoCard
      title="Layout Vertical - Tamanhos"
      description="Demonstração do layout vertical com todos os tamanhos disponíveis (xs, s, m, l)."
      code={verticalSizesCode}
      preview={
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Body2 style={{ marginBottom: 8 }}>Extra Small (xs)</Body2>
            <Upload
              layout="vertical"
              dsSize="xs"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            />
          </div>
          <div>
            <Body2 style={{ marginBottom: 8 }}>Small (s)</Body2>
            <Upload
              layout="vertical"
              dsSize="s"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            />
          </div>
          <div>
            <Body2 style={{ marginBottom: 8 }}>Medium (m)</Body2>
            <Upload
              layout="vertical"
              dsSize="m"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            />
          </div>
          <div>
            <Body2 style={{ marginBottom: 8 }}>Large (l)</Body2>
            <Upload
              layout="vertical"
              dsSize="l"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            />
          </div>
        </Space>
      }
    />

    <DemoCard
      title="Layout Horizontal - Tamanhos"
      description="Demonstração do layout horizontal com todos os tamanhos disponíveis (xs, s, m, l). Os arquivos aparecem lado a lado."
      code={horizontalSizesCode}
      preview={
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Body2 style={{ marginBottom: 8 }}>Extra Small (xs)</Body2>
            <Upload
              layout="horizontal"
              dsSize="xs"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            />
          </div>
          <div>
            <Body2 style={{ marginBottom: 8 }}>Small (s)</Body2>
            <Upload
              layout="horizontal"
              dsSize="s"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            />
          </div>
          <div>
            <Body2 style={{ marginBottom: 8 }}>Medium (m)</Body2>
            <Upload
              layout="horizontal"
              dsSize="m"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            />
          </div>
          <div>
            <Body2 style={{ marginBottom: 8 }}>Large (l)</Body2>
            <Upload
              layout="horizontal"
              dsSize="l"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            />
          </div>
        </Space>
      }
    />

    <DemoCard
      title="Layout Vertical - Básico"
      description="Exemplo básico do layout vertical (padrão)."
      code={verticalBasicCode}
      preview={
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Upload
            layout="vertical"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          />
        </Space>
      }
    />

    <DemoCard
      title="Layout Horizontal - Básico"
      description="Exemplo básico do layout horizontal. Os arquivos aparecem lado a lado."
      code={horizontalBasicCode}
      preview={
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Upload
            layout="horizontal"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          />
        </Space>
      }
    />
  </Space>
);
