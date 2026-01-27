---
type: doc
name: project-overview
description: High-level description of the project, goals, and scope
category: overview
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# 🎨 JusCash Design System

> Sistema de design unificado para produtos JusCash, construído sobre Ant Design.

## 📋 Visão Geral

O **JusCash Design System** é uma biblioteca de componentes React/TypeScript que:

- Estende componentes do **Ant Design 6.x**
- Aplica a identidade visual JusCash via **tokens de design**
- Garante consistência entre todos os produtos da empresa
- Oferece APIs simplificadas e tipagem completa

---

## 🎯 Objetivos

| Objetivo | Descrição |
|----------|-----------|
| **Consistência** | UI padronizada em todos os produtos JusCash |
| **Produtividade** | Componentes prontos para uso, reduzindo tempo de desenvolvimento |
| **Manutenibilidade** | Alterações de design centralizadas em um único lugar |
| **Acessibilidade** | Componentes acessíveis herdados do Ant Design |

---

## 📦 Estrutura do Monorepo

```
design_juscash/
├── packages/
│   └── design-system/          # Biblioteca de componentes
│       ├── src/
│       │   ├── components/     # Componentes React
│       │   ├── theme/          # Tokens e temas
│       │   └── index.ts        # Entry point
│       └── dist/               # Build output
│
├── docs/                       # Workspace Storybook
│   ├── .storybook/             # Config do Storybook
│   └── storybook-static/       # Build da vitrine
│
└── .context/                   # Contexto para AI agents
    ├── docs/                   # Documentação técnica
    ├── agents/                 # Playbooks de agentes
    ├── skills/                 # Skills especializadas
    └── plans/                  # Planos de execução
```

---

## 🧱 Componentes Disponíveis

### Entradas
- `Input` - Campo de texto
- `Select` - Seletor dropdown
- `Checkbox` - Caixa de seleção
- `Radio` - Seleção única
- `Switch` - Toggle on/off

### Ações
- `Button` - Botões com variantes
- `Upload` - Upload de arquivos

### Layout
- `Card` - Container de conteúdo
- `Table` - Tabela de dados
- `PageHeader` - Cabeçalho de página
- `Space` - Espaçamento entre elementos

### Feedback
- `Tag` - Etiquetas
- `Segmented` - Seletor segmentado

### Tipografia
- `Heading1-4` - Títulos
- `Body1-2` - Texto corpo
- `Caption` - Legendas

---

## 🎨 Tokens de Design

O sistema utiliza tokens para cores, espaçamentos, bordas e sombras:

```typescript
import { designSystemColors, spacing, radius, shadow } from "@juscash/design-system";

// Cores
designSystemColors.brand.primary[600]  // Verde JusCash
designSystemColors.brand.secondary[700] // Azul
designSystemColors.neutral[500]         // Cinza

// Espaçamento
spacing[4]  // 16px

// Bordas
radius.xl   // 8px

// Sombras
shadow.m    // Sombra média
```

---

## 🔧 Tecnologias

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| React | 18.x/19.x | Framework UI |
| TypeScript | 5.x | Tipagem |
| Ant Design | 6.x | Componentes base |
| tsup | latest | Bundler |
| Storybook | 10.x | Vitrine dos componentes |

---

## 📚 Documentação

### Para Desenvolvedores
- [Arquitetura](./architecture.md) - Estrutura e padrões
- [Workflow](./development-workflow.md) - Fluxo de desenvolvimento
- [Glossário](./glossary.md) - Terminologia

### Para AI Agents
- [Agents](../agents/README.md) - Playbooks de agentes
- [Skills](../skills/README.md) - Habilidades especializadas

---

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Rodar vitrine (Storybook)
npm run dev:docs

# Build da biblioteca
npm run build:design-system
```

---

## 📖 Uso da Biblioteca

```typescript
import { Button, Input, JuscashProvider } from "@juscash/design-system";

function App() {
  return (
    <JuscashProvider>
      <Button type="primary" dsSize="m">
        Clique aqui
      </Button>
      <Input placeholder="Digite algo" dsSize="m" />
    </JuscashProvider>
  );
}
```
