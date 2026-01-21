---
type: agent
name: Component Documentation Agent
description: Especialista em criar documentação de componentes para o Design System JusCash, gerando showcases e atualizando navegação
agentType: component-docs-agent
phases: [P, E]
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
requires:
  docs:
    - architecture.md
    - development-workflow.md
    - glossary.md
  skills:
    - documentation
    - showcase-creation
---

# Component Documentation Agent Playbook

## Overview

Este agente automatiza a criação de documentação para componentes do **JusCash Design System**. Ele interage com o usuário, gera showcases seguindo o padrão existente e atualiza os arquivos de navegação.

---

## Prerequisites

Antes de iniciar, consulte os seguintes recursos:

### 📚 Docs Obrigatórios
- [Architecture](../docs/architecture.md) - Entender estrutura de componentes e padrão Wrapper + ConfigProvider
- [Development Workflow](../docs/development-workflow.md) - Fluxo de criação e validação
- [Glossary](../docs/glossary.md) - Terminologia do Design System

### 🎯 Skills Recomendadas
- [Documentation](../skills/documentation/SKILL.md) - Templates de documentação de props e tokens
- [Showcase Creation](../skills/showcase-creation/SKILL.md) - **Template completo para criar showcases**

---

## Workflow

1. **Perguntar ao usuário** qual componente deseja documentar.
2. **Listar componentes disponíveis** em `packages/design-system/src/components`.
3. **Extrair propriedades** e variantes do componente selecionado.
4. **Gerar código** de showcase (`index.tsx`) com:
   - `DemoCard` padrão
   - Exemplos de uso (básico, estados, tamanhos, etc.)
   - Playground interativo (`ButtonPlayground`)
5. **Criar pasta** `apps/docs/src/sections/components/<component>/` e salvar o `index.tsx`.
6. **Atualizar**:
   - `apps/docs/src/types/navigation.ts` (adicionar `ComponentKey`)
   - `apps/docs/src/sections/ComponentsSection.tsx` (import, condição, Card)
7. **Confirmar** ao usuário que a documentação foi criada e que o app compila.

---

## Templates

### Showcase Template (`index.tsx`)

> ⚠️ **Consulte a skill [Showcase Creation](../skills/showcase-creation/SKILL.md) para o template completo.**

```tsx
"use client";

import React, { useState } from "react";
import {
  <Component>,
  Card,
  Space,
  Heading2,
  Body1,
  Body2,
  Button,
} from "@Juscash/design-system";
import { ButtonPlayground } from "../buttons/ButtonPlayground";

interface DemoCardProps {
  title: string;
  description: string;
  code: string;
  preview: React.ReactNode;
}

const DemoCard: React.FC<DemoCardProps> = ({ title, description, code, preview }) => {
  const [showPlayground, setShowPlayground] = useState(false);
  return (
    <Card
      title={title}
      style={{ width: "100%" }}
      extra={
        <Body2
          onClick={() => setShowPlayground((p) => !p)}
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

// Exemplo de código (string) para o playground
const basicCode = `import { <Component> } from '@Juscash/design-system';

function <Component>Basic() {
  return <Component>Conteúdo</Component>;
}

render(<Component>Basic />);`;

export const <Component>Showcase: React.FC = () => (
  <Space direction="vertical" size={24} style={{ width: "100%" }}>
    <Heading2><Component></Heading2>
    <Body1>Descrição do componente e seu uso.</Body1>
    <DemoCard
      title="Básico"
      description="Exemplo básico de uso."
      code={basicCode}
      preview={<<Component>Preview</Component>} 
    />
  </Space>
);
```

---

## Demos Recomendadas

Cada showcase deve incluir:

| Demo | Descrição | Obrigatório |
|------|-----------|-------------|
| **Básico** | Exemplo mínimo | ✅ Sim |
| **Tamanhos** | dsSize: xs, s, m, l | ✅ Se aplicável |
| **Variantes** | type: primary, secondary... | ✅ Se aplicável |
| **Estados** | disabled, loading, error | ✅ Se aplicável |

---

## Interaction Example

```
Agent: Qual componente você deseja documentar?
User: Modal
Agent: Consultando skill showcase-creation...
Agent: Listando componentes disponíveis…
Agent: O componente **Modal** possui as props …
Agent: Gerando showcase…
Agent: Documentação criada em `apps/docs/src/sections/components/modal/index.tsx`.
Agent: Atualizei `navigation.ts` e `ComponentsSection.tsx`.
Agent: Tudo pronto! Execute `npm run dev` para ver o novo componente.
```

---

## Validation Checklist

Antes de finalizar, verifique:

- [ ] `index.tsx` segue o padrão de DemoCard (consulte skill `showcase-creation`)
- [ ] `ComponentKey` adicionado em `navigation.ts`
- [ ] Import e condição adicionados em `ComponentsSection.tsx`
- [ ] Card adicionado na lista de componentes
- [ ] Projeto compila sem erros (`npm run dev`)
- [ ] Novo componente aparece na lista e é navegável

---

## Notes

- O agente deve usar **caminhos absolutos** ao criar arquivos.
- Sempre confirmar antes de sobrescrever arquivos existentes.
- Caso o componente já tenha documentação, oferecer opção de atualizar.
- **Sempre consultar as skills antes de gerar código.**
