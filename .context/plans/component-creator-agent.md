---
status: draft
generated: 2026-01-21
agents:
  - type: "component-creator"
    role: "Especialista dedicado à criação de componentes para o Design System JusCash"
  - type: "frontend-specialist"
    role: "Suporte na arquitetura de componentes React/TypeScript"
  - type: "code-reviewer"
    role: "Revisão de qualidade e aderência aos padrões"
docs:
  - "architecture.md"
  - "tooling.md"
phases:
  - id: "phase-1"
    name: "Definição do Agente"
    prevc: "P"
  - id: "phase-2"
    name: "Implementação do Playbook"
    prevc: "E"
  - id: "phase-3"
    name: "Validação e Testes"
    prevc: "V"
---

# 🎨 Agente Especialista Criador de Componentes

> Criar um agente especializado na criação de componentes do Design System JusCash, que seguirá sempre o mesmo padrão, salvando componentes em `packages/design-system/src/components` e integrando com MCP Figma para obter designs.

## Task Snapshot

- **Primary goal:** Criar um agente (`component-creator`) que automatize a criação de componentes seguindo os padrões do Design System JusCash
- **Success signal:** O agente consegue criar componentes padronizados, fazer perguntas clarificadoras, solicitar designs do Figma via MCP, e salvar no local correto
- **Key references:**
  - [Componentes existentes](../../packages/design-system/src/components/)
  - [Theme tokens](../../packages/design-system/src/theme/)
  - [Figma MCP](https://www.figma.com)

## Codebase Context

### Estrutura do Design System
```
packages/design-system/
├── src/
│   ├── components/         # ← Onde novos componentes devem ser criados
│   │   ├── Button.tsx      # Exemplo de componente complexo
│   │   ├── Card.tsx        # Exemplo de componente simples
│   │   ├── index.ts        # Exports centralizados
│   │   └── ...
│   ├── theme/              # Design tokens e cores
│   │   └── ...
│   └── index.ts            # Re-exports globais
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

### Stack Tecnológica
- **Framework:** React 18+ com TypeScript
- **Base Components:** Ant Design (antd) - **OBRIGATÓRIO**
- **Theming:** ConfigProvider do Ant Design + tokens customizados
- **Icons:** Lucide React
- **Build:** tsup

### ⚠️ REGRA FUNDAMENTAL: Extensão do Ant Design

> **TODOS os componentes do Design System JusCash são EXTENSÕES dos componentes do Ant Design (antd).**

O agente DEVE:
1. **Identificar o componente base do Antd** que será estendido
2. **Estender as Props do Antd** - Nunca criar props do zero, sempre herdar de `AntdComponentProps`
3. **Usar o componente Antd internamente** - Nosso componente é um wrapper
4. **Customizar via ConfigProvider** - Aplicar tokens visuais sem modificar comportamento base
5. **Manter compatibilidade** - Todas as props originais do Antd devem continuar funcionando

```typescript
// ✅ CORRETO: Usar mapped types para limpar props que serão substituídas
type CleanAntdProps = {
  [K in keyof AntdInputProps as K extends "size"
    ? never
    : K]: AntdInputProps[K];
};

export type InputProps = CleanAntdProps & {
  dsSize?: InputSize;              // Nossa prop customizada
  size?: AntdInputProps["size"];   // Mantém a prop original opcional
};

// ❌ ERRADO: Props criadas do zero (não herda do Antd)
export type InputProps = {
  value: string;
  onChange: () => void;
};

// ❌ EVITAR: Omit simples pode causar problemas
export type InputProps = Omit<AntdInputProps, "size"> & { ... };
```

**Por que usar `CleanAntdProps` com mapped types?**
- Não quebra a tipagem do componente
- Permite manter a prop original como opcional
- Maior controle sobre quais props são removidas/substituídas

### Padrão de Componentes (baseado no Button.tsx)
1. Diretiva `"use client"` no topo
2. **Import do componente base do Antd** (ex: `Button as AntdButton`)
3. **Import dos types do Antd** (ex: `ButtonProps as AntdButtonProps`)
4. Import dos tokens do tema (`designSystemColors`, `radius`, `spacing`)
5. **Criar type estendido** usando `Omit<AntdProps, "propsParaSubstituir"> & { novasProps }`
6. Funções auxiliares para tokens (ex: `getPrimaryTokens()`)
7. Componente wrapper com ConfigProvider + componente Antd interno
8. Export nomeado do componente
9. `displayName` definido

## Agent Lineup

| Agent | Role in this plan | Playbook | First responsibility focus |
| --- | --- | --- | --- |
| **Component Creator** | Agente principal para criação de componentes | [component-creator.md](../agents/component-creator.md) | Criar componentes seguindo padrões |
| Frontend Specialist | Suporte técnico em arquitetura React | [frontend-specialist.md](../agents/frontend-specialist.md) | Validar decisões de arquitetura |
| Code Reviewer | Garantir qualidade do código | [code-reviewer.md](../agents/code-reviewer.md) | Revisar código gerado |

## Requisitos do Agente Component Creator

### 1. Comportamento Interrogativo
O agente DEVE fazer perguntas antes de começar a implementação:

- ❓ **Nome do componente?** - Qual será o nome do componente (PascalCase)?
- ❓ **Propósito?** - Qual problema o componente resolve?
- ❓ **Variantes?** - Quais tipos/variantes o componente deve ter?
- ❓ **Props?** - Quais propriedades ele deve aceitar?
- ❓ **Estados?** - Estados visuais necessários (hover, disabled, loading, etc)?
- ❓ **Design Figma?** - Existe um design no Figma? Qual é o link ou nodeId?

### 2. Integração com Figma MCP
O agente DEVE usar o MCP do Figma para:

```yaml
# Ferramentas do Figma MCP disponíveis:
- get_design_context: Obter código e contexto de design de um node
- get_screenshot: Capturar screenshot de um node
- get_metadata: Obter estrutura do design
- get_variable_defs: Obter variáveis/tokens definidos no Figma
```

**Workflow de Integração:**
1. Solicitar link do Figma ou nodeId ao usuário
2. Usar `get_design_context` para extrair informações do design
3. Analisar cores, espaçamentos e estrutura
4. Mapear para tokens existentes do design system
5. Gerar componente seguindo o design

### 3. Estrutura de Arquivo Obrigatória

```typescript
"use client";

import React from "react";
import {
  ComponenteBase as AntdComponente,
  type ComponenteBaseProps as AntdComponenteProps,
  ConfigProvider,
} from "antd";
import { designSystemColors } from "../theme";
import { radius, spacing } from "../theme";

// Types
type ExtendedType = AntdType | "customVariant1" | "customVariant2";

export type NomeComponenteProps = Omit<AntdComponenteProps, "type"> & {
  type?: ExtendedType;
  // ... props customizadas
};

// Token functions
function getVariant1Tokens(): Partial<ComponenteToken> {
  return {
    // tokens mapeados para designSystemColors
  };
}

// Component
export function NomeComponente(props: NomeComponenteProps): React.ReactElement {
  const { type, ...rest } = props;
  
  // lógica de variantes
  
  return (
    <ConfigProvider theme={{ components: { Componente: tokens } }}>
      <AntdComponente {...rest} />
    </ConfigProvider>
  );
}

NomeComponente.displayName = "NomeComponente";
```

### 4. Checklist de Criação de Componente

- [ ] Arquivo criado em `packages/design-system/src/components/NomeComponente.tsx`
- [ ] Diretiva `"use client"` adicionada
- [ ] Types exportados corretamente
- [ ] Tokens do tema utilizados (não usar cores hardcoded)
- [ ] ConfigProvider encapsulando o componente base
- [ ] displayName definido
- [ ] Export adicionado em `components/index.ts`
- [ ] Componente funciona com as variantes definidas

### 5. Tokens Disponíveis

```typescript
// Cores do Design System
designSystemColors.brand.primary[50-900]
designSystemColors.brand.secondary[50-900]
designSystemColors.neutral[50-950]
designSystemColors.feedback.red[50-900]
designSystemColors.feedback.green[50-900]
designSystemColors.feedback.yellow[50-900]
designSystemColors.feedback.blue[50-900]

// Spacing
spacing[0-10] // ex: spacing[2] = 8px

// Radius
radius.none | radius.sm | radius.md | radius.lg | radius.xl | radius.full
```

## Working Phases

### Phase 1 — Definição do Agente
**Steps**
1. Criar arquivo do agente em `.context/agents/component-creator.md`
2. Definir playbook completo com todas as instruções
3. Incluir exemplos práticos de uso

**Commit Checkpoint**
- `✨ feat: cria agente especialista em componentes`

### Phase 2 — Implementação do Playbook
**Steps**
1. Documentar fluxo interrogativo
2. Documentar integração com Figma MCP
3. Incluir templates de código
4. Adicionar checklist de validação

**Commit Checkpoint**
- `📚 docs: documenta workflow do agente component-creator`

### Phase 3 — Validação e Testes
**Steps**
1. Testar criação de um componente exemplo
2. Validar integração com Figma MCP
3. Revisar aderência aos padrões

**Commit Checkpoint**
- `✅ chore: valida funcionamento do agente component-creator`

## Decisão: Novo Agente vs Extensão

**Decisão:** Criar um **novo agente customizado** (`component-creator.md`)

**Justificativa:**
- Os agentes built-in (frontend-specialist) são genéricos
- Precisamos de um agente com comportamento específico para o Design System JusCash
- O agente deve conhecer a estrutura de pastas, tokens e padrões específicos
- A integração com Figma MCP é um requisito especializado

## Evidence & Follow-up

- [ ] Arquivo `component-creator.md` criado em `.context/agents/`
- [ ] README.md de agents atualizado
- [ ] Teste prático de criação de componente realizado
- [ ] Documentação de uso incluída no playbook
