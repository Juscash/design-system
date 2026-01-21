---
type: doc
name: architecture
description: System architecture, layers, patterns, and design decisions
category: architecture
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# 🏗️ Arquitetura do Design System JusCash

> Documentação da arquitetura, padrões e decisões de design do Design System.

## 📁 Estrutura do Projeto

```
packages/design-system/
├── src/
│   ├── components/           # Componentes React
│   │   ├── Button.tsx        # Componente de botão
│   │   ├── Input.tsx         # Campo de entrada
│   │   ├── Select.tsx        # Seletor
│   │   ├── Table.tsx         # Tabela de dados
│   │   ├── index.ts          # Re-exports
│   │   └── ...
│   ├── theme/                # Sistema de tokens
│   │   ├── foundations/      # Tokens primitivos
│   │   │   ├── colors.ts     # Paleta de cores
│   │   │   ├── spacing.ts    # Espaçamentos
│   │   │   ├── radius.ts     # Border radius
│   │   │   ├── shadow.ts     # Box shadows
│   │   │   └── breakpoints.ts
│   │   ├── JuscashProvider.tsx
│   │   ├── global.css
│   │   └── index.ts
│   └── index.ts              # Entry point
├── dist/                     # Build output
├── package.json
├── tsconfig.json
└── tsup.config.ts            # Build config
```

---

## 🧱 Padrão de Componentes

### Arquitetura Base

Todos os componentes seguem o padrão **Wrapper + ConfigProvider**:

```
┌─────────────────────────────────────┐
│         Componente DS JusCash       │
│  ┌───────────────────────────────┐  │
│  │       ConfigProvider          │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │   Componente Antd Base  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Fluxo de Props

```
Props do Usuário
       │
       ▼
┌──────────────────┐
│ Componente DS    │
│  - Valida props  │
│  - Mapeia tipos  │
│  - Gera tokens   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ ConfigProvider   │
│  - Aplica tokens │
│  - Tema local    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Componente Antd  │
│  - Renderiza UI  │
└──────────────────┘
```

---

## 🎨 Sistema de Tokens

### Hierarquia

```
Tokens Primitivos (foundations/)
       │
       ├── colors.ts      → designSystemColors
       ├── spacing.ts     → spacing
       ├── radius.ts      → radius
       └── shadow.ts      → shadow
       │
       ▼
Token Functions (componentes)
       │
       ├── getPrimaryTokens()
       ├── getSecondaryTokens()
       └── getSizeTokens()
       │
       ▼
ConfigProvider theme.components
```

### Tokens → Antd Mapping

| Token DS | Token Antd |
|----------|------------|
| `brand.primary[600]` | `colorPrimary` |
| `brand.primary[800]` | `colorPrimaryHover` |
| `neutral[50]` | `colorTextLightSolid` |
| `neutral[300]` | `colorBgContainerDisabled` |
| `spacing[4]` | `paddingInline` |
| `radius.xl` | `borderRadius` |

---

## 🔧 Decisões de Arquitetura

### ADR-001: Extensão do Ant Design

**Decisão:** Todos os componentes estendem Ant Design ao invés de criar do zero.

**Motivo:**
- Reutiliza comportamentos testados
- Mantém compatibilidade com props existentes
- Acelera desenvolvimento
- Herda acessibilidade

### ADR-002: Mapped Types ao invés de Omit

**Decisão:** Usar mapped types para limpar props do Antd.

```typescript
// ✅ Correto
type CleanAntdProps = {
  [K in keyof AntdProps as K extends "size" ? never : K]: AntdProps[K];
};

// ❌ Evitar
type CleanAntdProps = Omit<AntdProps, "size">;
```

**Motivo:**
- Não quebra tipagem
- Permite manter prop original como opcional
- Maior controle

### ADR-003: ConfigProvider por Componente

**Decisão:** Cada componente tem seu próprio ConfigProvider.

**Motivo:**
- Isolamento de estilos
- Tokens específicos por variante
- Não polui contexto global

---

## 📦 Build e Bundle

### Tecnologias

| Ferramenta | Uso |
|------------|-----|
| `tsup` | Bundler (ESM + CJS) |
| `TypeScript` | Tipagem |
| `React 18+` | Framework |
| `Ant Design` | Componentes base |

### Output

```
dist/
├── index.js      # ESM
├── index.cjs     # CommonJS
├── index.d.ts    # Types
└── ...
```

### Importação

```typescript
// Consumidor
import { Button, Input, designSystemColors } from "@juscash/design-system";
```

---

## 🔗 Dependências Principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| `antd` | 5.x | Componentes base |
| `react` | 18.x | Framework |
| `lucide-react` | latest | Ícones |

---

## 📐 Padrões de Código

### Estrutura de Arquivo

```typescript
"use client";

// 1. Imports externos
import React from "react";
import { Component as AntdComponent, ConfigProvider } from "antd";
import type { ComponentProps as AntdComponentProps } from "antd";

// 2. Imports internos
import { designSystemColors, radius, spacing } from "../theme";

// 3. Types
type CleanAntdProps = { ... };
export type ComponentProps = CleanAntdProps & { ... };

// 4. Token functions
function getPrimaryTokens() { ... }

// 5. Componente
export function Component(props: ComponentProps) { ... }

// 6. displayName
Component.displayName = "Component";
```

### Nomenclatura

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Componente | PascalCase | `Button`, `PageHeader` |
| Props Type | PascalCase + Props | `ButtonProps` |
| Token Function | get + Variante + Tokens | `getPrimaryTokens` |
| Arquivo | PascalCase.tsx | `Button.tsx` |
