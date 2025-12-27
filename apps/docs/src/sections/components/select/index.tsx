"use client";

import React, { useState } from "react";
import {
  Card,
  Space,
  Select,
  Heading2,
  Body1,
  Body2,
  Row,
  Col,
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

const selectSizesCode = `import { Select, Space, Row, Col } from '@Juscash/design-system';

const options = [
  { value: '1', label: 'Opção 1' },
  { value: '2', label: 'Opção 2' },
  { value: '3', label: 'Opção 3' },
];

function SelectSizes() {
  return (
    <Space direction="vertical" size="middle">
      <Row gutter={16}>
        <Col span={12}>
          <Select placeholder="Extra small" dsSize="xs" options={options} style={{ width: '100%' }} />
        </Col>
        <Col span={12}>
          <Select placeholder="Extra small múltiplo" dsSize="xs" mode="multiple" options={options} style={{ width: '100%' }} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Select placeholder="Small" dsSize="s" options={options} style={{ width: '100%' }} />
        </Col>
        <Col span={12}>
          <Select placeholder="Small múltiplo" dsSize="s" mode="multiple" options={options} style={{ width: '100%' }} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Select placeholder="Medium" dsSize="m" options={options} style={{ width: '100%' }} />
        </Col>
        <Col span={12}>
          <Select placeholder="Medium múltiplo" dsSize="m" mode="multiple" options={options} style={{ width: '100%' }} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Select placeholder="Large" dsSize="l" options={options} style={{ width: '100%' }} />
        </Col>
        <Col span={12}>
          <Select placeholder="Large múltiplo" dsSize="l" mode="multiple" options={options} style={{ width: '100%' }} />
        </Col>
      </Row>
    </Space>
  );
}

render(<SelectSizes />);`;

const selectStatesCode = `import { Select, Space, Row, Col } from '@Juscash/design-system';

const options = [
  { value: '1', label: 'Opção 1' },
  { value: '2', label: 'Opção 2' },
  { value: '3', label: 'Opção 3' },
];

function SelectStates() {
  return (
    <Space direction="vertical" size="middle">
      <Row gutter={16}>
        <Col span={12}>
          <Select placeholder="Select normal" options={options} style={{ width: '100%' }} />
        </Col>
        <Col span={12}>
          <Select placeholder="Select normal múltiplo" mode="multiple" options={options} style={{ width: '100%' }} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Select placeholder="Select desabilitado" disabled options={options} style={{ width: '100%' }} />
        </Col>
        <Col span={12}>
          <Select placeholder="Select desabilitado múltiplo" disabled mode="multiple" options={options} style={{ width: '100%' }} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Select placeholder="Select com erro" status="error" options={options} style={{ width: '100%' }} />
        </Col>
        <Col span={12}>
          <Select placeholder="Select com erro múltiplo" status="error" mode="multiple" options={options} style={{ width: '100%' }} />
        </Col>
      </Row>
    </Space>
  );
}

render(<SelectStates />);`;

const selectFeaturesCode = `import { Select, Space, Row, Col } from '@Juscash/design-system';

const optionsWithSearch = [
  { value: '1', label: 'Opção 1' },
  { value: '2', label: 'Opção 2' },
  { value: '3', label: 'Opção 3' },
];

const optionsWithDisabled = [
  { value: '1', label: 'Opção 1' },
  { value: '2', label: 'Opção 2 (desabilitada)', disabled: true },
  { value: '3', label: 'Opção 3' },
  { value: '4', label: 'Opção 4 (desabilitada)', disabled: true },
];

function SelectFeatures() {
  return (
    <Space direction="vertical" size="middle">
      <Row gutter={16}>
        <Col span={12}>
          <Select 
            placeholder="Select com busca" 
            showSearch 
            options={optionsWithSearch}
            style={{ width: '100%' }}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        </Col>
        <Col span={12}>
          <Select 
            placeholder="Select com busca múltiplo" 
            showSearch 
            mode="multiple"
            options={optionsWithSearch}
            style={{ width: '100%' }}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Select 
            placeholder="Select com opção desabilitada" 
            options={optionsWithDisabled}
            style={{ width: '100%' }} 
          />
        </Col>
        <Col span={12}>
          <Select 
            placeholder="Select com opção desabilitada múltiplo" 
            mode="multiple"
            options={optionsWithDisabled}
            style={{ width: '100%' }} 
          />
        </Col>
      </Row>
    </Space>
  );
}

render(<SelectFeatures />);`;

const options = [
  { value: "1", label: "Opção 1" },
  { value: "2", label: "Opção 2" },
  { value: "3", label: "Opção 3" },
];

const optionsWithDisabled = [
  { value: "1", label: "Opção 1" },
  { value: "2", label: "Opção 2 (desabilitada)", disabled: true },
  { value: "3", label: "Opção 3" },
  { value: "4", label: "Opção 4 (desabilitada)", disabled: true },
];

export const SelectShowcase: React.FC = () => (
  <Space direction="vertical" size={24} style={{ width: "100%" }}>
    <Heading2>Select</Heading2>
    <Body1>
      Componente de seleção com tamanhos customizados (xs, s, m, l), estados
      ativo, desabilitado e erro, além de suporte a busca e opções
      desabilitadas.
    </Body1>

    <DemoCard
      title="Tamanhos"
      description="Demonstração dos tamanhos xs, s, m e l."
      code={selectSizesCode}
      preview={
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Row gutter={16}>
            <Col span={12}>
              <Select
                placeholder="Extra small"
                dsSize="xs"
                options={options}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={12}>
              <Select
                placeholder="Extra small múltiplo"
                dsSize="xs"
                mode="multiple"
                options={options}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Select
                placeholder="Small"
                dsSize="s"
                options={options}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={12}>
              <Select
                placeholder="Small múltiplo"
                dsSize="s"
                mode="multiple"
                options={options}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Select
                placeholder="Medium"
                dsSize="m"
                options={options}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={12}>
              <Select
                placeholder="Medium múltiplo"
                dsSize="m"
                mode="multiple"
                options={options}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Select
                placeholder="Large"
                dsSize="l"
                options={options}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={12}>
              <Select
                placeholder="Large múltiplo"
                dsSize="l"
                mode="multiple"
                options={options}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </Space>
      }
    />

    <DemoCard
      title="Estados"
      description="Select normal, desabilitado e com erro."
      code={selectStatesCode}
      preview={
        <Space direction="vertical" size="middle">
          <Row gutter={16}>
            <Col span={12}>
              <Select
                placeholder="Select normal"
                options={options}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={12}>
              <Select
                placeholder="Select normal múltiplo"
                mode="multiple"
                options={options}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Select
                placeholder="Select desabilitado"
                disabled
                options={options}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={12}>
              <Select
                placeholder="Select desabilitado múltiplo"
                disabled
                mode="multiple"
                options={options}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Select
                placeholder="Select com erro"
                status="error"
                options={options}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={12}>
              <Select
                placeholder="Select com erro múltiplo"
                status="error"
                mode="multiple"
                options={options}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </Space>
      }
    />

    <DemoCard
      title="Features"
      description="Select com busca habilitada e opções desabilitadas."
      code={selectFeaturesCode}
      preview={
        <Space direction="vertical" size="middle">
          <Row gutter={16}>
            <Col span={12}>
              <Select
                placeholder="Select com busca"
                showSearch
                options={options}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={12}>
              <Select
                placeholder="Select com busca múltiplo"
                showSearch
                mode="multiple"
                options={options}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Select
                placeholder="Select com opção desabilitada"
                options={optionsWithDisabled}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={12}>
              <Select
                placeholder="Select com opção desabilitada múltiplo"
                mode="multiple"
                options={optionsWithDisabled}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </Space>
      }
    />
  </Space>
);
