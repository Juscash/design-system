import React, { useState } from "react";
import {
  Card,
  Divider,
  Space,
  Segmented,
  Heading2,
  Heading4,
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
        <Divider plain>
          <Body2 style={{ fontWeight: 600 }}>Exemplo interativo</Body2>
        </Divider>
        {showPlayground ? <ButtonPlayground code={code} /> : null}
      </Space>
    </Card>
  );
};

const sizesCode = `import { Segmented, Space, LucideIcons } from '@Juscash/design-system';

export function SegmentedSizes() {
  const options = [
    { label: 'Label', value: 'label', icon: <LucideIcons.Heart /> },
    { label: 'Label', value: 'label2' },
    { label: 'Label', value: 'label3' },
    { label: 'Label', value: 'label4' },
  ];

  return (
    <Space direction="vertical" size="middle">
      <Segmented size="regular" options={options} />
      <Segmented size="large" options={options} />
      <Segmented size="small" options={options} />
    </Space>
  );
}`;

const disabledCode = `import { Segmented, Space } from '@Juscash/design-system';

export function SegmentedDisabled() {
  return (
    <Space direction="vertical" size="small">
      <Segmented options={['Map', 'Transit', 'Satellite']} disabled />
      <Segmented
        options={[
          'Daily',
          { label: 'Weekly', value: 'Weekly', disabled: true },
          'Monthly',
          { label: 'Quarterly', value: 'Quarterly', disabled: true },
          'Yearly',
        ]}
      />
    </Space>
  );
}`;

const iconsCode = `import { Segmented, Space, LucideIcons } from '@Juscash/design-system';

export function SegmentedIcons() {
  const options = [
    { label: 'Favoritos', value: 'fav', icon: <LucideIcons.Heart /> },
    { label: 'Sino', value: 'bell', icon: <LucideIcons.Bell /> },
    { label: 'Config', value: 'settings', icon: <LucideIcons.Settings /> },
  ];

  return (
    <Space direction="vertical">
      <Segmented size="regular" options={options} />
    </Space>
  );
}`;

export const SegmentedShowcase: React.FC = () => (
  <Space direction="vertical" size={24} style={{ width: "100%" }}>
    <Heading2>Segmented</Heading2>
    <Body1>
      Controle de seleção segmentada com tamanhos small, regular e large,
      suporte a ícones e estados desabilitados.
    </Body1>

    <DemoCard
      title="Tamanhos"
      description="Demonstração dos tamanhos small, regular e large."
      code={sizesCode}
      preview={
        <Space vertical size="small">
          <Segmented
            size="middle"
            options={[
              {
                label: "Label",
                value: "label",
                icon: <LucideIcons.Heart size={13} />,
              },
              { label: "Label", value: "label2" },
              { label: "Label", value: "label3" },
              { label: "Label", value: "label4" },
            ]}
          />
          <Segmented
            size="large"
            options={[
              {
                label: "Label",
                value: "l1",
                icon: <LucideIcons.Heart size={13} />,
              },
              { label: "Label", value: "l2" },
              { label: "Label", value: "l3" },
              { label: "Label", value: "l4" },
            ]}
          />
          <Segmented
            size="small"
            options={[
              {
                label: "Label",
                value: "s1",
                icon: <LucideIcons.Heart size={10} />,
              },
              { label: "Label", value: "s2" },
              { label: "Label", value: "s3" },
              { label: "Label", value: "s4" },
            ]}
          />
        </Space>
      }
    />

    <DemoCard
      title="Estados e desabilitados"
      description="Itens e grupos podem ser desabilitados individualmente ou em conjunto."
      code={disabledCode}
      preview={
        <Space direction="vertical" size="small">
          <Segmented options={["Map", "Transit", "Satellite"]} disabled />
          <Segmented
            options={[
              { label: "Daily", value: "Daily" },
              { label: "Weekly", value: "Weekly", disabled: true },
              { label: "Monthly", value: "Monthly" },
              { label: "Quarterly", value: "Quarterly", disabled: true },
              { label: "Yearly", value: "Yearly" },
            ]}
          />
        </Space>
      }
    />

    <DemoCard
      title="Com ícones"
      description="Exemplo com ícones do Lucide para reforçar o significado das opções."
      code={iconsCode}
      preview={
        <Segmented
          size="regular"
          options={[
            {
              label: "Favoritos",
              value: "fav",
              icon: <LucideIcons.Heart size={13} />,
            },
            {
              label: "Sino",
              value: "bell",
              icon: <LucideIcons.Bell size={13} />,
            },
            {
              label: "Config",
              value: "settings",
              icon: <LucideIcons.Settings size={13} />,
            },
          ]}
        />
      }
    />
  </Space>
);
