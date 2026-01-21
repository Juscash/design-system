---
type: skill
name: Showcase Creation
description: Criar showcases visuais de componentes para o app de documentação JusCash
skillSlug: showcase-creation
phases: [P, E]
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# 🎬 Skill: Showcase Creation

> Criar showcases visuais de componentes para o app de documentação.

## 📍 Localização

Todos os showcases devem ser criados em:

```
apps/docs/src/sections/components/<nome-componente>/index.tsx
```

---

## 📋 Template Completo

```tsx
"use client";

import React, { useState } from "react";
import {
  NomeComponente,
  Card,
  Space,
  Heading2,
  Body1,
  Body2,
} from "@Juscash/design-system";
import { ButtonPlayground } from "../buttons/ButtonPlayground";

// ============================================
// DEMO CARD
// ============================================

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

// ============================================
// CODE EXAMPLES (strings para o playground)
// ============================================

const basicCode = `import { NomeComponente } from '@Juscash/design-system';

function NomeComponenteBasic() {
  return (
    <NomeComponente>
      Conteúdo do componente
    </NomeComponente>
  );
}

render(<NomeComponenteBasic />);`;

const sizesCode = `import { NomeComponente, Space } from '@Juscash/design-system';

function NomeComponenteSizes() {
  return (
    <Space wrap>
      <NomeComponente dsSize="xs">XS</NomeComponente>
      <NomeComponente dsSize="s">S</NomeComponente>
      <NomeComponente dsSize="m">M</NomeComponente>
      <NomeComponente dsSize="l">L</NomeComponente>
    </Space>
  );
}

render(<NomeComponenteSizes />);`;

const statesCode = `import { NomeComponente, Space } from '@Juscash/design-system';

function NomeComponenteStates() {
  return (
    <Space wrap>
      <NomeComponente>Normal</NomeComponente>
      <NomeComponente disabled>Disabled</NomeComponente>
      <NomeComponente loading>Loading</NomeComponente>
    </Space>
  );
}

render(<NomeComponenteStates />);`;

// ============================================
// SHOWCASE
// ============================================

export const NomeComponenteShowcase: React.FC = () => (
  <Space direction="vertical" size={24} style={{ width: "100%" }}>
    <Heading2>NomeComponente</Heading2>
    <Body1>
      Descrição do componente e seu propósito no Design System.
    </Body1>

    <DemoCard
      title="Básico"
      description="Exemplo básico de uso do componente."
      code={basicCode}
      preview={
        <NomeComponente>
          Conteúdo do componente
        </NomeComponente>
      }
    />

    <DemoCard
      title="Tamanhos"
      description="O componente suporta 4 tamanhos: xs, s, m e l."
      code={sizesCode}
      preview={
        <Space wrap>
          <NomeComponente dsSize="xs">XS</NomeComponente>
          <NomeComponente dsSize="s">S</NomeComponente>
          <NomeComponente dsSize="m">M</NomeComponente>
          <NomeComponente dsSize="l">L</NomeComponente>
        </Space>
      }
    />

    <DemoCard
      title="Estados"
      description="Estados disponíveis: normal, disabled, loading."
      code={statesCode}
      preview={
        <Space wrap>
          <NomeComponente>Normal</NomeComponente>
          <NomeComponente disabled>Disabled</NomeComponente>
        </Space>
      }
    />
  </Space>
);
```

---

## 📝 Atualização de Navegação

### 1. Atualizar `navigation.ts`

```typescript
// apps/docs/src/types/navigation.ts

export type ComponentKey =
  | "button"
  | "typography"
  // ... outros
  | "nomecomponente"; // <-- Adicionar aqui (lowercase)
```

### 2. Atualizar `ComponentsSection.tsx`

```typescript
// apps/docs/src/sections/ComponentsSection.tsx

// 1. Adicionar import
import { NomeComponenteShowcase } from "./components/nomecomponente";

// 2. Adicionar condição de renderização
if (selectedComponent === "nomecomponente") {
  return (
    <Space vertical size={16} style={{ width: "100%" }}>
      <Button type="secondary" onClick={() => onSelect(null)}>
        ← Voltar
      </Button>
      <NomeComponenteShowcase />
    </Space>
  );
}

// 3. Adicionar Card na lista
<Card
  hoverable
  style={{ width: 280 }}
  onClick={() => onSelect("nomecomponente")}
>
  <Heading4>NomeComponente</Heading4>
  <Body2 style={{ color: "rgba(0,0,0,0.6)" }}>
    Descrição curta do componente.
  </Body2>
</Card>
```

---

## 🎨 Demos Recomendadas

Cada showcase deve incluir demos para:

| Demo | Descrição | Obrigatório |
|------|-----------|-------------|
| **Básico** | Exemplo mínimo de uso | ✅ Sim |
| **Tamanhos** | dsSize: xs, s, m, l | ✅ Se aplicável |
| **Variantes** | type: primary, secondary... | ✅ Se aplicável |
| **Estados** | disabled, loading, error | ✅ Se aplicável |
| **Com ícones** | Usando LucideIcons | Opcional |
| **Composição** | Combinação com outros | Opcional |

---

## ✅ Checklist de Showcase

Antes de finalizar:

- [ ] Arquivo criado em `apps/docs/src/sections/components/<nome>/index.tsx`
- [ ] Import de `ButtonPlayground` para playground interativo
- [ ] DemoCard com `title`, `description`, `code`, `preview`
- [ ] Código como string (template literals) para cada demo
- [ ] Export nomeado: `export const <Nome>Showcase`
- [ ] `ComponentKey` adicionado em `navigation.ts`
- [ ] Import adicionado em `ComponentsSection.tsx`
- [ ] Condição `if (selectedComponent === "nome")` adicionada
- [ ] Card adicionado na lista de componentes
- [ ] Projeto compila sem erros (`npm run dev`)

---

## 🔧 Estrutura de Pastas

```
apps/docs/src/sections/components/
├── buttons/
│   ├── index.tsx           # ButtonsShowcase
│   └── ButtonPlayground.tsx # Playground reutilizável
├── card/
│   └── index.tsx           # CardShowcase
├── input/
│   └── index.tsx           # InputShowcase
└── nomecomponente/         # <-- Nova pasta
    └── index.tsx           # NomeComponenteShowcase
```

---

## 📖 Referências

- [Architecture](../../docs/architecture.md) - Padrão de componentes
- [Documentation Skill](../documentation/SKILL.md) - Template de props
- [Development Workflow](../../docs/development-workflow.md) - Fluxo de trabalho
