---
type: skill
name: component-creation
description: Criar componentes do Design System com pasta dedicada, story/test obrigatorios e tokens do tema
skillSlug: component-creation
phases: [P, E]
mode: false
generated: 2026-01-26
status: filled
scaffoldVersion: "2.0.0"
---

# 🎨 Skill: Component Creation

> Criar componentes para o Design System JusCash estendendo Ant Design.

## Perguntas ao usuario

- Sempre que precisar de uma decisao do usuario, faca uma pergunta com opcoes usando selecao (lista de escolhas).
- Evite pedir resposta livre.

## 🎯 Objetivo

Criar componentes React/TypeScript que:
- Estendem componentes do Ant Design
- Usam tokens do Design System JusCash
- Seguem o Figma como fonte da verdade
- Sempre incluem story e test

## 🧩 Skills relacionadas

- `figma-mcp` (extrair specs antes de implementar)
- `story-creation` (criar stories)
- `test-creation` (criar testes)
- `run-tests` (executar testes)

---

## 📍 Localizacao

Todos os componentes devem ser criados em:

```
packages/design-system/src/components/NomeComponente/
├── NomeComponente.tsx
├── NomeComponente.stories.tsx
├── NomeComponente.test.tsx
└── index.ts
```

---

## 📋 Template Completo

```typescript
// packages/design-system/src/components/NomeComponente/NomeComponente.tsx
"use client";

import React from "react";
import {
  NomeComponente as AntdNomeComponente,
  ConfigProvider,
} from "antd";
import type { NomeComponenteProps as AntdNomeComponenteProps } from "antd";
import type { ComponentToken } from "antd/es/nome-componente/style/token";
import { designSystemColors, radius, spacing } from "../../theme";

// ============================================
// TYPES
// ============================================

type NomeComponenteSize = "xs" | "s" | "m" | "l";
type NomeComponenteVariant = "primary" | "secondary" | "neutral";

// Usar mapped types ao inves de Omit
type CleanAntdProps = {
  [K in keyof AntdNomeComponenteProps as K extends "size" | "type"
    ? never
    : K]: AntdNomeComponenteProps[K];
};

export type NomeComponenteProps = CleanAntdProps & {
  dsSize?: NomeComponenteSize;
  size?: AntdNomeComponenteProps["size"];
  variant?: NomeComponenteVariant;
};

// ============================================
// TOKEN FUNCTIONS
// ============================================

function getPrimaryTokens(): Partial<ComponentToken> {
  return {
    colorPrimary: designSystemColors.brand.primary[600],
    colorPrimaryHover: designSystemColors.brand.primary[800],
    colorPrimaryActive: designSystemColors.brand.primary[800],
    colorTextLightSolid: designSystemColors.neutral[50],
    colorBgContainerDisabled: designSystemColors.neutral[300],
    colorTextDisabled: designSystemColors.neutral[400],
  };
}

function getSecondaryTokens(): Partial<ComponentToken> {
  return {
    colorPrimary: designSystemColors.brand.secondary[700],
    colorPrimaryHover: designSystemColors.brand.secondary[800],
    colorPrimaryActive: designSystemColors.brand.secondary[800],
    colorTextLightSolid: designSystemColors.neutral[50],
    colorBgContainerDisabled: designSystemColors.neutral[300],
    colorTextDisabled: designSystemColors.neutral[400],
  };
}

function getNeutralTokens(): Partial<ComponentToken> {
  return {
    colorPrimary: designSystemColors.neutral[200],
    colorPrimaryHover: designSystemColors.neutral[400],
    colorPrimaryActive: designSystemColors.neutral[400],
    colorTextLightSolid: designSystemColors.neutral[800],
    colorBgContainerDisabled: designSystemColors.neutral[300],
    colorTextDisabled: designSystemColors.neutral[400],
  };
}

function getSizeTokens(dsSize?: NomeComponenteSize): Partial<ComponentToken> {
  switch (dsSize) {
    case "xs":
      return {
        fontSize: 10,
        controlHeight: 24,
        paddingInline: spacing[2],
        borderRadius: radius.md,
      };
    case "s":
      return {
        fontSize: 13,
        controlHeight: 32,
        paddingInline: spacing[3],
        borderRadius: radius.xl,
      };
    case "l":
      return {
        fontSize: 14,
        controlHeight: 44,
        paddingInline: spacing[5],
        borderRadius: radius.xl,
      };
    case "m":
    default:
      return {
        fontSize: 13,
        controlHeight: 36,
        paddingInline: spacing[4],
        borderRadius: radius.xl,
      };
  }
}

// ============================================
// COMPONENT
// ============================================

export function NomeComponente(props: NomeComponenteProps): React.ReactElement {
  const { variant = "primary", dsSize = "m", size, ...rest } = props;

  const resolvedSize = size ? mapAntdSize(size) : dsSize;
  const sizeTokens = getSizeTokens(resolvedSize);

  const getVariantTokens = () => {
    switch (variant) {
      case "secondary":
        return getSecondaryTokens();
      case "neutral":
        return getNeutralTokens();
      case "primary":
      default:
        return getPrimaryTokens();
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          NomeComponente: { ...getVariantTokens(), ...sizeTokens },
        },
      }}
    >
      <AntdNomeComponente {...rest} />
    </ConfigProvider>
  );
}

NomeComponente.displayName = "NomeComponente";

// ============================================
// HELPERS
// ============================================

function mapAntdSize(size: AntdNomeComponenteProps["size"]): NomeComponenteSize {
  switch (size) {
    case "small":
      return "xs";
    case "middle":
      return "s";
    case "large":
      return "l";
    default:
      return "m";
  }
}
```

```typescript
// packages/design-system/src/components/NomeComponente/index.ts
export * from "./NomeComponente";
```

```typescript
// packages/design-system/src/components/NomeComponente/NomeComponente.stories.tsx
// Storybook baseado no Figma, cobrindo props principais e props criadas
```

```typescript
// packages/design-system/src/components/NomeComponente/NomeComponente.test.tsx
// React Testing Library + Vitest
```

---

## 🎨 Tokens Disponiveis

### Cores

```typescript
// Brand
designSystemColors.brand.primary[50-900]   // Verde JusCash
designSystemColors.brand.secondary[50-900] // Azul

// Neutral
designSystemColors.neutral[50-900]         // Cinzas

// Feedback
designSystemColors.feedback.green[50,500,900]
designSystemColors.feedback.red[50,500,900]
designSystemColors.feedback.yellow[50,500,900]
designSystemColors.feedback.blue[50,500,900]
designSystemColors.feedback.orange[50,500,900]
```

### Spacing

```typescript
spacing[1] = 4    // 4px
spacing[2] = 8    // 8px
spacing[3] = 12   // 12px
spacing[4] = 16   // 16px
spacing[5] = 20   // 20px
spacing[6] = 24   // 24px
spacing[7] = 28   // 28px
spacing[8] = 32   // 32px
spacing[10] = 40  // 40px
spacing[12] = 48  // 48px
```

### Radius

```typescript
radius.md = 4       // 4px
radius.xl = 8       // 8px
radius["2xl"] = 12  // 12px
radius["3xl"] = 16  // 16px
radius.full = 9999  // Circular
```

### Shadow

```typescript
shadow.xs          // Sombra extra pequena
shadow.s           // Sombra pequena
shadow.m           // Sombra média
shadow.l           // Sombra grande
shadow.xl          // Sombra extra grande
shadow.focus       // Focus ring
shadow.focusError  // Focus ring de erro
```

---

## ✅ Checklist Final

Antes de finalizar o componente:

- [ ] Pasta criada em `packages/design-system/src/components/NomeComponente/`
- [ ] Arquivos `NomeComponente.tsx`, `NomeComponente.stories.tsx`, `NomeComponente.test.tsx`, `index.ts`
- [ ] `"use client"` no topo
- [ ] Import do Antd com alias (`as AntdComponente`)
- [ ] Types usando mapped types (não Omit)
- [ ] Props exportadas
- [ ] Token functions para cada variante
- [ ] ConfigProvider envolvendo componente
- [ ] `displayName` definido
- [ ] Export adicionado em `components/index.ts`
- [ ] Story baseado no Figma com props principais e props criadas
- [ ] Test com RTL + Vitest cobrindo render e variacao do Figma
- [ ] Stories criadas via `story-creation`
- [ ] Testes criados via `test-creation`
- [ ] Testes executados via `run-tests`

---

## 🔄 Atualizar Index

Após criar o componente, adicionar em:

```typescript
// packages/design-system/src/components/index.ts
export * from "./NomeComponente";
```

---

## 🖼️ Integração com Figma

Se tiver design no Figma, usar as ferramentas MCP:

1. **`get_design_context`** - Obter código do design
2. **`get_screenshot`** - Ver preview do componente
3. **`get_variable_defs`** - Mapear variáveis do Figma

Extrair nodeId do link: `figma.com/design/xxx?node-id=123-456` → `123:456`
