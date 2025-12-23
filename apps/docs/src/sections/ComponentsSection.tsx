import React from "react";
import {
  Heading2,
  Heading4,
  Body1,
  Body2,
  Space,
  Card,
  Button,
} from "@Juscash/design-system";
import type { ComponentKey } from "../types/navigation";
import { ButtonsShowcase } from "./components/buttons";
import { TypographySection } from "./components/typography";
import { SegmentedShowcase } from "./components/segmented";
import { CheckboxShowcase } from "./components/checkbox";
import { RadioShowcase } from "./components/radio";
import { SwitchShowcase } from "./components/switch";
import { TagShowcase } from "./components/tag";
import { InputShowcase } from "./components/input";
import { CardShowcase } from "./components/card";

export interface ComponentsSectionProps {
  selectedComponent: ComponentKey | null;
  onSelect: (component: ComponentKey | null) => void;
}

export const ComponentsSection: React.FC<ComponentsSectionProps> = ({
  selectedComponent,
  onSelect,
}) => {
  if (selectedComponent === "button") {
    return (
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Button type="secondary" onClick={() => onSelect(null)}>
          ← Voltar
        </Button>
        <ButtonsShowcase />
      </Space>
    );
  }

  if (selectedComponent === "typography") {
    return (
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Button type="secondary" onClick={() => onSelect(null)}>
          ← Voltar
        </Button>
        <TypographySection />
      </Space>
    );
  }

  if (selectedComponent === "segmented") {
    return (
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Button type="secondary" onClick={() => onSelect(null)}>
          ← Voltar
        </Button>
        <SegmentedShowcase />
      </Space>
    );
  }

  if (selectedComponent === "checkbox") {
    return (
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Button type="secondary" onClick={() => onSelect(null)}>
          ← Voltar
        </Button>
        <CheckboxShowcase />
      </Space>
    );
  }

  if (selectedComponent === "radio") {
    return (
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Button type="secondary" onClick={() => onSelect(null)}>
          ← Voltar
        </Button>
        <RadioShowcase />
      </Space>
    );
  }

  if (selectedComponent === "switch") {
    return (
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Button type="secondary" onClick={() => onSelect(null)}>
          ← Voltar
        </Button>
        <SwitchShowcase />
      </Space>
    );
  }

  if (selectedComponent === "tag") {
    return (
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Button type="secondary" onClick={() => onSelect(null)}>
          ← Voltar
        </Button>
        <TagShowcase />
      </Space>
    );
  }

  if (selectedComponent === "input") {
    return (
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Button type="secondary" onClick={() => onSelect(null)}>
          ← Voltar
        </Button>
        <InputShowcase />
      </Space>
    );
  }

  if (selectedComponent === "card") {
    return (
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Button type="secondary" onClick={() => onSelect(null)}>
          ← Voltar
        </Button>
        <CardShowcase />
      </Space>
    );
  }

  return (
    <Space direction="vertical" size={24} style={{ width: "100%" }}>
      <div>
        <Heading2>Componentes</Heading2>
        <Body1>
          Explore os componentes disponíveis. Clique para visualizar detalhes,
          tokens e exemplos completos.
        </Body1>
      </div>
      <Space size="large" wrap>
        <Card
          hoverable
          style={{ width: 280 }}
          onClick={() => onSelect("button")}
        >
          <Heading4>Button</Heading4>
          <Body2 style={{ color: "rgba(0,0,0,0.6)" }}>
            Botões baseados em Ant Design com variantes proprietárias.
          </Body2>
        </Card>
        <Card
          hoverable
          style={{ width: 280 }}
          onClick={() => onSelect("typography")}
        >
          <Heading4>Typography</Heading4>
          <Body2 style={{ color: "rgba(0,0,0,0.6)" }}>
            Hierarquia de títulos, textos e legendas padronizados.
          </Body2>
        </Card>
        <Card
          hoverable
          style={{ width: 280 }}
          onClick={() => onSelect("segmented")}
        >
          <Heading4>Segmented</Heading4>
          <Body2 style={{ color: "rgba(0,0,0,0.6)" }}>
            Seletores segmentados com tamanhos e ícones.
          </Body2>
        </Card>
        <Card
          hoverable
          style={{ width: 280 }}
          onClick={() => onSelect("checkbox")}
        >
          <Heading4>Checkbox</Heading4>
          <Body2 style={{ color: "rgba(0,0,0,0.6)" }}>
            Caixa de seleção padrão com estados checked e unchecked.
          </Body2>
        </Card>
        <Card
          hoverable
          style={{ width: 280 }}
          onClick={() => onSelect("radio")}
        >
          <Heading4>Radio</Heading4>
          <Body2 style={{ color: "rgba(0,0,0,0.6)" }}>
            Seleção única com estados básico, desabilitado, erro e grupo.
          </Body2>
        </Card>
        <Card
          hoverable
          style={{ width: 280 }}
          onClick={() => onSelect("switch")}
        >
          <Heading4>Switch</Heading4>
          <Body2 style={{ color: "rgba(0,0,0,0.6)" }}>
            Interruptor on/off com estados normal, erro e desabilitado.
          </Body2>
        </Card>
        <Card hoverable style={{ width: 280 }} onClick={() => onSelect("tag")}>
          <Heading4>Tag</Heading4>
          <Body2 style={{ color: "rgba(0,0,0,0.6)" }}>
            Rótulos com variações padrão, sucesso, aviso e erro.
          </Body2>
        </Card>
        <Card
          hoverable
          style={{ width: 280 }}
          onClick={() => onSelect("input")}
        >
          <Heading4>Input</Heading4>
          <Body2 style={{ color: "rgba(0,0,0,0.6)" }}>
            Campo de entrada com tamanhos xs, s, m, l e estados variados.
          </Body2>
        </Card>
        <Card
          hoverable
          style={{ width: 280 }}
          onClick={() => onSelect("card")}
        >
          <Heading4>Card</Heading4>
          <Body2 style={{ color: "rgba(0,0,0,0.6)" }}>
            Componente de card para exibir conteúdo agrupado com título e extra.
          </Body2>
        </Card>
      </Space>
    </Space>
  );
};
