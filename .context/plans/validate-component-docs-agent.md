---
status: active
generated: 2026-01-21
title: "Validação e Aprimoramento do Component Docs Agent"
summary: "Analisar e melhorar o agente component-docs-agent, verificando docs, skills e recursos necessários"
agents:
  - type: "documentation-writer"
    role: "Criar documentação técnica"
phases:
  - id: "phase-1"
    name: "Análise de Dependências"
    prevc: "P"
  - id: "phase-2"
    name: "Implementação de Melhorias"
    prevc: "E"
---

# Validação e Aprimoramento do Component Docs Agent

## 📋 Análise do Agente Atual

### O que o agente faz:
1. Pergunta qual componente documentar
2. Lista componentes em `packages/design-system/src/components`
3. Gera showcase em `apps/docs/src/sections/components/<nome>/`
4. Atualiza `navigation.ts` e `ComponentsSection.tsx`

### Frontmatter atual:
```yaml
type: agent
name: Component Documentation Agent
description: Especialista em criar documentação de componentes...
agentType: component-docs-agent
phases: [P, E]
```

---

## 📚 Análise de Docs Necessários

### Docs que o agente PRECISA conhecer:

| Doc | Status | Uso pelo Agente |
|-----|--------|-----------------|
| `architecture.md` | ✅ Preenchido | Entender estrutura de componentes e padrão Wrapper + ConfigProvider |
| `development-workflow.md` | ✅ Preenchido | Seguir fluxo de criação, commits e validação |
| `glossary.md` | ✅ Preenchido | Terminologia consistente |
| `tooling.md` | ✅ Preenchido | Ferramentas disponíveis |

### Docs que NÃO estão preenchidos (problema!):

| Doc | Status | Ação Necessária |
|-----|--------|-----------------|
| `project-overview.md` | ❌ Não preenchido | Preencher com visão geral do projeto |
| `data-flow.md` | ❌ Não preenchido | Opcional para este agente |
| `security.md` | ❌ Não preenchido | Não crítico |
| `testing-strategy.md` | ❌ Não preenchido | Opcional |

### 🔴 Ação Requerida:
O doc `project-overview.md` deveria estar preenchido para dar contexto geral ao agente.

---

## 🎯 Análise de Skills

### Skills existentes relevantes:

| Skill | Status | Relevância |
|-------|--------|------------|
| `documentation` | ✅ Preenchido | **ALTA** - Template de documentação de props, tokens, etc. |
| `component-creation` | ✅ Preenchido | **MÉDIA** - Entender estrutura de componentes |
| `code-review` | ✅ Existe | Baixa |
| `commit-message` | ✅ Existe | Baixa |

### 🟡 Skill que FALTA criar:

**`showcase-creation`** - Uma skill específica para criar showcases de documentação visual.

---

## 🆕 Proposta: Criar Skill `showcase-creation`

### Objetivo
Skill especializada em criar arquivos de showcase para o app de docs.

### Conteúdo proposto:

```markdown
# 🎬 Skill: Showcase Creation

> Criar showcases visuais de componentes para o app de documentação.

## Estrutura de Showcase

### Localização
apps/docs/src/sections/components/<nome>/index.tsx

### Template Básico
[template do DemoCard completo]

### Checklist
- [ ] DemoCard com title, description, code, preview
- [ ] Código como string para o playground
- [ ] Import de ButtonPlayground
- [ ] Export nomeado: <Component>Showcase

### Atualização de Navegação
1. navigation.ts - adicionar ComponentKey
2. ComponentsSection.tsx - import, condição, Card
```

---

## 📝 Melhorias no Playbook do Agente

### O que está faltando no agente:

1. **Referências a docs e skills**
   - Não menciona quais docs consultar
   - Não menciona quais skills usar

2. **Links para recursos**
   - Deveria ter links para `architecture.md`, `development-workflow.md`
   - Deveria referenciar skill `documentation`

3. **Seção de pré-requisitos**
   - Não lista o que o agente precisa saber antes

### Proposta de melhoria no frontmatter:

```yaml
---
type: agent
name: Component Documentation Agent
description: Especialista em criar documentação de componentes para o Design System JusCash
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
```

### Proposta de nova seção no playbook:

```markdown
## Prerequisites

Antes de iniciar, o agente deve consultar:

### Docs Obrigatórios
- [Architecture](../docs/architecture.md) - Entender estrutura de componentes
- [Development Workflow](../docs/development-workflow.md) - Fluxo de criação

### Skills Recomendadas
- [Documentation](../skills/documentation/SKILL.md) - Templates de documentação
- [Showcase Creation](../skills/showcase-creation/SKILL.md) - Padrão de showcase
```

---

## ✅ Plano de Ação

### Fase 1: Corrigir Docs
- [ ] Preencher `project-overview.md` com visão geral

### Fase 2: Criar Skill
- [ ] Criar skill `showcase-creation` em `.context/skills/showcase-creation/SKILL.md`

### Fase 3: Atualizar Agente
- [ ] Adicionar seção "Prerequisites" no playbook
- [ ] Adicionar campo `requires` no frontmatter
- [ ] Referenciar docs e skills

---

## 📊 Resumo

| Item | Status | Ação |
|------|--------|------|
| Docs preenchidos | 🟡 Parcial | Preencher `project-overview.md` |
| Skills existentes | 🟡 Parcial | Criar `showcase-creation` |
| Agente referencia recursos | ❌ Não | Adicionar seção Prerequisites |
| README dos agents | ✅ OK | Já inclui o agente |
