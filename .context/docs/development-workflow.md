---
type: doc
name: development-workflow
description: Day-to-day engineering processes, branching, and contribution guidelines
category: workflow
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# 🔄 Workflow de Desenvolvimento

> Fluxo de trabalho para criar e manter componentes do Design System JusCash.

---

## 🎯 Fluxo de Criação de Componente

### Visão Geral

```
1. Perguntas    →  2. Design Figma  →  3. Implementação  →  4. Validação  →  5. Export
   (Clarificar)     (Obter specs)       (Código)            (Review)         (Index)
```

### Passo a Passo

#### 1️⃣ Fase de Perguntas

Antes de criar qualquer componente, responder:

| Pergunta | Exemplo |
|----------|---------|
| Nome do componente? | `Avatar` |
| Componente base Antd? | `Avatar` do antd |
| Propósito? | Mostrar foto de usuário |
| Variantes necessárias? | circular, quadrado |
| Props customizadas? | `dsSize`, `bordered` |
| Tem design no Figma? | Link ou nodeId |

#### 2️⃣ Design do Figma (se disponível)

```bash
# 1. Extrair nodeId do link
# figma.com/design/xxx?node-id=123-456 → 123:456

# 2. Usar ferramentas MCP
get_design_context({ nodeId: "123:456" })
get_screenshot({ nodeId: "123:456" })
get_variable_defs({ nodeId: "123:456" })

# 3. Mapear cores/espaçamentos para tokens do DS
```

#### 3️⃣ Implementação

**Localização:** `packages/design-system/src/components/NomeComponente.tsx`

```typescript
"use client";

import React from "react";
import { Componente as AntdComponente, ConfigProvider } from "antd";
import type { ComponenteProps as AntdComponenteProps } from "antd";
import { designSystemColors, radius, spacing } from "../theme";

// Types
type CleanAntdProps = {
  [K in keyof AntdComponenteProps as K extends "size" ? never : K]: AntdComponenteProps[K];
};

export type ComponenteProps = CleanAntdProps & {
  dsSize?: "xs" | "s" | "m" | "l";
};

// Token functions
function getTokens() { ... }

// Component
export function Componente(props: ComponenteProps) {
  return (
    <ConfigProvider theme={{ components: { Componente: getTokens() } }}>
      <AntdComponente {...rest} />
    </ConfigProvider>
  );
}

Componente.displayName = "Componente";
```

#### 4️⃣ Validação

Checklist antes de finalizar:

- [ ] `"use client"` no topo
- [ ] Import do Antd com alias
- [ ] CleanAntdProps usando mapped types
- [ ] Tokens do tema (não cores hardcoded)
- [ ] ConfigProvider envolvendo componente
- [ ] displayName definido

#### 5️⃣ Export no Index

```typescript
// packages/design-system/src/components/index.ts
export * from "./NomeComponente";
```

---

## 📁 Onde Salvar Arquivos

| Tipo | Localização |
|------|-------------|
| Componente | `packages/design-system/src/components/Nome.tsx` |
| Testes | `packages/design-system/src/components/__tests__/Nome.test.tsx` |
| Tokens | `packages/design-system/src/theme/foundations/` |

---

## 🏷️ Commits

Usar padrão **Gitmoji** sem scopes, em português:

```bash
# Novo componente
✨ feat: cria componente Avatar no design system

# Correção
🐛 fix: corrige estilos do Button quando disabled

# Refatoração
♻️ refactor: simplifica lógica de tokens do Input

# Documentação
📚 docs: documenta props do componente Select
```

---

## 🔍 Code Review

### Critérios de Aprovação

| Categoria | Obrigatório |
|-----------|-------------|
| Cor hardcoded | ❌ Bloqueia |
| Sem ConfigProvider | ❌ Bloqueia |
| Omit ao invés de mapped types | ⚠️ Sugestão |
| Sem displayName | ⚠️ Sugestão |
| Export no index | ✅ Obrigatório |

---

## 🔄 Ciclo de Desenvolvimento

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐  │
│  │ Plan │ → │Review│ → │ Exec │ → │Valid │ → │Commit│  │
│  └──────┘   └──────┘   └──────┘   └──────┘   └──────┘  │
│                                                         │
│  Perguntas   Figma     Código     Checklist   PR/Merge │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🧪 Testes

### Executar

```bash
# Todos os testes
npm test

# Específico
npm test Button

# Watch mode
npm test -- --watch
```

### O que testar

1. Renderização básica
2. Todas as variantes
3. Todos os tamanhos (dsSize)
4. Estados (disabled, loading)
5. Eventos (onClick, onChange)

---

## 📦 Build

```bash
# Build normal
npm run build

# Watch mode (dev)
npm run dev
```

### Output esperado

```
dist/
├── index.js      # ESM
├── index.cjs     # CommonJS
├── index.d.ts    # Types
```

---

## 🚀 Publicação

1. Atualizar versão em `package.json`
2. Build: `npm run build`
3. Test: `npm test`
4. Publish: `npm publish`
